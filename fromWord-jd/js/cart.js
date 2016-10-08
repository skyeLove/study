/**
 * Created by wcs on 2016/9/1.
 */

window.onload=function(){
    remove();
}

function remove(){
    var  options=document.querySelectorAll('.option');

    //获取模态窗口
    var win=document.querySelector('.cart-win');

    // 获取取消按钮
    var cancle=win.querySelector('.cancle');

    var btnBox=win.querySelector('.win-box');

    var currOpen=null;

    for(var i=0;i<options.length;i++){
        // 获取 垃圾桶这个盒子 pull-right
        var  rebox=options[i].querySelector('.pull-right');
        // 绑定点击事件
        //itcast.tap(rebox,function(){
        ////     给我下面的.up 添加open类
        //    var up=rebox.querySelector('.up');
        //
        //    up.classList.add('open');
        //
        //    console.log(up);
        //})

        rebox.onclick=function(){
            var up=this.querySelector('.up');
            // 添加类名之后
            up.classList.add('open');
            // 记录当前添加类名的 .up 标签
            currOpen=up;
            // 按钮盒子添加动画
            btnBox.classList.add('bounce-down');
            // 弹出模态窗
            win.style.display='block';

        }

    //    当点击取消按钮时， 盒子隐藏，删除类名
        cancle.onclick=function(){
            win.style.display='none';
        //    移出up的样式
            currOpen.classList.remove('open');
            currOpen=null;
            // 按钮盒子删除动画
            btnBox.classList.remove('bounce-down');
        }

    }


}gt