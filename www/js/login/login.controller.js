angular.module('goodMood')
  .controller('LoginCtrl', function ($scope, $ionicLoading, Auth, User, utils, $q, $window, $log, $state){
    $ionicLoading.hide()
    $scope.local = false;
    $scope.register = false;
    $scope.form = {};

    this.authLogin = function(authProvider){
      var authObj;
      var options = {};
      $ionicLoading.show()
      return Auth.viaOAuth(authProvider)
        .then(function(_authObj){
          authObj = _authObj;
          return User.findByAuth(authProvider, authObj)
        })
        .then(function(user){
          if (!user){
            return User.create(authProvider, authObj)
                      .then(function(user){
                        $log.debug('created user', user)
                        $state.go('home')
                        return user;
                      })
          }
          else {
            $log.debug('already a user', user)
            $state.go('home')
            return user;
          }
        })
        .catch(function(err){
          $log.error('Login Error: ', err)
          $window.alert('Sorry, we could not log you in, try again?')
          $ionicLoading.hide()
        })
    }

    this.showLocalLogin = function(){
      $scope.local = !$scope.local;  
    }

    this.register = function(){
      if (!$scope.register){
        $scope.register = true;
      }
      else {
        submitForm($scope.form)
      }
    }

    this.login = function(){
      submitForm($scope.form)
        .then(function(user){
          alert('logged in!')
          $state.go('home')
        })
        .catch(function(err){
          alert(err)
        })
    }

    function submitForm(form){
      var id = utils.escapeEmailAddress(form.email)
      var deferred = $q.defer()
      if ($scope.loginForm.$valid){
        if (form.passRepeat) {
          console.log('registering')
          Auth.$createUser(form.email, form.password)
            .then(User.create.bind(null, null, form))
            .then(deferred.resolve)
        }
        else {
          deferred.resolve()
        }
        console.log('logging in')
        return deferred.promise
          .then(Auth.$authWithPassword.bind(null, form))
          .then(function(authObj){
            return User.findById(id)
          })  
      }
      else {
        alert('nope form not right')
      }
    }

    
  })