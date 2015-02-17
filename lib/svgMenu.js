var Snap = window.snap = require('snapsvg');
var $ = require('jquery');
var stampit = require('stampit');

/**
* An awesome and reusable menu 
* inspired from -> http://tympanus.net/codrops/?p=21555
*/
module.exports = function(el) {

	var $el = $(el);
	var $burger = $el.find('.nav__burger');
	var $menu = $el.find('.nav__menu');

	var burger = Snap($burger.find('svg')[0]);
	var menu = Snap($menu.find('svg')[0]);

	var burgerTop = burger.select('path:nth-of-type(1)');
	var burgerBottom = burger.select('path:nth-of-type(2)');
	var menuPath = menu.select('path');

	/**
	 * So much cleaner to set our state here
	 * than in the constructor.
	 */
	var svgMenuState = stampit().state({
		isOpen: false,
		burgerTop: burgerTop,
		burgerBottom: burgerBottom,
		menu: menuPath,
		paths: {
			reset: {
				burgerTop: burgerTop.attr('d'),
				burgerBottom: burgerBottom.attr('d'),
				menu: menuPath.attr('d')
			},
			open: {
				burger: $burger.data('morph-open').split( ';' ),
				menu: $menu.data('morph-open')
			},
			close: { 
				burger: $burger.data('morph-close').split( ';' ) 
			}
		},
		$el: $el
	});

	var svgMenu = stampit().enclose(function () {

		/**
	   * Our SVG Menu only requires a single function.
	   * The menu will be instantiated with state from the awesome
	   * library stampit. This helps create a modular menu.
	   */
		this.toggle = function() {
			var path = this.isOpen ? this.paths.close : this.paths.open;
			
			this.burgerTop.stop().animate( { 'path' : path.burger[0] }, 300, mina.easeout, function() {
				this.burgerTop.stop().animate( { 'path' : this.paths.reset.burgerTop }, 800, mina.elastic );
			}.bind(this));

			this.burgerBottom.stop().animate( { 'path' : path.burger[1] }, 300, mina.easeout, function() {
				this.burgerBottom.stop().animate( { 'path' : this.paths.reset.burgerBottom }, 800, mina.elastic );
			}.bind(this));

			this.menu.stop().animate( { 'path' : this.paths.open.menu }, 320, mina.easeinout, function() {
				this.menu.stop().animate( { 'path' : this.paths.reset.menu }, 1000, mina.elastic );
			}.bind(this));

			this.isOpen = !this.isOpen;	

			return setTimeout( function() { this.$el.toggleClass('nav--open'); }.bind(this), 200 );

		};

	});

	return stampit.compose(svgMenuState, svgMenu);
};
