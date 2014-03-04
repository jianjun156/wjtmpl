(function(window, $) {

	var select = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;

		this._qid = _$itemRoot.data("id");
		this.required = _$itemRoot.data("required");

		this._$inputBox = _$itemRoot.find(".c_select");
		this._$input = this._$inputBox.find("select").change(function() {
			self.hideMsg();
			_setValue();
			$(this).prev().text($(this).find("option:selected").text());
		});
		//出错提示
		this._$msg = $('<div class="c_error"></div>').hide();
		this._$inputBox.before(this._$msg);

		//保存数据
		var _setValue = function() {
			_$itemRoot.data("qstValue", {
				"questionId" : self._qid, //问题id
				"answers" : {//答案
					"type" : "normal",
					"answerId" : self._$input.val(),
				}
			});
		};
		_setValue();

	};
	select.prototype = {
		getQstValue : function() {
			var $this = this.$;
			if ($this.hasClass("c_item")) {
				return $this.data("qstValue");
			}
		},
		checkQstValue : function() {
			var value = this.getQstValue();

			if (this.required && $.trim(value) == "") {
				this.showMsg("请输入答案");
				return false;
			}
			return true;
		},
		hideMsg : function() {
			this._$msg.hide();
		},

		showMsg : function(tip) {
			this._$msg.html(tip).show();
		}
	};
	$.qst.select = select;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_select").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.select({
			$ : $root
		}));
	});

});
