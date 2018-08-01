<script src="../jQ/jquery-1.12.4.min.js"></script>>
    <script>
var oNext = document.getElementById('next');
var navFullover = document.getElementById('nav-fullcover');
var nav = document.getElementById('nav');
var oPrev = document.getElementById('prev');

oNext.onclick = function () {
    nav.style.visibility = 'hidden';
    navFullover.style.visibility = 'visible';
    navFullover.style.opacity = '1';
    nav.style.opacity = '0';
}
oPrev.onclick = function () {
    nav.style.visibility = 'visible';
    navFullover.style.visibility = 'hidden';
    console.log('456');
    nav.style.opacity = '1';
    navFullover.style.opacity = '0';

}

//轮播图
// var clientW = document.body.clientWidth;
// $('.slide').css('width', function(){
//     return 4 * clientW;
// });
// window.onresize = function(){
//     clientW = document.body.clientWidth;
//     $('.slide img').css({
//         width: clientW
//     });
//     $('.slide').css('width', function(){
//         return 4 * clientW;
//     });
// };
//
//
// var nowIndex = 1;
// var speed = 1500;
// var play = function(){
//     if(nowIndex == 4){
//         nowIndex = 1;
//         $('.slide').css({
//             transition: 'none',
//             transform: 'translateX(0px)'
//         });
//         speed = 0;
//     }else{
//         $('.slide').css({
//             transition: 'transform .8s ease',
//             transform: 'translateX(-'+ clientW * (nowIndex++) +'px)'
//         });
//         speed = 1500;
//     }
//     clearTimeout(timer);
//     timer = setTimeout(play, speed);
// };
// var timer = setTimeout(play, speed);

