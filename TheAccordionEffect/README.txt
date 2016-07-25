1.浮动布局
2.遮罩层
3.透明度
4.动画：通过JavaScript动态改变属性值
5.css3 transition
6.鼠标事件

要改变某个元素的明暗度如何实现？通过设置一个遮罩层的透明度来实现。

宽度=四个列表项宽度+展开列表项宽度

在IE浏览器与标准浏览器下，绑定事件的区别
function bind(el,eventType,callback){
    if(typeof el.addEventListener === 'function'){
    	el.addEventListener(eventType,callback,false);
    }else if(typeof el.attachEvent === 'function'){
        el.attachEvent('on' + eventType,callback);
    }
}




