$.am.debug = {
	enable : false,
	init : function() {
		this.enable = (window.localStorage.getItem("kfcmos_debug") == "open");
	},
	show : function() {
		var self = this;
		if (this.div) {
			return;
		}
		this.div = $('<div id="am-consolediv" class="am-clickable" style="position: fixed; word-wrap: break-word; z-index: 1000; background: rgba(0,0,0,0.5); width: 80%; height: 100px; top: 45px; right:0px; color: white; font-size: 9px; overflow: hidden;"></div>');
		this.div.vclick(function() {
			self.hide();
		});
		$("body").append(this.div);
	},
	hide : function() {
		if (this.div) {
			this.div.remove();
			delete this.div;
		}
	},
	log : function(msg) {
		if (!this.enable) {
			return false;
		}
		if (!this.div) {
			this.show();
		}
		var date = new Date();
		this.div.prepend(date.getMinutes() + ":" + date.getSeconds() + " " + msg + "<br>");
	},
	postLog : function() {
	}
};
