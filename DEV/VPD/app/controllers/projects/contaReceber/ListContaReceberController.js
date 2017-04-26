angular.module('MetronicApp').controller('ListContaReceberController', [
    '$scope',
    'projectId',
    'contas',
    function ($scope, projectId, contas) {
        $scope.projectId = projectId;
        $scope.contas = contas;
    }]);