(function(window, $) {
	var sinSelect = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;
		var _$ul = _$itemRoot.find(".c_sinSelect");

		//其他选项
		this._qid = _$itemRoot.data("id");

		_$ul.find(".c_other input").change(function() {
			_setValue();
		}).focus(function() {
			$(this).parent().addClass("focus");
		}).blur(function() {
			$(this).parent().removeClass("focus");
		});

		//出错提示
		this._$msg = $('<div class="c_error"></div>').hide();
		_$ul.before(this._$msg);

		//保存数据
		var _$lis = _$ul.children("li");
		var _setValue = function() {
			var s = _$lis.filter(".selected");
			var ret = {
				questionId : self._qid
			};
			if (s.hasClass("c_other")) {
				//选中其他
				ret.answers = {
					type : "other",
					answerId : s.data("id"),
					value : s.find("input").val()
				};
			} else if (s.length) {
				//选中非其他
				ret.answers = {
					type : "normal",
					answerId : s.data("id")
				};
			} else {
				//选中非其他
				ret.answers = {
					type : "invalid"
				};
			}
			_$itemRoot.data("qstValue", ret);
		};
		_$lis.vclick(function() {
			self.hideMsg();
			_$lis.removeClass("selected");
			$(this).addClass('selected');
			_setValue();
		});

		_setValue();

	};
	sinSelect.prototype = {
		getQstValue : function() {
			var $this = this.$;
			if ($this.hasClass("c_item")) {
				return $this.data("qstValue");
			}
		},
		checkQstValue : function() {
			var value = this.getQstValue();
			if (value == null) {
				this.showMsg("请选择一个答案");
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
	$.qst.sinSelect = sinSelect;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_sinSelect").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.sinSelect({
			$ : $root
		}));
	});

});
