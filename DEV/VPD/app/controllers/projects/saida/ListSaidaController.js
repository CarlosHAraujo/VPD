angular.module('MetronicApp').controller('ListSaidaController', [
    '$scope',
    'saidas',
    'projectId',
    function ($scope, saidas, projectId) {
        $scope.projectId = projectId;
        $scope.saidas = saidas;
    }]);