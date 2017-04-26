angular.module('MetronicApp').controller('CreateEntradaController', [
    '$scope',
    'FinanceiroService',
    'NotificationService',
    '$state',
    'projectId',
    function ($scope, FinanceiroService, NotificationService, $state, projectId) {
        $scope.create = {
            data: '',
            valor: 0,
            historico: '',
            pagamento: -1,
            tipoPagamento: [
                {
                    value: 0,
                    name: 'Dinheiro'
                },
                {
                    value: 1,
                    name: 'Doação'
                }
            ]
        };

        $scope.post = function () {
            FinanceiroService.createEntrada({ projectId: projectId }, $scope.create)
                .then(function (result) {
                    NotificationService.success('Entrada lançada com sucesso!');
                    $state.go('projects.entrada', {}, { reload: 'projects.entrada' });
                })
                .catch(function (result) {
                    NotificationService.error('Ocorreu um erro ao lançar a entrada. Se o erro persistir entre em contato com o suporte.');
                });
        };
    }]);