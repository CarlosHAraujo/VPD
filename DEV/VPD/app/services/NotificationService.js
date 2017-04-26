angular.module('MetronicApp').factory('NotificationService', ['$q', function ($q) {
    var serviceFactory = {};

    var toastrOptions = { timeout: 3000, positionClass: 'toast-bottom-right' };

    var _success = function (_message, _title) {
        toastr.success(_message, _title, toastrOptions);
    };

    var _info = function (_message, _title) {
        toastr.info(_message, _title, toastrOptions);
    };

    var _warning = function (_message, _title) {
        toastr.warning(_message, _title, toastrOptions);
    };

    var _error = function (_message, _title) {
        toastr.error(_message, _title, toastrOptions);
    };

    serviceFactory.success = _success;
    serviceFactory.info = _info;
    serviceFactory.warning = _warning;
    serviceFactory.error = _error;

    return serviceFactory;
}]);