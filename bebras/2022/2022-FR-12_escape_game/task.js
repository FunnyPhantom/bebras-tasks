function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         peoplePerTeam: 1,
         characterW: 80,
         lobbyRoomW: 90,
         availableCharacters: [
            {shape: 'elephant', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'green_hat', accessory: 'scarf'},
            {shape: 'elephant', hat: 'yellow_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'green_hat', accessory: 'necklace'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'necklace'},
         ],
         rooms: [
           ['shape=bear'],
           ['hat=green_hat'],
           ['accessory=necklace'],
         ],
      },
      easy: {
         characterW: 80,
         lobbyRoomW: 90,
         peoplePerTeam: 2,
         availableCharacters: [
            {shape: 'elephant', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'green_hat', accessory: 'scarf'},
            {shape: 'elephant', hat: 'yellow_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'green_hat', accessory: 'necklace'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'necklace'},
         ],
         rooms: [
           ['shape=fox', 'hat=yellow_hat'],
           ['shape=bear', 'hat=green_hat'],
           ['accessory=scarf', 'accessory=necklace'],
         ],
      },
      medium: {
         characterW: 80,
         lobbyRoomW: 90,
         peoplePerTeam: 3,
         availableCharacters: [
            {shape: 'elephant', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'green_hat', accessory: 'scarf'},
            {shape: 'elephant', hat: 'yellow_hat', accessory: 'necklace'},
            {shape: 'elephant', hat: 'blue_hat', accessory: 'scarf'},
            {shape: 'bear', hat: 'green_hat', accessory: 'necklace'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'scarf'},
         ],
         rooms: [
           ['shape=fox', 'hat=yellow_hat', 'shape=bear'],
           ['hat=green_hat', 'accessory=necklace', 'shape=elephant'],
           ['accessory=scarf', 'accessory=necklace', 'accessory=necklace'],
         ],
      },
/*
      basic: {
         peoplePerTeam: 3,
         availableCharacters: [
            {shape: 'elephant', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'blue_hat', accessory: 'scarf'},
            {shape: 'elephant', hat: 'yellow_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'scarf'},
         ],
         rooms: [
           ['all', ['accessory=scarf,hat=blue_hat', 'shape!=bear'], 'shape=bear'],
           ['hat=blue_hat', ['accessory=necklace,shape=bear', 'shape!=fox'], 'all'],
           ['hat=blue_hat', 'accessory=scarf', 'all'],
         ],
      },
      medium: {
         peoplePerTeam: 4,
         availableCharacters: [
            {shape: 'elephant', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'blue_hat', accessory: 'scarf'},
            {shape: 'elephant', hat: 'yellow_hat', accessory: 'necklace'},
            {shape: 'bear', hat: 'blue_hat', accessory: 'necklace'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'scarf'},
            {shape: 'fox', hat: 'yellow_hat', accessory: 'bowtie'},
         ],
         rooms: [
            ['hat=blue_hat', 'hat=yellow_hat', 'hat=blue_hat', 'shape=fox'],
            ['hat=blue_hat', 'accessory=bowtie', 'shape=bear', 'shape=elephant'],
            ['hat=blue_hat', 'accessory=scarf', 'accessory=necklace', 'hat=yellow_hat'],
         ],
      },
*/
      hard: {
         peoplePerTeam: 4,
         availableCharacters: [
			{shape: 'elephant' , hat: 'blue_hat', accessory: 'bowtie'},
			{shape: 'elephant' , hat: 'yellow_hat', accessory: 'bowtie'},

			{shape: 'elephant' , hat: 'green_hat', accessory: 'scarf'},
			{shape: 'elephant' , hat: 'blue_hat', accessory: 'scarf'},
			{shape: 'elephant' , hat: 'yellow_hat', accessory: 'scarf'},

			{shape: 'fox' , hat: 'green_hat', accessory: 'scarf'},
			{shape: 'fox' , hat: 'blue_hat', accessory: 'scarf'},
			{shape: 'fox' , hat: 'yellow_hat', accessory: 'scarf'},

			{shape: 'bear' , hat: 'green_hat', accessory: 'bowtie'},
			//{shape: 'bear' , hat: 'green_hat', accessory: 'scarf'},
			{shape: 'bear' , hat: 'blue_hat', accessory: 'bowtie'},
			//{shape: 'bear' , hat: 'blue_hat', accessory: 'scarf'},
			{shape: 'bear' , hat: 'yellow_hat', accessory: 'bowtie'},
			//{shape: 'bear' , hat: 'yellow_hat', accessory: 'scarf'},
			{shape: 'elephant' , hat: 'green_hat', accessory: 'necklace'},
			{shape: 'fox' , hat: 'green_hat', accessory: 'necklace'},
			{shape: 'elephant' , hat: 'blue_hat', accessory: 'necklace'},
			{shape: 'fox' , hat: 'blue_hat', accessory: 'necklace'},
			//{shape: 'elephant' , hat: 'yellow_hat', accessory: 'necklace'},
			//{shape: 'fox' , hat: 'yellow_hat', accessory: 'necklace'},
         ],
         rooms: [
			[['hat=green_hat', 'shape=bear'], ['hat=blue_hat', 'accessory=necklace'], 'hat=blue_hat', 'hat=yellow_hat'],
			['accessory=bowtie', 'accessory=bowtie', ['accessory=scarf', 'shape=bear'], 'accessory=scarf'],
			[['shape=elephant', 'accessory=necklace'], ['shape=elephant', 'accessory=necklace'], 'shape=fox' , 'shape=fox']
         ],
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

   var peoplePerTeam;
   var availableCharacters;
   var rooms;
   var roomCorridorPositions = [];
   var corridorPaths = [];

   var animDuration = 500;
   var speedFactor = 0.015;

   var buttonW = 180;
   var buttonH = 40;
   var yValidateButton;
   var thisRoomButton;
   var validateButton;

   var characterY = 55;
   var characterW;
   var charactersPerRow = 8;
   var characterPaths = [];
   var dragData = {};
   var dragLimits = {};

   var roomH;
   var roomW = 175;
   var roomsY;
   var lobbyRoomW;
   var lobbyWalls;
   var criteriaH = 100;

   var rng;
   var criteriaPermutation;
   var simPlaying = false;
   var allCriteriaCircles;
   var allCriteriaCirclesErrors;

   var colors = {
      white: '#ffffff',
      yellow: "#ffbc65",
      darkYellow: "#a7731e",
      gold: "#f8bf1a",
      black: "#000",
      blue: "#4a90e2",
      blueLobby: "#a5cbfa",
      seaBlue: "#0e5667",
      grey: "#e5e5e5",
      darkGrey: "#888",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ee2d7c",
      red: '#FF001F',
      lightPink: "#fac2c7",
      orange: "#f6891e",
      lightGrey: "#F1F2F7",
      exit: '#fff0bf',
	    veryLightGrey: "#F8F8F8",
      criteriaCircle: "#888",
      criteriaCircleHover: "#f6891e",
   };

   var roomAttr = {
      surface: {
         fill: colors.veryLightGrey,
         stroke: 'none',
      },
      surfaceLobby: {
         fill: colors.blueLobby,
         stroke: 'none',
      },
      surfaceExit: {
         fill: colors.exit,
         stroke: 'none',
      },
      roomNameText: {
         "font-size": 16,
         fill: colors.black
      },
      wall: {
         fill: 'none',
         stroke: colors.black,
         'stroke-width': 2,
      },
      criteriaSign: {
         fill: 'none',
         stroke: colors.black,
         'stroke-width': 3,
      },
      criteriaNotEqual: {
         fill: 'none',
         stroke: colors.red,
         'stroke-width': 2,
      },
      corridor: {
         fill: 'none',
         stroke: colors.darkGrey,
         'stroke-width': 2,
      },
      corridorCriteriaCircle: {
         fill: 'none',
         stroke: colors.criteriaCircle,
         "stroke-width": 3,
         "stroke-dasharray": ".",
      },
      corridorCriteriaCircleError: {
         fill: 'none',
         stroke: colors.red,
         "stroke-width": 3,
         "stroke-dasharray": "",
      },
      corridorEnd: {
         fill: colors.grey,
         stroke: 'none',
      },
      corridorEndWall: {
         stroke: colors.darkGrey,
         'stroke-width': 2,
         fill: 'none',
      },
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

   var bearImage = $("#bear").attr("src");
   var foxImage = $("#fox").attr("src");
   var elephantImage = $("#elephant").attr("src");
   var yellowHatImage = $("#yellow_hat").attr("src");
   var blueHatImage = $("#blue_hat").attr("src");
   var greenHatImage = $("#green_hat").attr("src");
   var scarfImage = $("#scarf").attr("src");
   var necklaceImage = $("#necklace").attr("src");
   var bowtieImage = $("#bowtie").attr("src");
   var hatProportion = 140/60;
   var accessoryProportion = 100/70;
   var shapeProportion = 130/80;

   subTask.loadLevel = function(curLevel) {
      if(respEnabled){
         displayHelper.responsive = true;
         // displayHelper.hideSolutionButton = true;
         convertDOM();
      }else{
         displayHelper.responsive = false;
      }
      level = curLevel;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0) + 2);
	  genCriteriaPermuation();
      availableCharacters = data[level].availableCharacters;
      peoplePerTeam = data[level].peoplePerTeam;
      rooms = data[level].rooms;
      characterW = data[level].characterW ? data[level].characterW : 66;
      lobbyRoomW = data[level].lobbyRoomW ? data[level].lobbyRoomW : 60;
      var maxCriteriaHeightCount = 0;
      for (var iRoom = 0; iRoom < rooms.length; iRoom++) {
         var room = rooms[iRoom];
         var criteriaHeightCount = 0;
         for (var iCorridor = 0; iCorridor < room.length; iCorridor++) {
            var corridor = room[iCorridor];
            criteriaHeightCount += (typeof corridor == "object" ? corridor.length : 1);
         }
         maxCriteriaHeightCount = Math.max(maxCriteriaHeightCount, criteriaHeightCount);
      }
      roomH = maxCriteriaHeightCount * criteriaH;
      roomsY = characterY + (characterW + marginY) * (Math.floor(availableCharacters.length / charactersPerRow) + 1);
      yValidateButton = roomsY + roomH + marginY * 2;
      paperH = yValidateButton + buttonH + marginY;

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
      initCharacters();
      initRooms();
      initValidateButton();
      initHandlers();
      reloadAnswer();

      displayHelper.hideValidateButton = true;
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      var charactersPosition = [];
      for (var i = 0; i < availableCharacters.length; i++) {
         charactersPosition[i] = ['start', i];
      }

      var defaultAnswer = {
         characters: charactersPosition,
         charactersState: 'lobby',
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
   
   function genCriteriaPermuation() {
	   var criteria = [['elephant', 'fox', 'bear'], ['necklace', 'bowtie', 'scarf'], ['blue_hat', 'yellow_hat', 'green_hat']];
	   criteriaPermutation = {};
	   for (var iCriteria = 0; iCriteria < 3; iCriteria++) {
		   var perm = [0, 1, 2];
		   rng.shuffle(perm);
		   for (var iValue = 0; iValue < 3; iValue++) {
			   criteriaPermutation[criteria[iCriteria][iValue]] = criteria[iCriteria][perm[iValue]];
		   }
	   }
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
      dragLimits = {
         yMin: characterW / 2,
         yMax: paperH - characterW / 2,
         xMin: characterW / 2,
         xMax: paperW - characterW / 2,
      };

      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h;
      for(var iOver = 1; iOver <= 10; iOver++){ 
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               h = characterY - characterW/2;
               break;
            case 2:
               x = 0; y = 0;
               w = getCharacterStartPosition(0).x - characterW/2;
               h = roomsY;
               break;
            case 3:
               if(level != "hard"){
                  x = getCharacterStartPosition(availableCharacters.length - 1).x + characterW/2; 
               }else{
                  x = getCharacterStartPosition(Math.ceil(availableCharacters.length/2) - 1).x + characterW/2;
               }
               y = 0;
               w = paperW - x;
               h = roomsY;
               break;
            case 4:
               x = 0; 
               y = getCharacterStartPosition(availableCharacters.length - 1).y + characterW/2 + 5;
               w = paperW;
               h = roomsY - y;
               break;
            case 5:
               x = 0; 
               y = roomsY;
               w = paperW / 2 - (rooms.length * roomW + lobbyRoomW * 2) / 2;
               h = roomH;
               break;
            case 6:
               x = paperW / 2 + (rooms.length * roomW + lobbyRoomW * 2) / 2; 
               y = roomsY;
               w = paperW - x;
               h = yValidateButton - buttonH/2 - y;
               break;
            case 7:
               x = 0; 
               y = roomsY + roomH;
               w = (paperW - buttonW)/2;
               h = paperH - y;
               break;
            case 8:
               x = (paperW + buttonW)/2;
               y = yValidateButton - buttonH/2;
               w = paperW - x;
               h = paperH - y;
               break;
            case 9:
               x = (paperW - buttonW)/2;
               y = yValidateButton + buttonH/2;
               w = buttonW;
               h = paperH - y;
               break;
            case 10:
               x = (paperW - buttonW)/2;
               y = roomsY + roomH;
               w = paperW - x;
               h = yValidateButton - buttonH/2 - y;
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
   }

   function initCharacters() {
      for (var iCharacter = 0; iCharacter < availableCharacters.length; iCharacter++) {
         var character = availableCharacters[iCharacter];
         var characterPosition = getCharacterStartPosition(iCharacter);
         var characterPath = drawCharacter(character, characterPosition.x, characterPosition.y, null, false);
         characterPaths[iCharacter] = characterPath;
         Beav.dragWithTouch(characterPath, onCharacterDragMove, onCharacterDragStart(iCharacter), onCharacterDragEnd, displayHelper);
      }
   }

   function canDragCharacter(iCharacter) {
      if (simPlaying) {
         return false;
      }

      return true;
      // if ('lobby' === answer.charactersState) {
      //    return true;
      // }
      //
      // return 'lobby' !== answer.characters[iCharacter][0] && 'start' !== answer.characters[iCharacter][0];
   }

   function onCharacterDragStart(iCharacter) {
      return function(x,y,ev) {
         dragData = { iCharacter: iCharacter };
         if (!canDragCharacter(iCharacter)) {
            return false;
         }

         characterPaths[iCharacter].toFront();
         var tr = characterPaths[iCharacter][0].matrix.split();
         characterPaths[iCharacter][0].initialTx = tr.dx;
         characterPaths[iCharacter][0].initialTy = tr.dy;
      }
   }

   function onCharacterDragMove(dx, dy, x, y, ev) {
      var iCharacter = dragData.iCharacter;
      if (!canDragCharacter(iCharacter)) {
         return;
      }

      if ('lobby' !== answer.charactersState) {
         stopSimulation(iCharacter);
         displayError("");
      }

      allCriteriaCirclesErrors.hide();
      var x0 = characterPaths[iCharacter][0].attr("cx") + characterPaths[iCharacter][0].initialTx;
      var y0 = characterPaths[iCharacter][0].attr("cy") + characterPaths[iCharacter][0].initialTy;
      var newX = x0 + dx;
      var newY = y0 + dy;
      newX = Math.max(dragLimits.xMin, newX);
      newX = Math.min(dragLimits.xMax, newX);
      newY = Math.max(dragLimits.yMin, newY);
      newY = Math.min(dragLimits.yMax, newY);
      dx = newX - x0;
      dy = newY - y0;
      characterPaths[iCharacter].transform(["T", characterPaths[iCharacter][0].initialTx + dx, characterPaths[iCharacter][0].initialTy + dy]);
      checkOverCriteriaCircle(newX, newY);
   }

   function onCharacterDragEnd() {
      var iCharacter = dragData.iCharacter;
      if (!canDragCharacter(iCharacter)) {
         return false;
      }

      var currentPosition = getCharacterPosition(iCharacter);
      var newX = currentPosition.x;
      var newY = currentPosition.y;

      var isOverCriteria = checkOverCriteriaCircle(newX, newY);
      var findLobbySpot = false;
      if (null !== isOverCriteria) {
         for (var iOtherCharacter = 0; iOtherCharacter < availableCharacters.length; iOtherCharacter++) {
            if (iOtherCharacter in answer.characters && typeof answer.characters[iOtherCharacter] == "object") {
               if (answer.characters[iOtherCharacter].join(',') === isOverCriteria.join(',')) {
                  if (answer.characters[iOtherCharacter][0] === 'start' && answer.characters[iCharacter][0] !== 'start') {
                     findLobbySpot = true;
                  } else {
                     // Invert positions
                     answer.characters[iOtherCharacter] = answer.characters[iCharacter];
                  }
               }
            }
         }
         answer.characters[iCharacter] = isOverCriteria;
      }
      if ((null === isOverCriteria || findLobbySpot) && 'lobby' === answer.charactersState) {
         // Find available spot
         var takenSpots = [];
         for (var i = 0; i < availableCharacters.length; i++) {
            var position = answer.characters[i];
            if ('start' === position[0]) {
               takenSpots.push(position[1]);
            }
         }
         for (var n = 0; n < availableCharacters.length; n++) {
            if (-1 === takenSpots.indexOf(n)) {
               answer.characters[iCharacter] = ['start', n];
               break;
            }
         }
      }

      disableCriteriaHighlight();
      updateCharacterPositions();
   }

   function checkOverCriteriaCircle(x, y) {
      var iRoom = answer.charactersState;
      if ('lobby' === iRoom) {
         var over = null;
         for (var iCorridor = 0; iCorridor < peoplePerTeam; iCorridor++) {
            var criteriaCircleLimits = roomCorridorPositions[iRoom][iCorridor][0].circleBeforeCorridorLimits;
            var criteriaCircle = roomCorridorPositions[iRoom][iCorridor][0].circleBeforeCorridor;
            if (y >= criteriaCircleLimits[0] && y <= criteriaCircleLimits[1]) {
               over = [iRoom, iCorridor, 0];
               criteriaCircle.attr('stroke', colors.criteriaCircleHover);
            } else {
               criteriaCircle.attr('stroke', colors.criteriaCircle);
            }
         }

         for (var i = 0; i < availableCharacters.length; i++) {
            var characterPosition = getCharacterStartPosition(i);
            if (x >= characterPosition.x - (characterW + marginX) / 2 && x <= characterPosition.x + (characterW + marginX) / 2
              && y >= characterPosition.y - characterW / 2 && y <= characterPosition.y + characterW / 2
            ) {
               return ['start', i];
            }
         }

         return over;
      }

      var room = rooms[iRoom];
      over = null;
      for (iCorridor = 0; iCorridor < room.length; iCorridor++) {
         var corridor = room[iCorridor];
         if (typeof corridor != "object") {
            corridor = [corridor];
         }
         for (var iCriteria = 0; iCriteria < corridor.length; iCriteria++) {
            criteriaCircle = roomCorridorPositions[iRoom][iCorridor][iCriteria].circleBeforeCorridor;
            var boundingBox = criteriaCircle.getBBox();
            if (y >= boundingBox.y - 25 && y <= boundingBox.y2 + 25) {
               over = [iRoom, iCorridor, iCriteria];
               criteriaCircle.show();
            } else {
               criteriaCircle.hide();
            }
         }
      }

      return over;
   }

   function disableCriteriaHighlight() {
      for (var iElement = 0; iElement < allCriteriaCircles.length; iElement++) {
         allCriteriaCircles[iElement].attr('stroke', colors.criteriaCircle);
      }
   }

   function drawCharacter(character, x, y, scale, criteria) {
      var accessory = criteriaPermutation[character.accessory];
      var shape = criteriaPermutation[character.shape];
      var hat = criteriaPermutation[character.hat];

      var shapePath = paper.set();
      var characterSize = (scale ? scale : 0.8) * characterW;

      yAccessory = criteria ? y : y + characterSize/2 - 0;
      if ('scarf' === accessory) {
         if (!criteria) yAccessory -= 5;
         shapePath.push(paper.image(scarfImage, x - characterSize / 2, yAccessory - characterSize / accessoryProportion / 2, characterSize, characterSize / accessoryProportion));
      } else if ('necklace' === accessory) {
         if (!criteria) yAccessory -= 6;
         shapePath.push(paper.image(necklaceImage, x - characterSize / 2, yAccessory - characterSize / accessoryProportion / 2, characterSize, characterSize / accessoryProportion));
      } else if ('bowtie' === accessory) {
         if (!criteria) yAccessory -= 8;
         shapePath.push(paper.image(bowtieImage, x - characterSize / 2, yAccessory - characterSize / accessoryProportion / 2, characterSize, characterSize / accessoryProportion));
      }

      if ('elephant' === shape) {
         shapePath.push(paper.image(elephantImage, x - characterSize / 2, y - characterSize / shapeProportion / 2, characterSize, characterSize / shapeProportion));
      } else if ('bear' === shape) {
         shapePath.push(paper.image(bearImage, x - characterSize / 2, y - characterSize / shapeProportion / 2, characterSize, characterSize / shapeProportion));
      } else if ('fox' === shape){
         shapePath.push(paper.image(foxImage, x - characterSize / 2, y - characterSize / shapeProportion / 2, characterSize, characterSize / shapeProportion));
      }

      var yAccessory = criteria ? y : y - characterSize/2 + 10;
      if ('blue_hat' === hat) {
         shapePath.push(paper.image(blueHatImage, x - characterSize / 2, yAccessory - characterSize / hatProportion / 2, characterSize, characterSize / hatProportion));
      } else if ('yellow_hat' === hat) {
         shapePath.push(paper.image(yellowHatImage, x - characterSize / 2, yAccessory - characterSize / hatProportion / 2, characterSize, characterSize / hatProportion));
      } else if ('green_hat' === hat) {
         shapePath.push(paper.image(greenHatImage, x - characterSize / 2, yAccessory - characterSize / hatProportion / 2, characterSize, characterSize / hatProportion));
      }

      shapePath.attr('cx', x);
      shapePath.attr('cy', y);

      return shapePath;
   }

   function initRooms() {
      var roomsX = paperW / 2 - (rooms.length * roomW + lobbyRoomW * 2) / 2;
      allCriteriaCircles = paper.set();
      allCriteriaCirclesErrors = paper.set();
      var roomsXLobby = roomsX;
      roomsX += lobbyRoomW;
      for (var iRoom = 0; iRoom < rooms.length; iRoom++) {
         roomCorridorPositions[iRoom] = [];
         corridorPaths[iRoom] = [];
         drawRoom(iRoom, roomsX, roomsY);
         roomsX += roomW;
      }
      drawLobbyRoom(roomsXLobby, roomsY);
      drawExitRoom(roomsX, roomsY);
      lobbyWalls.toFront();
   }

   function drawLobbyRoom(x, y) {
      paper.path(['M', x, y, 'L', x + lobbyRoomW, y, 'L', x + lobbyRoomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.surfaceLobby);
      lobbyWalls = paper.path(['M', x, y, 'L', x + lobbyRoomW, y, 'L', x + lobbyRoomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.wall);
      paper.text(x + lobbyRoomW / 2, y - 15, taskStrings.lobby).attr(roomAttr.roomNameText);
      roomCorridorPositions['lobby'] = [];

      for (var i = 0; i < peoplePerTeam; i++) {
         var sums = 0;
         for (var iCriteria = 0; iCriteria < roomCorridorPositions[0][i].length; iCriteria++) {
            sums += roomCorridorPositions[0][i][iCriteria].criteriaStart.y;
         }
         var positionY = Math.round(sums / roomCorridorPositions[0][i].length);
         roomCorridorPositions['lobby'].push([{
            criteriaStartCharacter: {x: x + lobbyRoomW - lobbyRoomW / 2, y: positionY},
            circleBeforeCorridor: drawCircleCorridor(x + lobbyRoomW - lobbyRoomW / 2, positionY),
            circleBeforeCorridorLimits: roomCorridorPositions[0][i][0].circleBeforeCorridorLimits
         }]);
      }
   }

   function drawExitRoom(x, y) {
      paper.path(['M', x, y, 'L', x + lobbyRoomW, y, 'L', x + lobbyRoomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.surfaceExit);
      paper.path(['M', x, y, 'L', x + lobbyRoomW, y, 'L', x + lobbyRoomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.wall);
      paper.text(x + lobbyRoomW / 2, y - 15, taskStrings.exit).attr(roomAttr.roomNameText);
   }

   function drawRoom(iRoom, x, y) {
      var room = rooms[iRoom];
      paper.path(['M', x, y, 'L', x + roomW, y, 'L', x + roomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.surface);
      paper.text(x + roomW / 2, y - 15, taskStrings.roomName(iRoom + 1)).attr(roomAttr.roomNameText);
      var criteriaCount = 0;
      for (var iCorridor = 0; iCorridor < room.length; iCorridor++) {
         var corridor = room[iCorridor];
         if (typeof corridor != "object") {
            corridor = [corridor];
         }
         for (var iCriteria = 0; iCriteria < corridor.length; iCriteria++) {
            var criteriaAnds = corridor[iCriteria].split(',');
            criteriaCount += criteriaAnds.length;
         }
      }

      var criteriaX = x + roomW - 80;
      var criteriaY = y;
      for (iCorridor = 0; iCorridor < room.length; iCorridor++) {
         corridor = room[iCorridor];
         if (typeof corridor != "object") {
            corridor = [corridor];
         }
         var criteriaYStart = criteriaY;
         var corridorHeightCount = 0;
         for (iCriteria = 0; iCriteria < corridor.length; iCriteria++) {
            var criteriaX0 = criteriaX;
            criteriaAnds = corridor[iCriteria].split(',');
            corridorHeightCount += criteriaAnds.length;
            var criteriaToDraw = [];
            for (var iCriteriaAnd = 0; iCriteriaAnd < criteriaAnds.length; iCriteriaAnd++) {
               var criteriaAnd = criteriaAnds[iCriteriaAnd];
               var equality = true;
               var elements;
               var key;
               var value;
               if ('all' === criteriaAnd) {
                  key = 'all';
               } else if (-1 !== criteriaAnd.indexOf('!=')) {
                  equality = false;
                  elements = criteriaAnd.split('!=');
                  key = elements[0];
                  value = elements[1];
               } else {
                  elements = criteriaAnd.split('=');
                  key = elements[0];
                  value = elements[1];
               }
               criteriaToDraw.push({ key: key, value: value, equality: equality });
            }
            drawCriteria(criteriaToDraw, criteriaX0, criteriaY + (roomH / criteriaCount) * criteriaToDraw.length / 2);
            criteriaY += (roomH / criteriaCount) * criteriaToDraw.length;
         }
         drawCorridor(x, criteriaYStart, criteriaY, iRoom, iCorridor, corridorHeightCount);
      }
      paper.path(['M', x, y, 'L', x + roomW, y, 'L', x + roomW, y + roomH, 'L', x, y + roomH, 'z']).attr(roomAttr.wall);
   }

   function drawCriteria(criteriaToDraw, xCriteria, yCriteria) {
      yCriteria -= 8;

      var scaleSignX = 0.8;
      var scaleSignY = 0.6;
      var scaleSignYGlobal = scaleSignY * criteriaToDraw.length;
      paper.path([
        'M', xCriteria - characterW*scaleSignX / 2, yCriteria - characterW*scaleSignYGlobal / 2,
        'L', xCriteria + characterW*scaleSignX / 2, yCriteria - characterW*scaleSignYGlobal / 2,
        'L', xCriteria + characterW*scaleSignX / 2, yCriteria + characterW*scaleSignYGlobal / 2,
        'L', xCriteria - characterW*scaleSignX / 2, yCriteria + characterW*scaleSignYGlobal / 2,
        'z',
        'M', xCriteria - characterW*scaleSignX / 16, yCriteria + characterW*scaleSignYGlobal / 2,
        'L', xCriteria + characterW*scaleSignX / 16, yCriteria + characterW*scaleSignYGlobal / 2,
        'L', xCriteria + characterW*scaleSignX / 16, yCriteria + characterW*scaleSignYGlobal/2*1.8,
        'L', xCriteria - characterW*scaleSignX / 16, yCriteria + characterW*scaleSignYGlobal/2*1.8,
        'z'
      ]).attr(roomAttr.criteriaSign);


      for (var iCriteria = 0; iCriteria < criteriaToDraw.length; iCriteria++) {
         var key = criteriaToDraw[iCriteria].key;
         var value = criteriaToDraw[iCriteria].value;
         var equality = criteriaToDraw[iCriteria].equality;
         var character = {};
         if ('all' !== key) {
            character[key] = value;
         }

         var scale = 0.7;
         var criteriaH = characterW*0.6;
         var yCriteriaShifted = yCriteria - (criteriaToDraw.length - 1)*criteriaH/2 + iCriteria*criteriaH;
         drawCharacter(character, xCriteria, yCriteriaShifted, scale, true);
         if (!equality) {
            paper.path([
              'M', xCriteria - characterW*scaleSignX / 2, yCriteriaShifted + characterW*scaleSignY / 2,
              'L', xCriteria + characterW*scaleSignX / 2, yCriteriaShifted - characterW*scaleSignY / 2
            ]).attr(roomAttr.criteriaNotEqual);
         }
      }
   }

   function drawCorridor(xRoom, yStart, yEnd, iRoom, iCorridor, criteriaLength) {
      var corridorHeight = yEnd - yStart;
      var corridorEndY = (yStart + yEnd) / 2;
      var xCriteriaStart = xRoom + roomW - 130;
      var xCriteriaEnd = xRoom + roomW - 60;
      var xCorridorEndStart = xRoom + roomW - 30;
      var xRoomEnd = xRoom + roomW;

      var corridor = rooms[iRoom][iCorridor];
      if (typeof corridor != "object") {
         corridor = [corridor];
      }

      roomCorridorPositions[iRoom][iCorridor] = [];
      var iCriteria = 0;
      for (var iCriteriaId = 0; iCriteriaId < corridor.length; iCriteriaId++) {
         var criteriaAnds = rooms[iRoom][iCorridor][iCriteriaId].split(',').length;
         var scaleFactor = 1/criteriaLength;
         var middleCriteria = iCriteria + criteriaAnds / 2;
         // Draw criteria corridors
         paper.path(['M', xCriteriaStart, yStart + corridorHeight * iCriteria*scaleFactor, 'L', xCriteriaEnd, yStart + corridorHeight * iCriteria*scaleFactor]).attr(roomAttr.corridor);
         paper.path(['M', xCriteriaStart, yStart + corridorHeight * (iCriteria+criteriaAnds)*scaleFactor, 'L', xCriteriaEnd, yStart + corridorHeight * (iCriteria+criteriaAnds)*scaleFactor]).attr(roomAttr.corridor);

         var circleBeforeCorridor = drawCircleCorridor(xRoom + characterW / 2, yStart + corridorHeight * middleCriteria*scaleFactor);
         circleBeforeCorridor.hide();

         roomCorridorPositions[iRoom][iCorridor][iCriteriaId] = {
            criteriaStart: {x: xCriteriaStart - characterW / 2 - 5, y: yStart + corridorHeight * middleCriteria*scaleFactor},
            criteriaStartCharacter: {x: xRoom + characterW / 2, y: yStart + corridorHeight * middleCriteria*scaleFactor},
            criteriaEnd: {x: xCriteriaEnd - characterW / 2, y: yStart + corridorHeight * middleCriteria*scaleFactor},
            criteriaEndCharacter: {x: xCriteriaEnd - 8, y: yStart + corridorHeight * middleCriteria*scaleFactor},
            endCorridorStart: {x: xCorridorEndStart, y: corridorEndY},
            endCorridorEnd: {x: xRoomEnd, y: corridorEndY},
            endCorridorEndCharacter: {x: xRoomEnd + characterW / 2, y: corridorEndY},
            circleBeforeCorridor: circleBeforeCorridor,
            circleBeforeCorridorLimits: [yStart, yEnd],
            circleBeforeCorridorError: drawCircleCorridorError(xRoom + characterW / 2, yStart + corridorHeight * middleCriteria*scaleFactor)
         };

         iCriteria += criteriaAnds;
      }

      // Draw end corridor
      corridorPaths[iRoom][iCorridor] = paper.path(['M', xCorridorEndStart, corridorEndY - corridorHeight/criteriaLength / 2, 'L', xRoomEnd, corridorEndY - corridorHeight/criteriaLength / 2, 'L', xRoomEnd, corridorEndY + corridorHeight/criteriaLength / 2, 'L', xCorridorEndStart, corridorEndY + corridorHeight/criteriaLength / 2, 'z'])
        .attr(roomAttr.corridorEnd);
      paper.path(['M', xCorridorEndStart, corridorEndY - corridorHeight/criteriaLength / 2, 'L', xRoomEnd, corridorEndY - corridorHeight/criteriaLength / 2]).attr(roomAttr.corridorEndWall);
      paper.path(['M', xCorridorEndStart, corridorEndY + corridorHeight/criteriaLength / 2, 'L', xRoomEnd, corridorEndY + corridorHeight/criteriaLength / 2]).attr(roomAttr.corridorEndWall);

      // Draw connection between the two
      paper.path(['M', xCriteriaEnd, yStart, 'L', xCorridorEndStart, corridorEndY - corridorHeight/criteriaLength / 2]).attr(roomAttr.corridorEndWall);
      paper.path(['M', xCriteriaEnd, yEnd, 'L', xCorridorEndStart, corridorEndY + corridorHeight/criteriaLength / 2]).attr(roomAttr.corridorEndWall);
   }

   function drawCircleCorridor(x, y) {
      var circleBeforeCorridor = paper.circle(x, y, characterW*0.8 / 2).attr(roomAttr.corridorCriteriaCircle);
      allCriteriaCircles.push(circleBeforeCorridor);

      return circleBeforeCorridor;
   }

   function drawCircleCorridorError(x, y) {
      var circleBeforeCorridor = paper.circle(x, y, characterW*0.9 / 2).attr(roomAttr.corridorCriteriaCircleError);
      circleBeforeCorridor.hide();
      allCriteriaCirclesErrors.push(circleBeforeCorridor);

      return circleBeforeCorridor;
   }

   function initHandlers() {
      validateButton.click(function () {
         if (simPlaying || 'lobby' !== answer.charactersState) {
            stopSimulation();
            displayError("");
         } else {
            checkResult(false);
         }
      });
      validateButton.attr("cursor","pointer");

      thisRoomButton.click(function () {
         if (simPlaying) {
            return;
         }

         displayError("");
         resetCorridors();
         executeRoom(answer.charactersState, false, true);
      });
      thisRoomButton.attr("cursor","pointer");
   }

   function resetCorridors() {
      for (var iRoom = 0; iRoom < rooms.length; iRoom++) {
         for (var iCorridor = 0; iCorridor < rooms[iRoom].length; iCorridor++) {
            corridorPaths[iRoom][iCorridor].attr('fill', colors.grey);
         }
      }
   }

   function stopSimulation(exceptCharacter) {
      for (var animID in subTask.raphaelFactory.animations) {
         subTask.raphaelFactory.stopAnimateID(animID);
      }

      simPlaying = false;
      answer.charactersState = 'lobby';
      answer.characters = answer.initialCharacterPositions;
      updateCharacterPositions(exceptCharacter);
      resetCorridors();
      allCriteriaCirclesErrors.hide();
      validateButton[1].attr('text', taskStrings.validate);
      thisRoomButton.hide();
      validateButton.transform(['T', 0, 0]);
   }

   function initValidateButton() {
      var xValidateButton = paperW/2;
      var xRect = paperW/2 - buttonW/2;
      var yRect = yValidateButton - buttonH/2;
      var rect = paper.rect(xRect,yRect,buttonW,buttonH).attr(buttonAttr.rect);
      var text = paper.text(xValidateButton,yValidateButton, taskStrings.validate).attr(buttonAttr.text);
      validateButton = paper.set(rect,text);

      xRect = xValidateButton - buttonW/2;
      yRect = yValidateButton - buttonH/2;
      rect = paper.rect(xRect,yRect,buttonW,buttonH).attr(buttonAttr.rect);
      text = paper.text(xValidateButton,yValidateButton, taskStrings.thisRoom).attr(buttonAttr.text);
      thisRoomButton = paper.set(rect,text);
      thisRoomButton.hide();
   }

   function reloadAnswer() {
      updateCharacterPositions();
   }

   function updateCharacterPositions(exceptCharacter) {
      for (var iCharacter = 0; iCharacter < availableCharacters.length; iCharacter++) {
         if (iCharacter === exceptCharacter) {
            continue;
         }
         var position = answer.characters[iCharacter];
         characterPaths[iCharacter].attr("cursor", canDragCharacter(iCharacter) ? 'grab' : 'auto');

         if ('start' === position[0]) {
            var characterPosition = getCharacterStartPosition(position[1]);
            moveCharacter(iCharacter, characterPosition.x, characterPosition.y);
         } else {
            var iRoom = position[0];
            var corridor = position[1];
            var criteria = position[2];
            position = roomCorridorPositions[iRoom][corridor][criteria].criteriaStartCharacter;
            moveCharacter(iCharacter, position.x, position.y);
         }
      }

      if ('lobby' !== answer.charactersState) {
         showThisRoomButton();
      }
   }

   function getCharacterStartPosition(startPosition) {
      var thisCharacterY = characterY + (characterW + marginY) * Math.floor(startPosition / charactersPerRow);
      var isLastRow = Math.floor(startPosition / charactersPerRow) === Math.floor((availableCharacters.length - 1) / charactersPerRow);
      var characterX = paperW / 2 - (((isLastRow ? availableCharacters.length % charactersPerRow : charactersPerRow) - 1) * (characterW + marginX)) / 2;

      return {
         x: characterX + (startPosition % charactersPerRow) * (characterW + marginX),
         y: thisCharacterY,
      };
   }

   function moveCharacter(iCharacter, x, y) {
      var x0 = characterPaths[iCharacter][0].attr("cx");
      var y0 = characterPaths[iCharacter][0].attr("cy");
      var dx = x - x0;
      var dy = y - y0;
      characterPaths[iCharacter].toFront();
      characterPaths[iCharacter].transform(["T", dx, dy]);
   }

   function checkResult(noVisual) {
      if (!noVisual) {
         displayError("");
      }

      var charactersInLobby = 0;
      for (var iCharacter = 0; iCharacter < availableCharacters.length; iCharacter++) {
         var position = answer.characters[iCharacter];
         if ('start' !== position[0]) {
            charactersInLobby++;
         }
      }

      answer.initialCharacterPositions = Beav.Object.clone(answer.characters);

      if (charactersInLobby !== peoplePerTeam) {
         var message = taskStrings.incorrectNumberOfCharacters(peoplePerTeam);
         if (!noVisual) {
            displayError(message);
         }

         return {successRate: 0, message: message};
      }

      if (!noVisual) {
         simPlaying = true;
         updateCharacterPositions();
         validateButton[1].attr('text', taskStrings.cancel);
      }

      return exitLobby(noVisual);
   }

   function exitLobby(noVisual) {
      if (noVisual) {
         return executeRoom(0, noVisual);
      } else {
         var charactersToMove = {};
         var distanceX = 0;
         for (var iCharacter = 0; iCharacter < availableCharacters.length; iCharacter++) {
            var position = answer.characters[iCharacter];
            if ('start' !== position[0]) {
               var currentPosition = getCharacterPosition(iCharacter);
               var boundingBox = lobbyWalls.getBBox();
               charactersToMove[iCharacter] = {x: boundingBox.x2 + characterW / 2, y: currentPosition.y};
               distanceX = charactersToMove[iCharacter].x - currentPosition.x;
            }
         }

         var realAnimDuration = animDuration * speedFactor * distanceX;

         moveCharacters(charactersToMove, realAnimDuration, function () {
            executeRoom(0, noVisual);
         });
      }
   }

   function getCharacterPosition(iCharacter) {
      var tr = characterPaths[iCharacter][0].matrix.split();
      var x0 = tr.dx + characterPaths[iCharacter][0].attr("cx");
      var y0 = tr.dy + characterPaths[iCharacter][0].attr("cy");

      return {x: x0, y: y0};
   }

   function moveCharacters(charactersToMove, duration, callback) {
      var remainingMoving = [];
      var callbackCalled = false;
      for (var iCharacter in charactersToMove) {
         remainingMoving.push(Number(iCharacter));
         var destination = charactersToMove[iCharacter];
         (function (iCharacter) {
            translateCharacter(Number(iCharacter), destination, duration, function () {
               if (-1 !== remainingMoving.indexOf(Number(iCharacter))) {
                  remainingMoving.splice(remainingMoving.indexOf(Number(iCharacter)), 1);
               }
               if (remainingMoving.length <= 0 && !callbackCalled) {
                  callbackCalled = true;
                  callback();
               }
            });
         })(iCharacter);
      }
   }

   function executeRoom(iRoom, noVisual, useCurrentPosition) {
      var teamCharacters = [];
      for (var iCharacter = 0; iCharacter < availableCharacters.length; iCharacter++) {
         var position = answer.characters[iCharacter];
         if ('start' !== position[0]) {
            teamCharacters.push(iCharacter);
         }
      }

      var corridorsToUse = getCorridorsForCharacters(iRoom, teamCharacters);
      var impossibleCorridors = [];
      answer.charactersState = iRoom;

      var charactersToMove = {};
      var maxYDifference = 0;
      var corridorCallables = [];
      for (var iTeamCharacter = 0; iTeamCharacter < teamCharacters.length; iTeamCharacter++) {
         iCharacter = teamCharacters[iTeamCharacter];
         var corridor, criteria;
         if (useCurrentPosition) {
            corridor = answer.characters[iCharacter][1];
            criteria = answer.characters[iCharacter][2];
         } else {
            corridor = corridorsToUse[iTeamCharacter];
            criteria = canCharacterUseCorridor(iCharacter, iRoom, corridor);
            answer.characters[iCharacter] = [iRoom, corridor, false === criteria ? 0 : criteria];
         }
         var canUseCorridor = canCharacterUseCorridor(iCharacter, iRoom, corridor);
         if (false === canUseCorridor || criteria !== canUseCorridor) {
            if (!noVisual) {
               charactersToMove[iCharacter] = roomCorridorPositions[iRoom][corridor][false !== criteria ? criteria : 0].criteriaStartCharacter;
               maxYDifference = Math.max(maxYDifference, charactersToMove[iCharacter].y - getCharacterPosition(iCharacter).y);
            }
            var corridors = rooms[iRoom][corridor];
            if (typeof corridors != "object") {
               corridors = [corridors];
            }

            impossibleCorridors.push([iRoom, corridor, corridors, canCharacterUseCorridorCriteria(corridors[0], availableCharacters[iCharacter])]);
            (function (corridor) {
               if (useCurrentPosition) {
                  corridorPaths[iRoom][corridor].attr('fill', colors.red);
               } else {
                  corridorCallables.push(function () {
                     corridorPaths[iRoom][corridor].attr('fill', colors.red);
                  });
               }
            })(corridor);
         } else if (!noVisual) {
            charactersToMove[iCharacter] = roomCorridorPositions[iRoom][corridor][criteria].criteriaStartCharacter;
            maxYDifference = Math.max(maxYDifference, charactersToMove[iCharacter].y - getCharacterPosition(iCharacter).y);
            (function (corridor) {
               if (useCurrentPosition) {
                  corridorPaths[iRoom][corridor].attr('fill', colors.green);
               } else {
                  corridorCallables.push(function () {
                     corridorPaths[iRoom][corridor].attr('fill', colors.green);
                  });
               }
            })(corridor);
         }
      }

      if (noVisual) {
         if (impossibleCorridors.length > 0) {
            return {successRate: 0, message: messageErrorImpossible(impossibleCorridors[0][2], impossibleCorridors[0][3])};
         } else if (iRoom + 1 >= rooms.length) {
            return {successRate: 1, message: taskStrings.success};
         } else {
            return executeRoom(iRoom + 1, noVisual, false);
         }
      } else {
         moveCharacters(charactersToMove, animDuration * maxYDifference / 250, function () {
            for (var i = 0; i < corridorCallables.length; i++) {
               corridorCallables[i]();
            }
            if (impossibleCorridors.length > 0) {
               simPlaying = false;
               setImpossibleState(iRoom, impossibleCorridors);
            } else {
               exitRoom(iRoom, teamCharacters, corridorsToUse, 0);
            }
         });
      }
   }
   
   function messageErrorImpossible(corridors, error) {
		var corridor = corridors[0];
		var criteriaAnds = corridor.split(',');
		var criteriaAnd = criteriaAnds[error[1]];
		var elements;
		var key;
		var value;
		var equality = true;
		if (-1 !== criteriaAnd.indexOf('!=')) {
		   elements = criteriaAnd.split('!=');
		   key = elements[0];
		   value = elements[1];
		   equality = false;
		} else {
		   elements = criteriaAnd.split('=');
		   key = elements[0];
		   value = elements[1];
		}
		return taskStrings.errorImpossible(key, criteriaPermutation[value], equality);
   }

   function setImpossibleState(iRoom, impossibleCorridors) {
      showCharacterError(impossibleCorridors[0]);
      displayError(messageErrorImpossible(impossibleCorridors[0][2], impossibleCorridors[0][3]));
      updateCharacterPositions();
   }

   function showCharacterError(corridorData) {
      var iRoom = corridorData[0];
      var iCorridor = corridorData[1];
      var criteriaCircle = roomCorridorPositions[iRoom][iCorridor][0].circleBeforeCorridorError;
      criteriaCircle.show();
   }

   function showThisRoomButton() {
      // thisRoomButton.show();
      validateButton[1].attr('text', taskStrings.cancel);
      // validateButton.transform(['T', -(buttonW/2 + marginX/2), 0]);
      // thisRoomButton.transform(['T', buttonW/2 + marginX/2, 0]);
   }

   function exitRoom(iRoom, teamCharacters, corridorsToUse, step) {
      var stepPositions = [
        'criteriaEndCharacter',
        'endCorridorStart',
        'endCorridorEndCharacter',
      ];
      var stepDurations = [
        animDuration * speedFactor * (roomCorridorPositions[0][0][0].criteriaEndCharacter.x - roomCorridorPositions[0][0][0].criteriaStartCharacter.x),
        animDuration * speedFactor * (roomCorridorPositions[0][0][0].endCorridorStart.x - roomCorridorPositions[0][0][0].criteriaEndCharacter.x),
        animDuration * speedFactor * (roomCorridorPositions[0][0][0].endCorridorEndCharacter.x - roomCorridorPositions[0][0][0].endCorridorStart.x),
      ];

      var charactersToMove = {};
      for (var iTeamCharacter = 0; iTeamCharacter < teamCharacters.length; iTeamCharacter++) {
         var iCharacter = teamCharacters[iTeamCharacter];
         var corridor = corridorsToUse[iTeamCharacter];
         var criteria = canCharacterUseCorridor(iCharacter, iRoom, corridor);
         charactersToMove[iCharacter] = roomCorridorPositions[iRoom][corridor][criteria][stepPositions[step]];
      }

      moveCharacters(charactersToMove, stepDurations[step], function () {
         if (step < stepPositions.length - 1) {
            exitRoom(iRoom, teamCharacters, corridorsToUse, step + 1);
         } else {
            if (iRoom + 1 < rooms.length) {
               executeRoom(iRoom + 1, false, false);
            } else {
               simPlaying = false;
               stopSimulation();
               validateButton[1].attr('text', taskStrings.validate);
               platform.validate('done');
            }
         }
      });
   }

   function getCorridorsForCharacters(iRoom, teamCharacters) {
      var corridors = rooms[iRoom];

      var permutations = permutator(Beav.Array.init(corridors.length,function(i) {
      	return i
      }));

      var maxMatching = -1;
      var maxPermutation;
      for (var iPermutation = 0; iPermutation < permutations.length; iPermutation++) {
         var permutation = permutations[iPermutation];
         var countPeopleMatching = 0;
         for (var iCorridor = 0; iCorridor < corridors.length; iCorridor++) {
            var canUse = canCharacterUseCorridor(teamCharacters[iCorridor], iRoom, permutation[iCorridor]);
            if (false !== canUse) {
               countPeopleMatching++;
            }
         }
         if (countPeopleMatching > maxMatching) {
            maxMatching = countPeopleMatching;
            maxPermutation = permutation;
         }
      }

      return maxPermutation;
   }

   function permutator(inputArr) {
      var results = [];

      function permute(arr, memo) {
         var cur, memo = memo || [];

         for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
               results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
         }

         return results;
      }

      return permute(inputArr);
   }

   function canCharacterUseCorridor(iCharacter, iRoom, iCorridor) {
      var character = availableCharacters[iCharacter];
      var corridors = rooms[iRoom][iCorridor];
      if (typeof corridors != "object") {
         corridors = [corridors];
      }

      for (var iInternCorridor = 0; iInternCorridor < corridors.length; iInternCorridor++) {
         var corridor = corridors[iInternCorridor];
         if (true === canCharacterUseCorridorCriteria(corridor, character)) {
            return iInternCorridor;
         }
      }

      return false;
   }

   function canCharacterUseCorridorCriteria(corridor, character) {
      var criteriaAnds = corridor.split(',');
      var ok = true;
      for (var iCriteriaAnd = 0; iCriteriaAnd < criteriaAnds.length; iCriteriaAnd++) {
         var criteriaAnd = criteriaAnds[iCriteriaAnd];
         var elements;
         var key;
         var value;
         if ('all' === criteriaAnd) {
            ok = true;
         } else if (-1 !== criteriaAnd.indexOf('!=')) {
            elements = criteriaAnd.split('!=');
            key = elements[0];
            value = elements[1];
            ok = character[key] !== value;
         } else {
            elements = criteriaAnd.split('=');
            key = elements[0];
            value = elements[1];
            ok = character[key] === value;
         }
         if (!ok) {
            return ['error', iCriteriaAnd];
         }
      }

      return true;
   }

   function translateCharacter(iCharacter, destination, duration, callback) {
      var xDestination = destination.x;
      var yDestination = destination.y;
      var currentPosition = getCharacterPosition(iCharacter);
      var dx = xDestination - currentPosition.x;
      var dy = yDestination - currentPosition.y;

      var anim = new Raphael.animation({transform: ["...", "T", dx, dy]}, duration, callback);
      subTask.raphaelFactory.animate("translateCharacter_" + iCharacter, characterPaths[iCharacter], anim);
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

