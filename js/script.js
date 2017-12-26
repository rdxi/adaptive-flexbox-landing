$(document).ready(function() {
  stickyHeaderHandler();
  modalHandler();
  sliderHandler.init(1);
});

var stickyHeaderHandler = function() {
  var header = $('.header');
  var isWindowScrolledOnLoad = $(window).scrollTop() > 0;

  if (isWindowScrolledOnLoad)  {
    header.addClass('is-scrolling');
  }

  $(window).on('scroll', function() {
    var isWindowScrolled = $(window).scrollTop() > 0;

    if (isWindowScrolled) {
      header.addClass('is-scrolling');
    } else {
      header.removeClass('is-scrolling');
    }
  });
};

var modalHandler = function() {
  var modalOverlay = $('.modal-overlay');

  $('.js-modal-show').on('click', function() {
    modalOverlay.fadeIn(200);
  });

  $('.js-modal-hide').on('click', function(event) {
    var targetHasClass = $(event.target).hasClass('js-modal-hide');

    if (targetHasClass) {
      modalOverlay.fadeOut(200);
    }
  });
};

var sliderHandler = {
  init: function(index) {
    this.currentIndex = index || 0;

    this.photo = $('.slider-photo');
    this.currentPhotoClassName = 'slider-photo--current';

    this.textElContainer = $('.slider-text-container-inner');
    this.textEl = $('.slider-text');

    this.photoListener();
    this.arrowListener();
    this.resizeListener();

    this.changePhoto();
    this.changeText();

    // this.autoScroll(5000);
  },

  photoListener: function() {
    var that = this;

    this.photo.on('click', function() {
      that.currentIndex = $(this).index();

      that.changePhoto();
      that.changeText();
    });
  },

  arrowListener: function() {
    var that = this;

    $('.slider-arrow').on('click', function() {
      var isArrowRight = $(this).hasClass('slider-arrow--right');

      if (isArrowRight) {
        that.increaseCurrentIndex();
      } else {
        that.decreaseCurrentIndex();
      }

      that.changePhoto();
      that.changeText();
    });

  },

  resizeListener: function() {
    var that = this;

    $(window).on('resize', function() {
      that.changePhoto();
      that.changeText();
    });
  },

  changePhoto: function() {
    this.photo.eq(this.currentIndex)
         .addClass(this.currentPhotoClassName)
         .siblings()
         .removeClass(this.currentPhotoClassName);
  },

  changeText: function() {
    var textElPosition = this.textEl.width() * this.currentIndex;

    this.textElContainer.css('transform', 'translateX('+ -textElPosition +'px)');
  },

  increaseCurrentIndex: function() {
    this.currentIndex = (this.currentIndex < this.photo.length - 1) ? this.currentIndex + 1 : 0;
  },

  decreaseCurrentIndex: function() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.photo.length - 1;
  },

  autoScroll: function(interval) {
    var that = this;
    var scrollInterval = interval || 2000;

    setInterval(function() {
      that.increaseCurrentIndex();
      that.changePhoto();
      that.changeText();
    }, scrollInterval);
  }
};