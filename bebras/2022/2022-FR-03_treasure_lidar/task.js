   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         nbRows: 12,
         cellSide: 40,
         heights: [
            [1, 10],[1, 9.5],[1, 8.5],[1, 7.5],[1, 7],[1, 8], 
            [1, 8.5], [1, 10],[1, 11],[1, 10.5],[1, 9.5],[1, 9],[1, 8],[1, 7.5],[1, 8.5],[1, 10.5]
         ],
         hasRocks: true,
         seaVisible: true,
         forestVisible: true,
         initPos: { col: 1, row: 6},
         target: { up: 4.5, down: 3.5, right: 5 },
         maxMeas: 40,
		 initRangeDistDir: [[5, 5], [0, 6], [0,14]]
      },
      easy: {
         nbRows: 15,
         cellSide: 30,
         heights: [
            [1, 11.5],
            [1, 12],
            [1, 14],
            [1, 10.5],
            [1, 12.2],
            [1, 14.5],
            [1, 13],
            [1, 8.5],
            [1, 9.5],
            [1, 8.7], 
            [1, 11],
            [1, 13.5],
            [1, 12.5],
            [1, 10.7],
            [1, 11.2],
            [1, 9],
            [1, 11.8],
            [1, 7.5],
            [1, 10],
            [1, 8]
         ],
         hasRocks: false,
         seaVisible: true,
         forestVisible: true,
         initPos: { col: 4, row: 10},
         target: { up: 3.5, down: 6.5 },
         maxMeas: 40,
		 initRangeDistDir: [[0, 8], [0, 10], [0, 18]]
      },
      medium: {  
         nbRows: 15,
         cellSide: 30,
         heights: [
            [4,19.5],[4,21],[4,22.5],[4,19],[5,21.5],
            [3,19.5],[3,20],[4,22.5],[4,21.5],[4,22],[4,19.5],[4,20.5],
            [2,19],[2,20.5],[2,20.5],[2,20],[4,22.5],[4,22],[4,19],[1,21.5],
            [1,22],[1,22],[1,22],[3,21.5],[3,19.5]
         ],
         hasRocks: false,
         seaVisible: false,
         forestVisible: true,
         initPos: { col: 5, row: 8},
         target: { up: 13, down: 7.5 },
         maxMeas: 30,
		 initRangeDistDir: [[0, 8], [0, 6], [0, 23]]
      },
      hard: {
         nbRows: 15,
         cellSide: 30,
         heights: [
            [-5,19],[-5,20],[-6,20],[-6,22],[-6,22],
            [-5,20],  [-5,21],[-5,22],[-7,22],[-7,19],[-7,21],[-7,22],[-7,20],[-6,19],[-6,22],
            [-5,20],  [-5,22],[-5,21],[-7,21],[-7,21],[-7,22],[-7,19],[-7,21],[-5,21],[-5,19]
         ],
         hasRocks: false,
         seaVisible: false,
         forestVisible: false,
         initPos: { col: 5, row: 7},
         target: { up: 15, down: 12 },
         maxMeas: 40,
		 initRangeDistDir: [[14, 14], [0, 6], [0, 23]]
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

   var textResults = [];
   var rectResults = [];
   var resultWidth = 120;
   var resultHeight = 70;

   var heights;
   var nbCol;
   var colW, rowH;
   var nbRows;
   
   var columnTested;
   var nbColumnsTested;
   var rangeDistDir;
   var rangeDistDirPerCol;
   var posTreasure = undefined;
   

   var windowW;
   var windowH;
   var yWindow;
   var xWindow;

   var bottomAreaH = 20;
   var yBottomArea;
   var yHeader;

   var xLabel = marginX;
   var barH = 8;
   var barW = 260;
   var distBarW = 300;
   var xDistBar = xLabel + 270;
   if (typeof(enableRtl) != "undefined") {
       xLabel = paperW - marginX;
       xDistBar = xLabel - 270 - barW;
   }

   var ceilH = 150;
   var floorH = 100;
   var tideH = 160;

   var lidarObj;
   var maxMeas;

   var winOv;
   var barObj = [];
   var targetBarObj = [];
   var target;
   var counterObj, counterBar;

   var buttons = [];
   var nbValidCol = 3;

   var tideSrc = $("#tide").attr("src");
   var treeSrc = $("#tree").attr("src");
   var rocksSrc = $("#rocks").attr("src");
   var holeSrc = $("#hole").attr("src");
   var treasureSrc = $("#chest").attr("src");

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      sandYellow: "#eebb3d",
      gold: "#f8bf1a",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      seaBlue: "#0e5667",
      brown: "#b38c2e",
      grey: "#e2e2e2",
      darkGrey: "#616161",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ee2d7c",
      lightPink: "#fac2c7",
      orange: "#f6891e"
   };

   var windowAttr = {
      rect: {
         stroke: "none",
         fill: colors.sandYellow
      },
      grid: {
         stroke: colors.darkYellow,
         "stroke-width": 0.5,
         fill: "none"
      },
   };
   var seaAttr = {
      stroke: "none",
      fill: colors.seaBlue
   };
   var lidarAttr = {
      rect: {
         stroke: colors.pink,
         "stroke-width": 3,
         fill: "none",
         r: 3
      },
      line1: {
         stroke: colors.pink,
         "stroke-width": 5
      },
      line2: {
         stroke: "white",
         "stroke-width": 1
      }
   };
   var headerAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var labelAttr = {
      "font-size": 16,
      "text-anchor": "start",
      fill: colors.black
   };
   var resultTextAttr = {
      "font-size": 16,
      "text-anchor": "middle",
      fill: colors.black
   };
   var resultRectAttr = {
      fill: "white",
      opacity: 0.75
   };
   var heightBarAttr = {
      rect1: {
         stroke: colors.seaBlue,
         "stroke-width": 4,
         fill: colors.seaBlue,
         r: barH/2
      },
      rect2: {
         stroke: colors.pink,
         "stroke-width": 4,
         fill: colors.lightPink,
         r: barH/2
      },
      line: {
         stroke: colors.gold,
         "stroke-width": 2
      }
   };
   var targetBarAttr = {
      rect1: {
         stroke: colors.darkGrey,
         "stroke-width": 4,
         fill: colors.darkGrey,
         r: barH/2
      },
      rect2: {
         stroke: colors.darkGrey,
         "stroke-width": 4,
         fill: "white",
         r: barH/2
      },
      line: {
         stroke: colors.gold,
         "stroke-width": 3
      }
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
      nbRows = data[level].nbRows;
      rowH = data[level].cellSide;
      colW = rowH;
      windowH = nbRows*rowH;
      yWindow = marginY + resultHeight - rowH + marginY;
      yBottomArea = yWindow + windowH + marginY;
      yHeader = yBottomArea + 10;
      heights = Beav.Object.clone(data[level].heights);
      target = Beav.Object.clone(data[level].target);
      nbCol = heights.length;
      maxMeas = data[level].maxMeas;
      windowW = nbCol*colW;
      xWindow = (paperW - windowW)/2;

      paperH = yBottomArea + bottomAreaH + marginY;

      displayHelper.taskH = paperH;
      displayHelper.taskW = paperW;
      displayHelper.minTaskW = 500;
      displayHelper.maxTaskW = 900;
      initTestedData();
   };
   
   function initTestedData() {
      columnTested = [];
      nbColumnsTested = 0;
      for (var iCol = 0; iCol < nbCol; iCol++) {
          columnTested.push(false);
      }
      rangeDistDir = Beav.Object.clone(data[level].initRangeDistDir);
      rangeDistDirPerCol = [];
      for (var iCol = 0; iCol < nbCol; iCol++) {
          rangeDistDirPerCol[iCol] = [0,20];
      }
   }

   subTask.getStateObject = function() {
      return state;
   };

   subTask.reloadAnswerObject = function(answerObj) {
      answer = answerObj;
      if(!answer) {
         return;
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         pos: Beav.Object.clone(data[level].initPos),
         meas: []
      };
      defaultAnswer.meas.push(defaultAnswer.pos);
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
      // generateHeights([9,11.5]);
      displayError("");
      initPaper();
      initWindow();
      initLidar();
      initBars();
      initHandlers();
      reloadAnswer(false);

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initWindow() {
      var x0 = xWindow;
      var y0 = yWindow;
      var w = windowW;
      var h = windowH;
      var attr = windowAttr;
      winOv = paper.rect(x0,y0,w,h).attr(overlayAttr);

      paper.rect(x0,y0,w,h).attr(attr.rect);
      for(var iCol = 0; iCol <= nbCol; iCol++){
         var x = x0 + iCol*colW;
         paper.path(["M",x,y0,"V",y0 + h]).attr(attr.grid);
      }
      for(var iRow = 0; iRow <= nbRows; iRow++){
         var y = y0 + iRow*rowH;
         paper.path(["M",x0,y,"H",x0 + w]).attr(attr.grid);
      }
      for(var iCol = 0; iCol < nbCol; iCol++){
         var x = x0 + iCol*colW;
         for(var iSide = 0; iSide < 2; iSide++){
            var val = heights[iCol][iSide];
            if(iSide == 0){
               var src = treeSrc;
               for(var row = 0; row <= val; row++){
                  var y = y0 + h - row*rowH;
                  paper.image(src,x,y,colW,rowH).attr("clip-rect",[x0,y0,w,h]);
               }
            }else{
               var rowID = nbRows - val;
               if(rowID > 1){
                  for(var row = 0; row < rowID - 1; row++){
                     var y = y0 + row*rowH;
                     paper.rect(x,y,colW,rowH).attr(seaAttr).attr("clip-rect",[x0,y0,w,h]);
                  }
               }
               var src = tideSrc;
               var y = y0 + h - val*rowH - tideH;
               var imgH = tideH;
               paper.image(src,x,y,colW,imgH).attr("clip-rect",[x0,y0,w,h]);
            }
         }
      }
      if(data[level].hasRocks){
         var x = x0 + (nbCol - 1)*colW;
         paper.image(rocksSrc,x,y0,colW,h);
      }
      winOv.toFront();
   };

   function initLidar() {
      var attr = lidarAttr;
      if(lidarObj){
         lidarObj.remove();
         lidarObj = null;
      }
      var topLine1 = paper.path(["M",0,0,"V",0]).attr(attr.line1);
      var topLine2 = paper.path(["M",0,0,"V",0]).attr(attr.line2);
      var topLine = paper.set(topLine1,topLine2);
      var botLine1 = paper.path(["M",0,0,"V",0]).attr(attr.line1);
      var botLine2 = paper.path(["M",0,0,"V",0]).attr(attr.line2);
      var botLine = paper.set(botLine1,botLine2);
      var rightLine1 = paper.path(["M",0,0,"V",0]).attr(attr.line1);
      var rightLine2 = paper.path(["M",0,0,"V",0]).attr(attr.line2);
      var rightLine = paper.set(rightLine1,rightLine2);
      var rect = paper.rect(0,0,colW,rowH).attr(attr.rect);
      lidarObj = paper.set(rect,topLine,botLine,rightLine);

      for (var iResult = 0; iResult < 3; iResult++) {
        rectResults[iResult] = paper.rect(0, 0, resultWidth, resultHeight, 5).attr(resultRectAttr);
        textResults[iResult] = paper.text(0, 0, "").attr(resultTextAttr)
      }
      if (!data[level].hasRocks) {
          rectResults[2].hide();
          textResults[2].hide();
          rightLine1.hide();
          rightLine2.hide();
      } else {
          rectResults[1].hide();
          textResults[1].hide();
          topLine1.hide();
          topLine2.hide();
      }
      winOv.toFront();
      updateLidar();
      updateResults();
   };

   function initBars() {
      var yCounter = yBottomArea + marginY;
      counterObj = paper.text(xLabel,yCounter,taskStrings.nbMeasures(answer.meas.length,maxMeas)).attr(labelAttr);
      var yBar = yCounter - barH/2;
      counterBar = drawBar(xDistBar,yBar,distBarW,false);
      updateCounter();
   };

   function initHandlers() {
      winOv.click(clickGrid);
      winOv.attr("cursor","pointer");
   };

   function disableClick() {
      winOv.unclick();
      winOv.attr("cursor","auto");
   };

   function clickGrid(ev) {
      displayError("");
      if (treasureFound(answer.pos)) {
          displayError(taskStrings.errorTreasureFound);
          return;
      }
      if(answer.meas.length >= maxMeas){
         displayError(taskStrings.tooManyMeas(maxMeas));
         return
      }
      var scale = displayHelper.scaleFactor || 1;
      var xMouse = (ev.pageX - $("#paper").offset().left)/scale;
      var yMouse = (ev.pageY - $("#paper").offset().top)/scale;
      var x = xMouse - xWindow;
      var y = yMouse - yWindow;
      var row = Math.floor(y/rowH);
      var col = Math.floor(x/colW);
      var pos = { row: row, col: col };
      var error = setNewPos(pos);
      if(error){
         displayError(error);
         return
      }
      var lastPos = answer.meas[answer.meas.length - 1];
      if ((lastPos.col != pos.col || lastPos.row != pos.row)) {
          answer.meas.push(pos);
          updateLidar();
          updateResults();
          digHole(pos, false);
          updateCounter();
      };
   };

   function setNewPos(pos){
      var newCol = pos.col; 
      var newRow = pos.row
      if(newCol < 0 || newCol >= nbCol){
         return taskStrings.errorCannotMeas;
      }
      var colHeights = heights[newCol];
      var minRow = Math.ceil(nbRows - colHeights[1]);
      var maxRow = Math.floor(nbRows - colHeights[0]) - 1;
      if(newRow < minRow || newRow > maxRow){
         return taskStrings.errorCannotMeas;
      }
      answer.pos = { row: newRow, col: newCol };
   };

   function updateLidar() {
      var pos = answer.pos;
      var obj = lidarObj;
      var x0 = xWindow, y0 = yWindow;
      var w = windowW, h = windowH;
      var x = x0 + pos.col*colW;
      var y = y0 + pos.row*rowH;
      var xLine = x0 + (pos.col + 0.5)*colW;
      var y1 = y0 + h - heights[pos.col][1]*rowH;
      if (!data[level].seaVisible) {
          y1 = y0;
      }
      var y2 = y;
            
      var y3 = y + rowH;
      var y4 = y0 + h - heights[pos.col][0]*rowH;
      if (!data[level].forestVisible) {
          y4 = y0 + h;
      }
      obj[0].attr({ x: x, y: y })/*.attr("clip-rect",[x0,y0,w,h])*/;
      obj[1].attr("path",["M",xLine,y1,"V",y2]);
      obj[2].attr("path",["M",xLine,y3,"V",y4]);
      obj[3].attr("path",["M",xLine + colW / 2,y + rowH / 2,"H",xWindow + windowW]);
      
      var xResultUpDown;
      if (pos.col < nbCol / 3) {
          xResultUpDown = x + (resultWidth / 2) + rowH;
      } else {
          xResultUpDown = x - (resultWidth / 2);
      }
      
      var xResultRight = Math.max(xWindow + windowW - resultWidth / 2 - marginX, x + rowH + resultWidth / 2);
      
      setResultCenter(0, xResultUpDown, (y3 + 2*rowH));
      setResultCenter(1, xResultUpDown, (y - 2*rowH));
      setResultCenter(2, xResultRight, (y + resultHeight / 2 + marginY));
   };
   
   function setResultCenter(iResult, x, y) {
      textResults[iResult].attr({"x": x, "y": y});
      rectResults[iResult].attr({"x": x - resultWidth / 2, "y": y - resultHeight / 2});
   }

   function setBar(bar,val,counter) {
      if(!counter){
         var currW = barW*val/nbRows;
      }else{
         // var maxW = windowW - 2*r;
         var currW = distBarW*val/maxMeas;
      }
      var xBar = bar.rect1.attr("x");
      var yBar = bar.rect1.attr("y");
      if (typeof(enableRtl) != "undefined") {
         xBar = xBar + distBarW - currW + 10;
      }
      bar.rect2.attr("clip-rect",[xBar - 10,yBar - 10,currW + 10,barH + 20]);
      if(bar.line){
         var x = xBar + currW;
         var y1 = yBar - bottomAreaH/4 - 10;
         var y2 = yBar + barH + 10;
         bar.line.attr("path",["M",x,y1,"V",y2]);
      }
   };
      
   function updateResults() {
      var pos = answer.pos;
      var sides = getSidesFromPos(pos);
      for (var iDir = 0; iDir < 3; iDir++) {
        textResults[iDir].attr("text", taskStrings.distance(sides[iDir], iDir));
      }
   }

   function updateCounter() {
      var val = answer.meas.length;
      counterObj.attr("text",taskStrings.nbMeasures(val,maxMeas));
      setBar(counterBar,val,true);
   };

   function getDists(row, col) {
       var distCeiling = row - (nbRows - heights[col][1]);
       var distFloor = (nbRows - 1 - row) - heights[col][0];
       return [distFloor, distCeiling];
   }
   
   function countPossibleCellsForRanges(range) {
       var nbPossible = 0;
       for (var iCol = 0; iCol < nbCol; iCol++) {
           for (var iRow = 0; iRow < nbRows; iRow++) {
               dists = getDists(iRow, iCol);
               var possible = true;
               for (var iDir = 0; iDir < 2; iDir++) {
                   if ((dists[iDir] < range[iDir][0]) || (dists[iDir] > range[iDir][1])) {
                       possible = false;
                   }
               }
               if (possible) {
                  nbPossible++;
               }
           }
       }
       return nbPossible;
   }

   function decideSides(pos) {
       //console.log("prev rangeDistDir : " + JSON.stringify(rangeDistDir));
       var rangeForCol = rangeDistDir[1];
       if (!data[level].seaVisible) {
           rangeForCol = rangeDistDirPerCol[pos.col];
           //console.log("rangeForCol : " + JSON.stringify(rangeForCol));
       };
       var sides = [0, 0];
       var dists = getDists(pos.row, pos.col);
       // 
       var maxDist = [ // shifted by +0.1 to keep the exact value for the middle
            Math.min(rangeDistDir[0][1] + 0.1, dists[0]),
            Math.min(rangeForCol[1] + 0.1, dists[1])
       ];
       var minDist = [ // shifted by -0.1 to keep the exact value for the middle
            Math.max(rangeDistDir[0][0] - 0.1, dists[0]),
            Math.max(rangeForCol[0] - 0.1, dists[1])
       ];
       // [[downCloser, downEqual, downFurther], [upCloser, upEqual, upFurther]];
       var ranges = [[[rangeDistDir[0][0], maxDist[0] - 0.1],
                      [minDist[0], maxDist[0]],
                      [minDist[0] + 0.1, rangeDistDir[0][1]]],
                      
                     [[rangeForCol[0], maxDist[1] - 0.1],
                      [minDist[1], maxDist[1]],
                      [minDist[1] + 0.1, rangeForCol[1]]]];
       var maxCount = 0;
       var bestSides = [0, 0];
       var bestRange = Beav.Object.clone(rangeDistDir);
       var canFindTreasure = false;
       for (var iSideDown = -1; iSideDown < 2; iSideDown++) {
           for (var iSideUp = -1; iSideUp < 2; iSideUp++) {
               var curRange = [ranges[0][iSideDown + 1], ranges[1][iSideUp + 1]];
               var count = countPossibleCellsForRanges(curRange);
               //console.log("count " + count + " for sides (" + iSideDown + "," + iSideUp + ")");
               if ((iSideDown == 0) && (iSideUp == 0) && count > 0) {
                   canFindTreasure = true;
               }
               if (count > maxCount) {
                   maxCount = count;
                   bestSides = [iSideDown, iSideUp];
                   bestRange = curRange;
               }
           }
       }
	   if (maxCount == 0) { // should not be needed
		   if (dists[0] < rangeDistDir[0][0]) {
			   sides[0] = -1;
		   } else {
			   sides[0] = 1;
		   }
		   if (dists[1] < rangeDistDir[1][0]) {
			   sides[1] = -1;
		   } else {
			   sides[1] = 1;
		   }		   
		   return sides;
	   }
       bestRange[2] = rangeDistDir[2];
       rangeDistDir = bestRange;
       if (!data[level].seaVisible) {
           rangeDistDirPerCol[pos.col] = bestRange[1];
           if (bestSides[0] == 0) {
               if (!columnTested[pos.col]) {
                   nbColumnsTested += 1;
                   //console.log(" tested : "  + nbColumnsTested) ;
               }
               if (nbColumnsTested < nbCol * 6 / 10) {
                   if (bestSides[1] == 0) {
                       var side = pos.col % 2;
                       if (side == 0) {
                           bestSides[1] -= 1;
                       } else {
                           bestSides[1] = 1;
                       }
                   }
               } else if (canFindTreasure) {
                   bestSides[1] = 0;
                   bestSides[0] = 0;
               }
           }
       };
       //console.log("new rangeDistDir : " + JSON.stringify(rangeDistDir));
       //console.log("new rangeDistDirPerCol : " + JSON.stringify(rangeDistDirPerCol));
       return bestSides;
   }

   function getSideDir(iDir, distDir, colHole, limit) {
      if (distDir < rangeDistDir[iDir][0]) {
          return 1;
      }
      if (distDir > rangeDistDir[iDir][1]) {
          return -1;
      }
      if (rangeDistDir[iDir][1] - rangeDistDir[iDir][0] < limit) {
          rangeDistDir[iDir][0] = distDir;
          rangeDistDir[iDir][1] = distDir;
          return 0;
      }
      var isCloser = (distDir - rangeDistDir[iDir][0]) > (rangeDistDir[iDir][1] - distDir);
      var delta = 0.1;
      if (isCloser) {
          rangeDistDir[iDir][1] = distDir - delta;
          return -1;
      } else {
          rangeDistDir[iDir][0] = distDir + delta;
          return 1;
      }
   }
   
   function getSidesFromPos(pos) {
      if (posTreasure != undefined) {
        if ((pos.col == posTreasure[0]) && (pos.row == posTreasure[1])) {
           return [0, 0, 0];
        } else {
           return [1, 1, 1];
        }
      }
      var dists = [
         nbRows - 1 - heights[pos.col][0] - pos.row,  // sol
         pos.row - (nbRows - heights[pos.col][1]),    // plafond
         nbCol - 2 - pos.col                          // rochers
      ]
      var sides = [];
      if (data[level].hasRocks) {
          sides[0] = getSideDir(0, dists[0], pos.col, 2);
          sides[2] = getSideDir(2, dists[2], pos.col, 4);
          sides[1] = 0;
      }
      else {
          var tmpSides = decideSides(pos);
          sides[0] = tmpSides[0];
          sides[1] = tmpSides[1];
          sides[2] = sides[1];
      }
      if ((sides[0] == 0) && (sides[1] == 0) && (sides[2] == 0)) {
         posTreasure = [pos.col, pos.row];
      }
      //console.log(JSON.stringify(rangeDistDir));
      return sides;
   };

   function drawBar(x,y,w,tar) {
      var attr = (tar) ? targetBarAttr : heightBarAttr;
      var h = barH;
      var x2 = x + w;
      var rect1 = paper.rect(x,y,w,h).attr(attr.rect1);
      var rect2 = paper.rect(x,y,w,h).attr(attr.rect2);
      // var line1 = paper.path(["M",x,y,"H",x2]).attr(attr.line1);
      if(tar){
         var y1 = y - 10;
         var y2 = y + barH;
         var line = paper.path(["M",x2,y1,"V",y2]).attr(attr.line);
      }else{
         var line = null;
      }
      return { rect1: rect1, rect2: rect2, line: line }
   };
   
   function treasureFound(pos) {
       if (posTreasure == undefined) {
           return false;
       }
       return (posTreasure[0] == pos.col && posTreasure[1] == pos.row);
   }

   function digHole(pos,noVisual) {
      var x = xWindow + pos.col*colW + 1;
      var y = yWindow + pos.row*rowH + 2;
      var treas = treasureFound(pos);
      if (noVisual) {
          return;
      }
      var src = (treas) ? treasureSrc : holeSrc;
      paper.image(src,x,y,colW - 2,rowH - 2);
      var obj = lidarObj;
      for(var iElem = obj.length - 1; iElem >= 0; iElem--){
         obj[iElem].toFront();
      }
      for (var iResult = 0; iResult < 3; iResult++) {
          rectResults[iResult].toFront();
          textResults[iResult].toFront();
      }
      winOv.toFront();
   };

   function reloadAnswer(noDisplay) {
      initTestedData();
      posTreasure = undefined;
      var meas = answer.meas;
      // var possibleCol = findPossibleCol();
      var tar = target;
      for(var iPos = 0; iPos < meas.length; iPos++){
         var pos = meas[iPos];
         getSidesFromPos(pos);
         digHole(pos, noDisplay);
      }
      if(meas.length >= maxMeas){
         // disableClick();
      }
   };

   function checkResult(noVisual) {
      if(!noVisual){
         displayError("");
      }
      reloadAnswer(noVisual);
      var pos = answer.pos;
      var sides = getSidesFromPos(pos);
      for(var iDir = 0; iDir < 3; iDir++){
         if(sides[iDir] != 0){
            var error = taskStrings.errorDistance(iDir);
            if(!noVisual){
               displayError(error);
            }
            return { successRate: 0, message: error }
         }
      }

      if(!noVisual){
         digHole(pos, noVisual);
         disableClick();
         platform.validate("done");
      }
      return { successRate: 1, message: taskStrings.success }


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

