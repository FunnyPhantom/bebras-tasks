/*
  usage : 
     index.html
  or
     index.html?dev=1
*/

//-----------------------------------------------------------------------------

// To get the value associated with a param in URI

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
       return null;
    } else {
       return results[1] || 0;
    }
}

//-----------------------------------------------------------------------------

// To draw completion stars

var getStarSVGfull = function() { return '<svg height="17.099999999999998" version="1.1" width="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.2</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="#ffc90e" stroke="#000000" d="M46.761,-0.11711L62.135000000000005,26.19589L91.911,32.68589L71.637,55.43889L74.666,85.76389L46.760999999999996,73.51289L18.856999999999996,85.76389L21.884999999999994,55.43889L1.6109999999999935,32.68589L31.386999999999993,26.19589Z" stroke-width="5" transform="matrix(0.18,0,0,0.18,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path></svg>'; }

var getStarSVGempty = function() { return '<span id="tabScore_medium0_empty" class="emptyStar"><svg height="17.099999999999998" version="1.1" width="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.984375px; top: -0.59375px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.2</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="#ffffff" stroke="#000000" d="M46.761,-0.11711L62.135000000000005,26.19589L91.911,32.68589L71.637,55.43889L74.666,85.76389L46.760999999999996,73.51289L18.856999999999996,85.76389L21.884999999999994,55.43889L1.6109999999999935,32.68589L31.386999999999993,26.19589Z" stroke-width="5" transform="matrix(0.18,0,0,0.18,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path></svg></span>'; }


//-----------------------------------------------------------------------------

// To extract code and text-id from path

var extractShortCode = function(code) {
   return (code.match(/20..-([^\\-]*-[^\\-]*).*/))[1];
};

var extractTextCode = function(code) {
   return (code.match(/20..-[^\\-]*-[^\\-]*-(.*)/))[1];
};

//-----------------------------------------------------------------------------

// To build link to version

var getLinkTask = function(code, options, language) {
   var sOptions = '';
   if (options != null) {
      var arg = "{";
      for (var key in options) {
         if (arg.length > 1)
            arg += ",";
         var value = options[key];
         arg += "\"" + String(key) + "\":\"" + String(value) + "\"";
      }
      arg += "}";
      sOptions = "?options=" + encodeURIComponent(arg); 
   }
   var file = (language == undefined || language == "fr") ? "index.html" : "index_" + language + ".html";
   return code + "/" + file + sOptions;
};

//-----------------------------------------------------------------------------

// Action handlers

function loadTask(taskCode) {
   $('#iframe').attr('src', taskCode);
   $('#iframe').css('display', "block");
   $('#task_icons').css('display', "none"); 
};

//-----------------------------------------------------------------------------

