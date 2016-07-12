/*
区分中英文字符
有两种模式切换用于统计字符串的长度：
“En”英文主计算模式，将每个中文作1个字符；
“Ch”中文主计算模式，将每个中文算作两个字符。
 */

var strLen = (function(){
	var trim = function(chars){
		return (chars||"").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")
	}

	return function(_str,_model){
		_str = trim(_str),
		_model = _model||"Ch";//默认是中文
		var _strLen = _str.length;//获取字符长度
		if (_strLen==0) {//如果字符为0直接返回
			return 0;
		} else {
			//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回存放匹配结果的数组。
			var chinese = _str.match(/[\u4e00-\u9fa5]/g);//匹配中文
			//判断是什么模式
			return _strLen + (chinese && _model == "Ch" ? chinese.length:0);
		}
	};
})();
















