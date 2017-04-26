'use strict';
angular.module('MetronicApp').factory('serverErrorInterceptorService', ['$q', function ($q) {
    var serverErrorInterceptorServiceFactory = {};

    var _responseError = function (rejection) {
        if (rejection.status == 500) {
            console.error(rejection.data);
        }
        return $q.reject(rejection);
    };

    serverErrorInterceptorServiceFactory.responseError = _responseError;

    return serverErrorInterceptorServiceFactory;
}]);