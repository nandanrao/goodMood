angular.module('goodMood')
	.filter('threadHasDrawing', function (){
	  return function(items){
	    return _.filter(items, function(thread){
	      if (thread.$isDestroyed){
	        return true
	      }
	      return thread.drawing && thread.drawing.x  && thread.drawing.y
	    })
	  }
	});