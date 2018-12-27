jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"ns/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"ns/test/integration/pages/Worklist",
		"ns/test/integration/pages/Object",
		"ns/test/integration/pages/NotFound",
		"ns/test/integration/pages/Browser",
		"ns/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ns.view."
	});

	sap.ui.require([
		"ns/test/integration/WorklistJourney",
		"ns/test/integration/ObjectJourney",
		"ns/test/integration/NavigationJourney",
		"ns/test/integration/NotFoundJourney",
		"ns/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});