; (function () {
    var editing = false;
    JSON.validate = function (value) {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    };

    ko.bindingHandlers.ace = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            var editor = ace.edit(element),
                timeout;

            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            editor.setTheme('ace/theme/twilight');
            editor.getSession().setMode('ace/mode/json');

            editor.getSession().on('change', function (e) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    editing = true;

                    valueAccessor()(editor.getValue());

                    editing = false;
                }, 1000);
            });

            element.aceEditor = editor;
        },
        update: function (element, valueAccessor, allBindings, bindingContext) {
            if (!!editing) return;

            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            element.aceEditor = element.aceEditor || ace.edit(element);

            element.aceEditor.getSession().setValue(valueAccessor()(), 1);
        }
    };

    ko.bindingHandlers.aceSample = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            if (!!element.aceEditor || !valueAccessor()()) return;

            var editor = ace.edit(element);

            editor.setTheme('ace/theme/twilight');
            editor.setOptions({ maxLines: 'Infinity' });
            editor.getSession().setMode('ace/mode/json');
            editor.setReadOnly(true);

            element.aceEditor = editor;

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.aceEditor.destroy();
                window.gc();
            });
        },
        update: function (element, valueAccessor, allBindings, bindingContext) {
            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            if (!valueAccessor()()) return;

            element.aceEditor = element.aceEditor || ace.edit(element);

            if (JSON.validate(JSON.stringify(valueAccessor()(), null, "\t"))) {
                element.aceEditor.getSession().setValue(JSON.stringify(valueAccessor()(), null, "\t"), 1);
            } else {
                element.aceEditor.getSession().setValue("", 1);
            }
        }
    };

    ko.bindingHandlers.aceAjaxSampleCode = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            if (!!element.aceEditor) return;

            var editor = ace.edit(element);

            editor.setTheme('ace/theme/twilight');
            editor.setOptions({ maxLines: 'Infinity' });
            editor.getSession().setMode('ace/mode/javascript');
            editor.setReadOnly(true);

            element.aceEditor = editor;

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.aceEditor.destroy();
                window.gc();
            });
        },
        update: function (element, valueAccessor, allBindings, bindingContext) {
            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            if (!valueAccessor()()) return;

            element.aceEditor = element.aceEditor || ace.edit(element);

            element.aceEditor.getSession().setValue(valueAccessor()(), 1);
        }
    };

    ko.bindingHandlers.aceCsharpSampleCode = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            if (!!element.aceEditor) return;

            var editor = ace.edit(element);

            editor.setTheme('ace/theme/twilight');
            editor.setOptions({ maxLines: 'Infinity' });
            editor.getSession().setMode('ace/mode/csharp');
            editor.setReadOnly(true);

            element.aceEditor = editor;

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.aceEditor.destroy();
                window.gc();
            });
        },
        update: function (element, valueAccessor, allBindings, bindingContext) {
            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            if (!valueAccessor()()) return;

            element.aceEditor = element.aceEditor || ace.edit(element);

            element.aceEditor.getSession().setValue(valueAccessor()(), 1);
        }
    };

    ko.bindingHandlers.aceCurlSampleCode = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            if (!!element.aceEditor) return;

            var editor = ace.edit(element);

            editor.setTheme('ace/theme/twilight');
            editor.setOptions({ maxLines: 'Infinity' });
            editor.getSession().setMode('ace/mode/curly');
            editor.setReadOnly(true);

            element.aceEditor = editor;

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.aceEditor.destroy();
                window.gc();
            });
        },
        update: function (element, valueAccessor, allBindings, bindingContext) {
            if (!ko.isObservable(valueAccessor())) {
                valueAccessor = ko.observable(valueAccessor);
            }

            if (!valueAccessor()()) return;

            element.aceEditor = element.aceEditor || ace.edit(element);

            element.aceEditor.getSession().setValue(valueAccessor()(), 1);
        }
    };
})();