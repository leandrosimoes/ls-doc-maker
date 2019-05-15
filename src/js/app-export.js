; (function () {
    $(document).ready(function () {
        var fs = require('fs'),
            ncp = require('ncp'),
            cp = require('child_process'),
            path = require('path'),
            nwPath = process.argv[0],
            nwDir = path.dirname(nwPath),
            sourcePath = nwDir + '\\' + 'src',
            destinationPath = 'C:\\ls_temp',
            os = require('os');

        function chooseFile(callback) {
            var $chooser = $('#ls-export-path');
            $chooser.off('change');
            $chooser.on('change', function (evt) {
                $('#ls-export-path').remove();

                $('body').append('<input id="ls-export-path" type="file" nwdirectory />');

                var path = $(this).val();

                if (!path) return;

                destinationPath = path + '\\ls_temp';

                console.log(destinationPath);

                if (!destinationPath) return;

                if (!!callback) callback();
            });

            $chooser.trigger('click');
        }

        function onError() {
            alert('Error on export!');
            $('#main').removeClass('loading');
            $('body').removeClass('ls-exported');
        };

        function copyFiles(callback) {
            ncp(sourcePath, destinationPath, function (err) {
                if (!!err) {
                    onError();
                } else {
                    if (callback) callback();
                }
            });
        };

        function prepareFiles(callback) {
            console.log('prepare files');

            if (!fs.existsSync(destinationPath)) {
                onError();
                return;
            }

            var jsonText = 'var lsExportedJson = ' + window.ls_model.Code();

            fs.writeFile(destinationPath + '/js/sample.js', jsonText, function (err) {
                if (!!err) {
                    onError();
                } else {
                    fs.readFile(destinationPath + '/index.html', 'utf-8', function (err, data) {
                        if (!!err) {
                            onError();
                        } else {
                            var newValue = data
                                            .replace('<body>', '<body class="ls-exported">')
                                            .replace('<div data-bind="visible: !hasGroups()">', '')
                                            .replace('<h1>Sintaxe error, please review your JSON object.</h1>', '')
                                            .replace('</div> <!-- Do not remove this comment -->', '')
                                            .replace('<aside id="ls-code-editor" data-bind="ace: Code"></aside>', '')
                                            .replace('<script src="/src/js/app-export.js"></script>', '')
                                            .replace('<button id="btn-save" data-bind="visible: IsDirty, click: Save">SAVE</button>', '')
                                            .replace('<button id="btn-export">EXPORT</button>', '')
                                            .replace('<div id="ck-auto-save">', '')
                                            .replace('<input type="checkbox" data-bind="checked: AutoSave, checkedValue: AutoSave" /> Auto Save?', '')
                                            .replace('<input id="ls-export-path" type="file" nwdirectory />', '')
                                            .replace(/\/src\//g, './');

                            fs.writeFile(destinationPath + '/index.html', newValue, 'utf-8', function (err) {
                                if (!!err) {
                                    onError();
                                } else {
                                    if (callback) callback();
                                }
                            });
                        };
                    });
                }
            });
        };

        $('#btn-export').on('click', function () {
            chooseFile(function () {
                $('#main').addClass('loading');
                $('body').addClass('ls-exported');

                copyFiles(function () {
                    prepareFiles(function () {
                        if (os.platform() === 'win32') {
                            cp.exec('start "" "' + destinationPath + '"');
                        } else {
                            alert('Files exported succefully at "' + destinationPath + '"')
                        }

                        $('#main').removeClass('loading');
                        $('body').removeClass('ls-exported');
                    });
                });
            });
        });
    });
})();