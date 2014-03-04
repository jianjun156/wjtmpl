(function(window, $) {
	var mutSelect = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;
		var _$ul = _$itemRoot.find(".c_mutSelect");

		//其他选项
		this._qid = _$itemRoot.data("id");
		this._max = _$itemRoot.data("max");
		this._min = _$itemRoot.data("min");

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
			var r = ret.answers = [];
			s.each(function(i, item) {
				var $item = $(item);
				if ($item.hasClass("c_other")) {
					r.push({
						type : "other",
						answerId : $item.data("id"),
						value : $item.find("input").val()
					});
				} else {
					r.push({
						type : "normal",
						answerId : $item.data("id")
					});
				}
			});
			_$itemRoot.data("qstValue", ret);
		};
		_$lis.vclick(function() {
			self.hideMsg();
			$(this).toggleClass('selected');
			_setValue();
		});

		_setValue();

	};
	mutSelect.prototype = {
		getQstValue : function() {
			var $this = this.$;
			if ($this.hasClass("c_item")) {
				return $this.data("qstValue");
			}
		},
		checkQstValue : function() {
			var value = this.getQstValue();
			if (this._max && value.length > this._max) {
				this.showMsg("请不要选择多于" + this._max + "个答案");
				return false;
			}
			if (this._min && value.length < this._min) {
				this.showMsg("请不要选择少于" + this._min + "个答案");
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
	$.qst.mutSelect = mutSelect;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_mutSelect").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.mutSelect({
			$ : $root
		}));
	});

});
