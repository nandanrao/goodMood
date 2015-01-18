angular.module('goodMood')
	.factory('DrawingFactory', function (Thread, $state){
		var DrawingFactory = {};

		function Drawing(){}

		Drawing.prototype.resize = function (w,h){
			var pX = this.x*w;
			var pY = this.y*h;
			var point = new paper.Point(pX,pY);
			this.shape.position = point;
			this.textItem.position = point;
			paper.view.update()
		}

		Drawing.prototype.destroy = function(){
			if (this.shape.view){
				this.shape.remove()	
				paper.view.update()
			}	
		}

		Drawing.prototype.activateStream = function(){
			var self = this;
			Thread.getNewMessagesAsStream(this.t_id).onValue(function(val){
				var num = _.size(val)
				if (num === self.textItem.content){
					return
				}
				self.textItem.content = num > 0 ? num : ''
				if (paper && paper.view){
					paper.view.update()	
				}	
			})
		}
		
		DrawingFactory.create = function (thread, imageSize){
			var drawing = new Drawing();
			drawing.t_id = thread.$id;
			drawing.x = thread.drawing.x;
			drawing.y = thread.drawing.y;
			drawing.textItem = null;

			var pX = drawing.x*imageSize.width
			var pY = drawing.y*imageSize.height
			var point = new paper.Point(pX, pY)

			// Created shape automatically appended to paperjs 'view'
			drawing.shape = new paper.Path.Circle({
				center: point,
				fillColor: '#b6ff29',
				radius: 30,
				opacity: .75
			});

			drawing.textItem = new paper.PointText(point);
			drawing.textItem.fillColor = '#277FE9';
			drawing.textItem.justification = 'center';
			drawing.textItem.fontFamily = 'Futura-Bold';
			drawing.textItem.fontSize = '26px';
			drawing.textItem.content = ''

			// This is needed to update the view immediately!
			paper.view.update()

			// Click event for the shape
			drawing.shape.onClick = function(event){
				$state.go('thread', {t_id: drawing.t_id})
			}
			drawing.textItem.onClick = function(event){
				$state.go('thread', {t_id: drawing.t_id})
			}

			// Get that new message stream goin'!
			drawing.activateStream()

			return drawing;	
		}

		return DrawingFactory;
	})