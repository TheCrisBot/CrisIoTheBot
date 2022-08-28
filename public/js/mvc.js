$(document).ready(function() {
    if(localStorage.getItem("promotion1") != 'true') {
      swal({
          title: "We're Back!",
          text: "Sorry for the inconvenience, you can now request your activation link to activate your account by login. If you're having any difficulties, drop a mail to westenets@gmail.com",
          type: "info",
          confirmButtonColor: "#008c46",
          confirmButtonText: "Yes, I Understand!",
          closeOnConfirm: true
        },
        function(){
          localStorage.setItem("promotion1", true);
        });  
    }
    
    // location.href = "https://www.mega-voice-command.com/maintenance";
    //mobile detect
    var md = new MobileDetect(window.navigator.userAgent);
    console.log(md);
    if (md.mobile() != null) {
        location.href = "https://www.mega-voice-command.com/mobile";
    }

    //hide soundcloud
    $("#scpanel").hide();

    //preload
    setTimeout(function(){
        $("#depreload .pwrapper").animate({ opacity: 1 });
    }, 400);

    setTimeout(function(){
        $("#depreload .logo").animate({ opacity: 1 });
    }, 800);

    var canvas  = $("#depreload .line")[0],
        context = canvas.getContext("2d");

    context.beginPath();
    context.arc(180, 180, 160, Math.PI * 1.5, Math.PI * 1.6);
    context.strokeStyle = 'grey';
    context.lineWidth = 5;
    context.stroke();

    var loader = $("body").DEPreLoad({
        OnStep: function(percent) {
            // console.log(percent + '%');

            $("#depreload .line").animate({ opacity: 1 });
            $("#depreload .perc").text(percent + "%");

            if (percent > 5) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(180, 180, 160, Math.PI * 1.5, Math.PI * (1.5 + percent / 50), false);
                context.stroke();
            }
        },
        OnComplete: function() {
            // console.log('Everything loaded!');
            $("#depreload .perc").shuffleLetters({ "text": "MEGA VOICE COMMAND" });
            $("#depreload .loading").text("CONNECTING");
        }
    });
    //preload end

    //routes
    //home route
    routie({
        //main route
        '': function() {
            $('#itemModal').modal('hide')
            $("#home_div").show();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.mega').addClass('dark');
            
            if ($('.header').not(':visible'))
            {
                $(".header").slideDown("fast");
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 0 });
            }
        },
        //links download route
        'links': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").show();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.links').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(1);
        },
        //youtube route
        'youtube': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").show();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.youtube').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }

            LoadYoutube();
        },
        //vr route
        'vr': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").show();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.vr').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(3);
        },
        //rm route
        'rm': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").show();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.skin').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(2);
        },
        //db route
        'database': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").show();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.command').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(4);
        },
        //plugin route
        'plugin': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").show();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.plugin').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(5);
        },
        //extra route
        'extra': function() {
            $('#itemModal').modal('hide')
            $("#home_div").hide();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").show();
            $('.dark').removeClass('dark');
            $('.icon.extra').addClass('dark');
            $(".header").slideUp("fast");
            if ($('.header').not(':visible'))
            {
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
            }
            LoadItemsList(6);
        },
        // products route
        'product/:id': function(id) {
            $('#itemModal').modal('hide')
            $("#home_div").show();
            $("#links_panel").hide();
            $("#yt_panel").hide();
            $("#games_panel").hide();
            $("#skin_panel").hide();
            $("#com_panel").hide();
            $("#plg_panel").hide();
            $("#ext_panel").hide();
            $('.dark').removeClass('dark');
            $('.icon.mega').addClass('dark');
            
            if ($('.header').not(':visible'))
            {
                $(".header").slideDown("fast");
                $("#toggle_h").clearRotation();
                $("#toggle_h").rotate({ angle: 0 });
            }
            
            $('#itemModal').modal('show');
            // blur
            $('.flex_box').addClass('blur');
            $('#videoContainment').addClass('blur medium');
            console.log("selected item id: "+id);
            //fetch modal content via ajax
            $.getJSON('./app/ajax/ajaxSingleItem.php?id='+id, function(data) {
                $('.modal-banner-img').attr('src', data.banner_l);
                $('.modal-icon').attr('src', data.icon);
                $('.modal-version').html("<h2 class='modal-banner-name'>"+data.item_name+"</h2><br/>Author: <a href='#'>" + data[17].author + "</a> <br/> Version: <a>" + data.version + "</a>");
                $('.modal-description').text(data.desc_l);
            });

            DownloadFilter(id);
        },
        //login route
        'login': function() {
            responsiveVoice.speak("Access granted. Welcome back.");
            setTimeout(function() {routie('');}, 1500);
        },
        //account activation
        'activation': function() {
            responsiveVoice.speak("Welcome to Mega Voice Command.");
            setTimeout(function() {routie('');}, 1500);
        },
        //Change password
        'password': function() {
            responsiveVoice.speak("Your password has been changed, please login to continue.");
            setTimeout(function() {routie('');}, 1500);
        },
        //Change password
        'upgrade': function() {
            responsiveVoice.speak("Your profile has been updated to security level 2.");
            setTimeout(function() {routie('');}, 1500);
        },
        // logout route
        'logout': function() {
            responsiveVoice.speak("Access successfully terminated. Have a nice day.");
            Lobibox.notify('success', {
                size: 'mini',
                rounded: true,
                sound: true,
                delayIndicator: false,
                msg: 'Successfully logged out! '
            });
            routie('');
        },
        'ref/:url': function(url) {
            responsiveVoice.speak("The Page, that you are looking for, needs authorization. Please login, and I will take you right back where you left off.");
            var ref = window.atob(url);
            sessionStorage.setItem("ref", ref);
            console.log("reference URL = "+ref);
            routie('');
            Lobibox.notify('info', {
                size: 'mini',
                rounded: true,
                sound: true,
                delayIndicator: false,
                msg: 'Please Login to Continue. '
            });
        }
    });
    //routes end

    //nicescroll
    // $(".contents").niceScroll();

    //stepper
    sendEvent = function(sel, step) {
        $(sel).trigger('next.m.' + step);
    }

    //soundcloud toggle
    $(document).on("click","button[name='fire_soundcloud']", function (e) {
        $("#scpanel").slideToggle("fast");
    });

    //placepicker init
    $(".placepicker").placepicker();

    //single item modal init
    $(document).on('click', '.store_page_item', function() {
        var id = $(this).data('id');
        $('#itemModal').modal('show');
        // blur
        $('.flex_box').addClass('blur');
        $('#videoContainment').addClass('blur medium');
        console.log("selected item id: "+id);
        //fetch modal content via ajax
        $.getJSON('./app/ajax/ajaxSingleItem.php?id='+id, function(data) {
            $('.modal-banner-img').attr('src', data.banner_l);
            $('.modal-icon').attr('src', data.icon);
            $('.modal-version').html("<h2 class='modal-banner-name'>"+data.item_name+"</h2><br/>Author: <a href='#'>" + data[17].author + "</a> <br/> Version: <a>" + data.version + "</a>");
            $('.modal-description').text(data.desc_l);
            $('.btn-share').attr('data-clipboard-text', "https://westenets.com/mvc/#product/"+data.id);
            var clipboard = new ClipboardJS('.btn-share', {
                container: document.getElementById('itemModal'),
                text: function(trigger) {
                    return trigger.getAttribute('data-clipboard-text');
                }
            });
            clipboard.on('success', function(e) {
                $('.btn-share').attr('aria-label', "Link Copied !");
                $('.btn-share').addClass('tooltipped tooltipped-w');
                e.clearSelection();

                setTimeout(function() {$('.btn-share').removeClass('tooltipped tooltipped-w');}, 5000);
            });
            
            clipboard.on('error', function(e) {
                $('.btn-share').attr('aria-label', "Copy Failed !");
                $('.btn-share').addClass('tooltipped tooltipped-w');
                setTimeout(function() {$('.btn-share').removeClass('tooltipped tooltipped-w');}, 5000);
            });
        });
        DownloadFilter(id);
    });

    $('#itemModal').on('hidden.bs.modal', function() {
        $('.flex_box').removeClass('blur');
        $('#videoContainment').removeClass('blur medium');

        var route = window.location.hash.substr(1);
        if(~route.indexOf("product")) {
            routie('');
        }
    });
    $(document).on('click', '.homeModalBtn', function() {
        $('#HomeModal').modal('hide');
        routie('links');
    });
    $(document).on('click', '.btn-login-focus', function() {
        $('#itemModal').modal('hide');
        routie('');
        setTimeout(function() {$("#user").focus();}, 500);
    });
    $(document).on('click', '.free',function(event) {
        var item_id = $(this).attr('aria-id');
        var base64_id = window.btoa(item_id);
        var element = this;
			
        $.ajax({        
            type: "POST",
            url: "./app/ajax/free_purchase.php",
            data:'id='+item_id,
            cache:false,
            context: this,
            beforeSend: function()
            {
                $('.free').prop("disabled", true);
                $(".free").html('Purchasing...');
            },
            success: function() {
                $(element).prop("disabled", false);
                $(element).html('Install');
                $(element).removeClass('free');
                $(element).addClass('purchased');
                $(element).attr("href", 'links:'+base64_id);
                RunProtocol("links:"+base64_id, event);
            }
        });
    });
    $(document).on('click', '.purchased', function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var url = $(this).attr('href');
        RunProtocol(url, e);
    })
    //single item init end

    //toggle header//
    $("#toggle_h").click(function() {
        $(".header").toggle("blind", "fast", function() {
            $("#toggle_h").rotate({ angle: 180, speed: 0.5 });
        });
    });

    //tooltip
    $('.navicons a').hover(
        function() {   
             var title = $(this).attr("data-title");
          $(document).find(".tip").shuffleLetters({ "text": title });
        }, function() {
          $(document).find(".tip").html("");
        }
    );
    $('.navicons a').click(
        function() {   
                var title = $(this).attr("data-title");
            $(document).find(".tip").shuffleLetters({ "text": title });
            }, function() {
            $(document).find(".tip").html("");
            }
    );
    //tooltip end
    //home modal init
    $('#HomeModal').on('show.bs.modal', function() {
        $('.flex_box').addClass('blur');
        $('#videoContainment').addClass('blur medium');
        if($('.home-tab-content').is(':empty')) {
            LoadHomeModal();
        }
    });
    $('#HomeModal').on('hidden.bs.modal', function() {
        $('.flex_box').removeClass('blur');
        $('#videoContainment').removeClass('blur medium');
    });
    // ./home modal init
});


