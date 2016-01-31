function shape(canvas,canvas1,cobj,selectobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.width = canvas1.width;
    this.height = canvas1.height;
    this.selectobj=selectobj;
    this.cobj=cobj;
    this.bgcolor="#000";
    this.borderColor="#000";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";
    this.history=[];
    this.selectFlag=true;

}
shape.prototype={
    //初始化属性
    init:function(){
        this.cobj.fillStyle=this.bgcolor;
        this.cobj.strokeStyle=this.borderColor;
        this.cobj.lineWidth=this.lineWidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
        that.cobj.closePath();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    arc:function(x,y,x1,y1){
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        that.init();
        that.cobj.beginPath();
        that.cobj.arc(x,y,r,0,Math.PI*2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    five:function(x,y,x1,y1){
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(x+r,y);
        var bian=18;
        var deg=360/bian;
        for(var i=1;i<=bian;i++){
            if(i%2==0){
                that.cobj.lineTo(x+Math.cos(i*deg*Math.PI/180)*r,y+Math.sin(i*deg*Math.PI/180)*r);
            }else{
                that.cobj.lineTo(x+Math.cos(i*deg*Math.PI/180)*r1,y+Math.sin(i*deg*Math.PI/180)*r1);
            }
            //that.cobj.stroke();
        }
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.canvas1.width,that.canvas1.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                that[that.shapes](startx,starty,endx,endy);
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height))
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },

    pen:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty)

            that.canvas.onmousemove=function(e){

                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.lineTo(endx,endy)
                that.cobj.stroke();
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height))
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    xp:function(xpobj,xpw){
        var that = this;
        var w = xpobj.width();
        var h = xpobj.height();
        that.canvas.onmousemove = function(e){
            var lefts = e.offsetX - w/2;
            var tops = e.offsetY - h/2;
            xpobj.css({
                left:lefts,
                top:tops,
                display:'block'
            });
        };
        that.canvas.onmousedown = function(e){
            that.canvas.onmousemove = function(e){
                var lefts = e.offsetX - w/2;
                var tops = e.offsetY - w/2;
                xpobj.css({
                    left:lefts,
                    top:tops,
                    display:"block"
                });
                that.cobj.clearRect(lefts,tops,w,h);
            };
            that.canvas.onmouseup=function(){
                xpobj.css({
                    display:"none"
                });
                //console.log(that.width,that.height)
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
                that.xp(xpobj,w,h)
            };
        };

    },
    //select:function(selectedobj){
    //    var that=this;
    //    that.canvas.onmousedown=function(e){
    //        var startx= e.offsetX;
    //        var starty= e.offsetY,minx,miny, w,h;
    //        that.canvas.onmousemove=function(e){
    //            var endx= e.offsetX;
    //            var endy= e.offsetY;
    //            minx=startx>endx?endx:startx;
    //            miny=starty>endy?endy:starty;
    //            w=Math.abs(startx-endx);
    //            h=Math.abs(starty-endy);
    //            selectedobj.css({
    //                display:"block",
    //                left:minx,
    //                top:miny,
    //                width:w,
    //                height:h
    //            })
    //        }
    //        that.canvas.onmouseup=function(){
    //            that.canvas.onmousemove=null;
    //            that.canvas.onmouseup=null;
    //            that.temp=that.cobj.getImageData(minx,miny,w,h);
    //            that.cobj.clearRect(minx,miny,w,h);
    //            that.history.push(that.temp);
    //            that.cobj.putImageData(that.temp,w,h);
    //            that.drag(startx,starty,w,h,selectedobj);
    //        }
    //    }
    //},
    //drag:function(x,y,w,h,selectedobj){
    //    var that=this;
    //    that.canvas.onmousedown=function(e){
    //        var ox= e.offsetX;
    //        var oy= e.offsetY;
    //        var cx=ox-x;
    //        var cy=oy-y;
    //        if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
    //            that.canvas.style.cursor="move";
    //        }else{
    //            that.canvas.style.cursor="default";
    //            return;
    //        }
    //        that.canvas.onmousemove=function(e){
    //            that.canvas.style.cursor="move";
    //            that.cobj.clearRect(0,0,that.cobj.width,that.cobj.height);
    //            if(that.history.length!=0){
    //                that.cobj.putImageData(that.history[that.history.length-1],0,0);
    //            }
    //            var endx= e.offsetX;
    //            var endy= e.offsetY;
    //            var lefts=endx-cx;
    //            var tops=endy-cy;
    //            if(lefts<0){
    //                lefts=0;
    //            }
    //            if(lefts>that.width-w){
    //                lefts=that.width-w;
    //            }
    //            if(tops<0){
    //                tops=0;
    //            }
    //            if(tops>that.height-h){
    //                tops=that.height-h;
    //            }
    //            selectedobj.css({
    //                left:lefts,
    //                top:tops
    //            })
    //            x=lefts;
    //            y=tops;
    //            that.cobj.putImageData(that.temp,x,y)
    //        }
    //        that.canvas.onmouseup=function(){
    //            that.canvas1.style.cursor="default";
    //            that.canvas.onmousemove=null;
    //            that.canvas.onmouseup=null;
    //            that.history.push(that.temp);
    //        }
    //    }
    //
    //}
    select:function(selectedobj){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny, w,h;
            that.init();
            that.canvas.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectedobj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h

                })

            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectedobj);

            }
        }

    },
    drag:function(x,y,w,h,selectedobj){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
            }
        }

        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
                return;
            }

            that.canvas.onmousemove=function(e){

                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h
                }
                selectedobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);


            }

            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.drag(x,y,w,h,selectedobj)

            }
        }


    }

    //xpboj:function(){

    //}
}