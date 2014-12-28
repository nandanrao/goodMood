angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, collaborations, Collaboration, collaborationDefaultBg){
		
		$scope.user = user;
		$scope.collaborations = collaborations;

		_.forEach(collaborations, function(obj){
			console.log(obj._newMessages)	
		})
		
		this.getNewMessages = function(collaboration){
			return _.size(collaboration._newMessages)
		}
		// "data:image/jpeg;base64," + image.$value

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}

		this.getCollaborationImage = function(collaboration){
			var imgURI;
			imgURI = "data:image/jpeg;base64," + collaboration._lastImage.$value || collaborationDefaultBg
			return imgURI
		}

		// http://upload.wikimedia.org/wikipedia/commons/c/cd/Panda_Cub_from_Wolong,_Sichuan,_China.JPG

		this.collaboration = function(id){
			var collaboration = collaborations[id]
			var i_id = _.last(_.keys(collaboration.iterations))
			$state.go('collaboration.iteration.view', {c_id: id, i_id: i_id})
		}
	})