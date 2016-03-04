angular.module('topThat.controllers', [])

.controller('UserCtrl', function($scope, Users){
  Users.query().$promise.then(function(response){
    $scope.users = response 
  })

})

.controller("LoginCtrl", function($scope, $http){
    $scope.user = {}

 $scope.loginSubmit = function(){
    console.log($scope.user) 
    console.log("bing")
    $http.post("http://localhost:3000/sessions", $scope.user).then(function(response){
        console.log(response)
    });

  }

})
