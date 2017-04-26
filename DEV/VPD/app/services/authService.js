'use strict'
angular.module('MetronicApp').factory('authService', ['$http', '$q', 'localStorageService', 'settings', function ($http, $q, localStorageService, settings) {
    var AUTHORIZATION_DATA = 'authorizationData';
    var authServiceFactory = {};

    var _saveRegistration = function (registration) {
        _logOut();

        return $http.post(settings.apiBaseUri + '/user', registration).then(function (response) {
            return response;
        });
    };

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password + "&client_id=" + settings.clientId;

        var deferred = $q.defer();

        $http.post(settings.tokenUri, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            
            localStorageService.set(AUTHORIZATION_DATA, { token: response.access_token, email: loginData.email, refreshToken: response.refresh_token });
            
            deferred.resolve(response);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _logOut = function () {
        localStorageService.remove(AUTHORIZATION_DATA);
    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get(AUTHORIZATION_DATA);

        if (authData) {

            var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + settings.clientId;
            
            $http.post(settings.tokenUri, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.remove(AUTHORIZATION_DATA);
                localStorageService.set(AUTHORIZATION_DATA, { token: response.access_token, email: response.userName, refreshToken: response.refresh_token });
                deferred.resolve(response);
            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });
        }

        return deferred.promise;
    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.refreshToken = _refreshToken;
        
    return authServiceFactory;
}]);