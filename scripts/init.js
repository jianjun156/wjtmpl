$(function() {
	// $.am.debug.enable = true;

	$("#submit").vclick(function() {
		var msg = "";
		$(".c_item").each(function(i, item) {
			var qstObject = $(this).getQstObject();

			if (qstObject) {

				//查询当前题目的答案，返回值根据各种控件有所不同
				var answer = qstObject.getQstValue();
				msg += "Q" + (i + 1) + ":" + JSON.stringify(answer) + "\n";
				console.log(JSON.stringify(answer, null, " "));

				//检查当前题目是否按照要求作答 返回值true/false
				qstObject.checkQstValue();
			}
		});
		alert(msg);
	});

});
