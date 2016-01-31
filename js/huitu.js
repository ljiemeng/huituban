window.onload=function(){
    var box = $('.box');
    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj =canvas[0].getContext("2d");
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    $(".f div").mousedown(function(e){
        e.stopPropagation()
        $(this).parent().find(".s-menu").finish();
        $(this).parent().find(".s-menu").toggle(200);
    })
    document.onmousedown=function(e){
        e.preventDefault()
        e.stopPropagation();
        ;
    }
    var obj=new shape(copy[0],canvas[0],cobj,$(".selected"))
    obj.draw();
    //$(".s-menu li").click(function(){
    //    if($(this).attr("data-role")!=="pen"){
    //        obj.shapes=$(this).attr("data-role");
    //        obj.draw();
    //    }else{
    //        obj.pen();
    //    }
    //})
    $(".f:eq(1)").find(".s-menu li").click(function(){
        obj.shapes = $(this).attr("data-role");
        //obj.type=$(this).attr("data-role");
        obj.draw();
    })
    $(".f:eq(2)").find(".s-menu li").click(function(){
        //obj.shapes = $(this).attr("data-role");
        obj.type=$(this).attr("data-role");
        //obj.draw();
    })
    $(".f:eq(5)").find(".s-menu li").click(function(){
        //obj.shapes = $(this).attr("data-role");
        obj.lineWidth=$(this).attr("linewidth");
        //obj.draw();
    })
    $(".f:eq(0)").find(".s-menu li").click(function(){
       var  index=$(this).index(".s-menu li");
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octect"))
                }
            }
            obj.history=[];
        }else if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("不能后退");
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        }else if(index==2){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octect"))
        }
    })
    $(".borderColor input").change(function(e){
        obj.borderColor=e.currentTarget.value;
        obj.draw();
    })
    $(".fillColor input").change(function(e){
        obj.bgcolor=e.currentTarget.value;
        obj.draw();
    })
    var xpobj=$(".eraser");
    $(".eraser-size").find(".s-menu li").click(function(){
        //obj.shapes = $(this).attr("data-role");
        //obj.draw();
        var xpw = $(this).attr("data-role");
        xpobj.css({
            width:xpw,
            height:xpw
        });
        obj.xp(xpobj,xpw);
    })
    //var selectedobj=$(".selcetedArea");
    $(".select").click(function(){
        obj.select($(".selected"));
        //selectedobj.css({
        //    display:"block"
        //})
    })
    //$(".f li").click(function(){
    //    if(obj.temp){
    //        obj.history.push(that.cobj.getImageData(0,0,canvas[0].width,canvas[0].height));
    //        obj.temp=null;
    //    }
    //    $(".selectarea").css({
    //        display:"none"
    //    })
    //})
    $(".hbbj").find("li").click(function(){
        var bjtp=$(this).attr("data-role");
        $("canvas").css({
            background:"url(images/"+bjtp+") no-repeat center",
            backgroundSize:"cover"
        })
    //alert(bjtp)
    })

}