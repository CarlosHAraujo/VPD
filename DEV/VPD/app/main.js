/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "LocalStorageModule",
    "ncy-angular-breadcrumb",
    "ngAnimate",
    "ngResource",
    "ngMessages"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            logo_100x100: 'app/img/logo_100x100.jpg',
            logo_50x50: 'app/img/logo_50x50.jpg',
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets/',
        globalPath: 'assets/',
        layoutPath: 'assets/layouts/layout5',
        apiBaseUri: '/api',
        tokenUri: '/token',
        clientId: 'VPD'
    };
    return settings;
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('projects.list');
    });

    $stateProvider
        //#region layout
        .state('layout', {
            abstract: true,
            ncyBreadcrumb: {
                label: 'Home'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/controllers/AppController.js',
                        'app/controllers/FooterController.js',
                        'app/controllers/HeaderController.js',
                        'app/controllers/PageHeadController.js'
                    ]);
                }]
            },
            views: {
                'body': {
                    controller: "AppController",
                    templateUrl: 'app/template/layout.html'
                }
            }
        })
        //#endregion
        //#region login
        .state('login', {
            url: "/login",
            data: {
                pageTitle: 'Login'
            },
            ncyBreadcrumb: {
                label: 'Login'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/controllers/LoginController.js'
                    ], { serie: true });
                }]
            },
            views: {
                'body': {
                    controller: "LoginController",
                    templateUrl: "app/views/login.html"
                }
            }
        })
        //#endregion
        //#region profile
        .state('profile', {
            url: "/profile",
            templateUrl: "app/views/profile.html",
            data: { pageTitle: 'Profile' },
            controller: "ProfileController",
            ncyBreadcrumb: {
                label: 'Profile'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/ProfileController.js'
                        ]
                    });
                }]
            }
        })
        //#endregion
        //#region projectIndex
        .state('projectIndex', {
            parent: 'layout',
            data: {
                pageTitle: 'Projetos'
            },
            ncyBreadcrumb: {
                label: 'Home'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/services/ProjectService.js',
                            'app/services/FinanceiroService.js',
                            'app/controllers/projects/ProjectMenuController.js'
                        ]
                    });
                }]
            },
            views: {
                'content': {
                    templateUrl: 'app/views/projects/index.html',
                }
            }
        })
        //#endregion
        //#region projects
        .state('projects', {
            parent: 'projectIndex',
            abstract: true,
            url: '/projects',
            views: {
                'menu': {
                    controller: 'ProjectMenuController',
                    templateUrl: 'app/views/projects/menu.html'
                },
                'main': {
                    templateUrl: 'app/views/projects/main.html'
                }
            }
        })
        //#endregion
        //#region projects.list
        .state('projects.list', {
            parent: 'projects',
            data: {
                pageTitle: 'Projetos',
                showMenu: false
            },
            ncyBreadcrumb: {
                label: 'Projetos'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/ListProjectController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "ListProjectController",
                    templateUrl: 'app/views/projects/list.html',
                    resolve: {
                        projects: ['ProjectService', function (ProjectService) {
                            return ProjectService.query().$promise;
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.create
        .state('projects.create', {
            parent: 'projects',
            url: '/create',
            data: {
                pageTitle: 'Novo projeto',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.list',
                        name: 'Visualizar todos',
                        icon: 'icon-home'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Novo projeto'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/CreateProjectController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "CreateProjectController",
                    templateUrl: 'app/views/projects/create.html'
                }
            }
        })
        //#endregion
        //#region projects.edit
        .state('projects.edit', {
            parent: 'projects',
            url: '/{projectId}/edit',
            data: {
                pageTitle: 'Editar projeto',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.create',
                        name: 'Criar novo projeto',
                        icon: 'icon-home'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Editar projeto'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/EditProjectController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "EditProjectController",
                    templateUrl: 'app/views/projects/edit.html',
                    resolve: {
                        project: ['ProjectService', '$stateParams', function (ProjectService, $stateParams) {
                            return ProjectService.get({ projectId: $stateParams.projectId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.details
        .state('projects.details', {
            parent: 'projects',
            url: '/{projectId}',
            data: {
                pageTitle: 'Detalhes do projeto',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.create',
                        name: 'Criar novo projeto',
                        icon: 'icon-home'
                    },
                    {
                        link: 'projects.edit({ projectId: $state.params.projectId })',
                        name: 'Editar',
                        icon: 'icon-home'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Detalhes do projeto'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/DetailsProjectController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "DetailsProjectController",
                    templateUrl: 'app/views/projects/details.html',
                    resolve: {
                        project: ['ProjectService', 'FinanceiroService', '$stateParams', '$q', function (ProjectService, FinanceiroService, $stateParams, $q) {
                            var defer = $q.defer();
                            $q.all([
                                ProjectService.get({ projectId: $stateParams.projectId }).$promise,
                                FinanceiroService.totalRecebido({
                                    projectId: $stateParams.projectId
                                }),
                                FinanceiroService.totalPago({
                                    projectId: $stateParams.projectId
                                }),
                                FinanceiroService.saldoReceber({
                                    projectId: $stateParams.projectId
                                }),
                                FinanceiroService.saldoPagar({
                                    projectId: $stateParams.projectId
                                }),
                                FinanceiroService.saldo({
                                    projectId: $stateParams.projectId
                                }),
                                FinanceiroService.previsaoCaixa({
                                    projectId: $stateParams.projectId
                                })
                            ])
                                .then(function (values) {
                                    var project = values[0];
                                    project.totalRecebido = values[1];
                                    project.totalPago = values[2];
                                    project.saldoReceber = values[3];
                                    project.saldoPagar = values[4];
                                    project.saldo = values[5];
                                    project.previsaoCaixa = values[6];
                                    defer.resolve(project);
                                })
                                .catch(function (rejection) {
                                    defer.reject(rejection);
                                });
                            return defer.promise;
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contapagar
        .state('projects.contapagar', {
            parent: 'projects',
            url: '/{projectId}/contapagar',
            data: {
                pageTitle: 'Contas a pagar',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contapagar.create',
                        icon: 'icon-home',
                        name: 'Criar conta a pagar'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Contas a pagar'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaPagar/ListContaPagarController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "ListContaPagarController",
                    templateUrl: 'app/views/projects/contaPagar/list.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        contas: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getContasPagar({ projectId: $stateParams.projectId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contapagar.create
        .state('projects.contapagar.create', {
            parent: 'projects.contapagar',
            url: '/create',
            data: {
                pageTitle: 'Criar conta a pagar',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contapagar',
                        icon: 'icon-home',
                        name: 'Visualizar todas'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Criar conta a pagar'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaPagar/CreateContaPagarController.js',
                            'assets/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js'
                        ],
                        serie: true
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "CreateContaPagarController",
                    templateUrl: 'app/views/projects/contaPagar/create.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contapagar.details
        .state('projects.contapagar.details', {
            parent: 'projects.contapagar',
            url: '/{contaId}',
            data: {
                pageTitle: 'Detalhes da conta a pagar',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contapagar.create',
                        icon: 'icon-home',
                        name: 'Criar conta a pagar'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Detalhes da conta a pagar'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaPagar/DetailsContaPagarController.js'
                        ]
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "DetailsContaPagarController",
                    templateUrl: 'app/views/projects/contaPagar/details.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        conta: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getContaPagarById({ projectId: $stateParams.projectId, contaId: $stateParams.contaId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contareceber
        .state('projects.contareceber', {
            parent: 'projects',
            url: '/{projectId}/contareceber',
            data: {
                pageTitle: 'Contas a receber',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contareceber.create',
                        icon: 'icon-home',
                        name: 'Criar conta a receber'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Contas a receber'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaReceber/ListContaReceberController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "ListContaReceberController",
                    templateUrl: 'app/views/projects/contaReceber/list.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        contas: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getContasReceber({ projectId: $stateParams.projectId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contareceber.create
        .state('projects.contareceber.create', {
            parent: 'projects.contareceber',
            url: '/create',
            data: {
                pageTitle: 'Criar conta a receber',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contareceber',
                        icon: 'icon-home',
                        name: 'Visualizar todas'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Criar conta a receber'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaReceber/CreateContaReceberController.js',
                            'assets/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js'
                        ],
                        serie: true
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "CreateContaReceberController",
                    templateUrl: 'app/views/projects/contaReceber/create.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.contareceber.details
        .state('projects.contareceber.details', {
            parent: 'projects.contareceber',
            url: '/{entradaId}',
            data: {
                pageTitle: 'Detalhes da conta a receber',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.contareceber.create',
                        icon: 'icon-home',
                        name: 'Criar conta a receber'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Detalhes da conta a receber'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/contaReceber/DetailsContaReceberController.js'
                        ]
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "DetailsContaReceberController",
                    templateUrl: 'app/views/projects/contaReceber/details.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        conta: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getContaReceberById({ projectId: $stateParams.projectId, contaId: $stateParams.contaId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.entrada
        .state('projects.entrada', {
            parent: 'projects',
            url: '/{projectId}/entrada',
            data: {
                pageTitle: 'Entradas',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.entrada.create',
                        icon: 'icon-home',
                        name: 'Lançar entrada'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Entradas'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/entrada/ListEntradaController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "ListEntradaController",
                    templateUrl: 'app/views/projects/entrada/list.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        entradas: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getEntradas({ projectId: $stateParams.projectId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.entrada.create
        .state('projects.entrada.create', {
            parent: 'projects.entrada',
            url: '/create',
            data: {
                pageTitle: 'Lançar entrada',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.entrada',
                        icon: 'icon-home',
                        name: 'Visualizar todas'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Lançar entrada'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/entrada/CreateEntradaController.js',
                            'assets/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js'
                        ],
                        serie: true
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "CreateEntradaController",
                    templateUrl: 'app/views/projects/entrada/create.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.entrada.details
        .state('projects.entrada.details', {
            parent: 'projects.entrada',
            url: '/{entradaId}',
            data: {
                pageTitle: 'Detalhes do lançamento de entrada',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.entrada.create',
                        icon: 'icon-home',
                        name: 'Lançar entrada'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Detalhes do lançamento de entrada'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/entrada/DetailsEntradaController.js'
                        ]
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "DetailsEntradaController",
                    templateUrl: 'app/views/projects/entrada/details.html',
                    resolve: {
                        entrada: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getEntradaById({ projectId: $stateParams.projectId, entradaId: $stateParams.entradaId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.saida
        .state('projects.saida', {
            parent: 'projects',
            url: '/{projectId}/saida',
            data: {
                pageTitle: 'Saídas',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.saida.create',
                        icon: 'icon-home',
                        name: 'Lançar saída'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Saídas'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/saida/ListSaidaController.js'
                        ]
                    });
                }]
            },
            views: {
                'view': {
                    controller: "ListSaidaController",
                    templateUrl: 'app/views/projects/saida/list.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }],
                        saidas: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getSaidas({ projectId: $stateParams.projectId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.saida.create
        .state('projects.saida.create', {
            parent: 'projects.saida',
            url: '/create',
            data: {
                pageTitle: 'Lançar saída',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.saida',
                        icon: 'icon-home',
                        name: 'Visualizar todas'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Lançar saída'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/saida/CreateSaidaController.js',
                            'assets/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js'
                        ],
                        serie: true
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "CreateSaidaController",
                    templateUrl: 'app/views/projects/saida/create.html',
                    resolve: {
                        projectId: ['$q', '$stateParams', function ($q, $stateParams) {
                            return $q.resolve($stateParams.projectId);
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region projects.saida.details
        .state('projects.saida.details', {
            parent: 'projects.saida',
            url: '/{saidaId}',
            data: {
                pageTitle: 'Detalhes do lançamento da saída',
                showMenu: true,
                menus: [{
                    title: '',
                    actions: [{
                        link: 'projects.saida.create',
                        icon: 'icon-home',
                        name: 'Lançar saída'
                    }]
                }]
            },
            ncyBreadcrumb: {
                label: 'Detalhes do lançamento da saída'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'app/controllers/projects/saida/DetailsSaidaController.js'
                        ]
                    });
                }]
            },
            views: {
                'view@projects': {
                    controller: "DetailsSaidaController",
                    templateUrl: 'app/views/projects/saida/details.html',
                    resolve: {
                        saida: ['FinanceiroService', '$stateParams', function (FinanceiroService, $stateParams) {
                            return FinanceiroService.getSaidaById({ projectId: $stateParams.projectId, saidaId: $stateParams.saidaId });
                        }]
                    }
                }
            }
        })
        //#endregion
        //#region documents
        .state('documents', {
            parent: 'layout',
            url: "/documents?pageToken&itensPerPage&previousPageToken",
            params: {
                itensPerPage: '4',
                previousPageToken: ['']
            },
            data: {
                pageTitle: 'Documentos',
                showMenu: true
            },
            ncyBreadcrumb: {
                label: 'Documentos'
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'app/controllers/documents/DocumentsController.js',
							'app/services/DocumentoService.js'
                        ]
                    }]);
                }]
            },
            views: {
                'content': {
					controller: "DocumentsController",
                    templateUrl: "app/views/documents/index.html",
                    resolve: {
                        googleDriveResponse: ['DocumentoService', '$stateParams', function (DocumentoService, $stateParams) {
                            return DocumentoService.getDocumentos($stateParams.itensPerPage, $stateParams.pageToken);
                        }]
                    }
                }
            }
        })
    //#endregion
}]);

MetronicApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.interceptors.push('serverErrorInterceptorService');

    $httpProvider.interceptors.push(function () {
        return {
            request: function (config) {
                if (config.url.includes('app/')) {
                    Object.assign(config.headers, { "Cache-Control": "no-cache, must-revalidate" });
                }
                return config;
            }
        }
    });
});

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);