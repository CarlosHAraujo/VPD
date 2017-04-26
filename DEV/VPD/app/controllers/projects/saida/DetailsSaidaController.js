angular.module('MetronicApp').controller('DetailsSaidaController', [
    '$scope',
    'saida',
    function ($scope, saida) {
        $scope.saida = saida;
    }]);