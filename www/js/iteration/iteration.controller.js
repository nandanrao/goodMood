angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $window, $log, $timeout, $state, $ionicLoading, $ionicHistory, collaboration, iteration, iterations, threads, Thread, image){
		var vm = this;

		$scope.currentIteration = iteration;
		$scope.collaboration = collaboration;
		$scope.iterations = iterations;
		$scope.$watchCollection('iterations', function(curr, old){
			var iterationArray = _.keys($scope.iterations).sort();	
			var currentIndex = iterationArray.indexOf(iteration.$id);	
			$scope.previous = iterationArray[currentIndex - 1];
			$scope.next = iterationArray[currentIndex + 1];
		})
		
		$scope.threads = threads;	
		$scope.image = image;
		$scope.instructionsRead = false;
		$scope.drawing;
		

		this.hasThreads = function(){
			return _.size(threads) > 0
		}

		this.readInstructions = function(){
			$scope.instructionsRead = true
		} 

		this.addIteration = function(){
			$state.go('^.^.newIteration')
		}

		this.goBack = function(){
			$ionicHistory.nextViewOptions({
			  historyRoot: true
			});
			$state.go('home')
		}

		this.previous = function(){ 
			if($scope.previous){
				$ionicHistory.nextViewOptions({
					disableAnimate: true
				})
				$state.go('^.view', {i_id: $scope.previous})
			}
		}

		this.next = function(){
			if($scope.next){
				$ionicHistory.nextViewOptions({
					disableAnimate: true
				})
				$state.go('^.view', {i_id: $scope.next})
			} 
		}

		$scope.$on('$ionicView.enter', function(){
			console.log('view entered', collaboration)
			$scope.$apply()
		})

		$scope.$on('addThread', function(event, coords){
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('^.^.thread', {t_id: thread.$id})
				})
		})
		
		$scope.$on('swipedown', function(){
			console.log('previous: ', $scope.previous)
			vm.previous()
		})

		$scope.$on('swipeup', function(){
			console.log('next: ', $scope.next)
			vm.next()
		})

		$scope.$on('swiperight', function(){
			console.log('swipe right!')
			$state.go('home')
		})

	})