/**
 *  使用方法：
 *  fileOpener.open(url).then(function(){});
 *  用到的原生api 有：cordova-plugin-dialogs,cordova-plugin-device,cordova-plugin-FileTransfer
 */

/**FileTransfer*/
var ft;
Ext.define("util.FileOpen", {
    alternateClassName: "fileOpener",
    singleton: true,
    config: {
        isComplete: false,
        description: '高视医疗信息'
    },
    constructor: function (config) {

        this.initConfig(config);
    },
    // Returns a jQuery or AngularJS deferred object, or pass a success and fail callbacks if you don't want to use jQuery or AngularJS
    getPromisedExec: function (command, success, fail) {
        var toReturn, deferred, injector, $q;
        if (success === undefined) {
            if (window.jQuery) {
                deferred = jQuery.Deferred();
                success = deferred.resolve;
                fail = deferred.reject;
                toReturn = deferred;
            } else if (window.angular) {
                injector = angular.injector(["ng"]);
                $q = injector.get("$q");
                deferred = $q.defer();
                success = deferred.resolve;
                fail = deferred.reject;
                toReturn = deferred.promise;
            } else if (window.Promise) {
                toReturn = new Promise(function (c, e) {
                    success = c;
                    fail = e;
                });
            } else if (window.WinJS && window.WinJS.Promise) {
                toReturn = new WinJS.Promise(function (c, e) {
                    success = c;
                    fail = e;
                });
            } else {
                return console.error('AppVersion either needs a success callback, or jQuery/AngularJS/Promise/WinJS.Promise defined for using promises');
            }
        }

        if (device.platform == "Android") {

            cordova.plugins.fileOpener2.open(command, 'application/vnd.android.package-archive', success, fail);
        }
        else if (device.platform == "iOS") {
            // 加载其他应用，应用在升级的时候，iOS使用openURL打开、Android使用open打开  'tel://10086'
            cordova.plugins.fileOpener2.openURL(command, {
                success: success,
                error: fail
            });
        }

        return toReturn;
    },
    open: function (filePath, success, fail) {
        return this.getPromisedExec(filePath, success, fail);
    }
});