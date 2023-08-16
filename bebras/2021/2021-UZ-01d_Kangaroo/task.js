   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         gridContent: [
            [ 1, 1, 1, 2, 1, 2, 2, 1, 0, 2 ],
            [ 0, 1, 2, 0, 0, 0, 0, 0, 0, 2 ]
         ],
         start: [0,1],
         target: [9,0],
         nbButtons: 0
      },
      easy: {
         gridContent: [
            [ 1, 1, 2, 1, 0, 1 ],
            [ 0, 0, 1, 1, 1, 2 ],
            [ 1, 0, 1, 2, 1, 1 ],
            [ 0, 2, 2, 2, 0, 1 ],
            [ 2, 0, 2, 1, 0, 1 ]
         ],
         start: [0,4],
         target: [5,0],
         nbButtons: 0
      },
      medium: {
         gridContent: [
            [ 2, 2, 0, 0, 2, 1, 0, 1, 2 ],
            [ 1, 2, 2, 0, 2, 2, 0, 1, 1 ],
            [ 2, 2, 0, 2, 1, 2, 2, 0, 0 ],
            [ 1, 1, 2, 2, 2, 0, 0, 1, 0 ],
            [ 2, 1, 2, 0, 2, 2, 2, 1, 1 ],
            [ 1, 0, 0, 0, 1, 2, 2, 1, 0 ]
         ],
         start: [0,5],
         target: [8,0],
         nbButtons: 2
      },
      hard: {
         gridContent: [
            [ 2, 0, 1, 0, 2, 1, 2, 1, 2, 1, 1, 2, 2, 0, 1],
            [ 0, 0, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 2],
            [ 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0],
            [ 1, 2, 2, 1, 2, 0, 1, 2, 2, 1, 1, 0, 0, 2, 1],
            [ 2, 2, 1, 1, 2, 0, 1, 2, 2, 0, 0, 0, 0, 1, 1],
            [ 1, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0],
            [ 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 1, 0, 0, 2, 2],
            [ 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1, 1],
            [ 2, 1, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 2, 1, 2],
            [ 0, 1, 2, 0, 0, 0, 0, 2, 1, 2, 2, 1, 0, 0, 0]
         ],
         start: [0,9],
         target: [14,0],
         nbButtons: 2
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.basic,
         medium: data.easy,
         hard: data.medium
      };
   }

   var paper, popupPaper;
   var paperW = 770;
   var paperH;

   var marginX = 20;
   var marginY = 20;
   var cellW, cellH;
   minCellW = 70;
   var gridW, gridH;
   var buttonAreaH = 80;
   var xGrid = marginX, yGrid = buttonAreaH;
   var beaverW;
   var beaverH;
   var buttonH = 50;
   var buttonW = 50;
   var undoButtonH = 30;
   var undoButtonW = 120;
   var undoIconW = 15;
   var undoIconH = 15;
   var yButton = (buttonAreaH - buttonH)/2;
   var xButton = 200;
   var xUndo = 600;
   var yUndo = (buttonAreaH - undoButtonH)/2;
   var xJoker = xUndo;
   var popupW = 220;
   var popupH = 100;
   var popupButtonW = popupW/2 - marginX;
   var popupButtonH = 30;
   var trR = 7;

   var rng;
   var grid;
   var gridContent;
   var markerGrid, markerObj;
   var nbRows, nbCol;
   var nbLogs;
   var start, target;
   var beavPos;
   var beavObj;
   var mode = 0; // 0: move, 1: draw
   var counterObj;
   var buttonObj = [];
   var nbButtons;
   var undoButton;
   var jokerTextObj;
   var jokerUsed = false;
   var sketchpad;
   var canvasInstr;
   var popupObj;
   var jokerPos;
   var jokerObj;
   var shift, horSym, vertSym;

   var beaverSrc = $("#beaver").attr("src");
   var stoneSrc = $("#stone").attr("src");
   var lilypadSrc = $("#lilypad").attr("src");
   var raftSrc = $("#raft").attr("src");
   var pencilSrc = $("#pencil").attr("src");
   var undoSrc = $("#undo").attr("src");
   var checkSrc = $("#check").attr("src");
   var markerShape = [ "squareStar", "diamond", "triangle", "star" ];
   var markerColor = [ "blue", "yellow", "orange", "red" ];

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#e2e2e2",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ff24b4"
   };
   var penColor = "#fFf6aa";

   var gridLineAttr = {
      stroke: colors.black,
      "stroke-width": 1
   };
   var cellAttr = {
      stroke: colors.black,
      "stroke-width": 1,
      fill: colors.cyan
   };
   var targetAttr = {
      stroke: colors.black,
      "stroke-width": 1,
      fill: "green"
   };
   var possibleMoveAttr = {
      stroke: colors.yellow,
      "stroke-width": 4
   }
   var jokerTextAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var buttonAttr = {
      frame: {
         stroke: "none",
         fill: colors.grey,
         r: 5
      },
      selected: {
         stroke: "none",
         fill: colors.blue,
         r: 5
      },
      label: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black
      }
   };
   var selectedButtonAttr = {
      stroke: colors.yellow,
      "stroke-width": 4
   };
   var counterAttr = {
      "font-size": 20,
      "font-weight": "bold",
      fill: colors.black,
      "text-anchor": "start"
   };
   var targetAttr = {
      stroke: "white",
      fill: colors.pink
   };
   var penIconAttr = {
      stroke: "none",
      fill: colors.black
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var popupAttr = {
      rect: {
         stroke: colors.grey,
         "stroke-width": 1,
         fill: "white",
         r: 5
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black
      },
      tr: {
         stroke: "white",
         "stroke-width": 2,
         fill: "white"
      }
   };
   var yesButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: popupButtonH/2
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: "white"
      },
      icon: {
         stroke: "none",
         fill: "white"
      }
   };
   var noButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.black,
         r: popupButtonH/2
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: "white"
      },
      icon: {
         stroke: "white",
         "stroke-width": 3,
         fill: "none"
      }
   };
   var jokerAttr = {
      rect: {
         stroke: "black",
         "stroke-width": 3,
         "stroke-linejoin": "round",
         fill: "black"
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };


   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed);
      gridContent = Beav.Object.clone(data[level].gridContent);
      nbLogs = data[level].nbLogs;
      start = data[level].start.slice();
      target = data[level].target.slice();
      beavPos = start.slice();

      nbButtons = data[level].nbButtons;
      nbRows = gridContent.length;
      nbCol = gridContent[0].length;
      gridW = paperW - 2*marginX;
      cellW = Math.min(minCellW, gridW/nbCol);
      cellH = cellW;
      gridH = nbRows*cellH;
      beaverW = cellW * 0.7;
      beaverH = cellH * 0.7;

      paperH = yGrid + gridH + marginY;
      randomizeGrid();
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
      displayError("");
      replayHist(true);
      initPaper();
      initGrid();
      initCanvas();
      initButtons();
      updateBeaver();
      updateMode();
      updateJoker();

      initHandlers();

      if (nbButtons == 0) {
         $("#canvas").css("touch-action","auto");
      }else{
         $("#canvas").css("touch-action","none");
      }

      displayHelper.hideValidateButton = true;
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
         //drawings: "[]"
      };

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      if(sketchpad){
         sketchpad.change();
      }
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function randomizeGrid() {
      shift =  rng.nextInt(0,20);
      horSym = rng.nextBit();
      vertSym = rng.nextBit();
      // horSym = 1;
      // vertSyl = 0;
      // shift = 0;
      var temp = Beav.Object.clone(gridContent);
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var newRow = (vertSym) ? nbRows - 1 - iRow : iRow;
            var newCol = (horSym) ? nbCol - 1 - iCol : iCol;
            temp[iRow][iCol] = (gridContent[newRow][newCol] + shift)%3;
         }
      }
      gridContent = Beav.Object.clone(temp);
      if(horSym){
         start[0] = nbCol - 1 - start[0];
         target[0] = nbCol - 1 - target[0];
      }
      if(vertSym){
         start[1] = nbRows - 1 - start[1];
         target[1] = nbRows - 1 - target[1];
      }
   };

   function initMarkerGrid() {
      markerGrid = [];
      markerObj = [];
      for(var row = 0; row < nbRows; row++){
         markerGrid[row] = [];
         markerObj[row] = [];
         for(var col = 0; col < nbCol; col++){
            markerGrid[row][col] = null;
            markerObj[row][col] = null;
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initGrid() {
      grid = Grid.fromArray("paper", paper, gridContent, cellFiller, cellW, cellH, xGrid, yGrid, gridLineAttr);
      var browser = Beav.Navigator.getVersion();
      if(browser[0] == "MSIE"){
         return
      }
   };

   function initCanvas() {
      var browser = Beav.Navigator.getVersion();
      if(browser[0] == "MSIE"){
         return
      }
      $("#canvas").empty();
      $("#canvas").css({
         position: "absolute",
         left: xGrid,
         top: yGrid + 15,
         width: gridW,
         height: gridH
      });
      var canvasAttr = {
         "width": gridW,
         "height": gridH,
         "editing": true
      };

      sketchpad = Raphael.sketchpad("canvas", canvasAttr, subTask.raphaelFactory);
      //sketchpad.json(answer.drawings);

      sketchpad.pen().color(penColor);
      sketchpad.change(endDraw);
      function endDraw() {
         //answer.drawings = sketchpad.json();
         updateUndo();
      }
   };

   function initButtons() {
      var xText = xUndo + 10;
      var xIcon = xUndo - undoButtonW/2 + 15;
      var yIcon = yUndo - undoIconH/2;
      undoButton = drawButton(paper,xUndo,yUndo,undoButtonW,undoButtonH,{
         text: taskStrings.undo, 
         xText: xText,
         yText: yUndo, imgSrc: undoSrc, 
         xIcon: xIcon, yIcon: yIcon,
         iconW: undoIconW, iconH: undoIconH
      });

      var browser = Beav.Navigator.getVersion();
      if(browser[0] == "MSIE"){
         return
      }

      var attr = buttonAttr;
      var xm = xButton;
      var y = yButton;
      var h = buttonH;
      var w = buttonW;
      var x0 = xm - w;
      if (nbButtons > 0) {
         var frame = paper.rect(x0,y,2*w,h).attr(attr.frame);
         var labels = [taskStrings.move,taskStrings.draw];
         for(var iButton = 0; iButton < nbButtons; iButton++){
            var x = x0 + iButton*(w - 5);
            var xLabel = (iButton == 0) ? x - marginX : x + w + marginX;
            if (typeof(enableRtl) != "undefined") {
               xLabel = (iButton == 0) ? xLabel - marginX : xLabel + marginX;
            }

            var yLabel = y + h/2;
            var anchor = (iButton == 0) ? "end" : "start";
            paper.text(xLabel,yLabel,labels[iButton]).attr(attr.label).attr("text-anchor",anchor);
            var rectAttr = (iButton == mode) ? attr.selected : attr.frame;
            var rect = paper.rect(x,y,w + 5,h).attr(rectAttr);
            if(iButton == 0){
               rect.attr("clip-rect",[x,y,w,h]);
            }else{
               rect.attr("clip-rect",[x + 5,y,w,h]);
            }
            var imgW = w - 10;
            var imgH = h - 10;
            var xImg = x + (w - imgW)/2;
            var yImg = y + (h - imgH)/2;
            if(iButton == 0){
               var img = paper.image(beaverSrc,xImg,yImg,imgW,imgH);
            }else{
               var img = paper.path("M25.31,2.872l-3.384-2.127c-0.854-0.536-1.979-0.278-2.517,0.576l-1.334,2.123l6.474,4.066l1.335-2.122C26.42,4.533,26.164,3.407,25.31,2.872zM6.555,21.786l6.474,4.066L23.581,9.054l-6.477-4.067L6.555,21.786zM5.566,26.952l-0.143,3.819l3.379-1.787l3.14-1.658l-6.246-3.925L5.566,26.952z");
               img.transform(["T",xImg + 5,yImg,"S",1.3,1.3,xImg,yImg]).attr(penIconAttr);
            }
            var xOv = (iButton == 0) ? x : x + 5;
            var overlay = paper.rect(xOv,y,w,h).attr(overlayAttr);
            buttonObj[iButton] = paper.set(rect,overlay);
         }
      }
      
   };

   function initHandlers() {
      updateUndo();

      var browser = Beav.Navigator.getVersion();
      if(browser[0] == "MSIE"){
         grid.clickCell(clickGrid);
         return
      }

      for(var iButton = 0; iButton < nbButtons; iButton++){
         buttonObj[iButton].click(clickButton(iButton));
         buttonObj[iButton].attr("cursor","pointer");
      }
   };

   function updateUndo() {
      // console.log(answer.hist)
      undoButton.unclick();
      if(mode == 0 && answer.hist.length > 0) {
         undoButton[0].attr("opacity",1);
         undoButton.click(undo);
         undoButton.attr("cursor","pointer");
      }else{
         undoButton[0].attr("opacity",0.5);
         undoButton.attr("cursor","auto");
      }
   };

   function undo() {
      if(mode == 0){
         answer.hist.pop();
         replayHist();
         updateBeaver();
         updateJoker();
      }else{
         sketchpad.undo();
      }
      updateUndo();

   };

   function clickButton(id) {
      return function() {
         displayError("");
         if(popupObj){
            popupObj.remove();
            popupObj = null;
            subTask.raphaelFactory.destroy("popup");
         }
         mode = id;
         updateMode();
      }
   };

   function clickPopupButton(id) {
      return function() {
         // console.log(id)
         if(id == 1){
            var row = jokerPos.row;  
            var col = jokerPos.col;
            var side = jokerPos.side;
            clickMove(row,col,false,false,true);
            drawJoker(row,col,side);
            beavObj.toFront();
         }
         popupObj.remove();
         popupObj = null;
         subTask.raphaelFactory.destroy("popup");
      }
   };

   function clickGrid(ev,replay,noVisual) {
      displayError("");
      var useJoker = false;
      if(ev.data){
         var row = ev.data.row;
         var col = ev.data.col;
      }else{
         var x = ev.pageX - $("#canvas").offset().left;
         var y = ev.pageY - $("#canvas").offset().top;
         // console.log(x,y);
         var col = Math.floor(x/cellW);
         var row = Math.floor(y/cellH);
      }
      if(popupObj){
         popupObj.remove();
         popupObj = null;
         subTask.raphaelFactory.destroy("popup");
      }
      // console.log(row,col)
      if(mode == 0){
         clickMove(row,col,replay,noVisual,useJoker);
      }
   };

   function clickMove(row,col,replay,noVisual,useJoker) {
      var beavRow = beavPos[1];
      var beavCol = beavPos[0];
      if(row == beavRow && col == beavCol){
         return
      }
      if(!canMove(row,col)){
         if(gridContent[row][col] == gridContent[beavRow][beavCol] && jokerUsed){
            var error = taskStrings.cannotMove(0);
         }else if(Math.abs(col - beavCol) == 1 && Math.abs(row - beavRow) == 1){
            var error = taskStrings.cannotMove(1);
         }else{
            var error = taskStrings.cannotMove(2);
         }
         displayError(error);
         return
      }
      if(gridContent[row][col] == gridContent[beavRow][beavCol]){
         var side;
         if(col == beavCol){
            side = (row > beavRow) ? "top" : "bottom";
         }else{
            side = (col > beavCol) ? "left" : "right";
         }
         if(!noVisual && !useJoker && !replay){
            drawPopup(row,col,(row > 1),side);
            return
         }
         jokerPos = { row: row, col: col, side: side };
         jokerUsed = true;
         if(!noVisual){
            updateJoker();
         }
      }
      beavPos = [ col, row ];
      if(!replay){
         answer.hist.push({ type: "move", pos: { row: row, col: col } });
         updateBeaver();
         updateUndo();
      }
      // console.log(beavPos,target)
      if(beavPos[1] == target[1] && beavPos[0] == target[0]){
         if(!noVisual){
            platform.validate("done");
         }
      }
   };

   function canMove(row,col) {
      var beavRow = beavPos[1];
      var beavCol = beavPos[0];
      if(row == beavRow && Math.abs(col - beavCol) == 1 || col == beavCol && Math.abs(row - beavRow) == 1){
         if(gridContent[row][col] != gridContent[beavRow][beavCol] || !jokerUsed){
            return true
         }
      }
      return false
   };

   function updateBeaver() {
      var row = beavPos[1];
      var col = beavPos[0];
      var xCell = xGrid + col*cellW;
      var yCell = yGrid + row*cellH;
      var w = beaverW;
      var h = beaverH;
      var x = xCell + (cellW - w)/2;
      var y = yCell + (cellH - h)/2;
      if(!beavObj){
         beavObj = paper.image(beaverSrc,x,y,w,h);
      }else{
         beavObj.attr({ x: x, y: y });
      }
      beavObj.toFront();
   };

   function updateMode() {
      updateUndo();

      var browser = Beav.Navigator.getVersion();
      if(browser[0] == "MSIE"){
         return
      }

      for(var iButton = 0; iButton < nbButtons; iButton++){
         var attr = (iButton == mode) ? buttonAttr.selected : buttonAttr.frame;
         buttonObj[iButton][0].attr(attr);
      }

      $("#canvas").off("click");
      if(mode == 1){
         sketchpad.editing(true);
      }else{
         sketchpad.editing(false);
         $("#canvas").click(clickGrid);
      }
      // console.log(sketchpad.container())
      $("#canvas").css({
         position: "absolute",
         left: xGrid,
         top: yGrid + 15,
         width: gridW,
         height: gridH
      });
   };

   function updateJoker() {
      var text = taskStrings.jokerAvailable(jokerUsed);
      var y = yUndo + undoButtonH/2 + 15;
      if(!jokerTextObj){
         jokerTextObj = paper.text(xJoker,y,text).attr(jokerTextAttr);
      }else{
         jokerTextObj.attr("text",text);
      }
      if(jokerPos){
         var row = jokerPos.row;
         var col = jokerPos.col;
         var side = jokerPos.side;
         drawJoker(row,col,side);
         beavObj.toFront();
      }else if(jokerObj){
         jokerObj.remove();
         jokerObj = null;
      }
   };

   function updateMarkers() {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var id = markerGrid[row][col];
            if(id != null){
               markerObj[row][col] = drawMarker(id,row,col);
            }else if(markerObj[row][col]){
               markerObj[row][col].remove();
               markerObj[row][col] = null;
            }
         }
      }
   };

   function resetGrid() {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var entry = data[level].gridContent[row][col];
            grid.setCell(cellFiller, { row: row, col: col, entry: entry })
         }
      }
   };

   function resetMarkerGrid(noVisual) {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            markerGrid[row][col] = null;
            if(!noVisual && markerObj[row][col]){
               markerObj[row][col].remove();
            }
            markerObj[row][col] = null;
         }
      }
   };

   function cellFiller(cellData, paper) {
      var x = cellData.xPos;
      var y = cellData.yPos;
      var w = cellW, h = cellH;
      var row = cellData.row;
      var col = cellData.col;
      var entry = cellData.entry;
      var rect = paper.rect(x,y,w,h).attr(cellAttr);
      switch(entry){
         case 0:
            var imgSrc = stoneSrc;
            break;
         case 1:
            var imgSrc = lilypadSrc;
            break;
         case 2:
            var imgSrc = raftSrc;
      }
      var imgMargin = 4;
      var imgW = cellW - 2*imgMargin;
      var imgH = cellH - 2*imgMargin;
      var xImg = x + imgMargin;
      var yImg = y + imgMargin;
      var img = paper.image(imgSrc,xImg,yImg,imgW,imgH);
      if(row == target[1] && col == target[0]){
         // var xTarget = x + w/2;
         // var yTarget = y + h/2;
         var targetObj = drawTarget(x,y);
         return [rect,img,targetObj]
      }
      return [rect,img]
   };

   function drawTarget(x,y) {
      // var r1 = cellW*0.4;
      // var r2 = cellW*0.15;
      // var attr = targetAttr;
      // var circle = paper.circle(x,y,r1).attr(attr.circle);
      // var dot = paper.circle(x,y,r2).attr(attr.dot);
      // return paper.set(circle,dot)
      var flag = paper.path("M19.562,10.75C21.74,8.572,25.5,7,25.5,7c-8,0-8-4-16-4v10c8,0,8,4,16,4C25.5,17,21.75,14,19.562,10.75zM6.5,29h2V3h-2V29z").attr(targetAttr);
      var scale = 2*cellW/60;
      flag.transform(["T",x,y,"S",scale,scale,x,y]);
      return flag
   };

   function drawPopup(row,col,up,side) {
      var xCell = xGrid + col*cellW;
      var yCell = yGrid + row*cellH;
      var w = popupW;
      var h = popupH;
      var xm = xCell + cellW/2;
      var xPopupPaper = Math.max(0,Math.min(paperW - w,xm - w/2));
      var yPopupPaper = (up) ? yCell - 2*trR - h : yCell + cellH;
      var popupPaperW = w;
      var popupPaperH = h + 2*trR + 2;
      if(popupPaper){
         popupPaper.remove();
      }
      popupPaper = subTask.raphaelFactory.create("popup", "popup", popupPaperW, popupPaperH);
      var xPaper = $("#paper").position().left + xPopupPaper;
      var yPaper = $("#paper").position().top + yPopupPaper + 16;
      $("#popup").css({
         position: "absolute",
         top: yPaper,
         left: xPaper
      });
      // console.log(xPaper,yPaper)
      var x = 0;
      var y = (up) ? 0 : 2*trR + 2;
      var attr = popupAttr;
      var rect = popupPaper.rect(x,y,w,h).attr(attr.rect);
      var xText = x + w/2;
      var yText = y + 30;
      var text = popupPaper.text(xText,yText,taskStrings.useJoker).attr(attr.text);
      var yTr = (up) ? y + h + trR : y - trR;
      var xTr = xm - xPopupPaper;
      var trAngle = (up) ? 180 : 0;
      var tr = getShape(popupPaper,"triangle",xTr,yTr,{ radius: trR }).attr(attr.tr).transform(["R",trAngle]);
      var yButton = y + h - popupButtonH/2 - 10;
      var buttons = popupPaper.set();
      for(var iButton = 0; iButton < 2; iButton++){
         var xButton = xText - popupButtonW/2 - 5 + iButton*(popupButtonW + 10);
         var bAttr = (iButton == 0) ? noButtonAttr : yesButtonAttr;
         var str = (iButton == 0) ? taskStrings.no : taskStrings.yes;
         var shape = (iButton == 0) ? "cross" : null;
         var imgSrc = (iButton == 0) ? null : checkSrc;
         var iconW = 15;
         var iconH = 15;
         var xIcon = (iButton == 0) ? xButton - popupButtonW/2 + 20 : xButton - popupButtonW/2 + 10;
         var yIcon = (iButton == 0) ? yButton : yButton - iconH/2;
         var button = drawButton(popupPaper,xButton,yButton,popupButtonW,popupButtonH,{
            attr: bAttr,
            text: str,
            xText: xButton,
            yText: yButton,
            shape: shape
         });
         button.click(clickPopupButton(iButton));
         button.attr("cursor","pointer");
         buttons.push(button);
      }
      popupObj = paper.set(rect,text,tr,buttons);
      jokerPos = { row: row, col: col, side: side };
   };

   function drawJoker(row,col,side) {
      if(jokerObj){
         jokerObj.remove();
      }
      var attr = jokerAttr;
      var xCell = xGrid + col*cellW;
      var yCell = yGrid + row*cellH;
      var rectW = cellW*0.6;
      var xc, yc;
      switch(side) {
         case "left":
            xc = xCell;
            yc = yCell + cellH/2;
            break;
         case "right":
            xc = xCell + cellW;
            yc = yCell + cellH/2;
            break;
         case "top":
            xc = xCell + cellW/2;
            yc = yCell;
            break;
         case "bottom":
            xc = xCell + cellW/2;
            yc = yCell + cellH;

      }
      var xRect = xc - rectW/2;
      var yRect = yc - rectW/2;
      var rect = paper.rect(xRect,yRect,rectW,rectW).attr(attr.rect);
      rect.transform(["R",45]);
      var xText = xc;
      var yText = yc; 
      var text = paper.text(xText,yText,taskStrings.joker).attr(attr.text);
      jokerObj = paper.set(rect,text)      
   };

   function replayHist(noVisual) {
      beavPos = start.slice();
      jokerUsed = false;
      jokerPos = null;
      mode = 0;
      for(var iHist = 0; iHist < answer.hist.length; iHist++){
         var move = answer.hist[iHist];
         switch(move.type){
            case "move":
               mode = 0;
               break;
         }
         clickGrid({ data: { row: move.pos.row, col: move.pos.col } }, true, noVisual);
      }
   };

   function checkResult(noVisual) {
      replayHist(noVisual);
      if(beavPos[1] == target[1] && beavPos[0] == target[0]){
         return { successRate: 1, message: taskStrings.success };
      }else{
         return { successRate: 0, message: taskStrings.errorLastPos };
      }

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

