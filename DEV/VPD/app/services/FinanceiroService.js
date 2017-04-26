angular.module('MetronicApp').factory('FinanceiroService', ['settings', '$http', '$interpolate', '$q', function (settings, $http, $interpolate, $q) {
    //#region declaration
    var basePath = settings.apiBaseUri + '/projeto/{{projectId}}';
    var interpolate = function (exp, params) {
        return $interpolate(exp, false, null, true)(params);
    };
    var unwrapData = function (promise) {
        var defer = $q.defer();
        promise.then(function (response) {
            defer.resolve(response.data);
        }).catch(function (response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    var serviceFactory = {};

    var _getContasPagar = function (params) {
        var url = interpolate(basePath + '/contapagar', params);
        return unwrapData($http.get(url));
    };

    var _getContaPagarById = function (params) {
        var url = interpolate(basePath + '/contapagar/{{contaId}}', params);
        return unwrapData($http.get(url));
    };

    var _createContaPagar = function (params, conta) {
        var url = interpolate(basePath + '/contapagar', params);
        return unwrapData($http.post(url, conta));
    };

    var _deleteContaPagar = function (params) {
        var url = interpolate(basePath + '/contapagar/{{contaId}}', params);
        return unwrapData($http.delete(url));
    };

    var _getContasReceber = function (params) {
        var url = interpolate(basePath + '/contareceber', params);
        return unwrapData($http.get(url));
    };

    var _getContaReceberById = function (params) {
        var url = interpolate(basePath + '/contareceber/{{contaId}}', params);
        return unwrapData($http.get(url));
    };

    var _createContaReceber = function (params, conta) {
        var url = interpolate(basePath + '/contareceber', params);
        return unwrapData($http.post(url, conta));
    };

    var _deleteContaReceber = function (params) {
        var url = interpolate(basePath + '/contareceber/{{contaId}}', params);
        return unwrapData($http.delete(url));
    };

    var _getEntradas = function (params) {
        var url = interpolate(basePath + '/entrada', params);
        return unwrapData($http.get(url));
    };

    var _getEntradaById = function (params) {
        var url = interpolate(basePath + '/entrada/{{entradaId}}', params);
        return unwrapData($http.get(url));
    };

    var _createEntrada = function (params, entrada) {
        var url = interpolate(basePath + '/entrada', params);
        return unwrapData($http.post(url, entrada));
    };

    var _getSaidas = function (params) {
        var url = interpolate(basePath + '/saida', params);
        return unwrapData($http.get(url));
    };

    var _getSaidaById = function (params) {
        var url = interpolate(basePath + '/saida/{{saidaId}}', params);
        return unwrapData($http.get(url));
    };

    var _createSaida = function (params, saida) {
        var url = interpolate(basePath + '/saida', params);
        return unwrapData($http.post(url, saida));
    };

    var _saldo = function (params) {
        var url = interpolate(basePath + '/saldo', params);
        return unwrapData($http.get(url));
    };

    var _previsaoCaixa = function (params) {
        var url = interpolate(basePath + '/previsaocaixa', params);
        return unwrapData($http.get(url));
    };

    var _saldoPagar = function (params) {
        var url = interpolate(basePath + '/saldopagar', params);
        return unwrapData($http.get(url));
    };

    var _saldoReceber = function (params) {
        var url = interpolate(basePath + '/saldoReceber', params);
        return unwrapData($http.get(url));
    };

    var _totalPago = function (params) {
        var url = interpolate(basePath + '/totalpago', params);
        return unwrapData($http.get(url));
    };

    var _totalRecebido = function (params) {
        var url = interpolate(basePath + '/totalrecebido', params);
        return unwrapData($http.get(url));
    };
    //#endregion

    serviceFactory.getContasPagar = _getContasPagar;
    serviceFactory.getContaPagarById = _getContaPagarById;
    serviceFactory.createContaPagar = _createContaPagar;
    serviceFactory.deleteContaPagar = _deleteContaPagar;
    serviceFactory.getContasReceber = _getContasReceber;
    serviceFactory.getContaReceberById = _getContaReceberById;
    serviceFactory.createContaReceber = _createContaReceber;
    serviceFactory.deleteContaReceber = _deleteContaReceber;
    serviceFactory.getEntradas = _getEntradas;
    serviceFactory.getEntradaById = _getEntradaById;
    serviceFactory.createEntrada = _createEntrada;
    serviceFactory.getSaidas = _getSaidas;
    serviceFactory.getSaidaById = _getSaidaById;
    serviceFactory.createSaida = _createSaida;
    serviceFactory.saldo = _saldo;
    serviceFactory.previsaoCaixa = _previsaoCaixa;
    serviceFactory.saldoPagar = _saldoPagar;
    serviceFactory.saldoReceber = _saldoReceber;
    serviceFactory.totalPago = _totalPago;
    serviceFactory.totalRecebido = _totalRecebido;

    return serviceFactory;
}]);