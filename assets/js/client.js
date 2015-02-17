var stampit = require('stampit');
var $ = window.$ = require('jquery');
var svgMenu = require('../../lib/svgMenu');
var appCache = require('../../lib/appCache');
var animateScroll = require('../../lib/animateScroll');
var carousel = require('../../lib/carousel');
var slick = require('slick-carousel');
var GMaps = require('gmaps');

var clientState = stampit().state({
	primaryNav: svgMenu('.nav').create(),
	animateScroll: animateScroll($('.animate-scroll'), 'animate-scroll__animate').create(),
	carousel: carousel($('.team__carousel'), require('./data')).create(),
	appCache: appCache(window.applicationCache, $('.progress')).create()
});

var app = stampit().enclose(function () {

	var map;

	var buildMap =  function () {
		map = new GMaps({
      el: '#map',
      lat: -12.043333,
      lng: -77.028333
    });
	};

	var findLocation = function() {
		GMaps.geolocate({
		  success: function(position) {
		    map.setCenter(position.coords.latitude, position.coords.longitude);
		  },
		  error: function(error) {
		    alert('Geolocation failed: '+error.message);
		  },
		  not_supported: function() {
		    alert("Your browser does not support geolocation");
		  },
		  always: function() {
		    alert("You were found!");
		  }
		});
	};
	
	this.init = function() {
		this.carousel.build();
		buildMap();
		
		$('.gallery__slider').slick({
		  dots: true,
		  infinite: true,
		  speed: 500,
		  cssEase: 'linear'
		});

		$('.nav__burger').on('click', this.primaryNav.toggle.bind(this.primaryNav));
		$('.nav__menu a').on('click', this.primaryNav.toggle.bind(this.primaryNav));
		$('.team__member').on('click', this.carousel.showModal.bind(this.carousel));
		$('.cd-panel').on('click', this.carousel.hideModal.bind(this.carousel));
		$('.map-btn').on('click', findLocation);
		
		$(window).on('scroll', this.animateScroll.animate.bind(this.animateScroll));

		// For some reason using jquery you dont get the progress and total values
		// Must look into this
		window.applicationCache.addEventListener('progress', this.appCache.progress.bind(this.appCache), false);
		window.applicationCache.addEventListener('cached', this.appCache.cached.bind(this.appCache), false);
		window.applicationCache.addEventListener('noupdate', this.appCache.cached.bind(this.appCache), false);
	};

});

$(document).ready(function() {
  app.compose(clientState).create().init();
});




