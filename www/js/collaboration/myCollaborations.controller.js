angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, collaborations, Collaboration){
		
		$scope.user = user;
		$scope.collaborations = collaborations;

		this.logout = function(){
		  Auth.logout();
		}

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}

		this.collaboration = function(id){
			var collaboration = collaborations[id]
			var i_id = _.first(_.keys(collaboration.iterations))
			$state.go('collaboration.iteration', {c_id: id, i_id: i_id})
		}
	})