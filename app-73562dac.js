//instatiate an AngularJS module and inject an dependancy modules
var rentapply = angular.module('rentapply', ['ui.router', 'firebase']);
 
//Configure application states and routes
rentapply.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$compileProvider", function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
    


    //define states
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      })
      .state('profile', {
        url: '/profile/:username',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('apply', {
        url: '/apply',
        templateUrl: 'apply/apply.html',
        controller: 'ApplyCtrl'
      })
      .state('registertofindtenants', {
        url: '/register-to-find-tenants',
        templateUrl: 'register-to-find-tenants/registertofindtenants.html',
        controller: 'RegisterToFindTenantsCtrl'
      })
      .state('find', {
        url: '/find',
        templateUrl: 'find/find.html',
        controller: 'FindCtrl'
      })
      

  }]);//END config

rentapply.controller('ApplyCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout',
  function ($scope, $state, $stateParams, $location, $http, $timeout) {

     var appsRef = new Firebase("https://openhousing.firebaseio.com/applications");

    $scope.current = {};
    $scope.application = {};
    $scope.issues = null;

    $scope.sendApplication = function() {
      $scope.current = appsRef.push($scope.application, function () {
        console.log('New application sent');
        $location.path('/apply/confirm');
      });
    };

    $scope.clearApplication = function(){
      $scope.application = {};
    };


}]);
rentapply.controller('FindCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout',
  function ($scope, $state, $stateParams, $location, $http, $timeout) {
var ref = new Firebase("https://openhousing.firebaseio.com/applications");





    ref.on("value", function(snapshot) {
      
      $scope.applications = snapshot.val();

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    


}]);
rentapply.controller('HomeCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout',
  function ($scope, $state, $stateParams, $location, $http, $timeout) {

   

}]);
rentapply.controller('MainCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout', '$firebaseArray',
  function ($scope, $state, $stateParams, $location, $http, $timeout, $firebaseArray) {


    var ref = new Firebase("https://openhousing.firebaseio.com/users");

    $scope.users = $firebaseArray(ref);

    $scope.openSignUpModal = function(){
      $('#signupModal').modal({'backdrop' : 'static'}); 
    };

    $scope.openSignInModal = function(){
      $('#signinModal').modal({'backdrop' : 'static'}); 
    };

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.password = "";
    $scope.userName = "";

    // $scope.newUser = {
    //   "firstName" : "",
    //   "lastName" : "",
    //   "email" : "",
    //   "password" : ""
    // };

    $scope.signUp = function(firstName, lastName, userName, email, password){
      var user = 
        {
        "firstName" : firstName,
        "lastName" : lastName,
        "userName" : userName,
        "email" : email,
        "password" : password   
      };
      $scope.users.$add(user)
        .then(function(ref) {
          var params = {
            'username' : $scope.users[$scope.users.$indexFor(ref.key())].userName
          }
          $('#signupModal').modal('hide');
          $scope.firstName = "";
          $scope.lastName = "";
          $scope.email = "";
          $scope.password = "";
          $scope.userName = "";
          $state.transitionTo('profile', params, {'reload' : true});

    
        }); 

      
    };

    $scope.signIn = function(user){

    };

}]);
rentapply.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout', '$firebaseArray',
  function ($scope, $state, $stateParams, $location, $http, $timeout, $firebaseArray) {

    var ref = new Firebase("https://openhousing.firebaseio.com/users");


    $scope.user = {};

    $scope.registerModal = function(){
      $('#registerModal').modal({'backdrop' : 'static'}); 
    };

    $scope.register = function(){
        $scope.user.registered = true;
        console.log($scope.user);
        $('#registerModal').modal('hide');
    }


    

    for (var i = 0; i < $scope.users.length; i++) {
        console.log($scope.users[i].userName);
        if($scope.users.userName === $stateParams.username){
            $scope.user = $scope.users[i];
        }
    };



    ref.on("value", function(snapshot) {
      var users = snapshot.val();
      for(key in users){
        if(users[key].userName == $stateParams.username){
            $scope.user = users[key];
        }
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    

}]);
rentapply.controller('RegisterToFindTenantsCtrl', ['$scope', '$stateParams', '$state', '$timeout',
 function ($scope, $stateParams, $state, $timeout) {
   



}]);
(function(module) {
try {
  module = angular.module('rentapply');
} catch (e) {
  module = angular.module('rentapply', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('apply/apply.html',
    '<div class="col-xs-12"><div class="col-xs-12" ng-controller="ApplyCtrl as apply"><div class="jumbotron"><h1>Apply for Housing</h1><p>Description here of what to expect in this page ...</p></div><form><div class="form-group col-xs-6"><label for="applicant_firstname">First Name</label> <input type="text" class="form-control" ng-model="application.firstName" id="applicant_firstname" placeholder="First Name"></div><div class="form-group col-xs-6"><label for="applicant_lastname">Last Name</label> <input type="text" class="form-control" ng-model="application.lastName" id="applicant_lastname" placeholder="Last Name"></div><div class="form-group col-xs-4"><label for="applicant_SSN">SSN</label> <input type="number" class="form-control" ng-model="application.ssn" id="applicant_SSN" placeholder="Enter social security #"></div><div class="form-group col-xs-4"><label for="applicant_drivers_license">Drivers License</label> <input type="number" class="form-control" ng-model="application.driversLicense" id="applicant_drivers_license" placeholder="Enter Drivers License #"></div><div class="form-group col-xs-4"><label for="applicant_phone">Phone Number</label> <input type="phone" class="form-control" ng-model="application.phone" id="applicant_phone" placeholder="Enter Phone Number #"></div><div class="form-group col-xs-12"><label for="applicant_street">Street Current Address</label> <input type="number" class="form-control" ng-model="application.address.street" id="applicant_street" placeholder="Enter Street Address"></div><div class="form-group col-xs-6"><label for="applicant_city">City</label> <input type="number" class="form-control" ng-model="application.address.city" id="applicant_city" placeholder="Enter City"></div><div class="form-group col-xs-2"><label for="applicant_state">State</label> <input type="number" class="form-control" ng-model="application.address.state" id="applicant_state" placeholder="Enter State"></div><div class="form-group col-xs-4"><label for="applicant_postal_code">ZIP Code</label> <input type="number" class="form-control" ng-model="application.address.postal_code" id="applicant_postal_code" placeholder="Postal (ZIP)#"></div><div class="form-group col-xs-4"><label for="applicant_type">Currently Own or Rent</label><div class="radio"><label><input type="radio" name="appType" id="appTypeRent" value="rent" checked=""> Rent</label></div><div class="radio"><label><input type="radio" name="appType" id="appTypeOwn" value="own"> Own</label></div></div><div class="form-group col-xs-12"><button class="btn btn-default" ng-click="sendApplication()">Submit</button> <button class="btn btn-default" ng-click="clearApplication()">Clear</button> <button class="btn btn-warning" ui-sref="home">Home</button></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rentapply');
} catch (e) {
  module = angular.module('rentapply', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('find/find.html',
    '<div class="col-xs-12 col-md-8 col-md-offset-2"><table class="table table-striped"><table class="table table-striped"><thead><tr><th>First Name</th><th>Last Name</th></tr></thead><tbody><tr ng-repeat="applicant in applications"><td>{{applicant.firstName}}</td><td>{{applicant.lastName}}</td></tr></tbody></table></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rentapply');
} catch (e) {
  module = angular.module('rentapply', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/home.html',
    '<div class="col-xs-12"><div class="col-md-6 col-md-offset-3"><div class="col-xs-12"><h1 style="font-size : 100px; font-family: \'Cabin Sketch\', cursive;">Rent Apply</h1></div><div class="col-xs-12"><hr></div><img class="img-responsive" src="http://media.reserveatlakekeowee.com/2013/02/slider_area_asheville_1-1280x651.jpg" alt=""><hr><div class="col-xs-12"><p>RentApply is for people. We are a community network that matches tenants and landlords through a simple online process. Once you join, renters can choose from listings that meet their needs, while landlords can easily search for tenants who match their available properties. One registration, one fee, one credit check.</p></div><div ui-view=""></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rentapply');
} catch (e) {
  module = angular.module('rentapply', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('profile/profile.html',
    '<div class="col-xs-12 col-md-6 col-md-offset-3"><h1 class="text-center">Welcome {{user.firstName}} {{user.lastName}}</h1><div class="col-xs-12"><a href="#/apply" class="btn btn-primary btn-lg col-xs-12" style="margin-top : 20px">Submit a Rental Application</a> <a ng-if="!user.registered" ng-click="registerModal()" class="btn btn-primary btn-lg col-xs-12" style="margin-top : 20px">Register to find Tenants</a> <a ng-if="user.registered" href="#/find" class="btn btn-primary btn-lg col-xs-12" style="margin-top : 20px">Find Tenants</a></div><div id="registerModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Register to find Tenants</h4></div><div class="modal-body"><form><div class="checkbox"><label><input type="checkbox"> I want to register</label></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" ng-click="register()">Register</button></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('rentapply');
} catch (e) {
  module = angular.module('rentapply', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('register-to-find-tenants/registertofindtenants.html',
    '<div><h1>Register to find tenants form</h1></div>');
}]);
})();
