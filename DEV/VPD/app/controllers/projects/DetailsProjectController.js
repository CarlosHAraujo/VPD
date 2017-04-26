angular.module('MetronicApp').controller('DetailsProjectController', [
    '$scope',
    'project',
    'ProjectService',
    'AlertService',
    'NotificationService',
    function ($scope, project, ProjectService, AlertService, NotificationService) {
        $scope.project = project;
        $scope.encerrar = function () {
            AlertService.confirm('Tem certeza que deseja encerrar o projeto?', 'Esta operação não pode ser desfeita.')
            .then(function (value) {
                ProjectService.encerrar({ projectId: $scope.project.id }).$promise
                .then(function (result) {
                    NotificationService.success('Projeto encerrado com sucesso!');
                    $scope.project = result;
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao encerrar o projeto. Se o erro persistir entre em contato com o suporte.');
                });
            });
        };
    }]);