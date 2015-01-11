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
          // console.log('starting mycollab resolves', Date.now())
          return User.getCurrentUser()
        }],
        collaborations: ['user', function (user){
          return user.$getCollaborations().then(function(collaborations){
            // console.log('finishing mycollab resolves', Date.now())
            return collaborations
          })
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
    // .state('collaboration', {
    //   abstract: true,
    //   url: 'collaboration/:c_id',
    //   templateUrl: 'collaboration/collaboration.html',
    //   resolve: {
    //     collaboration: ['Collaboration', '$stateParams', function (Collaboration, $stateParams){
    //       return Collaboration.findById($stateParams.c_id)
    //     }],
    //   }
    // })
    // .state('collaboration.timeline', {
    //   url: '/timeline',
    //   controller: 'TimelineCtrl as timeline',
    //   templateUrl: 'collaboration/timeline.html',
    //   resolve: {
    //     iterations: ['collaboration', function (collaboration){
    //       return collaboration.$getIterations()
    //     }]
    //   }
    // })
    // .state('collaboration.threads', {
    //   url: '/threads',
    //   controller: 'CollaborationThreadsCtrl as collaborationThreads',
    //   templateUrl: 'collaboration/threads.html',
    //   resolve: {
    //     threads: ['collaboration', function (collaboration){
    //       return collaboration.$getThreads()
    //     }]
    //   }
    // })
    .state('thread', {
      url: 'thread/:t_id',
      controller: 'ThreadCtrl as thread',
      templateUrl: 'thread/thread.html',
      resolve: {
        // thread: ['Thread', '$stateParams', function (Thread, $stateParams){
        //   return Thread.findById($stateParams.t_id)
        // }],
        // messages: ['thread', function (thread){
        //   return thread.$getMessages()
        // }]
      }
    })
    .state('newIteration', {
      url: 'collaboration/:c_id/newiteration',
      controller: 'NewIterationCtrl as newIteration',
      templateUrl: 'iteration/newiteration.html',
      resolve: {
        collaboration: ['Collaboration', '$stateParams', function (Collaboration, $stateParams){
          return Collaboration.findById($stateParams.c_id)
        }]
      }
    })
    .state('iteration', {
      url: 'collaboration/:c_id/iteration/:i_id',
      controller: 'IterationCtrl as iteration',
      templateUrl: 'iteration/iteration.html',
      resolve: {
        // collaboration: ['Collaboration', '$stateParams', function (Collaboration, $stateParams){
        //   return Collaboration.findById($stateParams.c_id)
        // }],
        // iteration: ['Iteration', '$stateParams', function (Iteration, $stateParams){
        //   return Iteration.findById($stateParams.i_id)
        // }],
        // iterations: ['collaboration', function (collaboration){
        //   return collaboration.$getIterations()
        // }],
        // threads: ['iteration', function (iteration){
        //   return iteration.$getThreads()
        // }],
        // image: ['iteration', function (iteration){
        //   return iteration.$getImage()
        // }] 
      }
    })
})
.config(function($cordovaFacebookProvider) {
  var appID = 759883230731625;
  var version = "v2.0"; // or leave blank and default is v2.0
  $cordovaFacebookProvider.browserInit(appID, version);
})
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);
})
// .config(function($ionicConfigProvider){
//   $ionicConfigProvider.views.maxCache(0);
// })
.run(function($ionicPlatform, $state, $location, $rootScope, Auth, $ionicLoading) {
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
    // $ionicLoading.hide()
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
    // console.log('state change error', toState.name, error.message)
    $state.go("login", {notify: false});
  });
  $rootScope.$on('$stateChangeStart', function(event, toState){
    $ionicLoading.show()
    // console.log('statechange start', toState.name)
  })

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