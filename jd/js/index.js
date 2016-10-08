/**
 * Created by Administrator on 2016/8/29.
 */
window.onload= function () {
    //search框固定
    search();
//    计时器
    downTime();
//    轮播图
    scroll();
}

//search框固定
function search() {
    //获取搜索框
    var searchObj=document.querySelector(".jd-header-in");
//    获取轮播图
    var scrollObj=document.querySelector(".jd-scroll");
//    获取轮播图的高度
    var h=scrollObj.offsetHeight;
    //console.log(h);
//    绑定滚动事件
//    定义透明度为0；
    var opacity=0;
    window.onscroll= function () {
        //    获取滚动掉滑动的高度
        var top=document.body.scrollTop;
        //console.log(top);
        //    判断如果top大于h颜色不变   如果小于h颜色渐变
        if (top<=h) {
            opacity=top/h*0.9;
        }else{
            opacity=0.9;
        }
        //   为search 添加背景透明度
        searchObj.style.background="rgba(201,21,35,"+opacity+")";
    }
}

//计时器
function downTime() {
//    获取计时器
    var timeObj=document.querySelector(".jd-sk-downtime");
//    获取里面的ul  ul下面的li
    var ulObj=timeObj.querySelector("ul");
    var lisObj=ulObj.querySelectorAll("li");
    timeID=null;
//    时间确定为24*60*60
    var time=24*60*60;
//    定义一个计时器
    timeID=setInterval(function () {
        //时间递减
        time--
        //    如果时间小于0停止计时器
        if(time<0) {
            clearInterval(timeID);
        }
        //    获取时分秒
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);
        //console.log(h+m+s);
        //    将时间显示在页面中
        //    小时
        lisObj[0].innerHTML=h>=10?Math.floor(h/10):0;
        lisObj[1].innerHTML=h>=10?Math.floor(h%10):h;
        //    分钟
        lisObj[3].innerHTML=m>=10?Math.floor(m/10):0;
        lisObj[4].innerHTML=m>=10?Math.floor(m%10):m;
        //    秒
        lisObj[6].innerHTML=s>=10?Math.floor(s/10):0;
        lisObj[7].innerHTML=s>=10?Math.floor(s%10):s;
    },1000)
}

//轮播图
//思路： 1、使用定时器自动播放轮播图
//       2、角标同步切换改变背景颜色
//       3、 用户滑动  图片跟随滑动
//       4、在用户滑动结束后 滑动距离大雨临界值  则切换图片  反之不切换；
function scroll() {
//    获取轮播图 下面的ul  ul下面的li和ul下面的ol
    var scrollObj=document.querySelector(".jd-scroll");
    var ulObj=scrollObj.querySelector("ul");
    var olObj=scrollObj.querySelector("ol");
    var olLis=olObj.querySelectorAll("li");
    var w=scrollObj.offsetWidth;

//    设置ul的位置translateX移动的效果  参数说明:current是改变的距离
    var setTranslateX= function (current) {
        ulObj.style.transform="translateX("+current+"px)";
        //兼容webkit内核
        ulObj.style.webkitTransform="translateX("+current+"px)";
    };
    //为ulObj添加过渡效果
    var addTransition= function () {
        ulObj.style.transition="all 0.6s";
        ulObj.style.webkitTransition="all 0.6s";
    };
//    为ulObj取消过渡事件
    var removeTransition= function () {
      //  取消过渡时间值为null就可以；
      ulObj.style.transition="none";
      ulObj.style.webkitTransition="none";
    };
    //    设置角标样式  参数说明：
    var setPoints= function (index) {
        //    排他思想  清除所有ol中li的样式  再给自己设置样式
        //    循环遍历所有的ol中的li
        for(var i=0;i<olLis.length;i++) {
            //classList是指在每个ol中li的类样式名称中只清除其中一个名字为active的类样式
            olLis[i].classList.remove("active");
        }
        //    为当前这个li添加名字为active的类样式  在index.css中设置了active类样式
        olLis[index-1].classList.add("active");
    };

//   定义计时器 改变ul的位置
    var timeID=null;
    var index=1;
    timeID=setInterval(function () {
      index++;
        //改变ulObj的移动距离
        var current=-index*w;
    //    调用setTranslateX()
        setTranslateX(current);
    //    添加过渡效果  调用addTransition
        addTransition();
    },2000);
//   当每次的轮播图过渡结束后  检测轮播图的index是否越界
    zComment.$transitionEnd(ulObj, function () {
        if(index>=9) {
            //在轮播图中为了实现无缝效果  第10张照片（index=9）即是第2张照片（index=1）
            index=1;
        }
        if(index<=0) {
            //第1张照片（index=0）即是第9张照片（index=8）；
            index=8;
        }
    //    因为有过渡效果  所以在无缝跳转时候可以看到跳转  所以需要取消过渡事件
    //    console.log(index)
        removeTransition();
       //改变ulObj的移动距离
        var current=-index*w;
        //    调用setTrans```````````````````````````````````````````lateX()
        setTranslateX(current);
    //    设置角标同步
        setPoints(index);
    })
//    触屏滑动  图片跟着滑动
//    记录滑屏的数据
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var ismove=false;
//    绑定触屏事件
    scrollObj.addEventListener("touchstart", function (e) {
        //    当触屏的时候清除计时器
            clearInterval(timeID);
        //    获取开始的数据
          startX= e.changedTouches[0].clientX;
        }
    )
//    绑定touchmove事件
    scrollObj.addEventListener("touchmove", function (e) {
        ismove=true;
        moveX= e.changedTouches[0].clientX;
    //    获取鼠标移动的距离
        distanceX=moveX-startX;
    //    触屏滑动的时候  ul跟着移动 ul的世纪坐标是当前的坐标加上distanceX
       var current=-index*w+distanceX;
        setTranslateX(current);
    })
//    触屏结束事件
    scrollObj.addEventListener("touchend", function () {
    //    判断滑动距离  如果大于1/3则切换图片  反之不切换
    //    console.log(index);
        if(ismove&&Math.abs(distanceX)>w/3) {
            //console.log(index)
            if(distanceX>0) {
            //   切换到上一张
                index--

            }
            if(distanceX<0) {
            //    切换到下一张
                index++
            }
            var current=-index*w;
            //添加过渡效果
            addTransition();
            //设置ul的位置
            setTranslateX(current);

        }else {
        //    不到1/3不切换   回到原来地方
            var current=-index*w;
            //添加过渡效果
            addTransition();
            //设置ul的位置
            setTranslateX(current);
        }
    //    数据重置
        startX=0;
        moveX=0;
        distanceX=0;
        ismove=false;
    //    开启定时
        timeID=setInterval(function () {
            index++;
            var current=-index*w;
            //添加过渡效果
            addTransition();
            //设置ul的位置
            setTranslateX(current);
        },2000)

    })






}
