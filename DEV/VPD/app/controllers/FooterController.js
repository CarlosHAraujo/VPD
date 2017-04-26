/* Setup Layout Part - Footer */
angular.module('MetronicApp').controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);