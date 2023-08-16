function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         tubeContent: [[2,1],[],[]],
         target: [1,2],
         maxFlip: 2
      },
      easy: {
         tubeContent: [[2,1,4,3],[],[]],
         target: [1,2,3,4],
         maxFlip: 2 // TODO: prevent users from doing more than 2 flips in this version
      },
      medium: {
         tubeContent: [[6,4,5,2,3,1],[],[]],
         target: [1,2,3,4,5,6],
         maxFlip: 4
      },
      hard: {
         tubeContent: [[8,7,6,5,4,3,2,1],[],[]],
         target: [1,2,3,4,5,6,7,8],
         maxFlip: 6
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
   var marginX = 5;
   var marginY = 5;
   var maginTarget = 20;
   var marginYButtons = 20;
   var tubeW = 539;
   var tubeH = 443;
   var targetTubeH = 97;
   var ballR = 17;
   var innerBallR = 10;
   var xTube = (paperW - tubeW)/2;
   var yTube = 3*marginY;
   var yTarget = yTube + tubeH + maginTarget;
   var paperH = yTarget + targetTubeH + 4*marginY;
   var xc = xTube + 252;
   var yc = yTube + 250 - 39;
   var doorH = 14;
   var doorW = 66;
   var buttonW = 150;
   var buttonH = 30;
   var xButton = marginX;
   var yFlipButton = yTube + tubeH/2;
   var yUndo = yFlipButton + buttonH + marginYButtons;
   var iconW = 15;
   var arrowButtonR = 30;
   var arrowW = 30;
   var arrowH = 25;
   var arrowPos = [
      [ { x: 271, y: 260 }, { x: 465, y: 260 } ],
      [ { x: 500, y: 260 - 43 }, { x: 300, y: 260 - 43 } ]
   ];
   var stopLength = [308,264,264];
   var inflectionLength = [];
   var xm = paperW/2;
   var ym = yTube + tubeH/2;
   var xMaxFlip = xButton + buttonW/2;
   var yMaxFlip = yFlipButton - 1.5*marginYButtons;

   var nbTubes = 3;
   var tubePath = [];
   var ballRaph = [];
   var ballPos = [];
   var tubeContent, target;
   var doorPos = [];
   var doorRaph = [];
   var doorAnimTr = [];
   var tubeRaph;
   var flipButton, undoButton;
   var arrows = [];
   var flipped = false;
   var maxFlip, maxFlipObj;
   var nbFlips = 0;
   var nbBalls;
   var ballIsMoving = [];

   var sim;
   var doorSim, flipSim, ballSim = [];
   var flipDuration = 500;
   var moveBallDuration = 800;
   var fallDelay = moveBallDuration/20;
   var openingDuration = 50;


   var tubeSrc = $("#tube").attr("src");
   var targetSrc = $("#target").attr("src");
   var targetSrc = $("#target").attr("src");
   var door1Src = $("#door1").attr("src");
   var flipSrc = $("#flip").attr("src");
   var undoSrc = $("#undo").attr("src");


   var colors = {
      yellow: "#f5a623",
      blue: "#4a90e2",
      black: "#4a4a4a",
      darkBlue: "#285a8c",
      red: "#fa004c",
      purple: "#f900eb",
      deepBlue: "#2e5ee9",
      lightGreen: "#0bfb9c",
      orange: "#fea307",
      cyan: "#07f1ec"
   };
   var ballColors = [ "red", "purple", "deepBlue", "lightGreen", "orange", "cyan" ];

   var pathAttr = {
      stroke: "red",
      "stroke-width": 3,
      opacity: 0
   };
   var numberAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };

   var buttonAttr = {
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
   var ballAttr = {
      stroke: "none",
      r: ballR
   };
   var innerCircleAttr = {
      stroke: "none",
      fill: "white",
      r: innerBallR
   };
   var arrowAttr = {
      stroke: "none",
      fill: "white"
   };
   var arrowCircleAttr = {
      stroke: "none",
         // fill: colors.blue,
      fill: colors.yellow
   };
   var targetTitleAttr = {
      fill: colors.black,
      "font-size": 20,
      "font-weight": "bold",
      "text-anchor": "start"
   };
   var targetTextAttr = {
      fill: colors.black,
      "font-size": 16,
      "text-anchor": "start"
   };
   var counterAttr = {
      fill: colors.black,
      "font-size": 24,
      "font-weight": "bold"
   };
   var nbFlipAttr = {
      fill: colors.black,
      "font-size": 16,
      "font-weight": "bold"
   };
   var warningAttr = {
      fill: "red",
      "font-size": 24,
      "font-weight": "bold"
   };

   subTask.loadLevel = function (curLevel) {
      level = curLevel;
      target = data[level].target.slice();
      maxFlip = data[level].maxFlip;
      $("#maxFlip").html(maxFlip);
   };

   subTask.getStateObject = function () {
      return state;
   };

   subTask.reloadAnswerObject = function (answerObj) {
      answer = answerObj;
      if(!answer) {
         return;
      }
      // rng.reset(answer.seed);
   };

   subTask.resetDisplay = function () {
      displayError("");
      reloadAnswer(true);
      initPaper();
      initTube();
      initTarget();
      initButtons();
      initHandlers();
      updateCounter();

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
         $(".largeScreen #zone_1").css("float", "right");
         $(".largeScreen #zone_2").css("float", "right");
      }
   };

   subTask.getAnswerObject = function () {
      return answer;
   };

   subTask.getDefaultAnswerObject = function () {
      var defaultAnswer = {
         // seed: rng.nextInt(0,1000),
         hist: []
      };
      return defaultAnswer;
   };

   function getResultAndMessage() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function (callback) {
      if(sim){
         subTask.raphaelFactory.destroyAll();
         subTask.simulationFactory.destroyAll();
      }
      callback();
   };

   subTask.getGrade = function (callback) {
      callback(getResultAndMessage());
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper","paper",paperW,paperH);
   };

   function initTube() {
      var w = tubeW;
      var h = tubeH;
      var x0 = xTube;
      var y0 = yTube;

      tubeRaph = paper.image(tubeSrc,x0,y0,w,h);

      initTubePath();
      initArrows();
      if(flipped){
         updateTubeOrientation();
      }
      updateBalls();
      nbBalls = ballRaph.length;
   };

   function initTubePath() {
      for(var iPath = 0; iPath < 2; iPath++){
         if(iPath == 0){
            tubePath[iPath] = paper.path("m 151,51  216,217  0,88 c 0,24 12,33 35,37 l 225,40");
         }else{
            tubePath[iPath] = paper.path("m 583,51 -216,217 0,88 c 0,24 12,33 35,37 l 225,40");
         }
         tubePath[iPath].attr(pathAttr);
         var xDoor = 305 + iPath*58;
         var yDoor = 261;
         doorRaph[iPath] = paper.image(door1Src,xDoor,yDoor,doorW,doorH);
         var angle = (iPath == 0) ? -45 : 225;
         doorRaph[iPath].transform(["R",angle]);

         inflectionLength[iPath] = 200;
      }
   };

   function initTarget() {
      var w = tubeW;
      var h = targetTubeH;
      var x0 = xTube;
      var y0 = yTarget + 2*marginY;

      paper.rect(0,yTarget,paperW,h + 4*marginY).attr({stroke: "none",fill:"lightgray",r:5});
      paper.image(targetSrc,x0,y0,w,h);

      var x1 = 250 + xTube;
      var y1 = 25 + y0;
      var x2 = 515 + xTube;
      var y2 = 72 + y0;
      var targetPath = paper.path(["M",x1,y1,"L",x2,y2]).attr(pathAttr);

      for(var iBall = 0; iBall < target.length; iBall++){
         var ballID = target[iBall];
         var length = targetPath.getTotalLength() - (target.length - 1 - iBall)*2*ballR;
         var pos = targetPath.getPointAtLength(length);
         drawBall(ballID,pos.x,pos.y);
      }

      var xTitle = 30;
      var yTitle = y0 + 30;
      if (typeof(enableRtl) != "undefined") {
         xTitle += 200;
      }
      paper.text(xTitle,yTitle,taskStrings.yourTarget).attr(targetTitleAttr);
      var xText = xTitle;
      var yText = yTitle + 30;
      paper.text(xText,yText,taskStrings.sortBalls).attr(targetTextAttr);
   };

   function initButtons() {
      var w = buttonW;
      var h = buttonH;
      var x = xButton + w/2;
      var attr = buttonAttr;
      for(var iButton = 0; iButton < 2; iButton++){
         var y = (iButton == 0) ? yFlipButton + h/2 : yUndo + h/2;
         var src = (iButton == 0) ? flipSrc : undoSrc;
         var str = (iButton == 0) ? taskStrings.flip : taskStrings.undo;
         var xIcon = xButton + 3*marginX;
         var yIcon = y - iconW/2;
         var button = drawButton(paper,x,y,w,h,{
            text: str.toUpperCase(),
            xText: x + 5, yText: y,
            imgSrc: src, 
            xIcon: xIcon, yIcon: yIcon, iconW: iconW, iconH: iconW,
            attr: buttonAttr
         });
         if(iButton == 0){
            flipButton = button;
         }else{
            undoButton = button;
         }
      }
   };

   function initArrows() {
      for(var iPath = 0; iPath < 2; iPath++){
         var pos = arrowPos[0][iPath];
         arrows[iPath] = drawArrow(pos.x,pos.y);
         var angle = (iPath == 0) ? 45 : 135;
         arrows[iPath].transform(["r",angle]);
      }
   };

   function initHandlers() {
      for(var iSide = 0; iSide < 2; iSide++){
         enableClickArrow(iSide,true);
      }
      enableFlip(true);
      updateUndo();
   };

   function enableClickArrow(id,enable) {
      if(enable){
         arrows[id].click(openDoor(id));
         arrows[id].attr("cursor","pointer");
         arrows[id][0].attr("opacity",1);
      }else{
         arrows[id].unclick();
         arrows[id].attr("cursor","auto");
         arrows[id][0].attr("opacity",0.5);
      }
   };

   function enableFlip(enable) {
      if(enable){
         flipButton.click(flip);
         flipButton.attr("cursor","pointer");
         flipButton[0].attr("opacity",1);
      }else{
         flipButton.unclick();
         flipButton.attr("cursor","auto");
         flipButton[0].attr("opacity",0.5);
      }
   };

   function enableUndo(enable) {
      if(!enable){
         undoButton.unclick();
         undoButton[0].attr("opacity",0.5);
         undoButton.attr("cursor","auto");
      }else{
         undoButton[0].attr("opacity",1);
         undoButton.click(undo);
         undoButton.attr("cursor","pointer");
      }
   };

   function flip() {
      if(isSimPlaying()){
         return
      }
      nbFlips = 0;
      for(var iMove = 0; iMove < answer.hist.length; iMove++){
         if(answer.hist[iMove] == 2){
            nbFlips++;
         }
      }
      if(nbFlips >= maxFlip){
         displayError(taskStrings.tooManyFlips(maxFlip));
         return
      }
      displayError("");
      answer.hist.push(2);
      flipped = !flipped;
      flipAnim();
      updateCounter();
   };

   function flipAnim() {
      enableFlip(false);
      enableUndo(false);
      flipSim = subTask.simulationFactory.create("sim_flip");

      var flipStep = new SimulationStep();
      var flipAction = { onExec: rotateTube, duration: flipDuration, params: { } };
      var flipEntry = { name: "rotation", action: flipAction };
      flipStep.addEntry(flipEntry);
      flipSim.addStep(flipStep);

      flipSim.setAutoPlay(true);
      flipSim.play();
   };

   function rotateTube(params,duration,callback) {
      var angle = (flipped) ? 180 : 0;
      var set = paper.set(tubeRaph);
      var doorSet = paper.set();
      for(var iDoor = 0; iDoor < 2; iDoor++){
         if(flipped){
            var trans = ["...","R",angle,xm,ym];
         }else{
            var doorAngle = (iDoor == 0) ? -45 : 225;
            var trans = ["R",doorAngle];
         }
         var doorAnim = new Raphael.animation({transform: trans},duration);
         subTask.raphaelFactory.animate("rotateDoor_"+iDoor,doorRaph[iDoor],doorAnim);
      }
      for(var iPath = 0; iPath < 2; iPath++){
         set.push(tubePath[iPath]);
      }
      var anim = new Raphael.animation({transform: ["r",angle,xm,ym]},duration,callback);
      subTask.raphaelFactory.animate("rotateTube",set,anim);
      for(var iBall = 0; iBall < ballRaph.length; iBall++){
         var ballAngle = (flipped) ? -180 : 360;
         var animBall = new Raphael.animation({transform: ["r",angle,xm,ym,"r",ballAngle]},duration);
         subTask.raphaelFactory.animate("rotateBall"+iBall,ballRaph[iBall],animBall);
      }
      for(var iArr = 0; iArr < 2; iArr++){
        arrows[iArr].hide();
      }
      flipButton.unclick();

      return {
         stop: function() {
            subTask.simulationFactory.destroy("sim_flip");

            moveBalls();
         }
      }
   };

   function moveBalls(side,firstBall) {
      if(firstBall != undefined){
         for(var iArr = 0; iArr < 2; iArr++){
            enableClickArrow(iArr,false);
         }
         enableFlip(false);
         enableUndo(false);
      }
      var doorOpen = !isNaN(side);
      for(var iBall = 0; iBall < nbBalls; iBall++){
         var ballID = iBall + 1;
         var loc = findBallLocation(ballID);
         var tube = loc.tube;
         var ballIndex = loc.ballIndex;
         var seq = tubeContent[tube];
         // console.log(side, firstBall)
         if(!doorOpen || ballID != firstBall){
            var fallOrder = (flipped) ? ballIndex : (seq.length - 1 - ballIndex);
         }else{
            var fallOrder = 0;
         }
         if(!doorOpen || tube != 0){
            var pathID = (tube < 2) ? 0 : 1;
         }else{
            var pathID = side;
         }
         if(doorOpen && ballID != firstBall){
            if(flipped && tube > 0 || !flipped && (tube == 0 || tube != side + 1)){
               continue // no sim for balls not moving
            }
         }
         var path = tubePath[pathID];

         var lastMove = answer.hist.pop();
         reloadAnswer(true);
         var startLength = findBallPos(ballID);

         answer.hist.push(lastMove);
         reloadAnswer(true);

         var newLength = findBallPos(ballID);
         // console.log(ballIndex,ballID,startLength,newLength)
         var startPos = path.getPointAtLength(startLength);
         var newPos = path.getPointAtLength(newLength);
         var raphObj = ballRaph[ballID - 1];

         raphObj.transform("");
         startPos = rotatePos(startPos);
         placeBall(ballID,startPos.x,startPos.y);

         sim = subTask.simulationFactory.create("sim_move_"+ballID);
         ballSim[iBall] = sim;

         // var nbSteps = 50;
         // var stepLength = (newLength - startLength)/nbSteps;
         var stepLengthAbs = 20;
         var stepLength = (newLength > startLength) ? stepLengthAbs : -stepLengthAbs;
         var nbSteps = Math.ceil((newLength - startLength)/stepLength);
         var dur = moveBallDuration*Math.abs(newLength - startLength)/path.getTotalLength();
         // console.log(ballID,nbSteps)
         if(ballIndex == 0){
            // console.log("flip")
         }
         for(var iStep = 0; iStep < nbSteps; iStep++){
            var flipStep = new SimulationStep();
            var currLength = startLength + iStep*stepLength;
            var nextLength = currLength + stepLength;
            if(newLength > startLength){
               nextLength = Math.min(newLength,nextLength);
            }else{
               nextLength = Math.max(newLength,nextLength);
            }

            var currPos = path.getPointAtLength(currLength);
            currPos = rotatePos(currPos);
            var nextPos = path.getPointAtLength(nextLength);
            nextPos = rotatePos(nextPos);
            // var stepDur = (1 - iStep/nbSteps)*dur/nbSteps;
            var stepDur = dur/nbSteps;
            var flipAction = {
               onExec: moveBall,
               duration: stepDur,
               params: {
                  tube: tube,
                  ballIndex: ballIndex,
                  nextPos: nextPos, 
                  currPos: currPos, 
                  iStep: iStep,
                  finalStep: (iStep == nbSteps - 1)
               }
            };

            var delay = (iStep == 0) ? fallOrder*fallDelay : 0;
            //    if(doorOpen && ballID != firstBall && iStep == 0){
            //       delay += 200;
            //    }
            var flipEntry = { name: "moveBall_"+ballID+"_"+iStep, action: flipAction, delay: delay };
            flipStep.addEntry(flipEntry);
            sim.addStep(flipStep);
         }

         sim.setAutoPlay(true);
         sim.play();
      }
   };

   function findBallLocation(ballID) {
      for(var iTube = 0; iTube < nbTubes; iTube++){
         seq = tubeContent[iTube];
         if(Beav.Array.has(seq,ballID)){
            tube = iTube;
            ballIndex = Beav.Array.indexOf(seq,ballID);
            break;
         }
      }
      return { tube: tube, ballIndex: ballIndex }
   };

   function moveBall(params,duration,callback) {
      var tube = params.tube;
      var ballIndex = params.ballIndex;
      var nextPos = params.nextPos;
      var currPos = params.currPos;
      var iStep = params.iStep;
      var seq = tubeContent[tube];
      var ballID = seq[ballIndex];
      var raphObj = ballRaph[ballID - 1];

      raphObj.transform("");
      // placeBall(ballID,currPos.x,currPos.y);

      ballIsMoving[ballID] = true;

      var anim = new Raphael.animation({ x: nextPos.x, y: nextPos.y, cx: nextPos.x, cy: nextPos.y },duration,callback);
      subTask.raphaelFactory.animate("moveBall_"+tube+"_"+ballIndex+"_"+iStep,raphObj,anim);
      return {
         stop: function() {
            if(params.finalStep){
               subTask.simulationFactory.destroy("sim_move_"+ballID);
               ballIsMoving[ballID] = false;
               var stopAnim = !isBallMoving();
               if(stopAnim){
                  // console.log("stopAnim")
                  for(var iArr = 0; iArr < 2; iArr++){
                     arrows[iArr].show();
                     enableClickArrow(iArr,true);
                  }
                  enableFlip(true);
                  enableUndo(true);
                  updateTubeOrientation();
                  updateBalls();
                  updateUndo();
                  flipButton.click(flip);
               }
            }
         }
      }
   };

   function rotatePos(pos) {
      if(flipped){
         pos.x = 2*xm - pos.x;
         pos.y = 2*ym - pos.y;
      }
      return pos
   };

   function isBallMoving() {
      for(var iBall = 0; iBall < ballIsMoving.length; iBall++){
         if(ballIsMoving[iBall]){
            return true;
         }
      }
      return false
   };

   function openDoor(side,noVisual) {
      return function() {
         if(isSimPlaying() && !noVisual){
            return
         }
         displayError("");
         var change = false;
         if(!flipped){
            var src = tubeContent[ 1 + side ];
            if(src.length > 0){
               var dst = tubeContent[0];
               var ball = src.pop();
               dst.unshift(ball);
               change = true;
            }
         }else{
            var src = tubeContent[0];
            if(src.length > 0){
               var dst = tubeContent[ 1 + side ];
               var ball = src.shift();
               dst.push(ball);
               change = true;
            }
         }
         if(!noVisual){
            if(change){
               answer.hist.push(side);
               updateUndo();
            }
            openDoorSim(side);
            moveBalls(side,ball);
         }
      }
   };

   function openDoorSim(side) {
      doorSim = subTask.simulationFactory.create("sim_open_door");

      var step = new SimulationStep();
      var action1 = { onExec: openAnim, duration: openingDuration, params: { side: side, open: true } };
      var entry1 = { name: "opening", action: action1 };
      step.addEntry(entry1);
      var action2 = { onExec: openAnim, duration: openingDuration, params: { side: side, open: false } };
      var entry2 = { name: "closing", action: action2, delay: 200 };
      step.addEntryAllParents(entry2);

      doorSim.addStep(step);

      doorSim.setAutoPlay(true);
      doorSim.play();
      for(var iArr = 0; iArr < 2; iArr++){
         // arrows[iArr].hide();
      }
   };

   function openAnim(params,duration,callback) {
      var side = params.side;
      var open = params.open;
      if(flipped){
         var tx = (side) ? -30 : 30;
         var ty = -30;
      }else{
         var tx = (side) ? 30 : -30;
         var ty = 30;
      }
      if(!open){
         tx = 0, ty = 0;
      }
      var doorAngle = (side == 0) ? -45 : 225;
      var trArray = ["R",doorAngle];
      if(flipped){
         trArray.push("R",180,xm,ym);
      }
      trArray.push("T",tx,ty);
      var anim = new Raphael.animation({ transform: trArray },duration,"<",callback);
      subTask.raphaelFactory.animate("openDoor"+side,doorRaph[side],anim);
      return {
         stop: function() {
            if(!open){
               subTask.simulationFactory.destroy("sim_open_door");
               var doorAngle = (side == 0) ? -45 : 225;
               var trans = ["R",doorAngle];
               if(flipped){
                  trans.push("R",180,xm,ym);
               }
               doorRaph[side].attr("transform",trans);
               for(var iArr = 0; iArr < 2; iArr++){
                  arrows[iArr].show();
               }
            }
         }
      }
   };

   function undo() {
      displayError("");
      if(answer.hist.length < 1 || isSimPlaying()){
         return
      }
      answer.hist.pop();
      reloadAnswer();
      updateUndo();
      updateCounter();
   };

   function reloadAnswer(noVisual) {
      tubeContent = JSON.parse(JSON.stringify(data[level].tubeContent));
      flipped = false;
      for(var iMove = 0; iMove < answer.hist.length; iMove++){
         var move = answer.hist[iMove];
         switch(move){
            case 0:
            case 1:
               openDoor(move,true)();
               break;
            case 2:
               flipped = !flipped;
         }
      }
      if(!noVisual){
         updateTubeOrientation();
         updateBalls();
      }
   };

   function isSimPlaying() {
      var testSim = ballSim.slice();
      testSim.push(flipSim,doorSim);
      for(var iSim = 0; iSim < testSim.length; iSim++){
         if(testSim[iSim] && testSim[iSim].isPlaying()){
            return true
         }
      }
      return false
   };

   function updateUndo() {
      undoButton.unclick();
      if(answer.hist.length < 1){
         undoButton[0].attr("opacity",0.5);
         undoButton.attr("cursor","auto");
      }else{
         undoButton[0].attr("opacity",1);
         undoButton.click(undo);
         undoButton.attr("cursor","pointer");
      }
   };

   function updateTubeOrientation() {
      var angle = (flipped) ? 180 : 0;
      tubeRaph.transform(["r",angle,xm,ym]);
      for(var iPath = 0; iPath < 2; iPath++){
         tubePath[iPath].transform(["r",angle,xm,ym]);
         var doorAngle = (iPath == 0) ? -45 : 225;
         doorRaph[iPath].transform(["R",doorAngle,"R",angle,xm,ym]);
         // doorRaph[iPath].transform(["r",angle,xm,ym]);
         var arrAngle = (iPath == 0) ? 45 : 135;
         if(!flipped){
            var tr = [0,0];
         }else{
            // var tr = (iPath == 0) ? [270,-42] : [16,-42];
            var tr = [arrowPos[1][iPath].x - arrowPos[0][iPath].x,arrowPos[1][iPath].y - arrowPos[0][iPath].y];
         }
         arrows[iPath].transform(["r",arrAngle,"T",tr[0],tr[1]]);
      }
   };

   function updateBalls(noTransform) {
      for(var iTube = 0; iTube < nbTubes; iTube++){
         var seq = tubeContent[iTube];
         var path = (iTube < 2) ? tubePath[0] : tubePath[1];
         for(var iBall = 0; iBall < seq.length; iBall++){
            var ballID = seq[iBall];
            var length = findBallPos(ballID);
            var pos = path.getPointAtLength(length);
            if(!noTransform){
               placeBall(ballID,pos.x,pos.y);
               var angle = (flipped) ? 180 : 0;
               ballRaph[ballID - 1].transform(["r",angle,xm,ym,"r",angle]);
            }else{
               pos = rotatePos(pos);
               placeBall(ballID,pos.x,pos.y);
               ballRaph[ballID - 1].transform("");
            }
         }
      }
   };

   function updateCounter(noVisual) {
      nbFlips = 0;
      for(var iMove = 0; iMove < answer.hist.length; iMove++){
         if(answer.hist[iMove] == 2){
            nbFlips++;
         }
      }
      if(noVisual){
         return
      }
      var x = xMaxFlip;
      var y = yMaxFlip - 30;
      var text = nbFlips + " / " + maxFlip;
      var attr = (nbFlips > maxFlip) ? warningAttr : counterAttr;
      if(!maxFlipObj){
         maxFlipObj = paper.text(x,y,text).attr(attr);
         paper.text(x,yMaxFlip,taskStrings.flips).attr(nbFlipAttr);
      }else{
         maxFlipObj.attr("text",text).attr(attr);
      }
   };

   function findBallPos(ballID) {
      var loc = findBallLocation(ballID);
      var tube = loc.tube;
      var ballIndex = loc.ballIndex;
      var seq = tubeContent[tube];
      var path = (tube < 2) ? tubePath[0] : tubePath[1];
      if(tube == 0){
         if(!flipped){
            var length = path.getTotalLength() - (seq.length - 1 - ballIndex)*2*ballR;
         }else{
            var length = stopLength[tube] + ballIndex*2*ballR;
            if(ballIndex > 3){
               // length += 3;
            }
         }
      }else{
         if(!flipped){
            var L = stopLength[tube];
            var length = L - (seq.length - 1 - ballIndex)*2*ballR;
         }else{
            var length = ballIndex*2*ballR;
         }
      }
      return length
   };

   function placeBall(id,x,y) {
      if(!ballRaph[id - 1]){
         ballRaph[id - 1] = drawBall(id,x,y);
      }else{
         ballRaph[id - 1].attr({x: x, y: y, cx: x, cy: y });
      }
      ballPos[id - 1] = { x: x, y: y };
   };

   function drawBall(id,x,y){
      var ballCol = colors[ballColors[id%6]];
      var number = id;
      var circle = paper.circle(x,y,ballR).attr(ballAttr).attr("fill","r(0.2, 0.2)rgb(250,250,250)-"+ballCol+":70-"+colors.black);
      var innerCircle = paper.circle(x,y,innerBallR).attr(innerCircleAttr);
      var numberRaph = paper.text(x,y,number).attr(numberAttr);
      return paper.set(circle,innerCircle,numberRaph);
   };

   function drawArrow(xc,yc) {
      var trW = arrowW*0.5;
      var r = arrowButtonR;
      var circle = paper.circle(xc,yc,r).attr(arrowCircleAttr);
      var arr = getShape(paper,"arrow",xc,yc, { arrowW: arrowW, arrowH: arrowH, trW: trW }).attr(arrowAttr);
      // var x1 = xc - r;
      // var x2 = xc + r;
      // var arr = paper.path(["M",x1,yc,"H",x2]).attr(arrowAttr);
      return paper.set(circle,arr)
   };

   // function eq(val1,val2) {
   //    if(val1 == val2){
   //       return true
   //    }
   //    return false
   // };

   function checkResult(noVisual) {
      reloadAnswer(noVisual);
      updateCounter(noVisual);
      var bottomTube = tubeContent[0];
      var error = null;

      if(flipped){
         error = taskStrings.errorFlipped;
         if(!noVisual){
            displayError(error)
         }
         return { successRate: 0, message: error }
      }

      if(bottomTube.length != target.length){
         error = taskStrings.errorMissingBall(target.length);
      }
      for(var iBall = 0; iBall < bottomTube.length; iBall++){
         if(!error && bottomTube[iBall] != target[iBall]){
            error = taskStrings.errorWrongSequence;
         }
      }
      if(!error && nbFlips > maxFlip){
         error = taskStrings.errorNbFlips(maxFlip);
      }

      if(error){
         if(!noVisual){
            displayError(error)
         }
         return { successRate: 0, message: error }
      }

      if(!noVisual){
         platform.validate("done");
      }
      return { successRate: 1, message: taskStrings.success }
   };

   function displayError(msg) {
      $("#displayHelper_graderMessage").html(msg);
   };
}
if (typeof(threeVersions) == "undefined") {
   initialLevel = "basic";
   initWrapper(initTask, ["basic", "easy", "medium", "hard"]);
} else {
   initWrapper(initTask, ["easy", "medium", "hard"]);
}
displayHelper.useFullWidth();
