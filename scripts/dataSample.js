/*
* 此JS为各控件getQstValue()方法的返回值对象结构
*
* 注意：此代码并不是实际使用控件的代码，仅用来当做文档描述数据结构
*
*/

//单选题（包括下拉框单选题）

ret = {
	"questionId" : "question0002", //问题id
	"answers" : {//答案
		"type" : "other", //答案类型： "normal" | "other" | "invalid"
		"answerId" : "answer0007", //答案项id
		"value" : "ddd"	//答案值：当类型为other时有此值，为用户输入字符串
	}
};

//多选题

ret = {
	"questionId" : "question0003", //问题id
	"answers" : [{
		"type" : "other", //答案类型： "normal" | "other"
		"answerId" : "answer0015", //答案项id
		"value" : "www" //答案值：当类型为other时有此值，为用户输入字符串
	}, {
		"type" : "normal",
		"answerId" : "answer0009"
	}, {
		"type" : "normal",
		"answerId" : "answer0011"
	}, {
		"type" : "other",
		"answerId" : "answer0014",
		"value" : "ddd"
	}]
};

//单行填空  & 多行填空题

ret = {
	"questionId" : "question0004", //问题id
	"answers" : "123" //答案值：为用户输入字符串
};

//打分题（包括多项打分）

ret = {
	"questionId" : "question0009", //问题id
	"answers" : [{//打分项列表
		"type" : "normal", //打分项类型： "normal" | "other"
		"answerId" : "score0002", //打分项id
		"value" : 1 //分数值：当类型为other时有此值，为用户输入字符串
	}, {//打分项2
		"type" : "normal",
		"answerId" : "score0003",
		"value" : 3
	}, {//打分项3
		"type" : "normal",
		"answerId" : "score0004",
		"value" : 4
	}, {
		"type" : "normal",
		"answerId" : "score0005",
		"value" : 5
	}, {
		"type" : "normal",
		"answerId" : "score0006",
		"value" : 6
	}, {//其他项
		"type" : "other",
		"answerId" : "answer0015",
		"value" : ""
	}]
};

//排序题（包括多项打分）

ret = {
	"questionId" : "question0010", //问题id
	"answers" : [{
		"type" : "normal", //打分项类型： "normal" | "other"
		"answerId" : "option0002", //排序项id
		"value" : 1 //当类型为"normal"时，此值为排序项序号，从1开始;  当类型为"other"时，此值为用户输入字符串
	}, {
		"type" : "normal",
		"answerId" : "option0001",
		"value" : 2
	}, {
		"type" : "normal",
		"answerId" : "option0003",
		"value" : 3
	}, {//其他项
		"type" : "other",
		"answerId" : "option0004",
		"value" : ""
	}]
};

