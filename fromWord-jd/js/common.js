/**
 * Created by wcs on 2016/8/30.
 */

//   ����һ�� itcast ����
var itcast={};

// itcast �����װ �����Ӱ󶨹����¼������� ����
// ��һ�����Ӱ��¼�����Ҫ��Щ ������
//  1����������   2���¼�  3��  �¼���������Ҫִ�еĴ���
//box.onclick=function(){}
// ����˵���� dom: ���¼��Ķ���  callback: �¼���������Ҫִ�еĴ���
itcast.TransitionEnd=function(dom,callback){
    //     ��dom �� transitionEnd�¼��� �¼������� ִ�� callback
    //null  o  �ٺ�
    // dom ��Ϊ����Ϊһ������

    if(dom&& typeof dom=='object'){
        dom.addEventListener('transitionEnd',function(){
            //��callback ��Ϊ���� ִ�� callback
            /*if(callback){
                callback();
            }*/

            callback&&callback();
        });

        dom.addEventListener('webkitTransitionEnd',function(){
            callback&&callback();
        });
    }
}

// ��һ�����Ӱ��¼�����Ҫ��Щ ������
//  1����������   2���¼�  3��  �¼���������Ҫִ�еĴ���
//������dom ���¼��Ķ���  callback �¼���������Ҫִ�еĴ���
itcast.tap=function(dom,callback){
//    �ж�dom�Ƿ��Ƕ���
    if(dom&&typeof dom=='object'){
        // ���������¼��ʼ������ʱ��
        var startTime=0;
        var endTime=0;
        var isMove=false;
        dom.addEventListener('touchstart',function(){
        //    ��¼������ʼ��ʱ��
            startTime=Date.now();
        })
        // ��¼�Ƿ񴥷� �����ƶ��¼�
        dom.addEventListener('touchmove',function(){
           isMove=true;
        })
        //
        dom.addEventListener('touchend',function(e){
        //    ��¼����ʱ��
            endTime=Date.now();
        //     �ж� �������� ������¼�����
            if(!isMove&&endTime-startTime<150){
            //    ִ�е���Ĵ���
                callback&&callback(e);
            }

        //   ��������
            isMove=false;
        })

    }
}