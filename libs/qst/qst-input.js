(function(window, $) {

	var rex = {
		email : /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i,
		cellphone : /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/,
		number : /^[0-9]*$/,
		letter : /^[A-Za-z]+$/,
		chinese : /^[^u4E00-u9FA5]+$/
	};

	var tip = {
		email : "邮箱",
		cellphone : "手机号",
		number : "数字",
		letter : "字母",
		chinese : "中文"
	};

	var type = {
		email : "email",
		cellphone : "tel",
		number : "number",
		letter : "text",
		chinese : "text"
	};

	var input = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;

		this._qid = _$itemRoot.data("id");
		this.type = _$itemRoot.data("type");
		this.required = _$itemRoot.data("required");

		this._$inputBox = _$itemRoot.find(".c_input");
		this._$input = $('<input type="' + type[this.type] + '" value="" />').appendTo(this._$inputBox).change(function() {
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
	input.prototype = {
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

			if (this.type && rex[this.type] && !rex[this.type].test(value)) {
				this.showMsg("请输入正确的" + tip[this.type]);
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
	$.qst.input = input;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_input").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.input({
			$ : $root
		}));
	});

});
