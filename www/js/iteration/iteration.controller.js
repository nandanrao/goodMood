angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $rootScope, $window, $log, $timeout, $state, $stateParams, $ionicLoading, $ionicHistory, Collaboration, Iteration, Thread){

		var collaboration,
				iteration,
				threads;

		Collaboration.findById($stateParams.c_id).then(function(collaboration){
			$scope.collaborationName = collaboration.name;
			return collaboration.$getIterations()	
		})
		.then(function(iterations){
			$scope.iterations = iterations;
		})

	  var iterationPromise = Iteration.findById($stateParams.i_id).then(function(_iteration){
	  	iteration = _iteration;
	  	iteration.$getThreads().then(function(_threads){
	  		threads = _threads;
	  		$scope.threads = threads;
	  	})
	  	iteration.$getImage().then(function(_image){
	  		$scope.image = _image;
	  	})
	  })

	  $scope.$on('$ionicView.enter', function(){
	  	iterationPromise.then(function(){
	  		$ionicLoading.hide()
	  	})
	  })


		var vm = this;

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
				
		$scope.threads = threads;
		
		$scope.instructionsRead = false;

		$scope.$watch(function(){
			console.count('iteration digest run')
		})

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
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('thread', {t_id: thread.$id})
				})
		}
		
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

		// This does not seem to actually be making a difference... 
		$scope.$on('$ionicView.leave', function(){
			_.forEach(threads, function(thread){
				thread.$destroy()
			})			
		})

		$ionicLoading.hide()
	})