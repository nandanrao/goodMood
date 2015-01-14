angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $q, $rootScope, $window, $log, $timeout, $state, $stateParams, $ionicLoading, $ionicHistory, Collaboration, Iteration, Thread){

		var vm = this;
		var collaboration,
				iteration,
				threads,
				resolve;

		function init(){
			var collaborationResolve = Collaboration.findById($stateParams.c_id).then(function(_collaboration){
				collaboration = _collaboration;
				$scope.collaborationName = collaboration.name;
				return collaboration.$getIterations()	
			})
			.then(function(iterations){
				$scope.iterations = iterations;
				return
			})

		  var iterationResolve = Iteration.findById($stateParams.i_id).then(function(_iteration){
		  	iteration = _iteration;
		  	var threadsResolve = iteration.$getThreads().then(function(_threads){
		  		threads = _threads;
		  		$scope.threads = threads;
		  		return
		  	})
		  	var imageResolve = iteration.$getImage().then(function(image){
		  		image.$getSmall().then(function(uri){
		  			$scope.imageURI = uri
		  		})
		  		return
		  	})
		  	return $q.all([threadsResolve, imageResolve])
		  })
		  resolve = $q.all([collaborationResolve, iterationResolve])
		}

		// Use 'enter' instead of 'loaded' so animation completes
		$scope.$on('$ionicView.enter', function(){
			if (!resolve){
				init()	
				resolve.then(function(){
					console.log('iteration resolved', Date.now())
					$scope.imageLoaded.then(function(){
						console.log('image size resolved', Date.now())
						$ionicLoading.hide()
					})
				})
			}
		})
		
	  $scope.$on('$ionicView.beforeEnter', function(){
	  	if (resolve){
	  		resolve.then(function(){
	  			$ionicLoading.hide()
	  		})	
	  	}
	  })

	  $scope.$on('swipedown', function(){
	  	if($scope.previous) {
	  		$ionicLoading.show()
	  		goToIteration($scope.previous)
	  	}
	  })

	  $scope.$on('swipeup', function(){
	  	if($scope.next) {
	  		$ionicLoading.show()
	  		goToIteration($scope.next)
	  	}
	  })

		// Create iterations array for inter-iteration navigation
		$scope.$watchCollection('iterations', function(curr, old){
			setIterationArray()
		})
		function setIterationArray(){
			if (!iteration || !$scope.iterations){
				return
			}
			var iterationArray = _.keys($scope.iterations).sort();	
			var currentIndex = iterationArray.indexOf(iteration.$id);	
			$scope.previous = iterationArray[currentIndex - 1];
			$scope.next = iterationArray[currentIndex + 1];
		}

		$scope.$watch(function(){
			console.count('iteration digest run')
		})
				
		$scope.instructionsRead = false;

		this.hasThreads = function(){
			return true;
			// return !!threads ? _.size(threads) > 0 : true
		}

		this.readInstructions = function(){
			$scope.instructionsRead = true
		} 

		this.addIteration = function(){
			$state.go('newIteration', {c_id: collaboration.$id})
		}

		this.showCheck = function(){
			return false
		}

		this.done = function(){
			console.log('done!')
		}

		this.showAddIteration = function(){
			return !this.showCheck() && !$scope.next && _.size(threads) > 0
		}

		this.goBack = function(){
			$ionicHistory.nextViewOptions({
			  historyRoot: true
			});
			$state.go('home')
		}

		function goToIteration(id){ 
			$ionicHistory.nextViewOptions({
				disableAnimate: true
			})
			$state.go('iteration', {c_id: collaboration.$id, i_id: id})
		}

		this.addThread = function(coords){
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(function(thread){
					$state.go('thread', {t_id: thread.$id})
					return thread
				})
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
		}
	})