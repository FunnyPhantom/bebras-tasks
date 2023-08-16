   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         grid: [
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
         ],
         target: [
            [ 0, 0, 0, 1, 1, 1 ],
            [ 0, 0, 0, 1, 1, 1 ],
            [ 0, 1, 1, 0, 1, 1 ],
            [ 0, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
         ],
         targetPos: { row: 3, col: 6 }, // on background grid
         gridPos: [ { row: 7, col: 1 }, { row: 7, col: 11 }],
         noModel: true,
         hasHint: false
      },
      easy: {
         grid: [
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
         ],
         target: [
            [ 0, 0, 1, 1, 1, 1 ],
            [ 0, 0, 1, 1, 1, 1 ],
            [ 1, 1, 0, 0, 1, 1 ],
            [ 1, 1, 0, 0, 1, 1 ],
            [ 1, 1, 1, 1, 0, 0 ],
            [ 1, 1, 1, 1, 0, 0 ],
         ],
         targetPos: { row: 3, col: 6 }, // on background grid
         gridPos: [ { row: 7, col: 2 }, { row: 2, col: 12 }],
         noModel: false,
         hasHint: true
      },
      medium: {
         grid: [
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
         ],
         target: [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 1, 0, 1, 1, 1 ],
            [ 0, 1, 1, 1, 0, 1, 0, 0, 1 ],
            [ 0, 1, 0, 1, 1, 1, 0, 0, 0 ],
            [ 1, 1, 0, 0, 1, 0, 0, 0, 0 ],
            [ 0, 1, 0, 0, 1, 0, 0, 0, 1 ],
            [ 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
         ],
         targetPos: { row: 3, col: 6 },
         gridPos: [ { row: 7, col: 2 }, { row: 2, col: 12 }],
         noModel: false,
         hasHint: false
      },
      hard: {
         grid: [
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0 ],
         ],
         target: [
            [ 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 1, 1, 0 ],
         ],
         targetPos: { row: 3, col: 6 },
         gridPos: [ { row: 7, col: 2 }, { row: 2, col: 12 }],
         noModel: false,
         hasHint: false
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
   var paperH = 500;

   var marginX = 20;
   var marginY = 20;

   var nbRows, nbCol;
   var nbGrids;
   var nbRowsBack = 15;
   var nbColBack = 18;

   var labelH = 40;
   var yLabel = labelH/2;
   var xLabel;
   var xModel = marginX * 2;
   var yModel = labelH;
   var xGrid;
   var yGrid = yModel;
   var cellW = 27;
   var cellH = cellW;
   var gridH = nbRowsBack*cellH;
   var gridW = nbColBack*cellW;

   var dotR = 6;
   var outlineOffset = 10;

   var target;
   var targetPos;
   var gridPos;
   var dragData;
   var dragThreshold = 10;

   var grid, modelGrid;
   var rng;
   var grabRect = [];
   var frameObj;
   var noModel;
   var horSym, verSym;

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      brown: "#654118",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
	  veryLightGrey: "#f0f0f0",
      darkGrey: "#666666"
   };

   var titleAttr = {
      "font-size": 18,
      "font-weight": "bold",
      fill: colors.black
   };
   var labelAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var frameAttr = {
      stroke: "#c0c0c0",
      "stroke-width": 1,
      fill: "white"
   };
   var lineAttr = {
      stroke: colors.black,
      "stroke-width": 5
   };
   var cellAttr = [
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: "none"
      },
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: colors.blue
      }
   ];
   var outlineAttr = {
      stroke: colors.black,
      "stroke-width": 3,
      fill: "none"
   };
   var dotAttr = {
      stroke: "none",
      fill: colors.black,
      r: dotR
   };
   var grabRectAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      fill: colors.grey,
      r: 5
   };
   var grabDotAttr = {
      stroke: "none",
      fill: colors.black
   };

   var highlightAttr = {
      stroke: "red",
      "stroke-width": 3,
      fill: "none",
      r: 2
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
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
      target = Beav.Object.clone(data[level].target);
      targetPos = data[level].targetPos;
      gridPos = data[level].gridPos;
      nbRows = data[level].grid.length;
      nbCol = data[level].grid[0].length;
      noModel = data[level].noModel;
      if(!noModel){
         xGrid = xModel + nbCol*cellW + 4*marginX;
      }else{
         xGrid = (paperW - gridW)/2;
      }
      xLabel = xModel + nbCol*cellW/2;
      nbGrids = 2;

      paperH = yGrid + gridH + cellH + marginY;

      displayHelper.taskH = paperH;
      displayHelper.taskW = paperW;
      displayHelper.minTaskW = 500;
      displayHelper.maxTaskW = 900;

      horSym = rng.nextBit();
      // horSym = 1;
      verSym = rng.nextBit();
      // verSym = 1;
      applySymmetry();
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

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         // seed: rng.nextInt(0,1000),
         grid: Beav.Object.clone(data[level].grid),
         gridPos: Beav.Object.clone(gridPos),
         hist: []
      };

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      if(grid){
         grid.remove();
      }
      if(modelGrid){
         modelGrid.remove()
      }
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   subTask.resetDisplay = function() {
      initPaper();
      initGrids();
      initHandlers();
      displayError("");

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function applySymmetry() {
      // console.log(horSym,verSym)
      var temp = Beav.Object.clone(target);
      for(var row = 0; row < temp.length; row++){
         var prevRow = (verSym == 0) ? row : temp.length - 1 - row;
         for(var col = 0; col < temp[0].length; col++){
            var prevCol = (horSym == 0) ? col : temp[0].length - 1 - col;
            target[row][col] = temp[prevRow][prevCol];
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);

      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h;
      for(var iOver = 1; iOver <= 5; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = yGrid;
               break;
            case 2:
               x = 0; y = 0;
               w = (noModel) ? xGrid : xModel;
               h = paperH;
               break;
            case 3:
               if(!noModel){
                  x = xModel; 
                  y = yModel + nbRows*cellH;
                  w = nbCol*cellW;
               }else{
                  x = xGrid + gridW;
                  y = yGrid;
                  w = paperW - x;
               }
               h = paperH - y;
               break;
            case 4:
               x = 0; 
               y = yGrid + gridH;
               w = paperW;
               h = paperH - y;
               break;
            case 5:
               x = xModel + nbCol*cellW; 
               y = 0;
               w = xGrid - x;
               h = paperH;
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

   function initGrids() {
      var x0 = xGrid;
      var y0 = yGrid;
      var w = gridW;
      var h = gridH;
      var xLabel2 = x0 + w/2;
      if(!noModel){
         paper.text(xLabel,yLabel,taskStrings.click).attr(titleAttr);
         modelGrid = new Grid.fromArray("paper", paper, answer.grid, cellFiller(true), cellW, cellH, xModel, yModel, {opacity:0})
         paper.rect(xModel,yModel,cellW*nbCol,cellH*nbRows).attr(outlineAttr);
         yLabel3 = yModel + cellH*nbRows + 30;
         paper.text(xLabel,yLabel3,taskStrings.startingGrid).attr(labelAttr);
         paper.path(["M",x0 - 40,y0 - 50,"V",y0 + h + 20]).attr(lineAttr); // TODO : compute 30?
      }
      paper.text(xLabel2,yLabel,taskStrings.drag(level)).attr(titleAttr);
      frameObj = paper.rect(x0,y0,w,h).attr(frameAttr);
      yLabel2 = y0 + h + 30;

      grid = new Grid("paper", paper, nbRowsBack, nbColBack, cellW, cellH, x0, y0, {opacity:0});
      

      for(var row = 0; row < nbRowsBack; row++){
         for(var col = 0; col < nbColBack; col++){
            grid.setCell(cellFiller(false), { row: row, col: col });
         }
      }

      updateAllGrabRect();
   };

   function initHandlers() {
      if(!noModel){
         modelGrid.clickCell(clickModel);
      }
      frameObj.click(function() {
         displayError(taskStrings.clickLeftGrid);
      });

      for(var iGrid = 0; iGrid < nbGrids; iGrid++){
         Beav.dragWithTouch(grabRect[iGrid],onMove,onStart(iGrid),onEnd,displayHelper);
         grabRect[iGrid].attr("cursor","grab");
      }
   };

   function clickModel(ev) {
      displayError("");
      grid.unhighlightAllCells();
      var dat = ev.data;
      var row = dat.row;
      var col = dat.col;
      var val = answer.grid[row][col];
      answer.grid[row][col] = 1 - val;
      updateGrid();
      answer.hist.push("click");
   };

   function onStart(id) {
      return function(x,y,ev) {
         displayError("");
         grid.unhighlightAllCells();
         dragData = { id: id, row0: answer.gridPos[id].row, col0: answer.gridPos[id].col, click: true, tooManyDrags: false };
         grabRect[id].toFront();
         if(data[level].hasHint && answer.hist.length > 0 && !Beav.Array.has(answer.hist,"click")){
            displayError(taskStrings.tooManyDrags);
            dragData.tooManyDrags = true;
         }
      }
   };

   function onMove(dx,dy,x,y,ev) {
      if(Beav.Geometry.distance(dx,dy,0,0) < dragThreshold || dragData.tooManyDrags){
         return
      }
      dragData.click = false;
      var id = dragData.id;
      var row0 = dragData.row0;
      var col0 = dragData.col0;
      var newRow = row0 + Math.round(dy/cellH);
      var newCol = col0 + Math.round(dx/cellW);
      newRow = Math.max(0,Math.min(nbRowsBack - nbRows,newRow));
      newCol = Math.max(0,Math.min(nbColBack - nbCol,newCol));
      if(newRow == answer.gridPos[1 - id].row && newCol == answer.gridPos[1 - id].col){
         return
      }
      answer.gridPos[id] = { row: newRow, col: newCol };
      updateGrid();
      updateGrabRect(id);
      for(var iRect = 0; iRect < nbGrids; iRect++){
         if(grabRect[1 - iRect])
            grabRect[1 - iRect].toFront();
      }
   };

   function onEnd(ev) {
      if(dragData.tooManyDrags){
         return
      }
      if(dragData.click){
         displayError(taskStrings.clickLeftGrid);
      }else{
         answer.hist.push("drag");
      }
   };

   function updateGrid() {
      for(var row = 0; row < nbRowsBack; row++){
         for(var col = 0; col < nbColBack; col++){
            var par = getCellParams(row,col);
            var entry = par.entry;
            var op = par.op;
            var cell = grid.getCell(row,col);
            cell[0].attr(cellAttr[entry]).attr("opacity",op);
            // cell[1].attr(cellAttr[entry]).attr("opacity",op);
            var outlinePar = getOutlineParams(row,col);
            cell[1].attr({
               x: outlinePar.x,
               y: outlinePar.y,
               width: outlinePar.w,
               height: outlinePar.h,
               "clip-rect":[outlinePar.clipX,outlinePar.clipY,outlinePar.clipW,outlinePar.clipH]
            });
         }
      }
      if(!noModel){
         for(var row = 0; row < nbRows; row++){
            for(var col = 0; col < nbCol; col++){
               var entry = answer.grid[row][col];
               var cell = modelGrid.getCell(row,col);
               cell[0].attr(cellAttr[entry]);
            }
         }
      }
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var pos = answer.gridPos[0];
            var gridRow = row + pos.row;
            var gridCol = col + pos.col;
            var cell = grid.getCell(gridRow,gridCol);
            cell[1].toFront();
         };
      }
   };

   function updateAllGrabRect() {
      for(var iGrid = 0; iGrid < nbGrids; iGrid++){
         updateGrabRect(iGrid);
      }
   };

   function updateGrabRect(id) {
      var pos = answer.gridPos[id];
      var w = cellW, h = cellH;
      var x = xGrid + (pos.col + nbCol - 2)*w;
      var y = yGrid + (pos.row + nbRows)*h;
      var xOv = xGrid + pos.col*w;
      var yOv = yGrid + pos.row*h;
      var ovW = nbRows*w;
      var ovH = nbCol*h;
      var dotSpacing = 6;
      if(!grabRect[id]){
         grabRect[id] = paper.rect(xOv,yOv,ovW,ovH).attr(overlayAttr);
      }else{
         var obj = grabRect[id];
         obj.attr({ x: xOv, y: yOv});
      }
   };

   function cellFiller(model) {
      return function(cellData, paper) {
         var x = cellData.xPos;
         var y = cellData.yPos;
         var row = cellData.row;
         var col = cellData.col;
         var w = cellW, h = cellH;

         if(model){
            var entry = answer.grid[row][col];
            var rect = paper.rect(x,y,w,h).attr(cellAttr[entry]);
            return [rect]
         }else{
            var par = getCellParams(row,col);
            var entry = par.entry;
            var op = par.op;
            var rect = paper.rect(x,y,w,h).attr(cellAttr[entry]).attr("opacity",op);
            var outlinePar = getOutlineParams(row,col);
            var outline = paper.rect(outlinePar.x,outlinePar.y,outlinePar.w,outlinePar.h).attr(outlineAttr).attr("clip-rect",[outlinePar.clipX,outlinePar.clipY,outlinePar.clipW,outlinePar.clipH]);
            var entryTar = getEntry(row,col,targetPos,target);
            if(entryTar == 1){
               var xc = x + w/2;
               var yc = y + h/2;
               var circ = paper.circle(xc,yc).attr(dotAttr);
               return [rect,outline,circ]
            }
         }

         return [rect,outline]
      }
   };

   function getCellParams(row,col) {
      var entry1 = getEntry(row,col,answer.gridPos[0],answer.grid);
	  var op = 1;
      var entry = 0;
	  if (nbGrids == 1) {
		  if (entry1 !== null) {
			  entry = entry1;
		  } else {
			  entry = 0;
			  op = 0;
		  }
	  } else {
		  var entry2 = getEntry(row,col,answer.gridPos[1],answer.grid);
		  if(entry1 !== null || entry2 !== null){
			 if(entry1 == entry2){
			 }else{
				entry = entry1 || entry2;
				if(entry == null){
				   entry = 0;
				}
			 }
		  }else{
			 op = 0;
			 entry = 0;
		  }
	  }
      return { entry: entry, op: op };
   };

   function getOutlineParams(row,col) {
      var xCell = xGrid + col*cellW;
      var yCell = yGrid + row*cellH;
      // var params = [];
      var last = (dragData) ? dragData.id : 0;

      for(var iGrid = 0; iGrid < nbGrids; iGrid++){
         var pos = answer.gridPos[iGrid];
         if(!isOnGrid(row,col,pos)){
            continue
         }

         var gridRow = row - pos.row;
         var gridCol = col - pos.col;

         var deltaY = (gridRow == 0) ? 0 : -outlineOffset;
         var deltaX = (gridCol == 0) ? 0 : -outlineOffset;
         var deltaH = (gridRow == nbRows - 1) ? outlineOffset : 2*outlineOffset;
         var deltaW = (gridCol == nbCol - 1) ? outlineOffset : 2*outlineOffset;
         var x = xCell + deltaX;
         var y = yCell + deltaY;
         var w = cellW + deltaW;
         var h = cellH + deltaH;
         var clipY = (gridRow == 0) ? yCell - 2 : yCell;
         var clipX = (gridCol == 0) ? xCell - 2 : xCell;
         var clipH = (gridRow == nbRows - 1 || gridRow == 0) ? cellH + 2 : cellH;
         var clipW = (gridCol == nbCol - 1 || gridCol == 0) ? cellW + 2 : cellW;
         // if(gridRow == 0 && gridCol == 0){
         //    console.log(iGrid,{x,y,w,h,clipX,clipY,clipW,clipH})
         // }
         return { x: x, y: y, w: w, h: h, clipX: clipX, clipY: clipY, clipW: clipW, clipH: clipH };
      }
      return {x:0,y:0,w:0,h:0,clipX:0,clipY:0,clipW:0,clipH:0}
   };

   function isOverDragRect(ev) {
      var dat = ev.data;
      var row = dat.row;
      var col = dat.col;
      for(var iGrid = 0; iGrid < nbGrids; iGrid++){
         var pos = answer.gridPos[iGrid];
         if(row == pos.row + nbRows && (col == pos.col || col == pos.col + 1)){
            return true
         }
      }
      return false
   };

   function isOnGrid(row,col,pos) {
      if(row < pos.row || row > pos.row + nbRows - 1 || col < pos.col || col > pos.col + nbCol - 1){
         return false
      }
      return true
   };

   function getEntry(row,col,pos,gridContent) {
      var gridRow = row - pos.row;
      var gridCol = col - pos.col;
      if(gridRow < 0 || gridRow > gridContent.length - 1 || gridCol < 0 || gridCol > gridContent[0].length - 1){
         return null
      }
      return gridContent[gridRow][gridCol]
   };

   function checkResult(noVisual) {
      if(!noVisual){
         displayError("");
         grid.unhighlightAllCells();
      }
      var gridPos = answer.gridPos;
      var gridContent = answer.grid;
      for(var row = 0; row < nbRowsBack; row++){
         for(var col = 0; col < nbColBack; col++){
            var par = getCellParams(row,col);
            var entry = par.entry;
            var op = par.op;
            var entryTar = getEntry(row,col,targetPos,target);
            if((entry == 1 && op == 1 && entryTar != 1) || ((entry == 0 || op == 0) && entryTar == 1)){
               var error = taskStrings.errorWrongCell;
               if(!noVisual){
                  displayError(error);
                  grid.highlightCell(row,col,highlightAttr);
               }
               return { successRate: 0, message: error }
            }
         }
      }
      if(!noVisual){
         platform.validate("done");
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

