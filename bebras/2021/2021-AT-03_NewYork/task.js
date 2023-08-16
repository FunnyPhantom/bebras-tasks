function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         gridSize: [6,6],
         startPos: [ [2,1,0] ],
         targets: [ [6,4] ],
         minSigns: 1,
         maxSigns: 1,
         dxCity: -200
      },
      easy: {
         gridSize: [10,10],
         startPos: [ [2,1,0] ],  // pos[2] must be 0 or 1
         targets: [ [6,10] ],
         minSigns: 2,
         maxSigns: 2,
         dxCity: 0
      },
      medium: {
         gridSize: [10,10],
         startPos: [ [4,1,0], [9,4,1] ],  // pos[2] must be 0 or 1
         targets: [ [2,10], [10,6] ],
         minSigns: 2,
         maxSigns: 2,
         dxCity: 0
      },
      hard: {
         gridSize: [12,12],
         startPos: [ [1,4,0], [1,8,0], [11,8,1] ],
         targets: [ [0,2], [10,12], [8,12] ],
         minSigns: 3,
         maxSigns: 3,
         dxCity: 0
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.basic,
         medium: data.medium,
         hard: data.hard
      };
   }

   var paper;
   var paperW = 770;
   var paperH;
   var marginX = 20;
   var marginY = 20;

   var targetW = 36;
   var targetH = 30;
   var taxiW = 45;
   var taxiH = 21;

   var nbRows;
   var nbCol;

   var blockW = 60;
   var blockH = blockW;
   var streetH = blockH, streetW = 30;
   var cityW;
   var cityH;
   var xCity;
   var yCity;
   var signR = 24;
   var arrR = signR*0.9;
   var arrowW = 2*signR - 12;
   var arrowH = arrowW*0.8;
   var xSrc = marginX + signR;
   if (typeof(enableRtl) != "undefined") {
      xSrc += 50;
   }

   var xButton = marginX;
   var yButton;
   var buttonW = 170;
   var buttonH = 30;
   // var iconW = 16;
   var iconR = 6;
   var crashR = 30;

   var nbTaxis;
   var targets, nbTargets;
   var startPos, taxiPos = [];
   var prevTaxiPos = [];
   var taxiObj = [];
   var taxiRaphIds = {};
   var minSigns;
   var animDuration = 500;
   var isMoving = [];
   var taxiLimit = {};
   var signType = 2;

   var dragAndDrop;
   var signIds = [];
   var playButton, undoButton;
   var crashObj;
   var targetHasTaxi;
   var sim, taxiSims = [];
   var overlay;
   var rng;

   var citySrc = $("#city").attr("src");
   var taxiSrc = $("#taxi").attr("src");
   var headSrc = $("#head").attr("src");

   var nbBlocks = 1;
   var streetSrc = $("#street").attr("src");
   var crossroadSrc = $("#crossroad").attr("src");
   // var undoSrc = $("#undo").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      lightGray: "#cccccc",
      grey: "#676060",
      black: "#4a4a4a",
      blue: "#4a90e2",
      green: "#9acc68"
   };

   var signColor = [colors.yellow,colors.green];

   var targetAttr = {
      stroke: "none",
      fill: colors.black
   };
   var signAttr = {
      circle: {
         stroke: "none"
      },
      letter: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         stroke: colors.black,
         "stroke-width": 0.5
      },
      arrow: {
         stroke: colors.black,
         "stroke-width": 2.8,
         "arrow-end": "block-wide-medium"
      }
   };
   var arrowAttr = {
      stroke: "none",
      fill: "white"
   };
   var signLabelsAttr = {
      "font-size": 16,
      "text-anchor": "start"
   };
   var signLabelAttr = {
      "font-size": 14,
      "font-weight": "bold",
      fill: colors.black,
      "text-anchor": "start"
   };
   var dropAttr = {
      stroke: "black",
      'stroke-width': 1,
      'stroke-dasharray': '--',
      fill: colors.lightGray
   };
   var buttonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: buttonH/2
      },
      icon: {
         stroke: "white",
         "stroke-width": 2,
         fill: "white",
         "stroke-linejoin": "round"
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: "white"
      }
   }
   var crashAttr = {
      out: {
         stroke: "none",
         fill: "red"
      },
      in: {
         stroke: "none",
         fill: "yellow"
      }
   };

   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed);
      nbRows = data[level].gridSize[0];
      nbCol = data[level].gridSize[1];
      cityW = (nbCol/2)*(blockW + streetW) - streetW;
      cityH = (nbRows/2)*(blockH + streetW) - streetW;
      xCity = paperW - cityW - targetW - marginX;
      xCity += data[level].dxCity;
      yCity = marginY + targetH;
      targets = JSON.parse(JSON.stringify(data[level].targets));
      startPos = JSON.parse(JSON.stringify(data[level].startPos));
      minSigns = JSON.parse(JSON.stringify(data[level].minSigns));
      maxSigns = JSON.parse(JSON.stringify(data[level].maxSigns));
      nbTargets = targets.length;
      nbTaxis = startPos.length;
      yButton = yCity + 2*signR + 10*marginY
      paperH = yCity + cityH + targetH + marginY;
      /*if(level == "old_medium"){
         paperH -= targetH;
      }*/
      targetHasTaxi = Beav.Array.make(nbTargets,false);
      isMoving = Beav.Array.make(nbTaxis,false);
      taxiLimit = {
         yMin: yCity - taxiW/2,
         yMax: yCity + cityH + taxiW/2,
         xMin: xCity - taxiW/2,
         xMax: xCity + cityW + taxiW/2
      }
      $("#minSigns").html(minSigns);
      randomizeData();
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
      initCity();
      initDragAndDrop();
      initButtons();
      initHandlers();
      // reloadAnswer();
      displayError("");

      // displayHelper.customValidate = checkResult;
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
         crossroadContent: {}
      };
      defaultAnswer.crossroadContent = {};
      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      subTask.simulationFactory.destroyAll();
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function randomizeData() {
      var horSym = rng.nextBit();
      var vertSym = rng.nextBit();
      var rot = rng.nextBit();
      // horSym = 1;
      // vertSym = 1;
      // rot = 1;
      if(horSym){
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            startPos[iTaxi][0] = nbRows - startPos[iTaxi][0];
            if(startPos[iTaxi][1]%2 == 0){
               startPos[iTaxi][2] = 1 - startPos[iTaxi][2];
            }
            targets[iTaxi][0] = nbRows - targets[iTaxi][0];
         }
      }
      if(vertSym){
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            startPos[iTaxi][1] = nbCol - startPos[iTaxi][1];
            if(startPos[iTaxi][0]%2 == 0){
               startPos[iTaxi][2] = 1 - startPos[iTaxi][2];
            }
            targets[iTaxi][1] = nbCol - targets[iTaxi][1];
         }
      }
      if(rot){
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            var tempStart = startPos[iTaxi].slice();
            var tempTarget = targets[iTaxi].slice();
            tempStart[1] = nbCol - startPos[iTaxi][0];
            tempStart[0] = startPos[iTaxi][1];
            if(tempStart[1] == nbCol - 1 || tempStart[0] == nbRows - 1){
               tempStart[2] = 1;
            }else if(tempStart[1] == 1 || tempStart[0] == 1){
               tempStart[2] = 0;
            }
            startPos[iTaxi] = tempStart.slice();
            
            tempTarget[1] = nbCol - targets[iTaxi][0];
            tempTarget[0] = targets[iTaxi][1];
            targets[iTaxi] = tempTarget.slice();
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      overlay = paper.rect(0,0,paperW,paperH).attr(overlayAttr);

      $("#zone_2 .overlay").remove();
      $("#zone_2").css({ position: "relative", "padding-top": "1px" });
      var y0 = 16;
      var x,y,w,h;
      for(var iOver = 1; iOver <= 8; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = y0;
               w = paperW;
               h = yCity;
               break;
            case 2:
               x = xCity + cityW;
               y = y0;
               w = paperW - x;
               h = paperH;
               break;
            case 3:
               x = 0; y = y0;
               w = xCity;
               h = yCity + 3*marginY;
               break;
            case 4:
               x = xSrc + signR;
               y = y0 + yCity + 3*marginY;
               w = xCity - x;
               h = yButton - y + y0;
               break;
            case 5:
               x = 0;
               y = y0 + yCity + 4*marginY + 4*signR;
               w = xSrc + signR;
               h = yButton - y + y0;
               break;
            case 6:
               x = xButton + buttonW;
               y = y0 + yCity + cityH;
               w = paperW - x; 
               h = paperH - y + y0;
               break;
            case 7:
               x = 0; 
               y = y0 + yButton + buttonH;
               w = xButton + buttonW;
               h = paperH - y + y0;
               break;
            case 8:
               x = xButton + buttonW;
               y = y0 + yButton;
               w = xCity - x;
               h = paperH - y + y0;
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
      
      x = xCity;
      for(var iRow = 0; iRow < nbRows/2; iRow++){
         var id = "overlay_"+(iRow + 9);
         y = y0 + yCity + iRow*(blockH + streetW);
         w = cityH;
         h = blockH;
         if(iRow > 0){
            y += 10;
         }
         if(iRow < nbRows/2 - 1){
            h -= (iRow > 0) ? 20 : 10;
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
            background: "green",
            opacity: 0
         });
      }

      y = y0 + yCity;
      for(var iCol = 0; iCol < nbCol/2; iCol++){
         var id = "overlay_"+(iCol + nbRows + 9);
         x = xCity + iCol*(blockW + streetW);
         w = blockW;
         h = cityH;
         if(iCol > 0){
            x += 10;
         }
         if(iCol < nbCol/2 - 1){
            w -= (iCol > 0) ? 20 : 10;
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
            background: "green",
            opacity: 0
         });
      }
   };

   function initCity() {
      var x0 = xCity;
      var y0 = yCity;
      for(var iRow = 0; iRow < nbRows; iRow++){
         var y = y0 + Math.floor(iRow/2)*(blockH + streetW);
         for(var iCol = 0; iCol < nbCol; iCol++){
            var x = x0 + Math.floor(iCol/2)*(blockW + streetW);
            if(iRow%2 == 1 && iCol%2 == 1){
               var blockID = rng.nextInt(1,nbBlocks);
               var blockSrc = $("#block"+blockID).attr("src");
               paper.image(blockSrc,x,y,blockW,blockH);
            }
            if(iCol < nbCol - 2){
               var xVerStreet = x + blockW;
               var yVerStreet = y;
               paper.image(streetSrc,xVerStreet,yVerStreet - 1,streetW,blockH + 2);
            }
            if(iRow < nbRows - 2){
               paper.image(streetSrc,x,y - 1,streetW,blockH + 2).transform(["R",90,x,y + blockH]);
            }
         }
      }
      for(var iTarget = 0; iTarget < nbTargets; iTarget++){
         var coord = getTargetCoordinates(iTarget);
         var headW = targetW;
         var headH = targetH;
         var icon = paper.image(headSrc,coord.x,coord.y,headW,headH);
         //  body of a person  paper.path("M21.021,16.349c-0.611-1.104-1.359-1.998-2.109-2.623c-0.875,0.641-1.941,1.031-3.103,1.031c-1.164,0-2.231-0.391-3.105-1.031c-0.75,0.625-1.498,1.519-2.111,2.623c-1.422,2.563-1.578,5.192-0.35,5.874c0.55,0.307,1.127,0.078,1.723-0.496c-0.105,0.582-0.166,1.213-0.166,1.873c0,2.932,1.139,5.307,2.543,5.307c0.846,0,1.265-0.865,1.466-2.189c0.201,1.324,0.62,2.189,1.463,2.189c1.406,0,2.545-2.375,2.545-5.307c0-0.66-0.061-1.291-0.168-1.873c0.598,0.574,1.174,0.803,1.725,0.496C22.602,21.541,22.443,18.912,21.021,16.349zM15.808,13.757c2.362,0,4.278-1.916,4.278-4.279s-1.916-4.279-4.278-4.279c-2.363,0-4.28,1.916-4.28,4.279S13.445,13.757,15.808,13.757z");
         // icon.transform(["S",1.5,1.5,"T",coord.x,coord.y])
         icon.attr(targetAttr);
      }
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         var pos = startPos[iTaxi];
         taxiPos[iTaxi] = pos.slice();
         prevTaxiPos[iTaxi] = pos.slice();
         placeTaxi(iTaxi);
      }
   };

   function initDragAndDrop() {
      dragAndDrop = new DragAndDropSystem({
         paper : paper,
         drop : function(srcContId, srcPos, dstContId, dstPos, type) {
            displayError("");
            if(dstContId != null){
               var elemID = this.getObjects(dstContId)[dstPos];
            }else{
               elemID = null;
            }
            if(Beav.Array.has(signIds,srcContId)){
               var srcCont = dragAndDrop.getContainer(srcContId);
               srcCont.draggableElements[0].component.group.attr("cursor","grab");
            }
            if(dstContId == null && Beav.Array.has(signIds,srcContId)){
               if (nbSignsAnswer() == maxSigns) {
                  displayError(taskStrings.limitReached(maxSigns));
               }
               return
            }
            if(answer.crossroadContent[srcContId]){
               delete answer.crossroadContent[srcContId];
            }
            if(dstContId != null){
               answer.crossroadContent[dstContId] = elemID;
               var cont = dragAndDrop.getContainer(dstContId);
               cont.draggableElements[0].component.group.attr("cursor","grab");
            }
         },
         actionIfDropped : function(srcCont, srcPos, dstCont, dstPos, dropType)
         {
            if ((dstCont != null) && (dstCont.substring(0,5) == "cross")) {
               // We place a brand new sign on an empty crossroad.
               if ((answer.crossroadContent[dstCont] == null) &&
                   (Beav.Array.has(signIds,srcCont))) {
                  if (nbSignsAnswer() == maxSigns) {
                     return false;
                  }
               }
               return true;
            }
            else if (dstCont == null){
               return true
            }
            return false;
         },
         ejected : function(refEl, previousCont, previousPos) {

         }
      });
      initDragSrc();
      initDrop();

      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         taxiObj[iTaxi].toFront();
      }
   };

   function initDragSrc() {
      var x = xSrc;
      var y0 = yCity + signR;
      var xLabel = x-signR;
      if (typeof(enableRtl) != "undefined") {
         xLabel += 100;
      }
      paper.text(xLabel,y0,taskStrings.labels).attr(signLabelsAttr);
      y0 += 3 * marginY;

      for(var iSrc = 0; iSrc < 2; iSrc++){
         var y = y0 + iSrc*(2*signR + marginY);
         var sign = drawSign(0,0,iSrc);
         var id = "sign_"+iSrc;
         signIds[iSrc] = id;
         dragAndDrop.addContainer({
            ident : id,
            cx : x, cy: y, widthPlace : 2*signR, heightPlace : 2*signR,
            type : 'source',
            sourceElemArray : sign,
            placeBackgroundArray : []
         });
         var xLabel = x + signR + marginX/2;
         if (typeof(enableRtl) != "undefined") {
            xLabel = x - signR - marginX/2;
         }
         paper.text(xLabel,y,taskStrings.turn(iSrc)).attr(signLabelAttr);
         var cont = dragAndDrop.getContainer(id);
         cont.placeHolder.element.attr("r",signR);
         cont.draggableElements[0].component.group.attr("cursor","grab");
      }
   };

   function initSignIds() {
      signIds = [];
      for(var iSrc = 0; iSrc < 2; iSrc++){
         var id = "sign_"+iSrc;
         signIds[iSrc] = id;
      }
   };

   function initDrop() {
      for(var iRow = 2; iRow < nbRows; iRow += 2){
         var y = yCity - streetW/2 + Math.floor(iRow/2) *(blockH + streetW);
         for(var iCol = 2; iCol < nbCol; iCol += 2){
            var x = xCity - streetW/2 + Math.floor(iCol/2)*(blockW + streetW);
            // var backgroundTarget = paper.image(crossroadSrc,-streetW/2,-streetW/2,streetW,streetW);
            var backgroundTarget = paper.circle(0,0,signR).attr(dropAttr);
            var id = 'crossroad_'+iRow+"_"+iCol;
            dragAndDrop.addContainer({
               ident : id,
               cx : x,
               cy : y,
               widthPlace : 3*signR,
               heightPlace : 3*signR,
               nbPlaces : 1,
               dropMode : 'replace',
               placeBackgroundArray : [ backgroundTarget ]
            });
            var cont = dragAndDrop.getContainer(id);
            cont.placeHolder.element.attr({width: 2*signR, height: 2*signR, "r":signR, x: -signR, y: -signR });
            if(answer.crossroadContent[id] != null){
               var signID = answer.crossroadContent[id];
               var signIndex = Beav.Array.indexOf(signIds,signID);
               var element = drawSign(0,0,signIndex);
               dragAndDrop.insertObject(id, 0, {ident : signID, elements : element });
               var cont = dragAndDrop.getContainer(id);
               cont.draggableElements[0].component.group.attr("cursor","grab");
            }
         }
      }
   };

   function initButtons() {
      var w = buttonW;
      var h = buttonH;
      var xc = xButton + w/2;
      var yc = yButton + h/2;

      playButton = drawButton(paper,xc,yc,w,h,{
         attr: buttonAttr,
         iconR: iconR,
         xIcon: xButton + 2*iconR + 10,
         yIcon: yc,
         shape: "triangle",
         iconAngle: 90,
         text: taskStrings.startTaxis(nbTaxis),
         xText: xc + 14,
         yText: yc
      });
   };

   function initHandlers() {
      enableplayButton(true);
      // updateUndo();
   };

   function enableplayButton(enable) {
      playButton.unclick();
      if(enable){
         playButton.click(drive(false));
         playButton.attr("cursor","pointer");
         playButton[2].show();
         playButton[1].attr({
            text: taskStrings.startTaxis(nbTaxis),
            x: xButton + buttonW/2 + 14
         });
      }else{
         playButton.attr("cursor","auto");
         playButton[2].hide();
         playButton[1].attr({
            text: taskStrings.cancel,
            x: xButton + buttonW/2
         });
      }
   };

   function enableClickOverlay(enable) {
      overlay.unclick();
      if(enable){
         overlay.click(clickOverlay);
         overlay.attr("cursor","pointer");
      }else{
         overlay.attr("cursor","auto");
      }
   };

   function simIsPlaying() {
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         if(taxiSims[iTaxi] && taxiSims[iTaxi].isPlaying()){
            return true
         }
      }
      return false
   };

   function clickOverlay() {
      if(simIsPlaying()){
         subTask.simulationFactory.destroyAll();
         for(var animID in subTask.raphaelFactory.animations) {
            subTask.raphaelFactory.stopAnimateID(animID);
         }
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            taxiSims[iTaxi] = null;
         }
      }
      displayError("");
      overlay.toBack();
      enableClickOverlay(false);
      taxiPos = Beav.Object.clone(startPos);
      prevPos = Beav.Object.clone(startPos);
      targetHasTaxi = [];
      updateTaxis();
      if(crashObj){
         crashObj.remove();
         crashObj = null;
      }

      enableplayButton(true);
   };

   function drive(noVisual) {
      return function(){
         // console.log("drive "+simIsPlaying())
         // subTask.simulationFactory.destroyAll();
         if(!noVisual){
            if(simIsPlaying()){
               return
            }
            overlay.toFront();
            enableClickOverlay(true);
         }

         var nextData = [];
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            var pos = taxiPos[iTaxi].slice();
            nextData[iTaxi] = findNextPos(pos);
         }
         var isCollision = findCollision(nextData);
         // console.log(isCollision)
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            if(Beav.Array.has(targetHasTaxi,iTaxi,eq)){
               continue;
            }
            if(!noVisual){
               taxiObj[iTaxi].toFront();
            }
            var newPos = null;
            if(isCollision){
               for(var iColl = 0; iColl < isCollision.length; iColl++){
                  var crashTaxis = isCollision[iColl].taxis;
                  if(Beav.Array.has(crashTaxis,iTaxi)){
                     var crashID = Beav.Array.indexOf(crashTaxis,iTaxi);
                     newPos = isCollision[iColl].crash[crashID];
                  }
               }
            }
            if(!newPos){
               newPos = nextData[iTaxi].nextPos;
            }
            var same = true;
            for(var iData = 0; iData < newPos.length; iData++){
               if(newPos[iData] != taxiPos[iTaxi][iData]){
                  same = false;
               }
            }
            if(same){
               console.log(same)
               continue
            }
            // console.log(newPos)
            if(noVisual){
               taxiPos[iTaxi] = newPos.slice();
            }else{
               enableplayButton(false);

               isMoving[iTaxi] = true;
               // sim = subTask.simulationFactory.create("sim_"+iTaxi);
               taxiSims[iTaxi] = subTask.simulationFactory.create("sim_"+iTaxi);
               if(taxiPos[iTaxi][0] == newPos[0] || taxiPos[iTaxi][1] == newPos[1]){   // no turn
                  var crash = false;
                  var duration = animDuration;
                  if(isTaxiOut(newPos)){
                     duration = animDuration*0.7;
                  }
                  if(isCollision){
                     for(var iColl = 0; iColl < isCollision.length; iColl++){
                        if(Beav.Array.has(isCollision[iColl].taxis,iTaxi)){
                           if(isCollision[iColl].type == 0){
                              duration = animDuration*0.5;
                           }
                           crash = true;
                        }
                     }

                  }
                  var simParams = {
                     id: iTaxi,
                     newPos: newPos.slice(),
                     finalStep: true,
                     isCollision: isCollision,
                     crash: crash
                  };

                  var simAction = { onExec: translateTaxi, duration: duration, params: simParams };
                  var simEntry = { name: "translate", action: simAction };
                  taxiSims[iTaxi].addStepWithEntry(simEntry);
               }else{
                  var currPos = taxiPos[iTaxi];
                  var dir1 = currPos[2];
                  var t1 = getTranslationFromPos(currPos);
                  var dir2 = newPos[2];
                  var t2 = getTranslationFromPos(newPos);
                  var dur = animDuration/3;
                  var simParams1 = {
                     id: iTaxi,
                     finalStep: false,
                     translation: [t1.x,t1.y]
                  };
                  var simAction1 = { onExec: translateTaxi, duration: dur, params: simParams1 };
                  var simEntry1 = { name: "translate_1", action: simAction1 };
                  taxiSims[iTaxi].addStepWithEntry(simEntry1);

                  var coord1 = getTaxiCoordinates(currPos);
                  var coord2 = getTaxiCoordinates(newPos);
                  var x1 = coord1.x + t1.x;
                  var y1 = coord1.y + t1.y;
                  var x2 = coord2.x - t2.x;
                  var y2 = coord2.y - t2.y;
                  var angle;
                  var cross = nextData[iTaxi].crossroadID;
                  var sign = answer.crossroadContent[cross];
                  if(Beav.Array.indexOf(signIds,sign) == 0){
                     angle = 90;
                  }else{
                     angle = -90;
                  }
                  if(currPos[0]%2 == 0){
                     var xRot = x1;
                     var yRot = y2;
                  }else{
                     var xRot = x2;
                     var yRot = y1;
                  }
                  var simParams2 = {
                     id: iTaxi,
                     angle: angle,
                     x: xRot, y: yRot
                  };
                  var simAction2 = { onExec: rotateTaxi, duration: dur, params: simParams2 };
                  var simEntry2 = { name: "rotate", action: simAction2 };
                  taxiSims[iTaxi].addStepWithEntry(simEntry2);

                  var simParams3 = {
                     id: iTaxi,
                     finalStep: true,
                     translation: [t2.x,t2.y],
                     newPos: newPos,
                     isCollision: isCollision,
                     crash: crash
                  };
                  var simAction3 = { onExec: translateTaxi, duration: dur, params: simParams3 };
                  var simEntry3 = { name: "translate_2", action: simAction3 };
                  taxiSims[iTaxi].addStepWithEntry(simEntry3);
               }

               taxiSims[iTaxi].setAutoPlay(true);
               taxiSims[iTaxi].play();
            }
         }
         // console.log(pos,newPos);
         if(noVisual){
            var res = onDriveEnd(isCollision,noVisual);
            // console.log(level,res)
            return res
            // return onDriveEnd(isCollision,noVisual);
         }
      }
   };

   function nbSignsAnswer() {
      var nbSigns = 0;
      for(var id in answer.crossroadContent){
         if(answer.crossroadContent[id]){
            nbSigns++;
         }
      }
      return nbSigns;
   }

   function onDriveEnd(isCollision,noVisual) {
      // console.log("onDriveEnd "+isCollision)
      if(!noVisual){
         // answer.hist.push({ type: "drive" });
         // updateUndo();
         updateTaxis();
      }
      if(isCollision){
         var error = taskStrings.errorCrash;
         if(!noVisual){
            displayError(error);
            showCrash(isCollision);
            // enableplayButton(false);
            // overlay.toBack();
            // enableClickOverlay(true);
         }
         return { collision: isCollision, successRate: 0, message: error}
      }
      updateTarget(noVisual);
      if(isOut()){
         var error = taskStrings.errorOut;
         if(!noVisual){
            displayError(taskStrings.errorOut);
            // enableplayButton(false);
            // overlay.toBack();
            // enableClickOverlay(true);
         }
         // console.log(level,error)
         return { successRate: 0, message: error}
      }
      if(!noVisual && everyTargetHasTaxi()){
         platform.validate("done");
      }else if(!everyTargetHasTaxi()){
         return drive(noVisual)();
      }
      var nbSigns = nbSignsAnswer();
         if(nbSigns > minSigns){
            return { successRate: 0.5, message: taskStrings.errorNbSigns };
         }
         return { successRate: 1, message: taskStrings.success };

   };

   function translateTaxi(params,duration,callback) {
      var id = params.id;
      var newPos = params.newPos;
      if(params.translation){
         // console.log(params.translation)
         var tx = params.translation[0];
         var ty = params.translation[1];
      }else{
         var currPos = taxiPos[id];
         var tx = (newPos[1] - currPos[1])*(blockW + streetW)/2;
         var ty = (newPos[0] - currPos[0])*(blockH + streetW)/2;
         var currCoord = getTaxiCoordinates(currPos);

         if(currCoord.x + tx > taxiLimit.xMax){
            tx = taxiLimit.xMax - currCoord.x;
         }else if(currCoord.x + tx < taxiLimit.xMin){
            tx = taxiLimit.xMin - currCoord.x;
         }
         if(currCoord.y + ty > taxiLimit.yMax){
            ty = taxiLimit.yMax - currCoord.y;
         }else if(currCoord.y + ty < taxiLimit.yMin){
            ty = taxiLimit.yMin - currCoord.y;
         }

      }
      var anim = new Raphael.animation({ transform: ["...","T",tx,ty] },duration,callback);
      subTask.raphaelFactory.animate("moveTaxi_"+id,taxiObj[id],anim);
      return {
         stop: function() {
            if(params.finalStep){
               prevTaxiPos[id] = Beav.Object.clone(taxiPos[id]);
               taxiPos[id] = newPos.slice();
               isMoving[id] = false;
            }
            if(params.crash && currCoord){
               // console.log("drawCrash ")
               var currCrash = drawCrash(currCoord.x + tx,currCoord.y + ty);
               if(!crashObj){
                  crashObj = paper.set(currCrash);
               }else{
                  crashObj.push(currCrash)
               }
            }
            if(params.finalStep && !isTaxiMoving()){
               subTask.simulationFactory.destroyAll();
               onDriveEnd(params.isCollision,false);
            }
         }
      }
   };

   function rotateTaxi(params,duration,callback) {
      var id = params.id;
      var angle = params.angle;
      var x = params.x;
      var y = params.y;
      var anim = new Raphael.animation({ transform: ["...","R",angle,x,y] },duration,callback);
      subTask.raphaelFactory.animate("rotateTaxi_"+id,taxiObj[id],anim);
   };

   function isTaxiMoving() {
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         if(isMoving[iTaxi]){
            return true;
         }
      }
      return false
   };

   function findNextPos(pos) {
      var dir = pos[2];
      var row = pos[0];
      var col = pos[1];
      var nextCrossroadPos = {};
      var nextPos = [];
      if(row == 0 || row == nbRows || col == 0 || col == nbCol){
         return { nextPos: [ row, col, dir] }
      }
      if(row%2 == 0){
         nextCrossroadPos.row = row;
         nextCrossroadPos.col = (dir == 0) ? col + 1 : col - 1;
      }else if(col%2 == 0){
         nextCrossroadPos.col = col;
         nextCrossroadPos.row = (dir == 0) ? row + 1 : row - 1;
      }
      var crossroadID = "crossroad_"+nextCrossroadPos.row+"_"+nextCrossroadPos.col;
      if(answer.crossroadContent.hasOwnProperty(crossroadID)){
         // var sign = dragAndDrop.getObjects(crossroadID)[0];
         var sign = answer.crossroadContent[crossroadID];
      }else{
         var sign = null;
      }

      if(row%2 == 0){
         if(sign == null){
            nextPos[0] = row;
            nextPos[1] = (dir == 0) ? col + 2 : col - 2;
            nextPos[2] = dir;
         }else if(Beav.Array.indexOf(signIds,sign) == 0){
            nextPos[0] = (dir == 0) ? row + 1 : row - 1;
            nextPos[1] = (dir == 0) ? col + 1 : col - 1;
            nextPos[2] = dir;
         }else{
            nextPos[0] = (dir == 0) ? row - 1 : row + 1;
            nextPos[1] = (dir == 0) ? col + 1 : col - 1;
            nextPos[2] = 1 - dir;
         }
      }else if(col%2 == 0){
         if(sign == null){
            nextPos[0] = (dir == 0) ? row + 2 : row - 2;
            nextPos[1] = col;
            nextPos[2] = dir;
         }else if(Beav.Array.indexOf(signIds,sign) == 0){
            nextPos[0] = (dir == 0) ? row + 1 : row - 1;
            nextPos[1] = (dir == 0) ? col - 1 : col + 1;
            nextPos[2] = 1 - dir;
         }else{
            nextPos[0] = (dir == 0) ? row + 1 : row - 1;
            nextPos[1] = (dir == 0) ? col + 1 : col - 1;
            nextPos[2] = dir;
         }
      }
      nextPos[0] = Math.min(nbRows,Math.max(0,nextPos[0]));
      nextPos[1] = Math.min(nbCol,Math.max(0,nextPos[1]));
      return { nextPos: nextPos, crossroadID: crossroadID }
   };

   function findCollision(nextData) {
      var coll = [];
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++) {
         for(var jTaxi = 0; jTaxi < nbTaxis; jTaxi++){
            if(iTaxi != jTaxi){
               if(nextData[iTaxi].crossroadID && nextData[iTaxi].crossroadID == nextData[jTaxi].crossroadID){
                  var taxis = [iTaxi,jTaxi];
                  var crashPos = [];
                  for(var kTaxi = 0; kTaxi < taxis.length; kTaxi++){
                     var taxiID = taxis[kTaxi]
                     crashPos[kTaxi] = taxiPos[taxiID].slice();
                     var dir = crashPos[kTaxi][2];
                     var axis = (crashPos[kTaxi][0]%2 == 0) ? 1 : 0;
                     var increment = (dir == 0) ? 1 : -1;
                     crashPos[kTaxi][axis] += increment;
                  }
                  // return { taxis, crash: crashPos, type: 0 }
                  coll.push({ taxis: taxis, crash: crashPos, type: 0 });
               }else{
                  var nextPos1 = nextData[iTaxi].nextPos;
                  var nextPos2 = nextData[jTaxi].nextPos;
                  var same = true;
                  for(var iData = 0; iData < nextPos1.length - 1; iData++){
                     if(nextPos1[iData] != nextPos2[iData]){
                        same = false;
                        break;
                     }
                  }
                  if(same){
                     // return { taxis: [iTaxi,jTaxi], crash: [nextPos1,nextPos2], type: 1 }
                     coll.push({ taxis: [iTaxi,jTaxi], crash: [nextPos1,nextPos2], type: 1 })
                  }
               }
            }
         }
      }
      if(coll.length > 0){
         return coll
      }
      return false
   };

   function updateTaxis() {
      // console.log("updateTaxis")
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         placeTaxi(iTaxi);
      }
   };

   function updateTarget(noVisual) {
      for(var iTarget = 0; iTarget < nbTargets; iTarget++){
         var pos = targets[iTarget];
         var row = pos[0];
         var col = pos[1];
         var found = false;
         for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
            var tPos = taxiPos[iTaxi];
            var same = true;
            for(var iData = 0; iData < tPos.length - 1; iData++){
               if(tPos[iData] != pos[iData]){
                  same = false;
                  break;
               }
            }
            if(same){
               targetHasTaxi[iTarget] = iTaxi;
               found = true;
               break;
            }
         }
         if(!found){
            targetHasTaxi[iTarget] = false;
         }

      }
   };

   function isOut() {
      for(var iTaxi = 0; iTaxi < nbTaxis; iTaxi++){
         if(Beav.Array.has(targetHasTaxi,iTaxi,eq)){
            continue;
         }
         var tPos = taxiPos[iTaxi];
         if(isTaxiOut(tPos)){
            return true
         }
      }
      return false
   };

   function isTaxiOut(tPos) {
      // var tPos = taxiPos[id];
      var dir = tPos[2];
      var col = tPos[1];
      var row = tPos[0];
      if(col == 0 || col == nbCol || row == 0 || row == nbRows){
         return true
      }
      return false
   };

   function everyTargetHasTaxi() {
      for(var iTarget = 0; iTarget < nbTargets; iTarget++){
         if(targetHasTaxi[iTarget] === false){
            return false
         }
      }
      return true
   };

   function getTargetCoordinates(id) {
      var targetPos = targets[id];
      var y = yCity - streetW + (targetPos[0]/2)*(blockH + streetW);
      var x = xCity - streetW + (targetPos[1]/2)*(blockW + streetW);
      if(targetPos[0] == nbRows){
         y += marginY/2;
         x -= 4;
      }else if(targetPos[0] == 0){
         y -= marginY/2;
         x -= 4;
      }
      if(targetPos[1] == nbCol){
         x += marginY/2;
         // x -= 4;
      }else if(targetPos[1] == 0){
         // y -= 2;
         x -= marginX;
      }
      return {x:x,y:y}
   };

   function getTaxiCoordinates(pos) {
      var x = xCity - streetW/2 + (pos[1]/2)*(blockW + streetW);
      var y = yCity - streetW/2 + (pos[0]/2)*(blockH + streetW);
      return {x:x,y:y}
   };

   function getTranslationFromPos(pos) {  // for turns
      if(pos[1]%2 == 0){
         var tx = 0;
         var ty = (pos[2] == 0) ? blockH/2 : -blockH/2;
      }else{
         var ty = 0;
         var tx = (pos[2] == 0) ? blockW/2 : -blockW/2;
      }
      return {x:tx,y:ty}
   };

   function placeTaxi(id) {
      var pos = taxiPos[id];
      var dir = pos[2];
      var coord = getTaxiCoordinates(pos);
      var x = coord.x;
      var y = coord.y;
      y = Math.min(taxiLimit.yMax,Math.max(taxiLimit.yMin,y));
      x = Math.min(taxiLimit.xMax,Math.max(taxiLimit.xMin,x));

      var xTaxi = x - taxiW/2;
      var yTaxi = y - taxiH/2;

      if(!taxiObj[id]){
         taxiObj[id] = paper.image(taxiSrc,xTaxi,yTaxi,taxiW,taxiH);
         var raphID = taxiObj[id].id;
         taxiRaphIds[raphID] = id;
      }else{
         taxiObj[id].attr({x:xTaxi,y:yTaxi});
      }
      // paper.circle(x,y,20)
      var angle = getTaxiAngle(pos,prevTaxiPos[id]);
      taxiObj[id].transform(["R",angle,x,y]).toFront();
   };

   function getTaxiAngle(pos,prevPos) {
      var angle;
      if(pos[0]%2 == 0 && pos[1]%2 == 1){
         angle = (pos[2] == 0) ? 0 : 180;
      }else if(pos[1]%2 == 0 && pos[0]%2 == 1){
         angle = (pos[2] == 0) ? 90 : -90;
      }else if(prevPos[0]%2 == 0){
         angle = (prevPos[2] == 0) ? 0 : 180;
      }else{
         angle = (prevPos[2] == 0) ? 90 : -90;
      }

      return angle
   };

   function drawSign(x,y,id) {
      var attr = signAttr;
      var color = signColor[id];
      var r = signR;
      var circle = paper.circle(x,y,r).attr(attr.circle);
      circle.attr("fill",color);
      // DEPRECATED var letter = paper.text(x,y,(id == 0) ? taskStrings.right : taskStrings.left).attr(attr.letter);
      var sweep = (id == 0) ? 1 : 0;
      switch(signType){
         case 0:
            if(id == 0){
               var x1 = x + 5;
               var x2 = x - 5;
            }else{
               var x1 = x - 5;
               var x2 = x + 5;
            }
            var y1 = y - arrR + 1;
            var y2 = y1;
            var arrow = paper.path(["M",x1,y1,"A",arrR,arrR,0,1,sweep,x2,y2]).attr(attr.arrow);
            break;
         case 1:
            var tempX1 = (id == 0) ? x : x - 1;
            var tempX2 = (id == 0) ? x - 1 : x;
            var tempY1 = y - arrR;
            var tempY2 = (id == 0) ? tempY1 + 0.05 : tempY1 - 0.05;
            var tempArr = paper.path(["M",tempX1,tempY1,"A",arrR,arrR,0,1,sweep,tempX2,tempY2]).attr(attr.arrow);
            var totalL = tempArr.getTotalLength();
            var nbArr = 4;
            var arrMargin = 5;
            var arrL = totalL/nbArr - arrMargin;
            var arrow = paper.set();
            for(var iArr = 0; iArr < nbArr; iArr++){
               var length = iArr*totalL/nbArr;
               var pos1 = tempArr.getPointAtLength(length);
               if(iArr < nbArr - 1){
                  var pos2 = tempArr.getPointAtLength(length + arrL);
               }else{
                  var pos2 = tempArr.getPointAtLength(length + arrL + 3);
               }
               var smallArr = paper.path(["M",pos1.x,pos1.y,"A",arrR,arrR,0,0,sweep,pos2.x,pos2.y])/*.transform("R180")*/.attr(attr.arrow);
               arrow.push(smallArr);
            }
            tempArr.remove();
            break;
         case 2:
            var xL = x - arrR;
            var xR = x + arrR;
            var yT = y - arrR;
            var yB = y + arrR;
            var arrMargin = 3;
            var xStart = [ x, xR, x, xL ];
            var xEnd = (id == 1) ? [ xR - arrMargin, x + arrMargin, xL + arrMargin, x - arrMargin ] : [ xL + arrMargin, x + arrMargin, xR - arrMargin, x - arrMargin ];
            var yStart = [ yT, y, yB, y ];
            var yEnd = (id == 1) ? [ y - arrMargin, yB - arrMargin, y + arrMargin, yT + arrMargin ] : [ y - arrMargin, yT + arrMargin, y + arrMargin, yB - arrMargin ];
            var arrow = paper.set();
            var nbArr = 4;
            for(var iArr = 0; iArr < nbArr; iArr++) {
               var smallArr = paper.path(["M",xStart[iArr],yStart[iArr],"A",arrR,arrR,0,0,sweep,xEnd[iArr],yEnd[iArr]]).attr(attr.arrow);
               arrow.push(smallArr);
            }
      }
      return paper.set(circle,arrow);
      // DEPRECATED return paper.set(circle,letter,arrow);
   };

   function showCrash(crashData) {
      // console.log("showCrash")
      if(crashObj){
         crashObj.remove();
         crashObj = null;
      }
      crashObj = paper.set();
      for(var iColl = 0; iColl < crashData.length; iColl++){
         var taxiID = crashData[iColl].taxis[0];
         var x = taxiObj[taxiID].attr("x") + taxiW/2;
         var y = taxiObj[taxiID].attr("y") + taxiH/2;

         crashObj.push(drawCrash(x,y));
      }
   };

   function drawCrash(x,y) {
      var set = paper.set();
      for(var iStar = 0; iStar < 4; iStar++){
         var xStar = (iStar < 2) ? x + (iStar%2)*2 : x + (iStar%2)*1;
         var yStar = (iStar < 2) ? y + (iStar%2)*3 : y + (iStar%2)*2;
         var r = (iStar < 2) ? crashR : crashR - 15;
         var attr = (iStar < 2) ? crashAttr.out : crashAttr.in;
         var star = getShape(paper,"star",xStar,yStar,{ radius: r });
         var angle = (iStar%2)*30;
         star.transform(["R",angle]);
         star.attr(attr);
         set.push(star);
      }
      return set
   };

   function eq(v1,v2) {
      if(v1 === v2){
         return true
      }
      return false
   };

   function checkResult(noVisual) {
      initSignIds();
      taxiPos = JSON.parse(JSON.stringify(startPos));
      var res = drive(noVisual)();
      // console.log(res)
      if(res) {
         return res
      }

      return { successRate: 0, message: "error: unknown" };
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

