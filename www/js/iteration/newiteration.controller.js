angular.module('goodMood')
	.controller('NewIterationCtrl', function($scope, $window, $log, $state, collaboration, $cordovaCamera, Iteration, Image, $ionicGesture){

		$scope.imgURI;

		// this.fromDevice = function(){
		// 	$cordovaCamera.getPicture({
		// 		sourceType: 0
		// 	}).then(function(fileURI){
		// 		console.log(fileURI)
		// 		$scope.imgURI = fileURI
		// 	})
		// }

		// this.takePicture = function(){
		// 	$cordovaCamera.getPicture().then(function(fileURI){
		// 		console.log(fileURI)
		// 		$scope.imgURI = fileURI
		// 	})
		// }

			$cordovaCamera.getPicture({
				destinationType: 0
			})
				.then(function(dataURI){
					$scope.imgURI = "data:image/jpeg;base64," + dataURI
				})
				.then(Image.create)
				.then(function(image){
					$window.alert('circle a region on the image to begin a conversation about it!')
				})

		// Get a reference to the canvas object
				var canvas = document.getElementById('myCanvas');
				// Create an empty project and a view for the canvas:
				paper.setup(canvas);

				var bg = angular.element(document.getElementById('iterationBg'))
				var path;

				paper.view.draw();
				
				$ionicGesture.on('dragstart', function(e){
					console.log('drag start')
					// If we produced a path before, deselect it:
					if (path) {
						path.selected = false;
					}
					path = new paper.Path();
					path.strokeColor = 'white';
					// Select the path, so we can see its segment points:
					path.fullySelected = true;
				}, bg)

				$ionicGesture.on('drag', function(e){
					console.log('dragging')
					path.add(e.point);
				}, bg)

				$ionicGesture.on('dragend', function(e){
					console.log('drag end')
					// When the mouse is released, simplify it:
					path.simplify();
					// Select the path, so we can see its segments:
					path.selected = true;

				}, bg)

			

			


	})