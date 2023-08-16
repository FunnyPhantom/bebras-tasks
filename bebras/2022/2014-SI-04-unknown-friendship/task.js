function initTask (subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      easy: {
         graph: { "vertexInfo": { "0":{}, "1":{}, "2":{}, "3":{}, "4":{}, "5":{} },
                  "edgeInfo": { "53":{}, "03":{}, "54":{}, "12":{}, "41":{}, "52":{}, "51":{}, "23":{} },
                  "edgeVertices": { "53": ["5","3"], "03": ["0","3"], "54": ["5","4"], "12": ["1","2"], 
                                    "41": ["4","1"], "52": ["5","2"], "51": ["5","1"], "23": ["2","3"] },
                  "directed": false },
         vertexPos: { 
            "0":{ "x": 200, "y": 110 }, 
            "1":{ "x": 550, "y": 200 }, 
            "2":{ "x": 560, "y": 70 }, 
            "3":{ "x": 380, "y": 40 }, 
            "4":{ "x": 170, "y": 210 }, 
            "5":{ "x": 370, "y": 140 } }, 
         paperH: 270
      },
      medium: {
         graph: { "vertexInfo": { "0":{}, "1":{}, "2":{}, "3":{}, "4":{}, "5":{}, "6":{}, "7":{} },
                  "edgeInfo": { "53":{}, "03":{}, "54":{}, "12":{}, "41":{}, "52":{}, "51":{}, "76":{}, "63":{}, "27":{} },
                  "edgeVertices": { "53": ["5","3"], "03": ["0","3"], "54": ["5","4"], "12": ["1","2"], 
                                    "41": ["4","1"], "52": ["5","2"], "51": ["5","1"], "76": ["7","6"],
                                    "63": ["6","3"], "27": ["2","7"] },
                  "directed": false },
         vertexPos: { 
            "0":{ "x": 200, "y": 160 }, 
            "1":{ "x": 550, "y": 250 }, 
            "2":{ "x": 560, "y": 120 }, 
            "3":{ "x": 380, "y": 90 }, 
            "4":{ "x": 170, "y": 260 }, 
            "5":{ "x": 370, "y": 190 },
            "6":{ "x": 170, "y": 20 },
            "7":{ "x": 510, "y": 30 } }, 
         paperH: 350
      },
      hard: {
         graph: { "vertexInfo": { "0":{}, "1":{}, "2":{}, "3":{}, "4":{}, "5":{}, "6":{}, "7":{}, "8":{}, "9":{}, "10":{}, "11":{} },
                  "edgeInfo": { "56":{}, "02":{}, "510":{}, "12":{}, "41":{}, "52":{}, "711":{}, "76":{}, "68":{}, "24":{}, "811":{}, "43":{}, "01":{}, "31":{}, "23":{}, "59":{}, "98":{}, "1110":{}, "410":{} },
                  "edgeVertices": { "56": ["5","6"], "02": ["0","2"], "510": ["5","10"], "12": ["1","2"], 
                                    "41": ["4","1"], "52": ["5","2"], "711": ["7","11"], "76": ["7","6"],
                                    "68": ["6","8"], "24": ["2","4"], "811": ["8","11"], "43": ["4","3"],
                                    "01": ["0","1"], "31": ["3","1"], "23": ["2","3"], "59": ["5","9"],
                                    "98": ["9","8"], "1110": ["11","10"], "410": ["4","10"] },
                  "directed": false },
         vertexPos: { 
            "0":{ "x": 600, "y": 120 }, 
            "1":{ "x": 320, "y": 20 }, 
            "2":{ "x": 460, "y": 220 }, 
            "3":{ "x": 300, "y": 120 }, 
            "4":{ "x": 120, "y": 120 }, 
            "5":{ "x": 270, "y": 260 },
            "6":{ "x": 500, "y": 300 },
            "7":{ "x": 600, "y": 400 },
            "8":{ "x": 360, "y": 440 }, 
            "9":{ "x": 270, "y": 350 }, 
            "10":{ "x": 120, "y": 400 },  
            "11":{ "x": 320, "y": 520 } }, 
            
         paperH: 600
      }
   };
   var graph;
   var vGraph;
   var cellHeight = 40;
   var cellWidth = 80;
   var edgeAttr = {'stroke': 'black', 'stroke-width': 3};
   var vertexAttr = {'width': cellWidth, 'height': cellHeight, 'fill': '#E0E0F8', 'opacity':1}
   var castors;
   var containers = [[],[]];
   var paperW = 700;
   var paperH;
   var tailleLettreCastor = 20;
   var beaverInCell = [[], []];

   // note: in "easy" mode, only 6 first nodes are considered
   var names = ["Anna", "Bob", "Julie", "Léa", "Marc", "Paul", "Théo", "Yann", "Noé", "Éva", "Mehdi", "Sam"];
   var positions;
   var edges;
   var nbNodes;
   var nbEdges;
   var dxText = cellWidth / 2;
   var dyText = cellHeight / 2;
   var randGen;

   subTask.loadLevel = function(curLevel) {
      if(respEnabled){
         displayHelper.responsive = true;
         // displayHelper.hideSolutionButton = true;
         convertDOM();
      }else{
         displayHelper.responsive = false;
      }
      level = curLevel;
      graph = Graph.fromJSON(JSON.stringify(data[level].graph));
      nbNodes = graph.getVerticesCount();
      nbEdges = graph.getEdgesCount();
      paperH = data[level].paperH;
      randGen = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      randGen.shuffle(names);

      displayHelper.taskH = paperH;
      displayHelper.taskW = paperW;
      displayHelper.minTaskW = 500;
      displayHelper.maxTaskW = 900;
   };

   subTask.getStateObject = function() {
      return state;
   };

   subTask.reloadAnswerObject = function(answerObj) {
      answer = answerObj;
      if(answer){
         randGen.reset(answer.seed);
      }
   };

   subTask.resetDisplay = function() {
      displayError("");
      writeNames();
      drawPaper();
      initOverlays();
      reloadAnswer();
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = { "pos": [], "seed": randGen.nextInt(0,1000) };
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         defaultAnswer.pos[iCastor] = [0, iCastor];
      }
      return defaultAnswer;
   };

   subTask.unloadLevel = function(callback) {
      stopAnimation();
      callback();
   };

   function getResultAndMessage() {
      var result;
      innerReloadAnswer();
      if (! allPlaced()) {
         result = { successRate: 0, message: taskStrings.placeNamesOnRectangles };
      } else if (isCorrect()) {
         result = { successRate: 1, message: taskStrings.success };
      } else {
         result = { successRate: 0, message: taskStrings.failure };
      }
      return result;
   }

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function initOverlays() {
      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h,nbOver;
      if(level == "easy"){
         nbOver = 18;
      }else if(level == "medium"){
         nbOver = 21;
      }else{
         nbOver = 25;
      }
      for(var iOver = 1; iOver <= nbOver; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = 15;
               break;
            case 2:
               x = 0; y = 15;
               w = 19;
               h = paperH - y;
               break;
            case 3:
               x = (level != "hard") ? 640 : 680; 
               y = 15;
               w = paperW - x;
               h = paperH - y;
               break;
            case 4:
               x = 19; 
               y = 15 + nbNodes*cellHeight;
               w = (level != "hard") ? paperW - x : 300;
               h = paperH - y;
               break;
            case 5:
               x = 19 + cellWidth; 
               y = 15;
               w = (level != "hard") ? 70 : 21;
               h = paperH - y;
               break;
            case 6:
               x = 19 + cellWidth;
               y = 15;
               w = paperW - x; 
               h = (level == "easy") ? 24 : 5;
               break;
            case 7:
               x = 19 + cellWidth;
               y = (level != "medium") ? 15 : 60;
               w = (level != "hard") ? 280 : 221;
               if(level == "easy"){
                  h = 95;
               }else if(level == "medium"){
                  h = 100;
               }else{
                  h = 105;
               }
               break;
            case 8:
               if(level == "easy"){
                  x = 460; 
                  h = 55;
               }else if(level == "medium"){
                  x = 250;
                  h = 15;
               }else{
                  x = 400;
                  h = 105;
               }
               y = 15;
               w = paperW - x;
               break;
            case 9:
               if(level == "easy"){
                  x = 168; 
                  y = 250;
               }else if(level == "medium"){
                  x = 168;
                  y = 300;
               }else{
                  x = 318;
                  y = 560;
               }
               w = paperW - x;
               h = paperH - y;
               break;
            case 10:
               if(level == "easy" || level == "medium"){
                  x = 168; 
                  y = (level == "easy") ? 110 : 160;
                  w = 32;
                  h = 100;
               }else{
                  x = 120; 
                  y = 159;
                  w = 150;
                  h = 240;
               }
               break;
            case 11:
               if(level == "easy"){
                  x = 460; 
                  y = 70;
                  w = 100;
                  h = 130;
               }else if(level == "medium"){
                  x = 250;
                  y = 20;
                  w = 260;
                  h = 70;
               }else{
                  x = 319;
                  y = 60;
                  w = 82;
                  h = 59;
               }
               break;
            case 12:
               if(level == "easy"){
                  x = 280; 
                  y = 80;
                  w = 180;
                  h = 60;
               }else if(level == "medium"){
                  x = 590; 
                  y = 30;
                  w = 50;
                  h = 90;
               }else{
                  x = 380;
                  y = 119;
                  w = 220;
                  h = 100;
               }
               break;
            case 13:
               if(level == "easy"){
                  x = 450; 
                  y = 110;
                  h = 90;
               }else if(level == "medium"){
                  x = 460; 
                  y = 70;
                  h = 50;
               }else{
                  x = 540;
                  y = 159;
                  h = 140;
               }
               w = paperW - x;
               break;
            case 14:
               if(level == "easy" || level == "medium"){
                  x = 200; 
                  y = (level == "easy") ? 150 : 200;
                  h = 60;
                  w = 170;
               }else{
                  x = 270;
                  y = 159;
                  h = 100;
                  w = 190;
               }
               break;
            case 15:
               if(level == "easy" || level == "medium"){
                  x = 250; 
                  y = (level == "easy") ? 180 : 230;
                  w = 300;
                  h = paperH - y;
               }else{
                  x = 350;
                  y = 259;
                  h = 180;
                  w = 150;
               }
               break;
            case 16:
               if(level == "easy" || level == "medium"){
                  x = 280; 
                  y = 140;
                  w = 90;
                  h = 80;
               }else{
                  x = 200;
                  y = 390;
                  w = 160;
                  h = 130;
               }
               break;
            case 17:
               if(level == "easy" || level == "medium"){
                  x = 630; 
                  y = (level == "easy") ? 200 : 245;
                  w = 10;
                  h = 55;
               }else{
                  x = 440;
                  y = 340;
                  w = 160;
                  h = paperH - y;
               }
               break;
            case 18:
               if(level == "easy" || level == "medium"){
                  x = 550; 
                  y = (level == "easy") ? 240 : 290;
                  w = 80;
                  h = 20;
               }else{
                  x = 200;
                  y = 120;
                  w = 100;
                  h = 40;
               }
               break;
            case 19:
               if(level == "medium"){
                  x = 360; 
                  y = 130;
                  w = 200;
                  h = 60;
               }else{
                  x = 580;
                  y = 298;
                  w = paperW - x;
                  h = 100;
               }
               break;
            case 20:
               if(level == "medium"){
                  x = 450; 
                  y = 160;
                  w = paperW - x;
                  h = 90;
               }else{
                  x = 600;
                  y = 439;
                  w = paperW - x;
                  h = paperH - y;
               }
               break;
            case 21:
               if(level == "medium"){
                  x = 460; 
                  y = 120;
                  w = 100;
                  h = 10;
               }else{
                  x = 500;
                  y = 260;
                  w = paperW - x;
                  h = 40;
               }
               break;
            case 22:
               x = 270; 
               y = 300;
               w = 80;
               h = 50;
               break;
            case 23:
               x = 120; 
               y = 440;
               w = 80;
               h = 60;
               break;
            case 24:
               x = 360; 
               y = 480;
               w = 80;
               h = 40;
               break;
            case 25:
               x = 400; 
               y = 520;
               w = 40;
               h = 40;
         }
         if($("#"+id).length == 0){
            $("#paper").append("<div id="+id+" class=\"overlay\"></div>");
         }
         $("#"+id).css({
            position: "absolute",
            top: y,
            left: x,
            width: w,
            height: h,
            background: "red",
            opacity: 0
         });
      }
   };
  
   var animToContainer = function(castor, container) {
      var x = container.attrs.x;
      var y = container.attrs.y;
      var animR = Raphael.animation({x : x, y : y}, 100);
      var animT = Raphael.animation({x : x + dxText, y : y + dyText}, 100);
      subTask.raphaelFactory.animate("animR",castor.r,animR);
      subTask.raphaelFactory.animate("animT",castor.t,animT);
      subTask.raphaelFactory.animate("animB",castor.b,animR);
   };

   var initDragDrop = function(castor) {
      var r = castor.r;
      var t = castor.t;
      var b = castor.b;

      var drag_move  = function (dx, dy) {
         var scale = displayHelper.scaleFactor || 1;
         dx = dx/scale;
         dy = dy/scale;
         if (isNaN(dx) || isNaN(dy)) {
            return;
         }
         r.attr({x: r.ox + dx, y: r.oy + dy});
         t.attr({x: t.ox + dx, y: t.oy + dy});
         b.attr({x: r.ox + dx, y: r.oy + dy});
      };
     
      var drag_start  = function () {
         r.ox = r.attrs.x;
         r.oy = r.attrs.y;
         t.ox = t.attrs.x;
         t.oy = t.attrs.y;
         r.toFront();
         t.toFront();
         b.toFront();
      };
     
      var drag_end = function () {
         for (var objType = 1; objType < 2; objType++) {
            for (var iObject = 0; iObject < nbNodes; iObject++) {
               var container = containers[objType][iObject];
               if (container.isPointInside(r.attrs.x + r.attrs.width/2, r.attrs.y + r.attrs.height/2)) {
                  if (beaverInCell[objType][iObject] != -1) {
                     var iCastor = beaverInCell[objType][iObject];
                     beaverInCell[0][iCastor] = iCastor;
                     answer.pos[iCastor] = [0, iCastor];
                     animToContainer(castors[iCastor], containers[0][iCastor]);
                  }
                  beaverInCell[objType][iObject] = r.id;
                  beaverInCell[answer.pos[r.id][0]][answer.pos[r.id][1]] = -1;
                  answer.pos[r.id] = [objType, iObject];
                  animToContainer(castor, container);
                  displayHelper.stopShowingResult();
                  /* // automatic validation deactivated:
                  if (isCorrect()) {
                     platform.validate("done");
                  } 
                  */
                  for (var iCastor = 0; iCastor < nbNodes; iCastor++){
                     initDragDrop(castors[iCastor]);   // bug fix IE8
                  }
                  return;
               }
            }
         }
         beaverInCell[answer.pos[r.id][0]][answer.pos[r.id][1]] = -1;
         answer.pos[r.id] = [0, r.id];
         animToContainer(castor, containers[0][r.id]);
         /* // automatic validation deactivated:
         if (isCorrect()) {
            platform.validate("done");
         }
         */
         for (var iCastor = 0; iCastor < nbNodes; iCastor++){
            initDragDrop(castors[iCastor]);   // bug fix IE8
         }
         
      };
      b.undrag();
      b.drag(drag_move, drag_start, drag_end);
   };
  
   var writeNames = function() {
      var list = "<ul>";
      var edges = graph.getAllEdges();
      for(var iEdge in edges){
         var vertices = graph.getEdgeVertices(edges[iEdge]);
         var name1 = names[vertices[0]];
         var name2 = names[vertices[1]];
         list += "<li>"+name1+" "+taskStrings.and+" "+name2+"</li>";
      }
      list += "</ul>";
      $("#relations").html(list);
   };

   var stopAnimation = function() {
      subTask.raphaelFactory.destroy("animR");
      subTask.raphaelFactory.destroy("animT");
      subTask.raphaelFactory.destroy("animB");
   };

   var drawEdges = function(paper) {
      for (var iEdge = 0; iEdge < nbEdges; iEdge++) {
         var edge = edges[iEdge];
         var pos1 = positions[edge[0]];
         var pos2 = positions[edge[1]];
         var x1 = pos1[0] + cellWidth / 2;
         var y1 = pos1[1] + cellHeight / 2;
         var x2 = pos2[0] + cellWidth / 2;
         var y2 = pos2[1] + cellHeight / 2;
         paper.path(["M", x1, y1, "L", x2, y2]).attr({'stroke': 'black', 'stroke-width': 3});
      }
   };

   var drawPaper = function() {
      paper = subTask.raphaelFactory.create("paper","paper",paperW, paperH);
      
      var graphDrawer = new SimpleGraphDrawer(vertexAttr,edgeAttr);
      graphDrawer.setDrawVertex(drawVertex);
      graphDrawer.setDrawEdge(drawEdge);
      vGraph = new VisualGraph("vGraph", paper, graph, graphDrawer, true);
      initVertexPos();
      vGraph.redraw();
      
      castors = [];
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         var x = 20;
         var y = iCastor*cellHeight + 15;
         var r = paper.rect(x, y, cellWidth, cellHeight, 4).attr({'fill': '#E0E0F8', 'opacity':1});
         var name = names[iCastor];
         var t = paper.text(x + dxText, y + dyText, name).attr("font-size", tailleLettreCastor);
         var b = paper.rect(x, y, cellWidth, cellHeight, 4).attr({'fill': '#FFFFFF', 'opacity':0});
         containers[0][iCastor] = paper.rect(x, y, cellWidth, cellHeight).attr("stroke-dasharray", ". ");
         beaverInCell[0][iCastor] = iCastor;
         beaverInCell[1][iCastor] = -1;
         r.id = iCastor;
         $(t.node).css({
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
            "cursor" : "default"
         });
         castors[iCastor] = {r:r, t:t, b:b};
         initDragDrop(castors[iCastor]);
      }
   };

   function initVertexPos() {
      for(var id in data[level].vertexPos){
         var posX = data[level].vertexPos[id].x;
         var posY = data[level].vertexPos[id].y;
         vGraph.setVertexVisualInfo(id,{"x":posX,"y":posY});
      }
   };

   function drawVertex(id,info,visualInfo) {
      var pos = this._getVertexPosition(visualInfo);
      this.originalPositions[id] = pos;

      var vertex = this.paper.rect(pos.x,pos.y).attr(this.circleAttr);
      containers[1][id] = vertex;
      
      return [vertex];
   };

   function drawEdge(id, vertex1, vertex2, vertex1Info, vertex2Info, vertex1VisualInfo, vertex2VisualInfo, edgeInfo, edgeVisualInfo) {
      var x1 = vertex1VisualInfo.x + cellWidth/2;
      var y1 = vertex1VisualInfo.y + cellHeight/2;
      var x2 = vertex2VisualInfo.x + cellWidth/2;
      var y2 = vertex2VisualInfo.y + cellHeight/2;
      var path = "M"+x1+" "+y1+"L"+x2+" "+y2;
      var edge = this.paper.path(path).attr(this.lineAttr).toBack();
      edge.attr(edgeVisualInfo);
      return [edge];
   };

   var innerReloadAnswer = function() {
      for (var iType = 0; iType < 2; iType++) {
         for (var iBeaver = 0; iBeaver < nbNodes; iBeaver++) {
            beaverInCell[iType][iBeaver] = -1;
         }
      }
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         beaverInCell[answer.pos[iCastor][0]][answer.pos[iCastor][1]] = iCastor;
      }
   };

   var allPlaced = function() {
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         if (answer.pos[iCastor][0] != 1) {
            return false;
         }
      }
      return true;
   };

   var isCorrect = function() {
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         if ((answer.pos[iCastor][0] != 1) || (answer.pos[iCastor][1] != iCastor)) {
            return false;
         }
      }
      return true;
   };

   var reloadAnswer = function() { 
      innerReloadAnswer();
      
      for (var iCastor = 0; iCastor < nbNodes; iCastor++) {
         var container = containers[answer.pos[iCastor][0]][answer.pos[iCastor][1]];
         castors[iCastor].r.attr({"x":container.attrs.x,"y":container.attrs.y});
         castors[iCastor].t.attr({"x":container.attrs.x+dxText,"y":container.attrs.y+dyText});
         castors[iCastor].b.attr({"x":container.attrs.x,"y":container.attrs.y});
      }
   };

   function displayError(msg) {
      if(respEnabled){
         displayHelper.displayError(msg);
      }else{
         $("#error").html(msg);
      }
      // $("#displayHelper_graderMessage").html(msg);
   };
        
};
initWrapper(initTask, ["easy", "medium", "hard"]);
displayHelper.useFullWidth();
