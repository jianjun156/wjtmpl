//创建am命名空间
window.$ && (window.$.am = {});
$.am.supports = {
	CSS3DTransform : ( typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'))
};
$.am.components = [];
$.am.Component = function(e) {
	if ($.am.apiReady) {
		this.componentInit && this.componentInit();
	}
};
$.am.use2d = false;
$.am.getInnerHeight = function() {
	var h = window.innerHeight;
	return h;
};

//$ready事件做的事
$(function() {
	$.am.events && $.am.events.init();

	for (var i = 0; i < $.am.components.length; i++) {
		$.am.components[i].componentInit && $.am.components[i].componentInit();
	}
	
	$.am.init && $.am.init();
});