angular.module('goodMood')
	.config(function ($urlRouterProvider, $stateProvider) {
	  $urlRouterProvider
	    .otherwise('/');
	  $stateProvider
	    .state('home', {
	      url: '/',
	      controller: 'MyCollaborationsCtrl as myCollaborations',
	      templateUrl: 'collaboration/myCollaborations.html',
	      resolve: {
	        // user: ['User', function (User){
	        //   // console.log('starting mycollab resolves', Date.now())
	        //   return User.getCurrentUser()
	        // }],
	        // collaborations: ['user', function (user){
	        //   return user.$getCollaborations().then(function(collaborations){
	        //     // console.log('finishing mycollab resolves', Date.now())
	        //     return collaborations
	        //   })
	        // }]
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