angular.module('goodMood')
	.controller('IterationCtrl', function ($firebase, $scope, $q, $rootScope, $window, $log, $timeout, $state, $stateParams, $ionicLoading, $ionicHistory, Collaboration, Iteration, Thread){

		var vm = this;
		var collaboration,
				iteration,
				threads;

		$scope.resolve;
		$scope.imageSize = {};
		$scope.iterationFooter = {
			exists: false
		};
		$scope.canvasElements = {
			drawings: [],
		};
		$scope.active = false;

		function init(){
			// Create collaboration and iterations object
			var collaborationResolve = Collaboration.findById($stateParams.c_id).then(function(_collaboration){
				collaboration = _collaboration;
				$scope.collaboration = collaboration;
				return
			})

		  var iterationResolve = Iteration.findById($stateParams.i_id).then(function(_iteration){
		  	iteration = _iteration;
		  	vm.iterationId = iteration.$id
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

		  return $q.all([collaborationResolve, iterationResolve]).then(function(){
		  	$scope.resolve = true;
		  })
		}


		$scope.$on('$ionicView.beforeEnter', function iterationBeforeEnter (){
			if ($scope.resolve){
				$ionicLoading.hide()
			}
		})

		$scope.$on('$ionicView.enter', function iterationEnter (){
			if (!$scope.resolve){
				init().then(function(){
					$ionicLoading.hide()		
				})
			}
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.activate()	
			}
			_.forEach($scope.canvasElements.drawings, function(drawing){
				drawing.activateStream();
			})
			// note: active MUST come before resize!
			$scope.active = true;
			$scope.imageSize.resize()	
		})

		$scope.$on('$ionicView.leave', function iterationLeave (){
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.pause()
			}
			_.forEach($scope.canvasElements.drawings, function(drawing){
				drawing.deactivateStream();
			})
			$scope.active = false;
		})

		$scope.$on('$ionicView.unloaded', function iterationUnloaded (){
			if ($scope.canvasElements.surface){
				$scope.canvasElements.surface.destroy()
			}
		})

		// Create iterations array for inter-iteration navigation
		$scope.$watchCollection('collaboration', function watchIterationArray (curr, old){
			setIterationArray()
			if (!old){
				$scope.iterationsLoaded	= true;
			}
		})
		
		function setIterationArray(){
			if (!$scope.collaboration){
				return
			}
			var iterationArray = _.keys($scope.collaboration.iterations).sort();	
			var currentIndex = iterationArray.indexOf($stateParams.i_id);	
			console.log(iterationArray)
			$scope.previous = iterationArray[currentIndex - 1];
			$scope.next = iterationArray[currentIndex + 1];
		}

		$scope.$watch(function(){
			// console.count('iteration digest run')
		})
				
		$scope.instructionsRead = false;

		this.hasThreads = function(){
			return !!threads && _.size(threads) > 0
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