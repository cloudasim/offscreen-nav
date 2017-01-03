;(function($) {

    'use strict';

    // Start of Plugin
    $.fn.offscreenMenu = function( options ) {

        var defaultSettings = {
            menuWidth : 320,
            openMaster: '.oc-open',
            closeMaster: '.oc-close',
            position: 'left',
            animationDuration: 300,
            subMenuSelector: '.is-submenu'
        }

        $.extend(defaultSettings, options);
        
        var _this = this;

        return this.each(function(){

            _this.css( 'width', defaultSettings.menuWidth + 'px');

            $(defaultSettings.openMaster).on('click', function(){
                _this.toggleClass(defaultSettings.openMaster.replace('.', ''));
                _this.before('<div class="oc-close">&#9932;</div>');
                _this.css(defaultSettings.position, 0);
                $('.oc-close').css('left', defaultSettings.menuWidth);
                $(defaultSettings.closeMaster).toggleClass('show');
                $('body').append('<div class="oc-overlay"></div>');
            });

            $(document).on('click', defaultSettings.closeMaster, function(){
                _this.toggleClass(defaultSettings.openMaster.replace('.', ''));
                _this.css(defaultSettings.position, '-' + defaultSettings.menuWidth + 'px');
                $(this).hide(100);
                $('.oc-overlay').fadeOut(500);
            });

            if('li:has(>ul)'){
                $('.hassubmenu').find('ul').css('display', 'none');
            }

            //for SubMenu from Asignment
            $(_this).on('click', 'li a', function(e) {
                //define variables
                var $this = $(this),
                $next = $this.next(),
                $isSubMenu = $next.is(defaultSettings.subMenuSelector),
                $isVisibleSubMenu = $next.is(':visible'),
                parent = $this.parents('ul').first(),
                parent_li = $this.parent("li");
                
                if ($isSubMenu) e.preventDefault();
                //if sub-menu is visible hideit
                if ($isSubMenu && $isVisibleSubMenu) {
                  parent.find('ul:visible').slideUp(defaultSettings.animationSpeed);
                  $next.parent("li").removeClass("active");
                }
                //If the sub-menu is not visible show it
                else if ($isSubMenu && !$isVisibleSubMenu) {
                  parent.find('ul:visible').slideUp(defaultSettings.animationSpeed);
                  parent.find('li.active').removeClass('active');
                  parent_li.addClass('active');
                  $next.slideDown(defaultSettings.animationSpeed);
                }
            });

        });

    }

}(jQuery));