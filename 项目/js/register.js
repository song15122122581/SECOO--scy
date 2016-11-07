$("register_text ul li").eq(1).css("display", "none")
//用户名框的测试
$(".userName").focus(function(event){
        if($(this).val() === ""){
                $(this).css("borderColor", "red");
                $(".callphone").html("请输入您的手机号").css({font:'14px/40px "微软雅黑"', color:'#999'});
        }
})
var $tel = new RegExp("^1[3|5|7|8][0-9]{9}$");
var $psd = new RegExp("^[A-Za-z0-9]{5,17}$");

$(".userName").blur(function(event){
        var str = $(this).val();
        if($(this).val() === ""){
                $(".callphone").html("请输入用户名").css({font:'12px/40px "微软雅黑"', color:'red', fontWeight:'bold'});
                $(".register_text ul li").eq(1).css("display", "none");
        }else if($tel.test(str)){
                $(this).css("borderColor", "#999");
                $(".callphone").html("");
                $(".register_text ul li").eq(1).css("display", "block");
        }else{
                $(".callphone").html("请输入正确的手机号").css({font:'12px/40px "微软雅黑"', color:'red', fontWeight:'bold'});
                $(".register_text ul li").eq(1).css("display", "none")
        }
})

//生成四位验证码
function confirmWord(){
        var val = [];
        for(var i = 0; i<12; i+=3){
                var letter = String.fromCharCode(Math.round(Math.random()*25+65)); //字母
                var figure = String.fromCharCode(Math.round(Math.random()*9+48));  //数字
                var lower = String.fromCharCode(Math.round(Math.random()*25+97)); //小写
                
                val[i] = letter;
                val[i+1] = figure;
                val[i+2] = lower;
        }
        val.sort(function(a,b){return Math.random()-0.5});
        val.splice(0,8);
        return val.join("")
}
//页面加载的时候刷新一个验证码
$(".changeWord").html(confirmWord())
//点击更换验证码
$(".changeWord").click(function(event){
            $(this).html(confirmWord())
})

//验证码的测试
$(".changeWordInput").focus(function(){
     if($(this).val() ===""){
         $(this).css("borderColor","red")
         $(".changeAlert").html("请输入验证码").css({
            font: '14px/40px "微软雅黑"',
            color: '#999',
         });
      }
});

$(".changeWordInput").blur(function(){
    if($(this).val() ==="" || $(this).val() != $(".changeWord").html()){
         $(".changeAlert").html("请输入正确验证码").css({
            font: '12px/40px "微软雅黑"',
            color: 'red',
            fontWeight:'bold',
         });
         $(".changeWord").html(confirmWord())   
     }else{
         $(".changeAlert").html("")
         $(this).css("borderColor","#999")
     }
});

//密码框的测试
$(".passWord").focus(function(){
     if($(this).val() ===""){
             $(this).css("borderColor","red")
             $(".passWordAlert").html("请输入密码").css({font: '14px/40px "微软雅黑"',color: '#999'});
      }
});

$(".passWord").blur(function(){
     
     if($(this).val() ===""){
         $(this).css("borderColor","red")
         $(".passWordAlert").html("请输入密码").css({
            font: '12px/40px "微软雅黑"',
            color: 'red',
            fontWeight:"bold"   
         });
      }else if($psd.test($(this).val())){
         $(".passWordAlert").html("")
         $(this).css("borderColor","#999")
      }else{
         $(this).css("borderColor","red")
         $(".passWordAlert").html("密码必须为字母和数字长度5-17位").css({
            font: '12px/40px "微软雅黑"',
            color: 'red',
            fontWeight:"bold"   
         });
      }
});

//确认密码框的测试
$(".conformPassWord").focus(function(){
     if($(this).val() ===""){
         $(this).css("borderColor","red")
         $(".conformAlert").html("请确认密码").css({
            font: '14px/40px "微软雅黑"',
            color: '#999',
         });
      }
});
$(".conformPassWord").blur(function(){
    if($(this).val() ===""){
         $(this).css("borderColor","red")
         $(".conformAlert").html("请确认密码").css({
            font: '12px/40px "微软雅黑"',
            color: 'red',
            fontWeight:"bold"   
         });
     }else if($(this).val() != $(".passWord").val()){
         $(this).css("borderColor","red")
         $(".conformAlert").html("俩次输入的不一致,请重新输入").css({
            font: '12px/40px "微软雅黑"',
            color: 'red',
            fontWeight:"bold"   
         });
     }else{
        $(".conformAlert").html("")
        $(this).css("borderColor","#999")
     }   
})

//点击注册按钮
$("#btn").click(function(){
            if(!$tel.test($(".userName").val())){
                    $(".callphone").html("用户名有误").css({
                            font:'12px/40px "微软雅黑"',
                            color:'red',
                            fontWeight:'bold'
                    });
                        return;
            }
            if($(".changeWordInput").val() != $(".changeWord").html()){
                    $(".changeAlert").html("请输入正确验证码").css({
                            font: '12px/40px "微软雅黑"',
                            color: 'red',
                            fontWeight:"bold"
                    });
                    $(".changeWord").html(confirmWord())
                        return;
            }
            if(!$psd.test($(".passWord").val())){
                     $(".passWord").css("borderColor","red")
                     $(".passWordAlert").html("密码有误").css({
                            font: '12px/40px "微软雅黑"',
                            color: 'red',
                            fontWeight:"bold"   
                    });
                        return;
            }
            if($(".conformPassWord").val() != $(".passWord").val()){
                    $(".conformPassWord").css("borderColor","red")
                    $(".conformAlert").html("俩次密码不一致").css({
                            font: '12px/40px "微软雅黑"',
                            color: 'red',
                            fontWeight:"bold"   
                    });
                        return;
            }
            if(!$(".agree").is(":checked")){
                    $(".VIP").html("您还没有确定注册协议")
                        return;
            }else{
                    $(".VIP").html("")
            }
        var user = $(".userName").val();
        var password = $(".password").val();
            $.ajax({
                    type:"get",
                    async:true,
                    url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                    data:{
                            status:'register',
                            userID:user,
                            password:password,
                        },
                    success:function(data){
                            if(data == 0){
                                    alert("用户名已存在请重新注册")
                                    $(".userName").val("");
                            }else if(data == 1){
                                    alert("注册成功");
                                    window.location.href = "login.html";
                            }else{
                                    alert("不好意思,出错啦")
                            }
                    },

            })
})