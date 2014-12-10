
collaboration: {
	users: [{
		user: #,
		privelage: String
	}], //populate
	iterations: [#], //populate
	startedAt: Date,
	status: String,
}

iteration: {
	_id: Number,
	image: #, //populate
	createdAt: Date,
	collaboration: #, // don't populate!
	threads:[#] // 
}

thread: {
	_id: Number,
	collaboration: #,
	createdBy: #,
	iterations: [#],
	// put iterations as key and value as true... 
	messages:[#],
	lastViewed: {
		#(userId): Date
	}
	drawing: # || null, // or drawings are messages???
	origin: [x,y],
	getCurrentMessages: function(time){
		return messages.orderbychild(time).endAt(time)
	}
	display: function(){
		return !!getCurrentMessages()
	}
	getPlacement: function(){
		return // how do we deal with conflicts in position?? Also --- different screen aspect ratios/sizes... 
		// can we zoom in and annotate??
	}
} 

// ng-style='thread.getPlacement()'

// ng-if="thread.display(currentTime)"

message: {
	time: Date,
	user: #,
	content: String // or image??,
	image: // image should be per message?
	thread: #,
	tags: [String]
}

tags: {
	collaboration: #,
	tag: String,
	messages: [#],
}

// Tag.orderByChild(collaboration).equalTo(id).$asObject().$loaded()

// TODO: research ionion skin!!

// TODO: how are you going to keep track of the order of the iterations? (master array with indices?)

ref(collaboration).iterations.orderByKey // array of iterations, in order of time created... 

user: {
	name: String,
	picture: URL,
	location: location, // --- google location, based on social/device/google string lookup
	settings: {
		notifications // push notifications + stuff
	}
	
}

/* permisions: 

	location
	camera
	microphone

*/

images {
	user: #,
	file: ,
	collaboration: #,
	iteration: #,
}

// query images by user (maker's images)... but not images specific to a collaboration probably!! 
// Images are somehow browsable/indexable (public flag?)

Thread.create(data).then(function(thread){
	$scope.iteration.addThread()
})

$scope.iteration.addThread();s

