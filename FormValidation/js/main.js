//判断传入的字符串是中文还是英文，长度为多少
function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;//\x00-xff这个区间都是单字节的
}

//不能用相同字符
function findStr(str,n){
	//将字符串中每一个字符与n做比较，相同则tmp加1，如果tmp长度与字符串长度相同，则说明是相同字符
	var tmp = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i)==n) {
			tmp++;
		}
	}
    return tmp;
}

window.onload = function(){
	//元素选取
	var aInput = document.getElementsByTagName('input');
	var oName = aInput[0];
	var pwd = aInput[1];
	var pwd2 = aInput[2];
    var aP = document.getElementsByTagName('p');
    var name_msg = aP[0];
    var pwd_msg = aP[1];
    var pwd2_msg = aP[2];
    var count = document.getElementById('count');
    var aEm = document.getElementsByTagName('em');
    var name_length = 0;
    //当^在正则表达式的最前一个字符时，表示匹配字符串的开头。当^在【】中时，表示“非”，也就是“取反”的意思。
    
    //用户名输入框验证
    //1.数字、字母（不区分大小写）、汉字、下划线
    //2.5-25字符，推荐使用中文会员名
    //a-zA-Z \w表示字符类(包括大小写字母,数字)
    //unicode \u4e00-\u9fa5

    //用户名
    oName.onfocus = function(){
        name_msg.style.display = "block";
        name_msg.innerHTML = '<i class="ati"></i>5-25个字符，一个汉字为两个字符，推荐使用中文会员名。'
    }

    oName.onkeyup = function(){
        count.style.visibility = "visible";
        name_length = getLength(this.value);
        count.innerHTML = name_length + '个字符';
        if (name_length == 0) {
        	count.style.visibility = "hidden";
        }
    }

    oName.onblur = function(){
        //含有非法字符
        var re = /[^\w\u4e00-\u9fa5]/g;
        if (re.test(this.value)) {
        	name_msg.innerHTML = '<i class="err"></i> 含有非法字符！';
        }
        //不能为空
        else if (this.value == "") {
        	name_msg.innerHTML = '<i class="err"></i> 不能为空！';
        }
        //长度超过25个字符
        else if (name_length > 25) {
        	name_msg.innerHTML = '<i class="err"></i> 长度超过25个字符！';
        }
        //长度少于5个字符
        else if (name_length < 5) {
        	name_msg.innerHTML = '<i class="err"></i> 长度少于5个字符！';
        }
        //OK
        else{
        	name_msg.innerHTML = '<i class="ok"></i> OK！';
        }
    }

    //密码
    pwd.onfocus = function(){
    	//显示提示语
    	pwd_msg.style.display = "block";
    	pwd_msg.innerHTML = '<i class="ati"></i>6-16个字符，请使用字母加数字或符号的组合密码，不能单独使用字母、数字或符号。'
    }
    pwd.onkeyup = function(){
    	//密码强度
    	//长度大于5 字符中
    	if (this.value.length>5) {
    		aEm[1].className = "active";
    		pwd2.removeAttribute("disabled");
    		pwd2_msg.style.display = "block";
    	}else{
    		aEm[1].className = "";
    		pwd2.setAttribute("disabled","disabled");
    		pwd2_msg.style.display = "none";
    	}
    	//长度大于10 字符强
    	if (this.value.length>10) {
    		aEm[2].className = "active";
    	}else{
    		aEm[2].className = "";
    	}
    }
    pwd.onblur = function(){
        var m = findStr(pwd.value,pwd.value[0]);
        var re_n = /[^\d]/g;//数字以外的字符
        var re_t = /[^a-zA-Z]/g;//除了字母以外的字符
    	//不能为空
    	if (this.value == "") {
    		pwd_msg.innerHTML = '<i class="err"></i>不能为空';
    	}
    	//不能用相同字符
    	else if (m == this.value.length) {
    		pwd_msg.innerHTML = '<i class="err"></i>不能用相同字符';
    	}
    	//长度应为6-16个字符
    	else if(this.value.length < 6||this.value.length>16){
            pwd_msg.innerHTML = '<i class="err"></i>长度应为6-16个字符';
    	}
    	//不能全为数字
    	else if (!re_n.test(this.value)) {//没有匹配到除了数字以外的字符
    		pwd_msg.innerHTML = '<i class="err"></i>不能全为数字';
    	}
    	//不能全为字母
    	else if (!re_t.test(this.value)) {//没有匹配到除了字母以外的字符
    		pwd_msg.innerHTML = '<i class="err"></i>不能全为字母';
    	}
    	//OK
    	else{
    		pwd_msg.innerHTML = '<i class="ok"></i>OK';
    	}
    }


    //确认密码
    pwd2.onblur = function(){
        if (this.value!=pwd.value) {
        	pwd2_msg.innerHTML = '<i class="err"></i>两次输入的密码不一致！！';
        }else{
        	pwd2_msg.innerHTML = '<i class="ok"></i>OK';
        }
    }
}