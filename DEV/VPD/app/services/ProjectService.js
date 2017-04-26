angular.module('MetronicApp').factory('ProjectService', ['$q', '$resource', 'settings', function ($q, $resource, settings) {
    var basePath = settings.apiBaseUri + '/projeto/:projectId';
    var resource = $resource(basePath,
        { projectId: '@projectId' },
        {
            encerrar: {
                method: "PUT",
                url: basePath + "/encerrar"
            },
            put: {
                method: "PUT",
                url: basePath
            }
        });
    return resource;
}]);