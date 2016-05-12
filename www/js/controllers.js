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
        $location.path("/profile");

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
      $location.path("/profile");
    }).catch(function(error){
      console.log(error)
    })

  }

})

.controller("ProfileCtrl", function($scope, $http, $location){
    $scope.user = {}

    // Show default avatar
    $scope.default_avatar = function(){
      console.log("USER AVATAR OBJECT")
      console.log($scope.user.avatar)
      if(typeof $scope.user.avatar.url !== 'undefined'){
        return false
      }else{
        return true
      }
    }
    // Show user avatar
    $scope.user_avatar = function(){
      if(typeof $scope.user.avatar.url === 'undefined'){
        return false
      }else{
        return true
      }
    }


    $scope.renderEdit = function(){
      $scope.showEditForm = true;
    }

    $scope.updateUser = function(){
      console.log($scope.user)

      $http.put("http://localhost:3000/users/" + window.localStorage['id'], $scope.user).then(function(response){
          console.log(response);
          $scope.user = response.data;
          $scope.showEditForm = false;

      })
    }

    var initialize = function(){
      console.log("initializing")
      $http.get("http://localhost:3000/users/" + window.localStorage['id']).then(function(response){

        console.log(response);
        $scope.user = response.data;

      }).catch(function(error){
        console.log(error)

      })
    };

    initialize();

})

.controller("AvatarCtrl", function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService){

  $ionicPlatform.ready(function(){
    $scope.images = FileService.images();
    $scope.$apply();
  });

  $scope.urlForImage = function(imageName){
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }

  $scope.upload = function(){
    // FOR LOCAL FILE STORING
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'take photo' },
        { text: 'photo from library' }
      ],
      titleText: 'add images',
      cancelText: 'cancel',
      buttonClicked: function(index){
        $scope.addImage(index);
      }
    });

    // FOR ONLINE UPLOAD
    // var options = {
    //   fileKey: "avatar",
    //   fileName: "image.png",
    //   chunkedMode: false,
    //   mimeType: "image/png"
    // };

    // // example
    // // 1st .upload param is the remote server/endpoint
    // // 2nd .upload param is where the file is coming from
    // // May need different functions for different devices
    // $cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", "/android_asset/www/img/ionic.png", options).then(function(result) {
    //         console.log("SUCCESS: " + JSON.stringify(result.response));
    //     }, function(err) {
    //         console.log("ERROR: " + JSON.stringify(err));
    //     }, function (progress) {
    //         // constant progress updates
    //     });
  }

  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function(){
      $scope.$apply();
    });
  }
});