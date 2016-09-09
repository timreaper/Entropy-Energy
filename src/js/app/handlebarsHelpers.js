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
		 * Display JSON
		 *        Returns back JS object when passed in a Handlebars object
		 ***/
		Handlebars.registerHelper('display_json', function (context) {
			return JSON.stringify(context);
		});

		/**
		 * Load JSON
		 *        Loads local JSON file
		 ***/
		Handlebars.registerHelper('load_json', function (json_path) {
			var fs = require('fs');
			var obj = fs.readFileSync(json_path, 'utf-8');
			return JSON.parse(obj.replace(/&quot;/g,'"'));
		});
	};
}
