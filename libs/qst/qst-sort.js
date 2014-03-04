(function(window, $) {

	var sort = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;

		this._qid = _$itemRoot.data("id");

		this._$other = _$itemRoot.find(".c_other input").focus(function() {
			$(this).parent().addClass("focus");
		}).blur(function() {
			$(this).parent().removeClass("focus");
		});

		var _$ul = this._$ul = _$itemRoot.find(".c_sort");
		var _$lis = _$ul.find(".li");
		var _$liBars = _$lis.find(".c_dragable");
		var _startPosition = null;
		var _$targetLi = null;
		var _first = null;
		var _index = null;
		var _length = _$lis.length;

		var _positions = [];
		//标记初始位置

		_$lis.each(function(i, item) {
			$(this).data("qstOrder", i);
		});

		var refreshPos = function() {
			_positions = [];
			_$lis.each(function() {
				_positions.push($(this).offset().top);
			});
			//console.log(_positions);
		};

		var setTargetPosition = function(dy) {
			var cy = _positions[_first] + dy;
			var index = _length - 1;

			for (var i = 0; i < _positions.length - 1; i++) {
				if (_positions[i + 1] > cy) {
					index = i;
					break;
				}
			};
			//console.log(_index, index);
			if (index != _index) {
				var $body = _$lis.eq(_index);
				var $target = _$lis.eq(index);
				var $p = $body.parent();
				$target.after($body);
				$p.append($target);

				//_startPosition = _positions[index];
				_index = index;
				_$lis = _$ul.find(".li:not(.clone)");

				_setValue();

			}

			//_$lis.removeClass("placeholder").eq(index).addClass("placeholder");
			if (window.useTopLeft == true) {
				_$targetLi.css({
					top : dy
				});
			} else {
				var opt = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + dy + ', 0, 1)';
				_$targetLi.css({
					transform : opt,
					webkitTransform : opt
				});
			}
		};

		_$liBars.addClass("am-touchable").bind({
			"vtouchstart" : function(e, p) {
				refreshPos();

				var _$li = $(this).parents(".li");
				_first = _index = _$lis.index(_$li);

				_$targetLi = _$li.clone(false);
				//console.log(_$targetLi)
				_$targetLi.css({
					"position" : "absolute",
					"top" : 0,
					"z-index" : 1
				}).addClass("clone");
				_$targetLi.find(".item").addClass("active");
				setTargetPosition(0);
				_startPosition = p.y;

				_$li.before(_$targetLi);
				_$li.addClass("placeholder");

				//console.log("vtouchstart", p, _index);
			},
			"vtouchmove" : function(e, p) {
				setTargetPosition(p.y - _startPosition);
				// console.log("vtouchmove", p);
			},
			"vtouchend" : function(e, p) {
				_$targetLi.remove();
				_$targetLi = null;
				_$lis.removeClass("placeholder");
			},
			"touchmove" : function(e, p) {
				e.preventDefault();
			}
		});

		//保存数据
		var _setValue = function() {
			var ret = {
				questionId : self._qid
			};
			var r = ret.answers = [];
			_$lis.each(function(i, item) {
				r.push({
					type : "normal",
					answerId : $(this).data("id"),
					value : i
				});
			});

			if (self._$other.length) {

				self._$other.each(function() {
					r.push({
						type : "other",
						answerId : $(this).parent().parent().data("id"),
						value : $(this).val()
					});
				});
			}

			_$itemRoot.data("qstValue", ret);
		};
		_setValue();

	};
	sort.prototype = {
		getQstValue : function() {
			var $this = this.$;
			if ($this.hasClass("c_item")) {
				return $this.data("qstValue");
			}
		},
		checkQstValue : function() {
			return true;
		},
		hideMsg : function() {
			this._$msg.hide();
		},

		showMsg : function(tip) {
			this._$msg.html(tip).show();
		}
	};
	$.qst.sort = sort;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item .c_sort").each(function(i, item) {
		var $root = $(this).parent();
		$root.data("qstObject", new $.qst.sort({
			$ : $root
		}));
	});

	if ($.browser.msie && $.browser.version < 10) {
		window.useTopLeft = true;
	}

});
