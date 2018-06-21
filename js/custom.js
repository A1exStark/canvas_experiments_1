
var wall = "Глянцевый";
var ColorText;

$(function() {
    
    function replaceAll(str, what, to) { 
       return str.split(what).join(to); 
    } 
    
    
    
    
    $("#input_color p#wall_item span").click(function(){
        $("#input_color p#wall_item span").removeClass("act");
        var id = $(this).addClass("act").attr("id");
        wall = $(this).text();
        $("#input_color .input_color_wall div.pollo").hide();
        id = id.replace("_point","");
        $("#input_color .input_color_wall div#"+id).show();
        if(id == "lacquered") {
            $("img#potolok").show();
        } else {
            $("img#potolok").hide();
        }
        if(id == "sateen") {
            $("img#sateen").show();
        } else {
            $("img#sateen").hide();
        }
    });
    
    $("#input_color .input_color_wall span").click(function(){
        var color = $(this).attr("class");
        color = color.replace("_","");
        var text = $(this).attr("id");
        ColorText = replaceAll(text,"_"," ");
        $("#room_color #wall").css("background","#"+color);
        $("p#your_choice span#color_bottom").css("background","#"+color).addClass("color_bottom_shadow");
        $("p#your_choice span#color_bottom_text_our").addClass("color_bottom_text_our_show");
        $(".measurement_dop").show();
        $("p#your_choice span#color_bottom_text").text(wall+" ("+ColorText+")");
        $("#input_color .input_color_wall span").html("");
        $(this).html("<div></div>");
    });
    
    $("#input_color .input_color_floor span").click(function(){
        var color = $(this).attr("class");
        color = color.replace("_","");
        $("#room_color #floor").css("background","#"+color);
        $("#input_color .input_color_floor span").html("");
        $(this).html("<div></div>");
    });
    
    $("#input_color .input_color_ceiling span").click(function(){
        var color = $(this).attr("class");
        color = color.replace("_","");
        $('#ceiling').maphilight({ fillColor: color });
        $('#area').data('maphilight', data).trigger('alwaysOn.maphilight');
        $("#input_color .input_color_ceiling span").html("");
        $(this).html("<div></div>");
    });
    
    $("#input_color p#floor_item span").click(function(){
        $("#input_color p#floor_item span").removeClass("act");
        var id = $(this).addClass("act").attr("id");
        if(id == "laminate_point") {
            $("img#laminat").show();
            $("img#carpeting").hide();
            $("#input_color .input_color_floor #laminate").show();
            $("#input_color .input_color_floor #carpeting").hide();
        } else {
            $("img#laminat").hide();
            $("img#carpeting").show();
            $("#input_color .input_color_floor #laminate").hide();
            $("#input_color .input_color_floor #carpeting").show();
        }
    });
    
    $(".measurement_dop").hover(

        function(){
            $(this).addClass("measurement_dop_hov");
        },
        function(){
            $(this).removeClass("measurement_dop_hov");
        }

    );
  
});