function initTask(subTask) {
   var state = {};
   var level;
   var answer = null;
   var data = {
      basic: {
         paperH: 450,
         visualGraphJSON: {
            "vertexVisualInfo":{
               "v_0":{"x":352,"y":78},
               "v_1":{"x":480,"y":206},
               "v_2":{"x":352,"y":206},
               "v_3":{"x":224,"y":206},
               "v_4":{"x":352,"y":334}
            },
            "edgeVisualInfo":{
               "e_0":{},"e_1":{},"e_2":{},"e_3":{},"e_4":{},"e_5":{}
            },
            "minGraph":{
               "vertexInfo":{
                  "v_0":{},"v_1":{},"v_2":{},"v_3":{},"v_4":{}
               },
               "edgeInfo":{
                  "e_0":{},"e_1":{},"e_2":{},"e_3":{},"e_4":{},"e_5":{}
               },
               "edgeVertices":{
                  "e_0":["v_0","v_1"],"e_1":["v_0","v_3"],"e_2":["v_0","v_2"],"e_3":["v_3","v_4"],
                  "e_4":["v_1","v_4"],"e_5":["v_4","v_2"]
               },
               "directed":true
            }
         },
         nbShapes: [1,1],
         movableVertices: false
      },
      easy: {
         paperH: 450,
         visualGraphJSON: {
            "vertexVisualInfo":{
                  "v_0":{"x":348,"y":85},
                  "v_1":{"x":217,"y":132},
                  "v_2":{"x":500,"y":133},
                  "v_3":{"x":113,"y":220},
                  "v_4":{"x":226,"y":283},
                  "v_5":{"x":492,"y":258},
                  "v_6":{"x":354,"y":365},
                  "v_7":{"x":353,"y":228}
            },
            "edgeVisualInfo":{
               "e_0":{},
               "e_1":{},
               "e_2":{},
               "e_3":{},
               "e_5":{},
               "e_6":{},
               "e_7":{},
               "e_8":{},
               "e_4":{},
               "e_9":{},
               "e_10":{}
            },
            "minGraph":{
               "vertexInfo":{
                  "v_0":{},"v_1":{},"v_2":{},"v_3":{},"v_4":{},"v_5":{},"v_6":{},"v_7":{}
               },
               "edgeInfo":{
                  "e_0":{},"e_1":{},"e_2":{},"e_3":{},"e_5":{},"e_6":{},"e_7":{},"e_8":{},"e_4":{},"e_9":{},"e_10":{}
               },
               "edgeVertices":{
                  "e_0":["v_0","v_1"],
                  "e_1":["v_0","v_2"],
                  "e_2":["v_2","v_5"],
                  "e_3":["v_5","v_6"],
                  "e_5":["v_0","v_7"],
                  "e_6":["v_1","v_3"],
                  "e_7":["v_3","v_4"],
                  "e_8":["v_4","v_1"],
                  "e_4":["v_4","v_6"],
                  "e_9":["v_7","v_4"],
                  "e_10":["v_7","v_5"]
               },
               "directed":true
            }
         },
         nbShapes: [3,2],
         movableVertices: false
      },
      medium: {
         paperH: 400,
         visualGraphJSON: {
           "vertexVisualInfo": {
             "v_0": { "x": 272, "y": 97 },
             "v_1": { "x": 111, "y": 171 },
             "v_2": { "x": 265, "y": 189 },
             "v_4": { "x": 183, "y": 285 },
             "v_5": { "x": 499, "y": 369 },
             "v_6": { "x": 608, "y": 236 },
             "v_7": { "x": 284, "y": 374 },
             "v_8": { "x": 435, "y": 66 },
             "v_9": { "x": 536, "y": 174 },
             "v_10": { "x": 407, "y": 245 },
             "v_11": { "x": 203, "y": 25 },
             "v_12": { "x": 319, "y": 246 },
             "v_13": { "x": 362, "y": 137 }
           },
           "edgeVisualInfo": {
             "e_0": {}, "e_1": {}, "e_2": {}, "e_3": {}, "e_4": {}, "e_5": {}, "e_6": {},
             "e_9": {}, "e_10": {}, "e_11": {}, "e_12": {}, "e_13": {}, "e_14": {}, "e_15": {},
             "e_16": {}, "e_17": {}, "e_18": {},"e_7": {}
           },
           "minGraph": {
             "vertexInfo": {
               "v_0": {}, "v_1": {}, "v_2": {}, "v_4": {}, "v_5": {}, "v_6": {}, "v_7": {}, "v_8": {}, "v_9": {},
               "v_10": {}, "v_11": {}, "v_12": {}, "v_13": {}
             },
             "edgeInfo": {
             "e_0": {}, "e_1": {}, "e_2": {}, "e_3": {}, "e_4": {}, "e_5": {}, "e_6": {},
             "e_9": {}, "e_10": {}, "e_11": {}, "e_12": {}, "e_13": {}, "e_14": {}, "e_15": {},
             "e_16": {}, "e_17": {}, "e_18": {},"e_7": {}
             },
             "edgeVertices": {
               "e_0": [ "v_0", "v_11"],
               "e_1": [ "v_11", "v_8"],
               "e_2": [ "v_8", "v_10"],
               "e_3": [ "v_10", "v_9"],
               "e_4": [ "v_9", "v_8"],
               "e_5": [ "v_0", "v_2"],
               "e_6": [ "v_1", "v_2"],
               "e_9": [ "v_4", "v_1"],
               "e_10": [ "v_11", "v_1"],
               "e_11": [ "v_5", "v_6"],
               "e_12": [ "v_6", "v_7"],
               "e_13": [ "v_7", "v_5"],
               "e_14": [ "v_7", "v_12"],
               "e_15": [ "v_12", "v_4"],
               "e_16": [ "v_6", "v_10"],
               "e_17": [ "v_0", "v_13"],
               "e_18": [ "v_13", "v_10"],
               "e_7": [ "v_2", "v_4"]
             },
             "directed": true
           }
         },
         nbShapes: [4,3],
         movableVertices: true
      },
      hard: {
         paperH: 480,
         visualGraphJSON: {
           "vertexVisualInfo": {
             "v_0": { "x": 220, "y": 94 },
             "v_1": { "x": 470, "y": 133 },
             "v_2": { "x": 429, "y": 349 },
             "v_3": { "x": 622, "y": 336 },
             "v_4": { "x": 219, "y": 302 },
             "v_5": { "x": 264, "y": 393 },
             "v_6": { "x": 28, "y": 200 },
             "v_7": { "x": 84, "y": 80 },
             "v_8": { "x": 139, "y": 262 },
             "v_9": { "x": 67, "y": 387 },
             "v_10": { "x": 631, "y": 35 },
             "v_11": { "x": 666, "y": 186 },
             "v_12": { "x": 576, "y": 218 },
             "v_13": { "x": 540, "y": 129 },
             "v_14": { "x": 252, "y": 35 },
             "v_15": { "x": 424, "y": 35 },
             "v_16": { "x": 350, "y": 124 },
             "v_17": { "x": 165, "y": 165 },
             "v_18": { "x": 387, "y": 404 },
             "v_19": { "x": 333, "y": 218 },
             "v_20": { "x": 497, "y": 295 },
             "v_21": { "x": 228, "y": 178 }
           },
           "edgeVisualInfo": {
             "e_0": {}, "e_1": {}, "e_2": {}, "e_3": {}, "e_5": {}, "e_6": {}, "e_7": {}, "e_8": {},
             "e_9": {}, "e_10": {}, "e_11": {}, "e_13": {}, "e_14": {}, "e_16": {}, "e_17": {},
             "e_18": {}, "e_19": {}, "e_20": {}, "e_21": {}, "e_22": {}, "e_23": {}, "e_24": {},
             "e_25": {}, "e_26": {}, "e_27": {}, "e_28": {}, "e_29": {}, "e_30": {}, "e_31": {},
             "e_12": {}, "e_32": {}, "e_33": {}, "e_34": {}, "e_35": {}, "e_15": {}, "e_36": {},
             "e_37": {}
           },
           "minGraph": {
             "vertexInfo": { "v_0": {}, "v_1": {}, "v_2": {}, "v_3": {}, "v_4": {}, "v_5": {}, "v_6": {}, "v_7": {}, "v_8": {}, "v_9": {}, "v_10": {}, "v_11": {}, "v_12": {}, "v_13": {}, "v_14": {}, "v_15": {}, "v_16": {}, "v_17": {}, "v_18": {}, "v_19": {}, "v_20": {}, "v_21": {}
             },
             "edgeInfo": {
                "e_0": {}, "e_1": {}, "e_2": {}, "e_3": {}, "e_5": {}, "e_6": {}, "e_7": {}, "e_8": {},
                "e_9": {}, "e_10": {}, "e_11": {}, "e_13": {}, "e_14": {}, "e_16": {}, "e_17": {},
                "e_18": {}, "e_19": {}, "e_20": {}, "e_21": {}, "e_22": {}, "e_23": {}, "e_24": {},
                "e_25": {}, "e_26": {}, "e_27": {}, "e_28": {}, "e_29": {}, "e_30": {}, "e_31": {},
                "e_12": {}, "e_32": {}, "e_33": {}, "e_34": {}, "e_35": {}, "e_15": {}, "e_36": {},
                "e_37": {}
             },
             "edgeVertices": {
                "e_0": [ "v_1", "v_3" ],
                "e_1": [ "v_3", "v_2" ],
                "e_2": [ "v_2", "v_1" ],
                "e_3": [ "v_4", "v_5" ],
                "e_5": [ "v_6", "v_7" ],
                "e_6": [ "v_7", "v_8" ],
                "e_7": [ "v_8", "v_9" ],
                "e_8": [ "v_9", "v_6" ],
                "e_9": [ "v_9", "v_7" ],
                "e_10": [ "v_10", "v_11" ],
                "e_11": [ "v_11", "v_12" ],
                "e_13": [ "v_13", "v_10" ],
                "e_14": [ "v_13", "v_20" ],
                "e_16": [ "v_20", "v_19" ],
                "e_17": [ "v_5", "v_19" ],
                "e_18": [ "v_5", "v_18" ],
                "e_19": [ "v_3", "v_18" ],
                "e_20": [ "v_14", "v_15" ],
                "e_21": [ "v_15", "v_16" ],
                "e_22": [ "v_16", "v_14" ],
                "e_23": [ "v_0", "v_14" ],
                "e_24": [ "v_0", "v_17" ],
                "e_25": [ "v_16", "v_4" ],
                "e_26": [ "v_15", "v_1" ],
                "e_27": [ "v_17", "v_6" ],
                "e_28": [ "v_0", "v_10" ],
                "e_29": [ "v_17", "v_4" ],
                "e_30": [ "v_0", "v_21" ],
                "e_31": [ "v_21", "v_11" ],
                "e_12": [ "v_11", "v_13" ],
                "e_32": [ "v_12", "v_20" ],
                "e_33": [ "v_8", "v_19" ],
                "e_34": [ "v_21", "v_8" ],
                "e_35": [ "v_19", "v_18" ],
                "e_15": [ "v_4", "v_20" ],
                "e_36": [ "v_17", "v_1" ],
                "e_37": [ "v_21", "v_16" ],
             },
             "directed": true
         }
         },
         nbShapes: [8,7],
         movableVertices: true
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
   var marginX = 5;
   var marginY = 10;

   var circleR = 25;
   var shapeR = 23;
   var dragLimits;

   var visualGraphJSON;
   var graph, vGraph;
   var graphDrawer;
   var vertexDragger, vertexClicker;
   var vertexDragAndConnect;
   var graphEditor;
   var nbShapes;

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

   var shapes = ["triangle","square"];

   var circleAttr = {
      fill: "white",
      stroke: colors.black,
      "stroke-width": 2,
      r: circleR
   };
   var lineAttr = {
      stroke: colors.black,
      "stroke-width": 3,
      "arrow-end": "classic-wide-long"
   };
   var highlightedEdgeAttr = {
      stroke: "red",
      "stroke-width": 5,
      "arrow-end": "classic-wide-long"
   };
   var shapeAttr = [
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

   subTask.loadLevel = function (curLevel) {
      level = curLevel;
      visualGraphJSON = data[level].visualGraphJSON;
      nbShapes = data[level].nbShapes;
      paperH = data[level].paperH;
      dragLimits = {
         minX: circleR + circleAttr["stroke-width"]/2,
         maxX: paperW - (circleR + circleAttr["stroke-width"]/2),
         minY: circleR + circleAttr["stroke-width"]/2,
         maxY: paperH - (circleR + circleAttr["stroke-width"]/2)
      };
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
      initPaper();
      initGraph();

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
         // seed: rng.nextInt(0,20),
         vGraphJSON: visualGraphJSON
      };

      return defaultAnswer;
   };

   function getResultAndMessage() {
      var result = checkResult(true);
      return result
   };

   subTask.unloadLevel = function (callback) {
      subTask.raphaelFactory.destroyAll();
      callback();
   };

   subTask.getGrade = function (callback) {
      callback(getResultAndMessage());
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper","paper",paperW,paperH);
      // Beav.Raphael.loadTextExtensions(paper);
   };

   function initGraph() {
      graphDrawer = new SimpleGraphDrawer(circleAttr, lineAttr, null, true);
      graphDrawer.setDrawVertex(drawVertex);
      vGraph = VisualGraph.fromJSON(JSON.stringify(answer.vGraphJSON), "vGraph", paper, null, graphDrawer, true);
      graph = vGraph.graph;
      graphMouse = new GraphMouse("mouse", graph, vGraph);

      initVertexDragAndConnect();
   };

   function initVertexDragAndConnect() {
      vertexDragAndConnect = new VertexDragAndConnect({
         paper: paper,
         paperElementID: "paper",
         graph: graph,
         visualGraph: vGraph,
         graphMouse: graphMouse,
         onVertexSelect: onVertexClick,
         onPairSelect: onPairSelect,
         onDragEnd: endDragCallback,
         startDragCallback: startDragCallback,
         vertexThreshold: 0,
         dragThreshold: 5,
         dragLimits: dragLimits,
         enabled: true

      });
      if(!data[level].movableVertices){
         vertexDragAndConnect.dragThreshold = Infinity;
      }
   };

   function onVertexClick(vertexId,selected,x,y,params) {
      // console.log(vertexId,selected,x,y)
      if((x != undefined && y != undefined) || (params && params.event && params.event.type == "touchend")){  // fix FF bug + silk bug
         var info = graph.getVertexInfo(vertexId);
         if(!info.shape){
            info.shape = 0;
         }
         info.shape = (info.shape + 1)%(shapes.length + 1);
         updateVertex(vertexId);
         saveAnswer();
      }
   };

   function onPairSelect(selectionParent, id, x, y) {
      vertexDragAndConnect.selectionParent = id;
   };

   function updateVertex(id) {
      var info = graph.getVertexInfo(id);
      var raphObj = vGraph.getRaphaelsFromID(id);
      for(var iElem = 1; iElem < raphObj.length; iElem++){
         if(iElem == info.shape){
            raphObj[iElem].show();
         }else{
            raphObj[iElem].hide();
         }
      }
   };

   function drawVertex(id,info,visualInfo) {
      var pos = this._getVertexPosition(visualInfo);
      this.originalPositions[id] = pos;
      var node = this.paper.circle(pos.x, pos.y).attr(circleAttr);
      var result = [node];
      var customElem = [];
      for(var iShape = 0; iShape < shapes.length; iShape++){
         var shapeName = shapes[iShape];
         // var shapeObj = getShape(paper,shapeName,pos.x,pos.y,{ radius: shapeR }).attr(shapeAttr[iShape]).hide();
         var shapeW = 2*shapeR;
         var xSh = pos.x - shapeR;
         var ySh = pos.y - shapeR;
         var shapeSrc = $("#"+shapeName).attr("src");
         var shapeObj = paper.image(shapeSrc,xSh,ySh,shapeW,shapeW).hide();
         if(info.shape == iShape + 1){
            shapeObj.show();
         }
         customElem.push(shapeObj);
      }
      this._addCustomElements(id, customElem);
      return result.concat(customElem);
   };

   function saveAnswer() {
      answer.vGraphJSON = JSON.parse(vGraph.toJSON());
   };

   function startDragCallback() {
      displayError("");
      removeHighlight();
   };

   function endDragCallback(id) {
      checkOverlap(id)
      saveAnswer();
   };

   function checkOverlap(id) {
      var pos = vGraph.getVertexVisualInfo(id);
      if(overlapOtherVertex(pos.x,pos.y,id)){
         findEmptySpace(id);
      }
   };

   function overlapOtherVertex(x,y,id) {
      var vertices = graph.getAllVertices();
      for(var iVert = 0; iVert < vertices.length; iVert++) {
         var vertex = vertices[iVert];
         if(vertex != id){
            var pos = vGraph.getVertexVisualInfo(vertex);
            if(Beav.Geometry.distance(x,y,pos.x,pos.y) < 2*circleR){
               return true;
            }
         }
      }
      return false;
   };

   function findEmptySpace(id) {
      var d = paperW;
      var pos = vGraph.getVertexVisualInfo(id);
      var newX = 0;
      var newY = 0;
      for (var x = dragLimits.minX; x < dragLimits.maxX; x += circleR){
         for (var y = dragLimits.minY; y < dragLimits.maxY; y += circleR){
            if (!overlapOtherVertex(x,y,id)){
               newD = Beav.Geometry.distance(pos.x,pos.y,x,y);
               if(newD < d){
                  d = newD;
                  newX = x;
                  newY = y;
               }
            }
         }
      }
      vGraph.graphDrawer.moveVertex(id, newX, newY);
   };

   function highlightEdge(id) {
      var raphObj = vGraph.getRaphaelsFromID(id);
      raphObj[0].attr(highlightedEdgeAttr);
   };

   function highlightPath(path) {
      var edges = [];
      for(var iVert = 0; iVert < path.length - 1; iVert++){
         var v1 = path[iVert];
         var v2 = path[iVert + 1];
         var edgesBetween = graph.getEdgesBetween(v1, v2)[0];
         edges = edges.concat(edgesBetween);
      }
      for(var iEdge = 0; iEdge < edges.length; iEdge++){
        var eID = edges[iEdge];
         highlightEdge(eID);
      }
   };

   function removeHighlight() {
      var edges = graph.getAllEdges();
      for(var iEdge = 0; iEdge < edges.length; iEdge++){
        var eID = edges[iEdge];
         var raphObj = vGraph.getRaphaelsFromID(eID);
         raphObj[0].attr(lineAttr);
      }
   };

   function findWrongPath(path,shapeID,gr) {
      var lastVert = path[path.length - 1];
      var children = gr.getChildren(lastVert);
      // console.log(shapeID,Beav.Object.clone(path))
      for(var iChild = 0; iChild < children.length; iChild++){
        var child = children[iChild];
         var currPath = Beav.Object.clone(path);
         var childInfo = gr.getVertexInfo(child);
         if(Beav.Array.has(currPath,child) || childInfo.shape == shapeID){
            continue
         }
         currPath.push(child);
         // console.log(lastVert,child,childInfo.shape)
         if(childInfo.shape > 0 && Math.abs(shapeID - childInfo.shape) == 1){
            return currPath
         }
         var wrongPath = findWrongPath(currPath,shapeID,gr)
         if(wrongPath){
            return wrongPath
         }
      }
      return false
   };

   function checkResult(noVisual) {
      var corrVisualGraph = answer.vGraphJSON;
      var corrGraph = Graph.fromJSON(JSON.stringify(corrVisualGraph.minGraph));
      var vertices = corrGraph.getAllVertices();
      var edges = corrGraph.getAllEdges();

      var shapeVertices = [[],[]];
      for(var iVert = 0; iVert < vertices.length; iVert++){
        var vID = vertices[iVert];
         var info = corrGraph.getVertexInfo(vID);
         if(info.shape){
            shapeVertices[info.shape - 1].push(vID);
         }
      }
      for(var iShape = 0; iShape < shapes.length; iShape++){
         if(shapeVertices[iShape].length != nbShapes[iShape]){
            var error = taskStrings.errorNbShapes(iShape);
            if(!noVisual){
               displayError(error);
            }
            return { successRate: 0, message: error }
         }
      }

      for(var iShape = 0; iShape < shapeVertices.length; iShape++){
         var shapeVert = shapeVertices[iShape];
         for(var iVert = 0; iVert < shapeVert.length; iVert++){
          var vID = shapeVert[iVert];
            var path = [vID];
            var wrongPath = findWrongPath([vID],iShape + 1,corrGraph);
            if(wrongPath){
               var error = taskStrings.errorEdge(iShape, 1 - iShape);
               if(!noVisual){
                  displayError(error);
                  highlightPath(wrongPath);
               }
               return { successRate: 0, message: error }
            }
         }
      }

      if(!noVisual){
         platform.validate("done");
      }
      return { successRate: 1, message: taskStrings.success }
   };

   function displayInfo(msg) {
      $("#error").html(msg).css({color: "orange" });
   }

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
