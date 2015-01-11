
module.exports = function ( karma ) {

  karma.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: './',

    files: [
    // assets
    {pattern: 'www/img/**/*', watched: false, included: false, served: true},
    /**
     * Filled by the task `gulp karma-conf`
     */
    // testfiles:js
      'www/lib/angular/angular.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-sanitize/angular-sanitize.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/ionic/js/ionic.js',
      'www/lib/ionic/js/ionic-angular.js',
      'www/lib/lodash/dist/lodash.compat.js',
      'www/lib/firebase/firebase.js',
      'www/lib/angularfire/dist/angularfire.js',
      'www/lib/jdataview/dist/browser/jdataview.js',
      'www/lib/bacon/dist/Bacon.js',
      'www/lib/firebase-util.min/index.js',
      'www/lib/paper/dist/paper-full.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/mockfirebase/browser/mockfirebase.js',
      'www/lib/mocks/authMock.js',
      'www/lib/mocks/fbMock.js',
      'www/lib/mocks/stateMock.js',
      'www/lib/templates/templates.js',
      'www/js/app.js',
      'www/js/components/newiterationbutton.directive.js',
      'www/js/components/imageresize.service.js',
      'www/js/components/fileuploader.service.js',
      'www/js/components/fileinput.directive.js',
      'www/js/components/checkbutton.directive.js',
      'www/js/components/addbutton.directive.js',
      'www/js/utils/utils.service.js',
      'www/js/user/user.service.js',
      'www/js/thread/voicemessage.directive.js',
      'www/js/thread/voicemessage-record.directive.js',
      'www/js/thread/voicemessage-play.directive.js',
      'www/js/thread/voicemessage-line.directive.js',
      'www/js/thread/voicemessage-audio.directive.js',
      'www/js/thread/thread.service.js',
      'www/js/thread/thread.controller.js',
      'www/js/thread/textmessage.directive.js',
      'www/js/thread/record-light.directive.js',
      'www/js/thread/newdaymessage.directive.js',
      'www/js/thread/messagedivider.directive.js',
      'www/js/thread/filesystemnormalization.js',
      'www/js/thread/drawing.directive.js',
      'www/js/iteration/newiteration.controller.js',
      'www/js/iteration/iteration.service.js',
      'www/js/iteration/iteration.image.directive.js',
      'www/js/iteration/iteration.controller.js',
      'www/js/iteration/iteration.canvas.directive.js',
      'www/js/iteration/desktopupload.directive.js',
      'www/js/sidemenu/sidemenu.directive.js',
      'www/js/login/login.controller.js',
      'www/js/login/localLogin.directive.js',
      'www/js/image/image.service.js',
      'www/js/fb/fb.js',
      'www/js/facebook/facebookConnectPlugin.service.js',
      'www/js/facebook/facebook.service.js',
      'www/js/collaboration/timeline.controller.js',
      'www/js/collaboration/newcollaboration.controller.js',
      'www/js/collaboration/myCollaborations.controller.js',
      'www/js/collaboration/collaboration.service.js',
      'www/js/collaboration/collaboration.defaultbackground.service.js',
      'www/js/cloud/cloud.service.js',
      'www/js/audio/audio.service.js',
      'www/js/Auth/Auth.service.js',
      'www/js/Auth/Auth.service_test.js',
      'www/js/cloud/cloud.service_test.js',
      'www/js/collaboration/collaboration.service_test.js',
      'www/js/collaboration/myCollaborations.controller_test.js',
      'www/js/collaboration/newcollaboration.controller_test.js',
      'www/js/collaboration/timeline.controller_test.js',
      'www/js/image/image.service_test.js',
      'www/js/login/localLogin.directive_test.js',
      'www/js/login/login.controller_test.js',
      'www/js/iteration/iteration.controller_test.js',
      'www/js/iteration/iteration.service_test.js',
      'www/js/iteration/newiteration.controller_test.js',
      'www/js/thread/thread.service_test.js',
      'www/js/user/user.service_test.js',
      'www/js/utils/utils.service_test.js',
      'www/js/components/fileuploader.service_test.js'
      // endinject
      ,
      // 'www/**/*.html',
      ],

    frameworks: [ 'mocha', 'chai-sinon'],
    plugins: [ 'karma-mocha', 'karma-chai-sinon', 'karma-chrome-launcher', 'karma-coverage'],

    // preprocessors: {
    //   'www/js/**/*.js': 'coverage'
    // },
    /**
     * How to report, by default.
     */
    reporters: ['progress'], 

    /**
     * Show colors in output?
     */
    colors: true,

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9099,
    runnerPort: 9100,
    urlRoot: '/',

    /**
     * Disable file watching by default.
     */
    autoWatch: true,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9099/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Chrome'
    ]
  });
};