'use strict';
angular.module('MetronicApp').factory('authInterceptorService', ['$q', '$injector', 'localStorageService',
    function ($q, $injector, localStorageService) {

        var authInterceptorServiceFactory = {};
        var lock = false;
        var promiseQueue = [];
        var handleQueuedPromises = function () {
            var http = $injector.get('$http');
            angular.forEach(promiseQueue, function (item) {
                http(item.params)
                    .then(function (response) {
                        item.promise.resolve(response);
                    })
                    .catch(function (response) {
                        item.promise.reject(response);
                    });
            });
        };

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    var http = $injector.get('$http');
                    var authService = $injector.get('authService');
                    if (!lock) {
                        lock = true;
                        var deferred = $q.defer();
                        authService.refreshToken()
                            .then(function (response) {
                                lock = false;
                                handleQueuedPromises();
                                http(rejection.config)
                                    .then(function (response) {
                                        deferred.resolve(response);
                                    })
                                    .catch(function (response) {
                                        deferred.reject(response);
                                    });
                            })
                            .catch(function (response) {
                                deferred.reject(rejection);
                            });
                        return deferred.promise;
                    }
                    else {
                        var queuedPromise = $q.defer();
                        promiseQueue.push({ promise: queuedPromise, params: rejection.config });
                        return queuedPromise.promise;
                    }
                }
                else {
                    var state = $injector.get('$state');
                    state.go('login');
                    return $q.reject(rejection);
                }
            }
            else {
                return $q.reject(rejection);
            }
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);