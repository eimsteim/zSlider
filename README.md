# zSlider
Simple slide gallery based on jQuery

简单的滑动切换模组，基于jQ。

zSlider不提供任何的UI，只处理滑动事件，因此你需要预先准备好自己的画廊DOM容器（我称之为contentWrapper），以及装载INDEX角标的容器（dotsWrapper）。然后在调用

demo.html中提供了范例的CSS样式，并将其尽量精简，以避免与你的其他样式发生冲突，你当然也可以直接拿去用这些容器和样式代码。

> 使用说明：

1.引入jQ和zSlider脚本

```html
<script type="text/javascript" src="jquery-1.7.2.js"></script>
<script type="text/javascript" src="jquery.zSlider.js"></script>
```

2.调用slider方法

```javascript
<script type="text/javascript">
    $(function(){
        $('#demo_slider').zSlider({
        	align: 'horizontal',				//可选：vertical - 垂直切换（默认），horizontal - 水平切换
            delay: 3000,                        //切换间隔时间
            dotswrapper: '.dotswrapper'         //INDEX角标容器的标识
        });
    });
</script>
```

3.定义dots样式时需要注意：

* wrapper最好以ID检索
* 必须在wrapper下定义.dots , .dots .dot 和 .dots .dot.active三种样式，分别表示了<ol>的样式，<li>的样式，以及<li>激活时的样式
* 上述2中的3种样式，最好按照如下所示的方式定义在wrapper之下，这样可以保证在同一个页面上多次使用zSlider时，不会出现冲突

4.真实开发场景中，每个页面都会有自己特定的风格，因此zSlider只负责处理滚动事件，而不生成任何UI（例如dots的样式）。
这样带来的一个问题就是：用户需要自己实现内容列表和dots列表的布局，一个基本原则是水平滚动时要将内容列表横排，而垂直滚动时需要将内容列表纵向排列。而且在位置和自适应布局上，也需要自己掌控。一个比较好的方法，是直接采用demo中的布局方式，并进行微调。


> 目前没有实现无限循环，后续会不会实现……有时间，看心情 >__<

附上最终效果图：

![](http://7xo8xv.com1.z0.glb.clouddn.com/2016-06-24_15-11-18.gif)
