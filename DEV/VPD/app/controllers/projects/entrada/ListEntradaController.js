angular.module('MetronicApp').controller('ListEntradaController', [
    '$scope',
    'entradas',
    'projectId',
    function ($scope, entradas, projectId) {
        $scope.projectId = projectId;
        $scope.entradas = entradas;
    }]);