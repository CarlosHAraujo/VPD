/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope', '$http', function ($rootScope, $http) {
    return {
        link: function (scope, element, attrs) {
            scope.loading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.loading, function (value) {
                if (value) {
                    element.removeClass('hide');
                } else {
                    element.addClass('hide');
                }
            });

            // by defult hide the spinner bar
            element.addClass('hide'); // hide spinner bar by default

            // display the spinner bar whenever the route changes(the content part started loading)
            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide'); // show spinner bar
            });

            // hide the spinner bar on rounte change success(after the content loaded)
            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('hide'); // hide spinner bar
                $('body').removeClass('page-on-load'); // remove page loading indicator               
            });

            // handle errors
            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide'); // hide spinner bar
            });

            // handle errors
            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide'); // hide spinner bar
            });
        }
    };
}]);

// Handle global LINK click
MetronicApp.directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

MetronicApp.directive('ngAnimate', ['$animate', '$rootScope', function ($animate, $rootScope) {
    return {
        scope: {
            options: '=ngAnimate'
        },
        link: function (scope, element, attrs) {
            var animatedClass = 'animated';
            element.addClass(animatedClass);
            $animate.on('enter', element, function callback(element, phase) {
                var options = eval("(" + element.attr('ng-animate') + ")");
                if (options) {
                    var cssClass = options.enter;
                    if (cssClass) {
                        if (phase == 'start') {
                            element.addClass(cssClass);
                        }
                        if (phase == 'close') {
                            element.removeClass(cssClass);
                        }
                    }
                }
            });
            $animate.on('leave', element, function callback(element, phase) {
                var options = eval("(" + element.attr('ng-animate') + ")");
                if (options) {
                    var cssClass = options.leave;
                    if (cssClass) {
                        if (phase == 'start') {
                            if (element.css('position') == 'static') {
                                element.css({
                                    width: element.parent().width()
                                });
                            }
                            var parents = element.parents();
                            var firstParent = parents[0];
                            firstParent = parents.filter(function () {
                                var thisPosition = $(this).css('position');
                                return thisPosition === 'absolute';
                            })[0];
                            var top = 0;
                            if (firstParent) {
                                firstParent = $(firstParent);
                                top = firstParent.position().top;
                            }
                            element.css({
                                position: 'absolute',
                                top: top
                            });
                            element.addClass(cssClass);
                        }
                    }
                }
            });
        }
    };
}]);

MetronicApp.directive('ngBack', ['$window', function ($window) {
    return {
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
                scope.$apply();
            });
        }
    };
}]);

MetronicApp.directive('datePicker', [function () {
    return {
        restrict: 'E',
        transclude: true,
        template: `
                    <div class="input-group date">
                        <span class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </span>
                        <ng-transclude />
                    </div>

                  `,
        link: function (scope, elem, attrs, controller) {
            var format = attrs.format;
            if (format) {
                $('.input-group', elem).datepicker({
                    format: format,
                    language: 'pt-BR',
                    autoclose: true
                });
            }
        }
    };
}]);

MetronicApp.directive('ngMask', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ngModel) {
            var mask = scope.$eval(attrs.ngMask).mask;
            if (mask) {
                elem.inputmask(mask, {
                    autoUnmask: false
                });
            }
        }
    };
}]);

MetronicApp.filter('bytes', function () {
    return function (bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
});