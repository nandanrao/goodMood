(function(){



  self.addEventListener('message', function(e) {
    var data = e.data;
    var img = makeImage(data.dataURI)
    var scale = data.width/img.naturalWidth;
    var height = img.naturalHeight*scale
    resizeStep(img, data.width, height)
  }, false);

  function callback(results){
    self.postMessage(results)
  }

  function makeImage(dataURI){
    console.log(self.angular)
    var i = new Image;
    i.src = dataURI;
    var el = angular.element(i)  
    return el;
  }

  function resizeStep (img, width, height, callback) {
    var quality = 1.0

    var canvas  = document.createElement( 'canvas' )
    var context = getContext(canvas)
    var type = "image/png"

    var cW = img.naturalWidth
    var cH = img.naturalHeight

    var dst = new Image()
    var tmp = null

    //resultD.resolve(img)
    //return resultD.promise

    function stepDown () {
      cW = Math.max(cW / 2, width) | 0
      cH = Math.max(cH / 2, height) | 0

      canvas.width  = cW
      canvas.height = cH

      context.drawImage(tmp || img, 0, 0, cW, cH)

      dst.src = canvas.toDataURL(type, quality)

      if (cW <= width || cH <= height) {
        return callback(dst)
      }

      if (!tmp) {
        tmp = new Image()
        tmp.onload = stepDown
      }

      tmp.src = dst.src
    }

    if (cW <= width || cH <= height || cW / 2 < width || cH / 2 < height) {
      canvas.width  = width
      canvas.height = height
      context.drawImage(img, 0, 0, width, height)
      dst.src = canvas.toDataURL(type, quality)
      callback(dst)
    } else {
      stepDown()
    }
  }

  function getContext (canvas) {
    var context = canvas.getContext('2d')

    context.imageSmoothingEnabled       = true
    context.mozImageSmoothingEnabled    = true
    context.oImageSmoothingEnabled      = true
    context.webkitImageSmoothingEnabled = true

    return context
  }
})()