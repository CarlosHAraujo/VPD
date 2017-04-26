angular.module('MetronicApp').controller('DocumentsController', [
    '$scope',
    'googleDriveResponse',
    'DocumentoService',
    '$stateParams',
    '$state',
    function ($scope, googleDriveResponse, DocumentoService, $stateParams, $state) {
        $scope.previousPageToken = $stateParams.previousPageToken || [''];
        $scope.nextPageToken = googleDriveResponse.nextPageToken;
        $scope.documentos = googleDriveResponse.documentos;

        $scope.previousPage = function () {
            $scope.previousPageToken.pop();
            $state.go('documents', {
                previousPageToken: $scope.previousPageToken,
                pageToken: $scope.previousPageToken[$scope.previousPageToken.length - 1],
                itensPerPage: $stateParams.itensPerPage
            });
        };

        $scope.nextPage = function () {
            $scope.previousPageToken.push($scope.nextPageToken);
            $state.go('documents', {
                previousPageToken: $scope.previousPageToken,
                pageToken: $scope.nextPageToken,
                itensPerPage: $stateParams.itensPerPage
            });
        }
    }]);