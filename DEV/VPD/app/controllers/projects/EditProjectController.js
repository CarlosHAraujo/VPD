angular.module('MetronicApp').controller('EditProjectController', [
    '$scope',
    '$state',
    'ProjectService',
    'project',
    'NotificationService',
    function ($scope, $state, ProjectService, project, NotificationService) {
        $scope.project = project;

        $scope.post = function () {
            ProjectService.put({ projectId: $scope.project.id, nome: $scope.project.nome }).$promise
                .then(function (result) {
                    NotificationService.success('Projeto editado com sucesso!');
                    $state.go('projects.details', { projectId: result.id });
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao salvar o projeto. Se o erro persistir entre em contato com o suporte.');
                });
        }
    }
]);