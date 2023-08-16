   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         target: {
            patterns: [
               { start: [0,0], end: [2,2], type: 0 },
               { start: [1,2], end: [4,4], type: 0 }
            ],
            grid: [
               [0, 0, null, null],
               [0, 0, null, null],
               [null, 1, 1, 1],
               [null, 1, 1, 1]
            ]
         },
         steps: 2,
         nbTypes: 1,
         hasTargetImage: true
      },
      easy: {
         target: {
            patterns: [
               { start: [1,0], end: [4,2], type: 0 },
               { start: [2,3], end: [4,4], type: 0 },
               { start: [0,0], end: [2,4], type: 0 }
            ],
            grid: [
               [2, 2, 0, 0],
               [2, 2, 0, 0],
               [2, 2, null, null],
               [2, 2, 1, 1]
            ]
         },
         steps: 3,
         nbTypes: 1,
         hasTargetImage: true
      },
      medium: {
         target: {
            patterns: [
               { start: [0,0], end: [4,4], type: 0 },
               { start: [3,1], end: [4,3], type: 0 },
               { start: [0,1], end: [3,3], type: 0 },
               { start: [0,0], end: [2,4], type: 0 }
            ],
            grid: [
               [3, 3, 0, 0],
               [3, 3, 2, 1],
               [3, 3, 2, 1],
               [3, 3, 0, 0],
            ]
         },
         steps: 4,
         nbTypes: 1,
         hasTargetImage: false
      },
      hard: {
         target: {
            patterns: [
               { start: [0,0], end: [4,4], type: 0 },
               { start: [0,0], end: [2,4], type: 0 },
               { start: [0,1], end: [2,3], type: 1 },
               { start: [1,0], end: [4,3], type: 0 },
               { start: [2,0], end: [4,2], type: 1 }
            ],
            grid: [
               [1, 1, 4, 4],
               [2, 2, 4, 4],
               [2, 2, 3, 3],
               [1, 1, 0, 0]
            ]
         },
         steps: 5,
         nbTypes: 2,
         hasTargetImage: false
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
   var targetPaper;
   var targetPaperW = 200;
   var targetPaperH = 200;

   var marginX = 20;
   var marginY = 20;
   var cellW = 80, cellH = cellW;
   var xGrid, yGrid = marginY;
   var yUndo;
   var undoButtonW = 120;
   var undoButtonH = 30;
   var iconW = 14;
   var xUndo = (paperW - undoButtonW)/2;
   var dragThreshold = 10;
   var selectionMargins = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
   };
   var backgroundDotsR = 2;
   var backgroundDotsSpacing = 8;
   var yPatternLabel = 40;
   var ySteps;
   var exCellW, exCellH; 

   var nbRows, nbCol;
   var target;
   var currGrid;
   var patternType = 0;
   var dragData;
   var undoButton, patternChangeButtons = [];
   var targetLineData = [];
   var exLineData = [];
   var userLineData = [];
   var currOutlineObj = null;
   var maxSteps, stepsObj;
   var errorObj;
   var typeShift = 0;

   var grid, targetGrid;
   var rng;

   var undoSrc = $("#undo").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
      darkGrey: "#666666"
   };
   var backgroundLineAttr = {
      stroke: colors.grey,
      "stroke-width": 1,
      opacity: 0
   };
   var lineAttr = {
      stroke: colors.black,
      // stroke: "#baa15a",
      "stroke-width": 1,
      opacity: 0.3
   };
   var outlineAttr = {
      stroke: colors.darkGrey,
      "stroke-width": 2,
      // "stroke-dasharray": ["- "]
   };
   var currOutlineAttr = {
      stroke: colors.darkBlue,
      "stroke-width": 3,
      fill: "none"
   };
   var backgroundAttr = {
      stroke: "none",
      // fill: colors.lightYellow
      fill: "white"
   };
   var targetPatternAttr = {
      stroke: "none",
      // fill: colors.black,
      opacity: 0.5
   };
   var patternAttr = {
      // stroke: "none",
      stroke: colors.darkBlue,
      "stroke-width": 3,
      fill: colors.blue,
      "fill-opacity": 0.6
   };
   var patternBackgroundAttr = {
      stroke: "none",
      fill: colors.lightYellow,
      opacity: 0.5
   };
   var currPatternAttr = {
      stroke: "none",
      fill: colors.blue,
      "fill-opacity": 0.6
   };
   var selectionBoxAttr = {
      stroke: "#203f67",
      "stroke-width": 5
   };
   var undoButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue
      },
      text: {
         "font-size": 12,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var patternChangeButtonAttr = {
      pattern: {
         stroke: "none",
         fill: colors.blue
      },
      unselected: {
         stroke: colors.darkGrey,
         "stroke-width": 1,
         r: 0
      },
      selected: {
         stroke: colors.darkBlue,
         "stroke-width": 4,
         r: 3
      }
   };
   var highlightAttr = {
      stroke: "red",
      "stroke-width": 3
   };
   var backgroundDotsAttr = {
      stroke: "none",
      fill: colors.darkGrey,
      opacity: 0.7
   };
   var patternLabelAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var stepsAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var errorAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: "red"
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed);
      target = data[level].target;
      nbRows = target.grid.length;
      nbCol = target.grid[0].length;
      nbTypes = data[level].nbTypes;
      yError = yGrid + nbRows*cellH + 25;
      yUndo = yError + 25;
      xGrid = (paperW - nbCol*cellW)/2;
      paperH = yUndo + undoButtonH + marginY;
      randomizeData();
      targetArray = target.grid.splice();

      currGrid = Beav.Matrix.make(nbRows, nbCol, null);
      maxSteps = data[level].steps;
      $("#targetSteps").html(maxSteps);
      ySteps = yGrid + nbRows*cellH - marginY/2;

      exCellW = targetPaperW/nbCol;
      exCellH = targetPaperH/nbRows;
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
      if(data[level].hasTargetImage){
         initTargetImage();
      }
      initPaper();
      initGrid();
      if (nbTypes > 1) {
         initPatternChangeButtons();
      }
      initUndo();
      initHandlers();
      updateSteps();
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
         history: []
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

   function randomizeData() {
      typeShift = 0;//rng.nextBit();
      var horSym = rng.nextBit();
      var vertSym = rng.nextBit();
      // typeShift = 0;
      // horSym = 0;
      // vertSym = 0;
      for(var iPattern = 0; iPattern < target.patterns.length; iPattern++){
         var pattern = target.patterns[iPattern];
         var tempPattern = Beav.Object.clone(pattern);
         pattern.type = (pattern.type + typeShift)%2;  
         if(horSym){
            pattern.start[1] = nbCol - tempPattern.end[1];
            pattern.end[1] = nbCol - tempPattern.start[1];
         }
         if(vertSym){
            pattern.start[0] = nbCol - tempPattern.end[0];
            pattern.end[0] = nbCol - tempPattern.start[0];
         }
      }
      patternType = (patternType + typeShift)%2;

      var tempGrid = Beav.Object.clone(target.grid);
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var newCol = (vertSym) ? nbCol - 1 - iCol : iCol;
            var newRow = (horSym) ? nbRows - 1 - iRow : iRow;
            target.grid[iRow][iCol] = tempGrid[newRow][newCol];
         }
      }
   };

   function initTargetImage() {
      // var size = 200;
      var cW = exCellW;
      targetPaper = subTask.raphaelFactory.create("target", "target", targetPaperW,targetPaperH);
      targetPaper.rect(0,0,targetPaperW,targetPaperH).attr(backgroundAttr);
      var exTargetGrid = Grid.fromArray("target", targetPaper, target.grid, targetCellFiller, cW, cW, 0, 0, backgroundLineAttr);
      drawBackgroundPattern(true);
      drawOutline(true,true);
      var exGrid = Grid.fromArray("target", targetPaper, target.grid, exCellFiller, cW, cW, 0, 0, lineAttr,true);
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);

      $("#zone_2 .overlay").remove();
      $("#zone_2").css({ position: "relative", "padding-top": "1px" });
      var y0 = 16;
      var x,y,w,h;
      var nbOverlays = (nbTypes == 1) ? 7 : 10;
      for(var iOver = 1; iOver <= nbOverlays; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = y0;
               w = paperW;
               h = yGrid;
               break;
            case 2:
               x = 0;
               y = y0 + yGrid;
               w = (nbTypes == 1) ? xGrid : (xGrid - cellW)/2;
               h = paperH - yGrid;
               break;
            case 3:
               x = xGrid + nbCol*cellW; 
               y = y0 + yGrid;
               w = paperW - x;
               h = paperH - y + y0;
               break;
            case 4:
               x = xGrid; 
               y = y0 + yGrid + nbRows*cellH;
               w = nbRows*cellW;
               h = y0 + yUndo - y;
               break;
            case 5:
               x = xGrid;
               y = y0 + yUndo;
               w = xUndo - xGrid;
               h = undoButtonH;
               break;
            case 6:
               x = xUndo + undoButtonW;
               y = y0 + yUndo;
               w = xUndo - xGrid;
               h = undoButtonH;
               break;
            case 7:
               x = xGrid;
               y = y0 + yUndo + undoButtonH;
               w = nbCol*cellW;
               h = y0 + paperH - y;
               break;
            case 8:
               x = (xGrid - cellW)/2;
               y = y0 + yGrid;
               w = xGrid - x;
               h = y0 + yPatternLabel + marginY - y;
               break;
            case 9:
               x = (xGrid - cellW)/2 + cellW;
               y = y0 + yPatternLabel + marginY;
               w = xGrid - x;
               h = 2*cellH + marginY;
               break;
            case 10:
               x = (xGrid - cellW)/2;
               y = y0 + yPatternLabel + marginY + 2*cellH + marginY;
               w = xGrid - x;
               h = y0 + paperH - y;
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
      paper.rect(xGrid,yGrid,nbRows*cellW,nbCol*cellH).attr(backgroundAttr);
      targetGrid = Grid.fromArray("paper", paper, target.grid, targetCellFiller, cellW, cellH, xGrid, yGrid, backgroundLineAttr);
      drawBackgroundPattern();
      drawOutline(true);
      grid = Grid.fromArray("paper", paper, currGrid, cellFiller, cellW, cellH, xGrid, yGrid, lineAttr,true);
      updateCurrGrid();
   };

   function initPatternChangeButtons() {
      var xStart = (xGrid - cellW)/2;
      var xEnd = xStart + cellW;
      var y0 = yPatternLabel + marginY;
      var attr = patternChangeButtonAttr;
      var xText = xStart + cellW/2;
      paper.text(xText,yPatternLabel,taskStrings.patterns).attr(patternLabelAttr);
      for(var type = 0; type < 2; type++){
         var yStart = y0 + type*(cellH + marginY);
         var yEnd = yStart + cellH;
         var rect = paper.rect(xStart,yStart,cellW,cellH).attr(backgroundAttr);
         var pattern = drawPattern({ xStart: xStart, yStart: yStart, xEnd: xEnd, yEnd: yEnd, type: type }, attr.pattern,false,paper);
         var frame = paper.rect(xStart,yStart,cellW,cellH).attr(attr.unselected);
         patternChangeButtons[type] = paper.set(rect,pattern,frame);
      }
      updatePatternChangeButtons();
   };

   function initUndo() {
      var x = xUndo;
      var y = yUndo;
      var w = undoButtonW;
      var h = undoButtonH;
      var attr = undoButtonAttr;
      var rect = paper.rect(x,y,w,h,h/2).attr(attr.rect);
      var xText = x + w/2 + 5;
      var yText = y + h/2;
      var text = paper.text(xText,yText,taskStrings.undo.toUpperCase()).attr(attr.text);
      var xIcon = x + iconW;
      var yIcon = y + (h - iconW)/2;
      var icon = paper.image(undoSrc,xIcon,yIcon,iconW,iconW);
      undoButton = paper.set(rect,text,icon);
   };

   var initHandlers = function() {
      updateUndo();
      grid.enableDragSelection(onMouseDown, onMouseMove, onMouseUp, onGridSelectionChange, selectionBoxAttr, selectionMargins, dragThreshold);
      if(nbTypes > 1){
         for(var type = 0; type < nbTypes; type++){
            patternChangeButtons[type].click(changeType(type));
            patternChangeButtons[type].attr("cursor","pointer");
         }
      }
   };

   var clickUndo = function() {
      displayError("");
      grid.unhighlightAllCells();
      // unhighlightCells();

      if(answer.history.length == 0) {
         return;
      }
      answer.history.pop();
      updateCurrGrid();
      updateUndo();
   };

   function changeType(type) {
      return function() {
         displayError("");
         grid.unhighlightAllCells();

         patternType = type;
         updatePatternChangeButtons();
      }
   };

   function updateCurrGrid(noVisual) {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            currGrid[iRow][iCol] = null;
            if(!noVisual){
               grid.setCell(cellFiller, {row: iRow, col: iCol, entry: null });
            }
         }
      }
      for(var iMove = 0; iMove < answer.history.length; iMove++){
         var move = answer.history[iMove];
         for(var iRow = move.start[1]; iRow < move.end[1]; iRow++){
            for(var iCol = move.start[0]; iCol < move.end[0]; iCol++){
               currGrid[iRow][iCol] = iMove;
               if(!noVisual){
                  grid.setCell(cellFiller, {row: iRow, col: iCol, entry: iMove });
               }
            }
         }
      }
   };

   function updateCurrOutline() {
      if(currOutlineObj){
         currOutlineObj.remove();
         currOutlineObj = null;
      }
      drawOutline(false);
   };

   function updateUndo() {
      if(answer.history.length > 0) {
         undoButton.unclick();
         undoButton.click(clickUndo);
         undoButton.attr("cursor","pointer");
         undoButton[0].attr("opacity",1);
      } else {
         undoButton.unclick();
         undoButton.attr("cursor","auto");
         undoButton[0].attr("opacity",0.5);
      }
      updateSteps();
   };

   function updatePatternChangeButtons() {
      var attr = patternChangeButtonAttr;
      for(var type = 0; type < 2; type++){
         if(patternType == type){
            patternChangeButtons[type][2].attr(attr.selected);
         }else{
            patternChangeButtons[type][2].attr(attr.unselected);
         }
      }
   };

   function updateSteps() {
      var currSteps = answer.history.length;
      var attr = (currSteps <= maxSteps) ? stepsAttr : warningAttr;
      if(!stepsObj){
         var x = xGrid/2;
         var y = ySteps;
         stepsObj = paper.text(x,y,taskStrings.nbSteps(currSteps,maxSteps));
      }else{
         stepsObj.attr("text",taskStrings.nbSteps(currSteps,maxSteps));
      }
      stepsObj.attr(attr);
   }

   var onMouseDown = function() {
      displayError("");
      grid.unhighlightAllCells();

      dragData = { currIndex: answer.history.length, click: true };
   };

   var onMouseMove = function(dx,dy) {
      if(Math.sqrt(dx*dx + dy*dy) > dragThreshold){
         dragData.click = false;
      }
   };

   var onMouseUp = function(event, anchorPaperPos, anchorGridPos, currentPaperPos, currentGridPos) {
      if(dragData.currIndex >= maxSteps){
         return
      }
      if(dragData.click){
         displayError(taskStrings.drag);
      }else{
         updateUndo();
      }
   };

   var onGridSelectionChange = function(dx, dy, x, y, event, anchorPaperPos, anchorGridPos, currentPaperPos, currentGridPos) {
      if(dragData.currIndex >= maxSteps){
         displayError(taskStrings.tryAgain(maxSteps));
         return
      }
      var patternData = positionToPattern(anchorGridPos, currentGridPos);
      var currIndex = dragData.currIndex;
      if(patternData != null){
         patternData.type = patternType;
         answer.history[currIndex] = JSON.parse(JSON.stringify(patternData));
         updateSteps();
         updateCurrGrid();
      }
   };

   function positionToPattern(pos1,pos2) {
      if(!pos1 || !pos2){
         return null
      }
      var startX = Math.max(0,Math.min(pos1.col,pos2.col));
      var startY = Math.max(0,Math.min(pos1.row,pos2.row));
      var endX = Math.min(nbCol,Math.max(pos1.col + 1,pos2.col + 1));
      var endY = Math.min(nbRows,Math.max(pos1.row + 1,pos2.row + 1));
      // console.log(pos1,pos2)
      return { start: [startX,startY], end: [endX,endY] }
   };

   var cellFiller = function(cellData, gridPaper, isTarget, example) {
      var x = cellData.xPos;
      var y = cellData.yPos;
      var entry = cellData.entry;
      var attr = (isTarget) ? targetPatternAttr : currPatternAttr;
      if(entry != null){
         var cellPattern = (isTarget || example) ? target.patterns[entry] : answer.history[entry];
         var pattern = drawPattern(cellPattern,attr,isTarget,gridPaper,example);
         var cW = (!example) ? cellW : exCellW;
         var cH = (!example) ? cellH : exCellH;
         pattern.attr("clip-rect",x+","+y+","+cW+","+cH);
         return [pattern]
      }else{
         return []
      }
   };

   var targetCellFiller = function(cellData, gridPaper) {
      return cellFiller(cellData, gridPaper, true);
   };

   var exCellFiller = function(cellData, gridPaper) {
      return cellFiller(cellData, gridPaper, false, true);
   };

   function drawPattern(patternData,attr,isTarget,gridPaper,example) {
      var type = patternData.type;
      var xG = (!example) ? xGrid : 0;
      var yG = (!example) ? yGrid : 0;
      var cW = (!example) ? cellW : exCellW;
      var cH = (!example) ? cellH : exCellH;
      if(patternData.start){
         var start = patternData.start;
         var end = patternData.end;
         var xStart = xG + start[0]*cW;
         var yStart = yG + start[1]*cH;
         var xEnd = xG + end[0]*cH;
         var yEnd = yG + end[1]*cH;
      }else{
         var xStart = patternData.xStart;
         var xEnd = patternData.xEnd;
         var yStart = patternData.yStart;
         var yEnd = patternData.yEnd;
      }
      var x1 = xStart;
      var y1 = yStart;
      if(type == 0){
         var x2 = x1;
         var y2 = yEnd;
         var x3 = xEnd;
         var y3 = y1;
      }else{
         var x2 = xEnd;
         var y2 = y1;
         var x3 = x1;
         var y3 = yEnd;
      }
      var x4 = xEnd;
      var y4 = yEnd;
      var w = x4 - x1;
      var h = y4 - y1;
      if(!isTarget){
         var rect = gridPaper.rect(x1,y1,w,h).attr(patternBackgroundAttr);
      }
      var path = gridPaper.path(["M",x1,y1,"L",x2,y2,"L",x3,y3,"L",x4,y4,"Z"]).attr(attr);
      if(!isTarget){
         return gridPaper.set(path,rect)
      }
      return path
   };

   function drawOutline(isTarget,example) {
      findOutlineData(isTarget,false,example)
      // console.log(userLineData)
      drawOuterLine(isTarget,example);
      // console.log(example,Beav.Object.clone(targetLineData))
   };

   function drawBackgroundPattern(example) {
      var gridPaper = (!example) ? paper : targetPaper;
      var cW = (!example) ? cellW : exCellW;
      var cH = (!example) ? cellH : exCellH;
      var xG = (!example) ? xGrid : 0;
      var yG = (!example) ? yGrid : 0;
      var dotR = (!example) ? backgroundDotsR : 1.5;
      var dotSpacing = (!example) ? backgroundDotsSpacing : 5;

      var nbDotRows = Math.ceil(cH*nbRows/dotSpacing);
      var nbDotCol = Math.ceil(cW*nbCol/dotSpacing);
      var x0 = xG + dotSpacing/2;
      var y0 = yG + dotSpacing/2;

      for(var iRow = 0; iRow < nbDotRows; iRow++){
         var y = y0 + iRow*dotSpacing;
         for(var iCol = 0; iCol < nbDotCol; iCol++){
            var x = x0 + iCol*dotSpacing;
            gridPaper.circle(x,y,dotR).attr(backgroundDotsAttr);
         }
      }

      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var patternID = target.grid[iRow][iCol];
            var xCell = xG + iCol*cW;
            var yCell = yG + iRow*cH;
            if(patternID != null){
               var pattern = Beav.Object.clone(target.patterns[patternID]);
               pattern.type = 1 - pattern.type;
               
               drawPattern(pattern,backgroundAttr,true,gridPaper,example).attr("clip-rect",xCell+","+yCell+","+cW+","+cH);
            }else{
               gridPaper.rect(xCell,yCell,cW,cH).attr(backgroundAttr);
            }
         }
      }
   };

   function findOutlineData(isTarget,noVisual,example) {
      var w = (!example) ? cellW : exCellW;
      var h = (!example) ? cellH : exCellH;
      var p = (!example) ? paper : targetPaper;
      var xG = (!example) ? xGrid : 0;
      var yG = (!example) ? yGrid : 0;
      if(isTarget){
         var outlineData = (!example) ? targetLineData : exLineData;
         var gridData = target.grid;
         var patterns = target.patterns;
      }else{
         var outlineData = userLineData;
         var gridData = currGrid;
         var patterns = answer.history;
         // console.log(gridData,patterns)
      }
      for(var iRow = 0; iRow < nbRows; iRow++){
         outlineData[iRow] = [];
         for(var iCol = 0; iCol < nbCol; iCol++){
            outlineData[iRow][iCol] = [];
            var patternID = gridData[iRow][iCol];
            if(patternID == null){
               continue
            }
            var pattern = patterns[patternID];
            var type = pattern.type;
            var x = xG + iCol*w;
            var y = yG + iRow*h;

            var xStart = xG + pattern.start[0]*w;
            var yStart = yG + pattern.start[1]*h;
            var xEnd = xG + pattern.end[0]*w;
            var yEnd = yG + pattern.end[1]*h;
            var currLineData = [];
            for(var iLine = 0; iLine < 2; iLine++){
               var y1 = (iLine == 0) ? yStart : yEnd;
               var y2 = (iLine == 0) ? yEnd : yStart;
               var ym = (y2 - y1)/2;
               var xm = (xEnd + xStart)/2;
               var a = (y2 - y1)/(xEnd - xStart);
               var b = y1 - a*xStart;
               currLineData[iLine] = { a: a, b: b, intersections: [], xm: xm, type: type };

               for(var iEdge = 0; iEdge < 4; iEdge++){
                  var newInter = null;
                  switch(iEdge){
                     case 0:
                     case 2:
                        var yLine = (iEdge == 0) ? y : y + h;
                        var xInter = Math.round((yLine - b)/a);
                        if(xInter >= x && xInter <= x + w){
                           newInter = { x: xInter, y: yLine, edge: iEdge };
                        }
                        break;
                     case 1:
                     case 3:
                        var xLine = (iEdge == 1) ? x + w : x;
                        var yInter = Math.round(xLine*a + b);
                        if(yInter >= y && yInter <= y + h){
                           newInter = { x: xLine, y: yInter, edge: iEdge };
                        }
                        break;
                  }
                  if(newInter){
                     for(var iInter = 0; iInter < currLineData[iLine].intersections.length; iInter++){
                        var entry = currLineData[iLine].intersections[iInter];
                        if(entry.x == newInter.x && entry.y == newInter.y){
                           newInter = null;
                           break;
                        }
                     }
                  }
                  if(newInter){
                     currLineData[iLine].intersections.push(newInter);
                  }

               }
               if(currLineData[iLine].intersections.length > 1 && !noVisual){
                  var x1 = currLineData[iLine].intersections[0].x;
                  var x2 = currLineData[iLine].intersections[1].x;
                  var y1 = currLineData[iLine].intersections[0].y;
                  var y2 = currLineData[iLine].intersections[1].y;
                  p.path(["M",x1,y1,"L",x2,y2]).attr(outlineAttr);
               }
               outlineData[iRow][iCol][iLine] = JSON.parse(JSON.stringify(currLineData[iLine]));
            }
         }
      }
   };

   function drawOuterLine(isTarget,example) {
      var w = (!example) ? cellW : exCellW;
      var h = (!example) ? cellH : exCellW;
      var p = (!example) ? paper : targetPaper;
      var xG = (!example) ? xGrid : 0;
      var yG = (!example) ? yGrid : 0;
      var attr = isTarget ? outlineAttr : currOutlineAttr;
      // console.log(Beav.Object.clone(currOutlineObj))
      if(!isTarget){
         currOutlineObj = p.set();
      }
      for(var iRow = 0; iRow <= nbRows; iRow++){
         for(var iCol = 0; iCol <= nbCol; iCol++){
            var x = xG + iCol*w;
            var y = yG + iRow*h;
            // if(!isTarget){
            //    console.log(userLineData)
            // }
            // if(!isTarget && (!userLineData[iRow] || !userLineData[iRow][iCol] || userLineData[iRow][iCol].length < 1)){
            //    // console.log(iRow,iCol,userLineData[iRow][iCol])
            //    continue
            // }
            var firstPoint = getFirstPoint(iRow,iCol,isTarget,example);
            for(var dir = 0; dir < 2; dir++){
               if(dir == 0 && iCol < nbCol || dir == 1 && iRow < nbRows){
                  var dirName = (dir == 0) ? ["top","bottom"] : ["left","right"];
                  var interPoints1 = [];
                  var interPoints2 = [];
                  var intervals1 = [firstPoint[dirName[0]], { x: x + w, y: y + h, line: false }];
                  var intervals2 = [firstPoint[dirName[1]], { x: x + w, y: y + h, line: false }];
                  if(dir == 0){
                     if(iRow > 0){
                        interPoints1 = getInterPoints(iRow - 1,iCol,x,y,dir,isTarget,example);
                     }
                     if(iRow < nbRows){
                        interPoints2 = getInterPoints(iRow,iCol,x,y,dir,isTarget,example);
                     }
                  }else{
                     if(iCol > 0){
                        interPoints1 = getInterPoints(iRow,iCol - 1,x,y,dir,isTarget,example);
                     }
                     if(iCol < nbCol){
                        interPoints2 = getInterPoints(iRow,iCol,x,y,dir,isTarget,example);
                     }
                  }
                  findIntervalsFromPoints(intervals1,interPoints1,dir);
                  findIntervalsFromPoints(intervals2,interPoints2,dir);
                  var totalIntervals = combineIntervals(intervals1,intervals2,dir);
                  for(var iPoint = 0; iPoint < totalIntervals.length - 1; iPoint++){
                     var pointData = totalIntervals[iPoint];
                     var nextPoint = totalIntervals[iPoint + 1];
                     if(pointData.line){
                        if(dir == 0){
                           var line = p.path(["M",pointData.x,y,"H",nextPoint.x]).attr(attr);
                        }else{
                           var line = p.path(["M",x,pointData.y,"V",nextPoint.y]).attr(attr);
                        }
                        if(!isTarget){
                           currOutlineObj.push(line);
                        }
                     }
                  }
               }
            }
         }
      }
   };

   function getFirstPoint(row,col,isTarget,example) {
      var xG = (!example) ? xGrid : 0;
      var yG = (!example) ? yGrid : 0;
      var cW = (!example) ? cellW : exCellW;
      var cH = (!example) ? cellH : exCellH;
      var x = xG + col*cW;
      var y = yG + row*cH;
      var pointData = {
         top: { x: x, line: false },
         bottom: { x: x, line: false },
         left: { y: y, line: false },
         right: { y: y, line: false }
      };
      for(var dir = 0; dir < 4; dir++){
         switch(dir){
            case 0:
               if(row == 0 || col == nbCol){
                  continue
               }
               var key = "top";
               var cellPos = [row - 1, col];
               break;
            case 1:
               if(row == nbRows || col == nbCol){
                  continue
               }
               var key = "right";
               var cellPos = [row, col];
               break;
            case 2:
               if(row == nbRows || col == nbCol){
                  continue
               }
               var key = "bottom";
               var cellPos = [row, col];
               break;
            case 3:
               if(col == 0 || row == nbRows){
                  continue
               }
               var key = "left";
               var cellPos = [row, col - 1];
               break;
         }
         if(isTarget){
            if(!example){
               var tempData = targetLineData[cellPos[0]][cellPos[1]].slice();
            }else{
               var tempData = exLineData[cellPos[0]][cellPos[1]].slice();
            }
         }else{
            var tempData = userLineData[cellPos[0]][cellPos[1]].slice();
         }
         if(tempData && tempData[0]){
            var type = tempData[0].type;
            var y0 = tempData[0].a*x + tempData[0].b;
            var y1 = tempData[1].a*x + tempData[1].b;
            if(dir%2 == 0){
               if(type == 0 && y > y0 && y <= y1 ||
                  type == 0 && y <= y0 && y > y1 ||
                  type == 1 && y <= y0 && y <= y1 ||
                  type == 1 && y >= y0 && y >= y1){
                  pointData[key].line = true;
               }
            }else{
               if(type == 0 && y >= y0 && y < y1 ||
                  type == 0 && y < y0 && y >= y1 ||
                  type == 1 && y < y0 && y < y1 ||
                  type == 1 && y > y0 && y > y1){
                  pointData[key].line = true;
               }
            }
         }
      }

      return JSON.parse(JSON.stringify(pointData))
   };

   function getInterPoints(row,col,x,y,dir,isTarget,example) {
      var interPoints = [];
      if(isTarget){
         var tempLineData = (!example) ? targetLineData[row][col].slice() : exLineData[row][col].slice();
      }else{
         var tempLineData = userLineData[row][col].slice();
      }
      for(var iLine = 0; iLine < 2; iLine++){
         if(tempLineData.length < 1){
            continue
         }
         var tempInter = tempLineData[iLine].intersections;
         for(var iInter = 0; iInter < tempInter.length; iInter++){
            var interData = tempInter[iInter];
            interData.type = tempLineData[iLine].type;
            interData.xm = tempLineData[iLine].xm;
            interData.line = iLine;

            if(dir == 0 && interData.y == y){
               if(interPoints.length > 0 && interPoints[0].x > interData.x){
                  interPoints.unshift(JSON.parse(JSON.stringify(interData)));
               }else{
                  interPoints.push(JSON.parse(JSON.stringify(interData)));
               }
            }
            if(dir == 1 && interData.x == x){
               if(interPoints.length > 0 && interPoints[0].y > interData.y){
                  interPoints.unshift(JSON.parse(JSON.stringify(interData)));
               }else{
                  interPoints.push(JSON.parse(JSON.stringify(interData)));
               }
            }
         }
      }

      return interPoints
   };

   function findIntervalsFromPoints(currIntervals,points,dir,row,col) {
      for(var iInter = 0; iInter < points.length; iInter++){
         var interData = points[iInter];
         var axis = (dir == 0) ? "x" : "y";
         var pos = interData[axis];
         var insertIndex = null;
         for(var iInterval = 0; iInterval < currIntervals.length; iInterval++){
            if(iInterval < currIntervals.length - 1){
               if(currIntervals[iInterval][axis] < pos && currIntervals[iInterval + 1][axis] >= pos){
                  insertIndex = iInterval + 1;
                  break;
               }
            }
         }
         if(insertIndex == null){
            insertIndex = currIntervals.length - 1;
         }
         var pointData = { line: null };
         pointData[axis] = pos;
         currIntervals.splice(insertIndex,0,pointData);
         if(dir == 0){
            if(interData.line == 0 && interData.type == 0 && pos < interData.xm ||
               interData.line == 1 && interData.type == 0 && pos < interData.xm ||
               interData.line == 0 && interData.type == 1 && pos >= interData.xm ||
               interData.line == 1 && interData.type == 1 && pos >= interData.xm){
               currIntervals[insertIndex - 1].line = true;
               currIntervals[insertIndex].line = false;
            }else if(interData.line == 0 && interData.type == 0 && pos >= interData.xm ||
               interData.line == 1 && interData.type == 0 && pos >= interData.xm ||
               interData.line == 0 && interData.type == 1 && pos < interData.xm ||
               interData.line == 1 && interData.type == 1 && pos < interData.xm){
               currIntervals[insertIndex - 1].line = false;
               currIntervals[insertIndex].line = true;
            }
         }else{
            var xPoint = interData.x;
            if(interData.line == 0 && interData.type == 0 && xPoint > interData.xm ||
               interData.line == 1 && interData.type == 0 && xPoint <= interData.xm ||
               interData.line == 0 && interData.type == 1 && xPoint < interData.xm ||
               interData.line == 1 && interData.type == 1 && xPoint > interData.xm){
               currIntervals[insertIndex - 1].line = true;
               currIntervals[insertIndex].line = false;
            }else if(interData.line == 0 && interData.type == 0 && xPoint < interData.xm ||
               interData.line == 1 && interData.type == 0 && xPoint > interData.xm ||
               interData.line == 0 && interData.type == 1 && xPoint > interData.xm ||
               interData.line == 1 && interData.type == 1 && xPoint <= interData.xm){
               currIntervals[insertIndex - 1].line = false;
               currIntervals[insertIndex].line = true;
            }
         }
      }
      return currIntervals
   };

   function combineIntervals(intervals1,intervals2,dir) {
      var total = [];
      var index1 = 0;
      var index2 = 0;
      var nbLoop = 0;
      var axis = (dir == 0) ? "x" : "y";

      while(index1 < intervals1.length && index2 < intervals2.length && nbLoop < 20){
         var point1 = intervals1[index1];
         var point2 = intervals2[index2];
         if(point1[axis] == point2[axis]){
            var line = !(point1.line == point2.line);
            var pushData = { line: line };
            pushData[axis] = point1[axis];
            total.push(pushData);
            index1++;
            index2++;
         }else if(point1[axis] < point2[axis]){
            var prevLine2 = intervals2[index2 - 1].line;
            var line = !(point1.line == prevLine2);
            var pushData = { line: line };
            pushData[axis] = point1[axis];
            total.push(pushData);
            index1++;
         }else if(point1[axis] > point2[axis]){
            var prevLine1 = intervals1[index1 - 1].line;
            var line = !(point2.line == prevLine1);
            var pushData = { line: line };
            pushData[axis] = point2[axis];
            total.push(pushData);
            index2++;
         }
         nbLoop++;
      }
      return total
   };

   function isCellWhite(row,col) {
      var cellData = targetLineData[row][col];
      if(cellData.length == 0){
         return true
      }
      if(cellData[0].intersections.length > 1 || cellData[1].intersections.length > 1){
         return false
      }
      var firstPoint = getFirstPoint(row,col,true);
      if(firstPoint.bottom.line && firstPoint.right.line){
         return false
      }
      return true
   };

   function checkResult(noVisual) {
      updateCurrGrid(true);
      findOutlineData(true,true);
      findOutlineData(false,true);
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            for(var iLine = 0; iLine < 2; iLine++){
               var userData = userLineData[iRow][iCol][iLine];
               var targetData = targetLineData[iRow][iCol][iLine];
               var errorFound = false;
               if(!userData && !isCellWhite(iRow,iCol)){
                  errorFound = true;
                  // console.log("empty "+iLine)
               }else if(!targetData && userData){
                  errorFound = true;
               }else if(userData && Math.max(targetData.intersections.length,userData.intersections.length) > 1 && targetData.intersections.length != userData.intersections.length){
                  errorFound = true;
                  // console.log("intersections "+iLine,targetData.intersections.length,userData.intersections.length)
               }else if(userData && targetData.intersections.length > 1 && (userData.a != targetData.a || userData.b != targetData.b || userData.type != targetData.type)){
                  errorFound = true;
                  // console.log(iLine,targetData,userData)
               }
               // console.log(iRow,iCol,iLine,errorFound)
               if(errorFound){
                  var error = taskStrings.errorCell;
                  if(!noVisual){
                     displayError(error);
                     grid.highlightCell(iRow,iCol,highlightAttr);
                  }
                  return { successRate: 0, message: error }
               }
            }
         }
      }
      if(answer.history.length > maxSteps){
         var error = taskStrings.errorSteps(maxSteps);
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      if(!noVisual){
         platform.validate("done");
      }
      return { successRate: 1, message: taskStrings.success };
   };

   function displayError(msg) {
      if(!errorObj){
         errorObj = paper.text(paperW/2,yError,msg).attr(errorAttr);
      }
      errorObj.attr("text",msg);
      // $("#error").html(msg);
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

