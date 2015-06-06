//instatiate an AngularJS module and inject an dependancy modules
var rentapply = angular.module('rentapply', ['ui.router']);
 
//Configure application states and routes
rentapply.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
    


    //define states
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      })
      .state('home.apply', {
        url: '/apply',
        templateUrl: 'apply/apply.html',
        controller: 'ApplyCtrl'
      })
      .state('home.renter', {
        url: '/renter/:id',
        templateUrl: 'renter/renter.html',
        controller: 'RenterCtrl'
      })
      .state('home.landlord', {
        url: '/landlord/:id',
        templateUrl: 'landlord/landlord.html',
        controller: 'LandlordCtrl'
      })
      

  });//END config
