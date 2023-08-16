   function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         beavCouples: {
            "c_0": ["b_0","b_1"], "c_1": ["b_2","b_3"],
            // "c_2": ["b_4", "b_6"], "c_3": ["b_5", "b_7"]
            
         },
         beavParents: {
            "b_0": null, "b_1": null, "b_2": null, "b_3": null, 

            "b_4": "c_0", "b_5": "c_0", "b_6": "c_1", "b_7": "c_1", 
            "b_8": "c_1"
         },
         // target: [25,23],
         target: 25,
         nbRelated: 2,
         seeds: [0],
         nbButtons: 0,
         goalType: 0
      },
      easy: {
         beavCouples: {
            "c_0": ["b_0","b_1"], "c_1": ["b_2","b_3"], "c_2": ["b_4","b_5"], 

            "c_3": ["b_7","b_8"], "c_4": ["b_9","b_10"], "c_5": ["b_11","b_12"],  

            // "c_6": ["b_14","b_18"], "c_7": ["b_13","b_17"]
         },
         beavParents: {
            "b_0": null, "b_1": null, "b_2": null, "b_3": null, "b_4": null, "b_5": null, 

            "b_6": "c_0", "b_7": "c_0", "b_8": "c_1", "b_9": "c_1", 
            "b_10": "c_2", "b_11": "c_1", "b_12": "c_2",

            "b_13": "c_3", "b_14": "c_3", "b_15": "c_4", "b_16": "c_4", 
            "b_17": "c_5", "b_18": "c_5"
         },
         // target: [25,23],
         target: 25,
         nbRelated: 2,
         seeds: [0],
         nbButtons: 2,
         goalType: 1
      },
      medium: {
        beavCouples: {
            "c_0": ["b_0","b_1"], "c_1": ["b_2","b_3"], "c_2": ["b_4","b_5"], 
            "c_3": ["b_6","b_7"], "c_4": ["b_8","b_9"], "c_5": ["b_10","b_11"],  

            "c_6": ["b_13","b_14"], "c_7": ["b_15","b_16"], "c_8": ["b_18","b_19"], 
            "c_9": ["b_21","b_22"], "c_10": ["b_20","b_23"],  

            "c_11": ["b_24","b_25"], "c_12": ["b_27","b_28"], "c_13": ["b_29","b_30"], 
            "c_14": ["b_31","b_33"], "c_15": ["b_32","b_35"],  
         },
         beavParents: {
            "b_0": null, "b_1": null, "b_2": null, "b_3": null, "b_4": null, "b_5": null, 
            "b_6": null, "b_7": null, "b_8": null, "b_9": null, "b_10": null, "b_11": null, 

            "b_12": "c_0", "b_13": "c_0", "b_14": "c_1", "b_15": "c_1", "b_16": "c_2", "b_17": "c_3", 
            "b_18": "c_3", "b_19": "c_4", "b_20": "c_4", "b_21": "c_4", "b_22": "c_5", "b_23": "c_5", 

            "b_24": "c_6", "b_25": "c_7", "b_26": "c_7", "b_27": "c_7", "b_28": "c_8", "b_29": "c_8", 
            "b_30": "c_9", "b_31": "c_9", "b_32": "c_9", "b_33": "c_10", "b_34": "c_10", "b_35": "c_10", 

            "b_36": "c_11", "b_37": "c_11", "b_38": "c_11", "b_39": "c_12", "b_40": "c_12", "b_41": "c_13", 
            "b_42": "c_13", "b_43": "c_14", "b_44": "c_14", "b_45": "c_14", "b_46": "c_15", "b_47": "c_15", 
         },
         // target: [25,23],
         target: 25,
         nbRelated: 2,
         seeds: [2,3,6,9,16,23,35,39], // 1 paire d'ancêtres commun faciles 2, 3, 6, 9, 16, 23, 35, 39
              // 1 paire d'ancêtes commun moyen : 17
              // 1 paire d'ancêtres commun difficile : 15, 33, 36, 37
             // 2 paires ancêtres communs : 8, 14, 20, 26, 27, 29
         nbButtons: 4,
         goalType: 2
      },
      hard: {
         beavCouples: {
            "c_0": ["b_0","b_1"], "c_1": ["b_2","b_3"], "c_2": ["b_4","b_5"], 
            "c_3": ["b_6","b_7"], "c_4": ["b_8","b_9"], "c_5": ["b_10","b_11"],  

            "c_6": ["b_13","b_14"], "c_7": ["b_15","b_16"], "c_8": ["b_18","b_19"], 
            "c_9": ["b_21","b_22"], "c_10": ["b_20","b_23"],  

            "c_11": ["b_24","b_25"], "c_12": ["b_27","b_28"], "c_13": ["b_29","b_30"], 
            "c_14": ["b_31","b_33"], "c_15": ["b_32","b_35"],  
         },
         beavParents: {
            "b_0": null, "b_1": null, "b_2": null, "b_3": null, "b_4": null, "b_5": null, 
            "b_6": null, "b_7": null, "b_8": null, "b_9": null, "b_10": null, "b_11": null, 

            "b_12": "c_0", "b_13": "c_0", "b_14": "c_1", "b_15": "c_1", "b_16": "c_2", "b_17": "c_3", 
            "b_18": "c_3", "b_19": "c_4", "b_20": "c_4", "b_21": "c_4", "b_22": "c_5", "b_23": "c_5", 

            "b_24": "c_6", "b_25": "c_7", "b_26": "c_7", "b_27": "c_7", "b_28": "c_8", "b_29": "c_8", 
            "b_30": "c_9", "b_31": "c_9", "b_32": "c_9", "b_33": "c_10", "b_34": "c_10", "b_35": "c_10", 

            "b_36": "c_11", "b_37": "c_11", "b_38": "c_11", "b_39": "c_12", "b_40": "c_12", "b_41": "c_13", 
            "b_42": "c_13", "b_43": "c_14", "b_44": "c_14", "b_45": "c_14", "b_46": "c_15", "b_47": "c_15", 
         },
         // target: [25,23],
         target: 25,
         nbRelated: 2,
         nbFalseRelated: 2,
         seeds: [0, 1, 6, 24, 35, 36],  // 2 ancêtres faciles : 0, 1, 6, 24, 36
                  // 1 ancêtre pas trivial : 35
         nbButtons: 4,
         goalType: 3
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

   var buttonAreaH = 80;
   var buttonH = 50;
   var buttonW = 50;
   var yButton = (buttonAreaH - buttonH)/2;
   var wantedW = 260;
   var wantedH = 50;
   var yWanted = (buttonAreaH - wantedH)/2;
   // var xWanted = xButton + buttonW + 150;
   var xWanted = 2*marginX;
   var xButton = xWanted + wantedW + 150;

   var beavR = 20;
   var beavW = 2*beavR - 10;
   var beavH = beavW;
   var yBeavers = buttonAreaH + beavR + marginY;
   var genH = 100;
   var coupleGap = 20;
   var partnerGap = 15;
   var infoBoxW = 120;
   var infoBoxH = 65;
   var trR = 5;
   var chooseButtonH = 25;
   var markerR = beavR*0.4;

   var beavCouples, beavParents;
   var generations = [];
   var beavers = [];
   var beavInCouple = {};
   var nbBeavers, nbGenerations;
   var nbButtons;
   var nbRelated, nbFalseRelated;
   var target;
   var mode = 0;
   var selectedBeav = null;
   var selectedMarker = 0;
   var beavHasMarker = {};
   var chosen;
   var markerObj = {};
   // var beavData = {};
   var heightRange = [ 20, 99 ];
   // var weightRange = [ 2, 32 ];
   var culprit;
   var grandparents = true;

   var rng;
   var buttonObj = [];
   var beaverObj = {};
   var coupleBondObj = {};
   var parentLink = {};
   var infoBox;
   var related = [];
   var relatedCouple = [];
   var falseRelated = [];
   var beavThatMeetRequirements = [];
   var firstWrong = true;
   var overlay;
   var seeds;
   var seedID = 0;
   var retryCount;

   var beaverSrc = $("#beaver").attr("src");
   var markerShape = [ "star", "diamond", "triangle" ];

   var colors = {
      yellow: "#ffd600",
      darkYellow: "#cfb00c",
      black: "#4a4a4a",
      blue: "#4a90e2",
      darkBlue: "#2e5e95",
      grey: "#e2e2e2",
      green: "#9acc68",
      darkGreen: "#557e2b",
      cyan: "#8bd3e2",
      pink: "#ff24b4",
      orange: "#f5a623",
      darkOrange: "#b77c1d"
   };
   
   var buttonAttr = {
      default: {
         stroke: "none",
         fill: colors.grey,
         r: 5
      },
      selected: {
         stroke: "none",
         fill: colors.blue,
         r: 5
      },
      label: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         "text-anchor": "end"
      }
   };
   var wantedAttr = {
      rect: {
         stroke: "none",
         fill: colors.grey,
         r: 5
      },
      label: {
         "font-size": 16,
         "font-weight": "bold",
         fill: colors.black,
         "text-anchor": "start"
      },
      data: {
         "font-size": 16,
         fill: colors.black,
         "text-anchor": "start"
      }
   };
   var iconAttr = {
      stroke: "none",
      fill: colors.black
   };
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   var beaverAttr = {
      default: {
         stroke: colors.blue,
         "stroke-width": 2,
         fill: "white"
      },
      related: {
         stroke: colors.blue,
         "stroke-width": 2,
         fill: colors.blue
      },
      selected: {
         stroke: colors.orange,
         "stroke-width": 2,
         fill: colors.orange
      },
      culprit: {
         stroke: colors.black,
         "stroke-width": 6,
         fill: "none" 
      }
   };
   var coupleBondAttr = {
      line: {
         stroke: colors.blue,
         "stroke-width": 2
      },
      circle: {
         stroke: "none",
         fill: colors.blue,
         r: partnerGap/4
      }
   };
   var parentLinkAttr = {
      stroke: colors.blue,
      "stroke-width": 2,
      "arrow-end": "classic-wide-long"
   };
   var infoBoxAttr = {
      rect: {
         stroke: "none",
         fill: colors.green,
         r: 5
      },
      triangle: {
         stroke: "none",
         fill: colors.green
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var chooseButtonAttr = {
      rect: {
         stroke: "none",
         fill: colors.blue,
         r: chooseButtonH/2
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         fill: "white"
      }
   };
   var markerAttr = [
      {
         stroke: colors.darkBlue,
         "stroke-width": 2,
         "stroke-linejoin": "round",
         fill: colors.blue
      },
      {
         stroke: colors.darkYellow,
         "stroke-width": 2,
         "stroke-linejoin": "round",
         fill: colors.yellow
      },
      {
         stroke: colors.darkOrange,
         "stroke-width": 2,
         "stroke-linejoin": "round",
         fill: colors.orange
      }
   ];
   var overlayAttr = {
      stroke: "none",
      fill: "red",
      opacity: 0
   };
   

   subTask.loadLevel = function(curLevel) {
      level = curLevel;
      nbButtons = data[level].nbButtons;
      seeds = data[level].seeds;
      rng = new RandomGenerator(subTask.taskParams.randomSeed + level.charCodeAt(0));
      beavCouples = Beav.Object.clone(data[level].beavCouples);
      beavParents = Beav.Object.clone(data[level].beavParents);
      initBeavData();
      // target = data[level].target.slice();
      target = data[level].target;
      nbRelated = data[level].nbRelated;
      nbFalseRelated = data[level].nbFalseRelated;

      paperH = yBeavers + (nbGenerations - 1)*genH + beavR + 2*trR + infoBoxH;
      retryCount = 0;
      
      initRelated();
      initBeaverThatMeetRequirements();
   };

   subTask.getStateObject = function() {
      return state;
   };

   subTask.reloadAnswerObject = function(answerObj) {
      answer = answerObj;
      if(!answer) {
         return;
      }
      retryCount = answer.retryCount + 1;
      seedID = (retryCount)%seeds.length;
      // console.log("retryCount",retryCount)
      rng.reset(answer.seed);
   };

   subTask.resetDisplay = function() {
      displayError("");
      initPaper();
      initButtons();
      initBeavers();
      initHandlers();
      updateMode();
      updateMarkers();
      updateInfoBox();
      if(answer.hist.length > 0 && answer.hist[answer.hist.length - 1].type == "choose"){
         if(overlay){
            overlay.remove();
         }
         if(infoBox){
            infoBox.hide();
         }
         overlay = paper.rect(0,0,paperW,paperH).attr(overlayAttr);
         culprit = findCulprit();
         displayError(taskStrings.clickRetry);
      }
      updateBeavers();

      // // displayHelper.customValidate = checkResult;
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
         retryCount: retryCount,
         // seed: rng.nextInt(0,1000),
         seed: seeds[seedID],
         hist: [],
         found: [],
         beavData: {}
      };
      // console.log("seed",defaultAnswer.seed)
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

   function initBeavData() {
      for(var beav in beavParents){
         if(!Beav.Array.has(beavers,beav)){
            beavers.push(beav);
         }
         var gen = 0;
         var currBeav = beav;
         do{
            var parent = beavParents[currBeav];
            if(parent == null){
               if(!generations[gen]){
                  generations[gen] = [];
               }
               generations[gen].push(beav);
            }else{
               gen++;
               currBeav = beavCouples[parent][0];
            }
         }while(parent != null)
      }
      nbBeavers = beavers.length;
      nbGenerations = generations.length;
      
      for(var coupleID in beavCouples){
         var couple = beavCouples[coupleID];
         for(var iBeav = 0; iBeav < couple.length; iBeav++){
            var beavID = couple[iBeav];
            beavInCouple[beavID] = coupleID;
         }
      }
   };

   function initRelated() {
      var targetBatch = generations[nbGenerations - 1];
      rng.shuffle(targetBatch);
      var expectedTarget = targetBatch[0];
      var ancestorBatch = [];
      getAncestors(expectedTarget,ancestorBatch);

      if (data[level].goalType == 0) {
          related = ["b_2", "b_3"];
      } else if(data[level].goalType == 1) {
         if(grandparents){
            var relatedBatch = ancestorBatch[0];
         }else{
            var relatedBatch = ancestorBatch[0].concat(ancestorBatch[1]);
         }
         do{
            rng.shuffle(relatedBatch);
            related = relatedBatch.slice(0,nbRelated);
         }while(beavInCouple[related[0]] == beavInCouple[related[1]])

         for(var iRel = 0; iRel < nbRelated; iRel++){
            var beavID = related[iRel];
            var coupleID = beavInCouple[beavID];
            if(coupleID){
               relatedCouple = relatedCouple.concat(beavCouples[coupleID]);
            }
         }
      }else {
         var anc = [];
         for(var iGen = 0; iGen < ancestorBatch.length; iGen++){
            anc = anc.concat(ancestorBatch[iGen]);
         }
         var beavWithCommonAncestors = [];
         var beavBatch = [];
         var maxGen = (data[level].goalType == 2) ? nbGenerations : nbGenerations - 1;
         var minGen = (data[level].goalType == 2) ? 0 : 2;
         for(var iGen = minGen; iGen < maxGen; iGen++){
            beavBatch = beavBatch.concat(generations[iGen]);
         }
         for(var iBeav = 0; iBeav < beavBatch.length; iBeav++){
            var beavID = beavBatch[iBeav];
            if(beavID == expectedTarget){
               continue;
            }
            var beavAncestors = [];
            getAncestors(beavID,beavAncestors);
            var beavAnc = [];
            for(var iGen = 0; iGen < beavAncestors.length; iGen++){
               beavAnc = beavAnc.concat(beavAncestors[iGen]);
            }
            for(var iAnc = 0; iAnc < beavAnc.length; iAnc++){
               if(Beav.Array.has(anc,beavAnc[iAnc])){
                  beavWithCommonAncestors.push(beavID);
                  break;
               }
            }
         }
         if(beavWithCommonAncestors.length < nbRelated){
            console.error("cannot find related")
         }
         if(data[level].goalType == 2){
            rng.shuffle(beavWithCommonAncestors);
            related = beavWithCommonAncestors.slice(0,nbRelated);
         }else{
            var count = 0
            do{
               rng.shuffle(beavWithCommonAncestors);
               related = beavWithCommonAncestors.slice(0,nbRelated);
               var descendantBatch = [];
               for(var iRel = 0; iRel < related.length; iRel++){
                  var relID = related[iRel];
                  getDescendant(relID,descendantBatch);
               }
               count++;
            }while(descendantBatch.length < nbFalseRelated && count < 50)
            if(descendantBatch.length < nbFalseRelated){
               console.error("cannot find false related")
            }
            rng.shuffle(descendantBatch);
            falseRelated = descendantBatch.slice(0,nbFalseRelated);
         }
      }
   };

   function initBeaverThatMeetRequirements() {
      for(var iBeav = 0; iBeav < nbBeavers; iBeav++){
         var beavID = beavers[iBeav];
         if(!Beav.Array.has(related,beavID) && !Beav.Array.has(falseRelated,beavID) && beavMeetRequirements(beavID)){
            beavThatMeetRequirements.push(beavID);
         }
      }
      // console.log(beavThatMeetRequirements)
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", paperW, paperH);
   };

   function initButtons() {
      var attr = buttonAttr;
      var xm = xButton;
      var y = yButton;
      var h = buttonH;
      var w = buttonW;
      var x = xm - w;
      var labels = [taskStrings.display,taskStrings.mark];
      var yLabel = y + h/2;
      if (typeof(enableRtl) != "undefined") {
         x -= 30;
      }
      for(var iButton = 0; iButton < nbButtons; iButton++){
         if(iButton < 2){
            var xLabel = x - marginX/2;
            if (typeof(enableRtl) != "undefined") {
               xLabel += 80;
               if (iButton == 1) {
                  xLabel += 115;
               }
            }
            paper.text(xLabel,yLabel,labels[iButton]).attr(attr.label);
         }
         var rect = paper.rect(x,y,w,h).attr(attr.default);
         
         if(iButton == 0){
            var imgW = w - 10;
            var imgH = h - 10;
            var xImg = x + (w - imgW)/2;
            var yImg = y + (h - imgH)/2;
            var img = paper.path("M16,8.286C8.454,8.286,2.5,16,2.5,16s5.954,7.715,13.5,7.715c5.771,0,13.5-7.715,13.5-7.715S21.771,8.286,16,8.286zM16,20.807c-2.649,0-4.807-2.157-4.807-4.807s2.158-4.807,4.807-4.807s4.807,2.158,4.807,4.807S18.649,20.807,16,20.807zM16,13.194c-1.549,0-2.806,1.256-2.806,2.806c0,1.55,1.256,2.806,2.806,2.806c1.55,0,2.806-1.256,2.806-2.806C18.806,14.451,17.55,13.194,16,13.194z");
            img.transform(["T",xImg,yImg,"S",1.3,1.3,xImg,yImg]).attr(iconAttr);
         }else{
            var imgR = (w - 20)/2;
            var xImg = x + w/2;
            var yImg = y + h/2;
            var img = getShape(paper,markerShape[iButton - 1],xImg,yImg,{ radius: imgR }).attr(markerAttr[iButton - 1]);
         }
         var overlay = paper.rect(x,y,w,h).attr(overlayAttr);
         buttonObj[iButton] = paper.set(rect,overlay);
         x += (iButton == 0) ? 150 : w + 10;
      }

      paper.rect(xWanted,yWanted,wantedW,wantedH).attr(wantedAttr.rect);
      var beavH = 35;
      var beavW = 35;
      var xLabel = xWanted + 15;
      if (typeof(enableRtl) != "undefined") {
         xLabel += 230;
      }
      paper.text(xLabel,yLabel,taskStrings.wanted).attr(wantedAttr.label);
      var xBeav = xWanted + 150;
      var yBeav = yWanted + (wantedH - beavH)/2;
      if (typeof(enableRtl) != "undefined") {
         xBeav -= 70;
      }
      paper.image(beaverSrc,xBeav,yBeav,beavW,beavH);
      
      // var targetStr = target[0]+" cm / "+target[1]+" kg";
      var targetStr = target+" cm";
      var xData = xBeav + beavW + 15;
      if (typeof(enableRtl) != "undefined") {
         xData -= 60;
      }
      paper.text(xData,yLabel,targetStr).attr(wantedAttr.data);
   };

   function initBeavers() {
      for(var iGen = 0; iGen < nbGenerations; iGen++){
         var gen = generations[iGen];
         var nbBeav = gen.length;
         var order = [];
         var couples = [];
         for(var iBeav = 0; iBeav < nbBeav; iBeav++){
            var beavID = gen[iBeav];
            var coupleID = findBeavCouple(beavID);
            if(!coupleID){
               var pos = getAverageParentPos(beavID);
               var alreadyIn = alreadyOrdered(beavID,order);
               if(!alreadyIn){
                  addOrder(beavID, coupleID, pos, order);
               }
            }else{
               var couple = beavCouples[coupleID];
               if(!Beav.Array.has(couples,coupleID)){
                  couples.push(coupleID);
               }
               var pos1 = getAverageParentPos(couple[0]);
               var pos2 = getAverageParentPos(couple[1]);
               var pos = (pos1 + pos2)/2;
               for(var jBeav = 0; jBeav < couple.length; jBeav++){
                  var beavID = couple[jBeav];
                  var alreadyIn = alreadyOrdered(beavID,order);
                  if(!alreadyIn){
                     addOrder(beavID, coupleID, pos, order);
                  }
               }
            }
         }
         var nbCouples = couples.length;
         var w = nbBeav*2*beavR + nbCouples*(partnerGap + coupleGap) + (nbBeav - 2*nbCouples)*coupleGap - coupleGap;
         var y = yBeavers + iGen*genH;
         var x = (paperW - w)/2 + beavR;
         for(var iBeav = 0; iBeav < order.length; iBeav++){
            var currData = order[iBeav];
            var beavID = currData.beavID;
            var coupleID = currData.coupleID;
            beaverObj[beavID] = drawBeaver(x,y,beavID);
            if(coupleID && iBeav < order.length - 1 && order[iBeav + 1].coupleID == coupleID){
               var gap = partnerGap;
               coupleBondObj[coupleID] = drawCoupleBond(x + beavR + gap/2,y);
            }else{
               var gap = coupleGap;
            }
            if(beavParents[beavID]){
               parentLink[beavID] = drawParentLink(beavID);
            }
            x += 2*beavR + gap;
         }
      }

      function alreadyOrdered(id,order) {
         for(var iOrd = 0; iOrd < order.length; iOrd++){
            var currID = order[iOrd].beavID;
            if(currID == id){
               return true;
            }
         }
         return false
      };

      function addOrder(beavID, coupleID, pos, order) {
         var index = 0;
         for(var iOrd = 0; iOrd < order.length; iOrd++){
            var currData = order[iOrd];
            if(currData.pos <= pos && (iOrd == order.length - 1 || order[iOrd + 1].pos > pos)){
               index = iOrd + 1;
            }
         }
         order.splice(index,0,{ beavID: beavID, coupleID: coupleID, pos: pos });
      };
   };

   function initHandlers() {
      for(var iButton = 0; iButton < nbButtons; iButton++){
         buttonObj[iButton].click(clickButton(iButton));
         buttonObj[iButton].attr("cursor","pointer");
      }

      for(var iBeaver = 0; iBeaver < nbBeavers; iBeaver++){
         var beavID = beavers[iBeaver];
         beaverObj[beavID].click(clickBeaver(beavID));
         beaverObj[beavID].attr("cursor","pointer");
      }
   };

   function clickBeaver(id,replay,noVisual) {
      return function() {
         // console.log(id,Beav.Array.has(beavThatMeetRequirements,id))
         if(!noVisual){
            displayError("");
         }
         if(mode == 0){
            selectBeaver(id,replay,noVisual);
         }else{
            addMarker(id,replay,noVisual);
         }
      }
   };

   function selectBeaver(id,replay,noVisual) {
      if(selectedBeav == id){
         selectedBeav = null;
      }else{
         selectedBeav = id;
      }
      var str = getBeavData(id);
      if(!replay){
         answer.hist.push({ type: "show", beavID: id });
      }
      if(!noVisual){
         updateBeavers();
         updateInfoBox();
      }
   };

   function addMarker(id,replay,noVisual) {
      // console.log("addMarker "+id)
      if(beavHasMarker[id] && Beav.Array.has(beavHasMarker[id],selectedMarker)){
         var index = Beav.Array.indexOf(beavHasMarker[id],selectedMarker);
         beavHasMarker[id].splice(index,1);
      }else{
         if(!beavHasMarker[id]){
            beavHasMarker[id] = [];
         }
         beavHasMarker[id].push(selectedMarker);
      }
      if(!replay){
         answer.hist.push({ type: "mark", beavID: id, markerID: selectedMarker });
      }
      if(!noVisual){
         updateMarkers();
      }
   };

   function clickButton(iButton) {
      return function() {
         if(iButton == 0){
            mode = 0;
            if(infoBox){
               infoBox.show();
            }
         }else{
            mode = 1;
            selectedMarker = iButton - 1;
            if(infoBox){
               infoBox.hide();
            }
         }
         updateBeavers();
         updateMode();
      }
   };

   function choose(id,replay,noVisual) {
      return function() {
         chosen = id;
         if(!replay){
            answer.hist.push({ type: "choose", beavID: id });
            if(!noVisual){
               if(overlay){
                  overlay.remove();
                  overlay = null;
               }
               overlay = paper.rect(0,0,paperW,paperH).attr(overlayAttr);
            }
            checkResult(noVisual);
         }
      }
   };

   function updateMode() {
      for(var iButton = 0; iButton < nbButtons; iButton++){
         var attr = buttonAttr.default;
         if(iButton == 0 && mode == 0){
            attr = buttonAttr.selected;
         }else if(mode == 1 && selectedMarker == iButton - 1){
            attr = buttonAttr.selected;
         }
         buttonObj[iButton][0].attr(attr);
      }
   };

   function updateBeavers() {
      for(var iBeav = 0; iBeav < nbBeavers; iBeav++){
         var beavID = beavers[iBeav];
         if(culprit && beavID == culprit){
            var attr = beaverAttr.culprit;
         }else if(!Beav.Array.has(related,beavID) && !Beav.Array.has(falseRelated,beavID) && !Beav.Array.has(relatedCouple,beavID)){
            var attr = (beavID == selectedBeav && mode == 0) ? beaverAttr.selected : beaverAttr.default;
         }else{
            var attr = (beavID == selectedBeav && mode == 0) ? beaverAttr.selected : beaverAttr.related;            
         }
         beaverObj[beavID][0].attr(attr);
      }
   };

   function updateInfoBox(str) {
      if(infoBox){
         infoBox.remove();
         infoBox = null;
      }
      if(selectedBeav){
         infoBox = drawInfoBox(selectedBeav);
      }
   };

   function updateMarkers() {
      for(var iBeav = 0; iBeav < nbBeavers; iBeav++){
         var beavID = beavers[iBeav];
         if(markerObj[beavID]){
            markerObj[beavID].remove();
            markerObj[beavID] = null;
         }
         if(beavHasMarker[beavID] && beavHasMarker[beavID].length > 0){
            drawMarker(beavID,beavHasMarker[beavID]);
         }
      }
   };

   function findBeavCouple(beav) {
      for(var coupleID in beavCouples){
         if(Beav.Array.has(beavCouples[coupleID],beav)){
            return coupleID
         }
      }
      return false
   };

   function getAverageParentPos(id) {
      var coupleID = beavParents[id];
      if(!coupleID){
         return 0
      }
      var parents = beavCouples[coupleID];
      var xPos = [];
      for(var iPar = 0; iPar < parents.length; iPar++){
         var parID = parents[iPar];
         xPos[iPar] = beaverObj[parID][0].attr("cx");
      }
      return (xPos[0] + xPos[1])/2
   };

   function getAncestors(beav,parents) {
      var beavGen = false;
      for(var iGen = 0; iGen < nbGenerations; iGen++){
         if(Beav.Array.has(generations[iGen],beav)){
            beavGen = iGen;
         }
      }
      if(beavGen === false){
         console.error("cannot find beavGen "+beav);
         return false
      }
      var parentCouple = beavParents[beav];
      if(parentCouple){
         for(var iPar = 0; iPar < 2; iPar++){
            var parID = beavCouples[parentCouple][iPar];
            var parGen = beavGen - 1;
            if(!parents[parGen]){
               parents[parGen] = [];
            }
            if(!Beav.Array.has(parents[parGen],parID)){
               parents[parGen].push(parID);
               getAncestors(parID,parents);
            }
         }
      }
   };

   function getDescendant(id,descendantBatch) {
      var coupleID = beavInCouple[id];
      if(coupleID){
         for(var beavID in beavParents){
            if(beavParents[beavID] == coupleID){
               if(!Beav.Array.has(descendantBatch,beavID)){
                  descendantBatch.push(beavID);
                  getDescendant(beavID,descendantBatch);
               }
            }
         }   
      }
   }; 

   function getBeavData(id) {
      if(!answer.beavData[id]){
         if(Beav.Array.has(beavThatMeetRequirements,id)){
            if(answer.found.length < beavThatMeetRequirements.length - 1){
               answer.beavData[id] = getRandomData();
            }else{
               // answer.beavData[id] = target.slice();
               answer.beavData[id] = target;
            }
            answer.found.push(id);
         }else if(Beav.Array.has(related,id) || Beav.Array.has(falseRelated,id) || Beav.Array.has(relatedCouple,id)){
            answer.beavData[id] = getRandomData();
         }else if(firstWrong){
            // answer.beavData[id] = target.slice();
            answer.beavData[id] = target;
            firstWrong = false;
         }else{
            var dieRoll = rng.nextInt(0,2);
            if(dieRoll == 0){
               // answer.beavData[id] = target.slice();
               answer.beavData[id] = target;
            }else{
               answer.beavData[id] = getRandomData();
            }
         }
      }
      var height = answer.beavData[id];
      // var weight = answer.beavData[id][1];
      // return height+" cm / "+weight+" kg"
      return height+" cm"
   };

   function getRandomData() {
      do{
         var height = rng.nextInt(heightRange[0],heightRange[1]);
         // var weight = rng.nextInt(weightRange[0],weightRange[1]);
      // }while(height == target[0] && weight == target[1])
      }while(height == target)
      // return [ height, weight ]
      return height
   };

   function beavMeetRequirements(id) {
      var ancestors = [];
      getAncestors(id,ancestors);
      if(data[level].goalType < 2) {
         if(ancestors.length == 0){
            return false
         }
         var relatedBatch = ancestors[0].concat(ancestors[1]);
         for(var iRel = 0; iRel < related.length; iRel++){
            var relatedID = related[iRel];
            if((!Beav.Array.has(relatedBatch,relatedID))){
               return false
            }
         }
         return true
      }else {
         var allAnc = [];
         for(var iGen = 0; iGen < ancestors.length; iGen++){
            allAnc = allAnc.concat(ancestors[iGen]);
         }
         var canRelate = Beav.Array.make(nbRelated,false);
         for(var iRel = 0; iRel < related.length; iRel++){
            var relatedID = related[iRel];
            var relAncestors = [];
            getAncestors(relatedID,relAncestors);
            var allRelAnc = [];
            for(var iGen = 0; iGen < relAncestors.length; iGen++){
               allRelAnc = allRelAnc.concat(relAncestors[iGen]);
            }
            for(var iBeav = 0; iBeav < allAnc.length; iBeav++){
               var ancID = allAnc[iBeav];
               if(Beav.Array.has(allRelAnc,ancID)){
                  canRelate[iRel] = true;
                  continue;
               }
            }
         }
         for(var iRel = 0; iRel < related.length; iRel++){
            if(!canRelate[iRel]){
               return false
            }
         }
         return true
      }
   };

   function findCulprit() {
      for(var iBeav = 0; iBeav < beavThatMeetRequirements.length; iBeav++){
         var beavID = beavThatMeetRequirements[iBeav];
         if(!answer.beavData[beavID]){
            return beavID
         }
         var curData = answer.beavData[beavID];
         // if ((curData[0] == target[0]) && (curData[1] == target[1])) {
         if (curData == target) {
            return beavID;
         }
      }
   };

   function drawBeaver(x,y,id) {
      var attr = beaverAttr;
      var circAttr = (Beav.Array.has(related,id)) ? attr.related : attr.default;
      var r = beavR;
      var circle = paper.circle(x,y,r).attr(circAttr);
      var xImg = x - beavW/2;
      var yImg = y - beavH/2;
      var img = paper.image(beaverSrc,xImg,yImg,beavW,beavH);
      return paper.set(circle,img)
   };

   function drawCoupleBond(x,y) {
      var x1 = x - partnerGap/2;
      var x2 = x + partnerGap/2;
      var attr = coupleBondAttr;
      var line = paper.path(["M",x1,y,"H",x2]).attr(attr.line);
      var circle = paper.circle(x,y).attr(attr.circle);
      return paper.set(line, circle)
   };

   function drawParentLink(id) {
      var coupleID = beavParents[id];
      var x1 = coupleBondObj[coupleID][1].attr("cx");
      var y1 = coupleBondObj[coupleID][1].attr("cy");
      var x2 = beaverObj[id][0].attr("cx");
      var y2 = beaverObj[id][0].attr("cy") - beavR;
      var link = paper.path(["M",x1,y1,"C",x1,y1 + 0.5*genH,x2,y2 - 0.5*genH,x2,y2]).attr(parentLinkAttr);
      return link
   };

   function drawInfoBox(id) {
      var beavObj = beaverObj[id];
      var xBeav = beavObj[0].attr("cx");
      var yBeav = beavObj[0].attr("cy");
      var w = infoBoxW;
      var h = infoBoxH;
      var xRect = xBeav - w/2;
      var yRect = yBeav + beavR + 2*trR;
      var attr = infoBoxAttr;
      var rect = paper.rect(xRect,yRect,w,h).attr(attr.rect);
      var yTr = yBeav + beavR + trR;
      var tr = getShape(paper,"triangle",xBeav,yTr,{ radius: trR }).attr(attr.triangle);
      var yText = yRect + 15;
      var str = getBeavData(id);
      var text = paper.text(xBeav,yText,str).attr(attr.text);
      var bW = w - 20;
      var bH = chooseButtonH;
      var yB = yText + 15 + bH/2;
      var button = drawButton(paper,xBeav,yB,bW,bH,{ text: taskStrings.choose, xText: xBeav, yText: yB, attr: chooseButtonAttr });
      button.click(choose(id));
      button.attr("cursor","pointer");
      return paper.set(rect,tr,text,button)
   };

   function drawMarker(beavID) {
      var xBeav = beaverObj[beavID][0].attr("cx");
      var yBeav = beaverObj[beavID][0].attr("cy");
      var x = xBeav + beavR;
      if(markerObj[beavID]){
         markerObj[beavID].remove();
         markerObj[beavID] = null;
      }
      markerObj[beavID] = paper.set();
      for(var iMarker = 0; iMarker < beavHasMarker[beavID].length; iMarker++){
         var markerID = beavHasMarker[beavID][iMarker];
         var shape = markerShape[markerID];
         var attr = markerAttr[markerID];
         var y = yBeav - (6*markerR + 4)/2 + markerR + iMarker*(2*markerR + 2);
         var marker = getShape(paper,shape,x,y,{ radius: markerR }).attr(attr);
         markerObj[beavID].push(marker);
      }
   };

   function replayHist(noVisual) {
      mode = 0;
      selectedBeav = null;
      selectedMarker = 0;
      beavHasMarker = {};
      for(var iHist = 0; iHist < answer.hist.length; iHist++){
         var move = answer.hist[iHist];
         var beavID = move.beavID;
         switch(move.type){
            case "show":
               mode = 0;
               clickBeaver(beavID,true,noVisual)();
               break;
            case "mark":
               mode = 1;
               selectedMarker = move.markerID;
               clickBeaver(beavID,true,noVisual)();
               break;
            case "choose":
               choose(beavID,true,noVisual)();
         }
      }
   };
   
   function checkResult(noVisual) {
      replayHist(noVisual);
      // console.log(chosen)
      if(!chosen || !answer.beavData[chosen]){
         var error = taskStrings.errorNoChoose+"<br/>"+taskStrings.clickRetry;
         if(!noVisual){
            displayError(error);
         }
         return { successRate: 0, message: error };
      }
      if(!beavMeetRequirements(chosen)){
         var error = taskStrings.errorRequirements(level)+"<br/>"+taskStrings.culpritWas+"<br/>"+taskStrings.clickRetry;
         culprit = findCulprit();
         if(!noVisual){
            if(infoBox){
               infoBox.hide();
            }
            updateBeavers();
            displayError(error);
         }
         return { successRate: 0, message: error };
      }
      // if(answer.beavData[chosen][1] != target[1]){
      //    var error = taskStrings.errorWeight+"<br/>"+taskStrings.culpritWas+"<br/>"+taskStrings.clickRetry;
      //    culprit = findCulprit();
      //    // console.log(answer.beavData[chosen],target);
      //    if(!noVisual){
      //       if(infoBox){
      //          infoBox.hide();
      //       }
      //       updateBeavers();
      //       displayError(error);
      //    }
      //    return { successRate: 0, message: error };
      // }
      if(answer.beavData[chosen] != target){
         var error = taskStrings.errorHeight+"\n"+taskStrings.culpritWas+"\n"+taskStrings.clickRetry;
         culprit = findCulprit();
         if(!noVisual){
            if(infoBox){
               infoBox.hide();
            }
            updateBeavers();
            displayError(error);
         }
         return { successRate: 0, message: error };
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

