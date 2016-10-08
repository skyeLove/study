/**
 * Created by wcs on 2016/8/30.
 */

window.onload=function(){
    // ��໬��
    categaryLeft();
//    �Ҳ໬��
    categaryRight();
}

// ���� ��� �������
function categaryLeft(){

//    ��ȡԪ��
    var cateLeft=document.querySelector('.categary-left');
//    ul
    var leftUl=cateLeft.querySelector('ul');

//    lis
    var lis=leftUl.querySelectorAll('li');

//     ��� ul ��ǰ��λ��}
    var currentY=0;

//    ul��λ�ٽ�ֵ
    var maxTop=0;
    var minTop=cateLeft.offsetHeight-leftUl.offsetHeight;

    //ul ��ק�������ٽ�ֵ
    var maxswipe=maxTop+150;
    var minswipe=minTop-150;

    // ����λ��
    var setTranslateY=function(y){
        leftUl.style.transform='translateY('+y+'px)';
        leftUl.style.webkitTransform='translateY('+y+'px)';
    }

//    ��ӹ���
    var addTransition=function(){
        leftUl.style.transition='all 0.3s'
        leftUl.style.webkitTransition='all 0.3s'
    }
    //    ɾ������
    var removeTransition=function(){
        leftUl.style.transition='none';
        leftUl.style.webkitTransition='none';
    }
//    ��� ����

    itcast.tap(leftUl,function(e){
    //   ul
    //    ��Ҫ֪���ҵ��������һ��li
    //     e.target ���Ի�ȡ�� �����¼�����С��ǩ
       var target= e.target;
        //console.log(target);
    //     ����Ҫ���� Li Ҳ����a��ǩ�ĸ�Ԫ��
        target=target.parentNode;
        console.log(target);

    //    ��� ����ʵ��  �����Ԫ�� �����ʽ
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
            //�ֶ���li�������ֵ
            lis[i].index=i;
        }
    //    ��ǰ�����active ��ʽ
        target.classList.add('active');
        console.log(target.index);

    //    ��ul�ƶ� ���ƶ��ľ���= -index*50;

        var y=-target.index*50;
        //��֤�����Ƿ�Խ��
        if(y<=minTop){
            y=minTop;
        }
        if(y>=maxTop){
            y=maxTop;
        }

    //    ��ӹ���
        addTransition();
    // ����ul��λ��
        setTranslateY(y);
    //    ��current��ֵ ����ͬ��
        currentY=y;


    })

//    ��������洢����
    var startY=0;
    var moveY=0;
    var distanceY=0;

//    ����������ul����
    leftUl.addEventListener('touchstart',function(e){
        startY= e.changedTouches[0].clientY;
    })
    //
    leftUl.addEventListener('touchmove',function(e){
        moveY= e.changedTouches[0].clientY;
        // ��������
        distanceY=moveY-startY;

        //  ��ul���Ŷ�����


        // �ƶ��ľ���=��ǰ��λ��+����ƶ��ľ���
        var y=currentY+distanceY;
        // ��֤
        if(y>maxswipe){
            y=maxswipe;
         }
        if(y<minswipe){
            y=minswipe;
        }
        //�������Ч��
        removeTransition();
        //ulλ��
        setTranslateY(y);

    })
    // ����������
    //�¼�ð�ݵı���
    window.addEventListener('touchend',function(){

      // ��¼ ul��ǰ��λ��
        currentY=currentY+distanceY;

        if(currentY>maxTop){
            currentY=maxTop;
            // ��ӹ���
            addTransition();
            //�ƶ���ȥ
            setTranslateY(currentY);
        }
        if(currentY<minTop){
            currentY=minTop;
            // ��ӹ���
            addTransition();
            //�ƶ���ȥ
            setTranslateY(currentY);
        }

    //    ��������
        startY=0;
        moveY=0;
        distanceY=0;

    })

}

function categaryRight(){

//    ��ȡԪ��
    var cateRight=document.querySelector('.categary-right');
//    ul
    var rightIn=cateRight.querySelector('.right-in');

//  ��� ul ��ǰ��λ��
    var currentY=0;

//    ul��λ�ٽ�ֵ
    var maxTop=0;
    var minTop=cateRight.offsetHeight-rightIn.offsetHeight;

    //ul ��ק�������ٽ�ֵ
    var maxswipe=maxTop+150;
    var minswipe=minTop-150;

    // ����λ��
    var setTranslateY=function(y){
        rightIn.style.transform='translateY('+y+'px)';
        rightIn.style.webkitTransform='translateY('+y+'px)';
    }

//    ��ӹ���
    var addTransition=function(){
        rightIn.style.transition='all 0.3s'
        rightIn.style.webkitTransition='all 0.3s'
    }
    //    ɾ������
    var removeTransition=function(){
        rightIn.style.transition='none';
        rightIn.style.webkitTransition='none';
    }


//    ��������洢����
    var startY=0;
    var moveY=0;
    var distanceY=0;

//    ����������ul����
    rightIn.addEventListener('touchstart',function(e){
        startY= e.changedTouches[0].clientY;
    })
    //
    rightIn.addEventListener('touchmove',function(e){
        moveY= e.changedTouches[0].clientY;
        // ��������
        distanceY=moveY-startY;

        //  ��ul���Ŷ�����


        // �ƶ��ľ���=��ǰ��λ��+����ƶ��ľ���
        var y=currentY+distanceY;
        // ��֤
        if(y>maxswipe){
            y=maxswipe;
        }
        if(y<minswipe){
            y=minswipe;
        }
        //�������Ч��
        removeTransition();
        //ulλ��
        setTranslateY(y);

    })
    // ����������
    //�¼�ð�ݵı���
    window.addEventListener('touchend',function(){

        // ��¼ ul��ǰ��λ��
        currentY=currentY+distanceY;

        if(currentY>maxTop){
            currentY=maxTop;
            // ��ӹ���
            addTransition();
            //�ƶ���ȥ
            setTranslateY(currentY);
        }
        if(currentY<minTop){
            currentY=minTop;
            // ��ӹ���
            addTransition();
            //�ƶ���ȥ
            setTranslateY(currentY);
        }

        //    ��������
        startY=0;
        moveY=0;
        distanceY=0;

    })

}
