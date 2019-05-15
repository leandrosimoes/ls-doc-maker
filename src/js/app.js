'use strict';

; (function () {
    var timeout,
        lastHash,
        progScrolling = false;

    if (!$('body').hasClass('ls-exported')) {
        window.nw = nw;
    }

    JSON.validate = function (value) {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    };

    function randomString(size) {
        size = size || 5;

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    function scrollSpy(e) {
        if (!!progScrolling) return;

        var scrollPosition = $(e.target).scrollTop(),
            sections = $('.spy-this');

        _.forEach(sections, function (section) {
            if ($(section).offset().top <= 1) {
                lastHash = section.id;
                $('span').removeClass('active');
                $('span[data-hash="' + section.id + '"]').addClass('active');
            }
        });
    };

    function scrollToHash(hash) {
        console.log(hash);

        hash = hash || 'body';
        lastHash = lastHash || '';

        if (hash.indexOf('#') === -1) {
            hash = ('#' + hash);
        }

        if (lastHash.indexOf('#') === -1) {
            lastHash = ('#' + lastHash);
        }

        progScrolling = true;

        if (hash !== '#body') {
            var $pathArea = $(hash).find('.item-path-area');

            if (!$pathArea.data('open')) {
                $pathArea.click();
            }

            if (lastHash === hash) return;

            lastHash = hash;

            clearTimeout(timeout);
            timeout = setTimeout(function () {
                $('#ls-code-preview').animate({ scrollTop: $('#ls-code-preview').scrollTop() + $(lastHash).offset().top }, 1000, function () {
                    progScrolling = false;
                });
            }, 500);
        } else {
            $('#ls-code-preview').animate({ scrollTop: 0 }, 1000, function () {
                progScrolling = false;
            });
        }
    };

    function buildMenu() {
        var $menu = $('#ls-menu > div'),
            model = window.ls_model;

        $menu.html('');

        var newMenu = $(document.createElement('ul'));

        _.forEach(model.Docs.groups(), function (g) {
            var itemMenu = $(document.createElement('li'));

            itemMenu.html('<span data-hash="' + g.id() + '">' + g.title() + '</span>');

            if (!!g.items) {
                var subMenu = $(document.createElement('ul'));

                _.forEach(g.items, function (i) {
                    var itemSubMenu = $(document.createElement('li'))

                    itemSubMenu.html('<span data-hash="' + i.id() + '">' + i.title() + '</span>');

                    subMenu.append(itemSubMenu);
                });

                itemMenu.append(subMenu);
            }

            newMenu.append(itemMenu);
        });

        $menu.append(newMenu);

        $menu.find('span').on('click', function () {
            scrollToHash($(this).data('hash'));

            $('span').removeClass('active');

            $(this).addClass('active');
        });

        $('#ls-code-preview').on('scroll', scrollSpy);
    }

    $(document).ready(function () {
        if (!$('body').hasClass('ls-exported')) {
            let win = window.nw.Window.get();
            win.maximize();
        }

        function save(code) {
            try {
                localStorage.setItem('ls-last-code', code);

                setTimeout(function () {
                    window.gc();
                    console.log('gc-executed');
                }, 2000);

                window.ls_model.IsDirty(false);
            } catch (e) {
                console.log('error on save');
            }
        };

        function buildAjaxCode(data) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": 'http://' + window.ls_model.Docs.url() + data.path(),
                "method": data.type()
            };

            if (data.headers().length > 0) {
                settings.headers = data.HeadSchema();
            }

            if (data.parameters().length > 0) {
                settings.data = data.ParamSchema();
            }

            var result = JSON.stringify(settings, null, '\t') + ';';

            var ajax =
                '\r\n' +
                '\r\n' + '$.ajax(settings).done(function (response) {' +
                '\r\n' + '    console.log(response);                 ' +
                '\r\n' + '});                                        ';

            return 'var settings = ' + result + ajax;
        };

        function buildCsharpCode(data) {
            var result = '//This code use the RestSharp Client. See (http://restsharp.org/).\r\n';
            result += 'var client = new RestClient("http://' + window.ls_model.Docs.url() + data.path() + '");\r\n';
            result += 'var request = new RestRequest(Method.' + data.type() + ');\r\n';
            result += 'request.AddHeader("cache-control", "no-cache");\r\n';
            result += 'request.AddHeader("content-type", "application/x-www-form-urlencoded");\r\n';

            if (data.headers().length > 0) {
                _.forEach(data.headers(), function (h) {
                    result += 'request.AddHeader("' + h.key() + '"), "' + h.value() + '");\r\n';
                });
            }

            if (data.parameters().length > 0) {
                result += 'request.AddParameter("application/x-www-form-urlencoded", "';

                _.forEach(data.parameters(), function (p) {
                    result += encodeURIComponent(p.key()) + '=' + encodeURIComponent(p.value());
                });

                result += '", ParameterType.RequestBody);\r\n';
            }

            result += 'IRequestResponse response = client.Execute(request);';

            return result;
        }

        function buildCurlCode(data) {
            var result = 'curl -X ' + data.type();

            if (data.headers().length > 0) {
                _.forEach(data.headers(), function (h) {
                    result += ' -H "' + h.key() + ': ' + h.value() + '"';
                });

                result += '\r\n';
            }

            if (data.parameters().length > 0) {
                result += " -d '";

                _.forEach(data.parameters(), function (p, index) {
                    if (index === data.parameters().length - 1) {
                        result += p.key() + '=' + p.value() + "'";
                    } else {
                        result += p.key() + '=' + p.value() + '&';
                    }
                });

                result += '\r\n';
            }

            result += ' "' + window.ls_model.Docs.url() + data.path() + '"';

            return result;
        }

        var $area = $('#main'),
            defaultModel = {
                Code: ko.observable(''),
                CopyToClipboard: function(data) {
                    var $cliparea = $('#cliparea');
                    
                    $cliparea.show();
                    $cliparea.val(data.sampleCode() || '');
                    $cliparea.focus();
                    $cliparea.select();

                    document.execCommand('Copy');

                    $cliparea.hide();
                },
                SelectSample: function (data, selected) {
                    if (selected === 'AJAX') {
                        data.sampleCode(buildAjaxCode(data));
                    } else if (selected === 'CSHARP') {
                        data.sampleCode(buildCsharpCode(data));
                    } else if (selected === 'CURL') {
                        data.sampleCode(buildCurlCode(data));
                    } else {
                        data.sampleCode('');
                    }                    

                    data.selectedCode(selected);
                },
                Docs: {
                    title: ko.observable(''),
                    url: ko.observable(''),
                    observations: ko.observable(''),
                    groups: ko.observable([]),
                    hasGroups: ko.observable(false),
                    showingCode: ko.observable(false)
                },
                AutoSave: ko.observable(true),
                IsDirty: ko.observable(false),
                Save: function () {
                    save(window.ls_model.Code());
                }
            },
            model = defaultModel;

        function setDoc(docs) {
            model = defaultModel;

            model.Docs.title(docs.title || '');
            model.Docs.url(docs.url || '');
            model.Docs.observations(docs.observations || '');
            model.Docs.hasGroups(!!docs.groups);

            _.forEach(docs.groups, function (group, gindex) {
                group.id = ko.observable(randomString());
                group.hasItems = ko.observable(!!group.items)
                group.title = ko.observable(group.title || '');

                _.forEach(group.items, function (item, iindex) {
                    item.id = ko.observable(randomString());
                    item.title = ko.observable(item.title || '');
                    item.description = ko.observable(item.description || '');
                    item.type = ko.observable(item.type || '');
                    item.path = ko.observable(item.path || '');
                    item.Showing = ko.observable(false)
                    item.ToggleShow = function (i, ele) {
                        $(ele).data('open', !i.Showing());
                        i.Showing(!i.Showing());
                    };

                    item.headers = ko.observable(item.headers || []);
                    _.forEach(item.headers(), function (head) {
                        head.key = ko.observable(head.key || '');
                        head.description = ko.observable(head.description || '');
                        head.value = ko.observable(head.value || '');
                    });
                    item.HeadSchema = ko.pureComputed(function () {
                        var result = _.map(item.headers(), function (h) {
                            return '"' + h.key.peek() + '":"' + h.value.peek() + '"';
                        });

                        result = JSON.parse('{' + _.join(result, ', ') + '}');

                        return result;
                    });

                    item.parameters = ko.observable(item.parameters || []);
                    item.hasParams = item.parameters().length > 0;
                    _.forEach(item.parameters(), function (param) {
                        param.key = ko.observable(param.key || '');
                        param.description = ko.observable(param.description || '');
                        param.value = ko.observable(param.value || '');
                    });
                    item.ParamSchema = ko.pureComputed(function () {
                        var result = _.map(item.parameters(), function (p) {
                            return '"' + p.key.peek() + '":"' + p.value.peek() + '"';
                        });

                        result = JSON.parse('{' + _.join(result, ', ') + '}');

                        return result;
                    });

                    item.responses = ko.observable(item.responses || []);
                    _.forEach(item.responses(), function (resp) {
                        resp.code = ko.observable(resp.code || '');
                        resp.description = ko.observable(resp.description || '');
                        resp.schema = ko.observable(resp.schema || '');
                    });

                    item.selectedCode = ko.observable('AJAX');
                    item.sampleCode = ko.observable(buildAjaxCode(item));
                });
            });

            model.Docs.groups(docs.groups);
        }

        model.Preview = ko.computed(function () {
            if (!!window.ls_model && !window.ls_model.AutoSave() && !!window.ls_model.IsDirty()) return

            var code = model.Code();

            if (!!JSON.validate(code)) {
                return setDoc(JSON.parse(code));
            } else {
                return setDoc([]);
            }
        });

        ko.applyBindings(model, $area[0]);

        window.ls_model = model;

        if ($('body').hasClass('ls-exported')) {
            $('#ls-code-editor').remove();
            $('#btn-save').remove();
            $('#btn-export').remove();

            window.ls_model.Code(JSON.stringify(lsExportedJson, null, '\t'));

            buildMenu();
        } else {
            var lastCode = localStorage.getItem('ls-last-code');
            if (!!lastCode) {
                window.ls_model.Code(lastCode);
            } else {
                window.ls_model.Code(JSON.stringify(lsExportedJson, null, '\t'));
            }
        }

        window.ls_model.Code.subscribe(function (code) {
            window.ls_model.IsDirty(true);

            if (!!window.ls_model.AutoSave()) {
                save(code);
            }
        });

        $('#main').removeClass('loading');

        if (!document.execCommand) {
            $('.sample-code-link').hide();
        }
    });
})();

