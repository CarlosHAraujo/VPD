/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('HeaderController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
    $scope.$stateParams = $stateParams;
}]);