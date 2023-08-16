   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         paperH: 250,
         avatar: [
            [ 0,   0,   0,   0,   0,   0 ],
            [ 0, 128, 128, 128, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 128, 128, 128,   0 ],
            [ 0,   0,   0,   0,   0,   0 ],
         ],
         habitation: taskStrings.textEasy,
         startMemPos: [
            [ 30, 50 ]
         ],
         startImgDim: [6,7],
         fields: [0],
         nbSides: [1],
         fixedImgDim: true,
         singleHandle: true
      },
      easy: {
         paperH: 500,
         avatar: [
            [ 0,   0,   0,   0,   0,   0 ],
            [ 0, 128, 128, 128, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 255, 255, 128,   0 ],
            [ 0, 128, 128, 128, 128,   0 ],
            [ 0,   0,   0,   0,   0,   0 ],
         ],
         habitation: taskStrings.textMedium,
         startMemPos: [
            [ 0, taskStrings.textMedium.length ],
            [ 0, 42 ]
         ],
         startImgDim: [6,7],
         fields: [0,1],
         nbSides: [1,1],
         fixedImgDim: true,
         singleHandle: true
      },
      medium: {
         paperH: 500,
         avatar: [
            [   0,   0,   0,   0,   0,   0 ],
            [   0, 128, 128, 128, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 128, 128, 128,   0 ],
            [   0,   0,   0,   0,   0,   0 ]
         ],
         habitation: taskStrings.textMedium,
         startMemPos: [
            [ 0, 25 ],
            [ 0, 38 ],
            [ 88, 96 ]
         ],
         startImgDim: [6,8],
         fields: [0,1],
         nbSides: [2,2],
         fixedImgDim: true,
         singleHandle: false
      },
      hard: {
         paperH: 650,
         avatar: [
            [   0,   0,   0,   0,   0,   0 ],
            [   0, 128, 128, 128, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 255, 255, 128,   0 ],
            [   0, 128, 128, 128, 128,   0 ],
            [   0,   0,   0,   0,   0,   0 ]
         ],
         habitation: taskStrings.textHard,
         startMemPos: [
            [ 0, 20 ],
            [ 0, 20 ],
            [ 0, 8 ]
         ],
         startImgDim: [4,4],
         fields: [0,2,1],
         nbSides: [2,1,2],
         fixedImgDim: false,
         singleHandle: false
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
   var bitSize = 6;
   var gridW, gridH;
   var xGrid, yGrid = marginY;
   var xTitle = marginX;
   var yTitle = [];
   var xLabel = [ 125, 93, 230];
   var xButtonFrame = 230;
   var buttonFrameDim = { button: 30, text: 40 };
   var buttonFrameW = 2*buttonFrameDim.button + buttonFrameDim.text;
   var buttonFrameH = 30;
   var pixSize = 10;
   var minImgDim = [1,1];
   var maxImgDim = [9,9];
   var imgDim = [];
   var avatarAreaH = (maxImgDim[1] + 2)*pixSize + marginY;
   // var yAvatarArea, yHabitationArea, yDimensionsArea;
   var yFieldArea = [];
   var fieldAreaH = [30,avatarAreaH,30];
   var yButtons = [];
   var buttonR = 15;
   var arrowW = 13;
   var arrowH = 10;
   var ratioW = 0.4;
   var ratioH = 0.2;

   var memoryW = 110;
   var memoryH = 8;
   var avaMem, habMem, dimMem;
   var xAva, xHab, xDim;
   var fieldMem = [];

   var rng;
   var grid;
   var gridContent = [];
   var avatar;
   var buttonFrameObj = [];
   var fieldButtonObj = [];
   var fieldAreaObj = [];
   var habitation;
   var memoryAreaObj = [];
   var imageFrameObj;
   var imageObj;
   var textObj;
   var dimObj;
   var dragData;
   var fieldMinWidth = [17,17,8];
   var fields;
   var nbSides;

   var fixedImgDim;

   var titleStr = [ taskStrings.habitation, taskStrings.avatar, taskStrings.dimensions ];
   var labelStr = [ taskStrings.text, taskStrings.image, taskStrings.twoInt ];
   var nbFields;

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#9b9b9b",
      green: "#9acc68",
      darkGreen: "#557e2b"
   };
   var fieldColor = [colors.green,colors.blue,colors.yellow];

   var gridLineAttr = {
      stroke: colors.black,
      "stroke-width": 1
   };
   var bitAttr = {
      0: {
         stroke: "none",
         fill: "none"
      },
      1: {
         stroke: "none",
         fill: colors.black
      }
   };
   var titleAttr = {
      "font-size": 18,
      "font-weight": "bold",
      fill: colors.black,
      "text-anchor": "start"
   };
   var labelAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.grey,
      "text-anchor": "start"
   };
   var buttonFrameAttr = {
      button: {
         stroke: "none",
         fill: colors.blue,
         r: 3
      },
      buttonText: {
         "font-size": 20,
         "font-weight": "bold",
         fill: "white"
      },
      screen: {
         stroke: "none",
         fill: "white",
         opacity: 0.8
      },
      screenText: {
         "font-size": 16,
         fill: colors.black
      }
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var memoryAreaAttr = {
      rect: {
         stroke: "none",
         opacity: 0.3
      },
      line: {
         "stroke-width": 3
      },
      lineThin: {
         "stroke-width": 1,
         "opacity": 0.5
      }
   };
   var buttonAttr = {
      arrowCircle: {
         stroke: "none",
         fill: colors.yellow,
         r: buttonR
      },
      arrow: {
         stroke: "white",
         "stroke-width": 3,
         "stroke-linejoin": "round",
         fill: "white"
      },
      dragCircle: {
         stroke: "none",
         r: buttonR
      },
      dragIcon: {
         stroke: "white",
         "stroke-width": 3,
         fill: "none",
         "stroke-linecap": "round"
      }
   };
   var fieldLineAttr = {
      stroke: colors.black,
      "stroke-width": 0.5
   };
   var imageFrameAttr = {
      stroke: colors.blue,
      "stroke-width": 3,
      r: 1
   };
   var pixelAttr = {
      stroke: colors.black,
      "stroke-width": 1
   };
   var habTextAttr = {
      "font-size": 18,
      "font-weight": "bold",
      "font-family": "monospace",
      fill: colors.darkGreen
   };
   var dimTextAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.darkYellow
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      avatar = Beav.Object.clone(data[level].avatar);
      habitation = data[level].habitation;
      fields = data[level].fields;
      nbFields = fields.length;
      fixedImgDim = data[level].fixedImgDim;
      nbSides = data[level].nbSides;

      imgDim[0] = avatar[0].length;
      imgDim[1] = avatar.length;
      gridW = memoryW*bitSize;
      gridH = memoryH*bitSize;
      xGrid = (paperW - gridW)/2;

      for(var iField = 0; iField < nbFields; iField++){
         var fieldID = fields[iField];
         if(iField == 0){
            yTitle[iField] = yGrid + gridH + 50;
         }else{
            yTitle[iField] = yFieldArea[iField - 1] + fieldAreaH[fields[iField - 1]] + 2*buttonR + 80;
         }
         yFieldArea[iField] = (fieldID == 1) ? yTitle[iField] + 40 : yTitle[iField] + 20;
         yButtons[iField] = yFieldArea[iField] + fieldAreaH[fieldID] + buttonR + 5;
      }

      paperH = data[level].paperH;

      initGridContent();

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

   subTask.resetDisplay = function() {
      displayError("");
      initPaper();
      initGrid();
      initFields();
      initHandlers();

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
         seed: rng.nextInt(0,1000),
         // imageDim: [Math.floor(maxImgDim[0] - minImgDim[0])/2,Math.floor(maxImgDim[1] - minImgDim[1])/2],
         imageDim: data[level].startImgDim.slice(),
         memPos: Beav.Object.clone(data[level].startMemPos)
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

      $("#zone_2 .overlay").remove();
      $("#zone_2").css({ position: "relative", "padding-top": "1px" });
      var y0 = 38;
      var x,y,w,h;
      var nbOverlays = 2;
      if(level == "hard"){
         nbOverlays = 4;
      }
      for(var iOver = 1; iOver <= nbOverlays; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = y0;
               w = paperW;
               h = yButtons[0];
               break;
            case 2:
               x = 0;
               y = y0 + yButtons[0] + 2*buttonR;
               w = paperW;
               h = (fields.length == 1) ? y0 + paperH - y : y0 + yButtons[1] - y;
               break;
            case 3:
               x = 0; 
               y = y0 + yButtons[1] + 2*buttonR;
               w = paperW;
               h = y0 + yTitle[2] - y;
               break;
            case 4:
               x = 0; 
               y = y0 + yTitle[2] + buttonFrameH;
               w = paperW;
               h = y0 + yButtons[2] - y;
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

   function initGridContent() {
      avaMem = imgDim[0]*imgDim[1];
      habMem = habitation.length;
      dimMem = 8;
      var totalMem = avaMem + habMem + dimMem + 3;
      xAva = rng.nextInt(0,memoryW - totalMem - 1);
      xHab = rng.nextInt(xAva + avaMem, memoryW - dimMem - habMem - 4);
      xDim = rng.nextInt(xHab + habMem, memoryW - dimMem - 3);
      if (xDim % 4 != 0) {
         xDim += 4 - (xDim % 4);
      }
      //console.log("xAva : " + xAva + ", xHab : " + xHab + ", xDim : " + xDim);
      for(var iRow = 0; iRow < memoryH; iRow++){
         gridContent[iRow] = [];
         for(var iCol = 0; iCol < memoryW; iCol++){
            gridContent[iRow][iCol] = getBitValue(iRow,iCol);
         }
      }
      fieldMem = [habMem,avaMem,dimMem];
   };

   function initGrid() {
      grid = Grid.fromArray("paper", paper, gridContent, cellFiller, bitSize, bitSize, xGrid, yGrid, gridLineAttr);
      initMemoryAreas();
   };

   function initMemoryAreas() {
      var attr = memoryAreaAttr;
      for(var iField = 0; iField < nbFields; iField++){
         var x1 = xGrid + answer.memPos[iField][0]*bitSize;
         var x2 = xGrid + answer.memPos[iField][1]*bitSize;
         var w = x2 - x1;
         var h = gridH;
         var y = yGrid;
         var col = fieldColor[iField];
         var rect = paper.rect(x1,y,w,h).attr(attr.rect).attr("fill",col);
         var y1 = y - 10;
         var y2 = y + h + 10;
         var line1 = paper.path(["M",x1,y1,"V",y2]).attr(attr.line).attr("stroke",col);
         var line2 = paper.path(["M",x2,y1,"V",y2]).attr(attr.line).attr("stroke",col);
         memoryAreaObj[iField] = { rect: rect, lines: [ line1, line2 ], linesThin: [ line1, line2] }
      }
   };

   function initFields() {
      var x = xTitle;
      for(var iField = 0; iField < nbFields; iField++){
         var fieldID = fields[iField];
         var y = yTitle[iField];
         var title = titleStr[fieldID];
         var label = labelStr[fieldID];
         if(fixedImgDim && fieldID == 1){
            label = taskStrings.fixedImage;
         }
         // console.log(iField,x,y)
         if(level != "hard" && fieldID == 1){
            title = taskStrings.imageDimensions(imgDim[0],imgDim[1]);
         }
         xTitle = x;
         if (typeof(enableRtl) != "undefined") {
            xTitle += 750;
         }
         paper.text(xTitle,y,title).attr(titleAttr);
         /*
         if(level != "hard" && fieldID == 1){
            paper.text(xLabel[fieldID],y,taskStrings.imageDimensions(imgDim[0],imgDim[1])).attr(labelAttr);
         }else{
            paper.text(xLabel[fieldID],y,label).attr(labelAttr);
         }
         */
         switch(fieldID){
            case 0:
               initHabitation();
               break;
            case 1:
               initAvatar();
               break;
            case 2:
               initDimensions();
         }
      }
   };

   function initAvatar() {
      var fieldPos = (level == "hard") ? 2 : 1;
      for(var iDim = 0; iDim < 2; iDim++){
         var x = xButtonFrame + iDim*(buttonFrameW + 120);
         var y = yTitle[fieldPos] - buttonFrameH/2;
         var val = answer.imageDim[iDim];
         if(!fixedImgDim){
            buttonFrameObj[iDim] = drawButtonFrame(x,y,val);
         }
         if(!fixedImgDim && iDim == 0){
            var xText = x + buttonFrameW + 10;
            if (typeof(enableRtl) != "undefined") {
               xText += 300;
            }
            paper.text(xText,yTitle[fieldPos],taskStrings.height).attr(titleAttr);
            xText += 220;
            if (typeof(enableRtl) != "undefined") {
               xText -= 30 + 440;
            }
            paper.text(xText,yTitle[fieldPos],taskStrings.width).attr(titleAttr);
         }

      }
      initFieldArea(1);
      updateImage();
   };

   function initHabitation() {
      initFieldArea(0);
      updateText();
   };

   function initDimensions() {
      initFieldArea(2);
      updateDimensions();
   };

   function initFieldArea(id) {
      var fieldPos = Beav.Array.indexOf(fields,id);
      var attr = memoryAreaAttr;
      var col = fieldColor[id];
      var x1 = xGrid + answer.memPos[id][0]*bitSize;
      var x2 = xGrid + answer.memPos[id][1]*bitSize;
      var w = x2 - x1;
      var h = fieldAreaH[id];
      var y = yFieldArea[fieldPos];
      var rect = paper.rect(x1,y,w,h).attr(attr.rect).attr("fill",col);
      var y1 = y - 5;
      var y2 = y + h + 10;
      var line1 = paper.path(["M",x1,y1,"V",y2]).attr(attr.line).attr("stroke",col);
      var line2 = paper.path(["M",x2,y1,"V",y2]).attr(attr.line).attr("stroke",col);
      var lineThin1 = paper.path(["M",x1,yGrid,"V",y2]).attr(attr.lineThin).attr("stroke",col);
      var lineThin2 = paper.path(["M",x2,yGrid,"V",y2]).attr(attr.lineThin).attr("stroke",col)
      fieldAreaObj[id] = {
         rect: rect,
         lines: [ line1, line2 ],
         linesThin: [ lineThin1, lineThin2 ]
      };
      var buttons = [];
      var yButton = yButtons[fieldPos];
      var nbSi = nbSides[fieldPos];

      for(var iSide = 0; iSide < nbSi; iSide++){
         var x = (iSide == 0) ? x1 : x2;
         buttons[iSide] = drawButtons(x,yButton,col);
      }
      fieldButtonObj[id] = buttons;
      if(fieldPos < nbFields - 1){
         var yLine = (id == 1) ? yButton + buttonR + marginY : yButton + buttonR + 2.5*marginY;
         paper.path(["M",marginX,yLine,"H",paperW - marginX]).attr(fieldLineAttr);
      }
   };

   function initHandlers() {
      if(!fixedImgDim){
         for(var iDim = 0; iDim < 2; iDim++){
            for(var iButton = 0; iButton < 2; iButton++){
               buttonFrameObj[iDim].buttons[iButton].click(clickButtonFrame(iDim,iButton));
               buttonFrameObj[iDim].buttons[iButton].attr("cursor","pointer");
            }
         }
      }

      for(var iField = 0; iField < nbFields; iField++){
         var fieldPos = Beav.Array.indexOf(fields,iField);
         var nbSi = nbSides[fieldPos];

         for(var iSide = 0; iSide < nbSi; iSide++){
            initButtonHandlers(iField,iSide);
         }
      }
   };

   function initButtonHandlers(field,side) {
//      var arrButtons = fieldButtonObj[field][side][1];
      var dragButton = fieldButtonObj[field][side][0];
/*      for(var iDir = 0; iDir < 2; iDir++){
         arrButtons[iDir].click(clickArrow(field,side,iDir));
         arrButtons[iDir].attr("cursor","pointer");
      }
*/
      Beav.dragWithTouch(dragButton, onMove, onStart(field,side), onEnd);
      dragButton.attr("cursor","grab");
   };

   function onStart(field,side) {
      return function() {
         displayError("");
         dragData = { field: field, side: side };
         var startPos = answer.memPos[field][side];
         dragData.startPos = startPos;
         memoryAreaObj[field].rect.toFront()
         for(var iSide = 0; iSide < 2; iSide++){
            memoryAreaObj[field].lines[iSide].toFront();
            memoryAreaObj[field].linesThin[iSide].toFront();
         }
      }
   };

   function onMove(dx,dy,x,y,ev) {
      var field = dragData.field;
      var side = dragData.side;
      var startPos = dragData.startPos;
      var obj = fieldButtonObj[field][side];
      var step = (field < 2) ? Math.floor(dx/bitSize) : 4*Math.floor(dx/(4*bitSize));
      var limits = getLimits(field,side);
      var minVal = limits.min, maxVal = limits.max;

      if(startPos + step > maxVal){
         step = maxVal - startPos;
      }else if(startPos + step < minVal){
         step = minVal - startPos;
      }
      // console.log(step)
      answer.memPos[field][side] = startPos + step;
      if(field == 2){
         answer.memPos[field][1] = answer.memPos[field][0] + 8;
      } else if(data[level].singleHandle){
         var mem = habMem;
         if (field == 1) {
            mem = avaMem;
         }
         answer.memPos[field][1] = answer.memPos[field][0] + mem;
      }
      // console.log(answer.memPos[field][side])
      obj[0].transform(["T",step*bitSize,0]);
      //obj[1][1].transform(["T",step*bitSize,0]);
      //obj[1][0].transform(["R",180,"T",step*bitSize,0]);
      updateField(field,false);
   };

   function onEnd() {
      var field = dragData.field;
      updateFieldArea(field,true);
   };
/*
   function clickArrow(field,side,dir) {
      return function() {
         var fieldPos = Beav.Array.indexOf(fields,field);
         var nbSi = nbSides[fieldPos];
         // console.log(field,side,dir)
         displayError("");
         var step = (field < 2) ? 1 : 4;
         var increment = (dir == 0) ? -step : step;
         var limits = getLimits(field,side);
         answer.memPos[field][side] = Math.min(limits.max,Math.max(limits.min,answer.memPos[field][side] + increment));
         if(nbSi < 2){
            answer.memPos[field][1] = answer.memPos[field][0] + fieldMem[field];
         }
         updateField(field,true);
      }
   };
*/
   function clickButtonFrame(dim,button) {
      return function() {
         var increment = (button == 0) ? -1 : 1;
         var currVal = answer.imageDim[dim];
         var newVal = Math.min(maxImgDim[dim], Math.max(minImgDim[dim],currVal + increment));
         answer.imageDim[dim] = newVal;
         buttonFrameObj[dim].text.attr("text",newVal);
         updateImage();
      }
   };

   function updateField(field, moveButton) {
      updateFieldArea(field,moveButton);
      switch(field){
         case 0:
            updateText();
            break;
         case 1:
            updateImage();
            break;
         case 2:
            updateDimensions();
      }
   };

   function updateFieldArea(id,moveButton) {
      var obj = fieldAreaObj[id];
      var memObj = memoryAreaObj[id];
      var x1 = xGrid + answer.memPos[id][0]*bitSize;
      var x2 = xGrid + answer.memPos[id][1]*bitSize;
      var w = x2 - x1;
      var newPos = [x1,x2];

      obj.rect.attr({ x: x1, width: w });
      memObj.rect.attr({ x: x1, width: w });
      for(var iSide = 0; iSide < 2; iSide++){
         var path = obj.lines[iSide].attr("path");
         var newX = newPos[iSide];
         path[0][1] = newX;
         obj.lines[iSide].attr("path",path);

         var pathThin = obj.linesThin[iSide].attr("path");
         var newX = newPos[iSide];
         pathThin[0][1] = newX;
         obj.linesThin[iSide].attr("path",pathThin);


         var memPath = memObj.lines[iSide].attr("path");
         memPath[0][1] = newX;
         memObj.lines[iSide].attr("path",memPath);
      }
      if(moveButton){
         // var fieldPos = Beav.Array.indexOf(fields,field);
         updateButtonPos(id,newPos);
      }
   };

   function updateButtonPos(id,newPos) {
      var fieldPos = Beav.Array.indexOf(fields,id);
      var nbSi = nbSides[fieldPos];

      for(var iSide = 0; iSide < nbSi; iSide++){
         fieldButtonObj[id][iSide].remove();
         var newX = newPos[iSide];
         var col = fieldColor[id];
         fieldButtonObj[id][iSide] = drawButtons(newX,yButtons[fieldPos],col);
         initButtonHandlers(id,iSide);
      }
   };

   function updateImage() {
      var x1Area = xGrid + answer.memPos[1][0]*bitSize;
      var x2Area = xGrid + answer.memPos[1][1]*bitSize;
      var aW = x2Area - x1Area;
      var aH = fieldAreaH[1];
      var currW = answer.imageDim[0];
      var currH = answer.imageDim[1];
      var w = currW*pixSize;
      var h = currH*pixSize;
      var x1 = x1Area + (aW - w)/2;
      var fieldPos = (level == "hard") ? 2 : 1;
      var y1 = yFieldArea[fieldPos] + (aH - h)/2;
      // console.log(yFieldArea[fieldPos],aH,h)
      var nbPix = answer.memPos[1][1] - answer.memPos[1][0];
      var addRow = 0;
      if(nbPix > currW*currH){
         addRow += Math.min(2,(nbPix - currW*currH)/currW);
      }
      var imageSet = paper.set();
      var pixels = [];
      for(var iRow = 0; iRow < currH + addRow; iRow++){
         var yPix = y1 + iRow*pixSize;
         for(var iCol = 0; iCol < currW; iCol++){
            var xPix = x1 + iCol*pixSize;
            var pixID = currW*iRow + iCol;
            if(pixID > nbPix - 1){
               break;
            }
            if((nbPix - currW*currH)/currW <= 2 || pixID < currW*(currH + addRow) - 3){
               pixels[pixID] = paper.rect(xPix,yPix,pixSize,pixSize).attr(pixelAttr);
               var pixVal = getByteValue(pixID + answer.memPos[1][0],0);
               // console.log(pixVal)
               var col = "rgb("+pixVal+","+pixVal+","+pixVal+")";
               pixels[pixID].attr("fill",col);
               imageSet.push(pixels[pixID]);
            }else{
               var dot = paper.circle(xPix + pixSize/2,yPix + pixSize/2,1).attr(pixelAttr);
               imageSet.push(dot);
            }
         }
      }
      if(!imageFrameObj){
         imageFrameObj = paper.rect(x1,y1,w,h).attr(imageFrameAttr);
      }else{
         imageFrameObj.attr({
            x: x1, y: y1, width: w, height: h
         }).toFront();
      }
      if(imageObj){
         imageObj.imageSet.remove();
      }
      imageObj = { imageSet: imageSet, pixels: pixels };
   };

   function updateText() {
      var col1 = answer.memPos[0][0];
      var col2 = answer.memPos[0][1];
      var x1 = xGrid + col1*bitSize;
      var x2 = xGrid + col2*bitSize;
      var w = x2 - x1;
      var xText = x1 + w/2;
      var yText = yFieldArea[0] + fieldAreaH[0] + 2*buttonR + 25;
      var str = "";
      for(var col = col1; col < col2; col++){
         var val = getByteValue(col,0);
         if (val < 32) {
            str += "?";
         } else {
            str += String.fromCharCode(val);
         }
      }
      if(!textObj){
         textObj = paper.text(xText,yText,str).attr(habTextAttr);
      }else{
         textObj.attr({ text: str, x: xText });
      }
   };

   function updateDimensions() {
      var fieldID = 2;
      var fieldPos = Beav.Array.indexOf(fields,fieldID);

      var col1 = answer.memPos[2][0];
      var col2 = answer.memPos[2][1];
      var x1 = xGrid + col1*bitSize;
      var x2 = xGrid + col2*bitSize;
      var w = x2 - x1;
      var xDim = x1 + w/2;
      var yDim2 = yFieldArea[fieldID] + fieldAreaH[fieldID] + 2*buttonR + 25;
      var yDim = yFieldArea[fieldPos] + fieldAreaH[fieldID] + 2*buttonR + 25;
      // console.log(yDim,yDim2)
      var str = "";
      var val = [0,0];
      for(var iDim = 0; iDim < 2; iDim++){
         var start = col1 + iDim*4;
         var end = start + 3;
         for(var col = start; col <= end; col++){
            val[iDim] += getByteValue(col,end - col);
         }
      }
      str = val[0]+", "+val[1];
      if(!dimObj){
         dimObj = paper.text(xDim,yDim,str).attr(dimTextAttr);
      }else{
         dimObj.attr({ text: str, x: xDim });
      }
   };

   function getLimits(field,side) {
      var fieldPos = Beav.Array.indexOf(fields,field);
      var nbSi = nbSides[fieldPos];
      var min, max;
      // if(field == 0 && side == 0){
      //    min = 0;
      // }else{
      min = (side == 0) ? 0 : answer.memPos[field][0] + fieldMinWidth[field];
         // min = (side == 0) ? answer.memPos[field - 1][1] : answer.memPos[field][0] + fieldMinWidth[field];
      // }
      if(field == 2){
         max = memoryW - fieldMinWidth[2] - 2;
      }else if(nbSi < 2){
         max = memoryW - fieldMem[field];
      }else{
         max = (side == 1) ? memoryW : answer.memPos[field][1] - fieldMinWidth[field];
         // max = (side == 1) ? answer.memPos[field + 1][0] : answer.memPos[field][1] - fieldMinWidth[field];
      }
      return { min: min, max: max }
   };

   function getByteValue(col,oct) {
      var val = 0;
      for(var iRow = 0; iRow < 8; iRow++){
         var bit = gridContent[iRow][col];
         val += bit*Math.pow(2,iRow + oct*8);
      }
      return val
   };

   function getBitValue(row,col) {
      if(col >= xAva && col < xAva + avaMem){
         var pixCol = (col - xAva)%imgDim[0];
         var pixRow = Math.floor((col - xAva)/imgDim[0]);
         var val = avatar[pixRow][pixCol];
         var bit = getBitFromVal(val,row);
         return bit
      }
      if(col >= xHab && col < xHab + habMem){
         var index = col - xHab;
         var val = habitation.charCodeAt(index);
         var bit = getBitFromVal(val,row);
         return bit
      }
      if(col >= xDim && col < xDim + dimMem){
         if(col - xDim < 4){
            var byte = col - xDim;
            var val = imgDim[0];
         }else{
            var byte = col - xDim - 4;
            var val = imgDim[1];
         }
         if(byte < 3){
            return 0
         }
         var bit = getBitFromVal(val,row);
         return bit
      }
      var fillValues = "#>$%&@[\|+=~";
      return getBitFromVal(fillValues.charCodeAt(col % fillValues.length), row);
   };

   function getBitFromVal(val,row) {
      var bin = val.toString(2);
      var bit = bin.charAt(bin.length - row - 1) || 0;
      return bit
   };

   function cellFiller(cellData, paper) {
      var x = cellData.xPos;
      var y = cellData.yPos;
      var w = bitSize, h = bitSize;
      var row = cellData.row;
      var col = cellData.col;
      var entry = cellData.entry;
      var attr = bitAttr[entry];
      var rect = paper.rect(x,y,w,h).attr(attr);
      return [rect]
   };

   function drawButtonFrame(x,y,val) {
      var attr = buttonFrameAttr;
      var dim = buttonFrameDim;
      var w = buttonFrameW;
      var h = buttonFrameH;
      var frame = paper.rect(x,y,w,h).attr(attr.button);
      var xScreen = x + dim.button;
      var wScreen = dim.text;
      var screen = paper.rect(xScreen,y,wScreen,h).attr(attr.screen);
      var str = val;
      var xText = xScreen + wScreen/2;
      var yText = y + h/2;
      var text = paper.text(xText,yText,str).attr(attr.screenText);
      var buttons = []
      for(var iButton = 0; iButton < 2; iButton++){
         var char = (iButton == 0) ? "-" : "+";
         var xChar = x + dim.button/2 + iButton*(dim.button + dim.text);
         paper.text(xChar,yText,char).attr(attr.buttonText);
         var xOverlay = xChar - dim.button/2;
         var overlayW = dim.button;
         buttons[iButton] = paper.rect(xOverlay,y,overlayW,h).attr(overlayAttr);
      }
      return { buttons: buttons, text: text }
   };

   function drawButtons(x,y,col) {
      var attr = buttonAttr;
      var r = buttonR;
      var dragCirc = paper.circle(x,y).attr(attr.dragCircle).attr("fill",col);
      var dragIcon = drawDragIcon(x,y,attr.dragIcon);
      var dragButton = paper.set(dragCirc,dragIcon);
      /*
      var arrowButtons = paper.set();
      for(var iSide = 0; iSide < 2; iSide++){
         var xButton = x - 2*r - 2 + iSide*(4*r + 4);
         var circ = paper.circle(xButton,y).attr(attr.arrowCircle);
         var arr = getShape(paper,"arrow",xButton,y,{ arrowW, arrowH, ratioW, ratioH }).attr(attr.arrow);
         var angle = (iSide == 0) ? 180 : 0;
         arr.transform(["R",angle]);
         var arrButton = paper.set(circ,arr);
         arrowButtons.push(arrButton);
      }*/
      return paper.set(dragButton);//,arrowButtons)
   };

   function drawDragIcon(x,y,attr) {
      var xStep = 5;
      var h = 10;
      var x1 = x - xStep;
      var x2 = x;
      var x3 = x + xStep;
      var y1 = y - h/2;
      var y2 = y + h/2;
      return paper.path(["M",x1,y1,"V",y2,"M",x2,y1,"V",y2,"M",x3,y1,"V",y2]).attr(attr)
   };

   function checkResult(noVisual) {
      var targetMems = [habMem,avaMem,dimMem];
      for(var iField = 0; iField < nbFields; iField++){
         // var fieldPos = Beav.Array.indexOf(fields,iField);
         var fieldID = fields[iField];
         var pos = answer.memPos[fieldID];
         var mem = pos[1] - pos[0];
         var targetMem = targetMems[fieldID];
         // console.log(iField,fieldID,mem,targetMem)
         if(mem != targetMem){
            var error = taskStrings.errorMemSize(fieldID);
            if(!noVisual){
               displayError(error);
            }
            return { successRate: 0, message: error }
         }

         if(fieldID < 2){
            for(var col = pos[0]; col < pos[1]; col++){
               var val = getByteValue(col,0);
               if(fieldID == 1){
                  var pixCol = (col - pos[0])%imgDim[0];
                  var pixRow = Math.floor((col - pos[0])/imgDim[0]);
                  var targetVal = avatar[pixRow][pixCol];
               }else{
                  var targetVal = habitation.charCodeAt(col - pos[0]);
               }
               if(val != targetVal){
                  var error = taskStrings. errorMemLocation(fieldID);
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
               }
            }
         }else{
            var val = [0,0];
            for(var iDim = 0; iDim < 2; iDim++){
               var start = pos[0] + iDim*4;
               var end = start + 3;
               for(var col = start; col <= end; col++){
                  val[iDim] += getByteValue(col,end - col);
               }
            }
            if(val[0] != imgDim[0] || val[1] != imgDim[1]){
               var error = taskStrings. errorMemLocation(fieldID);
               if(!noVisual){
                  displayError(error);
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

