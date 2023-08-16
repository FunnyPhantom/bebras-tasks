   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         nbRows: 2,
         nbCol: 4,
         nbNuts: 3,
         cellSize: 60,
         maxResults: 100,
         targetResults: 2,
         maxRectPerGrid: 0,
         rectOnLeftGrid: false,
         shortResult: false,
         defaultSeed: 4,
         overlayLayout: "basic",
         hasUndo: false
      },
      easy: {
         nbRows: 2,
         nbCol: 4,
         nbNuts: 2,
         cellSize: 60,
         maxResults: 100,
         targetResults: 3,
         maxRectPerGrid: 1,
         rectOnLeftGrid: false,
         shortResult: false,
         defaultSeed: 7,
         overlayLayout: "easy",
         hasUndo: false
      },
      medium: {
         nbRows: 8,
         nbCol: 8,
         nbNuts: 12,
         cellSize: 30,
         maxResults: 6,
         targetResults: 6,
         maxRectPerGrid: 1,
         rectOnLeftGrid: true,
         shortResult: true,
         defaultSeed: -1,
         overlayLayout: "medium",
         hasUndo: false
      },
      hard: {
         nbRows: 8,
         nbCol: 8,
         nbNuts: 14,
         cellSize: 30,
         maxResults: 4,
         targetResults: 3,
         maxRectPerGrid: 2,
         rectOnLeftGrid: true,
         shortResult: true,
         defaultSeed: -1,
         overlayLayout: "hard",
         hasUndo: true
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
   var paperH;

   var marginX = 20;
   var marginY = 20;
   var cellW, cellH;
   var gridW, gridH;
   var y0Grid = marginY * 2;
   var gridSpacing;
   var markerMargin;
   var markerOffsetX, markerOffsetY;
   var xLine;
   
   var rightColW = 200;
   var xRightCol = paperW - rightColW;
   var buttonW = rightColW - marginX;
   var undoButtonH = 30;
   var countButtonH = 50;
   var iconW = 14;
   var yUndo = y0Grid + undoButtonH/2;
   var xUndo = xRightCol + rightColW/2;

   var counterH = 60;
   var yCounter;
   var xCounter = xRightCol + rightColW/2; 

   var selectRectW = buttonW;
   var selectRectH = 80;
   var xSelect = xRightCol + marginX/2;
   var ySelect;
   var selectButtonR = 20;
   var arrW = 20;
   var arrH = 20;

   var nutIconSpacing = 2;
   var nutIconW = 16;
   var nutIconH = 18;
   var nutW, nutH;
   var nbNuts;
   var shortResult;

   var countResultH = 30;
   var countBoxW = 100;
   var countBoxH = 30;
   var yMarker = marginX;
   var xMarker;

   var dragThreshold = 10;
   var selectionMargins = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
   };

   var newMeas = true;
   var currMeasID = 0;

   var gridContent;
   var nbRows, nbCol;
   var possNutPos;
   var maxResults, maxRectPerGrid;
   var targetResults;
   var currSelection = []; // [ grid1: [rect1: [pos1,pos2], rect2], grid2 ]
   var dragData = {};
   var overCell = null;

   var gridObj = [];
   var selectRectObj = []; // rect of current selection (temp)
   var selectHist = [];
   var resultsRectObj = []; // rect of results
   var undoButton, countButton;
   var selectResultObj = {};
   var markerObj;
   var counterObj;
   var rng;

   var undoSrc = $("#undo").attr("src");
   var countSrc = $("#count").attr("src");
   var arrowSrc = $("#arrow").attr("src");
   var packagingSrc = $("#packaging").attr("src");
   var chocolateSrc = $("#chocolate").attr("src");
   var nutSrc = $("#nut").attr("src");
   var markerSrc = $("#marker").attr("src");
   var nutIconSrc = [$("#nut_icon_blue").attr("src"),$("#nut_icon_brown").attr("src")];

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      brown: "#654118",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
      darkGrey: "#666666"
   };

   var undoButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: undoButtonH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var countButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: countButtonH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var selectAttr = {
      rect: {
         stroke: "none",
         fill: colors.lightGrey,
         r: 5
      },
      circ: {
         stroke: "none",
         fill: colors.blue,
         r: selectButtonR
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: colors.black
      },
      nb: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black
      }
   };
   var markerAttr = {
      rect: {
         stroke: colors.blue,
         "stroke-width": 2,
         "stroke-dasharray": ["- "],
         fill: "none",
         r: 5
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         "text-anchor": "start"
      }
   };
   var selectionBoxAttr = {
      opacity: 0
   };
   var selectionAttr = [
      {
         rect: {
            stroke: colors.blue,
            "stroke-width": 2,
            fill: colors.blue,
            "fill-opacity": 0.25,
            r: 5
         },
         text: {
            "font-size": 18,
            "font-weight": "bold",
            fill: colors.darkBlue,
            "text-anchor": "end"
         }
      },
      {
         rect: {
            stroke: colors.yellow,
            "stroke-width": 2,
            fill: colors.yellow,
            "fill-opacity": 0.25,
            r: 5
         },
         text: {
            "font-size": 18,
            "font-weight": "bold",
            fill: colors.brown,
            "text-anchor": "end"
         }
      }
   ];
   var countResultAttr = [
      {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.darkBlue
      },
      {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.brown
      }
   ];
   var countBoxAttr = {
      rect: {
         fill: "white",
         r: 5,
         opacity: 0.75
      },
      text: {
         "font-size": 16,
         "text-anchor": "middle",
         fill: colors.black
      }
   };
   var highlightAttr = [
      {
         stroke: "yellow",
         "stroke-width": 2,
         "stroke-dasharray": ["."],
         r: 5
      },
      {
         stroke: "red",
         "stroke-width": 3,
         "stroke-dasharray": [""],
         r: 5
      },
      {
         stroke: "yellow",
         "stroke-width": 3,
         "stroke-dasharray": [""],
         r: 5
      }
   ];
   var maskAttr = {
      stroke: "none",
      fill: "white",
      opacity: 0.5
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var gridTitleAttr = {
       "font-size": 18,
       "font-weight": "bold",
       "text-anchor": "center"
   };
   var counterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var lineAttr = {
      stroke: colors.black,
      "stroke-width": 2
   };

   subTask.loadLevel = function(curLevel) {
      if(respEnabled){
         displayHelper.responsive = true;
         // displayHelper.hideSolutionButton = true;
         convertDOM();
      }else{
         displayHelper.responsive = false;
      }
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      cellW = data[level].cellSize;
      cellH = cellW;
      nutW = cellW*0.6;
      nutH = cellH*0.7;
      markerOffsetX = cellW/3;
      markerOffsetY = -cellH/3;
      markerMargin = cellW*0.1;
      maxResults = data[level].maxResults;
      targetResults = data[level].targetResults;
      maxRectPerGrid = data[level].maxRectPerGrid;
      nbRows = data[level].nbRows;
      nbCol = data[level].nbCol;
      gridW = nbCol*cellW;
      gridH = nbRows*cellH;
      nbNuts = data[level].nbNuts;
      shortResult = data[level].shortResult;

      ySelect = Math.max(y0Grid + undoButtonH + countButtonH + marginY + counterH, y0Grid + gridH - selectRectH);
      yGrid = Math.max(y0Grid, y0Grid + (ySelect - y0Grid - gridH - marginY)/2);
      if(data[level].hasUndo){
         yCounter = yUndo + undoButtonH/2 + marginY + countButtonH + counterH/2;
      }else{
         yCounter = yGrid + countButtonH + counterH/2;
      }
      yMarker = Math.max(ySelect + (selectRectH - cellH)/2,yGrid + gridH + maxRectPerGrid*countResultH + marginY);
      gridSpacing = (paperW - rightColW - 2*gridW + marginX)/3;
      xLine = 1.5*gridSpacing + gridW;
      xMarker = xLine;
      if(maxRectPerGrid == 0){
         paperW = paperW - rightColW;
      }
      paperH = yMarker + cellH + marginY;

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
      if(!answer) {
         return;
      }
      reloadAnswer(true, true);
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         seed: rng.nextInt(0,1000),
         results: [],
         nutPos: null,
         validation: false
      };
	  if (data[level].defaultSeed >= 0) {
         defaultAnswer.seed = data[level].defaultSeed;
	  }
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

   subTask.resetDisplay = function() {
      $("#target").html(data[level].targetResults);
      initPaper();
      initGridObj();
      initButtons();
      initCounter();
      initSelect();
      initMarker();
      initHandlers();
      displayError("");
      reloadAnswer();

      displayHelper.customValidate = function() { checkResult(false, false) };
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function initGrids() {
      gridContent = Beav.Matrix.make(nbRows,nbCol,0);
      var nbAddNuts = nbNuts;
      while (nbAddNuts > 0) {
          var iRow = rng.nextInt(0, nbRows - 1);
          var iCol = rng.nextInt(0, nbCol - 1);
          if(gridContent[iRow][iCol] == 0 && nbAddNuts > 0){
              gridContent[iRow][iCol] = 1;
              nbAddNuts--;
          }
      }
      initPossNutPos();
   };

   function initPossNutPos() {
      possNutPos = Beav.Matrix.make(nbRows,nbCol,true);
      var pos = [];
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            possNutPos[iRow][iCol] = (gridContent[iRow][iCol] == 0);
            if(possNutPos[iRow][iCol]){
               pos.push({ row: iRow, col: iCol });
            }
         }
      }
      if(data[level].maxRectPerGrid == 0){
         rng.shuffle(pos);
         var row = pos[0].row;
         var col = pos[0].col;
         for(var iRow = 0; iRow < nbRows; iRow++){
            for(var iCol = 0; iCol < nbCol; iCol++){
               if(iRow != row || iCol != col){
                  possNutPos[iRow][iCol] = false;
               }
            }
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      $("#paper").css({
         width: paperW+"px",
         height: paperH+"px",
         margin: "auto"
      });

      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h,nbOv;
      switch(data[level].overlayLayout){
         case "basic":
            nbOv = 7;
            break;
         case "easy":
            nbOv = 9;
            break;
         case "medium":
            nbOv = 10;
            break;
         case "hard":
            nbOv = 11;
      }
      for(var iOver = 1; iOver <= nbOv; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = yGrid;
               break;
            case 2:
               x = 0; y = 0;
               h = paperH;
               if(data[level].overlayLayout == "basic" || data[level].overlayLayout == "easy"){
                  w = xLine;
               }else{
                  w = gridSpacing;
               }
               break;
            case 3:
               y = 0;
               h = yMarker;
              if(data[level].overlayLayout == "basic" || data[level].overlayLayout == "easy"){
                  x = xLine; 
                  w = gridSpacing/2;
               }else{
                  x = xLine - gridSpacing/2; 
                  w = gridSpacing;
               }
               break;
            case 4:
               x = 0; 
               y = yGrid + gridH;
               w = paperW;
               h = yMarker - y;
               break;
            case 5:
               x = xMarker + cellW;; 
               y = yMarker;
               w = paperW - x;
               h = paperH - y;
               break;
            case 6:
               x = 0; 
               y = yMarker + cellH;
               w = paperW;
               h = paperH - y;
               break;
            case 7:
               x = 2*(gridSpacing + gridW);
               y = 0;
               h = paperH;
               if(data[level].overlayLayout == "basic"){
                  w = paperW - x;
               }else{
                  w = xUndo - buttonW/2 - x;
               }
               break;
            case 8:
               x = xUndo - buttonW/2;;
               w = paperW - x;
               if(data[level].overlayLayout != "hard"){
                  y = yGrid + countButtonH;
               }else{
                  y = yUndo + undoButtonH/2 + marginY + countButtonH;
               }
               if(data[level].overlayLayout == "easy"){
                  h = paperH - y;
               }else{
                  h = ySelect - y;
               }
               break;
            case 9:
               x = xUndo + buttonW/2;
               y = 0;
               w = paperW - x;
               h = paperH;
               break;
            case 10:
               x = 0;
               y = yMarker;
               w = xMarker;
               h = cellH;
               break;
            case 11:
               x = xUndo - buttonW/2;
               y = yUndo + undoButtonH/2;
               w = buttonW;
               h = marginY;
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

   function initGridObj() {
      for(var iGrid = 0; iGrid < 2; iGrid++){
         var x = gridSpacing + iGrid*(gridW + gridSpacing);
         var xMsg = x + gridW/2;
         var nbNutsGrid = nbNuts + iGrid;
         paper.text(xMsg, yGrid - 20, nbNutsGrid + " " + taskStrings.nuts(nbNutsGrid)).attr(gridTitleAttr);
         gridObj[iGrid] = Grid.fromArray("paper", paper, gridContent, cellFiller(iGrid), cellW, cellH, x, yGrid, {});
      }
      if(maxRectPerGrid == 0){
         for(var row = 0; row < nbRows; row++){
            for(var col = 0; col < nbCol; col++){
               if(possNutPos[row][col]){
                  gridObj[1].setCell(cellFiller(0),{ row: row, col: col, entry: 1, reveal: true });
               }
            }
         }
      }

      var y1 = yGrid - marginY;
      var y2 = yGrid + gridH + marginY;
      paper.path(["M",xLine,y1,"V",y2]).attr(lineAttr);
   };

   function initButtons() {
      if(maxRectPerGrid == 0){
         return
      }
      var w = buttonW;
      var x = xUndo - w/2;
      var y0 = yUndo - undoButtonH/2;
      var firstButton = data[level].hasUndo ? 0 : 1;
      for(var iButton = firstButton; iButton < 2; iButton++){
         var attr = (iButton == 0) ? undoButtonAttr : countButtonAttr;
         if(firstButton == 0){
            var y = y0 + iButton*(undoButtonH + marginY);
         }else{
            var y = yGrid;
         }
         var h = (iButton == 0) ? undoButtonH : countButtonH;
         var rect = paper.rect(x,y,w,h).attr(attr.rect);
         var xText = x + w/2 + 10;
         var yText = y + h/2;
         var str = (iButton == 0) ? taskStrings.undo : taskStrings.count;
         var text = paper.text(xText,yText,str).attr(attr.text);
         var src = (iButton == 0) ? undoSrc : countSrc;
         var xIcon = x + iconW + 5;
         var yIcon = y + (h - iconW)/2;
         var icon = paper.image(src,xIcon,yIcon,iconW,iconW);
         var obj = paper.set(rect,text,icon);
         if(iButton == 0){
            undoButton = obj;
         }else{
            countButton = obj;
         }
      }
   };

   function initCounter() {
      if (maxRectPerGrid == 0){
         return
      }
      counterObj = paper.text(xCounter,yCounter,"").attr(counterAttr);
      updateCounter();
   };

   function initSelect() {
      // if(level == "basic" || level == "easy"){
         return
      // }
      // var a = selectAttr;
      // var w = selectRectW, h = selectRectH;
      // var x0 = xSelect, y0 = ySelect;
      // var r = selectButtonR;
      // paper.rect(x0,y0,w,h).attr(a.rect);
      // var yCirc = y0 + h - r - marginY/2;
      // var yText = y0 + (h - 2*r - marginY/2)/2;
      // var xm = x0 + w/2;
      // paper.text(xm,yText,taskStrings.select).attr(a.text);
      // var buttons = [];
      // for(var iButton = 0; iButton < 2; iButton++){
      //    var xCirc = x0 + marginX/2 + r + iButton*(w - 2*r - marginX);
      //    var circ = paper.circle(xCirc,yCirc).attr(a.circ);
      //    var xArr = xCirc - arrW/2;
      //    var yArr = yCirc - arrH/2;
      //    var angle = (iButton == 0) ? 180 : 0;
      //    var arr = paper.image(arrowSrc,xArr,yArr,arrW,arrH).transform(["R",angle]);
      //    buttons[iButton] = paper.set(circ,arr);
      // }
      // var text = paper.text(xm,yCirc,"0").attr(a.nb);
      // selectResultObj = { buttons: buttons, text: text };
   };

   function initMarker() {
      var x = xMarker, y = yMarker;
      var w = cellW, h = cellH;
      var a = markerAttr;
      paper.rect(x,y,w,h).attr(a.rect);
      var xImg = x + markerOffsetX;
      var yImg = y + markerOffsetY;
      var imgW = w;
      var imgH = h;
      var img = paper.image(markerSrc,xImg,yImg,imgW,imgH);
      var ov = paper.rect(x - markerMargin,y - markerMargin,w + 2*markerMargin,h + 2*markerMargin).attr(overlayAttr);
      markerObj = paper.set(img,ov);
      var xText = x + w + marginX;
      if (typeof(enableRtl) !== "undefined") {
          xText = xText + 150;
      }
      var yText = y + h/2;
      paper.text(xText,yText,taskStrings.dragMarker).attr(a.text);
   };

   var initHandlers = function() {
      updateUndo();
      updateCountButton();
      updateSelectResult();
      if(maxRectPerGrid > 0){
         for(var iGrid = 0; iGrid < 2; iGrid++){
            if((!data[level].rectOnLeftGrid) && iGrid == 0){
               continue;
            }
            gridObj[iGrid].enableDragSelection(onMouseDown(iGrid), onMouseMove, onMouseUp, onGridSelectionChange, selectionBoxAttr, selectionMargins);
            gridObj[iGrid].overlay.attr("cursor","pointer");
         }
      }
      Beav.dragWithTouch(markerObj, onMarkerMove, onMarkerStart, onMarkerEnd, displayHelper);
      markerObj.attr("cursor","grab");
   };

   function disableHandlers() {
      if(!data[level].hasUndo){
         var set = paper.set(countButton)
      }else{
         var set = paper.set(undoButton,countButton);
		 //selectResultObj.buttons[0],selectResultObj.buttons[1])
      }
      set.unclick().attr("cursor","auto");
      for(var iGrid = 0; iGrid < 2; iGrid++){
         gridObj[iGrid].disableDragSelection();
      }
   };

   function updateCounter() {
      if(maxRectPerGrid == 0){
         return
      }
      var val = answer.results.length;
      var tar = targetResults;
      counterObj.attr("text",taskStrings.measCounter(val,tar));
   };

   function updateUndo() {
      if(!data[level].hasUndo){
         return
      }
      undoButton.unclick();
      if(selectHist.length > 0) {
         undoButton.click(clickUndo);
         undoButton.attr("cursor","pointer");
         undoButton[0].attr("opacity",1);
      } else {
         undoButton.attr("cursor","auto");
         undoButton[0].attr("opacity",0.5);
      }
   };

   function updateCountButton() {
      if(maxRectPerGrid == 0){
         return
      }
      countButton.unclick();
      if(!newMeas){
         countButton.click(newMeasure);
         countButton.attr("cursor","pointer");
         countButton[0].attr("opacity",1);
         countButton[1].attr("text",taskStrings.newMeasure);
      }else{
         countButton[1].attr("text",taskStrings.count);
         countButton.click(clickCount);
         countButton.attr("cursor","pointer");
         countButton[0].attr("opacity",1);
      }
   };

   function updateSelectResult() {
      // if((level == "basic") || (level == "easy")){
         return;
      // }
      // var obj = selectResultObj;
      // if(newMeas){
      //    // obj.text.hide();
      //    currMeasID = answer.results.length;
      // }
      // obj.text.attr("text",currMeasID + 1).show();
      
      // for(var iButton = 0; iButton < 2; iButton++){
      //    obj.buttons[iButton].unclick();
      //    if((iButton == 0 && currMeasID > 0) || (iButton == 1 && currMeasID < answer.results.length - 1)){
      //       obj.buttons[iButton].click(clickSelect(iButton));
      //       obj.buttons[iButton].attr("cursor","pointer");
      //       obj.buttons[iButton][0].attr("opacity",1);
      //    }else{
      //       obj.buttons[iButton].attr("cursor","auto");
      //       obj.buttons[iButton][0].attr("opacity",0.5);
      //    }
      // }
   };

   function updateHighlight() {
      var obj = gridObj[1];
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(!overCell || overCell.col != iCol || overCell.row != iRow){
               obj.unhighlightCell(iRow,iCol);
            }else{
               obj.highlightCell(iRow,iCol,highlightAttr[0]);
            }
         }
      }
      markerObj.toFront();
   };

   function clickSelect(id) {
      return function() {
         var selHistLength = selectHist.length;
         if(selHistLength > 0){
            for(var iSel = 0; iSel < selHistLength; iSel++){
               clickUndo();
            }
         }
         newMeas = false;
         var inc = (id == 0) ? -1 : 1;
         currMeasID += inc;
         showMeasure(currMeasID);
         updateSelectResult();
         updateCountButton();
      }
   };

   function clickUndo() {
      displayError("");
      if(selectHist.length > 0){
         var last = selectHist.pop();
         var gridID = last.gridID;
         var rectID = last.rectID;
         currSelection[gridID].pop();
         selectRectObj[gridID][rectID].remove();
         selectRectObj[gridID][rectID] = null;
      }
      updateUndo();
      updateCountButton();
   };

   function clickCount() {
      displayError("");
      var missingRect = false;
      for(var iGrid = 0; iGrid < 2; iGrid++){
         if((!data[level].rectOnLeftGrid) && iGrid == 0){
            continue;
         }
         if(currSelection[iGrid]){
            for(var iRect = 0; iRect < maxRectPerGrid; iRect++){
              if(!currSelection[iGrid][iRect]){
                  missingRect = true;
                  break;
               }
            }
         }else{
            missingRect = true;
            break;
         }
      }
      if(missingRect){
         var error = taskStrings.missingRect(maxRectPerGrid);
         displayError(error);
         return
      }
      var res = countHazelnuts(answer.results.length, currSelection);
      for(var iGrid = 0; iGrid < 2; iGrid++){
         if((!data[level].rectOnLeftGrid) && iGrid == 0){
            continue;
         }
         for(var iRect = 0; iRect < maxRectPerGrid; iRect++){
            var val = res[iGrid][iRect];
            var str = val;
            if (!shortResult) {
                str += " " + taskStrings.nuts(val);
            }
            selectRectObj[iGrid][iRect][1].attr("text",str).show().toFront();
            selectRectObj[iGrid][iRect][2].show();
            if(maxRectPerGrid == 2){
               selectRectObj[iGrid][iRect][2].toFront();
            }
            selectRectObj[iGrid][iRect][3].attr("text",taskStrings.countResult(val,iRect)).show();
         } 
         gridObj[iGrid].overlay.toFront();
      }
      if(maxRectPerGrid == 2){
         for(var iGrid = 0; iGrid < 2; iGrid++){
            fixTextPos(selectRectObj[iGrid]);
         }
      }
      resultsRectObj.push(selectRectObj);
      answer.results.push(Beav.Object.clone(currSelection));
      selectRectObj = [];
      currSelection = [];
      selectHist = [];
      updateUndo();
      newMeas = false;
      updateCountButton();
      updateCounter();
   };

   function countHazelnuts(round, selections) {
      var res = [];
      pickZoneHazelnut(round, selections);
      for(var iGrid = 0; iGrid < 2; iGrid++) {
         if((!data[level].rectOnLeftGrid) && iGrid == 0) {
            continue;
         }
         res[iGrid] = [];
         for(var iRect = 0; iRect < maxRectPerGrid; iRect++) {
            var curr = selections[iGrid][iRect];
            var col1 = curr[0].col;
            var col2 = curr[1].col;
            var row1 = curr[0].row;
            var row2 = curr[1].row;
            var count = 0;
            var hasExtraNut = false;
            for(var row = row1; row <= row2; row++) {
               for(var col = col1; col <= col2; col++) {
                  if(gridContent[row][col]) {
                     count++;
                  }
                  if (possNutPos[row][col]) {
                      hasExtraNut = true;
                  }
               }
            }
            if ((iGrid == 1) && hasExtraNut) {
              count++;
            }
            res[iGrid][iRect] = count;
         }
      }
      return res
   };
   
   function inSelections(iRow, iCol, selections) {
        var inSelections = [0, 0];
        for (var iRect = 0; iRect < maxRectPerGrid; iRect++) {
            var curr = selections[1][iRect];
            if((iRow >= curr[0].row) && (iRow <= curr[1].row) &&
               (iCol >= curr[0].col) && (iCol <= curr[1].col)){
                inSelections[iRect] = 1;
            }
        }
        return inSelections;
   }
   
   function pickZoneHazelnut(round, selections) {
      var countsInZones = [[0, 0], [0, 0]];
      var maxInZone = 0;
      var zonesPossibleHazelnut = [[0, 0], [0, 0]];
      var zonesHazelnut = [];
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(possNutPos[iRow][iCol]){
                var inRect = inSelections(iRow, iCol, selections);
                countsInZones[inRect[0]][inRect[1]] += 1;
                var nbInZone = countsInZones[inRect[0]][inRect[1]];
                if (nbInZone > maxInZone) {
                    maxInZone = nbInZone;
                    zonesPossibleHazelnut = [[0, 0], [0, 0]];
                    zonesHazelnut = [];
                }
                if (nbInZone >= maxInZone) {
                    zonesPossibleHazelnut[inRect[0]][inRect[1]] = 1;
                }
            }
         }
      }
      for (var inRect1 = 0; inRect1 < 2; inRect1++) {
          for (var inRect2 = 0; inRect2 < 2; inRect2++) {
              var inRect = [inRect1, inRect2];
              if (zonesPossibleHazelnut[inRect[0]][inRect[1]]) {
                zonesHazelnut.push(inRect);
              }
          }
      }
      var pickedZone = zonesHazelnut[round % zonesHazelnut.length];
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var inRect = inSelections(iRow, iCol, selections);
            if ((inRect[0] != pickedZone[0]) || (inRect[1] != pickedZone[1])) {
                possNutPos[iRow][iCol] = false;
            }
         }
      }
   }

   function newMeasure() {
      if(answer.results.length >= maxResults){
         displayError(taskStrings.tooManyMeas(maxResults));
         return
      }
      showMeasure(false);
      countButton[1].attr("text",taskStrings.count);
      newMeas = true;
      updateCountButton();
      updateSelectResult();
   };

   function showMeasure(id) {
      for(var iRes = 0; iRes < resultsRectObj.length; iRes++){
         for(var iGrid = 0; iGrid < 2; iGrid++){
            if((!data[level].rectOnLeftGrid) && iGrid == 0){
               continue;
            }
            for(var iRect = 0; iRect < maxRectPerGrid; iRect++){
               if(id !== false && iRes == id){
                  resultsRectObj[iRes][iGrid][iRect].show();
               }else{
                  resultsRectObj[iRes][iGrid][iRect].hide();
               }
            }
         }
      }
   };

   var onMouseDown = function(gridID) {
      return function() {
         displayError("");
         if(!newMeas){
            newMeasure();
         }
         if(currSelection[gridID]){
            var rectID = currSelection[gridID].length;
         }else{
            var rectID = 0;
         }
         dragData = { rectID: rectID, gridID: gridID };
         resetMarker();
      }
   };

   var onMouseMove = function(dx,dy) {

   };

   var onMouseUp = function(event, anchorPaperPos, anchorGridPos, currentPaperPos, currentGridPos) {
      var gridID = dragData.gridID;
      var rectID = dragData.rectID;
      if(!anchorGridPos || !currentGridPos){
         return
      }
      if(!currSelection[gridID]){
         currSelection[gridID] = [];
      }
      if(rectID >= maxRectPerGrid){
         rectID = maxRectPerGrid - 1;
         removeFromHist(gridID,rectID);
      }
      var pos1 = anchorGridPos;
      var pos2 = currentGridPos;
      var minCol = Math.max(Math.min(pos1.col,pos2.col),0);
      var minRow = Math.max(Math.min(pos1.row,pos2.row),0);
      var maxCol = Math.min(Math.max(pos1.col,pos2.col),nbCol - 1);
      var maxRow = Math.min(Math.max(pos1.row,pos2.row),nbRows - 1);
      currSelection[gridID][rectID] = [{ row: minRow, col: minCol }, { row: maxRow, col: maxCol }];
      selectHist.push({ gridID: gridID, rectID: rectID });
      updateUndo();
      updateCountButton();
      gridObj[gridID].overlay.toFront(); // to start drag above a previous rect
   };

   function removeFromHist(gridID,rectID) {
      for(var iHist = 0; iHist < selectHist.length; iHist++){
         var entry = selectHist[iHist];
         if(entry.gridID == gridID && entry.rectID == rectID){
            selectHist.splice(iHist,1);
            return
         }
      }
   };

   function onMarkerStart(x,y,ev) {
      if(answer.validation){
         return
      }
      displayError("");
      markerObj.toFront();
   };

   function onMarkerMove(dx,dy,x,y,ev) {
      if(answer.validation){
         return
      }
      if (answer.results.length == 0 && (maxRectPerGrid > 0)) {
          displayError(taskStrings.doMeasuresFirst(level));
          return;
      }
      if(Math.sqrt(dx*dx + dy*dy) < dragThreshold){
         return
      }
      showMeasure(false);
      var x0Mark = markerObj[1].attr("x") + markerMargin;
      var y0Mark = markerObj[1].attr("y") + markerMargin;
      var xMark = x0Mark + dx;
      var yMark = y0Mark + dy;
      if(xMark < xLine){
         dx = xLine - x0Mark;
      }else if(xMark + cellW > paperW){
         dx = paperW - cellW - x0Mark;
      }
      if(yMark < 0){
         dy = -y0Mark;
      }else if(yMark + cellH > paperH){
         dy = paperH - cellH - y0Mark;
      }
      markerObj.transform(["T",dx,dy]);
      var isOver = isOverGrid(x0Mark + dx,y0Mark + dy);
      if(isOver && overCell && isOver.col == overCell.col && isOver.row == overCell.row){
         return
      }
      if(!isOver && !overCell){
         return
      }
      overCell = isOver;
      updateHighlight();
   };

   function onMarkerEnd(ev) {
      if(answer.validation){
         return
      }
      if(answer.results.length == 0 && maxRectPerGrid > 0){
         return
      }
      if(overCell){
         var x0 = gridObj[1].getLeftX();
         var y0 = gridObj[1].getTopY();
         var newX = x0 + cellW*overCell.col;
         var newY = y0 + cellH*overCell.row;
      }else{
         var newX = xMarker;
         var newY = yMarker;
      }
      markerObj[0].attr({ x: newX + markerOffsetX, y: newY + markerOffsetY });
      markerObj[1].attr({ x: newX - markerMargin, y: newY - markerMargin });
      markerObj.transform([]);
      if(overCell)
         answer.nutPos = Beav.Object.clone(overCell);
      overCell = null;
      updateHighlight();
   };

   var onGridSelectionChange = function(dx, dy, x, y, event, anchorPaperPos, anchorGridPos, currentPaperPos, currentGridPos) {
      var gridID = dragData.gridID;
      var rectID = dragData.rectID;
      if(rectID >= maxRectPerGrid){
         rectID = maxRectPerGrid - 1;
      }
      if(!anchorGridPos || !currentGridPos || !newMeas){
         return
      }
      var pos1 = anchorGridPos;
      var pos2 = currentGridPos;
      var minCol = Math.max(Math.min(pos1.col,pos2.col),0);
      var minRow = Math.max(Math.min(pos1.row,pos2.row),0);
      var maxCol = Math.min(Math.max(pos1.col,pos2.col),nbCol - 1);
      var maxRow = Math.min(Math.max(pos1.row,pos2.row),nbRows - 1);
      var x0 = gridObj[gridID].getLeftX();
      var y0 = gridObj[gridID].getTopY();
      var x = x0 + minCol*cellW;
      var y = y0 + minRow*cellH;
      var w = Math.min((maxCol - minCol + 1)*cellW,(nbCol - minCol)*cellW);
      var h = Math.min((maxRow - minRow + 1)*cellH,(nbRows - minRow)*cellH);
      var raphObj = (selectRectObj[gridID]) ? selectRectObj[gridID][rectID] : null;
      if(!raphObj){
         var raphObj = drawRect(x,y,w,h,rectID,gridID);
         raphObj[0].attr("cursor","pointer");
         raphObj[1].hide();
         raphObj[2].hide();
         if(!selectRectObj[gridID]){
            selectRectObj[gridID] = [raphObj];
         }else{
            selectRectObj[gridID][rectID] = raphObj;
         }
      }else{
         var xm = x + w/2;
         var ym = y + h/2;
         var xText = xm - nutIconSpacing;
         var xIcon = xm + nutIconSpacing;
         if (typeof(enableRtl) !== "undefined") {
             xIcon += 20;
         }
         var yIcon = ym - nutIconW/2 - 1;
         raphObj[0].attr({ x: x, y: y, width: w, height: h });
         if(shortResult) {
            raphObj[1].attr({ x: xText, y: ym });
            raphObj[2].attr({ x: xIcon, y: yIcon });
         }else{
            raphObj[1].attr({ x: xm, y: ym });
            raphObj[2].attr({ x: xm - countBoxW/2, y: ym - countBoxH/2 });
         }
      }
   };

   function fixTextPos(rectObj) {
      var textObj1 = rectObj[0][1];
      var textObj2 = rectObj[1][1];
      var iconObj1 = rectObj[0][2];
      var iconObj2 = rectObj[1][2];
      var set1 = paper.set(textObj1,iconObj1);
      var set2 = paper.set(textObj2,iconObj2);
      var bb1 = set1.getBBox();
      var bb2 = set2.getBBox();
      var x11 = bb1.x;
      var x12 = bb1.x + bb1.width;
      var y11 = bb1.y;
      var y12 = bb1.y + bb1.height;
      var x21 = bb2.x;
      var x22 = bb2.x + bb2.width;
      var y21 = bb2.y;
      var y22 = bb2.y + bb2.height;
      if(x12 < x21 || x22 < x11 || y12 < y21 || y22 < y11){
         return
      }
      if(x21 - x11 > 0){
         var dx = -(x12 - x21)/2;
      }else{
         var dx = (x22 - x11)/2;
      }
      if(y21 - y11 > 0){
         var dy = -(y12 - y21)/2;
      }else{
         var dy = (y22 - y11)/2;
      }
      set1.transform(["T",dx,dy]);
      set2.transform(["T",-dx,-dy]);
   };

   function isOverGrid(x,y) {
      var xGrid = gridObj[1].getLeftX();
      var yGrid = gridObj[1].getTopY();
      if(x + cellW < xGrid || x > xGrid + gridW || y + cellH < yGrid || y > yGrid + gridH){
         return false
      }
      var d = Infinity;
      var cell;
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var pos = gridObj[1].getCellPos(iRow,iCol);
            var currD = Beav.Geometry.distance(x,y,pos.x,pos.y);
            if(currD < d){
               d = currD;
               cell = { row: iRow, col: iCol }
            }
         }
      }
      return cell
   };

   function resetMarker() {
      markerObj[0].attr({ x: xMarker + markerOffsetX, y: yMarker + markerOffsetY });
      markerObj[1].attr({ x: xMarker - markerMargin, y: yMarker - markerMargin });
      overCell = null;
      answer.nutPos = null;
   };

   function cellFiller(gridID) {
      return function(cellData, paper) {
         var x = cellData.xPos;
         var y = cellData.yPos;
         var entry = cellData.entry;
         var reveal = cellData.reveal;
         var w = cellW, h = cellH;
         if(!reveal && (data[level].maxRectPerGrid > 0) && (data[level].rectOnLeftGrid || gridID == 1)){
            var back = paper.image(packagingSrc,x,y,w,h);
            return [back]
         }else{
            if(entry < 2){
               var back = paper.image(chocolateSrc,x,y,w,h);
               var xNut = x + (w - nutW)/2;
               var yNut = y + (h - nutH)/2;
               var nut = (entry == 1) ? paper.image(nutSrc,xNut,yNut,nutW,nutH) : null;
               return (nut) ? [back,nut] : [back]
            }
            if(entry == 2){
               var mask = paper.rect(x,y,w,h).attr(maskAttr);
               return [mask]
            }
         }
      }
   };

   function drawRect(x,y,w,h,id,gridID) {
      var a = selectionAttr[id];
      var rect = paper.rect(x,y,w,h).attr(a.rect);
      var xm = x + w/2;
      var ym = y + h/2;
      if(shortResult) {
         var xText = xm - nutIconSpacing;
         var xIcon = xm + nutIconSpacing;
         var yIcon = ym - nutIconW/2 - 1;
         var text = paper.text(xText,ym,"0").attr(a.text);
         var icon = paper.image(nutIconSrc[id],xIcon,yIcon,nutIconW,nutIconW);
      }else{
         var icon = paper.rect(xm - countBoxW/2,ym - countBoxH/2,countBoxW,countBoxH).attr(countBoxAttr.rect);
         var text = paper.text(xm,ym,"0").attr(countBoxAttr.text);
      }
      var xGrid = gridObj[gridID].getLeftX();
      var xMsg = xGrid + gridW/2;
      var ySpacing = 20;
      var yMsg = yGrid + gridH + countResultH/2 + id*ySpacing;
      var msg = paper.text(xMsg,yMsg,"").attr(countResultAttr[id]);
      return paper.set(rect,text,icon,msg)
   };

   function revealNuts(pos) {
      for(var iGrid = 0; iGrid < 2; iGrid++){
         if((!data[level].rectOnLeftGrid) && iGrid == 0){
            continue;
         }
         for(var iRow = 0; iRow < nbRows; iRow++){
            for(var iCol = 0; iCol < nbCol; iCol++){
               var entry = (gridContent[iRow][iCol] == 1 || (iGrid == 1 && iRow == pos.row && iCol == pos.col)) ? 1 : 0;
               gridObj[iGrid].setCell(cellFiller(iGrid),{ row: iRow, col: iCol, entry: entry, reveal: true });
            }
         }
         for(var iRect = 0; iRect < maxRectPerGrid; iRect++){
            resultsRectObj[answer.results.length - 1][iGrid][iRect][3].hide();
         }
      }
      disableHandlers();
   };

   function maskGrid(cells){
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var noMask = false;
            for(var iCell = 0; iCell < cells.length; iCell++){
               var cell = cells[iCell];
               if(iRow == cell.row && iCol == cell.col){
                  noMask = true;
               }
            }
            if(!noMask)
               gridObj[1].addToCell(cellFiller(0),{ row: iRow, col: iCol, entry: 2, reveal: true });
         }
      }
   };

   function reloadAnswer(noVisual,noValidation) {
      rng.reset(answer.seed);
      initGrids();
      var res = answer.results;
      if(!noVisual){
         if(answer.nutPos){
            var pos = answer.nutPos;
            var x0 = gridObj[1].getLeftX()
            var y0 = gridObj[1].getTopY();
            var x = x0 + pos.col*cellW;
            var y = y0 + pos.row*cellH;
            markerObj[0].attr({ x: x + markerOffsetX, y: y + markerOffsetY });
            markerObj[1].attr({ x: x - markerMargin, y: y - markerMargin });
         }
      }
      for(var iRes = 0; iRes < res.length; iRes++){
         var count = countHazelnuts(iRes, res[iRes]);
         if(!noVisual){
            resultsRectObj[iRes] = [];
            for(var iGrid = 0; iGrid < 2; iGrid++){
               if((!data[level].rectOnLeftGrid) && iGrid == 0){
                  continue;
               }
               resultsRectObj[iRes][iGrid] = [];
               var x0 = gridObj[iGrid].getLeftX();
               var y0 = gridObj[iGrid].getTopY();
               for(var iRect = 0; iRect < maxRectPerGrid; iRect++){
                  var pos1 = res[iRes][iGrid][iRect][0];
                  var pos2 = res[iRes][iGrid][iRect][1];
                  var x = x0 + pos1.col*cellW;
                  var y = y0 + pos1.row*cellH;
                  var w = (pos2.col - pos1.col + 1)*cellW;
                  var h = (pos2.row - pos1.row + 1)*cellH;
                  var raphObj = drawRect(x,y,w,h,iRect,iGrid);
                  var val = count[iGrid][iRect];
                  var str = (shortResult) ? val : val+" "+taskStrings.nuts(val);
                  raphObj[1].attr("text",str);
                  raphObj[3].attr("text",taskStrings.countResult(val,iRect));
                  resultsRectObj[iRes][iGrid][iRect] = raphObj;
               }
               gridObj[iGrid].overlay.toFront();
            }
            if(maxRectPerGrid == 2){
               for(var iGrid = 0; iGrid < 2; iGrid++){
                  fixTextPos(resultsRectObj[iRes][iGrid]);
               }
            }
         }
      }
      if(res.length > 0){
         newMeas = false;
         currMeasID = res.length - 1;
         if(!noVisual){
            showMeasure(currMeasID);
            updateSelectResult();
            updateCountButton();
            updateCounter();
         }
      }
      if(answer.nutPos && !noVisual){
         markerObj.toFront();
      }
      if(answer.validation && !noValidation){
         checkResult(noVisual,true);
      }
   };

   function checkResult(noVisual,noValidation) {
      if(!answer.nutPos){
         var error = taskStrings.dragMarker;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      if(answer.results.length == 0 && maxRectPerGrid > 0){
         var error = taskStrings.errorNoResult;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }

      var row = answer.nutPos.row;
      var col = answer.nutPos.col;
      var currNutPos;
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(possNutPos[iRow][iCol] && (iRow != row || iCol != col)){
               currNutPos = { row: iRow, col: iCol };
            }
         }
      }
      if(currNutPos == undefined){
         currNutPos = { row: row, col: col };
      }
      if(row != currNutPos.row || col != currNutPos.col){
         var error = taskStrings.errorWrongPos+" "+taskStrings.clickRetry;
         if(!noVisual){
            revealNuts(currNutPos);
            gridObj[1].highlightCell(currNutPos.row,currNutPos.col,highlightAttr[2]);
            gridObj[1].highlightCell(row,col,highlightAttr[1]);
            maskGrid([currNutPos,answer.nutPos]);
            markerObj.toFront();
            answer.validation = true;
            if(!noValidation)
               platform.validate("done");
         }
         return { successRate: 0, message: error }
      }
      if(!noVisual){
         revealNuts(currNutPos);
         gridObj[1].highlightCell(currNutPos.row,currNutPos.col,highlightAttr[2]);
         maskGrid([currNutPos]);
         markerObj.toFront();
         answer.validation = true;
         if(!noValidation)
            platform.validate("done");
      }
      if((answer.results.length > targetResults + 1) && (maxRectPerGrid > 0)){
         var error = taskStrings.tooManyMeasures+" "+taskStrings.clickRetry;
         return { successRate: 0, message: error };
      }
      if(answer.results.length > targetResults){
         var error = taskStrings.partialSuccess+" "+taskStrings.clickRetry;
         return { successRate: 0.5, message: error };
      }
      return { successRate: 1, message: taskStrings.success };
   };

   function displayError(msg) {
      if(respEnabled){
         displayHelper.displayError(msg);
      }else{
         $("#error").html(msg);
      }
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