var standaloneLoadPage = function() {

  //------------------------------
  // Configuration

  var links = ($.urlParam('links') == "1") ? true : false;
  var dev = ($.urlParam('dev') == "1") ? true : false;
  if (dev) { 
    links = true;
  }

  //------------------------------
  // Versions

  var difficulties = ["easy", "medium", "hard"];

  //------------------------------
  // Main html contents

  var getHtmlContents = function() { 
    /*
              <!--<td id="header_score">Score&nbsp;:<br/><b>214 points</b></td> \
              <td id="header_time">Temps restant&nbsp;: <br/><b>38 minutes</b></td>--> \
              <!--<td id="header_space"></td>-->

    */
    return ' \
    <div id="main_wrapper"> \
     <div id="main"> \
        <div id="header"> \
           <table id="header_table"> \
           <tr> \
              <td id="header_logo"><img id="header_logo_img" src="../icons/castor_small.png" /></td> \
              <td id="header_title"></td> \
              <td id="header_button"> \
                <input id="button_return_list" type="button" value="Retour à la liste des exercices"></input> \
              </td> \
           </tr> \
           </table> \
        </div> \
        \
        <div id="header_sep_top"></div> \
        <div class="layout_table_wrapper"> \
          <div id="task_icons"></div> \
        </div> \
        <div class="layout_table_wrapper"> \
         <iframe id="iframe" src="../demo_files/presentation.html" frameborder="0"></iframe> \
        </div> \
        \
        <div id="header_sep_bottom"></div>  \
        \
        <div id="all_icons"></div>  \
        \
     </div><!--main--> \
     </div><!--main_wrapper--> \
    ';
  };

  //------------------------------

    $(document).ready(function() {

       // --- Setting up page elements ---

       $("#body").html(getHtmlContents());
       $("#header_title").html(standaloneContents.title);
       $("#button_return_list").click(function() {
           $('#iframe').css('display', "none");
           $('#task_icons').css('display', "block");  
        });
       $("#task_icons").css("display", "block");

       // --- Setting up of tasks table ---

       var tasks = standaloneContents.tasks;
       for (var iTask = 0; iTask < tasks.length; iTask++) {
          var task = tasks[iTask];

          // options for link generation
          var options = task.options;

          // image and main link
          var targetNormal = getLinkTask(task.code, options);
          //options.difficulty = "easy";
          //var targetNormalEasy = getLinkTask(task.code, options);
          var onclick = " onclick=\"loadTask('" + targetNormal + "')\" ";
          var iconTitle = '<div class="icon_title">' + task.title + '</div>';
          var iconImg = '<div class="icon_img"><table><tr><td class="icon_img_td" style="vertical-align: middle;"><img src="' + task.code + '/icon.png"  ' + onclick + '/></td></tr></table></div>';
    
          // stars
          var stars = '';
          for (var i = 0; i < 4; i++) {
             stars += (i < 2) ? getStarSVGfull() : getStarSVGempty();
          }
          var iconStars = '<div class="icon_stars">' + stars + '</div>';

          // standalone links
          var iconLink = '';
          if (links) {
            var textTitle = extractTextCode(task.code);
            var shortCode = extractShortCode(task.code);
            var sLinkTitle = (dev) ? (shortCode + " " + textTitle) : task.title; // "Lien direct";
            var sLinkStyle = (dev) ? "icon_link_text_black" : "icon_link_text_link";
            var sLink = '<a class="' + sLinkStyle + '" target = "_blank" href="' + targetNormal + '">' + sLinkTitle + '</a>';
            iconLink = '<div class="icon_link">' + sLink + '</div>';
          }

          // development links
          var iconDev = '';
          if (dev) { 
            var versionTargets = [];
            for (var iDifficulty = 0; iDifficulty < difficulties.length; iDifficulty++) {
               var diff = difficulties[iDifficulty];
               if (diff == "easy")
                  diff = "1";
               if (diff == "medium")
                  diff = "2";
               if (diff == "hard")
                  diff = "3";
               options.difficulty = difficulties[iDifficulty];
               var targetNormal = getLinkTask(task.code, options);
               var optionsSol = jQuery.extend({}, options);
               optionsSol.showSolutionOnLoad = "1";
               var targetSol = getLinkTask(task.code, optionsSol);            
               var targetEnglish = getLinkTask(task.code, optionsSol, "en");            
               versionTargets.push({normal: targetNormal, solution: targetSol, english: targetEnglish});
            }
            var sDev = "";
            sDev += " <a href='" + versionTargets[0].normal + "' style='color:black'>[T1]</a>";
            sDev += " <a href='" + versionTargets[1].normal + "' style='color:black'>[T2]</a>";
            sDev += " <a href='" + versionTargets[2].normal + "' style='color:black'>[T3]</a>"; 
            sDev += "&nbsp;&nbsp;&nbsp;";
            sDev += " <a href='" + versionTargets[0].solution + "' style='color:black'>[S1]</a>";
            sDev += " <a href='" + versionTargets[1].solution + "' style='color:black'>[S2]</a>";
            sDev += " <a href='" + versionTargets[2].solution + "' style='color:black'>[S3]</a>"; 
            //sDev += "&nbsp;&nbsp;";
            //sDev += "<a href='" + versionTargets[0].english + "' style='color:black'>[en1]</a>";
            sDev += "<br/><br/>";
            iconDev = '<div class="icon_dev">' + sDev + '</div>';
          }

          $("#task_icons").append('<div class="icon"><div ' + onclick + '>' + iconTitle + iconImg + iconStars + '</div>' +  iconLink + iconDev + '</div>');
       }


       // --- Generation of the image with combined icons ---
       
       if (dev) {
         $("#all_icons").css('display', "block");
         $("#all_icons").append("<table>");
         for (var iTask = 0; iTask < tasks.length; iTask++) {
            var task = tasks[iTask];
            if (iTask % 4 == 0) {
               $("#all_icons").append("<tr>");
            }
            $("#all_icons").append("<td><div class='icon_img'><img src='" + task.code + "/icon.png'></div></td>");
            if (iTask % 4 == 3) {
               $("#all_icons").append("</tr>");
            }
         }
         $("#all_icons").append("</table>");
       }


   });

}