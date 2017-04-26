angular.module('MetronicApp').controller('ListContaPagarController', ['$scope', 'projectId', 'contas', function ($scope, projectId, contas) {
    $scope.projectId = projectId;
    $scope.contas = contas;
}]);