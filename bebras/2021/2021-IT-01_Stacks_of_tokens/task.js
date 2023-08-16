   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         src: [[0,1,0,1],[0,1,0],[1,0,2],[0,2]],
         targetNbStacks: 2,
         dropH: 300,
         historyLength: 10
      },
      easy: {
         src: [[2,1,0,1],[2,1,0],[1,0,1],[1,1],[0,1]],
         targetNbStacks: 2,
         dropH: 300,
         historyLength: 10
      },
      medium: {
         src: [[2,0,1],[1,0,0],[2,2,0],[2,0,2],[0,2,0],[0,1,0],[0,0],[1,1],[0,1]],
         targetNbStacks: 2,
         dropH: 300,
         historyLength: 20
      },
      hard: {
         src: [[1,2,0,1],[1,2,1,0],[0,1,1,1],[1,2,1],[1,0,0],[2,0,1],[1,2,2],[1,1,2],[0,0,1],[1,1],[0,1],[1,2]],
         targetNbStacks: 3,
         dropH: 300,
         historyLength: 20
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
   var marginX = 10;
   var marginY = 20;

   var tokenW;
   var tokenH;
   var tokenEdgeH;
   var shadowW;
   var shadowH;
   var tokenMargin;
   var blockW;
   var blockMargin;
   var dropH;
   var ySrc, yDropArea;
   var xDropArea = marginX;
   var dropW = paperW - 2*marginX;
   var attractionX;
   var attractionY;
   var markerLength;
   var maxStackHeight;
   var undoH = 30;
   var undoW = 120;
   var xUndo = xDropArea + dropW - undoW;
   var yUndo;
   var historyLength;


   var src, nbBlocks;
   var maxBlockH = 4;
   var blockObj = [];
   var markers = {};
   //var shadows = {};
   var srcPos = [];
   var blockPos = [];
   var stacks = {};
   var draggedObj;
   var targetNbStacks;
   var targetStackH = 11; // in hard
   var dropMessage;
   var undoButton;
   var rng;

   var token1Src = $("#token1").attr("src");
   var token2Src = $("#token2").attr("src");
   var token3Src = $("#token3").attr("src");
   var tokenSrc = [token1Src,token2Src,token3Src];
   var limitSrc = $("#limit").attr("src");
   //var shadowSrc = $("#shadow").attr("src");
   var undoSrc = $("#undo").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5"
   };

   var dropAttr = {
      stroke: colors.grey,
      fill: colors.lightGrey,
      r: 10
   };
   var markerAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      "stroke-dasharray": ["-"]
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var dropMessageAttr = {
      "font-size": 20,
      "font-weight": "bold",
      fill: colors.black,
      opacity: 0.5
   };
   var buttonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: undoH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      },
      icon: {
         stroke: "none",
         fill: "white"
      }
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      src = JSON.parse(JSON.stringify(data[level].src));
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      targetNbStacks = data[level].targetNbStacks;
      nbBlocks = src.length;
      var nbRows = 1;
      if (nbBlocks <= 5) {
         tokenW = 100;
         tokenH = 50;
         tokenEdgeH = 16;
         marginX = 30;
      } else {
         tokenW = 80;
         tokenH = 40;
         tokenEdgeH = 12.8;
         nbRows = 2;
      }
      historyLength = data[level].historyLength;
      attractionX = 50;
      attractionY = 30;
      markerLength = tokenW / 4;
      shadowW = tokenW * 1.05;
      shadowH = tokenH;
      tokenMargin = (tokenH - tokenEdgeH)/2;
      blockMargin = (targetNbStacks == 2) ? marginX : marginX/2;
      blockW = tokenW + blockMargin;
      dropH = data[level].dropH;
      maxStackHeight = maxBlockH*tokenEdgeH + tokenH / 3;
      ySrc = maxStackHeight;
      yDropArea = ySrc + tokenEdgeH + marginY;
      if (nbRows == 2) {
         yDropArea += maxStackHeight + marginY;
      }
      yUndo = yDropArea + dropH + marginY;
      paperH = yUndo + undoH + marginY;
      computeSrcPos();
      blockPos = Beav.Object.clone(srcPos);
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
      randomizeSrc();
      replayHist(answer.hist.length);
      initPaper();
      initBlocks();
      initUndo();
      updateUndo();
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

   function randomizeSrc() {
      var shift = rng.nextInt(0,1000);
      for(var iBlock = 0; iBlock < src.length; iBlock++){
         var block = src[iBlock];
         for(var iToken = 0; iToken < block.length; iToken++){
            block[iToken] = (block[iToken] + shift)%3;
         }
      }
   };

   function computeSrcPos() {
      var nbBlocksTopRow = nbBlocks;
      if (nbBlocks > 5) {
         nbBlocksTopRow = Math.floor((nbBlocks + 1) / 2);
      }
      var x0 = (paperW - nbBlocksTopRow*blockW)/2;
      var y = ySrc;
      for(var iSrc = 0; iSrc < nbBlocks; iSrc++){
         var x = x0 + (iSrc % nbBlocksTopRow)*blockW + blockMargin/2;
         var row = Math.floor(iSrc / nbBlocksTopRow);
         var y = ySrc + row * (maxStackHeight + marginY);
         srcPos[iSrc] = { x: x, y: y };
      }
   }

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         // seed: rng.nextInt(0,1000),
         hist: [{type: "init", stacks: {}, blockPos: Beav.Object.clone(srcPos)}]
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

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      paper.rect(xDropArea,yDropArea,dropW,dropH).attr(dropAttr);
      if(targetNbStacks == 3){
         var xMsg = xDropArea + dropW/2;
         var yMsg = yDropArea + dropH/2;
         dropMessage = paper.text(xMsg,yMsg,taskStrings.buildStacks(targetNbStacks)).attr(dropMessageAttr);
         if($.isEmptyObject(stacks)){
            dropMessage.show();
         }else{
            dropMessage.hide();
         }
      }

      $("#zone_2 .overlay").remove();
      $("#zone_2").css({ position: "relative", "padding-top": "1px" });
      var y0 = 16;
      var x,y,w,h;
      for(var iOver = 1; iOver <= 3; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = y0;
               w = srcPos[0].x;
               h = yDropArea;
               break;
            case 2:
               var rightID = (nbBlocks > 5) ? Math.ceil(nbBlocks/2 - 1) : nbBlocks - 1;
               x = srcPos[rightID].x + tokenW;
               y = y0;
               w = paperW - x;
               h = yDropArea;
               break;
            case 3:
               x = 0; 
               y = y0 + yDropArea + dropH;
               w = xUndo;
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
   
   function initBlocks() {
      // computeSrcPos();
      for(var iSrc = 0; iSrc < nbBlocks; iSrc++){
         resetBlock(iSrc);
      }
      for(var iStack in stacks){
         var stack = stacks[iStack];
         var bottomID = stack[0];
         var pos = blockPos[bottomID];
         //shadows[bottomID] = drawShadow(pos.x,pos.y);
         blockObj[bottomID].toFront();
         for(var iBlock = 1; iBlock < stack.length; iBlock++){
            var blockID = stack[iBlock];
            blockObj[blockID].toFront();
            var pos = blockPos[blockID];
            markers[blockID] = drawMarkers(pos.x,pos.y);
         }
      }
   };

   function initUndo() {
      var w = undoW;
      var h = undoH;
      var xc = xUndo + w/2;
      var yc = yUndo + h/2;
      var iconW = 15;
      var iconH = 15;
      undoButton = drawButton(paper,xc,yc,w,h,{
         attr: buttonAttr,
         text: taskStrings.undo,
         xText: xc + 10,
         yText: yc,
         imgSrc: undoSrc,
         xIcon: xUndo + 15,
         yIcon: yc - iconH/2,
         iconW: iconW, iconH: iconH
      });
   };

   function initBlockDrag(id) {
      Beav.dragWithTouch(blockObj[id], onMove, onStart(id), onEnd);
      blockObj[id].attr("cursor","grab");
   };

   function onStart(id) {
      return function(x,y,event){
         displayError("");
         var stackID = null;
         for(var iStack in stacks){
            var currStack = stacks[iStack];
            if(Beav.Array.has(currStack,id)){
               stackID = iStack;
               break;
            }
         }
         dragData = { id: id, startPos: blockPos[id], stackID: stackID };
         if(stackID != null){
            var stack = stacks[stackID];
            var blockIndex = Beav.Array.indexOf(stack,id);
            if(blockIndex > 0){
               splitStack(stackID,blockIndex,false);
               answer.hist.push({ type: "split", stackID: stackID, blockIndex: blockIndex });
               dragData.stackID = id;
               stackID = id;
               dragData.split = true;
            }else{
               /*
               if(shadows[id]){
                  shadows[id].remove();
                  shadows[id] = null;
               }
               */
            }
            var set = paper.set();
            for(var iBlock = 0; iBlock < stacks[stackID].length; iBlock++){
               var blockID = stacks[stackID][iBlock];
               set.push(blockObj[blockID]);
               if(markers[blockID]){
                  set.push(markers[blockID])
               }
            }
            draggedObj = set.toFront();
         }else{
            draggedObj = blockObj[id].toFront();
         }
      }
   };

   function onMove(dx,dy,x,y,event) {
      var stackID = dragData.stackID;
      if(dragData.split){
         if(Beav.Geometry.distance(0,0,dx,dy) < 10){
            return;
         } else {
            dragData.split = false;
         }
      }
      var startPos = dragData.startPos;
      var xBlock = startPos.x + dx;
      var yBlock = startPos.y + dy;
      var xMin = xDropArea;
      var xMax = xDropArea + dropW - tokenW;
      if(stackID != null && stacks[stackID].length > 1){
         var h = getStackH(stackID);
         var yMin = yDropArea + h;
      }else{
         var yMin = maxBlockH*tokenEdgeH + tokenMargin;
      }
         var yMax = yDropArea + dropH - tokenMargin;
      if(xBlock < xMin){
         dx = xMin - startPos.x;
      }else if(xBlock > xMax){
         dx = xMax - startPos.x;
      }
      if(yBlock < yMin){
         dy = yMin - startPos.y;
      }else if(yBlock > yMax){
         dy = yMax - startPos.y;
      }
      draggedObj.transform("T"+dx+" "+dy);
      dragData.dx = dx;
      dragData.dy = dy;
   };

   function onEnd(event) {
      var id = dragData.id;
      var stackID = dragData.stackID;
      var dx = dragData.dx || 0;
      var dy = dragData.dy || 0;
      var currX = blockPos[id].x + dx;
      var currY = blockPos[id].y + dy;
      answer.hist.push({ type: "drop", id: id, stackID: stackID, dropPos: { x: currX, y: currY }});
      handleDrop(id,stackID,currX,currY);
      compressHist();
      updateUndo();
   };

   function handleDrop(id,stackID,currX,currY,noVisual) {
      var goBack = false;
      if(stackID == null || stacks[stackID].length == 1){
         var blockData = src[id];
         var h = getBlockH(id);
         if(currY < yDropArea + h){
            currX = srcPos[id].x;
            currY = srcPos[id].y;
            goBack = true;
         }
         if(stackID != null){
            delete stacks[stackID];
            stackID = null;
         }
      }
      if(!goBack){
         var currStack = (stackID != null) ? stacks[stackID] : [id];
         var h = (stackID != null) ? getStackH(stackID) : getBlockH(id);
         var snap = checkSnap(currX,currY,h,stackID);
         if(snap !== false){
            if(snap.dir == "down"){
               addStackTo(currStack,stacks[snap.id]);
               if(stackID != null){
                  delete stacks[stackID];
               }
               stackID = snap.id;
               var bottomBlock = stacks[stackID][0];
               currX = blockPos[bottomBlock].x;
               currY = blockPos[bottomBlock].y;
            }else{
               addStackTo(stacks[snap.id],currStack);
               /*
               if(shadows[snap.id]){
                  shadows[snap.id].remove();
                  shadows[snap.id] = null;
               }
               */
               delete stacks[snap.id];
               if(!stacks[currStack[0]]){
                  stackID = currStack[0];
                  stacks[stackID] = JSON.parse(JSON.stringify(currStack));
               }
            }
         }else if(!stacks[currStack[0]]){
            stackID = currStack[0];
            stacks[stackID] = JSON.parse(JSON.stringify(currStack));
         }
         var newPos = fixCollision(stackID,currX,currY);
         currX = newPos.x;
         currY = newPos.y;
      }

      if(stackID == null){
         updateBlockPos(id,currX,currY);
         if(!noVisual){
            resetBlock(id);
         }
      }else{
         updateStackPos(stackID,currX,currY);
         if(!noVisual){
            resetStack(stackID);
         }
      }
      dragData = null;
      if((targetNbStacks == 3) && !noVisual){
         if($.isEmptyObject(stacks)){
            dropMessage.show();
         }else{
            dropMessage.hide();
         }
      }
   };

   function fixCollision(stackID,x,y) {
      var step = 10;
      var startX = x;
      var startY = y;
      var counter = 0;
      var minY = yDropArea + getStackH(stackID);
      var maxY = yDropArea + dropH;
      var minX = xDropArea;
      var maxX = xDropArea + dropW - tokenW;
      var isColl = checkForCollision(stackID,x,y);
      if(isColl !== false){
         var otherPos = blockPos[isColl];
         var dir = (x - otherPos.x > 0);
         var xStart = [x + step, x - step];
         var cond = [ function(newX) {return newX < maxX}, function(newX) {return newX > minX} ];
         var currStep = [ step, -step ];
         for(var direction = 0; direction < 2; direction++){
            if(!dir){
               direction = 1 - direction;
            }
            for(var newX = xStart[direction]; cond[direction](newX); newX += currStep[direction]){
               if(checkForCollision(stackID,newX,y) === false){
                  return { x: newX, y: y }
               }
            }
         }

         for(var newY = minY; newY < maxY; newY += step){
            for(var newX = xDropArea; newX < xDropArea + dropW - tokenW; newX += step){
               if(checkForCollision(stackID,newX,newY) === false){
                  return { x: newX, y: newY }
               }
            }
         }
      }
      return { x: x, y: y }
   };

   function checkForCollision(stackID,x,y) {
      var h = getStackH(stackID);
      var w = tokenW;
      for(var iStack in stacks){
         if(iStack == stackID){
            continue
         }
         var h2 = getStackH(iStack);
         var pos2 = blockPos[iStack];
         if(stackOverlap(x,y,w,h,pos2.x,pos2.y,w,h2)){
            return iStack
         }
      }
      return false
   };


   function stackOverlap(x1,y1,w1,h1,x2,y2,w2,h2) {
      if(x1 <= x2 + w2 && x1 + w1 >= x2 && y1 >= y2 - h2 && y1 - h1 <= y2){
         return true
      }
      return false
   };

   function getStackH(id) {
      var stack = stacks[id];
      var h = 0;
      for(var iBlock = 0; iBlock < stack.length; iBlock++){
         var blockID = stack[iBlock];
         h += getBlockH(blockID) - tokenMargin;
      }
      return h + tokenMargin
   };

   function getBlockH(id) {
      var blockData = src[id];
      var h = blockData.length*tokenEdgeH + tokenMargin;
      return h
   };

   function updateStackPos(id,x,y) {
      var stack = stacks[id];
      var yBlock = y;
      for(var iBlock = 0; iBlock < stack.length; iBlock++){
         var blockID = stack[iBlock];
         var blockData = src[blockID];
         updateBlockPos(blockID,x,yBlock);
         yBlock -= blockData.length*tokenEdgeH;
      }
   };

   function updateBlockPos(id,x,y) {
      blockPos[id].x = x;
      blockPos[id].y = y;
   };

   function updateUndo() {
      undoButton.unclick();
      if(answer.hist.length > 1){
         undoButton[0].attr("opacity",1);
         undoButton.attr("cursor","pointer");
         undoButton.click(undo);
      }else{
         undoButton[0].attr("opacity",0.5);
         undoButton.attr("cursor","auto");
      }
   };

   function resetAll() {
      for(var iSrc = 0; iSrc < nbBlocks; iSrc++){
         resetBlock(iSrc);
      }
      for(var stackID in stacks){
         resetStack(stackID);
      }
   };

   function resetStack(id) {
      var stack = stacks[id];
      for(var iBlock = 0; iBlock < stack.length; iBlock++){
         var blockID = stack[iBlock];
         resetBlock(blockID,iBlock > 0,iBlock == 0);
         if(iBlock < stack.length - 1){
            var nbElem = blockObj[blockID].length;
            var overlay = blockObj[blockID][nbElem - 1];
            var currY = overlay.attr("y");
            var currH = overlay.attr("height");
            overlay.attr({y: currY + tokenMargin, height: currH - tokenMargin});
         }
      }
   };

   function resetBlock(id,marker,shadow) {
      var x = blockPos[id].x;
      var y = blockPos[id].y;
      if(blockObj[id]){
         blockObj[id].remove();
      }
      /*
      if(shadows[id]){
         shadows[id].remove();
      }
      if(shadow){
         shadows[id] = drawShadow(x,y);
      }
      */
      blockObj[id] = drawBlock(x,y,src[id]);
      initBlockDrag(id);
      if(markers[id]){
         markers[id].remove();
      }
      if(marker){
         markers[id] = drawMarkers(x,y);
      }

   };

   function checkSnap(x,y,h,id) {
      for(var iStack in stacks){
         var currStack = stacks[iStack];
         var currID = currStack[0];
         if(currID == id){
            continue
         }
         var topBlock = currStack[currStack.length - 1];
         var topPos = blockPos[topBlock];
         var topData = src[topBlock];
         var topH = topData.length*tokenEdgeH + tokenMargin;
         var bottomBlock = currStack[0];
         var bottomPos = blockPos[bottomBlock];
         if (Math.abs(x - topPos.x) < attractionX) {
            if (Math.abs(y - (topPos.y - topH + tokenEdgeH)) < attractionY) {
               return { id: iStack, dir: "down" }
            }
            if (Math.abs((y - h) - bottomPos.y + tokenEdgeH) < attractionY) {
               return { id: iStack, dir: "up" }
            }
         }         
      }
      return false
   };

   function addStackTo(stack1,stack2) {
      for(var iBlock = 0; iBlock < stack1.length; iBlock++){
         stack2.push(stack1[iBlock]);
      }
   };

   function splitStack(stackID,blockIndex,noVisual) {
      var currStack = stacks[stackID];
      var newStack = currStack.splice(blockIndex);
      stacks[newStack[0]] = newStack;
      if(!noVisual && markers[newStack[0]]){
         markers[newStack[0]].remove();
      }
   };

   function drawBlock(x,y,stackData) {
      var w = tokenW;
      var h = tokenH;
      var edgeH = tokenEdgeH;
      var y0 = y - edgeH*stackData.length - tokenMargin;
      var set = paper.set();
      for(var iToken = 0; iToken < stackData.length; iToken++){
         var tokenIndex = stackData.length - 1 - iToken;
         var yTok = y0 + tokenIndex*edgeH;
         var id = stackData[tokenIndex];
         set.push(paper.image(tokenSrc[id],x,yTok,w,h));
      }
      var xOv = x - blockMargin/2;
      var yOv = y0;
      var ovW = w + blockMargin;
      var ovH = edgeH*stackData.length + 2*tokenMargin;
      var overlay = paper.rect(xOv,yOv,ovW,ovH).attr(overlayAttr);
      set.push(overlay);
      return set
   };

   function drawMarkers(x,y) {
      var x1 = x - markerLength;
      var x2 = x;
      var x3 = x + tokenW;
      var x4 = x3 + markerLength;
      var y2 = y + tokenMargin + 4;
      var path = paper.path(["M",x1,y,"H",x2,"C",x,y2,x3,y2,x3,y,"H",x4]);
      return path.attr(markerAttr)
   };
/*
   function drawShadow(x,y) {
      var xImg = x;
      var yImg = y - shadowH/2;
      return paper.image(shadowSrc,xImg,yImg,shadowW,shadowH)
   };
*/
   function undo() {
      answer.hist.pop();
      if(answer.hist.length > 0 && answer.hist[answer.hist.length - 1].type == "split"){
         answer.hist.pop();
      }
      replayHist(answer.hist.length);
      updateUndo();
      resetAll();
      // for(var iSrc = 0; iSrc < nbBlocks; iSrc++){
      //    resetBlock(iSrc);
      // }
   };
   
   function compressHist() {
      var newStart = Math.max(1, answer.hist.length - historyLength);
      replayHist(newStart);
      newHist = [{
         type: "init",
         stacks: Beav.Object.clone(stacks),
         blockPos: Beav.Object.clone(blockPos)
      }];
      for (var iMove = newStart; iMove < answer.hist.length; iMove++) {
         newHist.push(answer.hist[iMove]);
      }
      answer.hist = newHist;
      replayHist(answer.hist.length);
   }
   
   function replayHist(nbMoves) {
      for(var iMove = 0; iMove < nbMoves; iMove++){
         var move = answer.hist[iMove];
         var type = move.type;
         if (type == "init") {
            stacks = Beav.Object.clone(move.stacks);
            blockPos = Beav.Object.clone(move.blockPos);
         } else if(type == "drop"){
            var id = move.id;
            var x = move.dropPos.x;
            var y = move.dropPos.y;
            handleDrop(id,move.stackID,x,y,true);
         }else{
            var blockIndex = move.blockIndex;
            splitStack(move.stackID,blockIndex,true);
         }
      }
   };

   function checkResult(noVisual) {
      replayHist(answer.hist.length);
      var tempStacks = [];
      for(var iStack in stacks){
         tempStacks.push(stacks[iStack]);
      }
      if(tempStacks.length != targetNbStacks){
         var error = taskStrings.errorNbStacks(tempStacks.length,targetNbStacks,(tempStacks.length < targetNbStacks));
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      var tokens = [];
      var nbBlocksInStacks = 0;
      for(var iStack = 0; iStack < tempStacks.length; iStack++){
         var currStack = tempStacks[iStack];
         tokens[iStack] = [];
         nbBlocksInStacks += currStack.length;
         for(var iBlock = 0; iBlock < currStack.length; iBlock++){
            var blockID = currStack[iBlock];
            var blockData = src[blockID];
            for(var iToken = 0; iToken < blockData.length; iToken++){
               tokens[iStack] += blockData[blockData.length - 1 - iToken];
            }
         }
      }
      if((targetNbStacks == 2) && nbBlocksInStacks < nbBlocks){
         var error = taskStrings.errorNbBlocks;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      var stackHeight = null;
      for(var iStack = 0; iStack < tokens.length; iStack++){
         var currH = tokens[iStack].length;
         if(stackHeight == null){
            stackHeight = currH;
         }else if(currH != stackHeight){
            var error = taskStrings.errorStackHeight(targetNbStacks);
            if(!noVisual){
               displayError(error);
            }
            return { successRate: 0, message: error }
         }
      }
      for(var iH = 0; iH < stackHeight; iH++){
         var currToken = null;
         for(var iStack = 0; iStack < tokens.length; iStack++){
            if(currToken == null){
               currToken = tokens[iStack][iH];
            }else if(currToken != tokens[iStack][iH]){
               var error = taskStrings.errorStacks(targetNbStacks);
               if(!noVisual){
                  displayError(error);
               }
               return { successRate: 0, message: error }
            }
         }
      }
      if((targetNbStacks == 3) && stackHeight < targetStackH){
         var error = taskStrings.errorMaxHeight(targetNbStacks);
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0.5, message: error }
      }
      if(!noVisual){
         platform.validate("done");
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

