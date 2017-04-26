angular.module('MetronicApp').controller('CreateSaidaController', [
    '$scope',
    'FinanceiroService',
    'NotificationService',
    '$state',
    'projectId',
    function ($scope, FinanceiroService, NotificationService, $state, projectId) {
        $scope.create = {
            data: '',
            valor: 0,
            historico: ''
        };

        $scope.post = function () {
            FinanceiroService.createSaida({ projectId: projectId }, $scope.create)
                .then(function (result) {
                    NotificationService.success('Saída lançada com sucesso!');
                    $state.go('projects.saida', {}, { reload: 'projects.saida' });
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao lançar a saída. Se o erro persistir entre em contato com o suporte.');
                });
        };
    }]);