/**
 * Created by Administrator on 2016/9/2.
 */
window.onload= function () {
//   deleteɾ����
   remove();
}
//  //   deleteɾ����
function remove() {
   var deleteObj=document.querySelectorAll('.delete');
   var reboxObj=document.querySelector('.rebox');
   var cancleObj=document.querySelector('.cancle');
   var okObj=document.querySelector('.ok');
   for(var i= 0;i<deleteObj.length;i++){
      deleteObj[i].addEventListener('click', function ()  {
         var box=this.querySelector('.box');
         //��¼��ǰ�����ȡ����ʽ�ı�ǩ
         current=box;
         console.log(box);
         box.classList.add('open');
         reboxObj.style.display='block'
      })

      cancleObj.addEventListener('click', function () {
         reboxObj.style.display='none';
         current.classList.remove('open');
      })
      okObj.addEventListener('click', function () {
         reboxObj.style.display='none';



      })
   }
}


