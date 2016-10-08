/**
 * Created by wcs on 2016/8/30.
 */

window.onload=function(){
    // 左侧滑动
    categaryLeft();
//    右侧滑动
    categaryRight();
}

// 分类 左侧 点击滑动
function categaryLeft(){

//    获取元素
    var cateLeft=document.querySelector('.categary-left');
//    ul
    var leftUl=cateLeft.querySelector('ul');

//    lis
    var lis=leftUl.querySelectorAll('li');

//     存放 ul 当前的位置}
    var currentY=0;

//    ul定位临界值
    var maxTop=0;
    var minTop=cateLeft.offsetHeight-leftUl.offsetHeight;

    //ul 拖拽滑动的临界值
    var maxswipe=maxTop+150;
    var minswipe=minTop-150;

    // 设置位移
    var setTranslateY=function(y){
        leftUl.style.transform='translateY('+y+'px)';
        leftUl.style.webkitTransform='translateY('+y+'px)';
    }

//    添加过渡
    var addTransition=function(){
        leftUl.style.transition='all 0.3s'
        leftUl.style.webkitTransition='all 0.3s'
    }
    //    删除过渡
    var removeTransition=function(){
        leftUl.style.transition='none';
        leftUl.style.webkitTransition='none';
    }
//    点击 滑动

    itcast.tap(leftUl,function(e){
    //   ul
    //    需要知道我点击的是哪一个li
    //     e.target 可以获取到 触发事件的最小标签
       var target= e.target;
        //console.log(target);
    //     我需要的是 Li 也就是a标签的父元素
        target=target.parentNode;
        console.log(target);

    //    添加 排他实现  被点的元素 添加样式
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
            //手动给li添加索引值
            lis[i].index=i;
        }
    //    当前的添加active 样式
        target.classList.add('active');
        console.log(target.index);

    //    让ul移动 ，移动的距离= -index*50;

        var y=-target.index*50;
        //验证数据是否越界
        if(y<=minTop){
            y=minTop;
        }
        if(y>=maxTop){
            y=maxTop;
        }

    //    添加过渡
        addTransition();
    // 设置ul的位移
        setTranslateY(y);
    //    给current赋值 数据同步
        currentY=y;


    })

//    定义变量存储数据
    var startY=0;
    var moveY=0;
    var distanceY=0;

//    触屏滑动，ul跟随
    leftUl.addEventListener('touchstart',function(e){
        startY= e.changedTouches[0].clientY;
    })
    //
    leftUl.addEventListener('touchmove',function(e){
        moveY= e.changedTouches[0].clientY;
        // 算出距离差
        distanceY=moveY-startY;

        //  让ul跟着动起来


        // 移动的距离=当前的位置+鼠标移动的距离
        var y=currentY+distanceY;
        // 验证
        if(y>maxswipe){
            y=maxswipe;
         }
        if(y<minswipe){
            y=minswipe;
        }
        //清除过渡效果
        removeTransition();
        //ul位移
        setTranslateY(y);

    })
    // 触屏结束后
    //事件冒泡的本质
    window.addEventListener('touchend',function(){

      // 记录 ul当前的位置
        currentY=currentY+distanceY;

        if(currentY>maxTop){
            currentY=maxTop;
            // 添加过渡
            addTransition();
            //移动回去
            setTranslateY(currentY);
        }
        if(currentY<minTop){
            currentY=minTop;
            // 添加过渡
            addTransition();
            //移动回去
            setTranslateY(currentY);
        }

    //    数据重置
        startY=0;
        moveY=0;
        distanceY=0;

    })

}

function categaryRight(){

//    获取元素
    var cateRight=document.querySelector('.categary-right');
//    ul
    var rightIn=cateRight.querySelector('.right-in');

//  存放 ul 当前的位置
    var currentY=0;

//    ul定位临界值
    var maxTop=0;
    var minTop=cateRight.offsetHeight-rightIn.offsetHeight;

    //ul 拖拽滑动的临界值
    var maxswipe=maxTop+150;
    var minswipe=minTop-150;

    // 设置位移
    var setTranslateY=function(y){
        rightIn.style.transform='translateY('+y+'px)';
        rightIn.style.webkitTransform='translateY('+y+'px)';
    }

//    添加过渡
    var addTransition=function(){
        rightIn.style.transition='all 0.3s'
        rightIn.style.webkitTransition='all 0.3s'
    }
    //    删除过渡
    var removeTransition=function(){
        rightIn.style.transition='none';
        rightIn.style.webkitTransition='none';
    }


//    定义变量存储数据
    var startY=0;
    var moveY=0;
    var distanceY=0;

//    触屏滑动，ul跟随
    rightIn.addEventListener('touchstart',function(e){
        startY= e.changedTouches[0].clientY;
    })
    //
    rightIn.addEventListener('touchmove',function(e){
        moveY= e.changedTouches[0].clientY;
        // 算出距离差
        distanceY=moveY-startY;

        //  让ul跟着动起来


        // 移动的距离=当前的位置+鼠标移动的距离
        var y=currentY+distanceY;
        // 验证
        if(y>maxswipe){
            y=maxswipe;
        }
        if(y<minswipe){
            y=minswipe;
        }
        //清除过渡效果
        removeTransition();
        //ul位移
        setTranslateY(y);

    })
    // 触屏结束后
    //事件冒泡的本质
    window.addEventListener('touchend',function(){

        // 记录 ul当前的位置
        currentY=currentY+distanceY;

        if(currentY>maxTop){
            currentY=maxTop;
            // 添加过渡
            addTransition();
            //移动回去
            setTranslateY(currentY);
        }
        if(currentY<minTop){
            currentY=minTop;
            // 添加过渡
            addTransition();
            //移动回去
            setTranslateY(currentY);
        }

        //    数据重置
        startY=0;
        moveY=0;
        distanceY=0;

    })

}
