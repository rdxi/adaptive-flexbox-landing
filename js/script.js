// show/hide sticky header
$(document).ready(function() {
  stickyHeaderHandler();
  modalHandler();
  sliderHandler();
});

var stickyHeaderHandler = function() {
  var header = $('.header');

  if ($(window).scrollTop() > 0)  {
    header.addClass('is-scrolling');
  }

  $(window).scroll(function() {
    if( $(window).scrollTop() > 0 ) {
      header.addClass('is-scrolling');
    } else {
      header.removeClass('is-scrolling');
    }
  });
};

var modalHandler = function() {
  var modalOverlay = $('.modal-overlay');

  $('.js-modal-show').on('click', function() {
    modalOverlay.show();
  });

  $('.js-modal-hide').on('click', function(event) {
    var target = $(event.target);

    if (target.hasClass('js-modal-hide')) {
      modalOverlay.hide();
    }
  });
};


var sliderHandler = function() {
  // var currIndex = 1;

  // on arrow clicks increase and decrease currIndex;


  // we got index of slide
  // send index to function
  // function adds class to photo with index, removes class from other photos
  // function scrolls text to element with index



};