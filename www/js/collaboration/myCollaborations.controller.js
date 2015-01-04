angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, collaborations, Collaboration, collaborationDefaultBg){
		
		$scope.collaborations = collaborations;

		this.getNewMessages = function(collaboration){
			return _.size(collaboration._newMessages)
		}

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}

		this.getCollaborationImage = function(collaboration){
			var imgURI = _.size(collaboration._lastImage) > 0 ? collaboration._lastImage.image.$value : collaborationDefaultBg
			return imgURI
		}

		this.collaboration = function(id){
			var collaboration = collaborations[id]
			var i_id = _.last(_.keys(collaboration.iterations))
			$state.go('collaboration.iteration', {c_id: id, i_id: i_id})
		}
	})