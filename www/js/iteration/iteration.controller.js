angular.module('goodMood')
	.controller('IterationCtrl', function ($scope, $window, $log, $timeout, $state, $ionicLoading, $ionicHistory, collaboration, iteration, threads, Thread, image){
		var vm = this;

		$scope.currentIteration = iteration;
		$scope.collaboration = collaboration;
		$scope.iterationArray = _.keys(collaboration.iterations).sort();
		$scope.drawing;
		$scope.colabits = collaboration.iterations
		$scope.threads = threads;	
		$scope.imgURI = "data:image/jpeg;base64," + image.$value;
		$scope.currentIndex = $scope.iterationArray.indexOf(iteration.$id);
		$scope.previous = $scope.iterationArray[$scope.currentIndex - 1];
		$scope.next = $scope.iterationArray[$scope.currentIndex + 1];
		$scope.last = _.last($scope.iterationArray) === iteration.$id;
		$scope.instructionsRead = false;
		

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