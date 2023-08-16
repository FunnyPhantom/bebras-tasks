   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         gridSize: [5, 1],
         templeSize: [3, 1],
         minSteps: 1,
         maxSteps: 3,
         cellW: 50
      },
      easy: {
         gridSize: [14, 1],
         templeSize: [3, 1],
         minSteps: 4,
         maxSteps: 12,
         cellW: 50
      },
      medium: {
         gridSize: [11, 8],
         templeSize: [3, 3],
         minSteps: 6,
         maxSteps: 8,
         cellW: 45
      },
      hard: {
         gridSize: [14, 14],
         templeSize: [5, 5],
         minSteps: 9,
         maxSteps: 12,
         cellW: 35
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
   var cellW, cellH;
   var gridW, gridH;
   var xGrid, yGrid = marginY;
   var xCounter = paperW/2
   var yCounter;

   var nbRows, nbCol;
   var templeSize;
   var templePos; // position of bottom-left corner
   var possibleTemplePos = []; // possible positions for the bottom-left corner
   var minSteps, maxSteps;

   var grid;
   var gridContent = [];
   var contentsMud = 0;
   var contentsEmpty = 1;
   var contentsTemple = 2;
   var contentsEntrance = 3;

   var rng;
   var counter;

   var hiddenSrc = $("#hidden").attr("src");
   var emptySrc = $("#empty").attr("src");
   var insideSrc = $("#inside").attr("src");

   // DEPRECATED -> on pourrait simplifier le code du coup
   //var wallSrc = $("#wall").attr("src");
   //var cornerSrc = $("#corner").attr("src");
   var wallSrc = insideSrc;
   // var cornerSrc = insideSrc;

   var doorSrc = $("#door").attr("src");


   var colors = {
      yellow: "#f5a623",
      lightYellow: "#f7dd9b",
      black: "#4a4a4a",
      realBlack: "#000000",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#cdcdcd",
      lightGrey: "#e5e5e5",
      darkGrey: "#666666"
   };

   var gridLineAttr = {
      stroke: colors.realBlack,
      "stroke-width": 2
   };
   var counterAttr = {
      "font-size": 16,
      "font-weight": "bold",
      fill: colors.black
   };

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      nbRows = data[level].gridSize[1];
      nbCol = data[level].gridSize[0];
      templeSize = data[level].templeSize.slice();
      cellW = data[level].cellW;
      cellH = cellW;
      minSteps = data[level].minSteps;
      maxSteps = data[level].maxSteps;

      gridW = nbCol*cellW;
      gridH = nbRows*cellH;
      xGrid = (paperW - gridW)/2;
      yCounter = yGrid + gridH + marginY;
      paperH = yCounter + marginY;

      initPossibleTemplePos();
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
      reloadAnswer(false);

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
         seed: rng.nextInt(0,1000),
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

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initGridContent() {
      gridContent = Beav.Matrix.make(nbRows,nbCol,contentsMud);
   };

   function initPossibleTemplePos() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         possibleTemplePos[iRow] = [];
         for(var iCol = 0; iCol < nbCol; iCol++){
            possibleTemplePos[iRow][iCol] = (iRow >= templeSize[1] - 1) && (iCol <= nbCol - templeSize[0]);
         }
      }
   };

   function initGrid() {
      grid = Grid.fromArray("paper", paper, gridContent, cellFiller, cellW, cellH, xGrid, yGrid, gridLineAttr);
      grid.clickCell(onClick);
   };

   function onClick(ev) {
      var row = ev.data.row;
      var col = ev.data.col;
      clickCell(row,col,false,false);
   };

   // For non-hard version, when a templeCell is revealed, we can find a corresponding
   // templeEntrance by picking any of the remaining possible entrance cells;
   // Indeed, such an entrance must span a temple that covers the templeCell revealed,
   // otherwise it means we could have revealed an emptyCell.
   function findTemplePos() {
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(possibleTemplePos[iRow][iCol]){
               return { row: iRow, col: iCol };
            }
         }
      }
      return null;
   };

   function setCell(row, col, contents, noVisual) {
      gridContent[row][col] = contents;
      if(!noVisual){
         grid.setCell(cellFiller,{ row: row, col: col, entry: contents});
      }
   };

   // reveal all cells of the temple whose entrance is at location templePos;
   // no specific drawing for the entrance
   function revealTemple(noVisual) {
      for(var iRow = templePos.row - templeSize[1] + 1; iRow <= templePos.row; iRow++){
         for(var iCol = templePos.col; iCol < templePos.col + templeSize[0]; iCol++){
           setCell(iRow, iCol, contentsTemple, noVisual);
         }
      }
   };

   // count the number of "true" in a matrix
   function countPossibilities(possibilities) {
      var res = 0;
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
            if(possibilities[iRow][iCol]){
               res++;
            }
         }
      }
      return res;
   };

   // update remaining possibilities depending on an answer, which could be "empty" or "temple"
   function possibilitiesAfterRevealAnswer(possibilities,row,col,ans) {
      var newPossibilities = Beav.Object.clone(possibilities);
      for(var iRow = 0; iRow < nbRows; iRow++){
         for(var iCol = 0; iCol < nbCol; iCol++){
           // "area" is the set of cells at which, if a temple entrance were there,
           // we would have a temple cell on the cell at coordinates (row,col)
           var insideArea =
                  (row <= iRow && iRow <= row + templeSize[1] - 1)
              &&  (col - templeSize[0] + 1 <= iCol && iCol <= col);
           var atClick = (row == iRow) && (col == iCol);
           if (   (ans == "empty" && insideArea)
               || (ans == "temple" && (!insideArea || atClick))) {
               newPossibilities[iRow][iCol] = false;
           }
         }
      }
      return newPossibilities;
   };

   function clickCell(row,col,reload,noVisual){
      displayError("");
      if(gridContent[row][col] != contentsMud){
         // console.log("already dug")
         return
      }
      if(!reload){
         answer.hist.push({ row: row, col: col });
      }
      if(!noVisual){
         updateCounter();
      }

      // adversarial choice to determine answer
      var possEmpty = possibilitiesAfterRevealAnswer(possibleTemplePos,row,col,"empty");
      var nbPossEmpty = countPossibilities(possEmpty);
      var ans;
      if (level == "hard") {
        var possTemple = possibilitiesAfterRevealAnswer(possibleTemplePos,row,col,"temple");
        var nbPossTemple = countPossibilities(possTemple);
        if (nbPossEmpty == 0 && nbPossTemple == 0) {
          ans = contentsEntrance;
          templePos = { row: row, col: col };
        } else if (nbPossEmpty > nbPossTemple) {
          ans = contentsEmpty;
          possibleTemplePos = possEmpty;
          if(!noVisual){
            displayError(taskStrings.empty);
          }
        } else {
          ans = contentsTemple;
          possibleTemplePos = possTemple;
          if(!noVisual){
             displayError(taskStrings.notEmpty);
          }
        }
      } else {
        if (nbPossEmpty > 0) {
          ans = contentsEmpty;
          possibleTemplePos = possEmpty;
          if(!noVisual){
            displayError(taskStrings.empty);
          }
        } else {
          ans = contentsTemple;
          templePos = findTemplePos();
          revealTemple(noVisual);
          if (!templePos) {
            console.log("bug in the implementation");
          }
        }
      }

      // record the answer, and continue
      setCell(row, col, ans, noVisual);
      if(templePos && !noVisual && !reload){
         platform.validate("done");
      }
   };

   function cellFiller(cellData, paper) {
      var x = cellData.xPos;
      var y = cellData.yPos;
      var w = cellW, h = cellH;
      var row = cellData.row;
      var col = cellData.col;
      var entry = cellData.entry;
      var src;
      if(entry == contentsMud){
         src = hiddenSrc;
      }else if(entry == contentsEmpty){
         src = emptySrc;
      }else if(entry == contentsTemple){
         src = wallSrc;
      }else if(entry == contentsEntrance){
         src = doorSrc;
      }
      var img = paper.image(src,x,y,w,h).toBack();
      return [img]
   };

   function updateCounter() {
      var x = xCounter;
      var y = yCounter;
      var count = answer.hist.length;
      var text = taskStrings.nbClicks(count,maxSteps);
      if(!counter){
         counter = paper.text(x,y,text).attr(counterAttr);
      }else{
         counter.attr("text",text);
      }
   };

   function reloadAnswer(noVisual) {
      for(var iHist = 0; iHist < answer.hist.length; iHist++){
         var pos = answer.hist[iHist];
         clickCell(pos.row,pos.col,true,noVisual);
      }
      if(answer.hist.length == 0){ // TODO: il manque un "&& !noVisual" ici non ?
         updateCounter();
      }
   };

   function checkResult(noVisual) {
      if(answer.hist.length == 0){
         var error = taskStrings.click;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      initPossibleTemplePos();
      initGridContent();
      reloadAnswer(noVisual);

      if(!templePos){
         var error = taskStrings.errorNotFound;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      if(level == "hard"){
         if(gridContent[templePos.row][templePos.col] != contentsEntrance){
            var error = taskStrings.errorEntranceNotFound;
            if(!noVisual){
               displayError(error);
            }
            return { successRate: 0, message: error }
         }
      }

      if(answer.hist.length > maxSteps){
         var error = taskStrings.errorTooManySteps;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      var extraSteps = answer.hist.length - minSteps;
      if(extraSteps > 0){
         var error = taskStrings.errorSteps(level);
         if(!noVisual){
            displayError(error);
         }
         var score;
         if (level == "hard") {
           score = (extraSteps < 7) ? ((7 - extraSteps) / 10) : 0;
         } else {
           score = (extraSteps == 1) ? 0.5 : 0;
         }
         return { successRate: 0.5, message: error }
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

