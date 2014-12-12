(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/myCollaborations.html",
    "this is my collaborattions\n" +
    "<button class=\"button button-block button-energized button-outline\" ng-click=\"myCollaborations.logout()\">Logout</button>\n" +
    "<p>{{ user.email }}</p>\n" +
    "<p>{{ user.displayName }}</p>\n" +
    "<img src=\"data:image/jpeg;base64,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\">\n" +
    "\n" +
    "<div ng-repeat=\"collaboration in collaborations\">{{ collaboration.name }}</div>\n" +
    "\n" +
    "<button ng-click=\"myCollaborations.newCollaboration()\">new collaboration</button>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("collaboration/newcollaboration.html",
    "<div class=\"newCollaboration\">\n" +
    "	<form class=\"newCollaborationForm\" name=\"newCollaborationForm\" novalidate ng-submit=\"newCollaboration.submit()\">\n" +
    "		<div class=\"iwant\">\n" +
    "			<span>I want a</span>\n" +
    "			<input required class=\"newcollaboration\" ng-model=\"name\"></input>\n" +
    "		</div>\n" +
    "		<button class=\"check\">&#10003;</button>\n" +
    "	</form>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/iteration.html",
    "<div></div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("iteration/newiteration.html",
    "<div id=\"iterationBg\" style=\"background-image: url('{{ imgURI }}')\">\n" +
    "<canvas id=\"myCanvas\"></canvas>\n" +
    "</div>");
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
