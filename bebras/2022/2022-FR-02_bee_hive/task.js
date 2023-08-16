   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         immediateFeedback: true,
         ruleType: "fullHive",
         // types: 
         // 0 -> existing cell at this location
         // 1 -> cell where the bee can be placed
         // 2 -> forbidden cell
         hive: [
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
         ],
         rules: [
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 1 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 0 },
            ],
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 1 },
               { row: 4, col: 1, type: 0 },
            ],
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 1 },
            ],
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 1 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 1 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 1, type: 1 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 1 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 0 }
            ]
         ]
      },
      easy: {  
         immediateFeedback: false,
         ruleType: "threeCells",
         hive: [
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
         ],
         rules: [
            [
               { row: 0, col: 0, type: 0 },
               { row: 1, col: 1, type: 1 },
               { row: 0, col: 2, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 1, col: 1, type: 0 },
               { row: 2, col: 2, type: 1 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 0 },
               { row: 4, col: 0, type: 1 }
            ],
            [
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 0 },
               { row: 0, col: 2, type: 1 }
            ],
            [
               { row: 3, col: 0, type: 1 },
               { row: 2, col: 1, type: 0 },
               { row: 0, col: 1, type: 0 }
            ],
            [
               { row: 1, col: 0, type: 1 },
               { row: 0, col: 1, type: 0 },
               { row: 2, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 1 },
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 0 }
            ]
         ]
      },
      medium: {
         immediateFeedback: false,
         ruleType: "threeCells",
         hive: [
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
         ],
         rules: [
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 1 }
            ],
            [
               { row: 1, col: 0, type: 0 },
               { row: 0, col: 1, type: 2 },
               { row: 2, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 0 },
               { row: 3, col: 1, type: 1 }
            ],
            [
               { row: 0, col: 0, type: 2 },
               { row: 1, col: 1, type: 0 },
               { row: 0, col: 2, type: 0 }
            ],
            [
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 0 },
               { row: 0, col: 2, type: 1 }
            ],
            [
               { row: 0, col: 0, type: 2 },
               { row: 2, col: 0, type: 0 },
               { row: 3, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 1 },
               { row: 4, col: 0, type: 0 }
            ]
         ]
      },
      hard: {
         immediateFeedback: false,
         ruleType: "criteria",
         hive: [
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
            [null,null,null],
         ],
         rules: [
            [
               { row: 1, col: 0, type: 0 },
               { row: 0, col: 1, type: 2 },
               { row: 2, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 2 },
               { row: 1, col: 1, type: 0 }
            ],
            [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 1 }
            ],
            [
               { row: 1, col: 0, type: 0 },
               { row: 0, col: 1, type: 0 },
               { row: 2, col: 1, type: 1 }
            ],
            [
               { row: 0, col: 0, type: 1 },
               { row: 2, col: 0, type: 0 },
               { row: 1, col: 1, type: 0 }
            ]
         ],
         beeRules: [
            [0],
            [1],
            [2],
            [0,4],
            [2,4],
            [0,3],
            [1,3]
         ]
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
   var introPapers = [];
   var introPaperW = 90;
   var introPaperH = 170;

   var marginX = 20;
   var marginY = 20;

   var cellSide = 40;
   var cellAngle = 30*Math.PI/180;
   var cellCos = cellSide*Math.cos(cellAngle);
   var cellSin = cellSide*Math.sin(cellAngle);
   var cellH = 2*cellCos;
   var cellW = cellSide + 2*cellSin;
   var hiveH = 3*cellH;
   var hiveW = cellSide + 2*cellW;

   var y0Intro = marginY;
   var introW = paperW/2;
   var introH = 0;

   var nbBees = 7;
   var hiveMargin = 2.7*marginX;
   var x0Hive = (paperW - hiveW) / 2;
   var y0Hive = y0Intro + introH + marginY;
   var beeW = cellH;
   var beeH = cellH;
   var beeSpacing = 30;
   var x0Bee = 15;
   var y0Bee = y0Hive + hiveH + cellH/2;

   var yLine = y0Bee + cellH + marginY;
   var y0Rule = yLine + marginY;
   var ruleIconH = beeH;
   var ruleIconW = beeW;
   var ruleFrameSpacing = 2*marginX;
   var x0RuleIcon;

   var ruleScale = 0.4;

   var nbRows;
   var nbCol;
   var nbRules;
   
   //    |   | x |   |
   //    | x |   | x |
   //    |   | x |   |
   //    | x |   | x |
   //    |   | x |   |

   
   var hiveObj = [];
   var beeCells = [];
   var bees = [];
   var beeIDs = [];
   var hiveIDs = [];
   var allHiveIDs = [];
   var highlightObj;
   var ruleObj = [];
   var initHive;

   var rules;
   var beeRules;

   var dragAndDrop;

   var beesSrc = $("#bees").attr("src");
   var ruleIconSrc = function(id) {
      return $("#rule_icon_"+(id + 1)).attr("src")
   };
   var crossSrc = $("#cross").attr("src");

   var colors = {
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      gold: "#ffe8a7",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      seaBlue: "#0e5667",
      grey: "#e2e2e2",
      darkGrey: "#616161",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ee2d7c",
      lightPink: "#fac2c7",
      orange: "#f6891e"
   };

   var cellAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      fill: "white"
   };
   var fullCellAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      fill: colors.gold
   };
   var beeCellAttr = {
      stroke: "black",
      fill: colors.gold,
      opacity: 1
   };
   var emptyCellAttr = {
      stroke: "black",
      fill: colors.gold,
      opacity: 0.2
   };
   var highlightAttr = {
      stroke: "red",
      "stroke-width": 3,
      "stroke-dasharray": [],
      fill: "none"
   };
   var placeHolderAttr = {
      stroke: colors.gold,
      "stroke-width": 3,
      "stroke-dasharray": ["."],
      fill: "none"
   };
   var ruleCellAttr = [
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: "white"
      },
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: colors.gold
      },
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: "white"
      }
   ];
   var ruleFrameAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      fill: "none",
      r: 5,
      opacity: 1
   };
   var introFrameAttr = {
      stroke: colors.black,
      "stroke-width": 2
   };
   var introRuleCellAttr = [
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: colors.grey
      },
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: colors.darkGrey
      },
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: colors.grey
      }
   ];
   var arrowAttr = {
      stroke: colors.black,
      "stroke-width": 2,
      "arrow-end": "classic-wide-long"
   };
   var lineAttr = {
      stroke: colors.black,
      "stroke-width": 2
   };
   var introTextAttr = {
      "font-size": 14,
      "font-weight": "bold",
      fill: colors.black
   };
   var questionMarkAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };
   var ruleHighlightAttr = {
      fill: "red",
      "fill-opacity": 0.5
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
      // rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      rules = data[level].rules;
      beeRules = data[level].beeRules;
      initHive = data[level].hive;
      nbRows = initHive.length;
      nbCol = initHive[0].length;
      if(beeRules){
         nbRules = rules.length;
         x0RuleIcon = x0Bee + (paperW - x0Bee - nbRules*ruleIconW - (nbRules - 1)*ruleFrameSpacing)/2;
      }
      if(data[level].ruleType != "criteria"){
         paperH = y0Rule + hiveH*ruleScale + marginY;
      }else{
         paperH = y0Rule + ruleIconH + marginY + hiveH*ruleScale + marginY;
      }
      initBeeIDs();

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
      // rng.reset(answer.seed);
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultAnswer = {
         // seed: rng.nextInt(0,1000),
         hive: Beav.Matrix.make(nbRows,nbCol,null)
      };
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var id = initHive[row][col];
            if(id != null){
               var beeID = beeIDs[id];
               defaultAnswer.hive[row][col] = beeID;
            }
         }
      }

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
      displayError("");
      initPaper();
      initIntro();
      initDragDrop();
      initBees();
      reloadAnswer();

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function initBeeIDs() {
      for(var iBee = 0; iBee < nbBees; iBee++){
         var beeID = "bee_"+iBee;
         beeIDs[iBee] = beeID;
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h;
      for(var iOver = 1; iOver <= 6; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = y0Hive;
               break;
            case 2:
               x = 0; y = 0;
               w = x0Hive;
               h = y0Bee;
               break;
            case 3:
               x = x0Hive + hiveW; 
               y = 0;
               w = paperW - x;
               h = y0Bee;
               break;
            case 4:
               x = 0; y = y0Bee;
               w = x0Bee;
               h = paperH - y;
               break;
            case 5:
               x = x0Bee + nbBees*(cellW + beeSpacing) - beeSpacing; 
               y = y0Bee;
               w = paperW - x;
               h = paperH - y;
               break;
            case 6:
               x = x0Bee;
               y = y0Bee + cellH;
               w = paperW - x; 
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

   function initIntro() {
      var nbIntro = 1;
      for(var iRule = 0; iRule < rules.length; iRule++) {
         var rule = rules[iRule]
         if(nbIntro == 2){
            break;
         }
         for(var iData = 0; iData < rule.length; iData++){
            var cData = rule[iData];
            if(cData.type == 2){
               nbIntro = 2;
               break;
            }
         }
      }
      for(var iIntro = 0; iIntro < nbIntro; iIntro++){
         var id = "intro" + (1 + iIntro);
         introPapers[iIntro] = subTask.raphaelFactory.create(id,id, introPaperW, introPaperH);
         $("#"+id).css({
            width: introPaperW+"px",
            height: introPaperH+"px",
            float: (iIntro == 0) ? "right" : "left",
            margin: (iIntro == 0) ? "0 0 0 10px" : "0 10px 0 0"
         });
         drawIntro(iIntro);
      } 
   };

   function initDragDrop() {
      dragAndDrop = DragAndDropSystem({
         paper : paper,
         displayHelper: displayHelper,
         drop : function(srcContId, srcPos, dstContId, dstPos, type) {
            unhighlightAllCells();
            if(Beav.Array.has(beeIDs,dstContId)){
               var beeID = Beav.Array.indexOf(beeIDs,dstContId);
               beeCells[beeID].attr(beeCellAttr);
            }else if(Beav.Array.has(allHiveIDs,dstContId)){
               var pos = getCellPosFromID(dstContId);
               hiveObj[pos.row][pos.col].attr(fullCellAttr);
            }
            saveAnswer();
            if(data[level].immediateFeedback && dstContId != null && !Beav.Array.has(beeIDs,dstContId)){
               var pos = getCellPosFromID(dstContId);
               var error = checkRule(pos.row,pos.col);
               if(error){
                  displayError(error.msg);
                  highlightRule(error.ruleID,pos.row,pos.col);
               }
            }
         },
         actionIfDropped : function(srcCont, srcPos, dstCont, dstPos, type) {
            unhighlightAllCells();
            var src = this.getObjects(srcCont);
            var elemID = src[srcPos];
            var beeID = Beav.Array.indexOf(beeIDs,elemID);
            beeCells[beeID].attr(emptyCellAttr);
            if(Beav.Array.has(allHiveIDs,srcCont)){
               var pos = getCellPosFromID(srcCont);
               hiveObj[pos.row][pos.col].attr(cellAttr);
            }
            if(Beav.Array.has(allHiveIDs,dstCont)){
               var pos = getCellPosFromID(dstCont);
               highlightCell(pos.row,pos.col,placeHolderAttr);
               var cont = dragAndDrop.getContainer(srcCont);
               var elem = cont.draggableElements[0].component.group;
               elem.toFront();
            }
            if(Beav.Array.has(beeIDs,dstCont) && dstCont != elemID){
               return false
            }
            if (dstCont == null){
               return DragAndDropSystem.action(beeID,0,'replace')
            }
            return true
         },
         actionIfEjected : function(refElement, previousContainerId, previousPos) {
            return DragAndDropSystem.action(refElement.ident,0,'replace');
         },
         canBeTaken : function(containerID, position) {
            displayError("");
            unhighlightAllCells();
            unhighlightRules();
            return true
         }
      });

      for(var iRow = 0; iRow < nbRows; iRow++){
         hiveObj[iRow] = [];
         hiveIDs[iRow] = [];
         var y = y0Hive + iRow*cellH/2;
         for(var iCol = 0; iCol < nbCol; iCol++){
            var x = x0Hive + iCol*(cellSide + cellSin);
            if(isCell(iRow,iCol)){
               hiveObj[iRow][iCol] = paper.set(drawCell(x,y,1,cellAttr),drawCell(x,y,1,highlightAttr));

               var hiveID = "hive_"+iCol+"_"+iRow;
               allHiveIDs.push(hiveID);
               hiveIDs[iRow][iCol] = hiveID;
               dragAndDrop.addContainer({
                  ident : hiveID,
                  cx : x + cellW/2,
                  cy : y + cellH/2,
                  widthPlace : beeW,
                  heightPlace : beeH,
                  nbPlaces : 1,
                  direction : 'horizontal',
                  dropMode : 'replace',
                  dragDisplayMode : 'preview',
                  placeBackgroundArray : []
               });
               var cont = dragAndDrop.getContainer(hiveID);
               cont.placeHolder.element.attr({opacity: 0});
            }
         }
      }
      unhighlightAllCells();
   };

   function initBees() {
      for(var iBee = 0; iBee < nbBees; iBee++){
         var x = x0Bee + iBee*(cellW + beeSpacing);
         beeCells[iBee] = drawCell(x,y0Bee,1,beeCellAttr);
         var xImg = x + (cellW - beeW)/2;
         var yImg = y0Bee;
         var img = drawBee(iBee,xImg,yImg,1);
         img.attr("opacity", 0.5);

         var beeID = beeIDs[iBee];
         dragAndDrop.addContainer({
            ident : beeID,
            cx : x + cellW/2,
            cy : y0Bee + cellH/2,
            widthPlace : beeW,
            heightPlace : beeH,
            nbPlaces : 1,
            direction : 'horizontal',
            dropMode : 'replace',
            dragDisplayMode : 'preview',
            placeBackgroundArray : []
         });
         var cont = dragAndDrop.getContainer(beeID);
         cont.placeHolder.element.attr({opacity: 0});

         addBeeToCont(beeID,beeID);

         if(data[level].ruleType != "criteria"){
            var xRule = x + cellW/2;
            ruleObj[iBee] = drawRule(xRule,y0Rule,rules[iBee],ruleScale,ruleCellAttr,iBee);
            var h = ruleObj[iBee].attr("height");
            ruleObj[iBee].attr(ruleFrameAttr).attr({
               x: x - marginX/2,
               y: y0Rule - cellH - 2.5*marginY,
               height: h + cellH + 2*marginY,
               width: cellW + marginX
            });
         }else{
            var x1 = x0Bee;
            var x2 = x0Bee + nbBees*(cellW + beeSpacing) - beeSpacing;
            paper.path(["M",x1,yLine,"H",x2]).attr(lineAttr);
            for(var iRule = 0; iRule < nbRules; iRule++){
               var xIcon = x0RuleIcon + iRule*(ruleIconW + ruleFrameSpacing);
               var iconSrc = ruleIconSrc(iRule);
               paper.image(iconSrc,xIcon,y0Rule,ruleIconW,ruleIconH);
               var yRule = y0Rule + ruleIconH + marginY;
               var xRule = xIcon + ruleIconW/2;
               ruleObj[iRule] = drawRule(xRule,yRule,rules[iRule],ruleScale,ruleCellAttr);
               var y = ruleObj[iRule].attr("y");
               var h = ruleObj[iRule].attr("height");
               var deltaY = y - y0Rule;
               ruleObj[iRule].attr(ruleFrameAttr).attr({
                  y: y0Rule,
                  height: h + deltaY
               });
            }
         }
      }
   };

   function getCellPosFromID(id) {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(hiveIDs[iRow][iCol] == id){
               return { row: iRow, col: iCol }
            }
         }
      }
   };

   function getCellCoord(row,col) {
      var y = y0Hive + row*cellH/2;
      var x = x0Hive + col*(cellSide + cellSin);
      return { x: x, y: y }
   };

   function isCell(row,col) {
      return (row%2 == 0 && col%2 == 1) || (row%2 == 1 && col%2 == 0)
   };

   function addBeeToCont(beeID,contID) {
      var iBee = Beav.Array.indexOf(beeIDs,beeID);
      var cell = drawCell(-cellW/2,-cellH/2,1,beeCellAttr);
      var bee = drawBee(iBee,-beeW/2,-beeH/2,1);
      var element = paper.set(cell,bee);
      dragAndDrop.insertObject(contID, 0, {ident : beeID, elements : element } );
      var cont = dragAndDrop.getContainer(contID);
      cont.draggableElements[0].component.group.attr("cursor","grab");
   };

   function drawBee(id,x,y,scale,cPaper) {
      var p = cPaper || paper;
      var imgW = beeW*scale;
      var imgH = beeH*scale;
      var srcW = nbBees*imgW;
      var xSrc = x - id*imgW;
      return p.image(beesSrc,xSrc,y,srcW,imgH).attr("clip-rect",[x,y,imgW,imgH])
   };

   function drawCell(x,y,scale,attr,cPaper) {
      var p = cPaper || paper;
      var x1 = x;
      var x2 = x + cellSin*scale;
      var x3 = x2 + cellSide*scale;
      var x4 = x + cellW*scale;
      var y1 = y;
      var y2 = y + cellH*scale/2;
      var y3 = y + cellH*scale;
      var path = ["M",x1,y2,"L",x2,y1,"H",x3,"L",x4,y2,"L",x3,y3,"H",x2,"Z"];
      return p.path(path).attr(attr)
   };

   function drawRule(xc,y0,rule,scale,attr,beeID,rPaper) {
      var p = rPaper || paper;
      var maxCol = 0;
      for(var iCell = 0; iCell < rule.length; iCell++){
         var cData = rule[iCell];
         var col = cData.col;
         if(col > maxCol){
            maxCol = col;
         }
      }
      var nbCol = maxCol + 1;
      var x0 = xc - (nbCol*(cellSide + cellSin) + cellSin)*scale/2;
      var obj = p.set();
      for(var iCell = 0; iCell < rule.length; iCell++){
         var cData = rule[iCell];
         var x = x0 + cData.col*(cellSide + cellSin)*scale;
         var y = y0 + cData.row*cellH*scale/2;
         var a = attr[cData.type];
         var cell = drawCell(x,y,scale,a,p);
         obj.push(cell);
         if(cData.type == 2){
            fillCellWith(x,y,scale,0,p);
         }else if(cData.type == 1 && beeID != undefined){
            fillCellWith(x,y,scale,beeID + 1,p);
         }
      }
      var bbox = obj.getBBox();
      var xRect = bbox.x - marginX/2;
      var yRect = bbox.y - marginY/2;
      var rectW = bbox.width + marginX;
      var rectH = bbox.height + marginY;
      var rect = p.rect(xRect,yRect,rectW,rectH).attr(overlayAttr).toBack();
      return rect
   };

   function drawHive(x0,y0,scale,attr) {
      var obj = []
      for(var iRow = 0; iRow < nbRows; iRow++){
         obj[iRow] = [];
         var y = y0 + iRow*cellH*scale/2;
         for(var iCol = 0; iCol < nbCol; iCol++){
            var x = x0 + iCol*(cellSide + cellSin)*scale;
            if((iRow%2 == 0 && iCol%2 == 1) || (iRow%2 == 1 && iCol%2 == 0)){
               obj[iRow][iCol] = drawCell(x,y,scale,attr);
            }
         }
      }
      return obj
   };

   function fillCellWith(x,y,scale,type,cPaper) {
      var p = cPaper || paper;
      if(type == 0){
         var imgW = cellSide*scale;
         var imgH = imgW;
         var src = crossSrc;
      }else{
         var imgW = beeW*scale;
         var imgH = beeH*scale;
      }
      var xImg = x + (cellW*scale - imgW)/2;
      var yImg = y + (cellH*scale - imgH)/2;
      if(type == 0){
         p.image(src,xImg,yImg,imgW,imgH);
      }else{
         drawBee(type - 1,xImg,yImg,scale,p)
      }
   };

   function fillIntroHive(obj,id,scale) {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var cell = obj[iRow][iCol];
            if(cell){
               var path = cell.attr("path");
               var xCell = path[0][1];
               var yCell = path[1][2];
               if(iCol == 0){
                  if(id == 0){
                     fillCellWith(xCell,yCell,scale,1);
                     cell.attr("fill", colors.gold);
                  }else{
                     fillCellWith(xCell,yCell,scale,0);
                  }
               }else{
                  if(id == 0){
                     fillCellWith(xCell,yCell,scale,0);
                  }else{
                     fillCellWith(xCell,yCell,scale,1);
                     cell.attr("fill",colors.gold);
                  }
               }
            }
         }
      }
   };

   function drawIntro(id) {
      var p = introPapers[id];
      var w = introPaperW;
      var h = introPaperH;
      p.rect(0,0,w,h).attr(introFrameAttr);

      if(data[level].ruleType != "criteria"){
         var scale = 0.75;
         var xCell = (w - cellW*scale)/2;
         var yCell = 12;
         drawCell(xCell,yCell,scale,beeCellAttr,p);

         var xBee = xCell + (cellW - beeW)*scale/2;
         var yBee = yCell + (cellH - beeH)*scale/2;
         fillCellWith(xCell,yCell,scale,3,p);
      }else{
         var xImg = (w - ruleIconW)/2;
         var yImg = 0;
         p.image(ruleIconSrc(1 + id),xImg,yImg,ruleIconW,ruleIconH);
      }

      if(data[level].ruleType == "fullHive"){
         var rule = [
               { row: 0, col: 1, type: 0 },
               { row: 1, col: 0, type: 0 },
               { row: 1, col: 2, type: 0 },
               { row: 2, col: 1, type: 0 },
               { row: 3, col: 0, type: 0 },
               { row: 3, col: 2, type: 0 },
               { row: 4, col: 1, type: 1 },
            ]
      }else{
         var rule = [
               { row: 0, col: 0, type: 0 },
               { row: 2, col: 0, type: 0 },
               { row: 4, col: 0, type: id + 1 }
            ]
      }
      if(data[level].ruleType != "criteria"){
         var xRule = xCell + cellW*scale/2;
         var yRule = yCell + cellH*scale + marginY;
         var rScale = 0.35;
      }else{
         var xRule = w/2;
         var yRule = yImg + ruleIconH;
         var rScale = 0.4;
      }
      drawRule(xRule,yRule,rule,rScale,ruleCellAttr,2,p);
   };

   function highlightCell(row,col,attr) {
      var obj = hiveObj[row][col];
      obj[1].show().attr(attr).toFront();
   };

   function unhighlightAllCells() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var obj = hiveObj[iRow][iCol];
            if(obj){
               obj[1].hide();
            }
         }
      }
      if(highlightObj){
         highlightObj.remove();
         highlightObj = null;
      }
   };

   function highlightRule(id,row,col) {
      ruleObj[id].attr(ruleHighlightAttr);
      if(!highlightObj){
         highlightObj = paper.set();
      }
      var rule = rules[id];
      for(var iRule = 0; iRule < rule.length; iRule++){
         var pos = rule[iRule];
         if(pos.type > 0){
            var refPos = pos;
         }
      }
      for(var iRule = 0; iRule < rule.length; iRule++){
         var pos = rule[iRule];
         var deltaRow = pos.row - refPos.row;
         var deltaCol = pos.col - refPos.col;
         if(deltaRow == 0 && deltaCol == 0){
             var newRow = row + deltaRow;
             var newCol = col + deltaCol;
             var pos = getCellCoord(newRow,newCol);
             var cell = drawCell(pos.x,pos.y,1,highlightAttr);
             
                cell.attr({
                   fill: "red",
                   "fill-opacity": 0.5
                });
             highlightObj.push(cell);
         }
      }
      var cellID = hiveIDs[row][col];
      var cont = dragAndDrop.getContainer(cellID);
      cont.draggableElements[0].component.group.toFront();
      cont.draggableElements[0].component.element[0].hide();
   };

   function unhighlightRules() {
      // console.log("unhighlightRules")
      for(var iRule = 0; iRule < rules.length; iRule++){
         ruleObj[iRule].attr(ruleFrameAttr);
      }
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            if(answer.hive[row][col]){
               var cellID = hiveIDs[row][col];
               var cont = dragAndDrop.getContainer(cellID);
               cont.draggableElements[0].component.element[0].show();
            }
         }
      }
   };

   function saveAnswer() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var cellID = hiveIDs[iRow][iCol];
            if(cellID){
               answer.hive[iRow][iCol] = dragAndDrop.getObjects(cellID)[0];
            }
         }
      }
   };

   function reloadAnswer() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            var beeID = answer.hive[iRow][iCol];
            if(beeID){
               hiveObj[iRow][iCol].attr(fullCellAttr);

               dragAndDrop.removeObject(beeID,0);
               var cellID = hiveIDs[iRow][iCol];
               addBeeToCont(beeID,cellID);

               var iBee = Beav.Array.indexOf(beeIDs,beeID);
               beeCells[iBee].attr(emptyCellAttr);
            }
         }
      }
   };

   function matchRule(row,col,rule) {
      for(var iRule = 0; iRule < rule.length; iRule++){
         var pos = rule[iRule];
         if(pos.type > 0){
            var refPos = pos;
         }
      }

      for(var iRule = 0; iRule < rule.length; iRule++){
      var pos = rule[iRule];
         if(pos.row != refPos.row || pos.col != refPos.col){
            var deltaRow = pos.row - refPos.row;
            var deltaCol = pos.col - refPos.col;
            var currRow = row + deltaRow;
            var currCol = col + deltaCol;
            if(currRow < 0 || currRow >= nbRows || currCol < 0 || currCol >= nbCol || !isCell(currRow,currCol)){
               return (refPos.type == 1) ? false : true
            }
         }
      }
      return (refPos.type == 1) ? true : false
   };

   function checkRule(iRow,iCol) {
      var beeID = answer.hive[iRow][iCol];
      // console.log(iRow,iCol,beeID)
      var iBee = Beav.Array.indexOf(beeIDs,beeID);
      if(!beeRules){
         var ruleIDs = [iBee];
      }else{
         var ruleIDs = beeRules[iBee];
      }
      for(var iRule = 0; iRule < ruleIDs.length; iRule++){
         var ruleID = ruleIDs[iRule];
         var rule = rules[ruleID];
         // console.log(iRow,iCol,rule,ruleID)
         if(!matchRule(iRow,iCol,rule)){
            return { msg: taskStrings.errorRule, ruleID: ruleID }
         }
      }
      return false
   };

   function checkResult(noVisual) {
      if(!noVisual){
         displayError("");
         unhighlightAllCells();
         unhighlightRules();
      }
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(isCell(iRow,iCol)){
               if(!answer.hive[iRow][iCol]){
                  var error = taskStrings.errorEmptyCell;
                  if(!noVisual){
                     displayError(error);
                     highlightCell(iRow,iCol,highlightAttr);
                  }
                  return { successRate: 0, message: error }
               }
            }
         }
      }
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(isCell(iRow,iCol)){
               var error = checkRule(iRow,iCol);
               if(error){
                  if(!noVisual){
                     displayError(error.msg);
                     highlightRule(error.ruleID,iRow,iCol);
                  }
                  return { successRate: 0, message: error.msg }
               }
            }
         }
      }

      if(!noVisual){
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

