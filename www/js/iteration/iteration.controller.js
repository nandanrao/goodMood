angular.module('goodMood')
	.controller('IterationCtrl', function ($scope, $window, $log, $timeout, $state, $ionicLoading, collaboration, iteration, threads, Thread, image, $ionicGesture){
		
		$scope.collaboration = collaboration;
		$scope.iterationArray = _.keys(collaboration.iterations).sort();
		$scope.drawing;
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

		this.addThread = function(coords){
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('^.^.thread', {t_id: thread.$id})
				})
		}

		this.addIteration = function(){
			$state.go('^.^.newIteration')
		}

		this.home = function(){
			$state.go('home')
		}

		var bg = angular.element(document.getElementById('iterationBg'))
		var canvas = document.getElementById('myCanvas');
		paper.setup(canvas);
		paper.view.draw();

		$ionicGesture.on('hold', function(e){
			var x = e.gesture.center.pageX
			var y = e.gesture.center.pageY
			vm.addThread({x:x, y:y})
		}, bg)

		$ionicGesture.on('swipedown', function(e){
			console.log('swipedown', $scope.previous)
			if($scope.previous){
				$state.go('^.view', {i_id: $scope.previous})
			}
		}, bg)

		$ionicGesture.on('swipeup', function(e){
			console.log('swipeup', $scope.mext)
			if($scope.next){
				$state.go('^.view', {i_id: $scope.next})
			} 
		}, bg)

		$ionicGesture.on('swiperight', function(e){
			console.log('swipe right!')
			$state.go('home')
		}, bg)

	})