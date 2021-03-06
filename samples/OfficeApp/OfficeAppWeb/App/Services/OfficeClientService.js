﻿(function () {
    app.factory('$officeSvrvice', ['$q', function ($q) {
        return {
            getFileProperties: function () {
                var deferred = $q.defer();

                Office.context.document.getFilePropertiesAsync(function (asyncResult) {
                    deferred.resolve(asyncResult);
                });

                return deferred.promise;
            },
            insertDataTable: function (headers, rows) {
                var table = new Office.TableData();

                table.headers = headers;
                table.rows = rows;

                var deferred = $q.defer();

                Office.context.document.setSelectedDataAsync(table, { coercionType: "table" },
                    function (asyncResult) {
                        deferred.resolve(asyncResult);
                    });

                return deferred.promise;
            },
            getSelectedData: function (coercionType) {
                var deferred = $q.defer();

                Office.context.document.getSelectedDataAsync(coercionType, function (asyncResult) {
                    deferred.resolve(asyncResult);
                });

                return deferred.promise;
            },
            getContext: function () {
                var deferred = $q.defer();

                var waitObj = new waitObject(Office);

                waitObj.when(function (o) {
                    return typeof o.context !== 'undefined'
                })
                .then(function (o) {
                    var ctx = {
                        contentLanguage: o.context.contentLanguage,
                        displayLanguage: o.context.displayLanguage
                    };

                    deferred.resolve(ctx);
                }).start();

                return deferred.promise;
            }
        }
    }]);
})();