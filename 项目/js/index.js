                                                        /*防止页面选中变蓝*/
removeTextChecked();
function removeTextChecked(){
  if (typeof(document.onselectstart) != "undefined") {       
      // IE下禁止元素被选取       
      document.onselectstart = function (event){
          if(event.target.tagName!="INPUT"){
              return false;
          }
      }      
  } else {
      // firefox下禁止元素被选取的变通办法       
      document.onmousedown = function (event){
          if(event.target.tagName!="INPUT"){
              return false;
          }
      }      
      document.onmouseup = function(event){
          if(event.target.tagName!="INPUT"){
              return false;
          }
      }       
  }
}
 
//吸顶菜单和楼层指引
 $(window).scroll(function(event) {
          if($(this).scrollTop() > $(this).height()-100 && $(window).scrollTop() < $(document).height() - $(".footer").height() - $(window).height()){
          
            //$(".menu").slideDown(600);
            $(".menu").fadeIn(600);
            $(".stair").fadeIn(600);
          }else{
            //$(".menu").slideUp(400);
            $(".menu").fadeOut(600);
            $(".stair").fadeOut(600);
          }
});

//返回顶部的按钮
$(window).scroll(function(event){
      var return_top = $(document).scrollTop();
      var return_h = $(window).height();
       if(return_top > return_h){
        $('.return_btn').show();
      }else{
        $('.return_btn').hide();
      }
      $('.return_btn').click(function(){
        $('html,body').stop(true).animate({scrollTop:0});
      })

})


//上面的大轮播
var indexCurrent = 0;
 //刷新页面第一张显示
 $(".banner>ul>li:eq(0)").show();
 //封装的函数
 var changeImge = function(indexCurrent){
            
            $(".banner>ul>li").eq(indexCurrent).siblings().fadeOut(600);
            $(".banner>ul>li").eq(indexCurrent).fadeIn(600);
          /*  $(".banner>ul>li").eq(indexCurrent).siblings().hide();*/
            //console.log($(".banner>ul>li").eq(indexCurrent).children().children().eq(0))
            $(".banner1Img").stop().animate({left:0},600)
            $(".banner11Img").stop().animate({right:0},600)
            $(".banner>ul>li").eq(indexCurrent).children().children().eq(0).stop().animate({left:10},600)
            $(".banner>ul>li").eq(indexCurrent).children().children().eq(1).stop().animate({right:10},600)
            //$(".banner>ul>li").eq(indexCurrent).attr("background","#d3d3d3")
            switch(indexCurrent){
                case 0 :
                //console.log("0")
                $(".banner_wrap").css("backgroundColor","#4B4B4B");
                break;
                case 1 :
                //console.log("1")
                $(".banner_wrap").css("backgroundColor","#00030A");
                break;
                case 2 :
                //console.log("2")
                $(".banner_wrap").css("backgroundColor","#100404");
                break;
                default:
                break;
            }
            $(".dot>span").removeClass('on');
            $(".dot>span").eq(indexCurrent).addClass('on');
 }
//点击右键变化
$(".pre").click(function(event){
    indexCurrent--;
    if(indexCurrent == -1){
        indexCurrent = 2
    }
    changeImge(indexCurrent);
});
 $(".next").on("click.a",function(event){
            indexCurrent++;
            if(indexCurrent == 3){
                indexCurrent = 0
            }

            changeImge(indexCurrent);

 });
//添加定时器自动轮播
var tag = null;
activeAuto();
function activeAuto(){
    tag = setInterval(function(){
             $(".next").trigger('click.a');
          },3000)
}
 
$(".banner").mouseenter(function(){
      clearInterval(tag);
      $(".banner>a").stop().animate({opacity:0.5},400);

      $(".banner>a").hover(function(){
                //console.log($(this))
                $(this).stop().animate({opacity:1},400)
            },function(){
                //console.log("移出")
                $(this).stop().animate({opacity:0.5},400)
      })
})

$(".banner").mouseleave(function(){
      clearInterval(tag);
      activeAuto();
      $(".banner>a").stop().animate({opacity:0},400)
})


$(".dot>span").click(function(){
    indexCurrent = $(this).index();
    changeImge(indexCurrent);
})

//图片滑入之后闪一下

$(".c").mouseenter(function(event){
     $(this).stop().animate({opacity:0.7},200,function(){
         $(".c").stop().animate({opacity:1},200);
     });
  });

//图片划上的时候向左边运动
$(".silce").hover(function() {
    $(this).children().eq(1).stop().animate({left:-45},400)
    $(this).children().eq(0).stop().animate({right:9},400)
}, function() {
  $(this).children().eq(1).stop().animate({left:0},400)
  $(this).children().eq(0).stop().animate({right:-100},400)
});

//商城MALL的商品列表

