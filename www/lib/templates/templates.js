(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/collaboration.html",
    "<ion-view>\n" +
    "	<ion-nav-view></ion-nav-view> \n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/myCollaborations.html",
    "<ion-view id=\"pg--my-collaborations\" view-title=\"mis collaboraciones\">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<ion-content>\n" +
    "		<div class=\"collaborations\">\n" +
    "			<div ng-repeat=\"collaboration in collaborations\" class=\"collaboration\" ng-click=\"myCollaborations.collaboration(collaboration.$id)\">\n" +
    "			<img src=\"{{ myCollaborations.getCollaborationImage(collaboration) }}\">\n" +
    "			<p class=\"title\">\n" +
    "				{{ collaboration.name }}\n" +
    "			</p>\n" +
    "			<p class=\"unreadMessages\">\n" +
    "				{{ myCollaborations.getNewMessages(collaboration) }}\n" +
    "			</p>\n" +
    "			</div>  \n" +
    "		</div>\n" +
    "		<button add-button class=\"new-collaboration\" ng-click=\"myCollaborations.newCollaboration()\" nav-direction=\"forward\">\n" +
    "		</button>\n" +
    "	</ion-content>\n" +
    "</ion-view> ");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/newcollaboration.html",
    "<ion-view id=\"pg--new-collaboration\" view-title=\"que deseas?\">\n" +
    "	<ion-nav-buttons side=\"secondary\">\n" +
    "		<button ng-click=\"newCollaboration.cancel()\" class=\"ion-close\" nav-direction=\"back\">\n" +
    "		</button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div class=\"newCollaboration\">\n" +
    "		<form class=\"newCollaborationForm\" name=\"newCollaborationForm\" novalidate ng-submit=\"newCollaboration.submit()\">\n" +
    "			<div class=\"iwant\">\n" +
    "				<span>Yo quiero</span>\n" +
    "				<input required class=\"newcollaboration\" ng-model=\"name\"></input>\n" +
    "			</div>\n" +
    "			<!-- <button class=\"check\">&#10003;</button> -->\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</ion-view>	");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/threads.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/timeline.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/iteration.html",
    "<ion-view id=\"pg--iteration\" title=\"{{ collaboration.name }} - \">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button ng-click=\"iteration.goBack()\" nav-direction=\"back\" class=\"ion-chevron-left\">\n" +
    "	 </button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div id=\"iterationBg\">\n" +
    "		<canvas iteration-canvas></canvas>\n" +
    "		<img class=\"iteration-image\" iteration-image src=\"{{ imgURI }}\" />\n" +
    "		<button add-button class=\"addIteration\" ng-if=\"!next\" ng-click=\"iteration.addIteration()\"></button>\n" +
    "		<button class=\"previous\" ng-if=\"previous\" ng-click=\"iteration.previous()\"> previous iteration </button>\n" +
    "		<button class=\"next\" ng-if=\"next\" ng-click=\"iteration.next()\"> next iteration </button>\n" +
    "		<!-- <p>{{ colabits }} </p> -->\n" +
    "		<div ng-if=\"!iteration.hasThreads() && !instructionsRead\" class=\"instructions\">\n" +
    "				<h2>instrucciones</h2>\n" +
    "				<button class=\"ion-close\" ng-click=\"iteration.readInstructions()\"></button>\n" +
    "				<p>\n" +
    "					Toca sobre la imagen para agregar un comentario, puedes agregar multiples comentarios a tu imagen tocando los diferentes puntos donde quieras agregarlos.\n" +
    "				</p>\n" +
    "		</div>\n" +
    "		<drawing ng-repeat=\"thread in threads\" id=\"{{ thread.$id }}\" x=\"{{ thread.drawing.x }}\" y=\"{{ thread.drawing.y }}\">\n" +
    "		</drawing>\n" +
    "	</div>\n" +
    "</ion-view> ");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/iterationparent.html",
    "<ion-view>\n" +
    "	<ion-nav-view id=\"iterationView\"></ion-nav-view> \n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/newiteration.html",
    "<ion-view id=\"pg--new-iteration\" view-title=\"{{ newIteration.getViewTitle() }}\">\n" +
    "	<ion-nav-buttons side=\"secondary\">\n" +
    "		<button ng-click=\"newIteration.cancel()\" class=\"ion-close\" nav-direction=\"back\">\n" +
    "		</button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div class=\"mobile\">\n" +
    "		<button ng-click=\"newIteration.fromDevice()\" class=\"fromDevice\">\n" +
    "			<div class=\"image\">\n" +
    "				<img src=\"img/picture-file.svg\">\n" +
    "			</div>\n" +
    "			<p>elije una foto</p>\n" +
    "		</button>\n" +
    "		<button ng-click=\"newIteration.takePicture()\" class=\"takePicture\">\n" +
    "			<div class=\"image\">\n" +
    "				<img src=\"img/camera.svg\">\n" +
    "			</div>\n" +
    "			<p>toma una foto</p>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "<!-- 		<div class=\"desktop\" ng-if=\"newIteration.isDesktop()\">\n" +
    "		<button class=\"skip button button-block button-energized button-outline\" ng-click=\"newIteration.fromDevice()\">\n" +
    "			Skip\n" +
    "		</button>\n" +
    "	</div> -->\n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("login/localLogin.html",
    "<div class=\"list\">\n" +
    "<form name=\"loginForm\" no-validate class=\"localLoginForm\" ng-submit=\"localLogin.login()\">\n" +
    "	<label class=\"item item-input\">\n" +
    "		<input required type=\"text\" ng-model=\"form.email\" class=\"email\" name=\"email\" placeholder=\"Email\"></input>\n" +
    "	</label>\n" +
    "	<label class=\"item item-input\">\n" +
    "		<input required type=\"text\" ng-model=\"form.password\" class=\"password\" name=\"password\" placeholder=\"Password\"></input>\n" +
    "	</label>\n" +
    "	<label ng-if=\"register\" class=\"item item-input\">\n" +
    "		<input type=\"text\" ng-model=\"form.passRepeat\" class=\"repeatPass\" name=\"repeatPass\" placeholder=\"Repeat Password\"></input>\n" +
    "	</label>\n" +
    "	<button required ng-if=\"!register\" class=\"button button-outline button-positive login\" type=\"submit\" >Login</button>\n" +
    "	<button type=\"button\" ng-click=\"localLogin.register()\" class=\"button button-outline button-positive register\">Register</button>\n" +
    "</form>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.html",
    "<ion-content>\n" +
    "	<button class=\"button button-block button-positive button-outline\" ng-click=\"login.authLogin('facebook')\">Facebook</button>\n" +
    "	<button class=\"button button-block button-assertive button-outline\" ng-click=\"login.authLogin('google')\">Googllle</button>\n" +
    "	<button class=\"button button-block button-assertive button-outline\" ng-if=\"!local\" ng-click=\"login.showLocalLogin()\">Email</button>\n" +
    "	<form name=\"blah\"></form>\n" +
    "	<div ng-show=\"local\" class=\"list\">\n" +
    "		<form name=\"loginForm\" no-validate class=\"localLoginForm\" ng-submit=\"login.login()\">\n" +
    "			<label class=\"item item-input\">\n" +
    "				<input required type=\"text\" ng-model=\"form.email\" class=\"email\" name=\"email\" placeholder=\"Email\"></input>\n" +
    "			</label>\n" +
    "			<label class=\"item item-input\">\n" +
    "				<input required type=\"text\" ng-model=\"form.password\" class=\"password\" name=\"password\" placeholder=\"Password\"></input>\n" +
    "			</label>\n" +
    "			<label ng-if=\"register\" class=\"item item-input\">\n" +
    "				<input type=\"text\" ng-model=\"form.passRepeat\" class=\"repeatPass\" name=\"repeatPass\" placeholder=\"Repeat Password\"></input>\n" +
    "			</label>\n" +
    "			<button required ng-if=\"!register\" class=\"button button-outline button-positive login\" type=\"submit\" >Login</button>\n" +
    "			<button type=\"button\" ng-click=\"login.register()\" class=\"button button-outline button-positive register\">Register</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</ion-content>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/textmessage.html",
    "<div class=\"{{ sender ? 'sender' : 'reciever' }}\">\n" +
    "	<p class=\"date\">\n" +
    "		{{ formatDate(message.sentAt) }}\n" +
    "	</p>	\n" +
    "	<p class=\"content\">\n" +
    "		{{ message.content }}\n" +
    "	</p>\n" +
    "	<div class=\"arrow-holder\">\n" +
    "		<div class=\"arrow\">\n" +
    "			<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "				 viewBox=\"0 0 22.1 43.3\" enable-background=\"new 0 0 22.1 43.3\" xml:space=\"preserve\">\n" +
    "			<polygon fill=\"#FFF\" points=\"{{ points }}\">\n" +
    "			</svg>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/thread.html",
    "<ion-view id=\"pg_thread\" view-title=\"comentario\">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button ng-click=\"thread.goBack()\" class=\"ion-chevron-left\">\n" +
    "	 </button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<ion-content>\n" +
    "		<div class=\"messages\">\n" +
    "			<div class=\"message\" ng-repeat=\"message in messages\">\n" +
    "				<text-message ng-if=\"message.type === 'text'\" message=\"{{ message }}\">\n" +
    "				</text-message>\n" +
    "				<voice-message ng-if=\"message.type === 'audio'\">\n" +
    "				</voice-message>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"choose\">\n" +
    "			<button voice-message-record class=\"voice\" ng-click=\"thread.redcordNote()\">\n" +
    "			</button>\n" +
    "			<button class=\"text\" ng-click=\"thread.writeText()\">		\n" +
    "			text\n" +
    "			</button>\n" +
    "		</div>\n" +
    "		<form ng-show=\"writeMessage\" ng-submit=\"thread.sendMessage('text')\">\n" +
    "			<input required ng-model=\"text\" class=\"text\" placeholder=\"write here\" />\n" +
    "		</form>\n" +
    "	</ion-content>\n" +
    "</ion-view>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/voicemessage.html",
    "<div class=\"{{ sender ? 'sender' : 'reciever' }}\">\n" +
    "<p>blah</p>\n" +
    "	<p class=\"date\">\n" +
    "		{{ formatDate(message.sentAt) }}\n" +
    "	</p>\n" +
    "	<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 543.5 87.9\" enable-background=\"new 0 0 543.5 87.9\" xml:space=\"preserve\">\n" +
    "		<circle fill=\"#277FE9\" cx=\"43.9\" cy=\"43.9\" r=\"43.9\"/>\n" +
    "		<g>\n" +
    "			<path fill=\"#FFFFFF\" d=\"M44.1,54c5,0,9-4,9-9V27c0-5-4-9-9-9c-5,0-9,4-9,9V45C35.2,50,39.2,54,44.1,54z\"/>\n" +
    "			<path fill=\"#FFFFFF\" d=\"M57.3,41.4v3.7c0,7.3-5.9,13.2-13.2,13.2c-7.3,0-13.2-5.9-13.2-13.2v-3.7h-3.6v3.7c0,8.6,6.6,15.8,15,16.7\n" +
    "				v6.7h-9.9V72h23.4v-3.6h-9.9v-6.7c8.4-0.9,15-8,15-16.7v-3.7H57.3z\"/>\n" +
    "		</g>\n" +
    "		<g>\n" +
    "			<line fill=\"none\" stroke=\"#277FE9\" stroke-width=\"2\" stroke-miterlimit=\"10\" x1=\"87.9\" y1=\"43.9\" x2=\"543.5\" y2=\"43.9\"/>\n" +
    "		</g>\n" +
    "		<!-- <line fill=\"none\" stroke=\"#A2FF00\" stroke-width=\"8\" stroke-miterlimit=\"10\" x1=\"87.9\" y1=\"43.9\" x2=\"377.9\" y2=\"43.9\"/> -->\n" +
    "	</svg>	\n" +
    "	<div class=\"arrow-holder\">\n" +
    "		<div class=\"arrow\">\n" +
    "			<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "				 viewBox=\"0 0 22.1 43.3\" enable-background=\"new 0 0 22.1 43.3\" xml:space=\"preserve\">\n" +
    "			<polygon fill=\"#FFF\" points=\"{{ points }}\">\n" +
    "			</svg>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/voicemessagerecord.html",
    "<i class=\"ion-mic-a\"></i>");
}]);
})();