//load youtube
function LoadYoutube() {
    $.getJSON('./app/ajax/ajaxSettings.php', function(data) { 
        $('#youmax').youmax({
			apiKey:'AIzaSyBNqmi7KATGcxofS8dWGuZrhNXBIvyjaF0',
			youTubeChannelURL: data.yt_link,
			youmaxDefaultTab:"UPLOADS",
			youmaxColumns:3,
			showVideoInLightbox:true,
			maxResults:15
		});
    });
}
function goClicked() {
    $('#youmax').empty().append('loading ...');
    
    LoadYoutube();
}

//item load function
$(document).on('click', '.show-loader', function() {
    var cat_id = $(this).data('id');
    EasyLoading.show({
        text: "",
        button: null,
        type: EasyLoading.TYPE.BALL_SCALE_RIPPLE_MULTIPLE
    });
});

function LoadItemsList(cat_id) {
    var options = {
        valueNames: [{ data: ['id'] }, 'name', { name: 'banner', attr: 'src' }, 'desc', { name: 'icon', attr: 'src' }],
        item:   '<div class="store_page_item" data-id="">'+
                    '<div class="store_banner">'+
                        '<img src="" class="img-responsive banner"/>'+
                    '</div>'+
                    '<div class="store_details">'+
                        '<div class="store_description">'+
                            '<h3 class="name"></h3>'+
                            '<p class="desc"></p>'+
                        '</div>'+
                        '<div class="store_icon">'+
                            '<img src="" class="img-responsive icon"/>'+
                        '</div>'+
                    '</div>'+
                '</div>',
        page: 12,
        pagination: true,
        indexAsync: true
    }
    if($('.store_page_item').is(":visible")) {
        var itemList = new List('store_page'+cat_id, options).clear();
    }
    
    
    $.getJSON('./app/ajax/ajaxList.php?id='+cat_id, function(data) {
        setTimeout(function() {
            var itemList = new List('store_page'+cat_id, options, data);
        }, 500);
        
    }).always(function() {
        EasyLoading.hide();
        EasyLoading.destroy();
    });;
}

