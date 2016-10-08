/**
 * Created by Administrator on 2016/8/30.
 */

//定义一个zComment对象
var zComment={};

//1@在zComment 里面封装绑定过渡时间结束的事件
// 绑定的条件是：
// 1、操作对象  2、事件  3、事件触发后需要执行的代码
//参数说明：
// dom：绑定的事件对象
// callback: 事件触发后需要执行的代码
zComment.$transitionEnd=function(dom,callback) {
//    给dom绑定transitionEnd事件  事件触发后执行callback
//    判断dom部位空且为一个对象
    if(dom&& typeof dom=="object"){
    //    为dom添加过渡时间结束事件
        dom.addEventListener("transitionEnd", function () {
        //    当callback部位空的时候执行callback();
        //    下面这个是如果callback为空将会短路 不执行后面的代码
        //    当callback不为空的时候执行callback();
            callback&&callback();
        })
        //兼容webkit内核
        dom.addEventListener("webkitTransitionEnd", function () {
            callback&&callback();
        })
    }
}

//2@在zComment 里面封装tap事件
//在移动端中只有touch事件  移动端点击事件叫tap事件
// 绑定的条件是：
// 1、操作对象  2、事件  3、事件触发后需要执行的代码
//参数说明：
// dom：绑定的事件对象
// callback: 事件触发后需要执行的代码
zComment.$tap= function (dom,callback) {
//    判断dom是否为空是否为对象
    if(dom&&typeof dom=="object") {
    //    定义变量记录的起始和结束时间 为后面时间差做铺垫
        var starTime=0;
        var endTime=0;
        var isMove=flase;
    //    为dom绑定touchstart事件
        dom.addEventListener("touchstart", function () {
        //  记录开始触屏的时间
            starTime=Date.now();
        })
    //    为dom绑定touchmove事件
        dom.addEventListener("touchmove", function () {
        //    如果移动将会执行  ismove为true
            isMove=true;
        })
    //    为dom绑定touchend事件
        dom.addEventListener("touchend", function () {
        //    记录结束时间
            endTime=Date.now();
            console.log(isMove);
        //    判断满足条件的时候将当做点击事件处理
            if(!isMove&&endTime-starTime<150) {
            //    执行的代码
                callback&&callback();
            }

            starTime=0;
            endTime=0;
            isMove=flase;
        })
    }
}