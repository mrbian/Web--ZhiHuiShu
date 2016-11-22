/**
 * @Author bln
 * @CreateDate 2016.11.22
 */
$(function(){
    function play_next(){
        console.info("脚本开始运行");

        var $lists = $("#chapterList>li.clearfix.video");
        var $cur = $("#chapterList>li.clearfix.video>div.progressbar_box");
        var current_play_id = $($cur).parent().attr("id");
        var $cur_li = $("#" + current_play_id);

        var $next_li = $lists.eq($lists.index($cur_li) + 1);

        var cur_left_time = $cur_li.find("span.time.fl").html();
        var hour = cur_left_time.substr(0,2),
            minute = cur_left_time.substr(3,2),
            senconds = cur_left_time.substr(6,2);

        var percentage = $($cur.find("div.progressbar")).attr("style");
        var left_percentage = (1 - percentage.replace(/width|:|;|%/gi,"").trim() * 0.01);
        var left_senconds = (parseInt(hour) * 60 * 60 + parseInt(minute) * 60 + parseInt(senconds)) * left_percentage;

        console.info("本集剩余秒数:",left_senconds);

        setTimeout(function(){
            console.info("开始下一集");
            $next_li.trigger("click");
            setTimeout(function(){   // 加载15秒后进行触发下一集
                play_next();
            },15000);
        },(left_senconds + 30) * 1000);
    }

    setInterval(function(){$('.popboxes_btn>a').trigger("click");},2000);

    play_next();
}());
