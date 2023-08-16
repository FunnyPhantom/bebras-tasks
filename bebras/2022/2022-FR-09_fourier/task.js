function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         rowsUnderGround: 6,
         rowsAboveGround: 5,
         colors: 1,
         colorInitialValues: [
            {height: 2, every: 3, start: 1},
         ],
         levels: [-4, 0, -4, 0, -4, 0, -4, 0, -4, 0, -4, 0, -4],
         minHeight: 1,
         maxHeight: 5,
		 maxEvery: 6,
         startControlEnabled: false,
      },
      easy: {
         rowsUnderGround: 9,
         rowsAboveGround: 4,
         cols: 22,
         colors: 2,
         levels: [-3, 0, -3, 0, -3, 0, -3, 0, -7, -4, -7, -4, -7, -4, -7, -4, -7, -4, -7],
         minHeight: 0,
         maxHeight: 8,
		 maxEvery: 7
      },
      medium: {
         rowsUnderGround: 13,
         rowsAboveGround: 5,
         cols: 22,
         colors: 4,
         levels: [-11, -7, -11, -9, -11, -7, -11, -7, -11, -9, -11, -7, -11, -7, -11, -9, -11, -7, -11, -7],
         minHeight: 0,
         maxHeight: 13,
		 maxEvery: 19
      },
      hard: {
         rowsUnderGround: 13,
         rowsAboveGround: 5,
         cols: 22,
         colors: 4,
         levels: [-7, -5, -4, -11, -4, -5, -7, -8, -4, -8, -4, -8, -7, -5, -4, -11, -4, -5, -7, -8],
         minHeight: 0,
		 maxEvery: 19
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

   var colW = 24;
   var rowH = colW;
   var nbRows;
   var nbRowsAboveGround;
   var nbCols;
   var nbColors;
   var groundLevels;

   var windowW;
   var windowH;
   var yWindow = marginY + 220;
   var xWindow;
   var yColNumbers;

   var controlsW;
   var controlH = 150;
   var controlW = 170;
   var controlsX;
   var controlsY = marginY;

   var buttonWidth = 30;
   var inputWidth = 30;
   var barHeight = controlH - 2*buttonWidth - 2*10;
   var heightMin;
   var heightMax;

   var gridContentSet;

   var buttons = [];
   var textInputs = [];
   var heightZone = [];
   //var shovels = [];
   var startControlEnabled;

   var buttonTypes;
   var directions = ['minus', 'plus'];

   var grassSrc = $("#grass").attr("src");
   var groundSrc = $("#ground").attr("src");
   var sand1Src = $("#sand1").attr("src");
   var sand2Src = $("#sand2").attr("src");
   var sand3Src = $("#sand3").attr("src");
   var sand4Src = $("#sand4").attr("src");
   //var shovelSrc = $("#shovel").attr("src");
   var textures = {
      grass: grassSrc,
      ground: groundSrc,
      sand1: sand1Src,
      sand2: sand2Src,
      sand3: sand3Src,
      sand4: sand4Src,
      //shovel: shovelSrc,
   };

   var colors = {
      white: '#ffffff',
      yellow: "#f5a623",
      darkYellow: "#a7731e",
      gold: "#f8bf1a",
      black: "#333",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      seaBlue: "#0e5667",
      grey: "#e5e5e5",
      darkGrey: "#bbbbbb",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ee2d7c",
      red: '#FF001F',
      lightPink: "#fac2c7",
      orange: "#f6891e",
      lightGrey: "#F1F2F7",
   };

   var windowAttr = {
      grid: {
         stroke: colors.black,
         "stroke-width": 3,
         opacity: 0.15,
         fill: "none"
      },
      groundLevel: {
         stroke: colors.black,
         "stroke-width": 3,
         opacity: 1,
         fill: "none"
      },
      groundLevelArrow: {
         stroke: colors.black,
         "stroke-width": 2,
         fill: "none"
      },
      groundLevelText: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         "text-anchor": "end"
      },
      colNumbers: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
      },
      warningTriangle: {
         stroke: 'none',
         fill: colors.red,
         r: 5,
      },
      warningText: {
         "font-size": 10,
         "font-weight": "bold",
         fill: colors.white,
      },
      warningTextTop: {
         "font-size": 12,
         "font-weight": "bold",
         fill: colors.white,
      },
      warningLine: {
         stroke: colors.red,
         "stroke-width": 3,
         "stroke-dasharray": ".",
         fill: "none"
      }
   };
   var controlsAttr = {
      rect: {
         stroke: "none",
         fill: colors.grey,
         r: 8,
      },
      circ: {
         stroke: "none",
         fill: colors.darkBlue
      },
      arr: {
         "font-size": 20,
         "font-weight": "bold",
         fill: "white"
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         "text-anchor": "start",
      },
      buttonRect: {
         stroke: "none",
         fill: colors.blue,
         r: 3,
      },
      inputRect: {
         stroke: "none",
         fill: colors.white,
      },
      buttonText: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.white,
      },
      inputText: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
      },
      inputCircle: {
         stroke: "none",
         fill: colors.lightGrey,
      },
      inputLine: {
         stroke: colors.black,
         "stroke-width": 0.5,
         "stroke-dasharray": "- ",
         fill: "none"
      },
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
      nbRows = data[level].rowsUnderGround;
      nbRowsAboveGround = data[level].rowsAboveGround ? data[level].rowsAboveGround  : 2;
      nbCols = data[level].levels.length;
      nbColors = data[level].colors;
      groundLevels = data[level].levels;
      heightMin = data[level].minHeight;
      heightMax = data[level].maxHeight;
      startControlEnabled = false !== data[level].startControlEnabled;
      if (startControlEnabled) {
         buttonTypes = ['height', 'every', 'start'];
      } else {
         buttonTypes = ['height', 'every'];
      }
      windowW = (nbCols + 4) * colW;
      windowH = (nbRowsAboveGround + nbRows) * rowH;
      xWindow = (paperW - windowW)/2;
      var numbersMarginY = 20;
      if (heightMin < 0) {
         numbersMarginY = 50;
      }
      controlsW = nbColors * controlW + (nbColors - 1) * marginX;
      controlsX = paperW/2 - controlsW/2;
      yColNumbers = yWindow + windowH + numbersMarginY;
      paperH = yColNumbers + marginY;

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
      initGrid();
      initControls();
      initHandlers();
      reloadAnswer();

      displayHelper.customValidate = checkResult;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var defaultSands = [];
      var initialValues = 'colorInitialValues' in data[level] ? data[level].colorInitialValues : [];
      for (var iColor = 0; iColor < data[level].colors; iColor++) {
         var initialValue = {height: 0, start: 1, every: 1};
         if (initialValues[iColor]) {
            for (var i = 0; i < buttonTypes.length; i++) {
               var buttonType = buttonTypes[i];
               if (buttonType in initialValues[iColor]) {
                  initialValue[buttonType] = initialValues[iColor][buttonType];
               }
            }
         }
         defaultSands.push(initialValue);
      }

      var defaultAnswer = {
         sands: defaultSands,
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
   }

   function initGrid() {
      var x0 = xWindow;
      var yRow0 = yWindow + nbRowsAboveGround*rowH;
      var h = windowH;
      var attr = windowAttr;

      // paper.rect(x0, yRow0, x0 + windowW, yRow0 + windowH).attr({fill: 'white', stroke: 'none'});

      for(var iRow = 0; iRow <= nbRows; iRow++){
         if (iRow < nbRows) {
            // Draw left and right
            drawCellOnGrid(-2, -iRow-1, 'ground');
            drawCellOnGrid(-1, -iRow-1, 'ground');
            drawCellOnGrid(nbCols, -iRow-1, 'ground');
            drawCellOnGrid(nbCols + 1, -iRow-1, 'ground');
         }
      }

      var colsWithGrass = [-2, -1, nbCols, nbCols + 1];
      for (var iCol = 0; iCol < colsWithGrass.length; iCol++) {
         var column = colsWithGrass[iCol];
         paper.image(textures.grass, xWindow + (column + 2) * colW, yRow0 - 8, colW, 10);
      }

      for (var iCol = 0; iCol < nbCols; iCol++) {
         // Draw ground level
         paper.path(['M', xWindow + (iCol + 2) * colW, yRow0 - groundLevels[iCol] * rowH, 'H', xWindow + (iCol + 3) * colW]).attr(windowAttr.groundLevel);
         if (iCol >= 1) {
            paper.path(['M', xWindow + (iCol + 2) * colW, yRow0 - groundLevels[iCol] * rowH, 'V', yRow0 - groundLevels[iCol - 1] * rowH]).attr(windowAttr.groundLevel);
         }

         // Draw numbers
         paper.text(xWindow + (iCol + 2) * colW + colW / 2, yColNumbers, iCol + 1).attr(attr.colNumbers);
      }

      // Draw grid
      paper.path(["M",x0 + 2 * colW + 1,yRow0 - nbRowsAboveGround*rowH,"V",yRow0 - nbRowsAboveGround*rowH + h]).attr(attr.grid);
      paper.path(["M",x0 + (nbCols + 2) * colW - 1,yRow0 - nbRowsAboveGround*rowH,"V",yRow0 - nbRowsAboveGround*rowH + h]).attr(attr.grid);
      for(iRow = -nbRowsAboveGround; iRow <= nbRows; iRow++){
         var y = yRow0 + iRow*rowH;
         paper.path(["M",x0 + 2 * colW + 1,y,"H",x0 + (nbCols + 2) * colW - 2]).attr(attr.grid);
      }

      // Draw ground arrow
      paper.path(['M', xWindow - 2, yRow0, 'H', xWindow - 50]).attr(windowAttr.groundLevelArrow);
      var xText = xWindow - 55;
	  if (typeof(enableRtl) !== "undefined") {
		  xText -= 40;
	  }
	  paper.text(xText, yRow0, taskStrings.ground).attr(windowAttr.groundLevelText);
   }

   function initControls() {
      var attr = controlsAttr;
      var x0 = controlsX;
      var y0 = controlsY;
      for(var iColor = 0; iColor < nbColors; iColor++){
         buttons[iColor] = {};
         textInputs[iColor] = {};
         var xControl = x0 + iColor * (controlW + marginX);
         var yControl = y0;
         paper.rect(xControl,yControl,controlW,controlH).attr(attr.rect);

         // Height
         drawVerticalNumberPicker(xControl + 10, yControl + 10, attr, iColor);
         // Every
         drawNumberPicker(xControl + 70, yControl + (startControlEnabled ? 0 : controlH / 4), taskStrings.every, attr, iColor, "every");
         if (false !== startControlEnabled) {
            // Start
            drawNumberPicker(xControl + 70, yControl + controlH / 2, taskStrings.start, attr, iColor, "start");
         }
      }
   }

   function drawVerticalNumberPicker(x, y, controlsAttr, iColor) {
      heightZone[iColor] = paper.image(textures['sand' + (iColor + 1)], x + 1, y + buttonWidth + barHeight / 2, buttonWidth - 2, barHeight / 2);

      var barHeightMarginY = 2;
      var barHeightWithMargins = barHeight - barHeightMarginY*2;
	  /*
      shovels[iColor] = paper.set(
        paper.image(textures.shovel, x + 3, y + buttonWidth + barHeightMarginY + 0*barHeightWithMargins / 3, buttonWidth - 6, barHeightWithMargins / 3),
        paper.image(textures.shovel, x + 3, y + buttonWidth + barHeightMarginY + 2*barHeightWithMargins / 3, buttonWidth - 6, barHeightWithMargins / 3)
      );
      shovels[iColor].attr('opacity', 0);
      */
      var plusButtonRect = paper.rect(x, y, buttonWidth, buttonWidth).attr(controlsAttr.buttonRect);
      var plusButtonText = paper.text(x + buttonWidth / 2, y + buttonWidth / 2, "^").attr(controlsAttr.buttonText);
      paper.circle(x + buttonWidth / 2, y + buttonWidth + barHeight / 2, 13).attr(controlsAttr.inputCircle);
      textInputs[iColor].height = paper.text(x + buttonWidth / 2, y + buttonWidth + barHeight / 2, "9").attr(controlsAttr.inputText);
      paper.path( ["M", x, y + buttonWidth, "L", x, y + buttonWidth + barHeight ]).attr(controlsAttr.inputLine);
      paper.path( ["M", x + buttonWidth, y + buttonWidth, "L", x + buttonWidth, y + buttonWidth + barHeight ]).attr(controlsAttr.inputLine);
      var minusButtonRect = paper.rect(x, y + buttonWidth + barHeight, buttonWidth, buttonWidth).attr(controlsAttr.buttonRect);
      var minusButtonText = paper.text(x + buttonWidth / 2, y + buttonWidth + barHeight + buttonWidth / 2, "v").attr(controlsAttr.buttonText);
      buttons[iColor].height = {
         minus: paper.set(minusButtonRect, minusButtonText),
         plus: paper.set(plusButtonRect, plusButtonText),
      }
   }

   function drawNumberPicker(x, y, text, controlsAttr, iColor, buttonType) {
      var buttonX = x;
      var buttonY = y + marginY + 15;
	  var xText = x;
	  if (typeof(enableRtl) !== "undefined") {
		  xText = x + 2*buttonWidth + inputWidth;
	  }
      paper.text(xText, y + marginY, text).attr(controlsAttr.text);

      var minusText = "<";
	  var plusText = ">";
	  if (typeof(enableRtl) != "undefined") {
		  plusText = "<";
		  minusText = ">";
	  }
      var minusButtonRect = paper.rect(buttonX, buttonY, buttonWidth, buttonWidth).attr(controlsAttr.buttonRect);
      var minusButtonText = paper.text(buttonX + buttonWidth / 2, buttonY + buttonWidth / 2, minusText).attr(controlsAttr.buttonText);
      paper.rect(buttonX + buttonWidth, buttonY, inputWidth, buttonWidth).attr(controlsAttr.inputRect);
      textInputs[iColor][buttonType] = paper.text(buttonX + buttonWidth + inputWidth / 2, buttonY + buttonWidth / 2, "0").attr(controlsAttr.inputText);
      var plusButtonRect = paper.rect(buttonX + buttonWidth + inputWidth, buttonY, buttonWidth, buttonWidth).attr(controlsAttr.buttonRect);
      var plusButtonText = paper.text(buttonX + buttonWidth + inputWidth + buttonWidth / 2, buttonY + buttonWidth / 2, plusText).attr(controlsAttr.buttonText);

      buttons[iColor][buttonType] = {
         minus: paper.set(minusButtonRect, minusButtonText),
         plus: paper.set(plusButtonRect, plusButtonText),
      }
   }

   function initHandlers() {
      for (var iColor = 0; iColor < nbColors; iColor++) {
         for (var iButtonType = 0; iButtonType < buttonTypes.length; iButtonType++) {
            for (var iDirection = 0; iDirection < directions.length; iDirection++) {
               var button = buttons[iColor][buttonTypes[iButtonType]][directions[iDirection]];
               button.click(clickButton(iColor,buttonTypes[iButtonType], directions[iDirection]));
               button.attr("cursor","pointer");
            }
         }
      }
   }

   function clickButton(iColor, buttonType, direction) {
      return function() {
         displayError("");
         var currentValue = answer.sands[iColor][buttonType];
         var newValue = direction === 'plus' ? currentValue + 1 : currentValue - 1;
         if (('every' === buttonType) && (newValue < 1 || newValue > data[level].maxEvery || newValue > nbCols)) {
			 return;
		 }
		 if (('start' === buttonType) && (newValue < 1 || newValue > nbCols)) {
            return;
         }
         if ('height' === buttonType && (newValue < heightMin || newValue > heightMax)) {
            return;
         }
         answer.sands[iColor][buttonType] = newValue;
         reloadAnswer();
      }
   }

   function reloadAnswer() {
      for (var iColor = 0; iColor < nbColors; iColor++) {
         var sandData = answer.sands[iColor];
         for (var iButtonType = 0; iButtonType < buttonTypes.length; iButtonType++) {
            var buttonType = buttonTypes[iButtonType];
            textInputs[iColor][buttonType].attr('text', sandData[buttonType]);
         }
         if (sandData.height >= 0) {
            heightZone[iColor].attr('opacity', 1);
            //shovels[iColor].attr('opacity', 0);
         } else {
            heightZone[iColor].attr('opacity', 0);
            //shovels[iColor].attr('opacity', 1);
         }
      }

      updateGrid();
   }

   function updateGrid() {
      if (gridContentSet) {
         gridContentSet.remove();
      }
      gridContentSet = paper.set();

      var redTriangles = [];
      var redTrianglesDrawn = [];

      for (var iCol = 0; iCol < nbCols; iCol++) {
         var sandTypes = [];
         var currentHeight = groundLevels[iCol];
         for (var iColor = 0; iColor < nbColors; iColor++) {
            if (doesSandApplyToColumn(iColor, iCol)) {
               sandTypes.push({
                  color: iColor,
                  height: answer.sands[iColor].height,
               });
            }
         }

         // Fill the part before ground level with ground
         var levels = {};
         for (var iHeight = -nbRows; iHeight < groundLevels[iCol]; iHeight++) {
            levels[iHeight] = ['ground'];
         }

         /*
         // First, we dig
         for (var iSandType = 0; iSandType < sandTypes.length; iSandType++) {
            var sandType = sandTypes[iSandType];
            if (sandType.height < 0) {
               for (var iHeight = 0; iHeight < Math.abs(sandType.height); iHeight++) {
                  currentHeight--;
                  levels[currentHeight] = ['shovel'];
               }
            }
         }
         */
         // Then, we fill
         for (var iSandType = 0; iSandType < sandTypes.length; iSandType++) {
            var sandType = sandTypes[iSandType];
            if (sandType.height > 0) {
               for (var iHeight = 0; iHeight < Math.abs(sandType.height); iHeight++) {
                  if (!(currentHeight in levels)) {
                     levels[currentHeight] = [];
                  }
                  levels[currentHeight].push('sand' + (sandType.color + 1));
                  currentHeight++;
               }
            }
         }

         // And finally we draw this
         for (var iHeight in levels) {
            if (iHeight >= -nbRows && iHeight < nbRowsAboveGround) {
               var content = levels[iHeight];
               for (var iContent = 0; iContent < content.length; iContent++) {
                  var cellContent = drawCellOnGrid(iCol, iHeight, content[iContent]);
                  gridContentSet.push(cellContent);
               }
            }
         }

         if (currentHeight < -nbRows) {
            // Draw bottom triangle
            redTriangles.push([iCol, currentHeight + nbRows]);
         } else if (currentHeight > 0) {
            // Draw top triangle
            redTriangles.push([iCol, currentHeight]);
         }
      }

      for (var iRedTriangle = 0; iRedTriangle < redTriangles.length; iRedTriangle++) {
         var redTriangle = drawRedTriangleOnGrid(redTriangles[iRedTriangle][0], redTriangles[iRedTriangle][1]);
         redTrianglesDrawn.push(redTriangle);
         gridContentSet.push(redTriangle);
      }

      gridContentSet.toBack();

      for (iRedTriangle = 0; iRedTriangle < redTriangles.length; iRedTriangle++) {
         redTrianglesDrawn[iRedTriangle].toFront();
      }
   }

   function drawCellOnGrid(x, y, texture) {
      //if ('shovel' === texture) {
      //   return paper.image(textures[texture], xWindow + (x + 2) * colW + 2, yWindow + (nbRowsAboveGround-y-1)*rowH + 2, colW - 4, rowH - 4);
      //} else {
         return paper.image(textures[texture], xWindow + (x + 2) * colW, yWindow + (nbRowsAboveGround-y-1)*rowH, colW, rowH);
      //}
   }

   function drawRedTriangleOnGrid(iCol, relativeHeight) {
      var yRow0 = yWindow + nbRowsAboveGround*rowH;
      var y = yRow0 + (relativeHeight > 0 ? -nbRowsAboveGround*rowH - 18 : nbRows*rowH + 18);
      var yLine = yRow0 + (relativeHeight > 0 ? -1 : nbRows*rowH+1);

      var textPath = paper.text(xWindow + (iCol + 2) * colW + colW / 2, y + (relativeHeight < 0 ? -5 : 0), (relativeHeight > 0 ? '' : '-') + "\n" + Math.abs(relativeHeight))
        .attr(relativeHeight > 0 ? windowAttr.warningTextTop : windowAttr.warningText);
      textPath.node.childNodes[0].setAttribute('dy', 0);
      textPath.node.childNodes[1].setAttribute('dy', 8);

      var relativeHeightSign = relativeHeight >= 0 ? 1 : -1;

      var trianglePath = paper.path(['M', xWindow + (iCol + 2) * colW + colW / 2, y - relativeHeightSign * 10, 'L', xWindow + (iCol + 2) * colW + colW, y + relativeHeightSign * 10, 'L', xWindow + (iCol + 2) * colW, y + relativeHeightSign * 10, 'z']).attr(windowAttr.warningTriangle);

      var linePath = paper.path(['M', xWindow + (iCol + 2) * colW - colW / 2, yLine, 'L', xWindow + (iCol + 2) * colW + 3*colW / 2, yLine]).attr(windowAttr.warningLine);

      return paper.set(
        trianglePath,
        textPath,
        linePath
      );
   }

   function checkResult(noVisual) {
      if (!noVisual) {
         displayError("");
      }
      for (var iCol = 0; iCol < nbCols; iCol++) {
         var currentHeight = groundLevels[iCol];
         for (var iColor = 0; iColor < nbColors; iColor++) {
            if (doesSandApplyToColumn(iColor, iCol)) {
               currentHeight += answer.sands[iColor].height;
            }
         }
         if (currentHeight !== 0) {
            var error = taskStrings.errorIncorrectLevel + " " + taskStrings.retry;
            if (!noVisual){
               //platform.validate("done");
               displayError(error);
            }

            return { successRate: 0, message: error}
         }
      }

      if(!noVisual){
         // disableButtons();
         platform.validate("done");
      }

      return { successRate: 1, message: taskStrings.success }
   }

   function doesSandApplyToColumn(iColor, iCol) {
      return iCol % answer.sands[iColor].every === (answer.sands[iColor].start - 1) % answer.sands[iColor].every && iCol + 1 >= answer.sands[iColor].start;
   }

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

