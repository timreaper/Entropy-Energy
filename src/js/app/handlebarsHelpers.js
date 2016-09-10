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
			return JSON.parse(obj.replace(/&quot;/g, '"'));
		});

		/**
		 * Each (Reverse)
		 *      Does Handlebars each, but renders from bottom to top.
		 ***/
		Handlebars.registerHelper('each_reverse', function (context, options) {
			var fn = options.fn, inverse = options.inverse;
			var length = 0, ret = "", data;

			if (Handlebars.Utils.isFunction(context)) {
				context = context.call(this);
			}

			if (options.data) {
				data = Handlebars.createFrame(options.data);
			}

			if (context && typeof context === 'object') {
				if (Handlebars.Utils.isArray(context)) {
					length = context.length;
					for (var j = context.length - 1; j >= 0; j--) {//no i18n
						if (data) {
							data.index = j;
							data.first = (j === 0);
							data.last = (j === (context.length - 1));
						}
						ret = ret + fn(context[j], {data: data});
					}
				} else {
					var keys = Object.keys(context);
					length = keys.length;
					for (j = length; j >= 0; j--) {
						var key = keys[j - 1]
						if (context.hasOwnProperty(key)) {
							if (data) {
								data.key = key;
								data.value = context[key];
								data.index = j;
								data.first = (j === 0);
							}
							ret += fn(context[key], {data: data});
						}
					}
				}
			}

			if (length === 0) {
				ret = inverse(this);
			}

			return ret;
		});
	}
}
