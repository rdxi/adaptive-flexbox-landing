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
    var self = this;

    self.photo.on('click', function() {
      self.currentIndex = $(this).index();

      self.changePhoto();
      self.changeText();
    });
  },

  arrowListener: function() {
    var self = this;

    $('.slider-arrow').on('click', function() {
      var isArrowRight = $(this).hasClass('slider-arrow--right');

      if (isArrowRight) {
        self.increaseCurrentIndex();
      } else {
        self.decreaseCurrentIndex();
      }

      self.changePhoto();
      self.changeText();
    });

  },

  resizeListener: function() {
    var self = this;

    $(window).on('resize', function() {
      self.changePhoto();
      self.changeText();
    });
  },

  changePhoto: function() {
    var self = this;

    self.photo.eq(self.currentIndex)
         .addClass(this.currentPhotoClassName)
         .siblings()
         .removeClass(this.currentPhotoClassName);
  },

  changeText: function() {
    var self = this;
    var textElPosition = self.textEl.width() * self.currentIndex;

    self.textElContainer.css('transform', 'translateX('+ -textElPosition +'px)');
  },

  increaseCurrentIndex: function() {
    var self = this;
    self.currentIndex = (self.currentIndex < self.photo.length - 1) ? self.currentIndex + 1 : 0;
  },

  decreaseCurrentIndex: function() {
    var self = this;
    self.currentIndex = (self.currentIndex > 0) ? self.currentIndex - 1 : self.photo.length - 1;
  },

  autoScroll: function(interval) {
    var self = this;
    var scrollInterval = interval || 2000;

    setInterval(function() {
      self.increaseCurrentIndex();
      self.changePhoto();
      self.changeText();
    }, scrollInterval);
  }
};