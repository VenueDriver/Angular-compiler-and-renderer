"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js/dist/zone-node");
var platform_server_1 = require("@angular/platform-server");
var core_1 = require("@angular/core");
var express = require("express");
var request = require("request");
core_1.enableProdMode();
var app = express();
app.engine('html', function (_, options, callback) {
    var opts = { document: options._template, url: options.route };
    console.log("Engine rendering");
    console.log(Object.keys(options));
    console.log(options.route, options.template);
    console.log("befor eval");
    var lib = eval(options._AppServerModuleNgFactory);
    console.log("after eval");
    platform_server_1.renderModuleFactory(lib.AppServerModuleNgFactory, opts)
        .then(function (html) { return callback(null, html); });
});
app.set('view engine', 'html');
app.set('views', 'src');
var NgRenderer = /** @class */ (function () {
    function NgRenderer() {
    }
    NgRenderer.prototype.render = function (data) {
        return new Promise(function (resolve, reject) {
            if (data.route && data.template && data.serverBundle) {
                request(data.template, { encoding: 'utf8' }, function (error, response, body) {
                    data._template = body;
                    request(data.serverBundle, { encoding: 'utf8' }, function (error, response, body) {
                        data._AppServerModuleNgFactory = body;
                        // COMPILE MAIN.SERVER THROUGH NEW WEBPACK
                        app.render('index', data, function (err, html) {
                            if (err) {
                                console.log("There's an eror", err);
                                reject(err);
                            }
                            else {
                                resolve(html);
                            }
                        });
                    });
                });
            }
            else {
                reject("Malformed request.");
            }
        });
    };
    return NgRenderer;
}());
exports.NgRenderer = NgRenderer;
//# sourceMappingURL=ng-renderer.js.map