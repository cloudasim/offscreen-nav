+(function($) {

    'use strict';

    // Start of Plugin
    $.fn.offscreenMenu = function( options ) {

       var defaultSettings = {
            menuWidth : 320,
            openMaster: '.oc-open',
            closeMaster: '.oc-close',
            position: 'left',
            animationDuration: 300
        }

        $.extend(defaultSettings, options);
        
        var _this = this;

        return this.each(function(){

            _this.css( 'width', defaultSettings.menuWidth + 'px');

            $(defaultSettings.openMaster).on('click', function(){
                _this.toggleClass(defaultSettings.openMaster.replace('.', ''));
                _this.css(defaultSettings.position, 0);
                $(defaultSettings.closeMaster).toggleClass('show');
                $('body').addClass('oc-overlay');
            });

            $(defaultSettings.closeMaster).on('click', function(){
                _this.toggleClass(defaultSettings.openMaster.replace('.', ''));
                _this.css(defaultSettings.position, '-' + defaultSettings.menuWidth + 'px');
                $(this).toggleClass('show');
                $('body').removeClass('oc-overlay');
            });

            var hasdropdown = _this.children('ul').find('li');
            if(hasdropdown.has('> ul')){
                hasdropdown.has('> ul').prepend('<span class="hasSub close"></span>');
                hasdropdown.children('ul').addClass('hide');

                $('.hasSub').siblings('ul').addClass('hide');
                $('.hasSub').on('click', function(e){
                    var selected = $(this);
                    if(selected.siblings('ul').hasClass('hide')){
                        selected.siblings('ul').addClass('hide').removeClass('show');
                        selected.siblings('ul').removeClass('hide').addClass('show');
                    }
                    else{
                        selected.siblings('ul').addClass('hide').removeClass('show');
                    }
                    selected.toggleClass('open');
                    selected.next('a').toggleClass('active');

                });

            };

        });

    }

}(jQuery));