//Load Home Modal
function LoadHomeModal() {
    $.getJSON('./app/ajax/ajaxHomeContent.php', function(data) {
        $.each(data, function(i) {
            // console.log(data[i].id);
            var className = "";
            if(data[i].id == 1) {className = "active";}
            $('.home-tabs').append('<li role="presentation" class="'+className+'"><a href="#home'+data[i].id+'" aria-controls="home'+data[i].id+'" role="tab" data-toggle="tab"><span class="circle-icon">'+data[i].id+'</span>'+data[i].title+'</a></li>')
            $('.home-tab-content').append('<div role="tabpanel" class="tab-pane '+className+'" id="home'+data[i].id+'">'+
            '<div class="row">'+
            '<div class="home_page_header col-sm-12">'+
				'<img src="'+data[i].icon+'" class="store_page_logo"/>'+
				data[i].title+
            '</div>'+
            '<div class="home_page_desc col-sm-12">'+
                '<p>'+data[i].desc_l+'</p>'+
            '</div></div>'+
            '</div>');
        })
    });
}

//reference redirect
function GetReference() {
    var url = window.location.hash.substr(1);
    if (~str.indexOf("ref")) {
        var ref = url.split('=');
        var redirectURL = window.atob(ref[1]);
        console.log(redirectURL);
    }
}
// ./reference redirect
// contact us modal
$('textarea').blur(function () {
    $('#hire textarea').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
		  $('textarea.focused + label').css({'background': '#41a85f'});
		  $('textarea.focused + label').css({'color': '#FFF'});
        }
        else {
          $this.removeClass('focused');
          $('textarea + label').css({'background': '#313a3d'});
		  $('textarea + label').css({'color': '#fff'});
        }
    });
});
$('select').blur(function () {
    $('#type').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
		  $('select.focused + label').css({'background': '#41a85f'});
		  $('select.focused + label').css({'color': '#FFF'});
		  var e = document.getElementById("type");
		  var option = e.options[e.selectedIndex].text;
		  document.getElementById('typelbl').innerHTML = 'Type : ' + option;
        }
        else {
          $this.removeClass('focused');
          $('select + label').css({'background': '#313a3d'});
		  $('select + label').css({'color': '#fff'});
        }
    });
});

