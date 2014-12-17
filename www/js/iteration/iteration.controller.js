angular.module('goodMood')
	.controller('IterationCtrl', function ($scope, $window, $log, $timeout, $state, $ionicLoading, collaboration, iteration, threads, Thread, image){
		
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
		
		var vm = this;

		this.hasThreads = function(){
			return _.size(threads) > 0
		}

		this.addIteration = function(){
			$state.go('^.^.newIteration')
		}

		this.home = function(){
			$state.go('home')
		}

		$scope.$on('$ionicView.enter', function(){
			console.log('view entered')
			$scope.$apply()
		})

		$scope.$on('addThread', function(event, coords){
			console.log(coords)
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('^.^.thread', {t_id: thread.$id})
				})
		})
		
		$scope.$on('swipedown', function(){
			console.log('previous: ', $scope.previous)
			if($scope.previous){
				$state.go('^.view', {i_id: $scope.previous})
			}
		})

		$scope.$on('swipeup', function(){
			console.log('next: ', $scope.mext)
			if($scope.next){
				$state.go('^.view', {i_id: $scope.next})
			} 
		})

		$scope.$on('swiperight', function(){
			console.log('swipe right!')
			$state.go('home')
		})

	})