window.onload = function(){
	var list = document.getElementById('list');
	var boxs = list.children;
	var timer;//存放定时器
	
	//删除节点
	function removeNode(node){
		node.parentNode.removeChild(node);
	}

	//赞分享
	function praiseBox(box,el){
        var praiseElement = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praiseElement.getAttribute('total'));
        var txt = el.innerHTML; 
        var newTotal;
        if(txt == '赞'){
        	newTotal = oldTotal + 1;
        	praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
        	el.innerHTML = '取消赞';
        } else {
        	newTotal = oldTotal - 1;
        	praiseElement.innerHTML = (newTotal == 0) ? '': newTotal + '个人觉得很赞';
        	el.innerHTML = '赞';
        }
        praiseElement.setAttribute('total',newTotal);
        praiseElement.style.display = (newTotal == 0) ? 'none' : 'block';
	}

    /*评论分享
    输入框内容
    使用innerHTML添加到回复列表中
    */
    function replayBox(box){//需要回复哪一条分享
         var textarea = box.getElementsByTagName('textarea')[0];//获取输入框
         var list = box.getElementsByClassName('comment-list')[0];//获取评论列表
         var listDiv = document.createElement('div');
         listDiv.className = 'comment-box clearfix';
         listDiv.setAttribute('user','self');
         var html = '<img class="myhead" src="images/my.jpg" alt=""/>'+
                    '<div class="comment-content">'+
                        '<p class="comment-text"><span class="user">我：</span>'+ textarea.value +'</p>'+
                        '<p class="comment-time">'+
                            getTime() +
                            '<a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>'+
                            '<a href="javascript:;" class="comment-operate">删除</a>'+
                        '</p>'+
                    '</div>';
        listDiv.innerHTML = html;
        list.appendChild(listDiv);
        textarea.value = '';
        textarea.onblur();
    }
     
    //格式2014-02-19 14:36
    function getTime(){
        var t = new Date();
        var y = t.getFullYear();
        var m = t.getMonth();
        var d = t.getDate();
        var h = t.getHours();
        var mi = t.getMinutes();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        mi = mi < 10 ? '0' + mi : mi;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }
    
    //赞回复
    function praiseReply(el){
        var oldTotal = parseInt(el.getAttribute('total'));
        var my = parseInt(el.getAttribute('my'));
        var newTotal;
        if(my == 0){
        	newTotal = oldTotal + 1;
        	el.setAttribute('total',newTotal);
        	el.setAttribute('my',1);
        	el.innerHTML = newTotal + ' 取消赞';
        }else{
        	newTotal = oldTotal - 1;
        	el.setAttribute('total',newTotal);
        	el.setAttribute('my',0);
        	el.innerHTML = (newTotal==0) ? '赞' : newTotal + ' 赞';
        }
        el.style.display = (newTotal==0) ? '' : 'inline-block';
    }

    //自己的评论可以删除
    //别人的评论不可删除，可回复
    //操作回复
    function operateReply(el){
        var commentBox = el.parentNode.parentNode.parentNode;//评论容器
        var box = commentBox.parentNode.parentNode.parentNode;//分享容器
        var textarea = box.getElementsByTagName('textarea')[0];
        var user = commentBox.getElementsByClassName('user')[0];
        var txt = el.innerHTML;
        if(txt == '回复'){
        	textarea.onfocus();
        	textarea.value = '回复' + user.innerHTML;
        	textarea.onkeyup();
        }else{
        	removeNode(commentBox);
        }
    }

	for(var i = 0;i < boxs.length;i++){
		boxs[i].onclick = function(e){
			e = e || window.event;//事件对象
			var el = e.srcElement;//存放触发元素
			switch(el.className){
				case 'close':
					removeNode(el.parentNode);
					break;
				//赞分享
				case 'praise':
				    praiseBox(el.parentNode.parentNode.parentNode,el);
				    break;

				//回复按钮灰色
				case 'btn btn-off':
				    clearTimeout(timer);
				    break;

				//回复按钮蓝色
				case 'btn':
				    replayBox(el.parentNode.parentNode.parentNode);
				    break;

				//赞回复
				case 'comment-praise':
				    praiseReply(el);
				    break;
                
                //操作回复
                case 'comment-operate':
                    operateReply(el);
                    break;

			}
		}

		/*输入框
	    1.获取焦点时，onfocus
	    2.失去焦点时，onblur
	    3.鼠标输入弹起来的时候，onkeyup
		*/
	    var textarea = boxs[i].getElementsByTagName('textarea')[0];//获取输入框
	    //添加事件1，获取焦点时，onfocus
	    textarea.onfocus = function(){
	    	this.parentNode.className = 'text-box text-box-on';//给父元素添加类名
	        this.value = this.value == '评论…' ? '' : this.value; //清空内容
	        this.onkeyup();//获取焦点时判断
	    }
	    //添加事件2,失去焦点时，onblur
	    textarea.onblur = function(){
	    	var me = this;
	    	if(this.value == ''){//把定时器加到timer上,在300毫秒以后把输入框缩小，否则如果有人清除掉了就不缩小
	    		timer = setTimeout(function(){
                    me.parentNode.className = 'text-box';
	    		    me.value = '评论…';
	    		},400)
	    	}
	    }
	    //添加事件3，键盘输入弹起来的时候，onkeyup
	    //当输入框获得焦点或者没有内容时回复按钮是灰色不可用
	    textarea.onkeyup = function(){
	    	var len = this.value.length;
	    	var p = this.parentNode;
	    	var btn = p.children[1];
	    	var word = p.children[2];
	    	if(len == 0 || len > 140){
	    		btn.className = 'btn btn-off';
	    	}else{
	    		btn.className = 'btn';
	    	}
	    	word.innerHTML = len + '/140';
	    }

	    

	}
}