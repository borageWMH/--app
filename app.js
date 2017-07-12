angular.module('myApp',['ui.router'])//创建模块对象
    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl:'template/main.html',
                controller:'MainCtrl'
            })
            .state('company', {
                url: '/company/:id',
                templateUrl:'template/company.html',
                controller:'CompanyCtrl'
            })
            .state('person', {
                url: '/person',
                templateUrl:'template/person.html',
                controller:'PersonCtrl'
            });

        $urlRouterProvider.otherwise('/main');
    }])
    .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
        $http.jsonp('http://localhost:3000/items?callback=JSON_CALLBACK')
            .success(function (items) {
                //console.log(items);
                $scope.companys = items;
            })
            .error(function (error) {
                console.log(error);
            })

    }])
    .controller('CompanyCtrl', ['$scope','$http','$stateParams', function ($scope, $http, $stateParams) {
        $http.get('http://localhost:3000/items')
            .success(function (items) {
                console.log($stateParams.id);
                var index = $stateParams.id - 1;
                $scope.company = items[index];
            })
            .error(function (error) {
                console.log(error);
            });
        $scope.back = function () {
            window.history.back();
        }

    }])
    .controller('PersonCtrl', ['$scope', function ($scope) {

    }]);
