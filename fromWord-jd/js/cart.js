/**
 * Created by wcs on 2016/9/1.
 */

window.onload=function(){
    remove();
}

function remove(){
    var  options=document.querySelectorAll('.option');

    //��ȡģ̬����
    var win=document.querySelector('.cart-win');

    // ��ȡȡ����ť
    var cancle=win.querySelector('.cancle');

    var btnBox=win.querySelector('.win-box');

    var currOpen=null;

    for(var i=0;i<options.length;i++){
        // ��ȡ ����Ͱ������� pull-right
        var  rebox=options[i].querySelector('.pull-right');
        // �󶨵���¼�
        //itcast.tap(rebox,function(){
        ////     ���������.up ���open��
        //    var up=rebox.querySelector('.up');
        //
        //    up.classList.add('open');
        //
        //    console.log(up);
        //})

        rebox.onclick=function(){
            var up=this.querySelector('.up');
            // �������֮��
            up.classList.add('open');
            // ��¼��ǰ��������� .up ��ǩ
            currOpen=up;
            // ��ť������Ӷ���
            btnBox.classList.add('bounce-down');
            // ����ģ̬��
            win.style.display='block';

        }

    //    �����ȡ����ťʱ�� �������أ�ɾ������
        cancle.onclick=function(){
            win.style.display='none';
        //    �Ƴ�up����ʽ
            currOpen.classList.remove('open');
            currOpen=null;
            // ��ť����ɾ������
            btnBox.classList.remove('bounce-down');
        }

    }


}gt