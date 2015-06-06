rentapply.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout', '$firebaseArray',
  function ($scope, $state, $stateParams, $location, $http, $timeout, $firebaseArray) {

    var ref = new Firebase("https://openhousing.firebaseio.com/users");

    //$scope.users = $firebaseArray(ref);
    console.log($scope.users);

    $scope.user = {};

    $scope.registerModal = function(){
      $('#registerModal').modal({'backdrop' : 'static'}); 
    };

    $scope.register = function(){
        $('#registerModal').modal('hide');
    }

    console.log($stateParams.username);

    

    for (var i = 0; i < $scope.users.length; i++) {
        console.log($scope.users[i].userName);
        if($scope.users.userName === $stateParams.username){
            $scope.user = $scope.users[i];
        }
    };

    
    

    console.log($scope.users);

}]);