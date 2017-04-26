angular.module('MetronicApp').controller('LoginController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {
    $scope.$on('$viewContentLoaded', function () {
        Login.init()
    });
    $scope.loginError = '';
    $scope.email = '';
    $scope.password = '';
    $scope.submit = function () {
        authService.login({ email: $scope.email, password: $scope.password }).then(function (data) {
            $state.go('projects.list');
        }, function (error) {
            $scope.loginError = error.error_description;
        });
    };
}]);