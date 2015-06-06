rentapply.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout', '$firebaseArray',
  function ($scope, $state, $stateParams, $location, $http, $timeout, $firebaseArray) {

    var ref = new Firebase("https://openhousing.firebaseio.com/users");

    $scope.users = $firebaseArray(ref);
    console.log($scope.users);

    $scope.user = {};

    console.log($stateParams.username);

    
    $scope.users.$loaded(function(data){
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].userName);
            if(data.userName === $stateParams.username){
                $scope.user = $scope.users[i];
            }
        };
    })
    

    console.log($scope.users);

}]);