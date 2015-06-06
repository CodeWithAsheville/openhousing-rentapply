rentapply.controller('FindCtrl', ['$scope', '$state', '$stateParams', '$location', '$http', '$timeout',
  function ($scope, $state, $stateParams, $location, $http, $timeout) {
var ref = new Firebase("https://openhousing.firebaseio.com/applications");





    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      $scope.applications = snapshot.val();

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    


}]);