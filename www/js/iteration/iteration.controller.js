angular.module('goodMood')
	.controller('IterationCtrl', function ($scope, $window, $log, $timeout, $state, collaboration, iteration, threads, Thread, image, $ionicGesture){
		var vm = this;
		$scope.drawing;
		$scope.threads = threads
		$scope.imgURI = "data:image/jpeg;base64," + image.$value
		$scope.last = _.last(_.keys(collaboration.iterations)) === iteration.$id

		// TODO: way to check that this is the last iteration! So we can add new!
		this.addIteration = function(){
			$state.go('newIteration', {c_id: collaboration.$id})
		}

		this.createDrawing = function(){
			// create and update $scope.drawing
			// return promise for easy chaining and creation of thread after? 
		}

		this.addThread = function(coords){
			Thread.create(coords, iteration, collaboration)
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
				.then(function(thread){
					$state.go('^.thread', {t_id: thread.$id})
				})
		}

		var bg = angular.element(document.getElementById('iterationBg'))

		$ionicGesture.on('hold', function(e){
			var x = e.gesture.center.pageX
			var y = e.gesture.center.pageY
			vm.addThread({x:x, y:y})
		}, bg)

		// Get a reference to the canvas object
		var canvas = document.getElementById('myCanvas');
		// Create an empty project and a view for the canvas:
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