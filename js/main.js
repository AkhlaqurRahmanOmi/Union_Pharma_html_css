/*-----------------------------------------------------------------------------------

    Theme Name: Biology - Laboratory and Research Template
    Description: Laboratory and Research Template
    Author: Chitrakoot Web
    Version: 1.0

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. scrollIt
        03. Sticky Header
        04. Scroll To Top
        05. Navbar for Onepage
        06. Sidemenu toggleClass
        07. Parallax
        08. Video
        09. Resize function
        10. FullScreenHeight function
        11. ScreenFixedHeight function
        12. Copy to clipboard
        13. FullScreenHeight and screenHeight with resize function
        14. Sliders
        15. Tabs
        16. CountUp
        17. Countdown
        18. Current Year
        19. Stellar
        
    ---------------------------------- */    

(function($) {

    "use strict";

    var $window = $(window);

        /*------------------------------------
            01. Preloader
        --------------------------------------*/

        $('#preloader').fadeOut('normall', function() {
            $(this).remove();
        });

        /*------------------------------------
            02. scrollIt
        --------------------------------------*/

        $.scrollIt({
          upKey: 38,                // key code to navigate to the next section
          downKey: 40,              // key code to navigate to the previous section
          easing: 'swing',          // the easing function for animation
          scrollTime: 600,          // how long (in ms) the animation takes
          activeClass: 'active',    // class given to the active nav element
          onPageChange: null,       // function(pageIndex) that is called when page is changed
          topOffset: -70            // offste (in px) for fixed top navigation
        });

        /*------------------------------------
            03. Sticky Header
        --------------------------------------*/

        $window.on('scroll', function() {
            var scroll = $window.scrollTop();
            var logochange = $(".navbar-brand img");
            var logodefault = $(".navbar-brand.logodefault img");
            if (scroll <= 50) {
                $("header").removeClass("scrollHeader").addClass("fixedHeader");
                logochange.attr('src', 'img/logos/logo-inner.png');
                logodefault.attr('src', 'img/logos/logo.png');
            } 
            else {
                $("header").removeClass("fixedHeader").addClass("scrollHeader");
                logochange.attr('src', 'img/logos/logo.png');
                logodefault.attr('src', 'img/logos/logo.png');
            }
        });


        /*------------------------------------
            04. Scroll To Top
        --------------------------------------*/

        $window.on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $(".scroll-to-top").fadeIn(400);

            } else {
                $(".scroll-to-top").fadeOut(400);
            }
        });

        $(".scroll-to-top").on('click', function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        });

        /*------------------------------------
            05. Navbar for Onepage
        --------------------------------------*/

        $window.on("scroll",function () {

            var bodyScroll = $window.scrollTop(),
                navbar = $(".onepage-nav.navbar");

            if(bodyScroll > 100){
                navbar.addClass("nav-scroll");
            }else{
                navbar.removeClass("nav-scroll");
            }
        });

        var windowsize = $window.width();
            if (windowsize <= 991) {
            $('.onepage-nav .navbar-nav .nav-link').on("click", function(){
                $('.onepage-nav .navbar-nav').removeClass('open').hide();
                $('.onepage-nav .navbar-toggler').removeClass('menu-opened');
            });
        }

        /*------------------------------------
            06. Sidemenu toggleClass
        --------------------------------------*/

        if ($("#sidebar_toggle").length) {
           $("body").addClass("sidebar-menu");
           $("#sidebar_toggle").on("click", function () {
              $(".sidebar-menu").toggleClass("active");
              $(".side-menu").addClass("side-menu-active"), $("#close_sidebar").fadeIn(700)
           }), $("#close_sidebar").on("click", function () {
              $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".sidebar-menu").removeClass("active")
           }), $("#btn_sidebar_colse").on("click", function () {
              $(".side-menu").removeClass("side-menu-active"), $("#close_sidebar").fadeOut(200), $(".sidebar-menu").removeClass("active")
           });
        }


        /*------------------------------------
            07. Parallax
        --------------------------------------*/

        // sections background image from data background
        var pageSection = $(".parallax,.bg-img");
        pageSection.each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });
        
        /*------------------------------------
            08. Video
        --------------------------------------*/

        $('.story-video').magnificPopup({
            delegate: '.video',
            type: 'iframe'
        });

        $('.popup-social-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.source-modal').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160
        });

        /*------------------------------------
            09. Resize function
        --------------------------------------*/

        $window.resize(function(event) {
            setTimeout(function() {
                SetResizeContent();
            }, 500);
            event.preventDefault();
        });

        /*------------------------------------
            10. FullScreenHeight function
        --------------------------------------*/

        function fullScreenHeight() {
            var element = $(".full-screen");
            var $minheight = $window.height();
            element.css('min-height', $minheight);
        }

        /*------------------------------------
            11. ScreenFixedHeight function
        --------------------------------------*/

        function ScreenFixedHeight() {
            var $headerHeight = $("header").height();
            var element = $(".screen-height");
            var $screenheight = $window.height() - $headerHeight;
            element.css('height', $screenheight);
        }

        /*------------------------------------
            11. Copy to clipboard
        --------------------------------------*/

        if ($(".copy-clipboard").length !== 0) {
            new ClipboardJS('.copy-clipboard');
            $('.copy-clipboard').on('click', function() {
                var $this = $(this);
                var originalText = $this.text();
                $this.text('Copied');
                setTimeout(function() {
                    $this.text('Copy')
                    }, 2000);
            });
        };

        /*------------------------------------
            13. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/        

        function SetResizeContent() {
            fullScreenHeight();
            ScreenFixedHeight();
        }

        SetResizeContent();

    // === when document ready === //
    $(document).ready(function() {


        /*------------------------------------
            14. Sliders
        --------------------------------------*/

        // testmonial-carousel (demo-1)
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 35,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1,
                    dots:false
                },
                576: {
                    items: 1,
                    dots:false
                },
                992: {
                    items: 2
                },
                1024: {
                    items: 2
                }
            }
        });

        // testmonial-carousel2 (demo-3)
        $('.testimonial-carousel2').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 35,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });

        // portfolio-carousel (demo-3)
        $('.portfolio-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
            margin: 35,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1,
                    nav:false
                },
                576: {
                    items: 3,
                    margin:20,
                    nav:false
                },
                992: {
                    items: 3
                },
                1024: {
                    items: 4
                }
            }
        });

        // portfolio-detail-carousel
        $('.portfolio-detail-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 35,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2,
                    margin:20
                },
                992: {
                    items: 3
                },
                1024: {
                    items: 3
                }
            }
        });

        // client-carousel (demo-2)
        $('.client-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            margin: 35,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 2,
                },
                576: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1024: {
                    items: 5
                }
            }
        });

        $('.slider-fade1 .owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            nav: false,
            navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
            margin: 0,
            autoplay: true,
            smartSpeed: 1500,
            mouseDrag:false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: {
                768: {
                    nav: false
                },
                992: {
                    nav: true
                }
            }

        });

        // Default owlCarousel
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            dots: false,
            margin: 0,
            autoplay:true,
            smartSpeed: 1500
        });

        // Slider text animation
        var owl = $('.slider-fade1');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('span').removeClass('animated fadeInUp');
            $('h1').removeClass('animated fadeInUp');
            $('.butn').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('span').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated fadeInUp');
        });

        /*------------------------------------
            15. Tabs
        --------------------------------------*/

        //Horizontal Tab
        if ($(".horizontaltab").length !== 0) {
            $('.horizontaltab').easyResponsiveTabs({
                type: 'default', //Types: default, vertical, accordion
                width: 'auto', //auto or any width like 600px
                fit: true, // 100% fit in a container
                tabidentify: 'hor_1', // The tab groups identifier
                activate: function(event) { // Callback function if tab is switched
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }

        /*------------------------------------
            16. CountUp
        --------------------------------------*/

        $('.countup').counterUp({
            delay: 25,
            time: 2000
        });

        /*------------------------------------
            17. Countdown
        --------------------------------------*/

        // CountDown for coming soon page
        $(".countdown").countdown({
            date: "01 Mar 2026 00:01:00", //set your date and time. EX: 15 May 2014 12:00:00
            format: "on"
        });

        /*------------------------------------
            18. Current Year
        --------------------------------------*/

        $('.current-year').text(new Date().getFullYear());
      
    });

    // === when window loading === //
    $window.on("load", function() {

        /*------------------------------------
            19. Stellar
        --------------------------------------*/

        $('.portfolio-gallery').lightGallery();

        $('.portfolio-link').on('click', (e) => {
            e.stopPropagation();
        });

    });



})(jQuery);