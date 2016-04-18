angular.module('topThat.controllers', [])

.controller('UserCtrl', function($scope, Users){
  Users.query().$promise.then(function(response){
    console.log(response)
    $scope.users = response 
  })

})

.controller("LoginCtrl", function($scope, $http, $location){
    $scope.user = {}
    $scope.showLoginForm = true

    $scope.toggleAuthenticationForm = function(){
      console.log("inside toggle function");
      if($scope.showLoginForm){
        $scope.showLoginForm = false
      }else{
        $scope.showLoginForm = true
      }
    }

 $scope.loginSubmit = function(){
    console.log($scope.user) 
    console.log("bing")
    $http.post("http://localhost:3000/sessions", $scope.user).then(function(response){
        console.log(response.data)
        window.localStorage['id'] = response.data.id
        $location.path("/profile/");

    }).catch(function(error){ 
      console.log(error)
    });

  }

  $scope.signUp = function(){
    console.log("Inside Sign Up function");
    console.log($scope.user);
    $http.post("http://localhost:3000/users", $scope.user).then(function(response){
      console.log(response.data)
      window.localStorage['id'] = response.data.id
      $location.path("/profile/");
    }).catch(function(error){
      console.log(error)
    })

  }

})

.controller("ProfileCtrl", function($scope, $http, $location){
    $scope.user = {}

})
