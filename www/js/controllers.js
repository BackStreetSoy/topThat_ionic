angular.module('topThat.controllers', [])

.controller('UserCtrl', function($scope, Users){
  Users.query().$promise.then(function(response){
    $scope.users = response 
  })

})

.controller("LoginCtrl", function($scope){
  // $scope.email = ""
  // $scope.password = ""

 $scope.loginSubmit = function(){
    console.log($scope.email) 
    console.log($scope.password)
    console.log("bing");

  }

})
