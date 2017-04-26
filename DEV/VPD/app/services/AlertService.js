angular.module('MetronicApp').factory('AlertService', ['$q', function ($q) {
    var serviceFactory = {};

    var _info = function (_title, _text, _options) {
        _options = _options || {};
        swal({
            title: _title,
            text: _text,
            type: 'info',
            customClass: 'animated fadeIn',
            confirmButtonClass: 'btn-info',
            timer: _options.timer || undefined
        });
    };

    var _warning = function (_title, _text, _options) {
        _options = _options || {};
        swal({
            title: _title,
            text: _text,
            type: 'warning',
            customClass: 'animated fadeIn',
            confirmButtonClass: 'btn-warning',
            timer: _options.timer || undefined
        });
    };

    var _success = function (_title, _text, _options) {
        _options = _options || {};
        swal({
            title: _title,
            text: _text,
            type: 'success',
            customClass: 'animated fadeIn',
            confirmButtonClass: 'btn-success',
            timer: _options.timer || undefined,
        });
    };

    var _error = function (_title, _text, _options) {
        _options = _options || {};
        swal({
            title: _title,
            text: _text,
            type: 'error',
            customClass: 'animated fadeIn',
            confirmButtonClass: 'btn-danger',
            timer: _options.timer || undefined
        });
    };

    var _prompt = function (_title, _text, _options) {
        _options = _options || {};
        var defer = $q.defer();
        swal({
            title: _title,
            text: _text,
            type: 'prompt',
            inputType: _options.inputType || 'text',
            inputPlaceholder: _options.inputPlaceholder || '',
            showCancelButton: true,
            customClass: 'animated fadeIn',
            timer: _options.timer || undefined,
            closeOnConfirm: false,
        }, function (value) {
            if (value) {
                defer.resolve(value);
                swal.close();
            } else if (value === "") {
                swal.showInputError(_options.inputError || "Required");
                return false;
            } else {
                defer.reject(value);
            }
        });
        return defer.promise;
    };

    var _confirm = function (_title, _text, _options) {
        _options = _options || {};
        var defer = $q.defer();
        swal({
            title: _title,
            text: _text,
            showCancelButton: true,
            customClass: 'animated fadeIn',
            timer: _options.timer || undefined
        }, function (value) {
            if (value) {
                defer.resolve(value);
            } else {
                defer.reject(value);
            }
        });
        return defer.promise;
    };

    serviceFactory.info = _info;
    serviceFactory.warning = _warning;
    serviceFactory.success = _success;
    serviceFactory.error = _error;
    serviceFactory.prompt = _prompt;
    serviceFactory.confirm = _confirm;

    return serviceFactory;
}]);