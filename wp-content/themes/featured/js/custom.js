/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// flex background slider
jQuery(document).ready(function(jQuery) {
    jQuery(window).load(function() {
        var newspeed = jQuery("#txt_slidespeed").val();
        if (jQuery('.fadein-slider .slide-item').length > 1) {
            jQuery('.fadein-slider .slide-item:gt(0)').hide();
            setInterval(function() {
                jQuery('.fadein-slider :first-child').fadeOut(2000).next('.slide-item').fadeIn(2000).end().appendTo('.fadein-slider');
            }, newspeed);
        }

        if (jQuery('.fadein-slider').length > 1) {
            var featured_slide = jQuery('.fadein-slider');
            var featured_slideSrc = new Array();

            if (featured_slide.length) {
                jQuery.each(featured_slide, function(i, f) {
                    featured_slideSrc[i] = jQuery(f).attr('src');
                    /*remove the src attribute so window will ignore these iframes*/
                    jQuery(f).attr('src', '');
                });
            }

            function featured_slide_flex() {
                if (featured_slide.length) {
                    jQuery.each(featured_slide, function(a, x) {
                        /*put the src attribute value back*/
                        jQuery(x).attr('src', featured_slideSrc[a]);
                    });
                }
            }
            setTimeout(featured_slide_flex, 6000);
        }
    });
    jQuery(".loader").fadeOut("slow");
    jQuery(".overlayloader").fadeOut("slow");


    // isotop-portfolio script
    function plf_AjaxRequest(data, method) {
        return;
    }


    (function(jquery) {
        function portfilo_show_gallery($input) {
            jquery('.lfb-load-more').css("display", "none");
            var $pl_totalcat = jquery('.featured-filter').attr('pfl_perpage');
            var data_filter = $input.attr("data-filter");
            var class_filter = $input.attr("class");
            var $cate_slug = data_filter.replace(/\./g, "");
            var $total_post = jquery(data_filter).attr("totalpost");
            var $pagi = Math.round(parseFloat($total_post / $pl_totalcat));
            var $lfb_page = jquery(data_filter).attr('lfb-page');

            if ($pl_totalcat < $total_post && $pagi >= $lfb_page) {
                jquery('.lfb-load-more').css("display", "block");
                jquery(".lfb-load-more").attr("cate-slug", $cate_slug);
            }

            return data_filter;
        }
        jquery(window).load(function() {

            setTimeout(function() {
                if (jQuery("#filters.button").length) {
                    var $input = jquery("#filters.button");
                    var data_filter = $input.attr("data-filter");
                    jquery('.lfb-load-more').css("display", "none");
                    var jquerygrid = jquery('.grid').isotope({
                        filter: data_filter
                    });
                    portfilo_show_gallery($input);
                }
            }, 3000);


            jquery("#filters.button").click(function() {
                jquery(".current").removeClass('current');
            });

            jquery(".current").click(function() {
                var $grid = jquery('.grid').isotope({
                    filter: data_filter
                });
            });

            jquery("#filters.button").click(function() {
                var $input = jquery(this);

                data_filter = portfilo_show_gallery($input);
                var jquerygrid = jquery(".grid").isotope({
                    filter: data_filter
                });

            });

            jquery(".lfb-load-more").click(function() {
                var $cateSlug = jquery('.lfb-load-more').attr('cate-slug');
                var $lfb_page = jquery('.' + $cateSlug).attr('lfb-page');
                var $plf_data = "post_page=" + $lfb_page + "&cate_slug=" + $cateSlug + "&action=pfl_portfolio_ajax";
                jquery.ajax({
                    url: frontendajax.featured_ajaxurl,
                    type: 'POST',
                    data: $plf_data,
                    cache: false
                }).success(function(response) {
                    if (response != 1) {
                        var $lfb_page_new = parseInt($lfb_page) + 1;
                        jquery('.' + $cateSlug).attr("lfb-page", $lfb_page_new);
                        var $newItems = jquery(response);
                        jquery('.grid').append($newItems).isotope('appended', $newItems);
                    } else {
                        jquery('.lfb-load-more').css("display", "none");
                    }
                });

            });

        });
        var selector = '.featured-filter li a';
        jQuery(selector).on('click', function() {
            jQuery(selector).removeClass('active');
            jQuery(this).addClass('active');
        });
    })(jQuery);
    // isoptop-portfolio script end
    /*-------------------------------------------------*/
    /* srcolling-section-menu
    /*--------------------------------------------------*/
    function validUrlCheck(url) {
        var url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return url_validate;
    }

    if (jQuery(".home").length) {
        jQuery('.menu li a:first').addClass('active');
        jQuery(document).on("scroll", onScroll);

        function onScroll(event) {
            var scrollPos = jQuery(document).scrollTop();
            if (scrollPos >= 100) {
                jQuery('.menu li a').each(function() {
                    var currLink = jQuery(this);
                    var url = currLink.attr("href");
                    var url_validate = validUrlCheck(url);
                    if (!url_validate.test(url) && url.match(/\/$/) != '/') {
                        var refElement = jQuery(currLink.attr("href"));
                        if (jQuery(url).length) {
                            if (refElement.position().top - 100 <= scrollPos && refElement.position().top - 100 + refElement.height() > scrollPos) {
                                jQuery('.menu li a').removeClass('active');
                                currLink.addClass("active");
                            }
                        }
                    }
                });
            } else {
                jQuery('.menu li a').removeClass('active');
                jQuery('.menu li a:first').addClass('active');
            }
        }
    }
    jQuery('.menu li a').bind('click', function(event) {
        var $anchor = jQuery(this);
        var url = $anchor.attr('href');
        var url_validate = validUrlCheck(url);
        if (!url_validate.test(url) && url.match(/\/$/) != '/') {
            if (jQuery(url).length) {
                jQuery('html, body').stop().animate({
                    scrollTop: jQuery(url).offset().top - 75
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            }
        }
    });
    /*-------------------------------------------------*/
    /* srcolling-section-menu
    /*--------------------------------------------------*/
    /*----------------------------------------------------
    /* Responsive Navigation
    /*--------------------------------------------------*/
    /* <![CDATA[ */
    var themehunk_customscript = {
        "responsive": "1",
        "nav_menu": "secondary"
    };
    /* ]]> */
    if (themehunk_customscript.responsive && themehunk_customscript.nav_menu != 'none') {
        jQuery(document).ready(function($) {
            // merge if two menus exist
            if (themehunk_customscript.nav_menu == 'both') {
                $('.navigation').not('.mobile-menu-wrapper').find('.menu').clone().appendTo('.mobile-menu-wrapper').hide();
            }

            $('.toggle-mobile-menu').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('body').toggleClass('mobile-menu-active');
            });

            // prevent propagation of scroll event to parent
            $(document).on('DOMMouseScroll mousewheel', '.mobile-menu-wrapper', function(ev) {
                var $this = $(this),
                    scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    height = $this.height(),
                    delta = (ev.type == 'DOMMouseScroll' ?
                        ev.originalEvent.detail * -40 :
                        ev.originalEvent.wheelDelta),
                    up = delta > 0;

                var prevent = function() {
                    ev.stopPropagation();
                    ev.preventDefault();
                    ev.returnValue = false;
                    return false;
                }

                if ($('a#pull').css('display') !== 'none') { // if toggle menu button is visible ( small screens )

                    if (!up && -delta > scrollHeight - height - scrollTop) {
                        // Scrolling down, but this will take us past the bottom.
                        $this.scrollTop(scrollHeight);
                        return prevent();
                    } else if (up && delta > scrollTop) {
                        // Scrolling up, but this will take us past the top.
                        $this.scrollTop(0);
                        return prevent();
                    }
                }
            });
        }).on('click', function(event) {

            var $target = jQuery(event.target);
            if (($target.hasClass("fa") && $target.parent().hasClass("toggle-caret")) || $target.hasClass("toggle-caret")) { // allow clicking on menu toggles
                return;
            }

            jQuery('body').removeClass('mobile-menu-active');
        });


    }
    jQuery(document).ready(function($) {
        /*----------------------------------------------------
        /*  Dropdown menu
        /* ------------------------------------------------- */
        function thDropdownMenu() {
            var wWidth = $(window).width();
            if (wWidth > 1024) {
                $('.navigation ul.sub-menu, .navigation ul.children').hide();
                var timer;
                var delay = 100;
                $('.navigation li').hover(
                    function() {
                        var $this = $(this);
                        timer = setTimeout(function() {
                            $this.children('ul.sub-menu, ul.children').slideDown('fast');
                        }, delay);

                    },
                    function() {
                        $(this).children('ul.sub-menu, ul.children').hide();
                        clearTimeout(timer);
                    }
                );
                //keynavigation
                $(".menu-item a").focusin(function() {
                    $(this).parent().prev().find('.sub-menu').css("display", "none");
                    $('+ .sub-menu', this).css("display", "block");
                });
            } else {
                $('.navigation li').unbind('hover');
                $('.navigation li.active > ul.sub-menu, .navigation li.active > ul.children').show();
            }
        }

        thDropdownMenu();

        $(window).resize(function() {
            thDropdownMenu();
        });

        /*---------------------------------------------------
        /*  Vertical menus toggles
        /* -------------------------------------------------*/


        $('.widget_nav_menu, .navigation .menu').addClass('toggle-menu');
        $('.toggle-menu ul.sub-menu, .toggle-menu ul.children').addClass('toggle-submenu');
        $('.toggle-menu ul.sub-menu').parent().addClass('toggle-menu-item-parent');

        $('.toggle-menu .toggle-menu-item-parent').append('<span class="toggle-caret" tabindex="0"><i class="fa fa-plus"></i></span>');

        $('.toggle-caret').click(function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('active').children('.toggle-submenu').slideToggle('fast');
        });

        //blog Owl carousel
        var post_spd = jQuery("#post_spd").val();
        var post_ply = jQuery("#post_ply").val();
        var newcnt = jQuery("#slidecnt").val();
        if (post_ply == 'true') {
            jQuery('#news .owl-carousel').owlCarousel({
                loop: true,
                margin: 0,
                autoplay: true,
                autoplaySpeed: 1500,
                autoplayTimeout: post_spd,
                autoplayHoverPause: true,
                nav: true,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    380: {
                        items: 1,
                        nav: true
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: newcnt,
                        nav: true
                    }
                }
            })
        } else {
            jQuery('#news .owl-carousel').owlCarousel({
                loop: true,
                margin: 0,
                autoplay: true,
                nav: true,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    380: {
                        items: 1,
                        nav: true
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: newcnt,
                        nav: true
                    }
                }
            })


        };
        //owl-brand-slider
        var brand_slidr_spd = jQuery("#brnd_spd").val();
        var newnumb = jQuery("#slidenumber").val();
        var brand_ply = jQuery("#brand_ply").val();
        if (brand_ply == 'true') {
            jQuery('#brand .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                nav: false,
                dots: false,
                autoplaySpeed: 1500,
                autoplayTimeout: brand_slidr_spd,
                autoplayHoverPause: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                        nav: true
                    },
                    380: {
                        items: 2,
                        nav: true
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: newnumb,
                        nav: true
                    }
                }
            })
        } else {
            jQuery('#brand .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: false,
                nav: false,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                        nav: true
                    },
                    380: {
                        items: 2,
                        nav: true
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: newnumb,
                        nav: true
                    }
                }
            })

        }
    });
    jQuery(window).load(function() {
        // loader
        jQuery(".loader").fadeOut("slow");
        jQuery(".overlayloader").delay(2000).fadeOut("slow");

    });

    // Scroll down header
    function init() {
        window.addEventListener('scroll', function(e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 80,
                header = document.querySelector("header");
            if (!classie.has(header, "menu-static")) {
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                    jQuery(".main-heading").addClass("smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                        jQuery(".main-heading").removeClass("smaller");
                    }
                }
            }
        });
    }
    window.onload = init();
    if (jQuery("#back-to-top").val() == '' || jQuery("#back-to-top").val() == '0') {
        /*Show-hide Scroll to top & move-to-top arrow*/
        jQuery("body").prepend("<a id='move-to-top' class='animate hiding' href='#header'><i class='fas fa-angle-up'></i></a>");

        var scrollDes = 'html,body';
        /*Opera does a strange thing if we use 'html' and 'body' together so my solution is to do the UA sniffing thing*/
        if (navigator.userAgent.match(/opera/i)) {
            scrollDes = 'html';
        }
        //show ,hide
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 160) {
                jQuery('#move-to-top').addClass('filling').removeClass('hiding');
            } else {
                jQuery('#move-to-top').removeClass('filling').addClass('hiding');
            }
        });
        //move to top
        jQuery(document).ready(function() {
            jQuery(window).scroll(function() {
                if (jQuery(this).scrollTop() > 100) {
                    jQuery('#move-to-top').fadeIn();
                } else {
                    jQuery('#move-to-top').fadeOut();
                }
            });
            jQuery('#move-to-top').click(function() {
                jQuery("html, body").animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        });
    }
    // lead form function
    jQuery(window).load(function() {
        jQuery('.leadform-show-form span').addClass("form-group");
    });
    jQuery("input").focus(function() {
        jQuery(this).parent().addClass("form-lined");
    });
    jQuery("input").blur(function() {
        jQuery(this).parent().removeClass("form-lined")
    });
    jQuery("textarea").focus(function() {
        jQuery(this).parent().addClass("form-lined");
    });
    jQuery("textarea").blur(function() {
        jQuery(this).parent().removeClass("form-lined")
    });
    //map scrolling
    jQuery(document).ready(function() {
        // prettyPhoto
        if (jQuery(".featured-gallery-show").length) {
            jQuery("a[rel^='prettyPhoto']").prettyPhoto();
        }



        jQuery('.map').click(function() {
            jQuery('.map iframe').css("pointer-events", "auto");
        });

        jQuery(".map").mouseleave(function() {
            jQuery('.map iframe').css("pointer-events", "none");
        });
    });
    // skill scroll down
    (function(jquery) {
        jquery(window).scroll(function() {
            /* Check the location of each desired element */
            jquery('.chart').each(function(i) {
                var bottom_of_object = jquery(this).offset().top + jquery(this).outerHeight();
                var bottom_of_window = jquery(window).scrollTop() + jquery(window).height();
                /* If the object is completely visible in the window, fade it in */
                if (bottom_of_window > bottom_of_object) {

                    jquery('.chart').easyPieChart({
                        easing: 'easeOutElastic',
                        size: 110,
                        barColor: "#22a7f0",
                        trackColor: "#e9e9e9",
                        scaleColor: false,
                        lineWidth: 5,
                        lineCap: 'round',
                        animate: 2000,
                        onStep: function(from, to, percent) {
                            jquery(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                }
            });
        });
    })(jQuery);
    /*------------wow animation------------*/
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
            // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
    });
    wow.init();
});