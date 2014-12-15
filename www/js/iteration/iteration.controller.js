angular.module('goodMood')
	.controller('IterationCtrl', function ($scope, $window, $log, $timeout, $state, $ionicLoading, collaboration, iteration, threads, Thread, image, $ionicGesture){
		var vm = this;
		$scope.collaboration = collaboration;
		$scope.iterationArray = _.keys(collaboration.iterations).sort()
		$scope.drawing;
		$scope.threads = threads
		$scope.imgURI = "data:image/jpeg;base64," + image.$value
		// TODO: try these, will probably error before it hits null!
		$scope.currentIndex = $scope.iterationArray.indexOf(iteration.$id)
		$scope.previous = $scope.iterationArray[$scope.currentIndex - 1] || null
		$scope.next = $scope.iterationArray[$scope.currentIndex + 1] || null 
		$scope.last = _.last($scope.iterationArray) === iteration.$id

		this.hasThreads = function(){
			return _.size(threads) > 0
		}

		this.addThread = function(coords){
			$ionicLoading.show();
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('^.thread', {t_id: thread.$id})
				})
		}

		this.addIteration = function(){
			$state.go('^.newIteration')
		}

		console.log('in iterations controller')

		var bg = angular.element(document.getElementById('iterationBg'))

		$ionicGesture.on('hold', function(e){
			var x = e.gesture.center.pageX
			var y = e.gesture.center.pageY
			vm.addThread({x:x, y:y})
		}, bg)

		$ionicGesture.on('swipedown', function(e){
			console.log('swipedown', $scope.previous)
			if($scope.previous){
				$state.go('^.iteration', {i_id: $scope.previous})
			}
		}, bg)

		$ionicGesture.on('swipeup', function(e){
			console.log('swipeup', $scope.mext)
			if($scope.next){
				$state.go('^.iteration', {i_id: $scope.next})
			} 
		}, bg)

		$ionicGesture.on('swiperight', function(e){
			console.log('swipe right!')
			$state.go('home')
		}, bg)

		var canvas = document.getElementById('myCanvas');
		paper.setup(canvas);
		paper.view.draw();
		// var path;

		// $ionicGesture.on('dragstart', function(e){
		// 	console.log('drag start')
		// 	// If we produced a path before, deselect it:
		// 	if (path) {
		// 		path.selected = false;
		// 	}
		// 	path = new paper.Path();
		// 	path.strokeColor = 'white';
		// 	// Select the path, so we can see its segment points:
		// 	path.fullySelected = true;
		// }, bg)

		// $ionicGesture.on('drag', function(e){
		// 	console.log('dragging')
		// 	// console.log('this is the e ', e) 
		// 	path.add(e.point);
		// }, bg)

		// $ionicGesture.on('dragend', function(e){
		// 	console.log('drag end')
		// 	path.simplify();
		// 	// Select the path, so we can see its segments:
		// 	path.selected = true;
		// }, bg)
	})