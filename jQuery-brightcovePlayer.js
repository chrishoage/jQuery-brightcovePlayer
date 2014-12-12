;(function ( $, window, document, undefined ) {
	'use strict';

		var pluginName = 'brightcovePlayer';

		// The actual plugin constructor
		function Plugin () {
    	if (typeof brightcove !== 'object') $.error('Brightcove API not found');
			console.log(arguments);
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function (element, options) {
			  this.el = element;
			  this.$el = $(this.el);
				this.settings = $.extend(true, {}, $.fn[pluginName].defaults, options);
				this._defaults = defaults;
				this._name = pluginName;
				console.log('xD');
			},
			createObject: function () {

			}
    });

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function ( options ) {
			this.each(function() {
				var pluginInstance = $.data(this, 'plugin_' + pluginName);
				if ( !pluginInstance ) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				} else {
					if (!pluginInstance[options]) $.error('Method name "' + options + '" missing');
				}
			});

			// chain jQuery functions
			return this;
		};

		$.fn[pluginName].defaults = {
		   params: {
		     'bgcolor': 'transparent',
		     'width': '100%',
		     'height': '100%',
		     'playerID': null,
		     'playerKey': null,
		     'isVid': true,
		     'isUI': true,
		     'dynamicStreaming': true,
		     '@videoplayer': true,
		     'includeAPI': true
		   }
		};

})( jQuery, window, document );
