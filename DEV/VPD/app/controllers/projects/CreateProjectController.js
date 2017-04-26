angular.module('MetronicApp').controller('CreateProjectController', [
    '$scope',
    '$state',
    'ProjectService',
    'NotificationService',
    function ($scope, $state, ProjectService, NotificationService) {
        $scope.create = {
            nome: ''
        }
        $scope.post = function () {
            ProjectService.save($scope.create).$promise
                .then(function (result) {
                    NotificationService.success('Projeto criado com sucesso!');
                    $state.go('projects.list');
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao criar o projeto. Se o erro persistir entre em contato com o suporte.');
                });
        }
    }]);