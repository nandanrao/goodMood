angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $rootScope, $window, $log, $timeout, $state, $ionicLoading, $ionicHistory, collaboration, iteration, iterations, threads, Thread, image){
		var vm = this;

		// Create iterations array for inter-iteration navigation
		$scope.iterations = iterations;
		setIterationArray()
		$scope.$watchCollection('iterations', function(curr, old){
			setIterationArray()
		})
		function setIterationArray(){
			var iterationArray = _.keys($scope.iterations).sort();	
			var currentIndex = iterationArray.indexOf(iteration.$id);	
			$scope.previous = iterationArray[currentIndex - 1];
			$scope.next = iterationArray[currentIndex + 1];
		}

		$scope.collaborationName = collaboration.name;		
		$scope.threads = threads;
		$scope.image = image;
		$scope.instructionsRead = false;

		$scope.$watch(function(){
			console.count('iteration digest run')
		})

		this.hasThreads = function(){
			return _.size(threads) > 0
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
		$scope.$on('$ionicView.afterLeave', function(){
			_.forEach(threads, function(thread){
				thread.$destroy()
			})			
		})

		$ionicLoading.hide()
	})