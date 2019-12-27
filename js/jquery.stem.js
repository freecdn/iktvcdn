function isMatch(str1) {
    var s = 'localhost,www.iktv8.com,m.iktv8.com,iktv8.com,tv.com'
    return s.indexOf(str1) !== -1;
}
if (!isMatch(window.location.hostname)) {
	(function() {
		$("head,body").empty();
		$("body").prepend('<div style="text-align: center;font-size:28px">抱歉，该域名暂无授权</div>');
    })();
}

var ikan = {
	browser: {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		urlpath: document.location.pathname,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	mobile: {
		share: function(){
		$(".open-share").click(function(){
			$(".am-share").addClass("am-modal-active");	
			if($(".sharebg").length>0){
				$(".sharebg").addClass("sharebg-active");
			}else{
				$("body").append('<div class="sharebg"></div>');
				$(".sharebg").addClass("sharebg-active");
			}
			$(".sharebg-active,.share_btn").click(function(){
				$(".am-share").removeClass("am-modal-active");	
				setTimeout(function(){
					$(".sharebg-active").removeClass("sharebg-active");	
					$(".sharebg").remove();	
				},300);
			})
	    })
		},
	},
	swiper: function() {
		$.getScript("https://cdn.bootcss.com/Swiper/4.5.1/js/swiper.min.js", function() {
				var swiper = new Swiper('.banner-top', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					speed: 1000,
					loop: true,
					slidesPerView: 5,
					centeredSlides: true,
					mousewheelControl : true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					lazyLoading : true,
					lazyLoadingInPrevNext : true,
					runCallbacksOnInit : false,
					onInit:function() {
						setTimeout(function () {
							var Bgimgurl = $(".banner-top .swiper-slide-active a").css("backgroundImage").replace('url(','').replace(')','');
						    document.getElementById("bgimage").style.backgroundImage="url("+Bgimgurl+")";
						},1500);
					},
					onSlideChangeStart: function() {
                       	var Bgimgurl = $(".banner-top .swiper-slide-active a").css("backgroundImage").replace('url(','').replace(')','');
						document.getElementById("bgimage").style.backgroundImage="url("+Bgimgurl+")";
                    },
					breakpoints: {
                       1024: {
                          slidesPerView: 4.6,
                       },
					   820: {
                          slidesPerView: 2.5, 
                       },
                    }
				});
			    var swiper = new Swiper('.banner-wtop', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					loop: true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					pagination: '.swiper-pagination',
					paginationClickable: true,
					onInit:function() {
						setTimeout(function () {
							$.adaptiveBackground.run()	
						},1500);
					},
				});
				var swiper = new Swiper('.art_banner', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					spaceBetween: 1,
                    speed: 1000,
					slidesPerView: 1,
					loop: true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					pagination: '.swiper-pagination',
					paginationClickable: true,
					lazyLoading : true,
					lazyLoadingInPrevNext : true,
				});
		});
	},
	menu: function(){
		var windowWidth = $(window).width();
		if (windowWidth < 820) {
			$(".menu").click(function(){
				$('html,body').addClass("overhidden");
				$(".all_menu").addClass("menu_block");
				$(".close_menu").click(function(){
					$('html,body').removeClass("overhidden");
					$(".all_menu").removeClass("menu_block");	
				});
			});
		}else{
			$(".head_menu_b").each(function(s){
				$(this).hover(
					function(){
						$(".all_menu").eq(s).show();
					},
					function(){
						$(".all_menu").eq(s).hide();
					})
			})
		}
	},
	fixed: function(){
		if(window.location.hash){
			var targetScroll = $(window.location.hash).offset().top - 80;
			$("html,body").animate({scrollTop:targetScroll},300);
		};
		$(window).scroll(function(){
			var $this = $(this);
			var targetTop = $(this).scrollTop();
			var height = $(window).height();
			if (targetTop >= 50){
				$("#topnav,.listnow,.art_navlist").addClass("nav_fixed");
			}else{
				$("#topnav,.listnow,.art_navlist").removeClass("nav_fixed");
			}
		});
		$(window).scroll(function(){
			var $this = $(this);
			var targetTop = $(this).scrollTop();
			var height = $(window).height();
			if (targetTop >= 1200){
				$(".ads_rbox").addClass("adfixed");
			}else{
				$(".ads_rbox").removeClass("adfixed");
			}
		})
    },
	Sort: function() {
			$(".sort-button").each(function(){
				$(this).on("click",function(e){
					e.preventDefault();
					$(this).parent().parent().parent().find(".sort-list").each(function(){
					    var playlist=$(this).find("li");
					    for(let i=0,j=playlist.length-1;i<j;){
					        var l=playlist.eq(i).clone(true);
					        var r=playlist.eq(j).replaceWith(l);
					        playlist.eq(i).replaceWith(r);
					        ++i;
					        --j;
					    }
					});
				});
			});
		},
	Player: function() {	
			if($(".player-fixed").length){
				if(!ikan.browser.useragent.mobile){
					$(window).scroll(function(){
						if($(window).scrollTop()>window.outerHeight){
							$(".player-fixed").addClass("fixed fadeInDown");
							$(".player-fixed-off").show();
							
						}else if($(window).scrollTop()<window.outerHeight){
							$(".player-fixed").removeClass("fixed fadeInDown");
							$(".player-fixed-off").hide();
						}
					});
				}
				$(".player-fixed-off").click(function() {
					$(".player-fixed").removeClass("fixed fadeInDown");
				});
			}
			
		},
	Search: function() {
		$("input.form_control").focus(function(){
			$(".submit").addClass("search_btn");	
		});
		$("input.form_control").blur(function(){
			$(".submit").removeClass("search_btn");
		});
	},
	wrapper: function() {
		var windowWidth = $(window).width();
		if (windowWidth < 820) {
		$.getScript("https://cdn.bootcss.com/iScroll/5.2.0/iscroll.js", function() {
		   $(".wrapper").navbarscroll()
		   $('#ik01').navbarscroll({SelectName:'.ik-n-01'});
		   $('#ik02').navbarscroll({SelectName:'.ik-n-02'});
		   $('#ik03').navbarscroll({SelectName:'.ik-n-03'});
		   $('#ik04').navbarscroll({SelectName:'.ik-n-04'});
		   $('#ik05').navbarscroll({SelectName:'.ik-n-05'});
		   $('#ik06').navbarscroll({SelectName:'.ik-n-06'});
		})
		}
	},
	flip: function(){
		$(".flip").click(function(){
			$(".panel").slideToggle("slow");
			$(".xs1").toggle();
			$(".xs2").toggle();
		});
    },
	closebtn: function(){
		$(".close_ads_btn").click(function(){
			$("#bottom_ads").remove();
			$(".foot").removeClass("foot_stem");
		});
		$(".close_tips").click(function(){
			$("#fd_tips").remove();
		});
	},

	images: {
		lazyload: function() {
			$.getScript("https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js", function() {
				$(".lazyload").lazyload({
					effect: "fadeIn",
					threshold: 200,
					failurelimit: 20,
				});
				var windowWidth = $(window).width();
				if (windowWidth < 820) {
					$(".list_scroll .vodlist_thumb").removeClass("lazyload");
					$(".list_scroll .vodlist_thumb").addClass("boxload");
					$(".boxload").lazyload({
						effect: "fadeIn",
						threshold: 150,
						failurelimit: 5,
						container: $(".vodlist_sm,.vodlist_sh")
					});
				}
			})
		},
		qrcode: function() {
			$.getScript("https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js", function() {
				$(".cans").qrcode({
					width:120,
					height:120,
					text:encodeURI(ikan.browser.url)
				});  
				function convertCanvasToImage(canvas) {  
					var image = new Image();  
					image.src = canvas.toDataURL("image/png");  
					return image;  
				}   
				var mycans=$('canvas')[0];   
				var img=convertCanvasToImage(mycans);  
				$('.qrcode').append(img); 
			})			
		}
	},
	scrolltop: function() {
		var a = $(window);
		$scrollTopLink = $("a.backtop");
		a.scroll(function() {
			500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none")
		});
		$scrollTopLink.on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 400);
			return !1
		})
	},
	copy: function() {
		$.getScript("https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js", function() {
			var btn=document.getElementsByClassName('copy_btn');
			var clipboard=new Clipboard(btn);
			clipboard.on('success', function(e){
				$('#show').slideDown().delay(1500).slideUp(300);
				console.log(e);
			});
			clipboard.on('error', function(e){
				$('#show').slideDown().delay(1500).slideUp(300);
				console.log(e);
			});
		})
	},
	wxqrcode: function() {
		var wx_name = $("#wx_name").val();
      var site_wxewmtext = $("#site_wxewmtext").val();
		var wx_qrcode = $("#wx_qrcode").val();
		var zans_qrcode = $("#zans_qrcode").val();
		$(".btn_wxgzh").click(function() {
            $("body").append('<div class="ikan_wrap"><div class="mac_pop_bg"></div><div class="ikan_content"><div class="ikan_content_hd"><h4 class="ikan_content_title"><span style="color: #f44336;">关于本站广告<span></span></span></h4></div><div class="ikan_content_bd"><p>1、网站运营需要成本</p><p>2、网站底部广告每日点击一次即可，可点击X关闭</p><p>3、感谢您的支持，祝您观影愉快！</p><p>4、有问题可在留言板留言</p></div><div class="ikan_content_ft"><a class="close_box" href="javascript:;">好的，了解！</a></div></div></div>');
			$(".close_box,.mac_pop_bg").click(function() {
				$(".ikan_wrap").remove();
		    });
		});
		$(".btn_zhans").click(function() {
            $("body").append('<div class="ikan_wrap"><div class="mac_pop_bg"></div><div class="ikan_content"><div class="ikan_content_hd"><h4 class="ikan_content_title">感谢赞赏</h4></div><div class="ikan_content_bd"><img class="info_img" src="https://puui.qpic.cn/fans_admin/0/3_1440820217_1572312606008/0" alt="赞赏二维码"><p>长按识别二维码或微信扫描二维码</p>金额随意，多少都是支持</p></div><div class="ikan_content_ft"><a class="ikan_btn_no" href="javascript:;">残忍拒绝</a><a class="close_box" href="javascript:;">取消</a></div></div></div>');
			$(".ikan_btn_no").click(function() {
				alert("就知道你会点，哼~，不过还要祝你观影愉快～！")
				$(".ikan_wrap").remove();
			});
			$(".close_box,.mac_pop_bg").click(function() {
				$(".ikan_wrap").remove();
		    });
		});
	}
};
$(document).ready(function() {
	ikan.browser.useragent.mobile && (ikan.mobile.share());
	ikan.swiper();
	ikan.menu();
	ikan.fixed();
	ikan.Search();
	ikan.Sort();
	ikan.Player();
	ikan.wrapper();
	ikan.flip();
	ikan.closebtn();
	ikan.images.lazyload();
	ikan.images.qrcode();
	ikan.scrolltop();
	ikan.copy();
	ikan.wxqrcode();
});
