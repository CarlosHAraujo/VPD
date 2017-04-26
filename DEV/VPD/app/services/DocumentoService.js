angular.module('MetronicApp').service('DocumentoService', [
    '$http',
    '$q',
    'settings',
    function ($http, $q, settings) {
        var unwrapData = function (promise) {
            var defer = $q.defer();
            promise.then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        var basePath = settings.apiBaseUri + '/documento';

        var serviceFactory = {};

        var _getDocumentos = function (itensPerPage, pageToken) {
            itensPerPage = itensPerPage;
            var url = basePath;
            if (pageToken && itensPerPage) {
                url = url + '?pageToken=' + pageToken + '&itensPerPage=' + itensPerPage;
            }
            else if (pageToken) {
                url = url + '?pageToken=' + pageToken;
            }
            else if (itensPerPage) {
                url = url + '?itensPerPage=' + itensPerPage;
            }

            return unwrapData($http.get(url));
        };

        serviceFactory.getDocumentos = _getDocumentos;
        
        return serviceFactory;
    }]);