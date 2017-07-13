angular.module('myApp',['ui.router'])//创建模块对象
    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl:'html/main.html',
                controller:'MainCtrl'
            })
            .state('server', {
                url: '/server',
                templateUrl:'html/server.html',
                controller:'ServerCtrl'
            })
            .state('fuwushang', {
                url: '/fuwushang/:id1',
                templateUrl:'html/fuwushang.html',
                controller:'FuWUShangCtrl'
            })
            .state('detail',{
                url : '/detail/:id2',
                templateUrl : 'html/detail.html',
                controller: 'DetailCtrl'
            })
            .state('login',{
            url : '/login',
            templateUrl : 'html/login.html',
            controller: 'loginCtrl'
            })
            .state('register',{
                url : '/register',
                templateUrl : 'html/register.html',
                controller: 'registerCtrl'
            })

        $urlRouterProvider.otherwise('/main');
    }])
    .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
    $http.get('http://localhost:3000/sellers')
        .success(function (sellers) {
            console.log(sellers[0].serviceItem);
            $scope.sellers = sellers[0].serviceItem;
        })
        .error(function (error) {
            console.log(error);
        })

    $http.get('http://localhost:3000/projects')
        .success(function (projects) {
            console.log(projects);
            $scope.projects = projects;
        })
        .error(function (error) {
            console.log(error);
        })

    }])
    .controller('FuWUShangCtrl', ['$scope','$http','$stateParams', function ($scope, $http, $stateParams) {
        console.log($stateParams);
    $http.get('http://localhost:3000/sellers')
        .success(function (sellers) {
            console.log($stateParams.id1);
            $scope.index = $stateParams.id1
            /*得到id  根据不同的id 对应显示下面的内容*/
            for (var i = 0; i < sellers.length; i++) {
               if(typeof sellers[i] == "object"){
                   for (var id in sellers[i]) {
                       /* console.log(sellers[i].id);
                        console.log(sellers[i].serviceItem);*/
                   }
               }
                console.log(sellers[i].id);
                if($stateParams.id1 == sellers[i].id){
                    alert("hhh")
                    console.log(sellers[i].serviceItem)
                    $scope.serviceItems = sellers[i].serviceItem
                }
            }

            //console.log($stateParams);
           // var index = $stateParams.id -1
            //$scope.seller = sellers[index];
        })
        .error(function (error) {
            console.log(error);
        })

    }])
    .controller('ServerCtrl', ['$scope','$http', function ($scope, $http) {
        $http.get('http://localhost:3000/sellers')
            .success(function (sellers) {
               // console.log(sellers);
                $scope.sellers = sellers;
            })
            .error(function (error) {
                console.log(error);
            })


    }])
    .controller('loginCtrl',   ['$scope','$http','$rootScope', function ($scope, $http,$rootScope) {
        $scope.isLike = true
        $rootScope.isLike = true;

    }])
    .controller('registerCtrl',  ['$scope','$http','$rootScope' ,function ($scope, $http,$rootScope) {
        $scope.isLike = true
        $rootScope.isLike = true;


    }])
    .controller('MyCtrl',  function ($scope, $http,$location,$rootScope) {
        $scope.isLike = false
        $scope.switch = function () {
            $scope.isLike = !$scope.isLike
        }
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


    })


