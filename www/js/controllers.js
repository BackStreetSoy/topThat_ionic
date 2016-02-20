angular.module('topThat.controllers', [])

.controller('UserCtrl', function($scope, Users){
  console.log("ding")
  Users.query().$promise.then(function(response){
    $scope.users = response 
  })


})
