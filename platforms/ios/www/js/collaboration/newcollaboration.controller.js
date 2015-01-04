angular.module('goodMood')
	.controller('NewCollaborationCtrl', function ($scope, $window, $log, $state, $ionicLoading, $ionicHistory, user, Collaboration){
		$scope.name;

		this.submit = function(){
			if ($scope.newCollaborationForm.$valid){
				$ionicLoading.show()
				Collaboration.create($scope.name)
					.then(_.partialRight(user.$addCollaboration.bind(user)))
					.then(function(collaboration){
						$state.go('newIteration', {c_id: collaboration.$id})
					})
					.catch(function(err){
						$log('Error submitting a new collaboration', err)
						$window.alert('Sorry - we could not make this collaboration - try again?')
					})
			}
		}

		this.cancel = function(){
			$ionicHistory.nextViewOptions({
			  historyRoot: true
			});
			$state.go('home')
		}

	})