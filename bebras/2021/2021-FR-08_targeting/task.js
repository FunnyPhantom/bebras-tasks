function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         tableType: [0],
         colType: [[0,1]],
         tableContent: [
            [
               [ [20,2], 13 ],
               [ [4,3], 12 ],
               [ [5,3], 13 ],
               [ [5,3], 12 ],
               [ [12,3], 2 ],
               [ [6,4], 0 ],
               [ [8,4], 6 ],
               [ [12,4], 9 ],
               [ [18,4], 6 ],
               [ [24,4], 12 ],
               [ [28,4], 7 ],
               [ [18,6], 6 ],
               [ [23,6], 9 ],
               [ [30,6], 8 ]
            ]
         ],
         nbToSelect: 4
      },
      easy: {
         tableType: [0],
         colType: [[0,1]],
         tableContent: [
            [
               [ [20,2], 13 ],
               [ [4,3], 12 ],
               [ [5,3], 13 ],
               [ [5,3], 12 ],
               [ [12,3], 2 ],
               [ [6,4], 0 ],
               [ [8,4], 6 ],
               [ [12,4], 9 ],
               [ [18,4], 6 ],
               [ [24,4], 12 ],
               [ [28,4], 7 ],
               [ [18,6], 6 ],
               [ [23,6], 9 ],
               [ [30,6], 8 ],
               [ [1,7], 7 ],
               [ [3,7], 9 ],
               [ [5,7], 13 ],
               [ [7,7], 0 ]
            ]
         ],
         nbToSelect: 2
      },
      medium: {
         tableType: [0,1],
         colType: [ [0,1,2], [2,3] ],
         tableContent: [
            [
               [ [20,2], 13 ],
               [ [4,3], 12 ],
               [ [5,3], 13 ],
               [ [5,3], 12 ],
               [ [12,3], 2 ],
               [ [6,4], 0 ],
               [ [8,4], 6 ],
               [ [12,4], 9 ],
               [ [18,4], 6 ],
               [ [24,4], 12 ],
               [ [28,4], 7 ],
               [ [18,6], 6 ],
               [ [23,6], 9 ],
               [ [1,7], 7 ],
               [ [3,7], 9 ]
            ],
            [
              [4,3],
              [7,14],
              [12,16],
              [11,17],
              [9,22],
              [2,18],
              [10,15],
              [0,21],
              [13,8],
              [6,23],
              [1,17]
            ]
         ],
         nbToSelect: 2
      },
      hard: {
         tableType: [0,1,2],
         colType: [ [0,1,2], [2,3], [1,4] ],
         tableContent: [
            [
               [ [5,2], 4 ],
               [ [9,2], 10 ],
               [ [18,2], 1 ],
               [ [20,2], 13 ],
               [ [4,3], 12 ],
               [ [5,3], 13 ],
               [ [5,3], 12 ],
               [ [7,3], 5 ],
               [ [12,3], 2 ],
               [ [6,4], 0 ],
               [ [8,4], 6 ],
               [ [18,4], 6 ],
               [ [24,4], 12 ],
               [ [28,4], 7 ],
               [ [17,6], 11 ],
               [ [18,6], 6 ],
               [ [1,7], 7 ],
               [ [3,7], 9 ],
               [ [7,7], 0 ]
            ],
            [
              [4,3],
              [7,14],
              [2,18],
              [12,16],
              [11,17],
              [9,22],
              [10,15],
              [0,19],
              [13,8],
              [6,23],
              [1,17],
              [5,21]
            ],
            [
               [0,3],
               [2,5],
               [3,12],
               [3,9],
               [3,0],
               [4,5],
               [5,4],
               [6,12],
               [7,13],
               [9,3],
               [9,6],
               [11,13],
               [12,9],
               [12,6],
               [12,3],
               [13,11],
               [13,7]
            ]
         ],
         nbToSelect: 2
      }
   };
   if (typeof(threeVersions) != "undefined") {
      data = {
         easy: data.easy,
         medium: data.medium,
         hard: data.hard
      };
   }

   var nbTables;

   var tableType, colType, tableContent;

   var tableNames = [ taskStrings.restaurant, taskStrings.geolocation, taskStrings.castorbook ];
   var colNames = [ taskStrings.date, taskStrings.name, taskStrings.phone, taskStrings.distance, taskStrings.friend ];
   var animals;
   var phoneNumbers = [ 
      "06 54", "06 82", "06 18", "06 60", "06 03",
      "06 19", "06 78", "06 11", "06 88", "06 32",
      "06 44", "06 28", "06 23", "06 56"
   ];

   var rng;

   var colors = {
      black: "#4a4a4a",
      grey: "#c6c7c9",
      lightGrey: "#ebebeb",
      green: "#b7d995",
      blue: "#4a90e2",
      lightBlue: "#cbcbFF",
      darkBlue: "#2e5e95",
      yellow: "#ffd600",
      darkYellow: "#cfb00c"
   };

   subTask.loadLevel = function (curLevel) {
      level = curLevel;
      if (level == "hard") {
         colNames[2] = taskStrings.splitPhone;
      } else {
         colNames[2] = taskStrings.phone;
      }
      tableType = data[level].tableType;
      colType = data[level].colType;
      tableContent = data[level].tableContent;
      nbTables = tableType.length;
      animals = taskStrings.animals.slice();
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      randomizeData();
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
      initTables();
      initHandlers();
      updateSelection();
      $("#friend1").html(animals[13]);
      $("#friend2").html(animals[11]);
      $("#friend3").html(animals[7]);

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
         // seed: rng.nextInt(0,200),
         tables: []
      };
      for(var iTable = 0; iTable < nbTables; iTable++){
         var nbRows = tableContent[iTable].length;
         defaultAnswer.tables[iTable] = Beav.Array.make(nbRows,false);
      }
      return defaultAnswer;
   };

   function getResultAndMessage() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function (callback) {
      // subTask.raphaelFactory.destroyAll();
      callback();
   };

   subTask.getGrade = function (callback) {
      callback(getResultAndMessage());
   };

   function randomizeData() {
      rng.shuffle(animals);
      rng.shuffle(phoneNumbers);
      if(level == "hard"){
         sortCastorbook();
      }
   };

   function sortCastorbook() {
      var temp = [];
      var castorbook = Beav.Object.clone(tableContent[2]);
      for(var iRow = 0; iRow < castorbook.length; iRow++){
         var rowContent = castorbook[iRow];
         var animalID = rowContent[0];
         var name = animals[animalID];
         if(temp.length == 0){
            temp.push(rowContent);
            continue
         }
         for(var jRow = 0; jRow < temp.length; jRow++){
            var tempRow = temp[jRow];
            var tempID = tempRow[0];
            var tempName = animals[tempID];
            if(tempName.charCodeAt(0) > name.charCodeAt(0)){
               temp.splice(jRow,0,rowContent);
               break;
            }else if(jRow == temp.length - 1){
               temp.push(rowContent);
               break;
            }
         }
      }
      tableContent[2] = temp;
   };

   function initTables() {
      var html = "";
      for(var iTable = 0; iTable < nbTables; iTable++){
         var tabID = tableType[iTable];
         var title = tableNames[tabID];
         var nbCol = colType[iTable].length;
         var nbRows = tableContent[iTable].length;
         html += "<table id=table_"+iTable+" class="+level+">";
         html += "<tr><th class=title colspan="+nbCol+">"+title+"</th></tr>";

         html += "<tr>"
         for(var iCol = 0; iCol < nbCol; iCol++){
            var colID = colType[iTable][iCol];
            var colName = colNames[colID];
            html += "<th col="+iCol+">"+colName+"</th>";
         }
         html += "</tr>";

         for(var iRow = 0; iRow < nbRows; iRow++){
            html += "<tr row="+iRow+">"
            for(var iCol = 0; iCol < nbCol; iCol++){
               var colID = colType[iTable][iCol];
               if(colID == 2 && tabID == 0){
                  var content = tableContent[iTable][iRow][iCol - 1];
               }else{
                  var content = tableContent[iTable][iRow][iCol];
               }
               var style = "";
               if (colID == 3) {
                  style="text-align:right";
               }
               html += "<td row="+iRow+" col="+iCol+" style='" + style + "'>";
               switch(colID){
                  case 0:
                     
                     if (content[0] < 10) {
                        html += "&nbsp;";
                     }
                     html += content[0]+"&nbsp;"+taskStrings.months[content[1] - 1];
                     break;
                  case 1:
                  case 4:
                     html += animals[content];
                     break;
                  case 2:
                     html += phoneNumbers[content];
                     break;
                  case 3:
                     html += content + " km&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                     break;
               }
               html += "</td>";
            }
            html += "</tr>";
         }
         html += "</table>";
      }
      $("#tables").empty();
      $("#tables").append(html);
   };

   function initHandlers() {
      for(var iTable = 0; iTable < nbTables; iTable++){
         var currTableContent = tableContent[iTable];
         var nbRows = currTableContent.length;
         $("#table_"+iTable+" tr").off("click");
         $("#table_"+iTable+" tr").click(clickLine(iTable));
         $("#table_"+iTable+" tr").css("cursor","pointer");
      }
   };

   function clickLine(tableID) {
      return function() {
         displayError("");
         var row = $(this).attr("row");
         var tabID = tableType[tableID];
         var rowContent = tableContent[tableID][row];
         var selectedID;
         if(tabID == 0){
            selectedID = rowContent[1];
         }else if(tabID == 1){
            selectedID = rowContent[0];
         }
         if(tabID == 2){
            answer.tables[tableID][row] = !answer.tables[tableID][row];
         }else{
            for(var iTable = 0; iTable < nbTables; iTable++){
               var currTabID = tableType[iTable];
               if(currTabID == 2){
                  continue
               }
               var currTableContent = tableContent[iTable];
               var nbRows = currTableContent.length;
               for(var iRow = 0; iRow < nbRows; iRow++){
                  var currRowContent = currTableContent[iRow];
                  if(currTabID == 0){
                     var id = currRowContent[1];
                  }else if(currTabID == 1){
                     var id = currRowContent[0];
                  }
                  if(id == selectedID){
                     answer.tables[iTable][iRow] = !answer.tables[iTable][iRow];
                  }
               }
            }
         }
         // console.log(answer.tables)
         updateSelection();
      }
   };

   function updateSelection() {
      for(var iTable = 0; iTable < nbTables; iTable++){
         var tabID = tableType[iTable];
         if(level == "easy" || level == "basic"){
            var colID = 1;
         }else{
            var colID = (tabID == 0) ? 2 : 0;
         }
         for(var iRow = 0; iRow < answer.tables[iTable].length; iRow++){
            if(tabID < 2){
               var cell = $("#table_"+iTable+" td[row="+iRow+"][col="+colID+"]");            
            }else{
               var cell = $("#table_"+iTable+" td[row="+iRow+"]");            
            }
            if(answer.tables[iTable][iRow]){
               cell.addClass("selected");
            }else{
               cell.removeClass("selected");
            }
         }
      }
   };

   function animalCameDuringMonth(tableID,id,month) {
      var nbRows = tableContent[tableID].length;
      for(var iRow = 0; iRow < nbRows; iRow++){
         var rowContent = tableContent[tableID][iRow];
         if(id == rowContent[1]){
            var date = rowContent[0];
            if(date[1] == month){
               return true
            }
         }
      }
      return false
   };

   function animalIsNearby(tableID,id) {
      var nbRows = tableContent[tableID].length;
      for(var iRow = 0; iRow < nbRows; iRow++){
         var rowContent = tableContent[tableID][iRow];
         if(id == rowContent[0]){
            var distance = rowContent[1];
            // console.log(id,distance)
            if(distance >= 13 && distance <= 20){
               return true
            }
            return false
         }
      }
   };

   function animalHaveWrongFriends(id) {
      var nbRows = tableContent[2].length;
      for(var iRow = 0; iRow < nbRows; iRow++){
         var rowContent = tableContent[2][iRow];
         if(rowContent[0] == id){
            var friend = rowContent[1];
            if(animalCameDuringMonth(0,friend,6) || animalCameDuringMonth(0,friend,7)){
               return true
            }
         }
      }
      return false
   };
   
   function countSelected() {
      var selected = {};
      var nbSelected = 0;
      var nbRows = tableContent[0].length;
      for(var iRow = 0; iRow < nbRows; iRow++){
         var id = tableContent[0][iRow][1];
         if (answer.tables[0][iRow]) {
            if (selected[id] == undefined) {
               selected[id] = true;
               nbSelected++;
            }
         }
      }
      return nbSelected;
   };

   function checkResult(noVisual) {
      var nbSelected = countSelected();
      if (nbSelected < data[level].nbToSelect) {
         var error = taskStrings.errorMissingNumber;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error }
      }
      if(level == "basic" || level == "easy"){
         var nbRows = tableContent[0].length;
         for(var iRow = 0; iRow < nbRows; iRow++){
            var rowContent = tableContent[0][iRow];
            var date = rowContent[0];
            var id = rowContent[1];
            if(date[1] == 5){
               if(level == "basic" && !answer.tables[0][iRow]){
                  var error = taskStrings.errorMissingApril;
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
               }else if(level == "easy" && !answer.tables[0][iRow] && !animalCameDuringMonth(0,id,6)){
                  var error = taskStrings.errorAprilNotJune;
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
               }
            }
         }
         for(var iRow = 0; iRow < nbRows; iRow++){
            if(answer.tables[0][iRow]){
               var rowContent = tableContent[0][iRow];
               var id = rowContent[1];
               var cameInApril = animalCameDuringMonth(0,id,4);
               if(!cameInApril){
                  var error = taskStrings.errorNotInApril;
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
               }else if(level == "easy"){
                  var cameInJune = animalCameDuringMonth(0,id,6);
                  if(cameInJune){
                     var error = taskStrings.errorAprilAndJune;
                     if(!noVisual){
                        displayError(error);
                     }
                     return { successRate: 0, message: error }
                  }
               }
            }
         }
      }else if(level == "medium" || level == "hard"){
         var nbRows = tableContent[0].length;
         /*
         for(var iRow = 0; iRow < nbRows; iRow++){ // check missing number
            var rowContent = tableContent[0][iRow];
            var date = rowContent[0];
            var id = rowContent[1];
            if(!answer.tables[0][iRow] && animalIsNearby(1,id) && !animalCameDuringMonth(0,id,6) && !animalCameDuringMonth(0,id,7)){
               if(level == "medium" || !animalHaveWrongFriends(id)){
                  var error = taskStrings.errorMissingNumber;
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
               }
            }
         }
         */
         for(var iRow = 0; iRow < nbRows; iRow++){ // check wrong distance
            var rowContent = tableContent[0][iRow];
            var date = rowContent[0];
            var id = rowContent[1];
            if(answer.tables[0][iRow] && !animalIsNearby(1,id)){
               var error = taskStrings.errorWrongDistance;
               if(!noVisual){
                  displayError(error);
               }
               return { successRate: 0, message: error }
            }
         }

         for(var iRow = 0; iRow < nbRows; iRow++){ // check month
            var rowContent = tableContent[0][iRow];
            var date = rowContent[0];
            var id = rowContent[1];
            if(answer.tables[0][iRow] && (date[1] == 6 || date[1] == 7)){
               var error = taskStrings.errorCameInJuneOrJuly;
               if(!noVisual){
                  displayError(error);
               }
               return { successRate: 0, message: error }
            }
         }

         if(level == "hard"){
            for(var iRow = 0; iRow < nbRows; iRow++){ // check friends
               var rowContent = tableContent[0][iRow];
               var date = rowContent[0];
               var id = rowContent[1];
               if(answer.tables[0][iRow] && animalHaveWrongFriends(id)){
                  var error = taskStrings.errorFriend;
                  if(!noVisual){
                     displayError(error);
                  }
                  return { successRate: 0, message: error }
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
      // $("#displayHelper_graderMessage").html(msg).css({color: "red" });
      $("#error").html(msg);
   };
}
if (typeof(threeVersions) == "undefined") {
   initialLevel = "basic";
   initWrapper(initTask, ["basic", "easy", "medium", "hard"]);
} else {
   initWrapper(initTask, ["easy", "medium", "hard"]);
}
displayHelper.useFullWidth();
