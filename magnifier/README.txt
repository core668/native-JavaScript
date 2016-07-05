解决问题的流程：分析>设计>实现
放大镜的关键原理：鼠标在小图片上移动时，通过捕捉鼠标在小图片上的位置来定位大图片的相应位置。

Photoshop简称PS，是一款非常常用的图片处理软件。

放大镜的移动方向和大图片的移动方向，横向和纵向都是相反，才可以保证同步。

放大镜特效设计：
1.页面元素
2.技术点：事件捕获、定位
3.难点：计算

制作放大镜特效所需要的技术点
onmouseover:会在鼠标指针移动到指定的对象上时发生。
onmouseout：会在鼠标指针移出指定的对象时发生。
onmousemove：会在鼠标指针移动时发生。
offsetLeft:子元素相对于父元素的左位移。
offsetTop：子元素相对于父元素的上位移。
offsetWidth：一个元素的宽度，不包括滚动条。
offsetHeight：一个元素的高度，不包括滚动条。
event.clientX：鼠标相对于整个页面的X轴坐标。
event.clientY：鼠标相对于整个页面的Y轴坐标。

offsetLeft与style.left对比：
1.style.left返回的是字符串，如30px,offsetLeft返回的是数值30;
2.style.left是可读写的，offsetLeft是只读的，所以要改变div的位置，只能修改style.left;
3.style.left的值需要事先定义，否则取到的值为空。

制作放大镜特效所需的计算：
重点：
如何让小图片的放大镜和大图片同步移动

浏览器兼容性测试
测试工具：IETester































