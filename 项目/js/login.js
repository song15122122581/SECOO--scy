var arr = [/^1[3|5|7|8][0-9]{9}$/,/^[A-Za-z0-9]{5,17}$/];
//用户名的
$(".loginbox input:eq(0)").focus(function(event){
        $(this).css("borderColor", "#f19108").attr("placeholder", "");
        $(".i1").css("background-position", "-19px 0");
        $(".mistake").css("display", "none");
})
$(".loginbox input:eq(0)").blur(function(event){
        $(this).css("borderColor", "#dedede").attr("placeholder", "用户名");
        $(".i1").css("background-position", "0 0");
        if(!arr[0].test($(this).val())){
                $(".mistake").css("display", "block");
                $(".mistake").html("请输入正确的手机号");
            }else{
                $(".mistake").css("display", "none");
            }
})

//密码框的
$(".loginbox input:eq(1)").focus(function(event){
        $(this).css("borderColor", "#f19108").attr("placeholder", "");
        $(".i2").css("background-position", "-19px -20px");
})
$(".loginbox input:eq(1)").blur(function(event){
        $(this).css("borderColor", "#dedede").attr("placeholder", "密码");
        $(".i2").css("background-position", "0 -20px");
        if(!arr[1].test($(this).val())){
                $(".mistake").css("display", "block");
                $(".mistake").html("密码格式有误");
        }else{
                $(".mistake").css("display", "none");
        }
})

//判断用户名或密码是否存在
$("#login_btn").click(function(event){
        if($("#login_user").val() === ""){
                $(".mistake").css("display", "block");
                $(".mistake").html("请输入用户名");
                return;
        }else if($("#login_psd").val() === ""){
                $(".mistake").css("display", "block");
                $(".mistake").html("请输入密码");
                return;
        }
        var user = $("#login_user").val();
        var psd = $("#login_psd").val();
                $.ajax({
                        type:"get",
                        url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                        async:true,
                        data:{
                            status:"login",
                            userID:user,
                            password:psd,
                        },
                        success:function(data){
                            if(data == 0){
                                $(".mistake").css("display", "block");
                                $(".mistake").html("用户名不存在请注册");
                            }else if(data == 2){
                                $(".mistake").css("display", "block");
                                $(".mistake").html("密码不正确");
                            }else{
                                $.cookie("username", user,{
                                    path:"SECCO"
                                })
                                window.location.href = "index.html";
                            }
                        },
                         error:function (data){
                console.log(data);
            }
                })
})