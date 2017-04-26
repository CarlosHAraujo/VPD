angular.module('MetronicApp').controller('ProjectMenuController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
    $scope.menus = $state.current.data.menus;
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        $scope.menus = toState.data.menus;
    });
}]);