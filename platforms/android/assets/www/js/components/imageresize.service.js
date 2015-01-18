angular.module('goodMood')
  .factory('imageResize', function ($http, $q, $timeout) {
    var imageResize = {}

    imageResize.resize = function(dataURI, targetWidth){
      var deferred = $q.defer()
      var i = new Image;
      i.src = dataURI;
      var w = i.naturalWidth;
      var h = i.naturalHeight;
      var tW = targetWidth;
      var tH = Math.floor(h/w*tW)

      var org  = document.createElement( 'canvas' )
      var context = org.getContext('2d');
      org.width  = w;
      org.height = h;
      context.drawImage(i, 0, 0, w, h)

      var dst = document.createElement('canvas')
      dst.width = tW;
      dst.height = tH;

      pica.resizeCanvas(org, dst, {quality: 2}, function(err){
        if (err){
          return deferred.reject(err)
        }
        var type = "image/jpeg"
        var resizedURI = dst.toDataURL(type)
        deferred.resolve(resizedURI)
      })
      return deferred.promise
    }

    return imageResize
})