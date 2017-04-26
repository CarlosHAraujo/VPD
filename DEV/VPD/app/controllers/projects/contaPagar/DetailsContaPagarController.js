angular.module('MetronicApp').controller('DetailsContaPagarController', [
    '$scope',
    '$state',
    'conta',
    'projectId',
    'FinanceiroService',
    'NotificationService',
    'AlertService',
    function ($scope, $state, conta, projectId, FinanceiroService, NotificationService, AlertService) {
        $scope.conta = conta;

        $scope.deletar = function () {
            AlertService.confirm('Tem certeza que deseja deletar esta conta?', 'Esta operação não pode ser desfeita.')
            .then(function (value) {
                FinanceiroService.deleteContaPagar({ projectId: projectId, contaId: conta.id })
                .then(function (result) {
                    NotificationService.success('Conta deletada com sucesso!');
                    $state.go('projects.contapagar', {}, { reload: 'projects.contapagar' });
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao deletar a conta. Se o erro persistir entre em contato com o suporte.');
                });
            });
        };
    }]);