define(['text'], function(text) {
	var buildMap = {},
		jst = {};

	/**
	 * Loads the template content and compiles it with _.template.
	 */
	jst.load = function (name, req, load, config) {
		var compiled;
		text.get(req.toUrl(name), function (content) {
			
			//console.log(content);
			eval(content);

			// compiled = _.template(content);
			// buildMap[name] = content;
			
			// load(content);

		});
	};

	/**
	 * Writes the compiled template to file as a module.
	 */
	jst.write = function(pluginName, moduleName, write) {
		console.log('write');
		var compiled = buildMap[moduleName];
		write("define('" + pluginName + "!" + moduleName + "', " +
			"['underscore']," +
			"function (_) { return " + compiled.source + "; }" +
		");\n");
	};

	return jst;
});