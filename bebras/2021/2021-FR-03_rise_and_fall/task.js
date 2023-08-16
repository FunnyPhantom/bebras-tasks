   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         target: [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [1,1,1,0,0],
            [1,1,1,0,0],
            [1,1,1,0,0]
         ],
         sliderPos: [3,4],
         minSteps: 1,
         maxSteps: 1,
         singleButton: true
      },
      easy: {
         target: [
            [0,0,0,0,0,0,0],
            [1,1,1,1,1,1,0],
            [1,1,1,1,1,1,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,1,0],
            [0,0,0,0,0,1,0]
         ],
         sliderPos: [3,4],
         minSteps: 2,
         maxSteps: 2,
         singleButton: false
      },
      medium: {
         target: [
            [0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
         ],
         sliderPos: [3,4],
         minSteps: 4,
         maxSteps: 4,
         singleButton: false
      },
      hard: {
         target: [
            [0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,1,0,0],
            [0,0,0,0,1,1,1]
         ],
         sliderPos: [3,4],
         minSteps: 8,
         maxSteps: 12,
         singleButton: false
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.basic,
         medium: data.easy,
         hard: data.medium
      };
   }

   var paper;
   var paperW = 770;
   var paperH = 300;
   var paperTarget;
   var paperTargetW = 300;
   var paperTargetH = 200;
   var marginX = 20;
   var marginY = 20;
   var edgeL = 40;
   var angle = Math.PI/6;
   var cosL = edgeL*Math.cos(angle);
   var sinL = edgeL*Math.sin(angle);
   var cubeW = 2*cosL;
   var cubeH = edgeL*0.8;
   var buttonW = 120;
   var buttonH = 30;
   var xButton = marginX;
   var xGrid = xButton + buttonW + marginX + cosL;
   var yGrid;
   var targetScale = 0.6;
   var yTargetText = marginY;
   var xTargetText;
   var xTargetOverlap = 45;
   var xTarget, yTarget;
   var yCounter = 50;
   var arrowW = 20;
   var arrowH = 30;
   var trW = 0.6*arrowW;
   var dragBarPos = [];
   var dragBarObj = [];
   var dragBarEq = [];
   var sliderPos;
   var sliderObj = [];

   var maxHeight = 4;
   var nbRows, nbCol;
   var target;
   var arrowButtons = [];
   var undoButton;
   var columns = [];
   var col3D = [];
   var cubes = [];
   var gridObj = [];
   var dragData;
   var minSteps, maxSteps, nbSteps = 0;
   var counter;

   var undoSrc = $("#undo").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2"
   };

   var gridLineAttr = {
      stroke: colors.black,
      "stroke-width": 1
   };
   var gridSquareAttr = {
      stroke: "none",
      fill: "white"
   };
   var highlightedGridLineAttr = {
      stroke: "red",
      "stroke-width": 1
   };
   var highlightedGridSquareAttr = {
      stroke: "none",
      fill: "red"
   };
   var counterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var targetTextAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var warningAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: "red"
   };
   var buttonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var arrowAttr = {
      stroke: "none",
      fill: "white"
   };
   var cubeAttr = {
      top: {
         stroke: "none",
         fill: "rgb(200,200,200)"
      },
      left: {
         stroke: "none",
         fill: "rgb(150,150,150)"
      },
      right: {
         stroke: "none",
         fill: "rgb(100,100,100)"
      },
      edge: {
         stroke: colors.black,
         "stroke-width": 0.5
      },
      outline: {
         stroke: colors.black,
         "stroke-width": 3
      }
   };
   var selectedCubeAttr = {
      top: {
         stroke: "none",
         fill: "rgb(150,150,250)"
      },
      left: {
         stroke: "none",
         fill: "rgb(100,100,200)"
      },
      right: {
         stroke: "none",
         fill: "rgb(50,50,150)"
      },
      edge: {
         stroke: colors.black,
         "stroke-width": 0.5
      },
      outline: {
         stroke: colors.blue,
         "stroke-width": 4
      }
   };
   var highlightedCubeAttr = {
      top: {
         stroke: "none",
         fill: "rgb(250,150,150)"
      },
      left: {
         stroke: "none",
         fill: "rgb(200,100,100)"
      },
      right: {
         stroke: "none",
         fill: "rgb(150,50,50)"
      },
      edge: {
         stroke: "red",
         "stroke-width": 0.5
      },
      outline: {
         stroke: "red",
         "stroke-width": 4
      }
   };
   var dragBarAttr = {
      stroke: "black",
      "stroke-width": 2
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var sliderAttr = {
      stroke: "#FF9900", // colors.blue,
      "stroke-width": 4,
      fill: "white"
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      // rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      target = data[level].target.slice();
      sliderPos = data[level].sliderPos.slice();
      minSteps = data[level].minSteps;
      maxSteps = data[level].maxSteps;
      nbRows = target.length;
      nbCol = target[0].length;
      $("#minSteps").html(minSteps);
      initColumns();
      // yGrid = marginY + maxHeight*edgeL
      yGrid = marginY + maxHeight*cubeH;
      xTarget = 0; //xGrid + (nbRows + nbCol + 1)*cosL - xTargetOverlap;
      yTarget = marginY; //yTargetText + 2*marginY;
      xTargetText = xTarget + nbCol*cosL*targetScale;
      paperH = yGrid + 2*nbCol*sinL + marginY;
      for(var iHeight = 0; iHeight < maxHeight; iHeight++){
         cubes[iHeight] = [];
         for(var iRow = 0; iRow < nbRows; iRow++){
            cubes[iHeight][iRow] = [];
         }
      }
      dragBarPos[0] = {
         x1: xGrid - cosL,
         y1: yGrid + nbRows*sinL,
         x2: xGrid + (nbRows - 1)*cosL,
         y2: yGrid + (nbCol + nbRows)*sinL
      };
      dragBarPos[1] = {
         x1: xGrid + (nbRows + 1)*cosL,
         y1: yGrid + (nbCol + nbRows)*sinL,
         x2: xGrid + (nbRows + nbCol + 1)*cosL,
         y2: yGrid + nbRows*sinL
      };
      for(var iAxis = 0; iAxis < 2; iAxis++){
         var a = (dragBarPos[iAxis].y2 - dragBarPos[iAxis].y1)/(dragBarPos[iAxis].x2 - dragBarPos[iAxis].x1);
         var b = dragBarPos[iAxis].y1 - a*dragBarPos[iAxis].x1;
         dragBarEq[iAxis] = { a: a, b: b };
      }
   };

   subTask.getStateObject = function() {
      return state;
   };

   subTask.reloadAnswerObject = function(answerObj) {
      answer = answerObj;
      if(!answer) {
         return;
      }
      // rng.reset(answer.seed);
   };

   subTask.resetDisplay = function() {
      initPaper();
      initGrid();
      initTarget();
      initCounter();
      initButtons();
      initDragBars();
      initHandlers();
      reloadAnswer();
      displayError("");

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
         $(".largeScreen #zone_1").css("float", "right");
         $(".largeScreen #zone_2").css("float", "right");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         // seed: rng.nextInt(0,1000),
         hist: []
      };

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function initColumns() {
      if(data[level].columns){
         columns = JSON.parse(JSON.stringify(data[level].columns));
      }else{
         for(var iRow = 0; iRow < nbRows; iRow++){
            columns[iRow] = [];
            for(var iCol = 0; iCol < nbCol; iCol++){
               columns[iRow][iCol] = 0;
            }
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      paperTarget = subTask.raphaelFactory.create("paperTarget", "paperTarget", paperTargetW, paperTargetH);

      $("#zone_2 .overlay").remove();
      $("#zone_2").css({ position: "relative", "padding-top": "1px" });
      var y0 = 16;
      var x,y,w,h;
      for(var iOver = 1; iOver <= 6; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = y0;
               w = paperW;
               h = y0 + yCounter + 1.5*marginY - y;
               break;
            case 2:
               x = xButton + buttonW;
               y = y0 + yCounter + 1.5*marginY;
               w = paperW - x;
               h = y0 + dragBarPos[0].y1 - 20 - y;
               break;
            case 3:
               x = 0; 
               y = y0 + 210;
               w = dragBarPos[0].x1 - 30;
               h = y0 + paperH - y;
               break;
            case 4:
               x = dragBarPos[0].x1 - 30; 
               y = y0 + dragBarPos[0].y2;
               w = paperW - x;
               h = y0 + paperH - y;
               break;
            case 5:
               x = dragBarPos[1].x2 + 30; 
               y = y0 + dragBarPos[1].y2 - 20;
               w = paperW - x;
               h = y0 + paperH - y;
               break;
            case 6:
               x = 0;
               y = y0 + yCounter + 1.5*marginY + buttonH;
               w = xButton + buttonW;
               h = (data[level].singleButton) ? y0 + 210 - buttonH - y : marginY;
               break;
         }
         if($("#"+id).length == 0){
            $("#zone_2").append("<div id="+id+" class=\"overlay\"></div>");
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

   function initGrid() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         gridObj[iRow] = [];
         for(var iCol = 0; iCol < nbCol; iCol++){
            var coord = getCubeCoordinates(0,iRow,iCol);
            var ABCD = paper.path(["M",coord.xA,coord.yA,"L",coord.xB,coord.yB,"L",coord.xC,coord.yC,"L",coord.xD,coord.yD,"Z"]).attr(gridSquareAttr);
            var AB = paper.path(["M",coord.xA,coord.yA,"L",coord.xB,coord.yB]).attr(gridLineAttr);
            var BC = paper.path(["M",coord.xB,coord.yB,"L",coord.xC,coord.yC]).attr(gridLineAttr);
            var CD = paper.path(["M",coord.xC,coord.yC,"L",coord.xD,coord.yD]).attr(gridLineAttr);
            var AD = paper.path(["M",coord.xA,coord.yA,"L",coord.xD,coord.yD]).attr(gridLineAttr);
            gridObj[iRow][iCol] = { ABCD: ABCD, AB: AB, BC: BC, CD: CD, AD: AD };
         }
      }
   };

   function initTarget() {
      //paperTarget.text(xTargetText,yTargetText,taskStrings.target).attr(targetTextAttr);
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var coord = getCubeCoordinates(0,iRow,iCol,true);
            paperTarget.path(["M",coord.xA,coord.yA,"L",coord.xB,coord.yB,"L",coord.xC,coord.yC,"L",coord.xD,coord.yD,"Z"]).attr(gridSquareAttr);
            paperTarget.path(["M",coord.xA,coord.yA,"L",coord.xB,coord.yB]).attr(gridLineAttr);
            paperTarget.path(["M",coord.xB,coord.yB,"L",coord.xC,coord.yC]).attr(gridLineAttr);
            paperTarget.path(["M",coord.xC,coord.yC,"L",coord.xD,coord.yD]).attr(gridLineAttr);
            paperTarget.path(["M",coord.xA,coord.yA,"L",coord.xD,coord.yD]).attr(gridLineAttr);
         }
      }
      updateColumns(true);
   };

   function initCounter() {
      var x = xButton + buttonW/2;
      var y = yCounter;
      var text = nbSteps+" / "+maxSteps+" "+taskStrings.steps(maxSteps);
      counter = paper.text(x,y,text).attr(counterAttr);
   };

   function initButtons() {
      var y0 = yCounter + 1.5*marginY;
      var x = xButton;
      var w = buttonW;
      var h = buttonH;
      var iconW = 15;
      var attr = buttonAttr;
      for(var iButton = 0; iButton < 3; iButton++){
         var y = y0 + iButton*(h + marginY);
         var rect = paper.rect(x,y,w,h,h/2).attr(attr.rect);
         if(iButton < 2){
            var xArr = x + w/2;
            var yArr = y + h/2;
            var arr = getShape(paper,"arrow",xArr,yArr,{ arrowW: arrowW, arrowH: arrowH, trW: trW }).attr(arrowAttr);
            var angle = (iButton == 0) ? -90 : 90;
            arr.transform(["r",angle,xArr,yArr]);
            arrowButtons[iButton] = paper.set(rect,arr);
            if (data[level].singleButton && (iButton == 1)) {
               arrowButtons[iButton].attr("opacity", 0);
            }
         }else{
            var xIcon = x + 15;
            var yIcon = y + (h - iconW)/2;
            var icon = paper.image(undoSrc,xIcon,yIcon,iconW,iconW);
            var xText = x + w/2 + 10;
            var yText = y + h/2;
            var text = paper.text(xText,yText,taskStrings.undo.toUpperCase()).attr(attr.text);
            undoButton = paper.set(rect,icon,text);
         }
      }
   };

   function initDragBars() {
      for(var iBar = 0; iBar < 2; iBar++){
         var pos = dragBarPos[iBar];
         var line = paper.path(["M",pos.x1,pos.y1,"L",pos.x2,pos.y2]).attr(dragBarAttr);
         sliderObj[iBar] = drawSlider(iBar);
         var xOv1 = pos.x1;
         var yOv1 = (iBar == 0) ? pos.y1 - 2*sinL/2 : pos.y1 + 2*sinL/2;
         var xOv2 = pos.x2 + cosL;
         var yOv2 = pos.y2;
         var xOv3 = pos.x2;
         var yOv3 = (iBar == 0) ? pos.y2 + 2*sinL/2 : pos.y2 - 2*sinL/2;
         var xOv4 = pos.x1 - 2*cosL/2;
         var yOv4 = pos.y1;
         var overlay = paper.path(["M",xOv1,yOv1,"L",xOv2,yOv2,"L",xOv3,yOv3,"L",xOv4,yOv4,"Z"]).attr(overlayAttr);
         dragBarObj[iBar] = paper.set(line,overlay);
      }
   };

   function initHandlers() {
      for(var iAxis = 0; iAxis < 2; iAxis++){
         Beav.dragWithTouch(dragBarObj[iAxis][1], onMove, onStart(iAxis), onEnd)
         dragBarObj[iAxis][1].attr("cursor","pointer");
      }
      for(var iButton = 0; iButton < 2; iButton++){
         arrowButtons[iButton].click(onClick(iButton));
         arrowButtons[iButton].attr("cursor","pointer");
      }
      updateUndo();
   };

   function onClick(id,noVisual) {
      return function() {
         if (!noVisual) {
            displayError("");
            if(answer.hist.length >= maxSteps){
               displayError(taskStrings.tooManySteps(maxSteps));
               return
            }
         }
         var change = false;
         var increment = (id == 0) ? 1 : -1;
         var error = null;
         if (sliderPos[0] == nbRows || sliderPos[1] == 0) {
            displayError(taskStrings.moveHandle);
            return
         }
         for(var iRow = sliderPos[0]; iRow < nbRows; iRow++){
            for(var iCol = 0; iCol < sliderPos[1]; iCol++){
               var oldVal = columns[iRow][iCol];
               if(id == 1 && oldVal == 0){
                  error = taskStrings.errorLimitLow;
                  if(!noVisual){
                     highlightFloor();
                  }
               }else if(id == 0 && oldVal == maxHeight){
                  error = taskStrings.errorLimitHi(maxHeight);
               }
               if(error){
                  displayError(error);
                  return
               }
            }
         }
         for(var iRow = sliderPos[0]; iRow < nbRows; iRow++){
            for(var iCol = 0; iCol < sliderPos[1]; iCol++){
               var oldVal = columns[iRow][iCol];
               var newVal = Math.max(0,Math.min(maxHeight,oldVal + increment));
               if(oldVal != newVal){
                  columns[iRow][iCol] = newVal;
                  change = true;
               }
            }
         }
         if(!change){
            return
         }
         nbSteps++;
         if(!noVisual){
            updateColumns();
            var move = { type: 1, dir: id, pos: sliderPos.slice() };
            answer.hist.push(move);
            moveSlidersToCorner();
            updateSelectedArea();
            updateCounter();
            updateUndo();
         }
      }
   };


   var undo = function() {
      displayError("");
      if(answer.hist.length == 0) {
         return;
      }
      answer.hist.pop();
      reloadAnswer();
      updateUndo();
   };

   function updateUndo() {
      if(answer.hist.length > 0) {
         undoButton.unclick();
         undoButton.click(undo);
         undoButton.attr("cursor","pointer");
         undoButton[0].attr("opacity",1);
      } else {
         undoButton.unclick();
         undoButton.attr("cursor","auto");
         undoButton[0].attr("opacity",0.5);
      }
   };

   function onStart(axis) {
      return function(x,y,event){
         displayError("");
         dragData = { axis: axis, startPos: sliderPos[axis] };
         onMove(null,null,x,y,event);
      }
   };

   function onEnd(event) {
      if(!dragData){
         return
      }
      var axis = dragData.axis;
      if(sliderPos[axis] != dragData.startPos){
         // var move = { type: 0, axis: axis, newPos: sliderPos[axis] };
         // answer.hist.push(move);
         // updateUndo();
      }
      dragData = null;
   };

   function onMove(dx,dy,x,y,event) {
      var xMouse = x - $("#paper").offset().left;
      var yMouse = y - $("#paper").offset().top;
      var axis = dragData.axis;
      var x1 = dragBarPos[axis].x1;
      var y1 = dragBarPos[axis].y1;
      var x2 = dragBarPos[axis].x2;
      var y2 = dragBarPos[axis].y2;
      // if(axis == 1){
      //    var d = ((x2 - x1)*(xMouse - x1)/Math.cos(angle) + (y2 - y1)*(yMouse - y1)/Math.sin(angle))/Beav.Geometry.distance(x1,y1,x2,y2);
      // }else{
      //    var d = ((x1 - x2)*(x1 - xMouse)/Math.cos(angle) + (y1 - y2)*(y1 - yMouse)/Math.sin(angle))/Beav.Geometry.distance(x1,y1,x2,y2);
      // }
      var d = ((x2 - x1)*(xMouse - x1) + (y2 - y1)*(yMouse - y1))/Beav.Geometry.distance(x1,y1,x2,y2);
      // var d = Math.max(0,(xMouse - x1)/Math.cos(angle));
      // var d = Math.max(0,(xMouse - x1)/Math.cos(angle)) + Math.max(0,(y1 - yMouse)/Math.sin(angle));
      // console.log(Math.max(0,(xMouse - x1)/Math.cos(angle)),Math.max(0,(y1 - yMouse)/Math.sin(angle)))
      // var d = Math.sqrt(Math.pow(Math.max(0,(xMouse - x1)),2) + Math.pow(Math.max(0,(y1 - yMouse)),2));
      // console.log(d)
      var gradSpacing = edgeL;
      var closestGrad = Math.round(d/gradSpacing);
      // console.log(closestGrad)
      var maxGrad = (axis == 0) ? nbRows-1 : nbCol;
      var minGrad = (axis == 0) ? 0 : 1;
      closestGrad = Math.max(minGrad,closestGrad);
      closestGrad = Math.min(maxGrad,closestGrad);
      sliderPos[axis] = closestGrad;
      updateSlider(axis);
      updateSelectedArea();
   };

   function reloadAnswer(noVisual) {
      initColumns();
      sliderPos = data[level].sliderPos.slice();
      nbSteps = 0;
      for(var iMove = 0; iMove < answer.hist.length; iMove++){
         var move = answer.hist[iMove];
         if(move.type == 0){
            var axis = move.axis;
            var newPos = move.newPos;
            sliderPos[axis] = newPos;
         }else{
            var dir = move.dir;
            sliderPos = move.pos.slice();
            onClick(dir,true)();
         }
      }
      if(!noVisual){
         updateColumns();
         moveSlidersToCorner();
         // updateSliders();  // already done in the line above
         updateSelectedArea();
         updateCounter();
      }
   };

   function updateCounter() {
      var text = nbSteps+" / "+maxSteps+" "+taskStrings.steps(maxSteps);
      counter.attr("text",text);
      // if(nbSteps > minSteps){
      //    counter.attr(warningAttr);
      // }else{
      //    counter.attr(counterAttr);
      // }
   };

   function moveSlidersToCorner() {
     sliderPos[0] = nbRows - 1;
     sliderPos[1] = 1;
     updateSliders();
   };

   function updateSliders() {
      for(var iAxis = 0; iAxis < 2; iAxis++){
         updateSlider(iAxis);
      }
   };

   function updateSlider(axis) {
      var tx = sliderPos[axis]*cosL;
      var ty = sliderPos[axis]*sinL;
      if(axis == 1){
         ty = -ty;
      }
      sliderObj[axis].transform(["t",tx,ty]);
   };

   function updateSelectedArea() {
      var row = sliderPos[0];
      var col = sliderPos[1];
      for(var h = 0; h <= maxHeight; h++){
         for(var iRow = 0; iRow < nbRows; iRow++){
            for(var iCol = 0; iCol < nbCol; iCol++){
               if(iRow >= row && iCol < col){
                  var attr = (h == 0) ? selectedCubeAttr.top : selectedCubeAttr;
               }else{
                  var attr = (h == 0) ? gridSquareAttr : cubeAttr;
               }
               if(h == 0){
                  var cube = gridObj[iRow][iCol];
                  cube.ABCD.attr(attr);
                  cube.AD.attr(gridLineAttr);
                  cube.BC.attr(gridLineAttr);
                  cube.CD.attr(gridLineAttr);
                  cube.AB.attr(gridLineAttr);
               }else{
                  var cube = cubes[h - 1][iRow][iCol];
                  if(!cube){
                     continue
                  }
                  cube.ABCD.attr(attr.top);
                  cube.ABFE.attr(attr.left);
                  cube.BCGF.attr(attr.right);
                  updateOutline(h,iRow,iCol)
               }
               var outlineAttr = selectedCubeAttr.outline;
               var set = paper.set();

               if(iRow == row && iCol < col){
                  set.push(cube.AD);
                  if(h > 0){
                     if(iRow > 0 && cubes[h - 1][iRow - 1][iCol]){
                        set.push(cubes[h - 1][iRow - 1][iCol].FG);
                     }
                     set.push(cube.AE);
                  }
               }else if(iRow == nbRows - 1 && row == nbRows && iCol < col){
                  if(h == 0){
                     set.push(cube.BC);
                  }else if(h == 1){
                     set.push(cube.FG);
                  }
               }else if(h > 0 && h <= maxHeight && iRow == row - 1 && iCol < col){
                  for(var iH = h - 1; iH > 0; iH--){
                     if(cubes[iH - 1][iRow + 1][iCol]){
                        set.push(cubes[iH][iRow][iCol].FG);
                        break;
                     }
                  }
                  if(h - 1 == 0){
                     set.push(cube.FG);
                  }
               }
               if(iCol == col && iRow >= row){
                  if(h == 0){
                     set.push(cube.AB);
                  }else{
                     if(iCol > 0 && cubes[h - 1][iRow][iCol - 1]){
                        set.push(cube.AB);
                        set.push(cubes[h - 1][iRow][iCol - 1].CD);
                     }else{
                        for(var iH = h - 1; iH > 0; iH--){
                           if(cubes[iH - 1][iRow][iCol-1]){
                              set.push(cubes[iH][iRow][iCol].EF);
                              break;
                           }
                        }
                        if(h - 1 == 0){
                           set.push(cube.EF);
                        }
                     }
                  }
               }else if(iCol == col - 1 && iRow >= row){
                  set.push(cube.CD);
                  if(h > 0){
                     set.push(cube.CG);
                  }
               }
               set.attr(outlineAttr);
            }
         }
      }

   };

   function updateColumns(isTarget) {
      col3D = [];
      for(var iHeight = 0; iHeight <= maxHeight; iHeight++){
         col3D[iHeight] = [];
         for(var iRow = 0; iRow < nbRows; iRow++){
            col3D[iHeight][iRow] = Beav.Array.make(nbCol,false);
         }
      }

      var src = (isTarget) ? target : columns;

      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var colH = src[iRow][iCol];
            for(var iHeight = colH; iHeight >= 0; iHeight--){
               col3D[iHeight][iRow][iCol] = true;
            }
         }
      }

      for(var iHeight = 0; iHeight < maxHeight; iHeight++){
         var h = iHeight + 1;
         var floor = col3D[h];
         for(var iRow = 0; iRow < nbRows; iRow++){
            for(var iCol = nbCol - 1; iCol >= 0; iCol--){
               if(!isTarget && cubes[iHeight][iRow][iCol]){
                  cubes[iHeight][iRow][iCol].set.remove();
                  cubes[iHeight][iRow][iCol] = null;
               }
               if(floor[iRow][iCol]){
                  if(!isTarget){
                     cubes[iHeight][iRow][iCol] = drawCube(h,iRow,iCol);
                     updateOutline(h,iRow,iCol);
                  }else{
                     drawCube(h,iRow,iCol,isTarget);
                  }
               }
            }
         }
      }
   };

   function updateOutline(h,r,c) {
      var attr = cubeAttr;
      var cube = cubes[h - 1][r][c];
      var AB = cube.AB;
      var AD = cube.AD;
      var BC = cube.BC;
      var CD = cube.CD;
      var AE = cube.AE;
      var BF = cube.BF;
      var CG = cube.CG;
      var EF = cube.EF;
      var FG = cube.FG;
      paper.set(AB,AD,BC,CD,AE,BF,CG,EF,FG).attr(attr.edge);
      if(r == 0 || !col3D[h][r - 1][c]){
         AD.attr(attr.outline);
         AE.attr(attr.outline);
      }
      if(r == nbRows - 1 || !col3D[h][r + 1][c]){
         if(h == maxHeight || !col3D[h + 1][r][c]){
            BC.attr(attr.outline);
         }
         if(h == 1/* || col3D[h - 1][r + 1][c]*/){
            FG.attr(attr.outline);
         }
      }
      if(c == 0 || !col3D[h][r][c - 1]){
         if(h == maxHeight || !col3D[h + 1][r][c]){
            AB.attr(attr.outline);
         }
         if(r == nbRows - 1 || !col3D[h][r + 1][c]){
            BF.attr(attr.outline);
         }
         if(h == 1/* || col3D[h - 1][r][c - 1]*/){
            EF.attr(attr.outline);
         }
      }
      if(c == nbCol - 1 || !col3D[h][r][c + 1]){
         if(h == maxHeight || !col3D[h + 1][r][c]){
            CD.attr(attr.outline);
         }
         if(r == nbRows - 1 || !col3D[h][r + 1][c]){
            CG.attr(attr.outline);
         }
      }
   };

   function highlightColumn(r,c) {
      // console.log(r,c)
      if(columns[r][c] > 0){
         var attr = highlightedCubeAttr;
         for(var iHeight = 0; iHeight < columns[r][c]; iHeight++){
            var h = iHeight + 1;
            if(cubes[iHeight][r][c]){
               cubes[iHeight][r][c].ABCD.attr(attr.top);
               cubes[iHeight][r][c].ABFE.attr(attr.left);
               cubes[iHeight][r][c].BCGF.attr(attr.right);
            }
         }
      }else{
         gridObj[r][c].ABCD.attr(highlightedGridSquareAttr);
      }
   };

   function highlightFloor() {
      for(var iRow = sliderPos[0]; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < sliderPos[1]; iCol++){
            if(columns[iRow][iCol] == 0){
               highlightColumn(iRow,iCol);
            }
         }
      }
   };

   function drawCube(h,r,c,target) {
      var usedPaper = paper;
      if (target) {
         usedPaper = paperTarget;
      }
      //    _-D-_
      // A-_     _-C
      // |  ¨-B-¨  |
      // |    |    |
      // E-_  |  _-G
      //    ¨-F-¨
      var attr = cubeAttr;
      var coord = getCubeCoordinates(h,r,c,target);
      var xA = coord.xA;
      var xB = coord.xB;
      var xC = coord.xC;
      var xD = coord.xD;
      var xE = coord.xE;
      var xF = coord.xF;
      var xG = coord.xG;
      var yA = coord.yA;
      var yB = coord.yB;
      var yC = coord.yC;
      var yD = coord.yD;
      var yE = coord.yE;
      var yF = coord.yF;
      var yG = coord.yG;
      usedPaper.setStart();
      var ABCD = usedPaper.path(["M",xA,yA,"L",xB,yB,"L",xC,yC,"L",xD,yD,"Z"]).attr(attr.top);
      var ABFE = usedPaper.path(["M",xA,yA,"L",xB,yB,"L",xF,yF,"L",xE,yE,"Z"]).attr(attr.left);
      var BCGF = usedPaper.path(["M",xB,yB,"L",xC,yC,"L",xG,yG,"L",xF,yF,"Z"]).attr(attr.right);
      var AB = usedPaper.path(["M",xA,yA,"L",xB,yB]).attr(attr.edge);
      var AD = usedPaper.path(["M",xA,yA,"L",xD,yD]).attr(attr.edge);
      var BC = usedPaper.path(["M",xB,yB,"L",xC,yC]).attr(attr.edge);
      var CD = usedPaper.path(["M",xC,yC,"L",xD,yD]).attr(attr.edge);
      var AE = usedPaper.path(["M",xA,yA,"L",xE,yE]).attr(attr.edge);
      var BF = usedPaper.path(["M",xB,yB,"L",xF,yF]).attr(attr.edge);
      var CG = usedPaper.path(["M",xC,yC,"L",xG,yG]).attr(attr.edge);
      var EF = usedPaper.path(["M",xE,yE,"L",xF,yF]).attr(attr.edge);
      var FG = usedPaper.path(["M",xF,yF,"L",xG,yG]).attr(attr.edge);
      var set = usedPaper.setFinish();
      return { set: set, ABCD: ABCD, ABFE: ABFE, BCGF: BCGF, AB: AB, AD: AD, BC: BC, 
         CD: CD, AE: AE, EF: EF, FG: FG, BF: BF, CG: CG }
   };

   function drawSlider(axis) {
      var x1 = dragBarPos[axis].x1 - cosL/2;
      var y1 = dragBarPos[axis].y1;
      var x2 = dragBarPos[axis].x1;
      var y2 = dragBarPos[axis].y1 - sinL/2;
      var x3 = dragBarPos[axis].x1 + cosL/2;
      var y3 = dragBarPos[axis].y1;
      var x4 = dragBarPos[axis].x1;
      var y4 = dragBarPos[axis].y1 + sinL/2;
      if(axis == 0){
         var xLine1 = (x2 + x3)/2;
         var yLine1 = (y2 + y3)/2;
         var xLine2 = xGrid;
         var yLine2 = y1 - sinL;
      }else{
         var xLine1 = (x1 + x2)/2;
         var yLine1 = (y1 + y2)/2;
         var xLine2 = x1 - cosL/2;
         var yLine2 = y1 - sinL;
      }
      var square = paper.path(["M",x1,y1,"L",x2,y2,"L",x3,y3,"L",x4,y4,"Z"]);
      var line = paper.path(["M",xLine1,yLine1,"L",xLine2,yLine2]);
      return paper.set(square,line).attr(sliderAttr)
   };

   function getCubeCoordinates(h,r,c,target) {
      //    _-D-_
      // A-_     _-C
      // |  ¨-B-¨  |
      // |    |    |
      // E-_  |  _-G
      //    ¨-F-¨
      var x0 = (target) ? xTarget : xGrid;
      var y0 = (target) ? yTarget : yGrid;
      var scale = (target) ? targetScale : 1;
      var xB = x0 + nbCol*cosL*scale + (r + c - nbCol + 1)*cosL*scale;
      var xD = xB, xF = xB;
      var xA = xB - cosL*scale;
      var xE = xA;
      var xC = xB + cosL*scale;
      var xG = xC;
      // var yE = y0 + (r - c + nbCol - 1)*sinL*scale - (h - 1)*edgeL*scale;
      var yE = y0 + (r - c + nbCol - 1)*sinL*scale - (h - 1)*cubeH*scale;
      var yG = yE;
      // var yA = yE - edgeL*scale;
      var yA = yE - cubeH*scale;
      var yC = yA;
      var yB = yA + sinL*scale;
      var yF = yE + sinL*scale;
      var yD = yA - sinL*scale;
      return { xA: xA, xB: xB, xC: xC, xD: xD, xE: xE, xF: xF, xG: xG, 
         yA: yA, yB: yB, yC: yC, yD: yD, yE: yE, yF: yF, yG: yG }
   };

   function checkResult(noVisual) {
      // console.log("checkResult "+noVisual)
      reloadAnswer(noVisual);
      var errorInfirstCell = false;
      for(var iRow = nbRows - 1; iRow >= 0; iRow--){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(target[iRow][iCol] != columns[iRow][iCol]){
               if(iRow == nbRows - 1 && iCol == 0){
                  errorInfirstCell = true;
                  continue
               }
               var error = taskStrings.errorColumn;
               if(!noVisual){
                  displayError(error);
                  highlightColumn(iRow,iCol);
               }
               return { successRate: 0, message: error }
            }
         }
      }
      if(errorInfirstCell){
         var error = taskStrings.errorColumn;
         if(!noVisual){
            displayError(error);
            highlightColumn(nbRows - 1,0);
         }
         return { successRate: 0, message: error }
      }
      if(!noVisual){
         platform.validate("done");
      }
      if (nbSteps > minSteps){
         // partial score in fact only possible for the hard version
         var error = taskStrings.errorSteps;
         var score = (nbSteps <= minSteps+2) ? 0.5 : 0.3;
         return { successRate: score, message: error }
      }
      return { successRate: 1, message: taskStrings.success };
   };

   function displayError(msg) {
      $("#error").html(msg);
      // $("#displayHelper_graderMessage").html(msg);
   };


}
if (typeof(threeVersions) == "undefined") {
   initialLevel = "basic";
   initWrapper(initTask, ["basic", "easy", "medium", "hard"]);
} else {
   initWrapper(initTask, ["easy", "medium", "hard"]);
}
displayHelper.useFullWidth();

