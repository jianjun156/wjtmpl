(function(window, $) {

	var score = function(e) {
		var self = this;
		$.extend(this, e);

		var _$itemRoot = this.$;

		var $uls = this._$uls = _$itemRoot.children("ul");

		this._qid = _$itemRoot.data("id");

		this._$other = _$itemRoot.find(".c_other input").focus(function() {
			$(this).parent().addClass("focus");
		}).blur(function() {
			$(this).parent().removeClass("focus");
		});

		//出错提示
		this._$msg = $('<div class="c_error"></div>').hide();
		this.$.find(".c_title:first").after(this._$msg);

		$uls.each(function(i, item) {

			var $ul = $(item);

			//console.log($ul);
			var min = $ul.data("min");
			var step = $ul.data("step");
			var num = $ul.data("num");

			//绘制分数选项
			$ul.empty();
			var w = $ul.width();
			var fw = Math.floor(w / num) - 1;
			var lw = w - (fw + 1) * (num - 1) - 1;
			console.log(w + " " + fw + " " + lw);
			for (var i = 0; i < num; i++) {
				var width = i == num - 1 ? lw : fw;
				// console.log(width, i);
				var $li = $("<li style='width: " + width + "px'>" + (min + i * step) + "</li>");
				$ul.append($li);
			};

			var $lis = $ul.children("li");
			var colors = new ColorGrads({
				StartColor : "#fff",
				EndColor : "#fff",
				Step : $lis.length
			}).Create();
			var sColors = new ColorGrads({
				StartColor : "#e7f6fc",
				EndColor : "#009fdb",
				Step : $lis.length
			}).Create();
			$lis.each(function(i, item) {
				$(this).css("background-color", "rgb(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ")");
			});
			var positions = [];
			var curr = null;

			var refreshPos = function() {
				positions = [];
				$lis.each(function() {
					positions.push($(this).offset().left);
				});
				console.log(positions);
			};

			var runStep = function(p) {
				var index = $lis.length;
				$(positions).each(function(i, item) {
					if (item > p.x) {
						index = i;
						return false;
					}
				});
				$lis.removeClass('selected').each(function(i, item) {
					$(this).css("background-color", "rgb(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ")");
				}).filter(":lt(" + index + ")").addClass('selected').each(function(i, item) {
					$(this).css("background-color", "rgb(" + sColors[i][0] + "," + sColors[i][1] + "," + sColors[i][2] + ")");
				});
				if (curr != index) {
					curr = index;
					self.hideMsg();
					_setValue();
				}
			};

			$ul.addClass("am-touchable").bind({
				"vtouchstart" : function(e, p) {
					refreshPos();
					runStep(p);
				},
				"touchmove" : function(e, p) {
					//e.preventDefault();
				},
				"vtouchmove" : function(e, p) {
					runStep(p);
					return false;
				},
				"vtouchend" : function(e, p) {
					console.log("vtouchend", p.x, p.y);
				}
			});

			//保存数据
			var _setValue = function() {
				if (curr) {
					var score = min + (curr - 1) * step;
				} else {
					var score = null;
				}
				$ul.data("qstValue", score);
				//console.log("score", score);
			};
			_setValue();
		});

	};
	score.prototype = {
		getQstValue : function() {
			var $this = this.$;
			if ($this.hasClass("c_item")) {

				var ret = {
					questionId : this._qid
				};
				var r = ret.answers = [];

				this._$uls.each(function() {
					r.push({
						type : "normal",
						answerId : $(this).data("id"),
						value : $(this).data("qstValue")
					});
				});

				if (this._$other.length) {

					this._$other.each(function() {
						r.push({
							type : "other",
							answerId : $(this).parent().parent().data("id"),
							value : $(this).val()
						});
					});
				}

				return ret;
			}
		},
		checkQstValue : function() {
			var value = this.getQstValue();

			if (value == null) {
				this.showMsg("请打分");
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
	$.qst.score = score;

})(window, jQuery);

$(function() {
	//init SinSelect
	$(".c_item.c_score").each(function(i, item) {
		var $root = $(this);
		$root.data("qstObject", new $.qst.score({
			$ : $root
		}));
	});

});
