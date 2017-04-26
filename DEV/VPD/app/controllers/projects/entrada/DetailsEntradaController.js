angular.module('MetronicApp').controller('DetailsEntradaController', [
    '$scope',
    'entrada',
    function ($scope, entrada) {
        $scope.entrada = entrada;
    }]);