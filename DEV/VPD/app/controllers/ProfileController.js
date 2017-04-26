angular.module('MetronicApp').controller('ProfileController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax();
    });
});