程序需要把每一个步骤及流程都列出来：
1.鼠标在标题栏上按下时，把浮层元素标记为可以拖动。
2.鼠标开始移动，先检测浮层元素标记的是否为可以拖动，如果是则让浮层跟随着鼠标一起移动，不是的话就忽略。
3.鼠标松开，标记元素不可拖动。

分析HTML结构
div.ui-dialog
 div.ui-dialog-title
     div.ui-dialog-closebutton
 div.ui.dialog-content
     div.ui.dialog-input
     div.ui.dialog-submit

在鼠标事件发生的时候，如何获得鼠标的x 坐标位置 在鼠标事件发生的时候，从 Event.pageX 获得

Math.min( x ,y )返回 x,y 中较小的那个

设置a元素的href = "javascript:doSomething();"的作用是当 a元素被点击之后，会执行 doSomething( ) 这个函数












