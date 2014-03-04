(function(window, $) {

	var textarea = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;

		this._qid = _$itemRoot.data("id");
		this.required = _$itemRoot.data("required");

		this._$inputBox = _$itemRoot.find(".c_textarea");
		this._$input = this._$inputBox.find("textarea").change(function() {
			self.hideMsg();
			_setValue();
		}).focus(function() {
			$(this).parent().addClass("focus");
		}).blur(function() {
			$(this).parent().removeClass("focus");
		});
		//出错提示
		this._$msg = $('<div class="c_error"></div>').hide();
		this._$inputBox.before(this._$msg);

		//保存数据
		var _setValue = function() {
			_$itemRoot.data("qstValue", {
				questionId : self._qid,
				answers: self._$input.val()
			});
		};
		_setValue();

	};
	textarea.prototype = {
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
	$.qst.textarea = textarea;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_textarea").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.textarea({
			$ : $root
		}));
	});

});
