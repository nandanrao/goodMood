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
        	if (!id || typeof id !== 'string'){
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

    utils.formatDate = function(str, options){
      var options = options || {
        month: 'short',  
        day: 'numeric',
        year: 'numeric', 
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      var date = new Date(str);
      return date.toLocaleString('es-US', options);
    }

    utils.uuid = function(){
      var d = Date.now();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
    }

    utils.isDesktop = function(){
      // TODO: why is this called HELLA times?
      if (!window.cordova){
        return true
      }
      return false  
    }

    utils.parseTime = function (time){
      var sec_num = parseInt(time, 10); 
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = minutes+':'+seconds;
      return time;
    }

    return utils;
	})