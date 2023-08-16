   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         cellW: 70,
         areas: [
            [ 0, 0, 0, 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1 ]
         ],
         animals: [
            [ 1, 2, 0, 0, 0, 0, 1, 0 ],
            [ 0, 0, 1, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 0, 0, 2 ],
            [ 0, 0, 0, 0, 0, 2, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 2, 0 ],
            [ 0, 0, 0, 0, 0, 1, 0, 0 ]
         ],
         population: 5,
         target: 2,
         areasTitles: [{x: 100, y: -45}, {x:380, y:-45}],
         extraPaperMargin: 0
      },
      easy: {
         cellW: 45,
         areas: [
            [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
            [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2 ]
         ],
         animals: [
            [ 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0 ],
            [ 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1, 0 ],
            [ 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0 ]
         ],
         population: 7,
         target: 2,
         areasTitles: [{x: 90, y: -45}, {x: 330, y: -45}, {x:570, y:-45}],
         extraPaperMargin: 0
      },
      medium: {
         cellW: 45,
         areas: [
            [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
            [ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
            [ 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 1, 1 ],
            [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1 ],
            [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1 ],
            [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1 ],
            [ 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
            [ 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
            [ 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
         ],
         animals: [
            [ 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0 ],
            [ 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2 ],
            [ 0, 1, 0, 0, 2, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0 ],
            [ 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2 ],
            [ 0, 2, 0, 2, 0, 1, 0, 2, 0, 0, 2, 0, 0, 2, 0 ],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
         ],
         population: 9,
         target: 3,
         areasTitles: [{x: 110, y: -45}, {x:470, y:-45}, {x: 90, y: 540}, {x:570, y:540}],
         extraPaperMargin: 20
      },
      hard: {
         cellW: 35,
         areas: [
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ],
            [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6 ]
         ],
         animals: [
            [ 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 1, 0 ],
            [ 2, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0 ],
            [ 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 2 ],
            [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0 ],
            [ 1, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0 ],
            [ 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0 ],
            [ 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0 ],
            [ 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0 ],
            [ 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2 ],
            [ 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0 ]
         ],
         population: 9,
         target: 4,
         areasTitles: [{x: 50, y: -45}, {x: 155, y: 395}, {x: 260, y: -45}, {x: 365, y: 395}, {x: 470, y: -45}, {x: 575, y: 395}, {x: 680, y: -45}],
         extraPaperMargin: 0
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

   var areaTitleH = 56;
   var areaTitleW = 130;

   var yGrid = areaTitleH + marginY;
   var xGrid;
   var gridW, gridH;
   var cellW;
   var cellH;
   var imgW, imgH;

   var buttonW = 150;
   var buttonH = 30;
   var yUndo;
   var xUndo = (paperW - buttonW)/2;
   var iconW = 15;
   var iconH = iconW;

   var nbRows, nbCol;
   var nbAreas, nbAnimals = 2;
   var initAreas, areas, animals;
   var areasTitles = [];
   var winners = [];
   var lastClick = []; // for cells next to more than 1 area
   var target;
   var population;
   var horSym, verSym;

   var grid;
   var borderObj;
   var undoButton;
   var rng;

   var beaverSrc = $("#beaver").attr("src");
   var foxSrc = $("#fox").attr("src");
   var undoSrc = $("#undo").attr("src");
   var checkSrc = $("#check").attr("src");
   var crossSrc = $("#cross").attr("src");
   var fenceHorSrc = $("#fence_hor").attr("src");
   var fenceVerSrc = $("#fence_ver").attr("src");

   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      brown: "#654118",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
      veryLightGrey: "#f0f0f0",
      darkGrey: "#666666",
      brown: "#b0741a",
      lightBrown: "#de9e1f",
      darkBrown: "#69560f",
      green: "#18ba6c"
   };

   var gridLineAttr = {
      stroke: colors.black,
      "stroke-width": 1
   };
   var cellAttr = [
      {
         stroke: colors.black,
         "stroke-width": 1,
         fill: "white"
      },
      {
         stroke: "#93612F",
         "stroke-width": 1,
         fill: "#DAB477"
      },
      {
         stroke: "#D9201C",
         "stroke-width": 1,
         fill: "#F4B0AE",
      },
      {
         stroke: "darkGreen",
         "stroke-width": 1,
         fill: "lightgreen" // colors.green
      },
      {
         stroke: colors.darkBrown,
         "stroke-width": 1,
         fill: colors.lightBrown // colors.brown
      }
   ];
   var borderAttr = {
      stroke: colors.black,
      "stroke-width": 8,
      "stroke-linecap": "round"
   };
   var shadowAttr = [
      {
         stroke: colors.black,
         "stroke-width": 4,
         fill: "none",
         opacity: 0.3
      },
      {
         stroke: "white",
         "stroke-width": 4,
         fill: "none",
         opacity: 0.4
      }];
   var highlight1 = {
      stroke: "yellow",
      "stroke-width": 4
   };
   var highlight2 = {
      stroke: "red",
      "stroke-width": 4
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
   var areaTitleAttr = {
      rect: {
         stroke: "none",
         fill: colors.lightGrey,
         r: 5
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "black"
      },
      line: {
         stroke: colors.grey,
         "stroke-width": 1
      }
   };
   var areaTitleErrorAttr = {
     "fill": "red"
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
       cellW = data[level].cellW;
       cellH = cellW;
       imgW = cellW*3/4;
       imgH = imgW;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      initAreas = Beav.Object.clone(data[level].areas);
      areas = Beav.Object.clone(initAreas);
      animals = Beav.Object.clone(data[level].animals);
      target = data[level].target;
      population = data[level].population;
      nbRows = areas.length;
      nbCol = areas[0].length;
      gridW = cellW*nbCol;
      gridH = cellH*nbRows;
      xGrid = (paperW - gridW)/2;
      nbAreas = getNbAreas();
      yUndo = yGrid + gridH + marginY + areaTitleH + marginY;
      // if(level == "hard"){
      //    yUndo += areaTitleH + marginY;
      // }
      lastClick = Beav.Matrix.make(nbRows,nbCol,null);
      paperH = yUndo + buttonH + marginY;
      paperH += data[level].extraPaperMargin;
      $("#nb_target").html(target);
      $("#majority").html((population+1)/2);
      $("#population").html(population);

      displayHelper.taskH = paperH;
      displayHelper.taskW = paperW;
      displayHelper.minTaskW = 500;
      displayHelper.maxTaskW = 900;

      horSym = rng.nextBit();
      // horSym = 1;
      verSym = rng.nextBit();
      if (level == "basic") {
          verSym = 0;
      }
      // verSym = 1;
      applySymmetry();
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
         hist: []
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

   function applySymmetry() {
      // console.log(horSym,verSym)
      var tempInitAreas = Beav.Object.clone(initAreas);
      var tempAnimals = Beav.Object.clone(animals);
      for(var row = 0; row < nbRows; row++){
         var prevRow = (verSym == 0) ? row : nbRows - 1 - row;
         for(var col = 0; col < nbCol; col++){
            var prevCol = (horSym == 0) ? col : nbCol - 1 - col;
            initAreas[row][col] = tempInitAreas[prevRow][prevCol];
            animals[row][col] = tempAnimals[prevRow][prevCol];
         }
      }
   };

   function getNbAreas() {
      var areaIDs = [];
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var areaID = areas[row][col];
            if(!Beav.Array.has(areaIDs,areaID)){
               areaIDs.push(areaID);
            }
         }
      }
      return areaIDs.length
   };

   subTask.resetDisplay = function() {
      // checkGrid();
      $("#nb_areas").html(nbAreas);
      initPaper();
      replayHist();
      initGrids();
      initAreasTitles();
      initUndoButton();
      initHandlers();
      updateBorders();
      updateAreasTitles();
      displayError("");

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   function checkGrid() {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var areaID = areas[row][col];
            var animalID = animals[row][col];
            if(animalID > 0){
               var nAn = findNeighborAnimals(row,col);
               var nAr = findNeighborAreas(row,col);
               if(nAr.length == 0){
                  for(var iDat = 0; iDat < nAn.length; iDat++){
                     var dat = nAn[iDat];
                     var currNeighborAreas = findNeighborAreas(dat.row,dat.col);
                     if(currNeighborAreas.length > 0){
                        console.error("un animal qui n'est pas près d'une frontière se trouve à côté d'un animal qui est près d'une frontière, row:"+row+" col:"+col);
                     }
                  }
               }else{
                  for(var iDat = 0; iDat < nAn.length; iDat++){
                     var dat = nAn[iDat];
                     var currNeighborAreas = findNeighborAreas(dat.row,dat.col);
                     for(var iAr = 0; iAr < nAr.length; iAr++){
                        var arID1 = nAr[iAr];
                        for(var jAr = 0; jAr < currNeighborAreas.length; jAr++){
                           var arID2 = currNeighborAreas[jAr];
                           if(arID1 == arID2){
                              console.error(level + " : un animal qui est adjacent à une autre zone est à côté d'un animal qui est adjacent à cette même zone, row:"+row+" col:"+col);
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initGrids() {
      grid = new Grid.fromArray("paper", paper, areas, cellFiller, cellW, cellH, xGrid, yGrid, gridLineAttr);
   };
   
   function initAreasTitles() {
      // console.log(horSym,verSym)
       for (var iArea = 0; iArea < nbAreas; iArea++) {
           var posTitle = data[level].areasTitles[iArea];
           var x = (horSym == 0) ? xGrid + posTitle.x : xGrid + gridW - posTitle.x;
           var vSym = verSym;
           if (level == "easy") {
               vSym = 0;
           }
           var y = (vSym == 0) ? yGrid + posTitle.y : yGrid + gridH - posTitle.y;
           areasTitles[iArea] = drawAreaTitle(x,y);
       }
   };
   
   function updateAreasTitles() {
       var countAnims = countAnimals();
       for (var iArea = 0; iArea < nbAreas; iArea++) {
           var population = countAnims[0][iArea] + countAnims[1][iArea];
         for(var iLine = 0; iLine < 2; iLine++){
            var typeStr = (iLine == 0) ? taskStrings.animals(population) : taskStrings.beavers(countAnims[0][iArea]);
            var nbStr = (iLine == 0) ? population : countAnims[0][iArea];
            areasTitles[iArea].type[iLine].attr("text",typeStr);
            areasTitles[iArea].nb[iLine].attr("text",nbStr);
            areasTitles[iArea].icons[iLine].check.hide();
            areasTitles[iArea].icons[iLine].cross.hide();
            if(iLine == 0) {
               if (population != data[level].population) {
                  areasTitles[iArea].icons[iLine].cross.show();
               } else {
                  areasTitles[iArea].icons[iLine].check.show();
               }
			} else {
               if (countAnims[0][iArea] <= data[level].population / 2) {
                  areasTitles[iArea].icons[iLine].cross.show();
               } else {
                  areasTitles[iArea].icons[iLine].check.show();
               }
			}
         }
       }
   };


   function initUndoButton() {
      var x0 = xUndo;
      var y0 = yUndo;
      var w = buttonW;
      var h = buttonH;
      var a = buttonAttr;
      var rect = paper.rect(x0,y0,w,h).attr(a.rect);
      var xText = x0 + w/2 + 5;
      var yText = y0 + h/2;
      var text = paper.text(xText,yText,taskStrings.undo).attr(a.text);
      var xIcon = x0 + marginX;
      var yIcon = y0 + (h - iconH)/2;
      var icon = paper.image(undoSrc,xIcon,yIcon,iconW,iconH);
      undoButton = paper.set(rect,text,icon);
   };

   function initHandlers() {
      grid.clickCell(clickCell);
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var cell = grid.getCell(row,col);
            if(cell[1])
               cell[1].attr("cursor","pointer");
         }
      }
      updateUndo();
   };

   function clickCell(ev) {
      displayError("");
      grid.unhighlightAllCells();
      var dat = ev.data;
      var row = dat.row;
      var col = dat.col;
      clickGrid(row,col,false,false);
   };

   function clickGrid(row,col,noVisual,replay) {
      var animalID = animals[row][col];
      if(animalID == 0){
         if(!noVisual)
            displayError(taskStrings.clickAnimals);
         return
      }
      var id = findNextArea(row,col);
      if(id == null){
         if(!noVisual)
            displayError(taskStrings.clickAnimals);
         return
      }
      if(!replay){
         answer.hist.push({ row: row, col: col });
      }
      areas[row][col] = id;
      updateWinners();
      if(!noVisual){
         updateUndo();
         updateBorders();
         updateGrid();
         updateAreasTitles();
      }
   };

   function clickUndo() {
      displayError("");
      grid.unhighlightAllCells();
      answer.hist.pop();
      updateUndo();
      replayHist();
      updateBorders();
      updateGrid();
      updateAreasTitles();
   };

   function findNextArea(row,col) {
      var areaID = areas[row][col];
      var neighbors = findNeighborAreas(row,col);

      if(neighbors.length == 0){
         return null
      }
      if(neighbors.length == 1){
         return neighbors[0]
      }
      Beav.Array.stableSort(neighbors, function(x,y) {
         return x - y
      });
      var last = lastClick[row][col];
      if(last == null){
         var id = neighbors[0];
         lastClick[row][col] = areaID;
         return id
      }
      for(var iNeigh = 0; iNeigh < neighbors.length; iNeigh++){
         var id = neighbors[iNeigh];
         if(id != last){
            lastClick[row][col] = areaID;
            return id
         }
      }
   };

   function findNeighborAreas(row,col) {
      var areaID = areas[row][col];
      var neighbors = [];
      for(var iRow = row - 1; iRow <= row + 1; iRow++){
         if(iRow >= 0 && iRow < nbRows && iRow != row){
            var id = areas[iRow][col];
            if(id != areaID && !Beav.Array.has(neighbors,id)){
               neighbors.push(id)
            }
         }
      }
      for(var iCol = col - 1; iCol <= col + 1; iCol++){
         if(iCol >= 0 && iCol < nbCol && iCol != col){
            var id = areas[row][iCol];
            if(id != areaID && !Beav.Array.has(neighbors,id)){
               neighbors.push(id)
            }
         }
      }
      return neighbors
   };

   function findNeighborAnimals(row,col) {
      var animalID = animals[row][col];
      var neighbors = [];
      for(var iRow = row - 1; iRow <= row + 1; iRow++){
         if(iRow >= 0 && iRow < nbRows && iRow != row){
            var id = animals[iRow][col];
            if(id > 0){
               neighbors.push({ row: iRow, col: col, id: id });
            }
         }
      }
      for(var iCol = col - 1; iCol <= col + 1; iCol++){
         if(iCol >= 0 && iCol < nbCol && iCol != col){
            var id = animals[row][iCol];
            if(id > 0){
               neighbors.push({ row: row, col: iCol, id: id });
            }
         }
      }
      return neighbors
   };

   function cellFiller(cellData, paper) {
      var x = cellData.xPos;
      var y = cellData.yPos;
      var row = cellData.row;
      var col = cellData.col;
      var w = cellW, h = cellH;

      var entry = areas[row][col];
      var win = winners[entry];
      var rect = paper.rect(x,y,w,h).attr(cellAttr[win]);
      var animal = animals[row][col];
      if(animal > 0){
         var src = (animal == 1) ? beaverSrc : foxSrc;
         var xImg = x + (w - imgW)/2;
         var yImg = y + (h - imgH)/2;
         var img = paper.image(src,xImg,yImg,imgW,imgH);
         
         var neighborAr = findNeighborAreas(row,col);
         var shadow = false;
         for(var iAr = 0; iAr < neighborAr.length; iAr++){
            if(neighborAr[iAr] != entry){
               shadow = true;
            }
         }
         if(shadow){
            var shadow1 = paper.rect(x + 2, y + 2, w + 4, h + 4).attr(shadowAttr[1]).attr("clip-rect",[x,y,w,h]);
            var shadow2 = paper.rect(x - 4, y - 4, w + 2, h + 2).attr(shadowAttr[0]).attr("clip-rect",[x,y,w,h]);
            return [rect,shadow1,shadow2,img]
         }
         return [rect,img]
      }
      return [rect]
   };

   function updateGrid() {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var cell = grid.getCell(row,col);
            var areaID = areas[row][col];
            cell[0].attr(cellAttr[winners[areaID]]);
         }
      }
   };

   function updateBorders() {
      if(borderObj){
         borderObj.remove();
         borderObj = null;
      }
      var x0 = xGrid;
      var y0 = yGrid;
      var w = cellW;
      var h = cellH;

      paper.setStart()
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var cell = areas[row][col];
            if(col < nbCol - 1){
               var cellR = areas[row][col + 1];
               if(cell != cellR){
                  var x = x0 + (col + 1)*w;
                  // var x = x0 + (col + 1)*w - fenceW/2;
                  var y1 = y0 + row*h;
                  var y2 = y1 + h;
                  // paper.image(fenceVerSrc,x,y,fenceW,cellH);
                  paper.path(["M",x,y1,"V",y2]).attr(borderAttr);
               }
            }
            if(row < nbRows - 1){
               var cellB = areas[row + 1][col];
               if(cell != cellB){
                  var y = y0 + (row + 1)*h;
                  // var y = y0 + (row + 1)*h - fenceH;
                  var x1 = x0 + col*w;
                  var x2 = x1 + w;
                  // paper.image(fenceHorSrc,x,y,cellW,fenceH);
                  paper.path(["M",x1,y,"H",x2]).attr(borderAttr);
               }
            }
         }
      }
      borderObj = paper.setFinish();
   };

   function countAnimals() {
      var count = [Beav.Array.make(nbAreas,0),Beav.Array.make(nbAreas,0)];
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var areaID = areas[row][col];
            var animalID = animals[row][col];
            if(animalID > 0){
               count[animalID - 1][areaID]++;
            }
         }
      }
      return count;
   }

   function updateWinners() {
      var count = countAnimals();
      for(var iArea = 0; iArea < nbAreas; iArea++){
         if(count[0][iArea] + count[1][iArea] != population){
            winners[iArea] = 0; // invalid region population
         }else if(count[0][iArea] > count[1][iArea]){
            winners[iArea] = 1;
         }else{
            winners[iArea] = 2;
         }
      }
      return
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

   function drawAreaTitle(x,y) {
      var a = areaTitleAttr;
      var w = areaTitleW;
      var h = areaTitleH;
      var yRect = y - h/2;
      var xRect = x - w/2;
      paper.rect(xRect,yRect,w,h).attr(a.rect);
      var type = [];
      var nb = [];
      var icons = [];
      for(var iLine = 0; iLine < 2; iLine++){
         var xType = xRect + marginX/2;
         if (typeof(enableRtl) !== "undefined") {
            xType += 80;			   
         }
         var xNb = xType + 75;
         var yText = y - h/4 + iLine*h/2;
         type[iLine] = paper.text(xType,yText,"").attr(a.text).attr("text-anchor", "start");
         nb[iLine] = paper.text(xNb,yText,"").attr(a.text).attr("text-anchor", "start");
         var xIcon = xRect + w - 25;
         var yIcon = yText - iconH/2;
         var check = paper.image(checkSrc,xIcon,yIcon,iconW,iconH);
         var cross = paper.image(crossSrc,xIcon,yIcon,iconW,iconH);
         icons[iLine] = {check:check,cross:cross};
      }
      var x1 = xRect + marginX/2;
      var x2 = xRect + w - marginX/2;
      paper.path(["M",x1,y,"H",x2]).attr(a.line);
      return { type: type, nb: nb, icons: icons }
   };

   function replayHist() {
      areas = Beav.Object.clone(initAreas);
      lastClick = Beav.Matrix.make(nbRows,nbCol,null);
      winners = [];
      updateWinners();
      for(var iPos = 0; iPos < answer.hist.length; iPos++) {
         var pos = answer.hist[iPos];
         clickGrid(pos.row,pos.col,true,true);
      }
   };

   function highlightAreas(id1,id2) {
      for(var row = 0; row < nbRows; row++){
         for(var col = 0; col < nbCol; col++){
            var areaID = areas[row][col];
            var animalID = animals[row][col];
            if(animalID > 0){
               if(areaID == id1 || areaID == id2){
                  var attr = (areaID == id1) ? highlight1 : highlight2;
                  grid.highlightCell(row,col,attr);
               }
            }
         }
      }
   };

   function checkResult(noVisual) {
      if(!noVisual){
         displayError("");
         grid.unhighlightAllCells();
      }
      replayHist();
      var countWins = 0;
      for(var iWin = 0; iWin < winners.length; iWin++){
         var winner = winners[iWin];
         if(winner == 1){
            countWins++;
         }
      }
      if(countWins < target){
         var error = taskStrings.errorWins(target);
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      var countAnims = countAnimals();
      for(var iAr = 0; iAr < nbAreas; iAr++){
         if(countAnims[0][iAr] + countAnims[1][iAr] != countAnims[0][0] + countAnims[1][0]){
            var error = taskStrings.errorNbInhabitants;
            if(!noVisual){
               highlightAreas(0,iAr);
               displayError(error);
            }
            return { successRate: 0, message: error }
         }
      }

      if(!noVisual){
         platform.validate("done");
      }
      return { successRate: 1, message: taskStrings.success };
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

