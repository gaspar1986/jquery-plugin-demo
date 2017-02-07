(function(win,doc,$){
	function CusScrollBar(options){
		this._init(options);
	}
	CusScrollBar.prototype = {
		_init:function(options){
			var self = this;
			self.options = {
				scrollDir:"y",//滚动的方向
				contSelector:"",
				barSelector:"",
				sliderSelector:""
			}
			$.extend(true,self.options,options||{})
			self._initDomEvent();
			return self;
		},
		_initDomEvent:function(){
			var opts = this.options;
			this.$cont = $(opts.contSelector);
			this.$slider = $(opts.sliderSelector);
			this.$bar = $(opts.barSelector) ? $(opts.barSelector) : this.$slider.parent();
			this.$doc = $(doc);
			this._initSliderDragEvent();
		},
		_initSliderDragEvent:function(){
			var slider = this.$slider,
				sliderEl = slider[0];
				if(sliderEl){
					var doc = this.$doc,
						dragStartPagePosition,
						dragStartScrollPosition,
						dragContBarRate;
					slider.on("mousedown",function(e){
						e.preventDefault();
						console.log("mousedown");
						doc.on("mousemove.scroll",function(e){
							console.log('mousemove');
						}).on("mouseup.scroll",function(){
							console.log('mouseup');
							doc.off(".scroll");
						})
					})
				}
		}
	}
	win.CusScrollBar = CusScrollBar;
})(window,document,jQuery);


new CusScrollBar({
	contSelector:".scroll-wrap",
	barSelector:".scroll-bar",
	sliderSelector:".scroll-slider"
});