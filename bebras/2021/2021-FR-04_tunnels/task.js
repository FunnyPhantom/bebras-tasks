   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         tunnelLength: 2,
         entrance: [0, 0], // 0: left, 1: right, 2: both, 3: any cell
         minSteps: 2,
         maxSteps: 3
      },
      easy: {
         tunnelLength: 2,
         entrance: [0,0, 0], // 0: left, 1: right, 2: both, 3: any cell
         minSteps: 3,
         maxSteps: 4
      },
      medium: {
         tunnelLength: 6,
         entrance: [0,0,0],
         minSteps: 4,
         maxSteps: 6
      },
      hard: {
         tunnelLength: 6,
         entrance: [0,0,3],
         minSteps: 10,
         maxSteps: 14
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.easy,
         medium: data.medium,
         hard: data.hard
      };
   }

   var paper;
   var paperW = 770;
   var paperH;

   var marginX = 20;
   var marginY = 20;

   var progressBarW = paperW - 100;
   var progressBarH = 10;
   var xProgressBar = (paperW - progressBarW)/2;
   var xCounter = xProgressBar + progressBarW;
   if (typeof(enableRtl) != "undefined") {
      xCounter -= 150;
   }
   var yCounter = 20;
   var yProgressBar = yCounter + 30;
   var xReplay = xProgressBar;
   var yReplay = yCounter;
   var replayIconR = 10;

   var imgID = [ "footprint", "inside", "inside_end", "lid_closed", "lid_open", "wall", "wall_start"];
   var imgDim = [ [61,68], [263,303], [263,303], [263,181], [160,244], [133,227], [263,227] ];
   var scale = 0.4; 
   var wallW = imgDim[5][0]*scale;
   var boxStepW = wallW - 1;
   var boxStepH = 76*scale;
   var boxW = imgDim[1][0]*scale;
   var boxH = imgDim[1][1]*scale;
   var boxWithOpenLidH = 467*scale;
   var boxWithClosedLidH = 330*scale;
   var tunnelGapX = 300*scale;
   var tunnelGapY = 200*scale;
   var tunnelW, tunnelH; 
   var lidThickness = 30*scale;

   // var arrowW = 40;
   // var arrowH = 30;
   var xTunnel;
   var yTunnel;
   var beavW = 80;
   var beavH = 76;
   var buttonW = 350;
   var buttonH = 30;
   var yButton, xButton;

   var nbTunnels, tunnelLength;
   var entrance;
   var maxSteps, minSteps;
   var cells = [];
   var cellState = [];
   var possibleBeavPos = [];
   var beavObj;
   var counterObj;
   var button;
   var progressBarObj;
   var replayObj;

   var openingDuration = 600;
   var moveDuration = 500;
   var blinkDuration = 500;
   var simDelay = 200;
   var initialDelay = 1000;
   var animIsPlaying = false;
   var rng;
   var sim;
   var lastPos;
   var blinkState;

   // var undoSrc = $("#undo").attr("src");
   var beaverSrc = $("#beaver").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
      darkGrey: "#666666",
      brown: "#9e745b",
      darkBrown: "#4e382a",
      green: "#9acc68"
   };
   var arrowAttr = {
      stroke: colors.black,
      fill: "none"
   };
   var counterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black,
      "text-anchor": "end"
   };
   var replayAttr = {
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.blue,
         "text-anchor": "start"
      },
      icon: {
         stroke: colors.blue,
         "stroke-width": 4,
         fill: colors.blue,
         "stroke-linejoin": "round"
      }
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
   var boxGroundAttr = {
      stroke: "none",
      fill: colors.darkBrown
   };
   var boxWallAttr = {
      stroke: "none",
      fill: colors.brown
   };
   var progressBarAttr = {
      background: {
         stroke: "none",
         fill: colors.lightGrey,
         r: progressBarH/2
      },
      bar: {
         stroke: "none",
         fill: colors.green,
         r: progressBarH/2
      },
      frame: {
         stroke: colors.black,
         "stroke-width": 1,
         fill: "none",
         r: progressBarH/2,
         opacity: 0.5
      },
      line: {
          stroke: colors.black,
         "stroke-width": 1,
         opacity: 0.5
      }
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      entrance = data[level].entrance;
      tunnelLength = data[level].tunnelLength;
      maxSteps = data[level].maxSteps;
      minSteps = data[level].minSteps;
      nbTunnels = entrance.length;
      tunnelW = tunnelLength*wallW + boxW - wallW;
      tunnelH = tunnelLength*boxStepH + boxWithClosedLidH - boxStepH;
      xTunnel = (paperW - tunnelW)/2 - (nbTunnels - 1)*tunnelGapX/2;
      yTunnel = yProgressBar + progressBarH + marginY + tunnelH - boxH;
      xButton = paperW - buttonW - marginX;
      yButton = yTunnel + boxH + (nbTunnels - 1)*tunnelGapY;
      paperH = yTunnel + boxH + (nbTunnels - 1)*tunnelGapY + 2*marginY;
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         cellState[iTunnel] = Beav.Array.make(tunnelLength,false);
      }
      $("#minSteps").html(minSteps);
      initTunnels();
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
      initTunnels();
      replayHistory(true, 0);
   };

   subTask.resetDisplay = function() {
      initPaper();
      initReplay();
      updateCounter();
      initTunnelsDisplay();
      initButton();
      initHandlers();
      // replayHistory(false, 0);
      displayError("");
      if(answer.hist.length > 0){
         if(answer.found){
            var lastPos = answer.hist[answer.hist.length - 1];
            var tunnel = lastPos.tunnel;
            var col = lastPos.col;
            placeBeaver(tunnel,col);
            openBox(tunnel,col,true);
            enableClicks(false);
            displayError(taskStrings.success);
         }else if(answer.hist.length >= maxSteps){
            enableClicks(false);
            displayError(taskStrings.notFound);
         }
      }

      displayHelper.customValidate = checkResult;
      // displayHelper.hideValidateButton = true;
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
         seed: rng.nextInt(0,1000),
         hist: [],
         found: false
      };

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      subTask.delayFactory.destroyAll();
      subTask.simulationFactory.destroyAll();
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initReplay() {
      var x = xReplay;
      var y = yReplay;
      var r = replayIconR;
      var attr = replayAttr;
      var xTr = x + r + 2;
      var tr = getShape(paper,"triangle",xTr,y,{ radius: r });
      tr.attr(attr.icon).transform(["R",90]);
      var xText = xTr + r + marginX;
      var text = paper.text(xText,y,taskStrings.replay).attr(attr.text);
      replayObj = paper.set(tr,text).hide();
   };

   function initTunnelsDisplay() {
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         cells[iTunnel] = [];
         for(var iCell = tunnelLength - 1; iCell >= 0; iCell--){
            var x = xTunnel + iTunnel*tunnelGapX + iCell*boxStepW;
            var y = yTunnel + iTunnel*tunnelGapY - iCell*boxStepH;
            var footprints = false;
            if(iCell == 0 && entrance[iTunnel] != 1){
               footprints = true;
            }else if(iCell == tunnelLength - 1 && entrance[iTunnel] != 0){
               footprints = true;
            }else if(entrance[iTunnel] == 3){
               footprints = true;
            }
            cells[iTunnel][iCell] = drawBox(x,y,footprints,iCell);
         }
      }
   }

   function initTunnels() {
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         cells[iTunnel] = [];
         for(var iCell = tunnelLength - 1; iCell >= 0; iCell--){
            if(iCell == 0 && entrance[iTunnel] != 1){
               possibleBeavPos.push({ tunnel: iTunnel, col: iCell });
            }else if(iCell == tunnelLength - 1 && entrance[iTunnel] != 0){
               possibleBeavPos.push({ tunnel: iTunnel, col: iCell });
            }else if(entrance[iTunnel] == 3){
               possibleBeavPos.push({ tunnel: iTunnel, col: iCell });
            }
         }
      }
   };

   function initButton() {
      var x = xButton;
      var y = yButton;
      var w = buttonW;
      var h = buttonH;
      var attr = buttonAttr;
      var rect = paper.rect(x,y,w,h,h/2).attr(attr.rect);
      var xText = x + w/2;
      var yText = y + h/2;
      var text = paper.text(xText,yText,taskStrings.watchBeaver).attr(attr.text);
      button = paper.set(rect,text); // DEPRECATED .hide();
   };

   function initBeavPos() {
      possibleBeavPos = [];
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         if(entrance[iTunnel] == 0){
            var possibleCol = [0];
         }else if(entrance[iTunnel] == 1){
            var possibleCol = [tunnelLength - 1];
         }else{
            var possibleCol = [];
            for(var iCol = 0; iCol < tunnelLength; iCol++){
               possibleCol = iCol;
            }
            // Beav.Array.init(tunnelLength,( x => x));
         }
         for(var iCol = 0; iCol < possibleCol.length; iCol++){
            var col = possibleCol[iCol];
            possibleBeavPos.push({ tunnel: iTunnel, col: col });
         }
      }
   };

   function initHandlers() {
      enableClicks(true);
      button.click(function() {
         displayError("");
         watchBeaver();
      });
      button.attr("cursor","pointer");
   };

   function enableClick(tun,col,enable) {
      cells[tun][col][5].toFront();
      if(enable){
         cells[tun][col][5].click(onClick(tun,col,false,false));
         cells[tun][col][5].attr("cursor","pointer");
      }else{
         cells[tun][col][5].unclick();
         cells[tun][col][5].attr("cursor","auto");
      }
   };

   function enableClicks(enable) {
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         for(var iCol = 0; iCol < tunnelLength; iCol++){
            enableClick(iTunnel,iCol,enable);
         }
      }
   };

   function onClick(tunnel,col,replay,noVisual) {
      return function() {
         if((answer.hist.length >= maxSteps && !replay) || animIsPlaying){
            return
         }
         if(!replay){
            answer.hist.push({ tunnel: tunnel, col: col });
            if(!noVisual){
               updateCounter();
            }
         }
         displayError("");
         if(!noVisual){
            if(!replay){
               showCell(tunnel,col,replay);
            }else{
               if(isSuccess(tunnel,col)){
                  // console.log("isSuccess")
                  placeBeaver(tunnel,col);
                  openBox(tunnel,col,true);

                  enableClicks(false);
               }else if(answer.hist.length >= maxSteps){
                  displayError(taskStrings.notFound);
                  watchBeaver();
               }
               endShowCell(tunnel,col,true,false);
            }
         }else{
            endShowCell(tunnel,col,replay,true);
         }
      }
   };

   function endShowCell(tunnel,col,replay,noVisual) {
      updateCellState(tunnel,col);
      updateBeavPos(tunnel,col,replay,noVisual);
   };

   function showCell(tunnel,col) {
      var success = false;
      if(isSuccess(tunnel,col)){
         placeBeaver(tunnel,col);
         success = true;
         enableClicks(false);
      }else{
         displayError(taskStrings.noBeaver);
      }
      animIsPlaying = true;
      openBox(tunnel,col,true);
      subTask.delayFactory.create("delay_showCell",function() {
         animIsPlaying = false;
         if(!success){
            openBox(tunnel,col,false);
         }
         subTask.delayFactory.destroy("delay_showCell");
         if(answer.hist.length >= maxSteps){
            displayError(taskStrings.notFound);
            subTask.delayFactory.create("initial_delay",function() {
               watchBeaver();
            },initialDelay);
         }else{
            displayError("");
         }
         endShowCell(tunnel,col,false,false);
      },openingDuration);
   };

   function openBox(tun,col,open) {
      if(open){
         cells[tun][col][2].hide();
         cells[tun][col][3].show();
         if(cells[tun][col][6]){
            cells[tun][col][6].hide();
         }
      }else{
         cells[tun][col][2].show();
         cells[tun][col][3].hide();
         if(cells[tun][col][6]){
            cells[tun][col][6].show();
         }
      }
   };

   function isSuccess(tun,col) {
      if(possibleBeavPos.length == 1 && possibleBeavPos[0].tunnel == tun && possibleBeavPos[0].col == col){
         return true
      }
      return false
   };

   function watchBeaver() {
      if(sim && sim.isPlaying()){
         return
      }
      subTask.delayFactory.destroyAll();
      // displayError("");
      var nbPossible = possibleBeavPos.length;
      if(answer.hist.length == 0){
         displayError(taskStrings.click);
         return
      }
      var lastID = rng.nextInt(0,nbPossible - 1);
      if(!lastPos){
         lastPos = possibleBeavPos[lastID];
      }
      // console.log(lastPos)
      var tun = lastPos.tunnel;
      var lastCol = lastPos.col;
      var firstCol;
      if(entrance[tun] == 0){
         firstCol = [0];
      }else if(entrance[tun] == 1){
         firstCol = [tunnelLength - 1];
      }else if(entrance[tun] == 2){
         firstCol = [0,tunnelLength - 1];
      }else{
         var firstCol = [];
         for(var iCol = 0; iCol < tunnelLength; iCol++){
            firstCol.push(iCol);
         }
         // firstCol = Beav.Array.init(tunnelLength,( x => x));
      }
      var seq = findBeavSeq(firstCol,[lastCol],tun);
      // console.log(seq,answer.hist)
      if(!seq || seq.length != answer.hist.length + 1){
         console.error("impossible find beav seq");
         // console.log(lastPos,nbPossible,lastID)
         return
      }
      runSim(seq,tun);
      // console.log(lastPos,nbPossible,lastID)
   };

   function runSim(seq,tun) {
      // console.log(seq)
      var col = seq[0];
      placeBeaver(tun,col);
      replayObj.show();
      updateCounter(0);
      blinkState = true;
      subTask.delayFactory.create("blink_delay",function() {
         blinkState = !blinkState;
         updateBlink();
      },blinkDuration,true);
      for(var iTunnel = 0; iTunnel < nbTunnels; iTunnel++){
         for(var iCell = 0; iCell < tunnelLength; iCell++){
            var cellObj = cells[iTunnel][iCell];
            cellObj[3].hide();
            cellObj[2].attr("opacity",0.5).show();
            if(cellObj[6]){
               cellObj[6].attr("opacity",0.5);
            }
         }
      }
      for(var iTunnel = tun; iTunnel < nbTunnels; iTunnel++){
         for(var iCell = tunnelLength - 1; iCell >= 0; iCell--){
            var cellObj = cells[iTunnel][iCell];
            for(var iElem = 1; iElem < cellObj.length; iElem++){
               if(iElem != 4){
                  cellObj[iElem].toFront();
               }
            }
            
         }
      }
      beavObj = cells[tun][col][4].transform("");
      subTask.delayFactory.create("sim_delay",function() {
         // subTask.delayFactory.destroy("delay_showCell");
         sim = subTask.simulationFactory.create("sim");
         for(var iHist = 0; iHist < answer.hist.length; iHist++){
            var clickPos = answer.hist[iHist];
            var end = (iHist == answer.hist.length - 1);
            // var useTimeout = (iHist == 0) ? moveDuration : 0;
            var simAction1 = { onExec: simShowCell, duration: openingDuration, 
               params: { clickPos: clickPos, end: end, step: iHist + 1 } };
            var simEntry1 = { name: "showClick_"+iHist, action: simAction1 };
            sim.addStepWithEntry(simEntry1);
            if(iHist < answer.hist.length - 1){
               var nextCol = seq[iHist + 1];
               var tx = (nextCol - col)*boxStepW;
               var ty = -(nextCol - col)*boxStepH;
               var simAction2 = { onExec: moveBeaver, duration: moveDuration, 
                  params: {tx: tx,ty: ty,step: iHist} };
               var simEntry2 = { name: "moveBeav_"+iHist, action: simAction2 };
               sim.addStepWithEntry(simEntry2);
            }
         }
         sim.setAutoPlay(true);
         sim.play();
      },moveDuration);

   };

   function simShowCell(params,duration,callback) {
      var pos = params.clickPos;
      openBox(pos.tunnel,pos.col,true);
      updateCounter(params.step);
      subTask.delayFactory.create("delay_showCell",function() {
         openBox(pos.tunnel,pos.col,false);
         subTask.delayFactory.create("sim_delay",callback,simDelay);
      },duration);
      return {
         stop: function() {
            if(params.end){
               displayError(taskStrings.clickRetry);
               subTask.simulationFactory.destroyAll();
               subTask.delayFactory.destroyAll();
               replayObj.hide();
               blinkState = false;
            }
         }
      }
   };

   function moveBeaver(params,duration,callback) {
      var anim = new Raphael.animation({ transform: ["T",params.tx,params.ty] },duration,function() {
         subTask.delayFactory.create("sim_delay",callback,simDelay);
      });
      subTask.raphaelFactory.animate("moveBeaver "+params.step,beavObj,anim);
   };

   function findBeavSeq(firstCol,currSeq,tun) {
      // console.log(firstCol,currSeq,tun)
      for(var dir = 0; dir < 2; dir++){
         // console.log(dir)
         var seq = currSeq.slice();
         var currCol = currSeq[0];
         var prevCol = (dir == 0) ? currCol - 1 : currCol + 1;
         // console.log(dir,prevCol)
         if(prevCol >= 0 && prevCol <= tunnelLength - 1){
            var currClick = answer.hist[answer.hist.length - seq.length];
            if(currClick && currClick.tunnel == tun && currClick.col == prevCol){
               continue
            }
            seq.unshift(prevCol);
            // console.log(seq,answer.hist)
            if(seq.length <= answer.hist.length){
               var nextSeq = findBeavSeq(firstCol,seq,tun);
               if(nextSeq){
                  return nextSeq
               }
            }else if(Beav.Array.has(firstCol,prevCol)){
               return seq
            }
         }
      }
      return false
   };

   function updateCounter(step) {
      if(step == undefined){
         var count = answer.hist.length;
      }else{
         var count = step;
      }
      var w = progressBarW;
      var x = xProgressBar;
      var y = yProgressBar;
      var h = progressBarH;
      var clickW = w/maxSteps;
      if(!counterObj){
         counterObj = paper.text(xCounter,yCounter,taskStrings.nbClicks(count,maxSteps)).attr(counterAttr);
         var attr = progressBarAttr;
         var background = paper.rect(x,y,w,h).attr(attr.background);
         var bar = paper.rect(x,y,w,h).attr(attr.bar);
         var frame = paper.rect(x,y,w,h).attr(attr.frame);
         var nbLines = maxSteps - 1;
         for(var iLine = 0; iLine < nbLines; iLine++){
            var xLine = x + clickW*(iLine + 1);
            var y1 = y;
            var y2 = y + h;
            paper.path(["M",xLine,y1,"V",y2]).attr(attr.line);
         }
         bar.attr("clip-rect",[x,y,count*clickW,h]);
         progressBarObj = bar;
      }else{
         counterObj.attr("text",taskStrings.nbClicks(count,maxSteps))
         progressBarObj.attr("clip-rect",[x,y,count*clickW,h]);
      }
   };

   function updateCellState(tunnel,col) {
      cellState[tunnel][col] = true;
   };

   function updateBeavPos(tunnel,col,replay,noVisual) {
      // console.log("updateBeavPos ",tunnel,col)
      if(possibleBeavPos.length == 1 && possibleBeavPos[0].tunnel == tunnel && possibleBeavPos[0].col == col){
         if(!noVisual){
            if(!replay){
               answer.found = true;
               platform.validate("done");
            }
         }
         return
      }

      var newPos = [];
      for(var iPos = 0; iPos < possibleBeavPos.length; iPos++){
         var currPos = possibleBeavPos[iPos];
         if(currPos.tunnel == tunnel && currPos.col == col){
            continue
         }
         for(var dir = 0; dir < 2; dir++){
            var tun = currPos.tunnel;
            var newCol = (dir == 0) ? currPos.col - 1 : currPos.col + 1;
            if(newCol >= 0 && newCol <= tunnelLength - 1){
               var already = false;
               for(var jPos = 0; jPos < newPos.length; jPos++){
                  if(newPos[jPos].tunnel == tun && newPos[jPos].col == newCol){
                     already = true;
                     break;
                  }
               }
               if(!already){
                  newPos.push({ tunnel: tun, col: newCol });
               }
            }
         }
      }
      possibleBeavPos = Beav.Object.clone(newPos);
      // console.log(possibleBeavPos)
   };

   function updateBlink() {
      if(blinkState){
         replayObj.show();
      }else{
         replayObj.hide();
      }
   };

   function replayHistory(noVisual, skippedTurns) {
      for(var iHist = 0; iHist < answer.hist.length - skippedTurns; iHist++){
         var tun = answer.hist[iHist].tunnel;
         var col = answer.hist[iHist].col;
         onClick(tun,col,true,noVisual)();
      }
   };

   function placeBeaver(tunnel,col) {
      cells[tunnel][col][4].show();
   };

   function drawBox(x,y,footprints,cellID) {
      var w = boxW;
      var h = boxH;
      var insideID = (cellID < tunnelLength - 1) ? 1 : 2;
      var inSrc = $("#"+imgID[insideID]).attr("src");
      var inside = paper.image(inSrc,x,y,w,h);

      var xBeav = x + (w - beavW)/2 + 13;
      var yBeav = y + (h - beavH)/2 - 8;
      var beav = paper.image(beaverSrc,xBeav,yBeav,beavW,beavH).hide();

      var wallID = (cellID == 0) ? 6 : 5;
      var wW = imgDim[wallID][0]*scale;
      var wH = imgDim[wallID][1]*scale;
      var xWall = x + boxW - wW;
      var yWall = y + boxH - wH;
      var wSrc = $("#"+imgID[wallID]).attr("src");
      var wall = paper.image(wSrc,xWall,yWall,wW,wH);

      var yClosed = y - lidThickness;
      var closedW = imgDim[3][0]*scale;
      var closedH = imgDim[3][1]*scale;
      var closedSrc = $("#"+imgID[3]).attr("src");
      var closedLid = paper.image(closedSrc,x,yClosed,closedW,closedH);

      var openW = imgDim[4][0]*scale;
      var openH = imgDim[4][1]*scale;
      var yOpen = y + boxStepH - openH + 1;
      var xOpen = x - lidThickness + 1;
      var openSrc = $("#"+imgID[4]).attr("src");
      var openLid = paper.image(openSrc,xOpen,yOpen,openW,openH).hide();

      var prints = null;
      if(footprints){
         closedLid.attr("src",$("#dark_lid_closed").attr("src"));
         openLid.attr("src",$("#dark_lid_open").attr("src"));
         // var printW = imgDim[0][0]*scale;
         // var printH = imgDim[0][0]*scale;
         // var xPrint1 = x + boxW/2 - printW - 5;
         // var yPrint1 = yClosed + 20;
         // // var xPrint2 = x + boxW - printW - 15;
         // // var yPrint2 = yWall + 20;
         // var printSrc = $("#"+imgID[0]).attr("src");
         // // var print1 = paper.image(printSrc,xPrint1,yPrint1,printW,printH).attr("transform",["S",-1,1]);
         // var print1 = paper.image(printSrc,xPrint1,yPrint1,printW,printH);
         // // var print2 = paper.image(printSrc,xPrint2,yPrint2,printW,printH);
         // // prints = paper.set(print1,print2);
         // prints = print1;
      }

      var x1 = x, x2 = x + 132*scale, x3 = x + w, x4 = x + 131*scale;
      var y1 = yClosed + 76*scale, y2 = yClosed, y3 = yClosed + 76*scale,y4 = yClosed + closedH - lidThickness;
      var ov = paper.path(["M",x1,y1,"L",x2,y2,"L",x3,y3,"L",x4,y4,"Z"]).attr(overlayAttr);
      // return paper.set(inside,wall,closedLid,openLid,beav,ov,prints)
      return paper.set(inside,wall,closedLid,openLid,beav,ov,prints)
   };

   function checkResult(noVisual) {
      initBeavPos();
      // console.log(possibleBeavPos)
      replayHistory(noVisual, 1);
      var lastClick = answer.hist[answer.hist.length - 1];
      if(!lastClick){
         var error = taskStrings.click;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      // console.log(possibleBeavPos)

      if((level == "hard" && !answer.found) ||
         (level != "hard" && (possibleBeavPos.length > 1 || lastClick.tunnel != possibleBeavPos[0].tunnel || lastClick.col != possibleBeavPos[0].col))){
         var error = taskStrings.errorNotFound;
         if(!noVisual){
            displayError(error);
            // button.show();
         }
         return { successRate: 0, message: error }
      }
      if(answer.hist.length > minSteps){
         var error = taskStrings.errorSteps;
         if(!noVisual){
            displayError(error);
            // button.show();
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

