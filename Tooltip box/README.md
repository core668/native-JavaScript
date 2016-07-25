### 解决问题的流程
分析(原理) > 设计(技术) > 实现(编码)

### 特效分析
- 词汇约定：
ToolTip提示框：浮动的提示框，用来显示相关信息
ToolTip超链接：指一些文字或图片元素，当鼠标浮在它上面时，ToolTip提示框显示
- 四个关键点
显示：鼠标移上ToolTip超链接时,ToolTip提示框显示
隐藏：鼠标移出ToolTip超链接时,ToolTip提示框隐藏
定位：ToolTip提示框要定位在ToolTip超链接之下
可配置：ToolTip提示框需要可以配置，因为ToolTip提示框的提示文字和内容是不确定的，需要去配置大小及提示内容

### 特效设计
- 技术点
1、绝对定位：position:absolute
2、js创建dom：createElement与appendChild
3、鼠标事件：mouseenter和mouseleave
             setTimeout和clearTimeout
- 核心代码：
```javascript
<a class="tooltip">中国</a>
```
- 鼠标移入时：
```javascript
<a class="tooltip">中国<div class="tooltip-box">中华人民共和国</div></a>
```
### 特效所需掌握的技术点
- createElement:创建元素节点，并返回创建的Element对象
- appendChild:把元素节点追加到已有的元素上
- createElement一般与appendChild联合使用
- mouseenter:当鼠标指针进入一个元素的边界区域时，会触发mouseenter事件
- mouseleave:当鼠标指针从一个元素的边界区域离开时，会触发mouseleave事件
- 注意区别mouseenter和mouseover，mouseleave和mouseout
无论鼠标指针穿过被选元素或其子元素，都会触发mouseover事件。
只有在鼠标指针穿过被选元素时，才会触发mouseenter事件。
- setTimeout:在指定的毫秒数后调用函数或计算表达式。注意setTimeout只执行一次
- clear 




