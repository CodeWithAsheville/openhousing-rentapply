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