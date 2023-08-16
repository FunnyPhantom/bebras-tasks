   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         seq: [3,6,7,8,4,1,5,2],
         maxSwap: 1,
         targetSwap: 1,
         targetStep: 1,
         x0PlanetDelta: 20,
         overlayLayout: "basic",
         hasSandbox: false
      },
      easy: {  
         seq: [3,4,7,8,9,10,5,6,1,2],
         maxSwap: 1,
         targetSwap: 1,
         targetStep: 4,
         x0PlanetDelta: 60,
         overlayLayout: "easy",
         hasSandbox: true
      },
      medium: {
         seq: [3,5,4,6,7,9,8,10,1,2],
         maxSwap: 1,
         targetSwap: 1,
         targetStep: 7,
         x0PlanetDelta: 60,
         overlayLayout: "medium",
         hasSandbox: true
      },
      hard: {
         seq: [9, 14, 5, 1, 8, 12, 6, 3, 4, 18, 17, 16, 2, 13, 11, 7, 10, 15],
         maxSwap: 2,
         targetSwap: 2,
         targetStep: 11,
         x0PlanetDelta: 50,
         overlayLayout: "hard",
         hasSandbox: true
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.basic,
         medium: data.easy,
         hard: data.hard
      };
   }

   var paper;
   var paperW = 770;
   var paperH;

   var marginX = 20;
   var marginY = 20;

   var xTeleportBox = marginX/2;
   var yTeleportBox = marginY/2;
   var teleportBoxW = paperW - marginX;
   var teleportBoxH;

   var placeW = 60;
   var placeH = 110;
   var rowMarginY = 2*marginY;
   var y0Planet = yTeleportBox + rowMarginY;
   var x0Planet;
   var planetMarginY = marginY/2;
   var maxTeleportW = teleportBoxW - 2*marginX;

   var planetW = placeW;
   var planetH = placeW;
   var planetImgW = planetW*20;
   var portalW = placeW - 5;
   var portalH = placeH - 26;
   var beaverH = 45;
   var beaverW = 42;
   var beaverOffsetY = 11;
   var currPlanet = 1;
   var y0Teleport = y0Planet + planetH + planetMarginY;
   
   var buttonH = 30;
   var buttonW = 130;
   var iconSize = 14;
   var xSwapCounter = xTeleportBox + marginX;
   var xUndo = xSwapCounter + 220;
   if (typeof(enableRtl) !== "undefined") {
	   xSwapCounter = xUndo - marginX;
   }
   var yUndo;
   var xTry = xUndo + buttonW + 200;

   var xDragLabel = xTeleportBox;
   if (typeof(enableRtl) !== "undefined") {
	   xDragLabel = paperW - marginX;
   }
   var yDragLabel;
   var dragLabelH = 40;
   var dragBoxH = 250;
   var dragBoxW = teleportBoxW;
   var xDragBox = xTeleportBox;
   var yDragBox;
   var dragPlanetR = 21;
   var maxDragPlaPerRow = Math.floor(dragBoxW/(2*dragPlanetR + marginX));
   var nbDragPlaRows;
   var dragLimits;

   var nbPlanets;
   var planetScale = [];
   var minScale = 0.8;
   var maxScale = 1.2;
   var seq = [];
   var iti = [];
   var containers = [];
   var containersID = [];
   var nbRows;
   var maxPlanetPerRow;
   var mask;
   var targetSwap, targetStep;

   var rng;
   var dragAndDrop;
   var undoButton;
   var tryButton;
   var swapCounter;
   var stepCounter;
   var maxSwap;
   var dragPlanetObj = [];
   var dragData;
   var beaverObj;
   
   var sim;
   var goDownAnimDuration = 300;
   var fadeAnimDuration = 800;

   var undoSrc = $("#undo").attr("src");
   var checkSrc = $("#check").attr("src");
   var beaverSrc = $("#beaver").attr("src");
   var planetSrc = $("#planets").attr("src");
   var portalSrc = $("#portal").attr("src");

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      gold: "#f8bf1a",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      seaBlue: "#0e5667",
      brown: "#934c22",
      lightGrey: "#f2f2f2",
      grey: "#e2e2e2",
      darkGrey: "#616161",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ee2d7c",
      lightPink: "#fac2c7",
      orange: "#f6891e",
      purple: "#8652a1",
      darkPurple: "#2b2867",
      red: "#ee425e"
   };

   var teleportBoxAttr = {
      stroke: "none",
      fill: colors.darkPurple,
      r: 5
   };
   var planetTextAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: "white"
   };
   var backgroundAttr = {
      stroke: colors.black,
      fill: colors.grey,
      r: 5,
      opacity: 0
   };
   var labelAttr = {
      fill: "white",
      "font-size": 16,
      "font-weight": "bold",
      // "text-anchor": "start"
   };
   var teleporterAttr = {
      rect: {
         stroke: colors.purple,
         "stroke-width": 2,
         fill: colors.darkPurple,
         r: 5
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      },
      circ: {
         stroke: "none",
         fill: colors.purple
      }
   };
   var undoButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.red,
         r: buttonH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var tryButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: buttonH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var swapCounterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: "white",
      "text-anchor": "start"
   };
   var stepCounterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: "white",
      "text-anchor": "end"
   };
   var dragLabelAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black,
      "text-anchor": "start"
   };
   var dragBoxAttr = teleportBoxAttr;
   var dragPlanetAttr = {
      circ: {
         stroke: colors.black,
         "stroke-width": 2,
         fill: "lightgreen",
         r: dragPlanetR
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black
      }
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0.5
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
      seq = Beav.Object.clone(data[level].seq);
      maxSwap = data[level].maxSwap;
      targetSwap = data[level].targetSwap;
      targetStep = data[level].targetStep;
      nbPlanets = seq.length;
      maxPlanetPerRow = (nbPlanets < Math.floor(maxTeleportW/placeW)) ? nbPlanets : Math.floor(nbPlanets/2);
      nbRows = Math.ceil(nbPlanets/maxPlanetPerRow);
      yUndo = y0Planet + nbRows*(planetH + placeH + planetMarginY + rowMarginY) - marginY;
      teleportBoxH = yUndo + buttonH + marginY - yTeleportBox;
      yDragLabel = yTeleportBox + teleportBoxH;
      yDragBox = yDragLabel + dragLabelH;
      nbDragPlaRows = Math.ceil(nbPlanets/maxDragPlaPerRow);
      x0Planet = (nbPlanets < maxPlanetPerRow) ? (paperW - nbPlanets*placeW)/2 : (paperW - maxPlanetPerRow*placeW)/2;
	  x0Planet += data[level].x0PlanetDelta;

      dragLimits = {
         xMin: xDragBox + dragPlanetR,
         yMin: yDragBox + dragPlanetR,
         xMax: xDragBox + dragBoxW - dragPlanetR,
         yMax: yDragBox + dragBoxH - dragPlanetR
      };
      
      if (!data[level].hasSandbox) {
         paperH = yTeleportBox + teleportBoxH + marginY;
      } else {
         paperH = yDragBox + dragBoxH + marginY;
      }
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
      rng.reset(answer.seed);
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         seed: rng.nextInt(0,1000),
         hist: []
      };

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult();
      return result
   };

   subTask.unloadLevel = function(callback) {
      subTask.simulationFactory.destroy("sim");
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   subTask.resetDisplay = function() {
      displayError("");
      generatePlanetScales();
      initPaper();
      replayHist();
      initDragDrop();
      initBeaver();
      initUndo();
      initSwapCounter();
      initTry();
      if (data[level].hasSandbox) {
         initDragBox();
	  }
      initHandlers();

      // displayHelper.customValidate = checkResult;
      displayHelper.hideValidateButton = true;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function generatePlanetScales() {
      for(var iPla = 0; iPla < nbPlanets; iPla++){
         var scale = rng.nextInt(minScale*100,maxScale*100)/100;
         planetScale[iPla] = scale;
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      paper.rect(xTeleportBox,yTeleportBox,teleportBoxW,teleportBoxH).attr(teleportBoxAttr);

      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h
      var nbOv = (data[level].overlayLayout != "hard") ? 8 : 9;
      for(var iOver = 1; iOver <= nbOv; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = y0Teleport;
               break;
            case 2:
               x = 0; y = y0Teleport;
               w = x0Planet;
               h = (data[level].hasSandbox) ? yDragBox - y : paperH - y;
               break;
            case 3:
               x = x0Planet; 
               y = yUndo - marginY;
               w = xUndo - x;
               h = (data[level].hasSandbox) ? yDragBox - y : paperH - y;
               break;
            case 4:
               x = xUndo; 
               y = yUndo + buttonH;
               w = paperW - x;
               h = (data[level].hasSandbox) ? yDragBox - y : paperH - y;
               break;
            case 5:
               x = xUndo; 
               y = yUndo - marginY;
               w = paperW - x;
               h = marginY;
               break;
            case 6:
               x = xUndo + buttonW; 
               y = yUndo;
               w = xTry - x;
               h = buttonH;
               break;
            case 7:
               x = xTry + buttonW; 
               y = yUndo;
               w = paperW - x;
               h = buttonH;
               break;
            case 8:
               x = x0Planet + maxPlanetPerRow*placeW; 
               y = y0Planet;
               w = paperW - x;
               h = yUndo - marginY - y;
               break;
            case 9:
               x = x0Planet; 
               y = y0Teleport + placeH;
               w = paperW - x;
               h = yUndo - marginY - placeH - y;
               break;
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

   var initDragDrop = function() {
      dragAndDrop = DragAndDropSystem({
         paper : paper,
         displayHelper: displayHelper,
         drop : function(srcContId, srcPos, dstContId, dstPos, type) {
            displayError("");
            var dstRow = Beav.Array.indexOf(containersID,dstContId);
            var dstSeqPos = dstPos + dstRow*maxPlanetPerRow;
            var dstID = seq[dstSeqPos];
            var srcRow = Beav.Array.indexOf(containersID,srcContId);
            var srcSeqPos = srcPos + srcRow*maxPlanetPerRow;
            var srcID = seq[srcSeqPos];

            if(srcID != dstID){
               var element = drawTeleporter(0,0,dstID);
               this.insertObject(srcContId, srcPos, {ident : dstID, elements : element } );
               answer.hist.push([srcID,dstID]);
               seq = [];
               for(var row = 0; row < nbRows; row++){
                  seq = seq.concat(this.getObjects(containersID[row]));
               }
               updateSwapCounter();
               updateUndo();
            }
            // console.log(seq)
         },
         actionIfDropped : function(srcCont, srcPos, dstCont, dstPos, type) {
            if (dstCont == null)
               return false;
            return true;
         },
         canBeTaken : function(containerID, position) {
            displayError("");
            resetBeaver();
            if(answer.hist.length >= maxSwap){
               displayError(taskStrings.errorMaxSwap(maxSwap));
               return false
            }
            return true
         }
      });

      for(var row = 0; row < nbRows; row++){
         var w = placeW, h = placeH;
         var length = (row < nbRows - 1) ? maxPlanetPerRow : nbPlanets - (Math.ceil(nbPlanets/maxPlanetPerRow) - 1)*maxPlanetPerRow;
         var totW = length*w;
         var yCont = y0Teleport + row*(planetH + h + rowMarginY + planetMarginY);
         var yc = yCont + h/2;
         var xLabel = xTeleportBox + (x0Planet - xTeleportBox)/2;
         paper.text(xLabel,yc,taskStrings.swapTeleporters).attr(labelAttr);
         var contID = "tele_"+row;
         containersID[row] = contID;
         paper.rect(x0Planet,yCont,totW,h).attr(backgroundAttr);
         dragAndDrop.addContainer({
            ident : contID,
            cx : x0Planet + totW/2,
            cy : yc,
            widthPlace : w,
            heightPlace : h,
            nbPlaces : length,
            direction : 'horizontal',
            dropMode : 'replace',
            dragDisplayMode : 'preview',
            placeBackgroundArray : [ ]
         });

         for(var iPla = 0; iPla < length; iPla++){
            var plaID = iPla + row*maxPlanetPerRow;
            var x = x0Planet + iPla*w;
            var cx = x + w/2;
            var cy = yCont - planetMarginY - planetH/2;
            drawPlanet(cx,cy,plaID);
            var id = seq[plaID];
            var element = drawTeleporter(0,0,id);

            dragAndDrop.insertObject(contID, iPla, {ident : id, elements : element } );
            var cont = dragAndDrop.getContainer(contID);
            cont.draggableElements[iPla].component.group.attr("cursor","grab");
         }
      }
   };

   function initBeaver() {
      var w = beaverW, h = beaverH;
      var pos = getPlanetPosFromID(1);
      var x = pos.x - w/2;
      var y = pos.y - h - beaverOffsetY;
      beaverObj = paper.image(beaverSrc,x,y,w,h);
   };

   function initUndo() {
      undoButton = drawButton(true);
   };

   function initSwapCounter() {
      var x = xSwapCounter;
      var y = yUndo + buttonH/2;
      var str = taskStrings.nbSwap(answer.hist.length,maxSwap);
      swapCounter = paper.text(x,y,str).attr(swapCounterAttr);
   };

   function initTry() {
      var x = xTry, y = yUndo;
      var w = buttonW, h = buttonH;
      var yText = y + h/2;
      tryButton = drawButton(false);
      var xStep = x - marginX;
      stepCounter = paper.text(xStep,yText,"").attr(stepCounterAttr).hide();
   };

   function initDragBox() {
      var yText = yDragLabel + dragLabelH/2;
      paper.text(xDragLabel,yText,taskStrings.dragLabel).attr(dragLabelAttr);
      paper.rect(xDragBox,yDragBox,dragBoxW,dragBoxH).attr(dragBoxAttr);
      var r = dragPlanetR;
      var cx0 = xDragBox + marginX + r;
      var cy0 = yDragBox + marginY + r;
      // console.log(nbDragPlaRows)
      for(var row = 0; row < nbDragPlaRows; row++){
         var nbDragPla = (row < nbDragPlaRows - 1) ? maxDragPlaPerRow : nbPlanets - (nbDragPlaRows - 1)*maxDragPlaPerRow;
         for(var iPla = 0; iPla < nbDragPla; iPla++){
            var cx = cx0 + iPla*(2*r + marginX);
            var cy = cy0 + row*(2*r + marginY);
            var plaID = iPla + row*maxDragPlaPerRow;
            dragPlanetObj[plaID] = drawPlanet(cx,cy,plaID);
         }
      }
      
   };

   function initHandlers() {
      if (dragPlanetObj.length > 0) {
		  for(var iPla = 0; iPla < nbPlanets; iPla++){
			 Beav.dragWithTouch(dragPlanetObj[iPla], onMove, onStart(iPla), onEnd, displayHelper);
			 dragPlanetObj[iPla].attr("cursor","grab");
		  }
	  }
      tryButton.click(runSimulation);
      tryButton.attr("cursor","pointer");
      updateUndo();
   };

   function clickUndo() {
      displayError("");
      resetBeaver();
      var swap = answer.hist.pop();
      var id1 = swap[0];
      var id2 = swap[1];
      var seqPos1 = Beav.Array.indexOf(seq,id1);
      var seqPos2 = Beav.Array.indexOf(seq,id2);
      seq.splice(seqPos1,1,id2);
      seq.splice(seqPos2,1,id1);
      updateTeleporters();
      updateUndo();
      updateSwapCounter();
   };

   function onStart(id) {
      return function(x,y,ev) {
         dragPlanetObj[id].toFront();
         var x0 = dragPlanetObj[id][1].attr("x");
         var y0 = dragPlanetObj[id][1].attr("y");
         dragData = { id: id, x0: x0, y0: y0 };
      }
   };

   function onMove(dx,dy,x,y,ev) {
      var id = dragData.id;
      var x0 = dragData.x0;
      var y0 = dragData.y0;

      var newX = x0 + dx;
      var newY = y0 + dy;
      newX = Math.max(dragLimits.xMin, newX);
      newX = Math.min(dragLimits.xMax, newX);
      newY = Math.max(dragLimits.yMin, newY);
      newY = Math.min(dragLimits.yMax, newY);
      setPlanetPos(newX,newY,id);
   };

   function onEnd(ev) {
      var id = dragData.id;
      var x = dragPlanetObj[id][1].attr("x");
      var y = dragPlanetObj[id][1].attr("y");

      if(overlapOtherPlanet(x,y,id)){
         var newPos = findEmptySpace(x,y,id);
         newX = newPos.x;
         newY = newPos.y;
         setPlanetPos(newX,newY,id);
      }

   };

   function runSimulation() {
      displayError("");
      resetBeaver();
      beaverObj.toFront();
      var iti = findIti();
      var result = getResult(iti);
      sim = subTask.simulationFactory.create("sim");
      for(var iStep = 0; iStep < iti.length - 1; iStep++){
         var simStep = new SimulationStep();
         var simAction1 = { onExec: goDown, duration: goDownAnimDuration, params: { step: iStep } };
         var simEntry1 = { name: "goDown", action: simAction1 };
         var end = (iStep + 1 >= iti.length - 1);
         var simAction2 = { onExec: teleport, duration: fadeAnimDuration, params: { dst: iti[iStep + 1], end: end, result: result } };
         var simEntry2 = { name: "teleport", action: simAction2, parents: ["goDown"] };
         simStep.addEntries([simEntry1,simEntry2]);
         sim.addStep(simStep);
      }
      sim.setAutoPlay(true);
      sim.play();
   };

   function goDown(params, duration, callback) {
      // console.log("goDown");
      var step = params.step + 1;
      stepCounter.attr("text",taskStrings.nbStep(step,targetStep)).show();
      var dy = beaverOffsetY + 121;
      var anim = new Raphael.animation({ transform: ["T",0,dy] }, duration, callback);
      subTask.raphaelFactory.animate("anim",beaverObj,anim);
   };

   function teleport(params, duration, callback) {
      var dst = params.dst;
      var w = beaverW, h = beaverH;
      var pos = getPlanetPosFromID(dst);
      var x = pos.x - w/2;
      var y = pos.y - h - beaverOffsetY;
      var tempBeav = beaverObj.clone();
      beaverObj.attr({ x: x, y: y, transform: [], opacity: 0 });
      var fadeIn = new Raphael.animation({ opacity: 1 }, duration, callback);
      var fadeOut = new Raphael.animation({ opacity: 0 }, duration);
      subTask.raphaelFactory.animate("fadeOut",tempBeav,fadeOut, function() {
         tempBeav.remove();
      });
      subTask.raphaelFactory.animate("fadeIn",beaverObj,fadeIn);
      return {
         stop: function() {
            if(params.end){
               subTask.simulationFactory.destroy("sim");
               var res = params.result;
               if(res.successRate == 0){
                  displayError(res.message);
               }else{
                  platform.validate("done");
               }
            }
         }
      }      
   };

   function getPlanetPosFromID(id) {
      var plaID = id - 1;
      var row = Math.floor(plaID/maxPlanetPerRow);
      var col = plaID - row*maxPlanetPerRow;
      var x = x0Planet + placeW/2 + col*placeW;
      var y = y0Planet + planetH/2 + row*(planetH + placeH + planetMarginY + rowMarginY);
      return { x: x, y: y }
   };

   function overlapOtherPlanet(x,y,id) {
      for(var iPla = 0; iPla < nbPlanets; iPla++) {
         if(iPla != id){
            var x2 = dragPlanetObj[iPla][1].attr("x");
            var y2 = dragPlanetObj[iPla][1].attr("y");
            if(Beav.Geometry.distance(x,y,x2,y2) < 2*dragPlanetR){
               return true;
            }
         }
      }
      return false;
   };

   function findEmptySpace(x,y,id) {
      var d = paperW;
      var newX = 0;
      var newY = 0;
      var xMin = dragLimits.xMin;
      var xMax = dragLimits.xMax;
      var yMin = dragLimits.yMin;
      var yMax = dragLimits.yMax;
      var r = dragPlanetR;
      for (var ix = xMin; ix < xMax; ix += r){
         for (var iy = yMin; iy < yMax; iy += r){
            if (!overlapOtherPlanet(ix,iy,id)){
               newD = Beav.Geometry.distance(x,y,ix,iy);
               if(newD < d){
                  d = newD;
                  newX = ix;
                  newY = iy;
               }
            }
         }
      }
      return { x: newX, y: newY }
   };

   function findIti() {
      var iti = [1];
      var stop = false;
      do{
         var currPla = iti[iti.length - 1];
         var next = seq[currPla - 1];
         if(next == currPla){
            stop = true;
         }
         if(Beav.Array.has(iti,next)){
            stop = true
         }
         iti.push(next);
         if(iti.length - 1 >= targetStep){
            stop = true;
         }
      }while(!stop)
      return iti
   };

   function updateTeleporters() {
      for(var row = 0; row < nbRows; row++){
         var w = placeW;
         var length = (row < nbRows - 1) ? maxPlanetPerRow : nbPlanets - row*maxPlanetPerRow;
         // console.log(row,length)
         var totW = length*w;
         var contID = containersID[row];
         for(var iPla = 0; iPla < length; iPla++){
            var plaID = iPla + row*maxPlanetPerRow;
            var id = seq[plaID];
            var element = drawTeleporter(0,0,id);
            dragAndDrop.removeObject(contID,iPla);
            dragAndDrop.insertObject(contID, iPla, {ident : id, elements : element } );
            var cont = dragAndDrop.getContainer(contID);
            cont.draggableElements[iPla].component.group.attr("cursor","grab");
         }
      }
   };

   function updateUndo() {
      undoButton.unclick();
      if(answer.hist.length > 0){
         undoButton.click(clickUndo);
         undoButton.attr("cursor","pointer");
         undoButton[0].attr("opacity",1);
      }else{
         undoButton.attr("cursor","auto");
         undoButton[0].attr("opacity",0.5);
      }
   };

   function updateSwapCounter() {
      var newVal = answer.hist.length;
      swapCounter.attr("text",taskStrings.nbSwap(newVal,maxSwap));
   };

   function resetBeaver() {
      subTask.simulationFactory.destroy("sim");
      if(beaverObj){
         beaverObj.remove();
      }
      initBeaver();
      if(stepCounter)
         stepCounter.hide();
   };

   function drawTeleporter(x,y,id) {
      var a = teleporterAttr;
      var w = placeW, h = placeH;
      var xRect = x - w/2;
      var yRect = y - h/2;
      var rect = paper.rect(xRect,yRect,w,h).attr(a.rect);
      var xPortal = xRect + (w - portalW)/2;
      var yPortal = yRect + 3;
      var portal = paper.image(portalSrc,xPortal,yPortal,portalW,portalH);
      var yText = yPortal + 22;
      var text = paper.text(x,yText,id).attr(a.text);
      var circles = paper.set();
      var r = 2;
      var circSpacing = 6;
      var x0Circ = x - circSpacing;
      var y0Circ = yPortal + portalH + 8;
      for(var iRow = 0; iRow < 2; iRow++){
         var yCirc = y0Circ + iRow*(circSpacing);
         for(var iCol = 0; iCol < 3; iCol++){
            var xCirc = x0Circ + iCol*circSpacing;
            circles.push(paper.circle(xCirc,yCirc,r).attr(a.circ));
         }
      }
      return paper.set(rect,portal,text,circles)
   };

   function drawPlanet(cx,cy,id) {
      var scale = planetScale[id];
      var imgID = (id < nbPlanets - 1) ? id%19 : 19;
      var w = planetW*scale, h = planetH*scale;
      var xPla = cx - w/2;
      var yPla = cy - h/2;
      var xImg = xPla - imgID*w;
      var yImg = yPla;

      var pla = paper.image(planetSrc,xImg,yImg,planetImgW*scale,h).attr("clip-rect",[xPla,yPla,w,h]);
      var text = paper.text(cx,cy,id + 1).attr(planetTextAttr);
      return paper.set(pla,text)
   };

   function setPlanetPos(cx,cy,id) {
      var scale = planetScale[id];
      var imgID = (id < nbPlanets - 1) ? id%19 : 19;
      var w = planetW*scale, h = planetH*scale;
      var xPla = cx - w/2;
      var yPla = cy - h/2;
      var xImg = xPla - imgID*w;
      var yImg = yPla;
      var obj = dragPlanetObj[id];
      obj[0].attr({
         x: xImg, y: yImg,
         "clip-rect": [xPla,yPla,w,h]
      });
      obj[1].attr({ x: cx, y: cy });
   };

   function drawButton(undo) {
      var x = (undo) ? xUndo : xTry;
      var y = yUndo;
      var w = buttonW, h = buttonH;
      var a = (undo) ? undoButtonAttr : tryButtonAttr;
      var rect = paper.rect(x,y,w,h).attr(a.rect);
      var xText = x + w/2 + 5;
      var yText = y + h/2;
      var str = (undo) ? taskStrings.undo : taskStrings.try;
      var text = paper.text(xText,yText,str).attr(a.text);
      var xIcon = x + 15;
      var yIcon = y + (h - iconSize)/2;
      var src = (undo) ? undoSrc : checkSrc;
      var icon = paper.image(src,xIcon,yIcon,iconSize,iconSize);
      return paper.set(rect,text,icon);
   }

   function replayHist() {
      var hist = answer.hist;
      for(var iHist = 0; iHist < hist.length; iHist++){
         var swap = hist[iHist];
         var id1 = swap[0];
         var id2 = swap[1];
         var seqPos1 = Beav.Array.indexOf(seq,id1);
         var seqPos2 = Beav.Array.indexOf(seq,id2);
         seq.splice(seqPos1,1,id2);
         seq.splice(seqPos2,1,id1);
      }
   };

   function getResult(iti) {
      var lastPlanet = iti[iti.length - 1];
      if(iti.length > 1 && lastPlanet == iti[iti.length - 2]){
         var msg = taskStrings.errorTeleporter;
         var score = 0;
      }else if(lastPlanet != nbPlanets){
         var msg = (lastPlanet == 1) ? taskStrings.errorLoop : taskStrings.errorDst;
         var score = 0;
      }else{
         var nbSwap = answer.hist.length;
         if(nbSwap > targetSwap){
            var msg = taskStrings.errorTooManySwaps+" "+taskStrings.clickRetry;
            var score = 0.5;
         }else{
            var msg = taskStrings.success;
            var score = 1;
         }
      }
      return { successRate: score, message: msg }
   };

   function checkResult(noVisual) {
      seq = Beav.Object.clone(data[level].seq);
      replayHist();
      var iti = findIti();
      return getResult(iti)
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

