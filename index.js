angular.module('myApp', ['ui.router'])//创建模块对象
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'html/main.html',
                controller: 'MainCtrl'
            })
            .state('server', {
                url: '/server',
                templateUrl: 'html/server.html',
                controller: 'ServerCtrl'
            })
            .state('fuwushang', {
                url: '/fuwushang/:id1',
                templateUrl: 'html/fuwushang.html',
                controller: 'FuWUShangCtrl'
            })
            .state('detail', {
                url: '/detail/:id2',
                templateUrl: 'html/detail.html',
                controller: 'DetailCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'html/login.html',
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'html/register.html',
                controller: 'registerCtrl'
            })

        $urlRouterProvider.otherwise('/main');
    }])
    .controller('MainCtrl', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {
        $rootScope.show = true
        $http.get('http://localhost:3000/sellers')
            .success(function (sellers) {
                //console.log(sellers[0].serviceItem);
                $scope.sellers = sellers[0].serviceItem;
            })
            .error(function (error) {
                console.log(error);
            })





        $http.get('http://localhost:3000/projects')
            .success(function (projects) {
                // console.log(projects);
                $scope.projects = projects;
                //console.log($scope.projects );
                if ($scope.projects) {
                    console.log("hhh");
                    for (var i = 0; i < $scope.projects.length; i++) {
                        $scope.projects[i].index = i;

                    }
                    console.log(i);
                    /* console.log(obj);*/
                }
            })
            .error(function (error) {
                console.log(error);
            })

    }])
    .controller('FuWUShangCtrl', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
        //console.log($stateParams);
        if(event.preventDefault){
            event.preventDefault()
        }else{
            event.returnValue = false
        }
        $rootScope.isShow = true
        $rootScope.show = false
        var arr = []
        $http.get('http://localhost:3000/sellers')
            .success(function (data) {
                //  console.log($stateParams.id1);
                $scope.index = $stateParams.id1
                $rootScope.type = $stateParams.id1
                //console.log($rootScope.type);
                /*得到id  根据不同的id 对应显示下面的内容*/
                for (var i = 0; i < data.length; i++) {
                    if (typeof data[i] == "object") {
                        for (var id in data[i]) {
                        }
                    }
                    //console.log(sellers[i].id);
                    if ($stateParams.id1 == data[i].id) {
                        // alert("hhh")
                        //  console.log(sellers[i].serviceItem)
                        arr = data[i].serviceItem
                        $scope.serviceItems = arr

                        var seller = {
                            name: data[i].name,
                            id: data[i].id,
                            img: data[i].img,
                            imgSmall: data[i].imgSmall,
                            sales: data[i].sales,
                            goodRate: data[i].goodRate,
                            details: data[i].details,
                            necessary: data[i].necessary,
                            users: data[i].users,
                            salesRate: data[i].salesRate

                        }
                        // console.log(sellers[i].name,seller);
                        $scope.seller = seller;

                    }
                }
            })
        $scope.moreProjects = function () {
            console.log("hhh");
            $http.get('http://localhost:3000/sellers')
                .success(function (sellers) {
                    $scope.index = $stateParams.id1
                    $rootScope.type = $stateParams.id1
                    for (var i = 0; i < sellers.length; i++) {
                        if (typeof sellers[i] == "object") {
                            for (var id in sellers[i]) {
                            }
                        }
                        if ($stateParams.id1 == sellers[i].id) {
                            var serviceItems = sellers[i].serviceItem
                            arr = arr.concat(serviceItems)
                            $scope.serviceItems = arr
                        }
                    }
                })
            }
    }])
    .controller('DetailCtrl', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
        $rootScope.isShow = true
        $rootScope.show = false
        $http.get('http://localhost:3000/sellers')
            .success(function (sellers) {
                $scope.sellers = sellers;
                console.log($rootScope.type);
                var id1 = $rootScope.type
                /* 只需要拿到服务商的id 遍历每一个服务商里面的serviceItems里面的每一个*/
                // console.log($stateParams.id2);
                for (var i = 0; i < sellers.length; i++) {
                    if (typeof sellers[i] == "object") {
                        for (var id in sellers[i]) {
                        }
                    }
                    //console.log(sellers[i].id);
                    if (id1 == sellers[i].id) {
                        // alert("hhh")
                        //console.log(sellers[i].serviceItem)
                        $scope.serviceItems = sellers[i].serviceItem
                        var serviceItems = sellers[i].serviceItem
                        console.log(serviceItems);
                        $scope.item = serviceItems.find(function (item) {
                            return item.id == $stateParams.id2
                        })
                        console.log($scope.item);

                        var seller = {
                            name: sellers[i].name,
                            id: sellers[i].id,
                            img: sellers[i].img,
                            imgSmall: sellers[i].imgSmall,
                            sales: sellers[i].sales,
                            goodRate: sellers[i].goodRate,
                            details: sellers[i].details,
                            necessary: sellers[i].necessary,
                            users: sellers[i].users,
                            salesRate: sellers[i].salesRate

                        }
                        // console.log(sellers[i].name,seller);
                        $scope.seller = seller;


                    }
                }
            })
            .error(function (error) {
                console.log(error);
            })


    }])
    .controller('ServerCtrl', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {
        $rootScope.isShow = true
        $rootScope.show = false
        var arr = []
        $http.get('http://localhost:3000/sellers')
            .success(function (data) {
                // console.log(sellers);
                arr = data;
                $scope.sellers = arr;
            })
        $scope.moreSales = function () {
            $http.get('http://localhost:3000/sellers')
                .success(function (data) {
                    // console.log(sellers);
                    arr = arr.concat(data);
                    $scope.sellers = arr;
                })
        }


    }])

    .controller('loginCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        console.log($rootScope.isShow);
       $rootScope.isShow = false
        $rootScope.show = false

    }])
    .controller('registerCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
       $rootScope.isShow = false
        $rootScope.show = false
    }])
    .controller('MyCtrl', function ($scope, $http, $location, $rootScope) {
        $rootScope.isShow = true
        $rootScope.show = true
        $(window).scroll(function ()
        {
            var st = $(this).scrollTop();
            console.log(st);
            if(st >10 && st < 200){
                $('#header').fadeOut()
            } else if (st == 0){
                $('#header').fadeIn(1)
            }else {
                $('#header').fadeIn(2000)
            }
        });


    })


