angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $q, $rootScope, $window, $log, $timeout, $state, $stateParams, $ionicLoading, $ionicHistory, Collaboration, Iteration, Thread){

		var vm = this;
		var collaboration,
				iteration,
				threads;

		$scope.resolve;
		$scope.imageSize = {};
		$scope.canvasElements = {
			drawings: [],
		};

		function init(){
			var collaborationResolve = Collaboration.findById($stateParams.c_id).then(function(_collaboration){
				collaboration = _collaboration;
				$scope.collaborationName = collaboration.name;
				return collaboration.$getIterations()	
			})
			.then(function(iterations){
				$scope.iterations = iterations;
				return
			})

		  var iterationResolve = Iteration.findById($stateParams.i_id).then(function(_iteration){
		  	iteration = _iteration;
		  	var threadsResolve = iteration.$getThreads().then(function(_threads){
		  		threads = _threads;
		  		$scope.threads = threads;
		  		return
		  	})
		  	var imageResolve = iteration.$getImage().then(function(image){
		  		$scope.imageRatio = image.width/image.height;
		  		image.$getSmall().then(function(uri){
		  			$scope.imageURI = uri
		  		})
		  		return
		  	})
		  	return $q.all([threadsResolve, imageResolve])
		  })
		  $scope.resolve = $q.all([collaborationResolve, iterationResolve])
		}


		$scope.$on('$ionicView.beforeEnter', function(){
			if ($scope.resolve){
				$scope.resolve.then(function(){
					$ionicLoading.hide()
				})	
			}
		})

		$scope.$on('$ionicView.enter', function(){
			if (!$scope.resolve){
				init()	
				$scope.resolve.then(function(){
					$ionicLoading.hide()		
				})
			}
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.activate()	
			}
			_.forEach($scope.canvasElements.drawings, function(drawing){
				drawing.activateStream();
			})
		})

		$scope.$on('$ionicView.leave', function(){
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.pause()
			}
			_.forEach($scope.canvasElements.drawings, function(drawing){
				drawing.deactivateStream();
			})
		})

		$scope.$on('$ionicView.unloaded', function(){
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.destroy()
			}
		})

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

		$scope.$watch(function(){
			// console.count('iteration digest run')
		})
				
		$scope.instructionsRead = false;

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
				.then(function(thread){
					$state.go('thread', {t_id: thread.$id})
					return thread
				})
				.then(_.partialRight(iteration.$addThread.bind(iteration)))
		}
	})