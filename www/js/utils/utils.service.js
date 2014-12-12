angular.module('goodMood')
	.factory('utils', function(){

		var utils = {};
		
		/** 
     * Gathers messages from multiple streams, starting from a Ref
     * @param {object} stream A Bacon Stream that represents the og sources
     * @param {function} the combining function (class method)
    */
    utils.gatherMessageStreams = function(stream, fn){
      return stream.flatMap(function(val){
        return Bacon.combineAsArray(_.map(val, function(id){
        	if (typeof id !== 'string'){
        		throw new Error('We need to be mapping over ids!')
        	}
          return fn(id)
        }))
      })
      .map(function(val){
        return _.flatten(val)
      })
      .skipDuplicates(_.isEqual)
    }

    // Replaces '.' (not allowed in a Firebase key) 
    // with ',' (not allowed in an email address)
    utils.escapeEmailAddress = function(email) {
      if (!email) return false
      email = email.toLowerCase();
      email = email.replace(/\./g, ',');
      return email;
    }

    return utils;
	})