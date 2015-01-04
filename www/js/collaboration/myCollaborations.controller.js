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
			console.log('getcollabimage called... ', collaboration._lastImage)
			var key = _.keys(collaboration._lastImage)[0]
			var imgURI = collaboration._lastImage ? collaboration._lastImage[key].$value : collaborationDefaultBg
			return imgURI
		}

		this.collaboration = function(id){
			var collaboration = collaborations[id]
			var i_id = _.last(_.keys(collaboration.iterations))
			$state.go('collaboration.iteration.view', {c_id: id, i_id: i_id})
		}
	})