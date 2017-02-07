(function(win, doc, $) {
    function CusScrollBar(options) {
        this._init(options);
    }
    CusScrollBar.prototype = {
        _init: function(options) {
            var self = this;
            self.options = {
                scrollDir: 'y',
                contSelector: '.scroll-content',
                sliderSelector: '.scroll-slider',
                barSelector: '.scroll-bar',
                wheelStep: '10',
                tabItemSelector: '.tab-item',
                tabActiveClass: 'tab-active',
                anchorSelector: '.anchor',
                correctSelector: '.correct-bot',
                articleSelector: '.scroll-ol'
            }
            $.extend(true, self.options, options || {})
            self._initDomEvent();
            return self;
        },
        _initDomEvent: function() {
        	var self = this;
            var opts = this.options;
            this.$cont = $(opts.contSelector);
            this.$slider = $(opts.sliderSelector);
            this.$bar = $(opts.barSelector) ? $(opts.barSelector) : this.$slider.parent();
            this.$doc = $(doc);
            this.$tabItem = $(opts.tabActiveClass);
            self._initSliderDragEvent();
            self._bindContScroll();
            self._bindMouseWheel();
            self._initTabEvent();
                /*self._initArticleHeight();*/
            /*    self.getAllAnchorPosition();*/
                return self;
        },
          _initTabEvent:function(){
            	var self = this;
            	self.$tabItem.on('click',function(e){
            		e.preventDefault();
            		var index = $(this).index();
            		self.changeTabSelect(index);
            		/*self.scrollTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));*/
            	});
            },
             changeTabSelect:function(index){
            	var self = this;
            	var active = self.options.tabActiveClass;
            	return self.$tabItem.eq(index).addClass(active).siblings().removeClass(active);
            },
          _bindMouseWheel:function(){
            	var self = this;
            	self.$cont.on('mousewheel DOMMouseScroll',function(e){
            		e.preventDefault();
            		var oEv = e.originalEvent;
                    var wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120:(oEv.detail||0)/3;
            		self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep);
            	});
            },
         _bindContScroll: function() {
                var self = this;
                self.$cont.on('scroll', function() {
                    if(self.$slider){
                        self.$slider.css('top',self.getSliderPosition()+'px');
                    }
                })
                return self;
            },
            getSliderPosition: function() {
                var self = this;
                maxSliderPosition = self.getMaxSliderPosition();
                return Math.min(maxSliderPosition, maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition())
            },
        _initSliderDragEvent: function() {
            var self = this;
            var slider = self.$slider;
            var sliderEl = slider[0];
            if (sliderEl) {
                var doc = this.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;

                function mouserHandler(e) {
                    e.preventDefault();
                    if (dragStartPagePosition == null) {
                        return;
                    }
                    self.scrollTo(dragStartScrollPosition + (e.pageY - dragStartPagePosition) * dragContBarRate);
                }
                slider.on('mousedown', function(e) {
                    e.preventDefault();
                    dragStartPagePosition = e.pageY;
                    dragStartScrollPosition = self.$cont[0].scrollTop;
                    dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
                    doc.on('mousemove.scroll', mouserHandler).on('mouseup.scroll', function(e) {
                        doc.off('.scroll');
                    })
                });
            }
        },
        getMaxScrollPosition: function() {
            var self = this;
            return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
        },
        getMaxSliderPosition: function() {
            var self = this;
            return self.$bar.height() - self.$slider.height();
        },
        scrollTo: function(positionVal) {
            var self = this;
            self.$cont.scrollTop(positionVal);
        }
    }
    win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);


new CusScrollBar();
