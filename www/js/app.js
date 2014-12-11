// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('goodMood', [
  'ionic',
  'ui.router',
  'firebase',
  'ngTemplates',
  'ngCordova'
  ])
.config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider
    .otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'MyCollaborationsCtrl as myCollaborations',
      templateUrl: 'collaboration/myCollaborations.html',
      resolve: {
        user: ['User', function (User){
          return User.getCurrentUser()
        }],
        collaborations: ['user', function (user){
          return user.$getCollaborations()
        }]
      }
    })
    .state('login', {
      url: '/login/:redirect',
      controller: 'LoginCtrl as login',
      templateUrl: 'login/login.html',
    })
    .state('newCollaboration', {
      url: '/newcollaboration',
      controller: 'NewCollaborationCtrl as newCollaboration',
      templateUrl: 'collaboration/newcollaboration.html',
      resolve: {
        user: ['User', function (User){
          return User.getCurrentUser()
        }]
      }
    })
    .state('newIteration', {
      url: '/collaboration/:c_id/iteration',
      controller: 'NewIterationCtrl as newIteration',
      templateUrl: 'iteration/newiteration.html',
      resolve: {
        collaboration: ['Collaboration', '$stateParams', function (Collaboration, $stateParams){
          return Collaboration.findById($stateParams.c_id).then(function(collaboration){
            console.log('holla')
            return collaboration
          }, function(err){
            console.log('err', err)
          })
          // return Collaboration.findById($stateParams.c_id)
        }]
      }
    })
    .state('iteration', {
      url: '/collaboration/:c_id/iteration/:i_id',
      controller: 'IterationCtrl as iteration',
      templateUrl: 'iteration/iteration.html'
    })

    
})
.config(function($cordovaFacebookProvider) {
  var appID = 759883230731625;
  var version = "v2.0"; // or leave blank and default is v2.0
  $cordovaFacebookProvider.setAppID(appID, version);
})
.run(function($ionicPlatform, $state, $location, $rootScope, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams){
    // console.log('state change success', toState.name)
    if (!Auth.$getAuth()){
      event.preventDefault()
      var href = $state.href(toState, toParams)
      if (toState.name === 'login'){
        href = '/'
      };
      href = encodeURIComponent(href)
      $location.path('login/' + href)
    }
    else if (Auth.$getAuth() && toState.name === 'login'){
      event.preventDefault()
      $location.path('/')
    }
  })
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // console.log('state change error', toState)
    $state.go("login", {notify: false});
  });

})
.filter('orderObjectBy', function() {
  return function (items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    function index(obj, i) {
      return obj[i];
    }
    filtered.sort(function (a, b) {
      var comparator;
      var reducedA = field.split('.').reduce(index, a);
      var reducedB = field.split('.').reduce(index, b);
      if (reducedA === reducedB) {
        comparator = 0;
      } 
      else if (!reducedA || reducedA > reducedB){
        comparator = 1
      }
      else {
        comparator = -1
      }
      return comparator;
    });
    if (reverse) {
      filtered.reverse();
    }
    return filtered;
  };
});