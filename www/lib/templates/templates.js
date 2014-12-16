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
    "<ion-view>\n" +
    "<ion-content>\n" +
    "this is my collaborattions\n" +
    "<button class=\"button button-block button-energized button-outline\" ng-click=\"myCollaborations.logout()\">Logout</button>\n" +
    "<p>{{ user.email }}</p>\n" +
    "<p>{{ user.displayName }}</p>\n" +
    "\n" +
    "<div ng-repeat=\"collaboration in collaborations\">\n" +
    "	<div class=\"collaboration\">\n" +
    "		<button class=\"button button-block button-balanced button-outline\" ng-click=\"myCollaborations.collaboration(collaboration.$id)\">{{ collaboration.name }}</button>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<button ng-click=\"myCollaborations.newCollaboration()\">new collaboration</button>\n" +
    "</ion-content>\n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/newcollaboration.html",
    "<ion-view title=\"New Collaboration\">\n" +
    "	<div class=\"newCollaboration\">\n" +
    "		<form class=\"newCollaborationForm\" name=\"newCollaborationForm\" novalidate ng-submit=\"newCollaboration.submit()\">\n" +
    "			<div class=\"iwant\">\n" +
    "				<span>I want a</span>\n" +
    "				<input required class=\"newcollaboration\" ng-model=\"name\"></input>\n" +
    "			</div>\n" +
    "			<button class=\"check\">&#10003;</button>\n" +
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
    "<ion-view id=\"pg-iteration\" title=\"{{ collaboration.name }} - \">\n" +
    "	<div style=\"background-image: url('{{ imgURI }}')\">\n" +
    "		<canvas iteration-canvas></canvas>\n" +
    "		<div ng-if=\"!next\">\n" +
    "			<button class=\"addIteration\" ng-click=\"iteration.addIteration()\">+ iteration</button>\n" +
    "		</div>\n" +
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
    "	<ion-nav-view animation=\"no-animate\" id=\"iterationView\"></ion-nav-view> \n" +
    "</ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/newiteration.html",
    "<ion-view title=\"Add Iteration\">\n" +
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
    "<div style=\"padding: 0 10px\">\n" +
    "<p>hey this is login</p>\n" +
    "<button class=\"button button-block button-positive button-outline\" ng-click=\"login.authLogin('facebook')\">Facebook</button>\n" +
    "<button class=\"button button-block button-assertive button-outline\" ng-click=\"login.authLogin('google')\">Googllle</button>\n" +
    "<button class=\"button button-block button-assertive button-outline\" ng-if=\"!local\" ng-click=\"login.showLocalLogin()\">Email</button>\n" +
    "<form name=\"blah\"></form>\n" +
    "<div ng-show=\"local\" class=\"list\">\n" +
    "	<form name=\"loginForm\" no-validate class=\"localLoginForm\" ng-submit=\"login.login()\">\n" +
    "		<label class=\"item item-input\">\n" +
    "			<input required type=\"text\" ng-model=\"form.email\" class=\"email\" name=\"email\" placeholder=\"Email\"></input>\n" +
    "		</label>\n" +
    "		<label class=\"item item-input\">\n" +
    "			<input required type=\"text\" ng-model=\"form.password\" class=\"password\" name=\"password\" placeholder=\"Password\"></input>\n" +
    "		</label>\n" +
    "		<label ng-if=\"register\" class=\"item item-input\">\n" +
    "			<input type=\"text\" ng-model=\"form.passRepeat\" class=\"repeatPass\" name=\"repeatPass\" placeholder=\"Repeat Password\"></input>\n" +
    "		</label>\n" +
    "		<button required ng-if=\"!register\" class=\"button button-outline button-positive login\" type=\"submit\" >Login</button>\n" +
    "		<button type=\"button\" ng-click=\"login.register()\" class=\"button button-outline button-positive register\">Register</button>\n" +
    "	</form>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("thread/thread.html",
    "<ion-view>\n" +
    "	<div>this is thread view</div>\n" +
    "	<div class=\"messages\">\n" +
    "		<div class=\"message\" ng-repeat=\"message in messages\">\n" +
    "			<p ng-if=\"message.type === 'text'\">\n" +
    "				{{ message.content }}\n" +
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
