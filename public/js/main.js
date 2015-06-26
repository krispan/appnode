var app = angular.module('agile',['ngRoute']);

app.config(function ($routeProvider){
    $routeProvider.
            when('/home/', {templateUrl: 'views/home.html', controller: 'HomeController'}).
           	when('/users/', {templateUrl: 'views/users.html', controller: 'UserController'}).
            /* when('/second/', {templateUrl: 'parts/second.html', controller: 'SecondController'}).
            when('/third/', {templateUrl: 'parts/third.html', controller: 'ThirdController'}).
             when('/departments/', {templateUrl: 'parts/departments.html', controller: 'DeptController'}).*/
            otherwise({redirectTo: '/home'});

});

app.controller('HomeController',function ($scope){




});

app.controller('UserController',function ($scope){




});

