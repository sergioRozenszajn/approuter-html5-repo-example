sap.ui.define([
		"ns/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("ns.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);