$.ajax({
    url: "json/index.json",
    type: "GET",
    async: true,
    success:function(data){
          var html = "";
          $.each(data,function(i,obj){
              html += "<div class = 'floor" +(4+i)+ "FLO floor_same' >"+
              "<div class = 'sameTitle'>" + 
                      "<ul>" + 
                              "<li class = 'first_li' >" + obj.head.title1+ "</li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title2 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title3 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title4 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title5 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title6 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title7 +"</a></li>" +
                              "<li><a href = 'javascript:;'>" + obj.head.title8 +"</a></li>" +
                      "</ul>"+
                      "<span><a href = 'javascript:;'>" + obj.head.title9 + "</a></span>" +
              "</div>" +   
              "<div class = 'sameContent'>" +
                      "<div class = 'sameImgBox'>" +
                              "<div class = 'sameText'></div>" +
                              "<h2>"+obj.object1.name+ "</h2>" +
                              "<p>" + obj.object1.dec+ "</p>" +
                              "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object1.img+" ' /></a>"+
                      "</div>"+
                      "<div class = 'sameBoxMiddle sameprc'>" +
                              "<h3>"+obj.object2.name+"</h3>"+
                              "<h4>"+obj.object2.dec+"</h4>"+
                              "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object2.img+" ' /></a>"+
                        "</div>"+
                      "<div class = 'sameBoxLast'>"+
                                "<div class = 'sameBoxLastContent sameprc'>"+
                                           "<h3>"+obj.object3.name+"</h3>"+
                                           "<h4>"+obj.object3.dec+"</h4>"+
                                           "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object3.img+" ' /></a>"+
                                "</div>"+
                                "<div class = 'sameBoxLastContent sameprc'>"+
                                           "<h3>"+obj.object4.name+"</h3>"+
                                           "<h4>"+obj.object4.dec+"</h4>"+
                                           "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object4.img+" ' /></a>"+
                                "</div>"+
                                "<div class = 'sameBoxLastContent sameprc'>"+
                                           "<h3>"+obj.object5.name+"</h3>"+
                                           "<h4>"+obj.object5.dec+"</h4>"+
                                           "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object5.img+" ' /></a>"+
                                "</div>"+
                                "<div class = 'sameBoxLastContent sameprc'>"+
                                          "<h3>"+obj.object6.name+"</h3>"+
                                          "<h4>"+obj.object6.dec+"</h4>"+
                                           "<a href = 'javascript:;'><img class = 'c' src = ' "+obj.object6.img+" ' /></a>"+
                                "</div>"+
                    "</div>"+
              "</div>"+
      "</div>";
 })
                   
             $(".floorbox").html(html);     
     }
  })                              
    //           $(".c").mouseenter(function(event){
    //                   $(this).stop().animate({opacity:0.7},100,function(){
    //                           $(".c").stop().animate({opacity:1},100);
    //            });
    //         });
    
// 猜你喜欢的轮播
    var $prev=$("#prev");
    var $next=$("#next");
    var $list=$(".pic_list");
    var $picLi=$(".pic_list li");
    var $footChangeImge=$(".footChangeImge");

    var iNow=0;
    var iW=$picLi.outerWidth(true);
    var len=$picLi.length;
    //console.log(len)
    var timer=null;
    var animated=true;

     $picLi.eq(0).clone().appendTo($list);        
     $picLi.eq(1).clone().appendTo($list);
     $picLi.eq(2).clone().appendTo($list);
     $picLi.eq(3).clone().appendTo($list);
     $picLi.eq(4).clone().appendTo($list);
     $picLi.eq(5).clone().appendTo($list);

    timer=setInterval(autoPlay,3000)

    
    $footChangeImge.hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(autoPlay,3000)
    })

    //下一张
    $next.click(function(){
        if(!animated){
            return
        }
        if(iNow>=len){
            iNow=0;
            $list.css({"left":0})
        }
        iNow++;
        changeView()
   })

   //上一张
   $prev.click(function(){
        if(!animated){
            return
        }
        if(iNow<=0){
            iNow=len;
            $list.css({"left":-iNow*iW})
        }
        iNow--;
        changeView()
   })

   function changeView(){
        animated=false;
        $list.stop().animate({"left":-iNow*iW},function(){
            animated=true;
            if(iNow>=len){
                $list.css('left','0px');
            }
        })
   }
   function autoPlay(){
       if(iNow>=len){
           iNow=0;
           $list.css({"left":0})
       }
       iNow++;
       changeView()
  }
//网页底部的向右滑动的地图
  $(window).scroll(function(){
    if($(window).scrollTop() > $(document).height() - $(".footer").height() - $(window).height()){
        $(".footer_serve").stop().animate({backgroundPosition:750},50)
    }else{
        
        $(".footer_serve").stop().animate({backgroundPosition:250},50)
    }
})
