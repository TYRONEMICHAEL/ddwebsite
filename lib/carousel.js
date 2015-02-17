var $ = require('jquery');
var stampit = require('stampit');
var slick = require('slick-carousel');

module.exports = function($element, data) {

	var state = stampit().state({
		$element: $element,
		$modal: $('.cd-panel'),
		data: data
	});
	
	var carousel = stampit().enclose(function () {

		var template = function(member) {
			return '<div data-id="' + member.id + '" class="team__member">' +
							'<img class="team__member__pic" src="images/team/' + member.picture + '"/>' +
							'<h3 class="team__member__name">' + member.firstname + '</h3>' +
							'<p class="team__member__role"><small><i>' + member.role + '</i></small></p>' +
						'</div>';
		};

		this.build = function() {
			
			$element.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: true,
				centerMode: true,
				responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        infinite: true,
			        dots: true
			      }
			    },
			    {
			      breakpoint: 1023,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			  ]
			});

			this.data.forEach(function(member) {
				$element.slick('slickAdd', template(member));
			}.bind(this));

		};


		this.showModal = function(ev) {
			var id = $(ev.currentTarget).data('id');
			var member = $.grep(this.data, function(member){ return member.id == id; })[0];

			this.$modal.addClass('is-visible')
				.find('.cd-panel-header h3')
					.empty()
					.append(member.firstname + ' ' + member.surname)
				.end()
				.find('.cd-panel-descrip')
					.empty()
					.append(member.description)
				.end()
				.find('.cd-panel-image')
					.attr('src', 'images/team/' + member.picture);
		};

		this.hideModal = function(ev) {
			ev.preventDefault();
			this.$modal.removeClass('is-visible');
		}

	});

	

	return stampit.compose(state, carousel);

};

