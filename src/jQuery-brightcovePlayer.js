/* globals brightcove */
;(function ($, window, document, undefined) {
	'use strict';

		var slice = [].slice;

		var pluginName = 'brightcovePlayer';

		// The actual plugin constructor
		function Plugin (element, options) {
    	if (typeof brightcove !== 'object') $.error('Brightcove API not found');
			this.init(element, options);
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function (element, options) {
			  this.el = element;
			  this.$el = $(this.el);
				this.settings = $.extend(true, {}, $.fn[pluginName].defaults, options);
				this._defaults = $.fn[pluginName].defaults;
				this._name = pluginName;
				this.createPlayer();
			},
			createPlayer: function() {
				this.$el.html(this._createPlayerObject());
				brightcove.createExperiences();
			},
			bindTriggers: function () {
				var _this = this;
				$.each(brightcove.api.events.MediaEvent, function (value, key) {
					_this.playerModule.addEventListener(key, function () {
						_this.$el.trigger(key + '.' + pluginName, slice.call(arguments));
					});
				});
			},
			unbindTriggers: function () {
				var _this = this;
				$.each(brightcove.api.events.MediaEvent, function (value, key) {
					_this.playerModule.removeEventListener(key);
				});
			},
			destroy: function () {
				this.unbindTriggers();
				this.$el.empty();
			},
			pause: function () {
				this.playerModule.pause();
			},
			play: function () {
				this.playerModule.play();
			},
			seek: function (time) {
				this.playerModule.seek(time);
			},
			loadVideo: function (videoID) {
				this.playerModule.loadVideoByID(videoID);
			},
			_createPlayerObject: function () {
				var $playerObject = $('<object>', {
					class: 'BrightcoveExperience'
				});
				var $params = $.map(this.settings, function(value, key) {
					return $('<param>', {
						name: key,
						value: value
					});
				});
				$params.push($('<param>', {
					name: 'templateLoadHandler',
					value: this._createBrightcoveCallback(function (experienceID) {
						this.player = brightcove.api.getExperience(experienceID);
						this.playerModule = this.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
						console.log('playerModule', this.playerModule);
						this.$el.trigger('playerLoaded.' + pluginName);
					})
				}));
				$params.push($('<param>', {
					name: 'templateReadyHandler',
					value: this._createBrightcoveCallback(function () {
						this.$el.trigger('playerReady.' + pluginName);
						this.bindTriggers();
					})
				}));
				$playerObject.append($params);
				return $playerObject;
			},
			_createBrightcoveCallback: function (cb) {
				var fName = 'jQueryBrightcove'+Date.now() * Math.floor((Math.random() * (1000 - 1) + 1));
				window[fName] = cb.bind(this);
				return fName;
			}
    });

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function () {
			var params = slice.call(arguments);
			var options, method, args;
			if (params.length === 1) {
				if (typeof params[0] === 'object') {
					options = params.shift();
				} else if (typeof params[0] === 'string') {
					method = params.shift();
				}
			} else {
				method = params.shift();
				args = params;
			}

			this.each(function() {
				var pluginInstance = $.data(this, 'plugin_' + pluginName);
				if (!pluginInstance) {
					if (typeof options !== 'object') $.error(pluginName + ' has not been initialized yet');
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				} else {
					if (!pluginInstance[method]) {
						$.error('Method name "' + method + '" missing');
					} else {
						pluginInstance[method].apply(pluginInstance, args);
					}
				}
			});

			// chain jQuery functions
			return this;
		};

		$.fn[pluginName].defaults = {
		  'bgcolor': 'transparent',
		  'width': '100%',
		  'height': '100%',
		  'playerID': null,
		  'playerKey': null,
		  'isVid': true,
		  'isUI': true,
		  'dynamicStreaming': true,
		  'includeAPI': true
		};

})( jQuery, window, document );
