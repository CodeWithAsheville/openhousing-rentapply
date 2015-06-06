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