$('#hire .field:first-child input').blur(function () {
    $('#hire .field:first-child input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('.field:first-child input + label').css({'background': '#41a85f'});
		  $('.field:first-child input + label').css({'color': '#FFF'});
        }
        else {
          $this.removeClass('focused');
          $('.field:first-child input + label').css({'background': '#313a3d'});
		  $('.field:first-child input + label').css({'color': '#fff'});
        }
    });
});

$('#hire .field:nth-child(2) input').blur(function () {
    $('#hire .field:nth-child(2) input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('.field:nth-child(2) input + label').css({'background': '#41a85f'});
		  $('.field:nth-child(2) input + label').css({'color': '#FFF'});
        }
        else {
          $this.removeClass('focused');
          $('.field:nth-child(2) input + label').css({'background': '#313a3d'});
		  $('.field:nth-child(2) input + label').css({'color': '#fff'});
        }
    });
});
$('#hire .field:nth-child(3) input').blur(function () {
    $('#hire .field:nth-child(3) input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('.field:nth-child(3) input + label').css({'background': '#41a85f'});
		  $('.field:nth-child(3) input + label').css({'color': '#FFF'});
        }
        else {
          $this.removeClass('focused');
          $('.field:nth-child(3) input + label').css({'background': '#313a3d'});
		  $('.field:nth-child(3) input + label').css({'color': '#fff'});
        }
    });
});
//forget password modal
$('.redo1').click(function() {
    $('.panel-body').show().addClass('animate');
    $('.success').hide().removeClass('animate');
});

$('.redo2').click(function() {
    $('.panel-body').show().addClass('animate');
    $('.error').hide().removeClass('animate');
});
//draw download btn by filter
function DownloadFilter(id) {
    $.getJSON('./app/ajax/ajaxDownloadFilter.php?product_id='+id, function(data) {
        if(data.paypal) {
            $('#Downloadbtn').hide();
            $('#PaypalBtn').show();
            $('#PaypalBtn').html(data.text);
            $('#itemname').val(data.name);
            $('#itemprice').val(data.price);
            $('#itemdesc').val(data.desc);
            $('#itemnumber').val(data.txnID);
        }
        else {
            $('#Downloadbtn').show();
            $('#PaypalBtn').hide();
            if(data.class) {
                $('#Downloadbtn').addClass(data.class);
            }
            if(data.target_blank) {
                $('#Downloadbtn').attr("target", "_blank");
            }
            if(data.download) {
                $('#Downloadbtn').attr("download", data.download);
            }
            if(data.id) {
                $('#Downloadbtn').attr("aria-id", data.id);
            }
            if(data.url) {
                $('#Downloadbtn').attr("aria-href", data.url);
            }
    
            $('#Downloadbtn').html(data.text);
            $('#Downloadbtn').attr("href", data.href);
        }
    });
}
//protocol check function
function RunProtocol(url, event) {
    window.protocolCheck(url, function () {
        $('#itemModal').modal('hide');
        responsiveVoice.speak("You need to Install Store Desktop app, to Contibue Installing the product you purchased.");
        Lobibox.notify('info', {
            size: 'mini',
            rounded: true,
            sound: true,
            delayIndicator: false,
            msg: 'Please Download Store Desktop App to Continue ! '
        });
        setTimeout(function() {window.location.href = "https://www.mega-voice-command.com/#product/3";}, 3000)
    });
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
}
