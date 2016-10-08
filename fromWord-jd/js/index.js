/**
 * Created by wcs on 2016/8/29.
 */

window.onload=function(){
    // 搜索框
    search();
//     倒计时
    downTime();
//    轮播图
    banner();




}

// 搜索框变色
function search(){
    // 获取需要的标签
    var search=document.querySelector('.header-in');

    var bannerBox=document.querySelector('.jd-banner');

//    获取banner的高度
    var h=bannerBox.offsetHeight;
    //console.log(h);

//     当屏幕滚动的时候 ， 头部变色
//     滚动区间是 banner高度 范围   --》渐变
//     如果高度大于 h ,颜色固定了

    var opacity=0;

//     绑定滚动事件
    window.onscroll=function(){
        //    获取页面超浏览器高度
        var top=document.body.scrollTop;
        //     判断滚动的区间,
        if(top<=h){
            //   透明度 渐变
            opacity=top/h*0.85;
        }else{
            //颜色不变量了
            opacity=0.85;
        }

        //将我们得到的透明度设置给 header-in
        search.style.background='rgba(201,21,35,'+opacity+') ';

    }

}

//倒计时模块
function downTime(){
    //获取需要用到的元素
    var timeBox=document.querySelector('.downtime');

    var spans=timeBox.querySelectorAll('span');

    // 存放定时器
    var timer=null;

    //console.log(spans.length);
    //    实现倒计时
    var time=5*60*60;

//    使用定时器实现倒计时
    timer=setInterval(function(){
        //递减
        time--;
        // 数据检测
        // 如果小于0 ，停止定时器
        if(time<0){
            clearInterval(timer);
        }

        //  分别获取时分秒

        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        //console.log(h);
        //console.log(m);
        //console.log(s);

        //     将时间显示到页面中

        //    小时
        //    十位
        spans[0].innerHTML=h>=10?Math.floor(h/10):0;
        //    各位
        spans[1].innerHTML=h>=10?Math.floor(h%10):h;

        //分钟
        //    十位
        spans[3].innerHTML=m>=10?Math.floor(m/10):0;
        //    各位
        spans[4].innerHTML=m>=10?Math.floor(m%10):m;

        //秒
        //    十位s
        spans[6].innerHTML=s>=10?Math.floor(s/10):0;
        //    各位
        spans[7].innerHTML=s>=10?Math.floor(s%10):s;


    },1000);



}


//轮播图模块

//定时器 自动播放轮播图
// 角标 同步切换
//用户可以 滑动，图片跟随滑动
// 当用户滑动结束时 判断滑动距离，
// 大于临界值 则切换图片，
//小于临界值 则吸附回去

function banner(){
//    获取需要用到的元素

    var bannerBox=document.querySelector('.jd-banner');
    // 获取屏幕的宽度
    var w=bannerBox.offsetWidth;
    // ul
    var imgBox=bannerBox.querySelector('ul');
    // ol
    var pointBox=bannerBox.querySelector('ol');
    //ol>li
    var points=pointBox.querySelectorAll('li');
    //console.log(w);
    //console.log(points.length);

    var timer=null;
    // 记录轮图片的序号
    var index=1;

    //改变ul的位置
    var setTranslateX=function(currX){
        imgBox.style.transform='translateX('+currX+'px)';
        imgBox.style.webkitTransform='translateX('+currX+'px)';//兼容
    }
    //添加过渡
    var addTransition=function(){
        imgBox.style.transition='all 0.4s';
        imgBox.style.webkitTransition='all 0.4s';//兼容
    }

//    删除过渡
    var removeTranstion=function(){
        imgBox.style.transition='none';
        imgBox.style.webkitTransition='none';
    }


//    定时定时轮播

    timer=setInterval(function(){
        index++;
        // 添加过渡效果
        addTransition();
        //改变ul的位置
        var currX=-index*w;
        setTranslateX(currX);

    },1000);

//     当每次过渡结束后， 检测轮播图index 是否越界
    itcast.TransitionEnd(imgBox,function(){
        console.log(index);
        // 数据检测
        if(index>=9){
            index=1;
            // 轮播图 瞬间跳转第一张
        }
        if(index<=0){
            index=8;
        }
        // 删除过渡效果
        removeTranstion();
        //  跳转
        //改变ul的位置
        var currX=-index*w;
        setTranslateX(currX);

        //    角标同步
        setPoints(index);
    })

//    设置角标样式
    var setPoints=function(index){
        //    排他 ： 想干掉所有人，在 突出自己
        for(var i=0;i<points.length;i++){
            //points[i].className='';
            // " btn-defalut more" ""
            // jquey 写法 $('.box').removeClass('ative');
            //清除所有li的active的样式
            points[i].classList.remove('active');
        }
        points[index-1].classList.add('active');
    }
    // 触屏滑动 ，图片跟随滑动

    // 记录滑屏数据
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var ismove=false;

    //绑定触屏事件
    bannerBox.addEventListener('touchstart',function(e){
        // 清除定时器
        clearInterval(timer);
        startX= e.changedTouches[0].clientX;
    })

    // 绑定touchmove事件
    bannerBox.addEventListener('touchmove',function(e){
        ismove=true;
        moveX= e.changedTouches[0].clientX;
        // 获取鼠标移动的距离
        distanceX=moveX-startX;

        //   触屏滑动，ul跟随 ul的实际坐标 x= 默认x+ distan
        var currX=-index*w+distanceX;
        //实时改变 ul的坐标
        setTranslateX(currX);

    })

//   触屏结束事件
    bannerBox.addEventListener('touchend',function(){
        //判断滑动距离
        //     如果大于1/3 则切换图片
        //    否则 吸附回去
        if(ismove&&Math.abs(distanceX)>w/3){
            //console.log('切换图片');
            if(distanceX>0){
            //    上一张
                index--;
            }
            if(distanceX<0){
            //    下一张
                index++;
            }
            var  currX=-index*w;
            //添加过渡效果
            addTransition();
            //设置ul的位置
            setTranslateX(currX);

        }else{
        //   吸附回去
            //    在回来原来地方
            var  currX=-index*w;
            //添加过渡效果
            addTransition();
            //设置ul的位置
            setTranslateX(currX);
        }

    //    数据重置
         startX=0;
         moveX=0;
         distanceX=0;
         ismove=false;

    //    开启定时
        //定时定时轮播
        timer=setInterval(function(){
            index++;
            // 添加过渡效果
            addTransition();
            //改变ul的位置
            var currX=-index*w;
            setTranslateX(currX);
        },3000);
    })


}







