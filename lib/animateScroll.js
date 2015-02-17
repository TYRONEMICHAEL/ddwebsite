var $ = require('jquery');
var stampit = require('stampit');

module.exports = function($elements, animationClass) {

	var state = stampit().state({
		$w: $w = $(window),
		$elements: $elements,
		animationClass: 'come-in'
	});
	
	var animateScroll = stampit().enclose(function () {
		
		this.isVisible = function($el) {

			var viewTop = this.$w.scrollTop() ;
			var viewBottom = viewTop + this.$w.height() ;
			var top = $el.offset().top ;
			var compareTop = (top + $el.height());
			var compareBottom = top;

			return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
		};

		this.animate = function() {
			
			this.$elements.each(function(i, el) {
				var $el = $(el);
				
				if(this.isVisible($el))
					$el.addClass(this.animationClass);

			}.bind(this));

		};

	});

	return stampit.compose(state, animateScroll);

};

