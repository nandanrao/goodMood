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
    "			<div class=\"thumbnail\" ng-style=\"myCollaborations.setCollaborationBg(collaboration)\">\n" +
    "			</div>\n" +
    "			<h2>\n" +
    "				{{ collaboration.name }} <span> ({{ myCollaborations.getNewMessages(collaboration) }})</span>\n" +
    "			</h2>\n" +
    "			</div>  \n" +
    "		</div>\n" +
    "		<button add-button class=\"new-collaboration\" ng-click=\"myCollaborations.newCollaboration()\" nav-direction=\"forward\">\n" +
    "		</button> \n" +
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
    "		<form class=\"newCollaborationForm\" name=\"newCollaborationForm\" novalidate ng-submit=\"newCollaboration.submit()\">\n" +
    "			<div class=\"iwant\">\n" +
    "				<span>Yo quiero</span>\n" +
    "				<input required class=\"newcollaboration\" ng-model=\"name\"></input>\n" +
    "			</div>\n" +
    "			<!-- <button class=\"check\">&#10003;</button> -->\n" +
    "		</form> \n" +
    "	</ion-content>\n" +
    "</ion-view>");
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
  $templateCache.put("iteration/desktopupload.html",
    "<button ng-click=\"fileInputClick() \" class=\"from-device\">\n" +
    "	<div class=\"image\">\n" +
    "		<img src=\"img/picture-file.svg\">\n" +
    "	</div>\n" +
    "	<p>elije una foto</p>\n" +
    "	<file-input></file-input>\n" +
    "</button>\n" +
    "\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/iteration.html",
    "<ion-view id=\"pg--iteration\" title=\"{{ collaborationName }} - \">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button ng-click=\"iteration.goBack()\" nav-direction=\"back\" class=\"ion-chevron-left\">\n" +
    "	 </button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div id=\"iterationBg\" class=\"{{ iteration.showAddIteration() ? 'add-iteration' : 'iteraton' }}\">\n" +
    "		<img class=\"iteration-image\" iteration-image ng-src=\"{{ image.$value }}\" />\n" +
    "		<canvas iteration-canvas></canvas>\n" +
    "		<drawing ng-repeat=\"thread in threads\" id=\"{{ thread.$id }}\" x=\"{{ thread.drawing.x }}\" y=\"{{ thread.drawing.y }}\">\n" +
    "		</drawing>\n" +
    "		<button check-button class=\"check\" ng-if=\"iteration.showCheck()\" ng-click=\"iteration.done()\"></button>\n" +
    "		<!-- <button class=\"previous\" ng-if=\"previous\" ng-click=\"iteration.previous()\"> previous iteration </button>\n" +
    "		<button class=\"next\" ng-if=\"next\" ng-click=\"iteration.next()\"> next iteration </button> -->\n" +
    "		<div ng-if=\"!iteration.hasThreads() && !instructionsRead\" class=\"instructions\">\n" +
    "				<h2>instrucciones <span><button class=\"ion-close\" ng-click=\"iteration.readInstructions()\"></button> </span></h2>\n" +
    "				<p>\n" +
    "					Toca sobre la imagen para agregar un comentario, puedes agregar multiples comentarios a tu imagen tocando los diferentes puntos donde quieras agregarlos.\n" +
    "				</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"iteration.showAddIteration()\" class=\"bar bar-footer\">\n" +
    "		<button new-iteration-button class=\"addIteration\" ng-click=\"iteration.addIteration()\"></button>\n" +
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
    "\n" +
    "	<ion-nav-buttons side=\"secondary\">\n" +
    "		<button ng-click=\"newIteration.cancel()\" class=\"ion-close\" nav-direction=\"back\">\n" +
    "		</button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<ion-content scroll=\"false\">\n" +
    "		<div class=\"mobile\" ng-if=\"!newIteration.isDesktop()\">\n" +
    "			<button ng-click=\"newIteration.takePicture()\" class=\"take-picture\">\n" +
    "				<div class=\"image\">\n" +
    "					<img src=\"img/camera.svg\">\n" +
    "				</div>\n" +
    "				<p>toma una foto</p>\n" +
    "			</button>\n" +
    "			<div class=\"line\"></div>\n" +
    "			<button ng-click=\"newIteration.fromDevice()\" class=\"from-device\">\n" +
    "				<div class=\"image\">\n" +
    "					<img src=\"img/picture-file.svg\">\n" +
    "				</div>\n" +
    "				<p>elije una foto</p>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "		<div class=\"desktop\" ng-if=\"newIteration.isDesktop()\">\n" +
    "			<desktop-upload></desktop-upload>\n" +
    "		</div>\n" +
    "	</ion-content>\n" +
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
  $templateCache.put("sidemenu/sidemenu.html",
    "<button ng-click=\"sidemenu.logout()\">logout</button>\n" +
    "	<p>{{ user.displayName }}</p>\n" +
    "<img ng-src=\"{{ user.picture }}\">");
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
    "			<polygon fill=\"#FFF\" ng-attr-points=\"{{ points }}\">\n" +
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
    "<ion-view id=\"pg--thread\" view-title=\"comentario\">\n" +
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
    "		\n" +
    "	</ion-content>\n" +
    "	<div class=\"bar bar-footer choose\">\n" +
    "		<form ng-submit=\"thread.sendMessage('text', textField.content)\">\n" +
    "			<input ng-if=\"!recording\" ng-blur=\"thread.notWriting()\" ng-focus=\"thread.writing()\"required ng-model=\"textField.content\" class=\"text\" placeholder=\"write a message\" />\n" +
    "		<div class=\"buttons\">\n" +
    "			<voice-message-record ng-if=\"!writing\"></voice-message-record>\n" +
    "			<button class=\"send\" type=\"submit\" ng-if=\"writing\" class=\"send\">SEND</button>\n" +
    "		</div>\n" +
    "		</form>	\n" +
    "	</div>\n" +
    "	\n" +
    "</ion-view>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/voicemessage-audio.html",
    "<audio ng-src=\"{{ audioURI }}\" preload></audio>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/voicemessage-play.html",
    "<svg class=\"vm-play\" ng-click=\"voiceMessagePlay.lineClick($event)\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "	 viewBox=\"0 0 538.8 53.1\" enable-background=\"new 0 0 538.8 53.1\" xml:space=\"preserve\">\n" +
    "<g fill=\"#FFF\">\n" +
    "	<path d=\"M14.3,34.3c4.2,0,7.6-3.4,7.6-7.6V11.3c0-4.2-3.4-7.6-7.6-7.6c-4.2,0-7.6,3.4-7.6,7.6v15.3C6.6,30.9,10,34.3,14.3,34.3z\"/>\n" +
    "	<path d=\"M25.5,23.5v3.1c0,6.2-5,11.2-11.2,11.2c-6.2,0-11.2-5-11.2-11.2v-3.1H0v3.1C0,34,5.6,40.1,12.7,40.8v5.7H4.3v3.1h19.9v-3.1\n" +
    "		h-8.4v-5.7c7.1-0.8,12.7-6.8,12.7-14.2v-3.1H25.5z\"/>\n" +
    "</g>\n" +
    "<line fill=\"none\" stroke=\"#727272\" stroke-width=\"2\" stroke-miterlimit=\"10\" x1=\"47\" y1=\"26.5\" x2=\"472\" y2=\"26.5\"/>\n" +
    "<line class=\"progress\" fill=\"none\" stroke=\"#7DFF29\" stroke-width=\"8\" stroke-miterlimit=\"10\" x1=\"47\" y1=\"26.4\" ng-attr-x2=\"{{ voiceMessagePlay.getPlayerPosition() }}\" y2=\"26.4\"/>\n" +
    "<g ng-click=\"voiceMessagePlay.play()\">\n" +
    "	<circle fill=\"#277FE9\" cx=\"512.2\" cy=\"26.5\" r=\"26.5\"/>\n" +
    "	<polygon ng-if=\"!playing\" fill=\"#FFFFFF\" points=\"503.8,12.9 527.7,26.7 503.8,40.5 	\"/>\n" +
    "	<line ng-if=\"playing\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\" stroke-miterlimit=\"10\" x1=\"507.8\" y1=\"37.5\" x2=\"507.8\" y2=\"15.3\"/>\n" +
    "	<line ng-if=\"playing\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\" stroke-miterlimit=\"10\" x1=\"516.7\" y1=\"37.5\" x2=\"516.7\" y2=\"15.3\"/>\n" +
    "</g>\n" +
    "<text transform=\"matrix(1 0 0 1 48 49.9811)\" fill=\"#727272\" font-family=\"'Futura-Bold'\" font-size=\"21\">\n" +
    "{{ voiceMessagePlay.getTime() }}</text>\n" +
    "</svg>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/voicemessage.html",
    "<div class=\"{{ sender ? 'sender' : 'reciever' }}\">\n" +
    "	<voice-message-audio></voice-message-audio>\n" +
    "	<p class=\"date\">\n" +
    "		{{ formatDate(message.sentAt) }}\n" +
    "	</p>\n" +
    "	<voice-message-play></voice-message-play>\n" +
    "	<div class=\"arrow-holder\">\n" +
    "		<div class=\"arrow\">\n" +
    "			<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "				 viewBox=\"0 0 22.1 43.3\" enable-background=\"new 0 0 22.1 43.3\" xml:space=\"preserve\">\n" +
    "			<polygon fill=\"#FFF\" ng-attr-points=\"{{ points }}\">\n" +
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
    "<button type=\"button\" class=\"voice-record\" ng-click=\"record.record()\">\n" +
    "	<i class=\"ion-mic-a\"></i>\n" +
    "</button>");
}]);
})();
