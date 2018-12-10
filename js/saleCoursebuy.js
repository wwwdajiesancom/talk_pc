$(function(){
    var userIdmsg = false;
    var mobilemsg = false;
    var payObj = {}; //记录订单信息
    var apiUrl = "http://118.144.248.25:9948";

    var href = location.href;
	if((href.indexOf('http://talk.pbsedu.com') > -1) ){
		apiUrl = "http://talk-api.pbsedu.com";
	}
    // 获取列表
    _getcourseData();
    _getflbcourseData();
    function _getcourseData(){
        // type 课程类型（1=欧美外教课程；2=菲律宾外教课程）
        // discount 是否有折扣(0=没有,1=有)
        $.ajax({
            url: apiUrl+"/openapi/pbstalkcourse/talkcourselist?type=1&discount=1",
            type: 'POST',
            dataType: 'json',
            data:{},
            success: function (data) {
                if(data.success == true){
                    var result = data.result;
                    if(result!== undefined && result.length > 0){
                    	for(var i=0;i<result.length;i++){
	                        var price = result[i].price;
	                        var duration = result[i].duration;
	                        var hours = result[i].hours;
	                        var uniqId = result[i].uniqId;
                            var discountPrice = result[i].discountPrice; //折扣价
                            var discountName = result[i].discountName; //折扣名称
                           // var discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'</b>)</td>'
                           // if(discountPrice == null && discountName == null ){
                             //   discountHtml='<td id="saleCoursePrice">'+price+'</td>';   // 如果未折扣 
                           // }
                           var limit = result[i].limit;  //限购次数;
                           var discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'，仅限购'+limit+'次</b>)</td>'
                           if(discountPrice == null){
                               discountHtml='<td id="saleCoursePrice">'+price+'</td>';// 如果没折扣 
                           }else{
                               if(discountName == '' && limit == 0){
                                   discountHtml='<td><b id="saleCoursePrice">'+discountPrice+'</b></td>';
                               }else if(discountName == ''){
                                   discountHtml='<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">仅限购'+limit+'次</b>)</td>';
                               }else if(limit == 0){
                                   discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'</b>)</td>';
                               }
                           }
                            var durationHtml = (duration == 0) ? '<b id="courseDuration">永久有效</b>' : '<b id="courseDuration">'+duration+'</b>个月';
	                        var html = '<tr>'+
									'<td><b id="courseName">'+uniqId+'</b></td>'+
									'<td>'+hours+'课时</td>'+
									'<td><b id="coursePrice">'+price+'</b></td>'+
                                    discountHtml +
									'<td>'+durationHtml+'</td>'+
									'<td class="buy_td">'+
										'<div class="goodsBtn" uniqId="'+uniqId+'">'+'提交订单</div>'+
									'</td>'+
								'</tr>'
	                        $('.om_course_table tbody').append(html);
	                    }
                    }
                }else{
                	console.log(data.msg);
                }
            }
        });
    };
    function _getflbcourseData(){
        // type 课程类型（1=欧美外教课程；2=菲律宾外教课程）
        // discount 是否有折扣(0=没有,1=有)
        $.ajax({
            url: apiUrl+"/openapi/pbstalkcourse/talkcourselist?type=2&discount=1",
            type: 'POST',
            dataType: 'json',
            data:{},
            success: function (data) {
                if(data.success == true){
                    var result = data.result;
                    if(result!== undefined && result.length > 0){
                        for(var i=0;i<result.length;i++){
                            var price = result[i].price;
                            var duration = result[i].duration;
                            var hours = result[i].hours;
                            var uniqId = result[i].uniqId;
                            var discountPrice = result[i].discountPrice; //折扣价
                            var discountName = result[i].discountName; //折扣名称
                           // var discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'</b>)</td>'
                           // if(discountPrice == null && discountName == null ){
                             //   discountHtml='<td id="saleCoursePrice">'+price+'</td>';   // 如果未折扣 
                           // }
                           var limit = result[i].limit;  //限购次数
                           var discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'，仅限购'+limit+'次</b>)</td>'
                           if(discountPrice == null){
                               discountHtml='<td id="saleCoursePrice">'+price+'</td>';// 如果没折扣 
                           }else{
                               if(discountName == '' && limit == 0){
                                   discountHtml='<td><b id="saleCoursePrice">'+discountPrice+'</b></td>';
                               }else if(discountName == ''){
                                   discountHtml='<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">仅限购'+limit+'次</b>)</td>';
                               }else if(limit == 0){
                                   discountHtml = '<td><b id="saleCoursePrice">'+discountPrice+'</b>'+' (<b class="discountNameClass">'+discountName+'</b>)</td>';
                               }
                           }
                            var durationHtml = (duration == 0) ? '<b id="courseDuration">永久有效</b>' : '<b id="courseDuration">'+duration+'</b>个月';
                            var html = '<tr>'+
                                    '<td><b id="courseName">'+uniqId+'</b></td>'+
                                    '<td>'+hours+'课时</td>'+
                                    '<td><b id="coursePrice">'+price+'</b></td>'+
                                    discountHtml +
                                    '<td>'+durationHtml+'</td>'+
                                    '<td class="buy_td">'+
                                        '<div class="goodsBtn" uniqId="'+uniqId+'">'+'提交订单</div>'+
                                    '</td>'+
                                '</tr>'
                            $('.flb_course_table tbody').append(html);
                        }
                    }
                }else{
                    console.log(data.msg);
                }
            }
        });
    };
    // 弹出购买弹框
	$('.course_table tbody').on('click','.goodsBtn',function(){
		payObj = {};
        var uniqId = $(this).attr('uniqId');
        $(".course_table tbody .goodsBtn").removeClass('payActive');
        $(this).addClass('payActive');
        $('#orderName').val('课时');
		$('#orderPrice').val(' 元');
		$('#orderNum').val('');
		$('#courseNum').val('');
        // discount 是否有折扣(0=没有,1=有)
        $.ajax({
        	url : apiUrl + "/openapi/pbstalkorder/addOrder/"+uniqId+".json?discount=1",
            dataType: 'json',
        	type : 'POST',
        	success : function(data){
        		if(data.success == true){
        			payObj.orderNum = data.result.tradeNo;
        			payObj.orderName = data.result.hours;
        			payObj.coursePrice = data.result.price;
        			payObj.uniqId = data.result.uniqId;
                	$('#orderName').val(payObj.orderName + '课时');

                	$('#courseNum').val(payObj.uniqId);

        			$('#orderPrice').val(payObj.coursePrice + ' 元');
        			$('#orderNum').val(payObj.orderNum);
        			// 成功显示购买弹框
			        $("#buyorder_form").show();
			        $("#buyorder_form_mask").show();
			        $("#buy_queren_zhifubao").removeAttr('href');
                }else{
                	// window.console.log(data.msg)
                	window.wxc.xcConfirm(data.msg, window.wxc.xcConfirm.typeEnum.info);
                }
                
        	},
        	error: function(XMLHttpRequest, textStatus,message) {
				if(XMLHttpRequest.status == 403){
					window.wxc.xcConfirm('亲，您太麻利了，网络都要被点爆了喔', window.wxc.xcConfirm.typeEnum.info);
				}else{
					window.wxc.xcConfirm('错误，请重试', window.wxc.xcConfirm.typeEnum.info);
				}
            }
        })
    })

    // 关闭弹窗
	$('.orderclose').click(function(){
        funClose();
    })
    $('#buyorder_form_mask').click(function(){
        funClose();
    })

    function funClose(){
        $("#userMobile").css({border:"1px solid #333"});
        $("#userMobiley").css("display","none");
        $("#userId").css({border:"1px solid #333"});
        $("#userIdy").css("display","none");
        $("#buyorder_form").hide();
        $("#buyorder_form_mask").hide();
    }
    // 验证手机号码
	$("#userMobile").on('blur',function(){
        Mobile = $(this).val();
        if (Mobile == null) {
        	mobilemsg = false
            return false;
        }else{
            var re = /^1[3|4|5|7|8|][0-9]{9}$/;
            if (!re.test(Mobile)) {
            	mobilemsg = false
                $("#userMobile").css({border:"1px solid red"});
                $("#userMobiley").css("display","inline-block");
                $("#userMobile").focus();
                return false;
            }
        }
        mobilemsg = true;
        payObj.Mobile = Mobile;
        $("#userMobile").css({border:"1px solid #333"});
        $("#userMobiley").css("display","none");
    })
    
    // 验证用户名
    $("#userId").on('blur',function(){
        userId = $(this).val().trim();
        if (userId == null) {
        	userIdmsg = false;
            return false;
        }else{
             if (userId == '') {
             	userIdmsg = false;
                $("#userId").css({border:"1px solid red"});
                $("#userIdy").css("display","inline-block");
                $("#userId").focus();
                return false;
            }
        }
        userIdmsg = true;
        payObj.userId = userId;
        $("#userId").css({border:"1px solid #333"});
        $("#userIdy").css("display","none");
    })
    
    // 备注信息
	$("#remarkInfo").on('blur',function(){
        // payObj.remark = escape($(this).val().trim());
        payObj.remark = $(this).val().trim();
    })

    // 支付宝按钮
	$('#buy_queren_zhifubao').click(function(){
    	var mobile = $("#userMobile").val().trim();
    	var userId = $("#userId").val().trim();
    	var remarkInfo = $("#remarkInfo").val().trim();
    	var re = /^1[3|4|5|7|8|][0-9]{9}$/;
    	if(userId !== "" && re.test(mobile)){
    		payObj.userId = userId;
    		payObj.Mobile = mobile;
    		payObj.remark = remarkInfo;
        	_confirmPay($(this));
        }else{
        	return false;
        }
    })
    
    // 支付方式移入移出
	$(".btn_buy").mousemove(function(){
        var index=$(this).index(".btn_buy");
        if(index==0){
            $(this).addClass('btn_buy1_hover');
        }
    }).mouseout(function(){
        var index=$(this).index(".btn_buy");
        if(index==0){
            $(this).removeClass('btn_buy1_hover');
        }
    })

    //确认支付的弹窗出现以及跳转到第三方支付页
    function _confirmPay(obj){
        // 调取购买接口
        $.ajax({
        	url : apiUrl + '/openapi/pbstalkorder/confirmOrder',
        	type : 'POST',
            dataType: 'json',
			async: false,//同步请求
        	data: {
        		orderNo : payObj.orderNum,
        		mobile : payObj.Mobile,
        		userName : payObj.userId,
        		courseUniqId :  payObj.uniqId,
        		coursePrice : payObj.coursePrice,
        		amount : payObj.coursePrice,
        		remark : payObj.remark,
        		paymentType : 1
        	},
        	success: function(data){
        		if(data.success == true){
        			//如果成功会返回一个支付宝地址
        			var href = data.result;

			        $("#J-newpage") && $("#J-newpage").remove();
	            	$('<a href="" target="_blank" id="J-newpage" style="position:absolute;diplay:block;height:0;width:0;"></a>').appendTo('body');
	            	$("#J-newpage").attr("href",href);
	            	var a = document.getElementById("J-newpage");  
					//取消<a>标签原先的onclick事件,使<a>标签点击后通过href跳转(因为无法用js跳转)^-^     
					a.setAttribute("onclick",'');     
					//激发标签点击事件OVER        
					a.click(); 
					$("#J-newpage").remove();
			        $("#buyorder_form").hide();
			        $("#buyorder_form_mask").hide();
			        $('#pay_confirm_box').show();
			        $("#pay_confirm_error").hide();
			        $("#pay_confirm_suc").show();
        		}else{
        			// window.console.log(data.msg)
        			window.wxc.xcConfirm(data.msg, window.wxc.xcConfirm.typeEnum.info);

        		}
        	},
        	error: function(XMLHttpRequest, textStatus,message) {
				if(XMLHttpRequest.status == 403){
					window.wxc.xcConfirm('亲，您太麻利了，网络都要被点爆了喔', window.wxc.xcConfirm.typeEnum.info);
				}else{
					window.wxc.xcConfirm('错误，请重试', window.wxc.xcConfirm.typeEnum.info);
				}
            }
        })
    }


    //支付完成
    $("#pay_suc").click(function(){

		$("#pay_confirm_error").hide();
        $("#pay_confirm_suc").show();
        $("#pay_confirm_box").hide();
    });
    $('#confirmclose').click(function(){
    	$("#pay_confirm_error").hide();
        $("#pay_confirm_suc").show();
        $("#pay_confirm_box").hide();
    })

});
