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

> 目前没有实现无限循环，后续会不会实现……有时间，看心情 >__<

附上最终效果图：

![](http://7xo8xv.com1.z0.glb.clouddn.com/2016-06-24_15-11-18.gif)
