angular.module('MetronicApp').controller('ListProjectController', function ($state, $scope, projects) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();
    });

    $scope.projects = projects;
});