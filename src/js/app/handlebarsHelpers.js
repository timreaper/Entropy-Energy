/**********************************************
 ===============================================
 **** The Almighty Handlebars Helpers File! ****
 ===============================================
 ***********************************************/

if (typeof module !== 'undefined') {
	module.exports.register = function (Handlebars) {
		/**
		 * Load Layout
		 *        Returns back one of the partials based on the slug & context (object data) passed to it
		 ***/
		Handlebars.registerHelper('load_layout', function (slug, context) {
			var loadedPartial = Handlebars.partials[slug];
			return new Handlebars.SafeString(loadedPartial(context));
		});

		/**
		 * JSON
		 *        Returns back JS object when passed in a Handlebars object
		 ***/
		Handlebars.registerHelper('json', function (context) {
			return JSON.stringify(context);
		});
	};
}
