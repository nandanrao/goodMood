angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $window, $log, $timeout, $state, $ionicLoading, $ionicHistory, collaboration, iteration, threads, Thread, image){
		var vm = this;

		// Create iterations array for inter-iteration navigation
		$scope.iterations;
		collaboration.$getIterations().then(function(iterations){
			$scope.iterations = iterations;
		})
		$scope.$watchCollection('iterations', function(curr, old){
			var iterationArray = _.keys($scope.iterations).sort();	
			var currentIndex = iterationArray.indexOf(iteration.$id);	
			$scope.previous = iterationArray[currentIndex - 1];
			$scope.next = iterationArray[currentIndex + 1];
		})

		$scope.collaborationName = collaboration.name;		
		$scope.threads = threads;	
		$scope.image = image;
		$scope.instructionsRead = false;

		this.hasThreads = function(){
			return _.size(threads) > 0
		}

		this.readInstructions = function(){
			$scope.instructionsRead = true
		} 

		this.addIteration = function(){
			$state.go('newIteration', {c_id: collaboration.$id})
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

		$scope.$on('addThread', function(event, coords){
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('thread', {t_id: thread.$id})
				})
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

		$ionicLoading.hide()

	})