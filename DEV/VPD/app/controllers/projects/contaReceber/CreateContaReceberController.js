angular.module('MetronicApp').controller('CreateContaReceberController', [
    '$scope',
    '$state',
    'projectId',
    'FinanceiroService',
    'NotificationService',
    function ($scope, $state, projectId, FinanceiroService, NotificationService) {
        $scope.conta = {
            historico: '',
            valor: '',
            data: ''
        };

        $scope.post = function () {
            FinanceiroService.createContaReceber({ projectId: projectId }, $scope.conta)
            .then(function (result) {
                NotificationService.success('Conta criada com sucesso!');
                $state.go('projects.contareceber', {}, { reload: 'projects.contareceber' });
            })
            .catch(function (result) {
                NotificationService.error('Não foi possível salvar sua conta. Se o erro persistir entre em contato com o suporte.');
            });
        };
    }]);