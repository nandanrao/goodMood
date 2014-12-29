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
    "<ion-view id=\"pg_myCollaborations\" view-title=\"mis collaboraciones\">\n" +
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
    "		<!-- <button class=\"newCollaboration\" ng-click=\"myCollaborations.newCollaboration()\" nav-direction=\"forward\">\n" +
    "			<i class=\"ion-plus\"></i>\n" +
    "		</button> -->\n" +
    "		<button class=\"newCollaboration\">\n" +
    "			<!-- <img src=\"img/add-button.svg\" style=\"width: 100px\"> -->\n" +
    "			<add-button></add-button>\n" +
    "		</button>\n" +
    "	</ion-content>\n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/newcollaboration.html",
    "<ion-view id=\"pg_newCollaboration\" view-title=\"que deseas?\">\n" +
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
  $templateCache.put("iteration/iteration.html",
    "<ion-view title=\"{{ collaboration.name }} - \">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button ng-click=\"iteration.goBack()\" nav-direction=\"back\" class=\"ion-chevron-left\">\n" +
    "	 </button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div id=\"iterationBg\">\n" +
    "		<img iteration-image src=\"{{ imgURI }}\" />\n" +
    "		<canvas iteration-canvas></canvas>\n" +
    "		<button class=\"addIteration\" ng-if=\"!next\" ng-click=\"iteration.addIteration()\">+ iteration</button>\n" +
    "		<button class=\"previous\" ng-if=\"previous\" ng-click=\"iteration.previous()\"> previous iteration </button>\n" +
    "		<button class=\"next\" ng-if=\"next\" ng-click=\"iteration.next()\"> next iteration </button>\n" +
    "		<p>{{ colabits }} </p>\n" +
    "		<div ng-if=\"!iteration.hasThreads()\" class=\"instructions\">\n" +
    "				<p>\n" +
    "					Hey these are the instructions for adding a thread and drawing on this thing\n" +
    "				</p>\n" +
    "		</div>\n" +
    "		<drawing ng-repeat=\"thread in threads\" id=\"{{ thread.$id }}\" x=\"{{ thread.drawing.x }}\" y=\"{{ thread.drawing.y }}\">\n" +
    "		</drawing>\n" +
    "	</div>\n" +
    "</ion-view>");
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
    "<ion-view view-title=\"newIteration.getViewTitle()\">\n" +
    "	<div id=\"pg-newIteration\">\n" +
    "		<div class=\"mobile\" ng-if=\"!newIteration.isDesktop()\">\n" +
    "			<button class=\"button button-block button-energized button-outline\" ng-click=\"newIteration.fromDevice()\" class=\"fromDevice\">Get a Picture from your Camera Roll</button>\n" +
    "			<button class=\"button button-block button-energized button-outline\" ng-click=\"newIteration.takePicture()\" class=\"takePicture\">Take a new picture</button>\n" +
    "		</div>\n" +
    "		<div class=\"desktop\" ng-if=\"newIteration.isDesktop()\">\n" +
    "			<button class=\"skip button button-block button-energized button-outline\" ng-click=\"newIteration.fromDevice()\">\n" +
    "				Skip\n" +
    "			</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
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
  $templateCache.put("thread/thread.html",
    "<ion-view id=\"pg_thread\" view-title=\"comentario\">\n" +
    "	<ion-nav-buttons side=\"primary\">\n" +
    "	 <button ng-click=\"thread.goBack()\" class=\"ion-chevron-left\">\n" +
    "	 </button>\n" +
    "	</ion-nav-buttons>\n" +
    "	<div class=\"messages\">\n" +
    "		<div class=\"message\" ng-repeat=\"message in messages\">\n" +
    "			<p ng-if=\"message.type === 'text'\">\n" +
    "				{{ thread.formatDate(message.sentAt) }} || {{ message.content }}\n" +
    "			</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"choose\">\n" +
    "		<button class=\"voice\" ng-click=\"thread.redcordNote()\">\n" +
    "		voice\n" +
    "		</button>\n" +
    "		<button class=\"text\" ng-click=\"thread.writeText()\">		\n" +
    "		text\n" +
    "		</button>\n" +
    "	</div>\n" +
    "	<form ng-show=\"writeMessage\" ng-submit=\"thread.sendMessage('text')\">\n" +
    "		<input required ng-model=\"text\" class=\"text\" placeholder=\"write here\" />\n" +
    "	</form>\n" +
    "</ion-view>");
}]);
})();
