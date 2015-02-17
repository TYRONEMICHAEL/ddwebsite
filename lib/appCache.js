var $ = require('jquery');
var stampit = require('stampit');

module.exports = function(cache, $el) {

	var state = stampit().state({
		c: cache,
		$el: $el
	});
	
	var appCache = stampit().enclose(function () {
		
		this.progress = function(e) {
			var percent = Math.round(e.loaded / e.total * 100);

			this.$el.empty().append(percent);

			console.log(percent === 100);

			if(percent === 100) return this.cached();
		};

		this.cached = function() {
			this.$el
				.empty()
				.append(100)
				.fadeOut('slow', this.$el.remove.bind(this.$el));
		}
;
	});

	return stampit.compose(state, appCache);

};

