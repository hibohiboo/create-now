
[loadcss file="./data/others/plugin/dice/dice.css"]

[macro name="dice"]

[iscript]

//[dice array_dice="6,6" array_result="3,3" ]

var j_viewDiceArea = $('<div class="viewDiceArea" trpg="viewDiceArea"></div>');

j_viewDiceArea.css("z-index",999999);

var frame_width = 499 ;
var frame_height = 400 ;

var array_dice = mp.array_dice.split(",");
var array_result = mp.array_result.split(",");
var chara_name = "" ;

var timerID = 0;

if(mp.chara_name){
    chara_name = mp.chara_name;
}

//this.j_viewDiceArea.empty();

var dice_eye_html = {
    2:"<i></i>",
    3:"<i></i>",
    4:"<i></i><i></i>",
    6:"<i></i><i></i><i></i>",
    8:"<i></i><i></i><i></i>",
    10:"<i></i><i></i><i></i><i></i>",
    12:"<i></i><i></i><i></i><i></i><i></i><i></i>",
    20:"<i></i><i></i><i></i><i></i>",
    100:"<i></i><i></i><i></i><i></i>"
};


function rand(max_number,min_number){

    var fix_number = Math.floor( Math.random() * (max_number + 1 - min_number) ) + min_number ;
    return fix_number;    

}

//ダイスを投げる
for(var i in array_dice){
    
    var left = rand(-300,300); 
    var top = rand(-300,100); 
    
    var d = array_dice[i]
    var result = array_result[i]
    
    var html = '';

    if(d ==="100"){
        
        var result_one = "";
        var result_two = "";
        
        result = parseInt(result);
        
        if(result < 10){
            result_two = "00";
            result_one = result;
        }else if(result==100){
            result_two = "00";
            result_one = "0";
        }else{
            var sep = (""+result).split("");
            result_two = sep[0]+"0";
            result_one = sep[1];
        }
        
             
        //10のくらい
        html += '<div class="diceFigWrap" style="margin-left: '+left+'px; margin-top: '+top+'px">';
	    html +=    '<div class="diceFig dice'+100+' current'+result_two+'">'+dice_eye_html[100]+'</div>'
        html += '</div>';    
        j_viewDiceArea.append($(html));
    
        //１のくらい
        html += '<div class="diceFigWrap" style="margin-left: '+(left+50)+'px; margin-top: '+top+'px">';
	    html +=    '<div class="diceFig dice'+10+' current'+result_one+'">'+dice_eye_html[10]+'</div>'
        html += '</div>';    
        j_viewDiceArea.append($(html));
        
        
        
    }else{
        
        //current0 対策
        if(d==10 && result==10){
            result=0;
        }
        
        html += '<div class="diceFigWrap" style="margin-left: '+left+'px; margin-top: '+top+'px">';
	    html +=    '<div class="diceFig dice'+d+' current'+result+'">'+dice_eye_html[d]+'</div>'
        html += '</div>';    
        
        j_viewDiceArea.append($(html));
       
        
    }
    
    
}


//サイコロの効果音
/*
if(array_dice.length==1){
    app.gameManager.cmp.sound.playAudio("2",{storage:"/trpg/studio/sound/dice_1.mp3",loop:false});
}else{
    app.gameManager.cmp.sound.playAudio("2",{storage:"/trpg/studio/sound/dice_2.mp3",loop:false});
}
*/



$("#tyrano_base").append(j_viewDiceArea);

clearTimeout(timerID);
timerID = setTimeout(function(){
    
    j_viewDiceArea.fadeOut(1000,function(){
        j_viewDiceArea.empty();
        j_viewDiceArea.hide();
    });
    
},5000);


[endscript]

[wait time=4000]
[text val=%result_str ]
[p]

[endmacro]

[return]