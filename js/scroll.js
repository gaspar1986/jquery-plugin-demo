(function(win,doc,$){
	function CusScrollBar(options){
		this._init(options);
	}
	CusScrollBar.prototype = {
		_init:function(){
			console.log('test');
		}
	}
	win.CusScrollBar = CusScrollBar;
})(window,document,jQuery);
new CusScrollBar();