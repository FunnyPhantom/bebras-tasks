   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         heights: [9,12,11,13,10,8],
		 markRankByFindOrder: [0],
         minDiff: null,
         minHeight: 8,
         measureDifferences: false,
         initMark: null,
         maxComparisons: null,
         target: null,
         noButtons: true,
         noMarkButton: true
      },
      easy: {  
         heights: [18,8,14,8,16,8,8,10],
		 markRankByFindOrder: [2, 3, 0, 1],
         minDiff: null,
         minHeight: 8,
         measureDifferences: false,
         initMark: [],
         maxComparisons: null,
         target: null,
         noButtons: false,
         noMarkButton: true
      },
      medium: {
         heights: [12.5,14,9.5,17,18.5,8],
		 markRankByFindOrder: [1, 2, 0],
         minDiff: 1.5,
         minHeight: null,
         measureDifferences: true,
         initMark: [],
         maxComparisons: null,
         target: null,
         noButtons: false,
         noMarkButton: true
      },
      hard: {
         heights: [10,18,8,14,16,12,20,6],
		 markRankByFindOrder: [3, 5, 1, 6, 2, 0, 4],
         minDiff: 2,
         minHeight: null,
         measureDifferences: true,
         initMark: [],
         maxComparisons: 7,
         target: 7,
         noButtons: false,
         noMarkButton: true
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
   var paperH = 500;

   var marginX = 20;
   var marginY = 20;

   var buttonR = 20;
   var yButton = marginY + buttonR;
   var iconW = 17;
   var iconH = 21;
   var buttonSelected = false;

   var headW = 43;
   var headH = 53;
   var neckW = 14;
   var neckH = 58;
   var neckTopOffsetY = 25;
   var bodyW = 61;
   var bodyH0 = 199;
   var scarfW = 23;
   var scarfH = 50;

   var giraffeW = bodyW;
   var giraffeSpacing = 20;
   var placeW = giraffeW + giraffeSpacing;
   var windowW, windowH = 430;
   var yWindow = 10;
   var xWindow;
   var baseH = 150;
   var overheadH = 60;
   var heightRange = windowH - overheadH - baseH;
   var maxH = 20;
   var deltaH = heightRange/maxH;
   var minBodyH = baseH - headH;
   var nameH = 30;

   var gaugeRodW = 15;
   var gaugeBarW = 10;
   var gaugeBarH = 50;
   var gaugeEdgeW = 2;
   var gaugeLineW = 1.5;
   var gaugePos = null;

   var checkBoxRowH = 40;
   var checkBoxW = 20;
   var checkBoxH = checkBoxW;

   var feedbackRectH = 180;
   var feedbackRectW = 460;
   var yFeedback = yWindow + windowH + nameH + checkBoxRowH + marginY/2;
   var xFeedback = marginX;
   var imageW = feedbackRectH - marginY;
   var imageH = imageW;
   var xImage = xFeedback + 1.5*marginX;
   var yImage = yFeedback + (feedbackRectH - imageH)/2;
   var zoomScale = 20;

   var maskStrokeW = 50;
   var maskR = imageW/2 + maskStrokeW/2;
   var xText1 = xImage + imageW + 130;
   var yText;
   var buttonW = 150;
   var buttonH = 40;
   var xFeedbackButton = xText1;
   var yFeedbackButton = yFeedback + 2*feedbackRectH/3;
   var animDuration = 200;
   var animDurationMark = 400;

   var yCounter = yFeedback + feedbackRectH/2;
   var xCounter = xFeedback + feedbackRectW + (paperW - 2*marginX - feedbackRectW)/2;
   
   var nbGiraffes, nbButtons;
   var giraffeHeights = {};
   var maxComparisons;
   var minDiff, minHeight;
   var initMark;
   var validGiraffes = [];
   var validGiraffesH = [];
   var validPairs = [];
   var validPairsDiffRange = 10;
   var validPairsDiff = [];
   var markRankByFindOrder = [];
   var nbGoodMarksFound = 0;
   var target;
   var noButtons, noMarkButton;
   var ref = null; // for zoom anim when same meas
   var successiveMin = []; // for anim bug fix

   var buttons = [];
   var feedbackObj = {};
   var scarfObj = {};
   var gaugeObj;
   var counterObj;
   var checkBoxObj = [];
   var giraffeNames = [];

   var dragAndDrop;
   var sim;
   var rng;

   var backgroundSrc = $("#background").attr("src");
   var headSrc = $("#head").attr("src");
   var neckSrc = $("#neck").attr("src");
   var bodySrc = $("#body").attr("src");
   var scarfSrc = $("#scarf").attr("src");
   var gaugeBodySrc = $("#gauge_body").attr("src");
   var gaugeHeadSrc = $("#gauge_head").attr("src");
   var gaugeIconSrc = $("#gauge_icon").attr("src");

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      gold: "#f8bf1a",
      beige: "#ffe0c1",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      seaBlue: "#0e5667",
      brown: "#934c22", // #938174
      lightGrey: "#f2f2f2",
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
      stroke: "white",
      "stroke-width": 6,
      fill: "none",
      r: 10,
      opacity: 1
   };
   var placeAttr = {
      stroke: "none",
      fill: "none",
      width: placeW,
      height: windowH
   };
   var lineAttr = {
      stroke: colors.blue,
      "stroke-width": 2,
      "stroke-dasharray": ["."]
   };
   var nameAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var gaugeButtonAttr = {
      circ: {
         stroke: "none",
         fill: colors.black,
         r: buttonR
      },
      selected: {
         stroke: colors.black,
         fill:"white"
      },
      arr: {
         stroke: "white",
         "stroke-width": 3,
         "stroke-linejoin": "round",
         fill: "white"
      },
      selArr: {
         stroke: colors.black,
         fill: colors.black
      }
   };
   var checkBoxAttr = {
      rect: {
         stroke: colors.black,
         "stroke-width": 2,
         fill: "none"
      },
      selected: {
         stroke: colors.black,
         "stroke-width": 2,
         fill: colors.blue
      }
   };
   var gaugeAttr = {
      rect: {
         stroke: "none",
         fill: colors.beige
      },
      edge: {
         stroke: "none",
         fill: colors.brown
         
      },
      line: {
         stroke: "none",
         fill: "black"
      },
      mark: {
         stroke: colors.darkBlue,
         "stroke-width": 2
      }
   };
   var feedbackAttr = {
      rect: {
         stroke: "none",
         fill: colors.lightGrey,
         r: 5
      },
      mask: {
         stroke: colors.lightGrey,
         "stroke-width": maskStrokeW,
         fill: "none",
         r: maskR,
         "clip-rect": [xImage,yImage,imageW,imageH],
         opacity: 1
      },
      imgFrame: {
         stroke: colors.black,
         "stroke-width": 2,
         r: imageW/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black
      }
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
   var zoomNamesAttr = {
      rect: {
         stroke: "none",
         fill: colors.beige
      },
      text: {
         "font-size": 14,
         "font-weight": "bold",
         fill: colors.blue
      }
   };
   var counterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
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
      nbGiraffes = data[level].heights.length;
      nbButtons = data[level].measureDifferences ? nbGiraffes - 1 : nbGiraffes;
      maxComparisons = data[level].maxComparisons;
      target = data[level].target;
      initMark = data[level].initMark;
      minDiff = data[level].minDiff;
      minHeight = data[level].minHeight;
	  markRankByFindOrder = data[level].markRankByFindOrder;
      target = data[level].target;
      noButtons = data[level].noButtons;
      noMarkButton = data[level].noMarkButton;
      initGiraffeHeights();
      if(minDiff != null){
         initValidPairs();
      }else{
         initValidGiraffes();
      }
      windowW = nbGiraffes*placeW;
      if(noButtons){
         xWindow = (paperW - windowW)/2;
      }else{
         xWindow = paperW - marginX - windowW;
      }
      if(noMarkButton){
         yText = yCounter;
      }else{
         yText = yFeedback + feedbackRectH/3 - 10;
      }

      paperH = (data[level].noButtons) ? yFeedback : yFeedback + feedbackRectH + marginY;

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
   };

   subTask.resetDisplay = function() {
      displayError("");
      initPaper();
      reloadAnswer();
      initDragDrop();
      initButtons();
      initFeedback();
      initCounter();
      initHandlers();
      updateScarf();
      updateCounter();
      updateGauge();
      updateMarkButton();
      updateFeedbackMessage();
      updateZoomImage();

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         seed: rng.nextInt(0,1000),
         giraffes: [],
         mark: [],
         measurements: [],
         selected: [],
         validation: false
      };
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         defaultAnswer.giraffes[iGir] = "gir_"+iGir;
      }

      return defaultAnswer;
   };

   var getResultAndMessage = function() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function(callback) {
      subTask.simulationFactory.destroy("sim");
      callback();
   };

   subTask.getGrade = function(callback) {
      callback(getResultAndMessage());
   };

   function initGiraffeHeights() {
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         var id = "gir_"+iGir;
         giraffeHeights[id] = data[level].heights[iGir];
      }
   };

   function initValidPairs() {
      validPairs = [];
      validPairsDiff = [];
      for(var id1 in giraffeHeights){
         var h1 = giraffeHeights[id1];
         for(var id2 in giraffeHeights){
            if(id1 == id2){
               continue
            }
            var h2 = giraffeHeights[id2];
            var diff = Math.abs(h1 - h2);
            if(diff == minDiff){
               var has = validPairsHas(id1,id2);
               if(!has){
                  validPairs.push([id1,id2]);
               }
            }
         }
      }
   };

   function initValidGiraffes() {
      validGiraffes = [];
      validGiraffesH = [];
      for(var id in giraffeHeights){
         var h = giraffeHeights[id];
         if(h == minHeight && !Beav.Array.has(validGiraffes,id)){
            validGiraffes.push(id);
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h;
      for(var iOver = 1; iOver <= 7; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = yWindow;
               break;
            case 2:
               x = 0; y = 0;
               w = xWindow;
               h = yFeedback;
               break;
            case 3:
               x = xWindow + windowW; 
               y = 0;
               w = paperW - x;
               h = paperH;
               break;
            case 4:
               x = 0; y = yFeedback;
               w = paperW;
               if(noMarkButton){
                  h = paperH - y;
               }else{
                  h = Math.min(paperH - y,yFeedbackButton - buttonH/2 - y);
               }
               break;
            case 5:
               x = 0; 
               y = yFeedback;
               w = xFeedbackButton - buttonW/2;
               h = paperH - y;
               break;
            case 6:
               x = xFeedbackButton + buttonW/2;
               y = yFeedback;
               w = paperW - x; 
               h = paperH - y;
               break;
            case 7:
               x = xFeedbackButton - buttonW/2;
               y = yFeedbackButton + buttonH/2;
               w = buttonW; 
               h = paperH - y;
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
            buttonsToFront();
            answer.giraffes = dragAndDrop.getObjects('giraffes');
            updateCheckBox();
         },
         actionIfDropped : function(srcCont, srcPos, dstCont, dstPos, type) {
            if(buttonSelected){
               updateButtons();
            }
            if(!noButtons){
               // prevGaugePos = gaugePos;
               gaugePos = null;
               successiveMin = [];
               ref = null;
               updateGauge();
               updateMarkButton();
               updateFeedbackMessage();
               updateZoomImage();
            }
            hideCheckBox();
            if (dstCont == null)
               return false;
            return true;
         },
         canBeTaken : function() {
            subTask.simulationFactory.destroy("sim");
            if(answer.validation){
               return false
            }
            return true
         }
      });
      var x0 = xWindow, y0 = yWindow;
      var w = windowW, h = windowH;
      var xBack = (noButtons) ? x0 : 5;
      var backW = (noButtons) ? w : w + x0 - xBack;
      paper.image(backgroundSrc,xBack,y0,backW,h).attr("clip-rect",[x0,y0,w,h,10]);
      paper.rect(xBack - 3,y0 - 3,backW + 6,h + 6).attr(windowAttr);
      var backgroundTarget = paper.rect(-placeW/2,-h/2).attr(placeAttr);
      dragAndDrop.addContainer({
         ident : 'giraffes',
         cx : x0 + w/2,
         cy : y0 + h/2,
         widthPlace : placeW,
         heightPlace : h,
         nbPlaces : nbGiraffes,
         direction : 'horizontal',
         dropMode : 'insertBefore',
         dragDisplayMode : 'preview',
         placeBackgroundArray : [ backgroundTarget ]
      });

      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         var girID = answer.giraffes[iGir];
         var xBody = -bodyW/2;
         var girH = giraffeHeights[girID]*deltaH + baseH;
         var yHead = -placeAttr.height/2 + (placeAttr.height - girH) - 1;
         var xHead = -headW/2;
         var currMinBodyH = Math.max(minBodyH,girH - 200);
         var maxBodyH = girH - 50;
         var bodyH = Math.ceil(girH*3/5);
         var yBody = windowH/2 - bodyH;
         var yNeck = yHead + neckTopOffsetY;
         var xNeck = -neckW/2;
         var currNeckH = Math.abs(yNeck - yBody) + 7;
         var xScarf = -scarfW/2 + 2;
         var yScarf = yBody + 3;
         var yName = (windowH + nameH)/2;
         var body = paper.image(bodySrc,xBody,yBody,bodyW,bodyH);
         var neck = paper.image(neckSrc,xNeck,yNeck,neckW,currNeckH);
         var head = paper.image(headSrc,xHead,yHead,headW,headH);
         var scarf = paper.image(scarfSrc,xScarf,yScarf,scarfW,scarfH).hide();
         var name = paper.text(0,yName,giraffeNames[iGir].toUpperCase()).attr(nameAttr);
         var ovH = (noButtons) ? h : h - (marginY + 2*buttonR);
         var yOv = (noButtons) ? -h/2 : -h/2 + marginY + 2*buttonR;
         var ov = paper.rect(-placeW/2,yOv,placeW,ovH).attr(overlayAttr);
         scarfObj[girID] = scarf;
         var element = paper.set(body,neck,head,scarf,name,ov);

         dragAndDrop.insertObject('giraffes', iGir, {ident : girID, elements : element } );

         checkBoxObj[iGir] = drawCheckBox(iGir);
      }
   };

   function initButtons() {
      var y = yButton;
      for(var iGir = 0; iGir < nbButtons; iGir++){
         var x = xWindow + (iGir + 1)*placeW;
         var xButton = data[level].measureDifferences ? x: x - placeW/2;
         var y1 = yWindow, y2 = y1 + windowH;
         if(iGir < nbGiraffes - 1)
            paper.path(["M",x,y1,"V",y2]).attr(lineAttr);
         if(noButtons){
            continue
         }
         var circ = paper.circle(xButton,y).attr(gaugeButtonAttr.circ);
         var xIcon = xButton - iconW/2;
         var yIcon = y - iconH/2;
         var icon = getShape(paper,"arrow",xButton,y+1,{ arrowW: 17, arrowH: 13}).attr(gaugeButtonAttr.arr).rotate(90);
         buttons[iGir] = paper.set(circ,icon);
      }
   };

   function initFeedback() {
      var x0 = xFeedback;
      var y0 = yFeedback;
      var w = feedbackRectW;
      var h = feedbackRectH;
      var attr = feedbackAttr;
      paper.setStart();
      feedbackObj.rect = paper.rect(x0,y0,w,h).attr(attr.rect);
      paper.image(backgroundSrc,xImage,yImage,imageW,imageH + marginY).attr("clip-rect",[xImage,yImage,imageW,imageH]);

      var xMask = xImage + imageW/2;
      var yMask = yImage + imageH/2;
      feedbackObj.mask = paper.circle(xMask,yMask).attr(attr.mask);
      feedbackObj.imgFrame = paper.circle(xMask,yMask).attr(attr.imgFrame);
      
      var xc = xFeedbackButton;
      if(!noMarkButton){
         var xRect = xc - buttonW/2;
         var yRect = yFeedbackButton - buttonH/2;
         var buttonRect = paper.rect(xRect,yRect,buttonW,buttonH).attr(buttonAttr.rect);
         var buttonText = paper.text(xc,yFeedbackButton,taskStrings.mark).attr(buttonAttr.text);
         var button = paper.set(buttonRect,buttonText);
         feedbackObj.button = button;
      }
      feedbackObj.text = paper.text(xc,yText,"").attr(attr.text);

      feedbackObj.all = paper.setFinish();
   };

   function initCounter() {
      if(maxComparisons != null)
         counterObj = paper.text(xCounter,yCounter,"").attr(counterAttr);
   };

   function initHandlers() {
      if(!noButtons){
         for(var iButton = 0; iButton < nbButtons; iButton++){
            buttons[iButton].click(measure(iButton));
            buttons[iButton].attr("cursor","pointer");
         }
      }
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         checkBoxObj[iGir].click(clickCheckBox(iGir));
         checkBoxObj[iGir].attr("cursor","pointer");
      }
   };

   function clickCheckBox(id) {
      return function() {
         if(answer.validation){
            return
         }
         displayError("");
         var girID = answer.giraffes[id];
         if(!Beav.Array.has(answer.selected,girID)){
            if(minHeight != null && answer.selected.length > 0){
               answer.selected.pop();
            }else if(minHeight == null){
               if(answer.selected.length >= 2){
                  displayError(taskStrings.cannotGiveScarf);
                  return
               }
            }
            answer.selected.push(girID);
         }else{
            var index = Beav.Array.indexOf(answer.selected,girID);
            answer.selected.splice(index,1);
         }
         updateScarf();
      }
   };

   function measure(iButton) {
      return function() {
         if(answer.validation){
            return
         }
         if(sim && sim.isPlaying()){
            return
         }
         displayError("");
         // prevGaugePos = gaugePos;
         if(gaugePos == iButton){
            return
         }
         if(maxComparisons != null){
            var nbMeas = answer.measurements.length;
            if(nbMeas >= maxComparisons){
               displayError(taskStrings.errorTooManyMeas(maxComparisons));
               return
            }
         }
         runSimulation(iButton);
      }
   };

   function runSimulation(iButton) {
      var diff;
      var id1 = answer.giraffes[iButton];
      var id2 = answer.giraffes[iButton + 1];
      var h1 = giraffeHeights[id1];
      var h2 = giraffeHeights[id2];
      if(ref != null){
         if(minHeight == null){
            var isValid = validPairsHas(id1,id2);
            if(isValid){
               diff = getActualDiff(isValid.index);
            }
         }else{
            if(Beav.Array.has(validGiraffes,id1)){
               var id = Beav.Array.indexOf(validGiraffes,id1);
               diff = getActualHeight(id);
            }
         }
      }
      if(!diff){
         ref = null;
      }
      if(minDiff && Math.abs(h1 - h2) == minDiff){
         successiveMin.push([id1,id2]);
      }else{
         successiveMin = [];
      }

      sim = subTask.simulationFactory.create("sim");
      var simStep1 = new SimulationStep();
      var simAction1 = { onExec: moveAnim(iButton), duration: animDuration, params: {} };
      var simEntry1 = { name: "moveAnim", action: simAction1 };
      simStep1.addEntry(simEntry1);
      if(diff){
         // console.log("tr")
         var simAction2 = { onExec: zoomAnim(diff), duration: animDuration, params: {} };
         var simEntry2 = { name: "zoomAnim", action: simAction2 };
         simStep1.addEntry(simEntry2);
      }
      sim.addStep(simStep1);
      sim.setAutoPlay(true);
      sim.play();
   };

   function moveAnim(iButton) {
      return function(params, duration, callback) {
         if(gaugePos == null){
            var prevPos = getGaugePos(null);
            var prevDiff = 1;
         }else{
            var prevId1 = answer.giraffes[gaugePos];
            var prevId2 = answer.giraffes[gaugePos + 1];
            var prevPos = getGaugePos(prevId1,prevId2);
            var prevDiff = (minHeight) ? giraffeHeights[prevId1] : giraffeHeights[prevId2] - giraffeHeights[prevId1];
         }
         var id1 = answer.giraffes[iButton];
         var id2 = answer.giraffes[iButton + 1];
         var diff = (minHeight) ? giraffeHeights[id1] : giraffeHeights[id2] - giraffeHeights[id1];
         var newPos = getGaugePos(id1,id2);

         var prevCoord = getGaugeCoord(prevPos.x1,prevPos.y1,prevPos.x2,prevPos.y2);
         var newCoord = getGaugeCoord(newPos.x1,newPos.y1,newPos.x2,newPos.y2);

         var dx = newCoord.x - prevCoord.x;
         var dy = newCoord.h - prevCoord.h;

         var rod = gaugeObj[0];
         var rodRect = rod[0];
         var rodEdge = rod[1];
         var marks= rod[2];
         var bar = gaugeObj[1];
         var horRect = bar[0];
         var verRect = bar[1];
         var horEdge = bar[2];
         var verEdge = bar[3];
         var line = bar[4];

         if(diff*prevDiff < 0){
            if(diff > 0){
               var xEdge = prevCoord.x;
               var xHorRect = prevCoord.x + prevCoord.rw;
               rodEdge.attr("x",xEdge);
               horRect.attr("x",xHorRect);
               verRect.attr("x",xHorRect);
               verEdge.attr("x",xHorRect);
               horEdge.attr("x",xHorRect);
               line.attr("x",xHorRect);
            }else{
               var xEdge = prevCoord.x + prevCoord.rw - gaugeLineW;
               var xHorRect = prevCoord.x - prevCoord.horBarW;
               var xVerRect = prevCoord.x - prevCoord.bw;
               var xVerEdge = prevCoord.x - gaugeLineW;
               rodEdge.attr("x",xEdge);
               horRect.attr("x",xHorRect);
               verRect.attr("x",xVerRect);
               verEdge.attr("x",xVerEdge);
               horEdge.attr("x",xHorRect);
               line.attr("x",xHorRect);
            }
         }

         var animRodRect = new Raphael.animation({ x: newCoord.x, y: newCoord.y, height: newCoord.h }, duration, callback);
         var animRodEdge = new Raphael.animation({ x: newCoord.xEdge, y: newCoord.y, height: newCoord.h }, duration);
         var animMarks = new Raphael.animation({ transform: ["T",dx,dy] }, duration);
         subTask.raphaelFactory.animate("animRodRect",rodRect,animRodRect);
         subTask.raphaelFactory.animate("animRodEdge",rodEdge,animRodEdge);
         subTask.raphaelFactory.animate("animMarks",marks,animMarks);

         var animHorRect = new Raphael.animation({ x: newCoord.xHorBar, y: newCoord.yHorBar }, duration);
         var animVerRect = new Raphael.animation({ x: newCoord.xVerBar, y: newCoord.yVerBar }, duration);
         var animHorEdge = new Raphael.animation({ x: newCoord.xHorBar, y: newCoord.yHorBar + newCoord.bw - gaugeLineW - gaugeEdgeW }, duration);
         var animVerEdge = new Raphael.animation({ x: newCoord.xVerEdge, y: newCoord.yVerBar }, duration);
         var animLine = new Raphael.animation({ x: newCoord.xHorBar, y: newCoord.yHorBar + newCoord.bw - gaugeLineW }, duration);
         subTask.raphaelFactory.animate("animHorRect",horRect,animHorRect);
         subTask.raphaelFactory.animate("animVerRect",verRect,animVerRect);
         subTask.raphaelFactory.animate("animHorEdge",horEdge,animHorEdge);
         subTask.raphaelFactory.animate("animVerEdge",verEdge,animVerEdge);
         subTask.raphaelFactory.animate("animLine",line,animLine);

         return {
            stop: function() {                  
               subTask.simulationFactory.destroy("sim");
               // prevGaugePos = gaugePos;
               gaugePos = iButton;

               updateGauge();

               var last = answer.measurements[answer.measurements.length - 1];
               if(minHeight == null){
                  if(!last || !Beav.Array.has(last,id1) || !Beav.Array.has(last,id2)){
                     answer.measurements.push([id1,id2]);
                  }
               }else{
                  if(!last || last != id1){
                     answer.measurements.push(id1);
                  }
               }
               updateCounter();
               updateButtons(iButton);
               displayFeedback(id1,id2);
               if(!noMarkButton){
                  updateMarkButton();
               }else{
                  mark();
               }
            }
         }      
      }
   };

   function zoomAnim(diff) {
      return function(params, duration, callback) {
         var obj = feedbackObj.gauge;
         var bar = obj[1];
         var tr = (ref - diff)*zoomScale*deltaH;
         var anim = new Raphael.animation({ transform: ["T",0,tr] }, duration, callback);
         subTask.raphaelFactory.animate("zoomAnim",bar,anim);
      }
   };

   function placeGauge(id1,id2) {
      if(gaugeObj){
         gaugeObj.remove();
      }
      var pos = getGaugePos(id1,id2);
      gaugeObj = drawGauge(pos.x1,pos.y1,pos.x2,pos.y2);

      buttonsToFront();
   };

   function getGaugePos(id1,id2) {
      var x1,y1,x2,y2;
      if(id1 == null){
         if(minHeight != null){
            x1 = xWindow - placeW/2;
            y1 = yWindow + windowH/2;
         }else{
            x1 = 20;
            y1 = yWindow + windowH;
            x2 = x1 + placeW;
            y2 = yWindow + windowH/2;
         }
      }else{
         var h1 = giraffeHeights[id1];
         var index1 = Beav.Array.indexOf(answer.giraffes,id1);
         if(minHeight != null){
            x1 = xWindow + (index1 + 1/2)*placeW;
            y1 = yWindow + windowH - (h1*deltaH + baseH);
         }else{
            var h2 = giraffeHeights[id2];
            var dir = (h1 < h2) ? 1 : 0;
            var indexSmall = (h1 < h2) ? index1 : index1 + 1;
            var indexBig = (h1 < h2) ? index1 + 1 : index1;
            var xcSmall = xWindow + (indexSmall + 1/2)*placeW;
            var xcBig = xWindow + (indexBig + 1/2)*placeW;
            var smallH = Math.min(h1,h2)*deltaH + baseH;
            var bigH = Math.max(h1,h2)*deltaH + baseH;
            var yHeadSmall = yWindow + windowH - smallH;
            var yHeadBig = yWindow + windowH - bigH;
            x1 = xcSmall;
            y1 = yHeadSmall;
            x2 = xcBig;
            y2 = yHeadBig;
         }
      }
      return { x1: x1, x2: x2, y1: y1, y2: y2 }
   };

   function buttonsToFront() {
      if(noButtons){
         return
      }
      for(var iGir = 0; iGir < nbGiraffes - 1; iGir++){
         buttons[iGir].toFront();
      }
   };

   function displayFeedback(id1,id2) {
      var h1 = giraffeHeights[id1];
      var h2 = giraffeHeights[id2];
      var possRef = false;
      if(minHeight == null){
         var isValid = validPairsHas(id1,id2);
         if(isValid){
            var diff = getActualDiff(isValid.index);
            possRef = true;
         }else{
            var diff = Math.abs(h1 - h2);
         }
      }else{
         // console.log(validGiraffes,id1)
         if(Beav.Array.has(validGiraffes,id1)){
            var id = Beav.Array.indexOf(validGiraffes,id1);
            var diff = getActualHeight(id);
            possRef = true;
         }else{
            var diff = h1;
         }
      }
      updateFeedbackMessage(diff,id1,id2);
      if(ref == null){
         updateZoomImage(id1,id2,diff);
         if(possRef){
            ref = diff;
         }
      }
   };

   function mark() {
      if(answer.validation){
         return
      }
      displayError("");
      var last = answer.measurements[answer.measurements.length - 1];
      if(isAlreadyMarked(last)){
         return
      }
      var id1,id2;
      if(minHeight == null){
         id1 = last[0];
         id2 = last[1];
         var isValid = validPairsHas(id1,id2);
         if(isValid){
            var diff = getActualDiff(isValid.index);
         }else{
            var h1 = giraffeHeights[id1];
            var h2 = giraffeHeights[id2];
            var diff = Math.abs(h1 - h2);
         }
         for(var iPair = 0; iPair < answer.mark.length; iPair++){
            var pair = answer.mark[iPair];
            if(Beav.Array.has(pair,id1) && Beav.Array.has(pair,id2)){
               return
            }
         }
      }else{
         id1 = last;
         var h = giraffeHeights[last];
         if(h == minHeight){
            var id = Beav.Array.indexOf(validGiraffes,last);
            var diff = getActualHeight(id);
         }else{
            var diff = h;
         }
         // console.log(diff,last)
      }
      answer.mark.push(last);
      drawMark(diff);
      updateMarkButton();
      if(!noMarkButton){
         updateFeedbackMessage(diff,id1,id2);
      }
   };

   function isAlreadyMarked(ids) {
      for(var iMark = 0; iMark < answer.mark.length; iMark++){
         var currIds = answer.mark[iMark];
         if(minHeight){
            if(currIds == ids){
               return true
            }
         }else if(Beav.Array.has(currIds,ids[0]) && Beav.Array.has(currIds,ids[1])){
            return true
         }
      }
      return false
   };

   function giveScarves() {
      displayError("");
      var last = answer.measurements[answer.measurements.length - 1];
      answer.selected = last;
      updateScarf();
   };

   function getActualDiff(id) {
      var found = getFoundPairs();
      if(!Beav.Array.has(found,id)){
		 var rank = markRankByFindOrder[nbGoodMarksFound];
		 nbGoodMarksFound += 1;
		 validPairsDiff[id] = rank * 0.08;
      }
      diff = minDiff + validPairsDiff[id];
      return diff
   };

   function getActualHeight(id) {
      var found = getFoundGiraffes();
      // console.log("getActualHeight",found,id,validGiraffesH)
      if(!Beav.Array.has(found,id)){
		 var rank = markRankByFindOrder[nbGoodMarksFound];
		 nbGoodMarksFound += 1;
		 validGiraffesH[id] = rank * 0.08;
      }
      h = minHeight + validGiraffesH[id];
      return h
   };


   function getAllMarks() {
      var currMark = [];
      if(minHeight == null){
         for(var iPair = 0; iPair < answer.mark.length; iPair++){
            var pair = answer.mark[iPair];
            var id1 = pair[0];
            var id2 = pair[1];
            var isValid = validPairsHas(id1,id2);
            if(isValid){
               var diff = getActualDiff(isValid.index);
            }else{
               var h1 = giraffeHeights[id1];
               var h2 = giraffeHeights[id2];
               var diff = Math.abs(h1 - h2);
            }
            currMark.push({ val: diff, id: iPair });
         }
      }else{
         for(var iGir = 0; iGir < answer.mark.length; iGir++){
            var girID = answer.mark[iGir];
            var h = giraffeHeights[girID];
            if(h == minHeight){
               var id = Beav.Array.indexOf(validGiraffes,girID);
               var height = getActualHeight(id);
            }else{
               var height = h;
            }
            currMark.push({ val: height, id: iGir });
            // currMark.push(height);
         }
      }
      return initMark.concat(currMark);
   };

   function validPairsHas(id1,id2) {
      for(var iPair = 0; iPair < validPairs.length; iPair++){
         var pair = validPairs[iPair];
         if(Beav.Array.has(pair,id1) && Beav.Array.has(pair,id2)){
            return { index: iPair };
         }
      }
      return false
   };

   function getFoundPairs() {
      var found = [];
      for(var iPair = 0; iPair < validPairsDiff.length; iPair++){
         var val = validPairsDiff[iPair];
         if(val !== undefined){
            found.push(iPair);
         }
      }
      return found
   };

   function getFoundGiraffes() {
      var found = [];
      for(var iGir = 0; iGir < validGiraffesH.length; iGir++){
         var val = validGiraffesH[iGir];
         if(val !== undefined){
            found.push(iGir);
         }
      }
      return found
   };

   function isPairMarked(id1,id2) {
      for(var iPair = 0; iPair < answer.mark.length; iPair++){
         var pair = answer.mark[iPair];
         // console.log(pair)
         if(Beav.Array.has(pair,id1) && Beav.Array.has(pair,id2)){
            return true
         }
      }
      return false
   };

   function updateMarkButton() {
      if(noMarkButton){
         return
      }
      feedbackObj.button.unclick();
      var enable = false;
      if(gaugePos != null){
         if(minHeight){
            var girID = answer.giraffes[gaugePos];
            if(!Beav.Array.has(answer.mark,girID)){
               enable = true;
            }
         }else{
            var id1 = answer.giraffes[gaugePos];
            var id2 = answer.giraffes[gaugePos + 1];
            // console.log(id1,id2)
            if(!isPairMarked(id1,id2)){
               enable = true;
            }
         }
      }
      if(enable){
         feedbackObj.button.click(mark);
         feedbackObj.button[0].attr("opacity",1);
         feedbackObj.button.attr("cursor","pointer");
      }else{
         feedbackObj.button[0].attr("opacity",0.5);
         feedbackObj.button.attr("cursor","auto");
      }
   };

   function updateFeedbackMessage(diff,id1,id2) {
      if(gaugePos == null){
         feedbackObj.text.attr("text","");
         return
      }
      if(noMarkButton){
         var ids = (minHeight) ? id1 : [id1,id2];
         var strings = getNameStrings(ids);
         if(isAlreadyMarked(ids)){
            var str = taskStrings.alreadyMarked(strings);
         }else{
            var str = taskStrings.newMark(strings);
         }
         feedbackObj.text.attr("text",str);
         return
      }

      var lowerDiff = Infinity;
      var totDiff = getAllMarks();
      if(totDiff.length == 0){
         feedbackObj.text.attr("text",taskStrings.addMarker);
         return
      }
      for(var iDiff = 0; iDiff < totDiff.length; iDiff++){
         var currDiff = totDiff[iDiff].val;
         if(currDiff < lowerDiff){
            lowerDiff = currDiff;
         }
      }

      if(diff == lowerDiff){
         var res = "markerSame";
      }else{
         var res = (diff < lowerDiff) ? "markerAbove" : "markerBelow";
      }
      feedbackObj.text.attr("text",taskStrings[res]);
   };

   function updateGauge() {
      if(noButtons){
         return
      }
      if(gaugePos != null){
         var id1 = answer.giraffes[gaugePos];
         var id2 = answer.giraffes[gaugePos + 1];
         if(minHeight){
            placeGauge(id1);
         }else{
            placeGauge(id1,id2);
         }
      }else{
         placeGauge(null);
      }
      // gaugeObj.toFront();
   };

   function updateButtons(id) {
      var a = gaugeButtonAttr;
      var sel = false;
      for(var iButton = 0; iButton < nbButtons; iButton++){
         if(iButton === id){
            buttons[iButton][0].attr(a.selected);
            buttons[iButton][1].attr(a.selArr);
            sel = true;
         }else{
            buttons[iButton][0].attr(a.circ);
            buttons[iButton][1].attr(a.arr);
         }
      }
      buttonSelected = sel;
   };

   function updateCounter() {
      if(maxComparisons != null)
         counterObj.attr("text",taskStrings.count(answer.measurements.length,maxComparisons));
   };

   function updateScarf() {
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         var girID = answer.giraffes[iGir];
         if(Beav.Array.has(answer.selected,girID)){
            scarfObj[girID].show();
            checkBoxObj[iGir][0].attr(checkBoxAttr.selected);
         }else{
            scarfObj[girID].hide();
            checkBoxObj[iGir][0].attr(checkBoxAttr.rect);
         }
      }
   };

   function updateCheckBox() {
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         var girID = answer.giraffes[iGir];
         if(Beav.Array.has(answer.selected,girID)){
            checkBoxObj[iGir][0].attr(checkBoxAttr.selected).show();
         }else{
            checkBoxObj[iGir][0].attr(checkBoxAttr.rect).show();
         }
      }
   };

   function updateZoomImage(id1,id2,diff) {
      if(noButtons){
         return
      }
      if(feedbackObj.gauge){
         feedbackObj.gauge.remove();
      }
      var xcImg = xImage + imageW/2;
      var ycImg = yImage + imageH/2;
      if(gaugePos == null){
         diff = (windowH/2 - baseH)/deltaH;
         h1 = 0;
         h2 = 1;
      }else{
         var h1 = giraffeHeights[id1];
         var h2 = giraffeHeights[id2];
      }
      if(minHeight == null){
         var xSmall = (h1 > h2) ? xcImg + gaugeRodW*zoomScale/2 : xcImg - gaugeRodW*zoomScale/2;
         var ySmall = ycImg + diff*deltaH*zoomScale;
         var xBig = (h1 > h2) ? xSmall - placeW*zoomScale : xSmall + placeW*zoomScale;
         var yBig = ycImg;
      }else{
         var xSmall = xcImg - gaugeRodW*zoomScale;
         var ySmall = ycImg + diff*deltaH*zoomScale;
         var xBig = xcImg, yBig = ycImg;
      }
      var gauge = drawGauge(xSmall,ySmall,xBig,yBig,true);
      feedbackObj.gauge = gauge;
      feedbackObj.mask.toFront();
      feedbackObj.imgFrame.toFront();
      feedbackObj.all.push(gauge);
   };

   function hideCheckBox() {
      for(var iGir = 0; iGir < nbGiraffes; iGir++){
         checkBoxObj[iGir][0].hide();
      }
   };

   function getGaugeCoord(xSmall,ySmall,xBig,yBig,feedback) {
      var scale = (feedback) ? zoomScale : 1;
      var rw = gaugeRodW*scale;
      var bw = gaugeBarW*scale;
      var y = (feedback) ? yImage : yWindow;
      var edgeW = (feedback) ? 4 : gaugeEdgeW;
      if(minHeight != null){
         if(feedback){
            var x = xSmall;
            var h = imageW/2 + ySmall - yBig;
            var yHorBar = yBig - bw;
            var yVerBar = yBig - gaugeBarH*scale;
            var y0Mark = ySmall;
            var horBarW = imageW;
         }else{
            var h = windowH;
            var x = xSmall - placeW/2;
            var yHorBar = ySmall - bw;
            var yVerBar = ySmall - gaugeBarH*scale;
            var y0Mark = y + h - baseH;
            var horBarW = placeW - rw;
         }
         var xEdge = x;
         var xHorBar = x + rw;
         var xVerBar = x + rw;
         var xVerEdge = x + rw;
      }else{
         var h = ySmall - y;
         var x = xSmall - rw/2;
         var xEdge = (xBig < xSmall) ? x + rw - edgeW : x;
         var yHorBar = yBig - bw;
         var yVerBar = yBig - gaugeBarH*scale;
         var horBarW = Math.abs(xSmall - xBig);
         var y0Mark = ySmall;
         if(xBig < xSmall){
            var xHorBar = xBig - rw/2;
            var xVerBar = x - bw;
            var xVerEdge = x - edgeW;
         }else{
            var xHorBar = x + rw;
            var xVerBar = x + rw;
            var xVerEdge = x + rw;
         }
      }
      return { scale: scale, rw: rw, bw: bw, h: h, x: x, y: y, yHorBar: yHorBar, yVerBar: yVerBar, 
         y0Mark: y0Mark, horBarW: horBarW, xEdge: xEdge, xHorBar: xHorBar, xVerBar: xVerBar, xVerEdge: xVerEdge }
   };

   function drawGauge(xSmall,ySmall,xBig,yBig,feedback) {
      var a = gaugeAttr;
      var coord = getGaugeCoord(xSmall,ySmall,xBig,yBig,feedback);
      var scale = coord.scale;
      var bw = coord.bw;
      var rw = coord.rw;
      var h = coord.h;
      var x = coord.x;
      var y = coord.y;
      var yHorBar = coord.yHorBar;
      var yVerBar = coord.yVerBar;
      var y0Mark = coord.y0Mark;
      var horBarW = coord.horBarW;
      var xEdge = coord.xEdge;
      var xHorBar = coord.xHorBar;
      var xVerBar = coord.xVerBar;
      var xVerEdge = coord.xVerEdge;
   
      var rect = paper.rect(x,y,rw,h).attr(a.rect);
      var edge = paper.rect(xEdge,y,gaugeEdgeW,h).attr(a.edge);
      var totMark = getAllMarks();
      var rod = paper.set(rect,edge);
      var marks = paper.set();
      for(var iMark = 0; iMark < totMark.length; iMark++){
         var diff = totMark[iMark].val;
         var yMark = y0Mark - deltaH*diff*scale;
         var mark = paper.path(["M",x,yMark,"H",x + rw]).attr(a.mark);
         marks.push(mark);
         if(feedback){
            var id = totMark[iMark].id;
            // var str = getNameString(answer.mark[id]);
            var xName = x + gaugeRodW*scale - imageW/4;
            if(minDiff){
               if(xSmall > xBig){
                  xName = x + imageW/4;
               }
            }
            var name = writeName(answer.mark[id],xName,yMark);
            marks.push(name);
         }
      }
      rod.push(marks);
      var horRect = paper.rect(xHorBar,yHorBar,horBarW,bw).attr(a.rect);
      var verRect = paper.rect(xVerBar,yVerBar,bw,gaugeBarH*scale).attr(a.rect);
      var horEdge = paper.rect(xHorBar,yHorBar + bw - gaugeLineW - gaugeEdgeW,horBarW,gaugeEdgeW).attr(a.edge);
      var verEdge = paper.rect(xVerEdge,yVerBar,gaugeEdgeW,gaugeBarH*scale).attr(a.edge);
      var line = paper.rect(xHorBar,yHorBar + bw - gaugeLineW,horBarW,gaugeLineW).attr(a.line);
      if(feedback){
         horEdge.attr("height",4);
         verEdge.attr("width",4);
         line.attr("height",4);
         // rod.toFront();
      }
      var bar = paper.set(horRect,verRect,horEdge,verEdge,line);
      var clip = (feedback) ? [xImage,yImage,imageW,imageH] : [0,yWindow,paperW,windowH];
      return paper.set(rod,bar).attr("clip-rect",clip);
   };

   function drawMark(diff) {
      var last = answer.mark[answer.mark.length - 1];
      for(var iImg = 0; iImg < 2; iImg++){
         var rod = (iImg == 0) ? gaugeObj[0] : feedbackObj.gauge[0];
         var rect = rod[0];
         var h = rect.attr("height");
         var y = rect.attr("y");
         var x = rect.attr("x");
         var scale = (iImg == 0) ? 1 : zoomScale;
         if(minHeight == null){
            var yMark = y + h - diff*deltaH*scale;
         }else{
            if(iImg == 0){
               var yMark = y + h - baseH - diff*deltaH*scale;
            }else{
               var yMark = y + h - diff*deltaH*scale;
            }
         }
         var mark = paper.path(["M",x,yMark,"H",x]).attr(gaugeAttr.mark);
         rod[2].push(mark);
         if(iImg == 1){
            var xName = x + gaugeRodW*scale - imageW/4;
            if(minDiff){
               var id1 = last[0];
               var id2 = last[1];
               var h1 = giraffeHeights[id1];
               var h2 = giraffeHeights[id2];
               if(Math.abs(h2 - h1) != minDiff){
                  var flip = (h1 - h2 > 0);
               }else{
                  var flip = getFlip();
               }
               // console.log(flip)
               if(flip){
                  xName = x + imageW/4;
               }
            }
            var name = writeName(last,xName,yMark).attr("opacity",0);
            rod[2].push(name);
            feedbackObj.mask.toFront();
            feedbackObj.imgFrame.toFront();
            var set = paper.set(mark,name);
            set.attr("clip-rect",[xImage,yImage,imageW,imageH]);
         }
         var anim = new Raphael.animation({ path: ["M",x,yMark,"H",x + gaugeRodW*scale] },animDurationMark,function() {
            if(sim && sim.isPlaying()){
               return
            }
            updateGauge();
         });
         subTask.raphaelFactory.animate("anim"+iImg,mark,anim);
         if(iImg == 1){
            var animName = new Raphael.animation({ opacity: 1 },animDurationMark,function() {
               name.show();
            });
            subTask.raphaelFactory.animate("animName"+iImg,name,animName);
         }
      }
   };

   function getFlip() {
      var diff;
      for(var iMeas = successiveMin.length - 1; iMeas >= 0; iMeas--){
         var pair = successiveMin[iMeas];
         var id1 = pair[0];
         var id2 = pair[1];
         var h1 = giraffeHeights[id1];
         var h2 = giraffeHeights[id2];
         diff = h1 - h2;
      }
      return (diff > 0)
   };

   function writeName(ids,x,y) {
      var a = zoomNamesAttr;
      var str = getNameString(ids);
      var text = paper.text(x,y,str).attr(a.text);
      var bbox = text.getBBox();
      var rect = paper.rect(bbox.x,bbox.y,bbox.width,bbox.height).attr(a.rect);
      text.toFront();
      return paper.set(text,rect)
   };

   function getNameStrings(ids) {
      if(minHeight){
         var ids = [ids];
      }
      var str = [];
      for(var iName = 0; iName < ids.length; iName++){
         var index = Number(ids[iName].substring(4));
         var name = giraffeNames[index].toUpperCase();
         str.push(name);
      }
      return str
   };

   function getNameString(ids) {
      var strings = getNameStrings(ids);
      if(strings.length > 1){
         return strings[0]+","+strings[1]
      }
      return strings[0]
   };

   function drawCheckBox(id) {
      var a = checkBoxAttr;
      var xCheck = xWindow + id*placeW + (placeW - checkBoxW)/2;
      var yCheck = yWindow + windowH + nameH + checkBoxRowH/2 - checkBoxH/2;
      var rect = paper.rect(xCheck,yCheck,checkBoxW,checkBoxH).attr(a.rect);
      var ovW = checkBoxRowH;
      var ovH = ovW;
      var xOv = xCheck + (checkBoxW - ovW)/2;
      var yOv = yCheck + (checkBoxH - ovH)/2;
      var ov = paper.rect(xOv,yOv,ovW,ovH).attr(overlayAttr);
      return paper.set(rect,ov)
   };

   function reloadAnswer() {
      // console.log(JSON.stringify(validGiraffesH))
	  rng.reset(answer.seed);
      giraffeNames = Beav.Object.clone(taskStrings.giraffeNames);
      rng.shuffle(giraffeNames);
	  validGiraffesH = [];
	  nbGoodMarksFound = 0;
	  if(minDiff != null){
         initValidPairs();
      }else{
         initValidGiraffes();
      }
      var measurements = answer.measurements;
      for(var iMeas = 0; iMeas < measurements.length; iMeas++){
         var meas = measurements[iMeas];
         if(minHeight == null){
            var id1 = meas[0];
            var id2 = meas[1];
            var isValid = validPairsHas(id1,id2);
            if(isValid){
               var diff = getActualDiff(isValid.index);
            }
         }else{
            var id = meas;
            var h = giraffeHeights[id];
            if(h == minHeight){
               var index = Beav.Array.indexOf(validGiraffes,id);
               h = getActualHeight(index);
               // console.log(id,index,h)
            }
         }
      }
   };

   function checkResult(noVisual) {
      if(!noVisual){
         displayError("");
      }
      if ((answer.selected.length == 0) ||
	      ((answer.selected.length == 1) && data[level].measureDifferences)) {
         var error = data[level].measureDifferences ? taskStrings.errorNoScarves : taskStrings.errorNoScarf;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      if(noVisual){
         validGiraffesH = [];
         validPairsDiff = [];
      }
      reloadAnswer();
      if(minHeight != null){
         var selID = answer.selected[0];
         if(Beav.Array.has(validGiraffes,selID)){
            var id = Beav.Array.indexOf(validGiraffes,selID);
            var h = getActualHeight(id);
         }else{
            var h = giraffeHeights[selID];
         }
         // console.log(h,selID,id,validGiraffesH)
         if(h != minHeight){
            var error = taskStrings.errorWrongGiraffe+" "+taskStrings.clickRetry;
            if(!noVisual){
               displayError(error);
               answer.validation = true;
               platform.validate("done");
            }
            return { successRate: 0, message: error }
         }
         
         if(!noVisual){
            answer.validation = true;
            platform.validate("done");
         }
         return { successRate: 1, message: taskStrings.success }
      }else{
         var sel = answer.selected;
         var id1 = sel[0];
         var id2 = sel[1];
         var has = validPairsHas(id1,id2);
         // console.log(has,validPairsDiff)
         if(!has || (validPairsDiff[has.index] > 0) || (validPairsDiff[has.index] === undefined)){
            var error = taskStrings.errorWrongPair+" "+taskStrings.clickRetry;
            if(!noVisual){
               displayError(error);
               answer.validation = true;
               platform.validate("done");
            }
            return { successRate: 0, message: error }
         }
         if(!noVisual){
            answer.validation = true;
            platform.validate("done");
         }
         var nbComp = answer.measurements.length;
         if(!target || nbComp <= target){
            return { successRate: 1, message: taskStrings.success }
         }else{
            return { successRate: 0.5, message: taskStrings.halfSuccess+" "+taskStrings.clickRetry }
         }
      }
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

