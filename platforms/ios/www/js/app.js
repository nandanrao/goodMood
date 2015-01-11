angular.module('goodMood', [
  'ionic',
  'ui.router',
  'firebase',
  'ngTemplates',
  'ngCordova'
  ])
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