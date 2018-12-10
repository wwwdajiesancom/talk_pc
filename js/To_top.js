$(document).ready(function(){
    $(window).on('scroll',function(e) {
        if($(window).scrollTop() > 600){
            $('.fb_toTop').show();
        }else{
            $('.fb_toTop').hide();
        }
    });

    $('.fb_toTop').click(function(e) {
        $("html,body").stop().animate({'scrollTop':'0'},500);
    });
});