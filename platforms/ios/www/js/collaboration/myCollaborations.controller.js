angular.module('goodMood')
	.controller('MyCollaborationsCtrl', function ($scope, Auth, $state, $ionicLoading, Collaboration, User, collaborationDefaultBg, Picture){

		var user,
				collaborations,
				resolve;
		
		function init(){
			return User.getCurrentUser().then(function(_user){
				user = _user;
				return user.$getCollaborations()
			})
			.then(function(_collaborations){
		    collaborations = _collaborations;
		    $scope.collaborations = collaborations;	
		    resolve = true;
		    return
		  })
		  .catch(function(err){
		  	console.log('ERR in the iNIT', err)
		  })
		}

		$scope.$on('$ionicView.loaded', function(){
			console.log('mycollaborations loaded')
			init().then(function(){
				$ionicLoading.hide()
			})
		})
		
	  $scope.$on('$ionicView.beforeEnter', function(){
	  	console.log('mycollaborations beoreenter, before resolve,', resolve)
	  	if (resolve){
  			$ionicLoading.hide()
	  	}
	  })

		$scope.$watch(function(){
			// console.count('mycolaborations scope digest')
		})

		this.getNewMessages = function(collaboration){
			return _.size(collaboration._newMessages)
		}

		this.newCollaboration = function(){
			$state.go('newCollaboration')
		}

		this.setCollaborationBg = function(collaboration){
			var imgURI = _.size(collaboration._lastImage) > 0 ? collaboration._lastImage.imageURI : collaborationDefaultBg
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