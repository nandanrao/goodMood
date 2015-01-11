angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, user, $ionicLoading, collaborations, Collaboration, collaborationDefaultBg){
		
		$scope.$on('$ionicView.enter', function(){
			$ionicLoading.hide()
		})

		$scope.collaborations = collaborations;

		$scope.$watch(function(){
			console.count('mycolaborations scope digest')
		})

		this.getNewMessages = function(collaboration){
			return _.size(collaboration._newMessages)
		}

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}

		this.setCollaborationBg = function(collaboration){
			var imgURI = _.size(collaboration._lastImage) > 0 ? collaboration._lastImage.image.$value : collaborationDefaultBg
			return { 
				'background-image': 'url(' + imgURI + ')'
			}
		}

		this.collaboration = function(id){
			ionic.Utils.disconnectScope($scope)
			var collaboration = collaborations[id]
			var i_id = _.last(_.keys(collaboration.iterations))
			$state.go('iteration', {c_id: id, i_id: i_id})
		}
	})