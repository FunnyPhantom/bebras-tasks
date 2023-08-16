// This variable needs to live between restarts.
// When true, a message is shown about adding to library in basic.
var shapeWasAddedToLibrary = false;
var basicVersionWasSolved = false;

function initTask(subTask) {

   var state = {};
   var level;
   var answer = null;

   var data = {
      basic: {
         optimal: 4,
         hasAdd: true,
         hasClear: false,
         hasRotation: false,
         hasHint: true,
         gradingScheme: "basic",
         overlayLayout: "basic",
         target: [
            {"shapeName":"circle","x":50,"y":50,"angle":0, zorder: {"circle-on-square-1": 0}},
            {"shapeName":"square","x":75,"y":75,"angle":0, zorder: {"circle-on-square-1": 1}},
            {"shapeName":"circle","x":75,"y":150,"angle":0, zorder: {"circle-on-square-3": 0}},
            {"shapeName":"square","x":100,"y":175,"angle":0, zorder: {"circle-on-square-3": 1}},
            {"shapeName":"circle","x":150,"y":75,"angle":0, zorder: {"circle-on-square-5": 0}},
            {"shapeName":"square","x":175,"y":100,"angle":0, zorder: {"circle-on-square-5": 1}}
         ],
         paper: {
            width: 600,
            height: 400,
            gridPos: {
               work: [2, 178],
               target: [388, 178]
            },
            targetScale: 1,
            libPos: [2, 32],
            counterPos: [295, 200],
            counterTextOffset: [0, 30],
            counterTargetOffset: [0, 75]
         },
         lib: {
            rows: 1,
            cols: 8,
            cellSide: 54,
            padding: 10,
            cellSpacing: 12,
            innerPadding: 5,
            buttonsPos: "left",
            buttonsDist: 40,
            rotateOffset: [-20, 0],
            textOffset: [260, -20]
         },
         grid: {
            rows: 8,
            cols: 8,
            cellSide: 25,
            targetTextOffset: [100, -20]
         },
         undo: {
            centerX: 295,
            centerY: 340
         },
         baseShapes: {
            circle: {
               radius: 25,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            },
            triangle: {
               baseSize: 50,
               height: 75,
               snapPoints: [
                  // relative to center of base
                  [0, -75]
               ]
            },
            square: {
               side: 50,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            }
         },
         initialLib: [
            [{
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            },
            {
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            },
            {
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }]
         ]
      },
      easy: {
         optimal: 5,
         hasAdd: true,
         hasClear: false,
         hasRotation: false,
         hasHint: false,
         gradingScheme: "easy",
         overlayLayout: "easy",
         target: [
			{"shapeName":"square","x":50,"y":50,"angle":0, zorder: {"triangle-on-square-1": 0 }},
			{"shapeName":"triangle","x":75,"y":75,"angle":0, zorder: {"triangle-on-square-1": 1, "circle-on-triangle": 0}},
			{"shapeName":"square","x":125,"y":50,"angle":0, zorder: {"triangle-on-square-2": 0, "circle-on-square": 0 }},
			{"shapeName":"triangle","x":150,"y":75,"angle":0, zorder: {"triangle-on-square-2": 1}},
			{"shapeName":"circle","x":100,"y":75,"angle":0, zorder: {"circle-on-triangle": 1, "triangle-on-circle": 0, "circle-on-square": 1}},
			{"shapeName":"square","x":75,"y":125,"angle":0, zorder: {"triangle-on-square-3": 0}},
			{"shapeName":"triangle","x":100,"y":150,"angle":0, zorder: {"triangle-on-square-3": 1, "triangle-on-circle": 1}}
         ],
         paper: {
            width: 600,
            height: 400,
            gridPos: {
               work: [2, 178],
               target: [388, 178]
            },
            targetScale: 1,
            libPos: [2, 32],
            counterPos: [295, 200],
            counterTextOffset: [0, 30],
            counterTargetOffset: [0, 75]
         },
         lib: {
            rows: 1,
            cols: 8,
            cellSide: 54,
            padding: 10,
            cellSpacing: 12,
            innerPadding: 5,
            buttonsPos: "left",
            buttonsDist: 40,
            rotateOffset: [-20, 0],
            textOffset: [260, -20]
         },
         grid: {
            rows: 8,
            cols: 8,
            cellSide: 25,
            targetTextOffset: [100, -20]
         },
         undo: {
            centerX: 295,
            centerY: 340
         },
         baseShapes: {
            circle: {
               radius: 25,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            },
            triangle: {
               baseSize: 50,
               height: 75,
               snapPoints: [
                  // relative to center of base
                  [0, -75]
               ]
            },
            square: {
               side: 50,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            }
         },
         initialLib: [
            [{
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            },
            {
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            },
            {
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }]
         ]
      },
      medium: {
         optimal: 6,
         hasAdd: true,
         hasClear: false,
         hasRotation: true,
         hasHint: false,
         gradingScheme: "medium",
         overlayLayout: "medium",
         target: [
            {
               "shapeName": "triangle",
               "x": 100,
               "y": 175,
               "angle": 0,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-1": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 100,
               "y": 175,
               "angle": 0,
               zorder: {
                  "circle-on-triangle-1": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 153.03300858899107,
               "y": 153.03300858899104,
               "angle": 315,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-2": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 153.0330085889911,
               "y": 153.03300858899104,
               "angle": 315,
               zorder: {
                  "circle-on-triangle-2": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 175,
               "y": 100,
               "angle": 270,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-3": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 175,
               "y": 100,
               "angle": 270,
               zorder: {
                  "circle-on-triangle-3": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 153.03300858899107,
               "y": 46.96699141100896,
               "angle": 225,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-4": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 153.03300858899104,
               "y": 46.96699141100896,
               "angle": 225,
               zorder: {
                  "circle-on-triangle-4": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 100,
               "y": 25,
               "angle": 180,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-5": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 100,
               "y": 25,
               "angle": 180,
               zorder: {
                  "circle-on-triangle-5": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 46.96699141100895,
               "y": 46.966991411008934,
               "angle": 135,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-6": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 46.966991411008934,
               "y": 46.96699141100896,
               "angle": 135,
               zorder: {
                  "circle-on-triangle-6": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 25,
               "y": 100,
               "angle": 90,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-7": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 25,
               "y": 100,
               "angle": 90,
               zorder: {
                  "circle-on-triangle-7": 1
               }
            },
            {
               "shapeName": "triangle",
               "x": 46.966991411008905,
               "y": 153.03300858899104,
               "angle": 45,
               zorder: {
                  "triangles-on-square": 1,
                  "circle-on-triangle-8": 0
               }
            },
            {
               "shapeName": "circle",
               "x": 46.96699141100893,
               "y": 153.03300858899104,
               "angle": 45,
               zorder: {
                  "circle-on-triangle-8": 1
               }
            },
            {
               "shapeName": "square",
               "x": 100,
               "y": 100,
               "angle": 0,
               zorder: {
                  "triangles-on-square": 2
               }
            }
         ],
         paper: {
            width: 600,
            height: 440,
            gridPos: {
               work: [2, 178],
               target: [388, 178]
            },
            targetScale: 1,
            libPos: [52, 32],
            counterPos: [295, 200],
            counterTextOffset: [0, 30],
            counterTargetOffset: [0, 75]
         },
         lib: {
            rows: 1,
            cols: 8,
            cellSide: 54,
            padding: 10,
            cellSpacing: 12,
            innerPadding: 5,
            buttonsPos: "left",
            buttonsDist: 40,
            rotateOffset: [-20, 0],
            textOffset: [260, -20]
         },
         grid: {
            rows: 8,
            cols: 8,
            cellSide: 25,
            targetTextOffset: [100, -20]
         },
         undo: {
            centerX: 295,
            centerY: 340
         },
         baseShapes: {
            circle: {
               radius: 25,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            },
            triangle: {
               baseSize: 50,
               height: 75,
               snapPoints: [
                  // relative to center of base
                  [0, -75]
               ]
            },
            square: {
               side: 50,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            }
         },
         initialLib: [
            [{
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }]
         ]
      },
      hard: {
         optimal: 8,
         hasAdd: true,
         hasClear: false,
         hasRotation: true,
         hasHint: false,
         gradingScheme: "hard",
         overlayLayout: "hard",
         target: [
			{"shapeName":"triangle","x":34,"y":238,
			 "angle":45,zorder: {"circle-on-triangle-1": 0} },
			{"shapeName":"circle","x":34,"y":238,
			 "angle":45,zorder: {"circle-on-triangle-1": 1}},
			{"shapeName":"triangle","x":68,"y":155.91673887931478,
			 "angle":180,zorder: {"circle-on-triangle-2": 0}},
			{"shapeName":"circle","x":68,"y":155.91673887931478,
			 "angle":180,zorder: {"circle-on-triangle-2": 1}},
			{"shapeName":"triangle","x":102,"y":102,
			 "angle":315,zorder: {"circle-on-triangle-3": 0}},
			{"shapeName":"circle","x":102,"y":102,
			 "angle":315,zorder: {"circle-on-triangle-3": 1, "square-on-circle": 0}},
			{"shapeName":"triangle","x":19.916738879314806,"y":68,
			 "angle":90,zorder: {"circle-on-triangle-4": 0}},
			{"shapeName":"circle","x":19.916738879314806,"y":68,
			 "angle":90,zorder: {"circle-on-triangle-4": 1}},
			{"shapeName":"triangle","x":238,"y":102,
			 "angle":315,zorder: {"circle-on-triangle-5": 0}},
			{"shapeName":"circle","x":238,"y":102,
			 "angle":315,zorder: {"circle-on-triangle-5": 1}},
			{"shapeName":"triangle","x":155.91673887931478,"y":68,
			 "angle":90,zorder: {"circle-on-triangle-6": 0}},
			{"shapeName":"circle","x":155.91673887931478,"y":68,
			 "angle":90,zorder: {"circle-on-triangle-6": 1}},
			{"shapeName":"triangle","x":34,"y":34,
			 "angle":135,zorder: {"circle-on-triangle-7": 0}},
			{"shapeName":"circle","x":34,"y":34,
			 "angle":135,zorder: {"circle-on-triangle-7": 1}},
			{"shapeName":"triangle","x":116.08326112068522,"y":68,
			 "angle":270,zorder: {"circle-on-triangle-8": 0}},
			{"shapeName":"circle","x":116.08326112068522,"y":68,
			 "angle":270,zorder: {"circle-on-triangle-8": 1}},
			{"shapeName":"triangle","x":170,"y":102,
			 "angle":45,zorder: {"circle-on-triangle-9": 0}},
			{"shapeName":"circle","x":170,"y":102,
			 "angle":45,zorder: {"circle-on-triangle-9": 1, "square-on-circle": 0}},
			{"shapeName":"triangle","x":204,"y":19.916738879314792,
			 "angle":180,zorder: {"circle-on-triangle-10": 0}},
			{"shapeName":"circle","x":204,"y":19.916738879314792,
			 "angle":180,zorder: {"circle-on-triangle-10": 1}},
			{"shapeName":"triangle","x":170,"y":238,
			 "angle":45,zorder: {"circle-on-triangle-11": 0}},
			{"shapeName":"circle","x":170,"y":238,
			 "angle":45,zorder: {"circle-on-triangle-11": 1}},
			{"shapeName":"triangle","x":204,"y":155.91673887931478,
			 "angle":180,zorder: {"circle-on-triangle-12": 0}},
			{"shapeName":"circle","x":204,"y":155.91673887931478,
			 "angle":180,zorder: {"circle-on-triangle-12": 1}},
			{"shapeName":"triangle","x":238,"y":34,
			 "angle":225,zorder: {"circle-on-triangle-13": 0}},
			{"shapeName":"circle","x":238,"y":34,
			 "angle":225,zorder: {"circle-on-triangle-13": 1}},
			{"shapeName":"triangle","x":204,"y":116.08326112068522,
			 "angle":0,zorder: {"circle-on-triangle-14": 0}},
			{"shapeName":"circle","x":204,"y":116.08326112068522,
			 "angle":0,zorder: {"circle-on-triangle-14": 1}},
			{"shapeName":"triangle","x":170,"y":170,
			 "angle":135,zorder: {"circle-on-triangle-15": 0}},
			{"shapeName":"circle","x":170,"y":170,
			 "angle":135,zorder: {"circle-on-triangle-15": 1, "square-on-circle": 0}},
			{"shapeName":"triangle","x":252.08326112068522,"y":204,
			 "angle":270,zorder: {"circle-on-triangle-16": 0}},
			{"shapeName":"circle","x":252.08326112068522,"y":204,
			 "angle":270,zorder: {"circle-on-triangle-16": 1}},
			{"shapeName":"triangle","x":34,"y":170,
			 "angle":135,zorder: {"circle-on-triangle-17": 0}},
			{"shapeName":"circle","x":34,"y":170,
			 "angle":135,zorder: {"circle-on-triangle-17": 1}},
			{"shapeName":"triangle","x":116.08326112068522,"y":204,
			 "angle":270,zorder: {"circle-on-triangle-18": 0}},
			{"shapeName":"circle","x":116.08326112068522,"y":204,
			 "angle":270,zorder: {"circle-on-triangle-18": 1}},
			{"shapeName":"square","x":136,"y":136,
         "angle":270,zorder: {"square-on-circle": 1}}],
         paper: {
            width: 700,
            height: 465,
            gridPos: {
               work: [160, 72],
               target: [450, 72]
            },
            targetScale: 0.9,
            libPos: [2, 72],
            counterPos: [30, 370],
            counterTextOffset: [60, 0],
            counterTargetOffset: [60, 40]
         },
         lib: {
            rows: 4,
            cols: 2,
            cellSide: 54,
            padding: 10,
            cellSpacing: 12,
            innerPadding: 5,
            buttonsPos: "top",
            buttonsDist: -60,
            rotateOffset: [0, -20],
            textOffset: [70, -60]
         },
         grid: {
            rows: 8,
            cols: 8,
            cellSide: 34,
            targetTextOffset: [120, -20]
         },
         undo: {
            centerX: 560,
            centerY: 360
         },
         baseShapes: {
            circle: {
               radius: 17,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            },
            triangle: {
               baseSize: 34,
               // The height of the triangle is sqrt(2) * cell side (not rounded!).
               // This prevents snapping issues when placing the triangle rotated.
               height: 34 * Math.sqrt(2),
               snapPoints: [
                  // relative to center of base
                  [0, - (34 * Math.sqrt(2))],
                  [0 ,0]
               ]
            },
            square: {
               side: 68,
               snapPoints: [
                  // relative to center
                  [0, 0]
               ]
            }
         },
         initialLib: [
            [{
               "shapeName": "circle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "triangle",
               "x": 0,
               "y": 0,
               "angle": 0
            }],
            [{
               "shapeName": "square",
               "x": 0,
               "y": 0,
               "angle": 0
            }]
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


   // An item is a list of base shapes with their positions and angles.
   // Each item has an ID, which is its index in the list of items.
   var items;
   var itemSnapPoints;
   var workGrid;
   var workGridSnaps;

   var paper;
   var paperW, paperH;

   var maxButtonScale = 1.2;

   var raphLibrary;
   var raphWorkGrid;
   var raphWorkContents;
   var raphTargetGrid;
   var dragStartPos;
   var dragCurPos;
   var dragItemID;
   var dragItemWidth;
   var dragItemHeight;
   var dragRaph;
   var dragRaphShadow;
   var addButton;
   var clearButton;
   var undoButton;
   var raphError;

   var raphCounter;

   var gridWidth;
   var gridHeight;

   var libDat;
   var paperDat;
   var undoPos;
   var libW, libH;

   var addAlsoClears = false;

   // Coordinates and angles that are this close
   // will be considered identical for checking the result.
   var epsilon = 1;

   // If a shape snap point is closer than this distance,
   // it is preferred over a grid point (even if a grid point is closer).
   var shapeSnapPointThreshold = 20;

   // If a shape is dragged from the library onto the library,
   // show an error message, unless it's this many pixels close to the drag start.
   var dragLibErrorThreshold = 10;

   var debugSnap = false;

   var libAttr = {
      rect: {
         stroke: "#468ee1",
         fill: "none",
         r: 5
      },
      itemRect: {
         stroke: "#468ee1",
         fill: "none",
         "stroke-dasharray": "-",
         r: 5
      },
      gridLine: {
         "stroke-width": 1,
         stroke: "#aaaaaa"
      },
      text: {
         "font-size": 16,
         "font-weight": "bold",
         "text-anchor": "middle"
      }
   };

   var shapeAttr = {
      circle: {
         fill: "#f5a623",
         stroke: "#ae7c22",
         "stroke-width": 3
      },
      triangle: {
         fill: "#62dff0",
         stroke: "#3a8792",
         "stroke-width": 3
      },
      square: {
         fill: "#2e5e95",
         stroke: "#183556",
         "stroke-width": 3
      },
      dragShadow: {
         circle: {
            fill: "none",
            stroke: "gray"
         },
         triangle: {
            fill: "none",
            stroke: "gray"
         },
         square: {
            fill: "none",
            stroke: "gray"
         }
      },
      disabledAttr: {
         circle: {
            fill: "gray",
            stroke: "gray"
         },
         square: {
            fill: "gray",
            stroke: "gray"
         },
         triangle: {
            fill: "gray",
            stroke: "gray"
         }
      },
      targetAttr: {
         circle: {
            fill: "#f5a623",
            stroke: "#ae7c22",
            "stroke-width": 3
         },
         triangle: {
            fill: "#62dff0",
            stroke: "#3a8792",
            "stroke-width": 3
         },
         square: {
            fill: "#2e5e95",
            stroke: "#183556",
            "stroke-width": 3
         }
      },
      targetShadowAttr: {
         circle: {
            fill: "#eeeeee",
            stroke: "#888888",
            "stroke-width": 3
         },
         triangle: {
            fill: "#eeeeee",
            stroke: "#888888",
            "stroke-width": 3
         },
         square: {
            fill: "#eeeeee",
            stroke: "#888888",
            "stroke-width": 3
         }
      },
      errorAttr: {
         circle: {
            fill: "none",
            stroke: "red",
            "stroke-width": 6
         },
         triangle: {
            fill: "none",
            stroke: "red",
            "stroke-width": 6
         },
         square: {
            fill: "none",
            stroke: "red",
            "stroke-width": 6
         }
      }
   };

   var addButtonParams = {
      yOffset: 15,
      width: 200,
      height: 40,
      enabledAttr: {
         rect: {
            fill: "#4a90e2",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "white"
         }
      },
      disabledAttr: {
         rect: {
            fill: "#aaaaaa",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "#cccccc"
         }
      }
   };

   var clearButtonParams = {
      yOffset: 15,
      width: 200,
      height: 40,
      enabledAttr: {
         rect: {
            fill: "#4a90e2",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "white"
         }
      },
      disabledAttr: {
         rect: {
            fill: "#aaaaaa",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "#cccccc"
         }
      }
   };

   var rotateButtonParams = {
      radius: 16,
      imageWidth: 16,
      imageHeight: 16,
      attr: {
         circle: {
            fill: "#4a90e2",
            stroke: "none"
         }
      }
   };

   var undoButtonParams = {
      width: 120,
      height: 40,
      enabledAttr: {
         rect: {
            fill: "#4a90e2",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "white"
         }
      },
      disabledAttr: {
         rect: {
            fill: "#aaaaaa",
            stroke: "none",
            r: 20
         },
         text: {
            "font-size": 16,
            "font-weight": "bold",
            fill: "#cccccc"
         }
      }
   };

   var gridLineAttr = {
      stroke: "black",
      "stroke-width": 1
   };

   var targetTitleAttr = {
      "font-size": 16,
      "font-weight": "bold",
      "text-anchor": "middle"
   }

   var counterParams = {
      number: {
         "font-size": 48,
         "font-weight": "bold"
      },
      words: {
         "font-size": 16,
         "font-weight": "bold"
      }
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

      libDat = data[level].lib;
      paperDat = data[level].paper;
      undoPos = data[level].undo;
      gridParams = data[level].grid;
      gridWidth = gridParams.cols * gridParams.cellSide;
      gridHeight = gridParams.rows * gridParams.cellSide;
      libW = 2 * libDat.padding + libDat.cols * libDat.cellSide + (libDat.cols - 1) * libDat.cellSpacing;
      libH = 2 * libDat.padding + libDat.rows * libDat.cellSide + (libDat.rows - 1) * libDat.cellSpacing;
      paperW = paperDat.width;
      paperH = paperDat.height;

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
      if(answer === undefined || answer === null) {
         answer = [];
      }
      /* stack where each element is an action:
         {
            type: "placeOnGrid" or "addToLibrary" or "rotateLibrary" or "clearGrid",
            params: {
               itemID: 0, x: 0, y: 0 // for placeOnGrid

               angle: 45 // for rotateLibrary
            }
         }
      */

      items = [];
      itemSnapPoints = [];
      workGrid = [];

      // The work grid contains snap points that correspond to the current target,
      // which is drawn in gray.
      workGridSnaps = [getItemSnapPoints(data[level].target, data[level].paper.gridPos.work[0], data[level].paper.gridPos.work[1])];

      for(var iItem = 0; iItem < data[level].initialLib.length; iItem++) {
         var item = data[level].initialLib[iItem];
         // Deep copy, we don't want to modify data[level].
         addItem($.extend(true, [], item));
      }

      for(var iAnswer = 0; iAnswer < answer.length; iAnswer++) {
         performAction(answer[iAnswer]);
      }
   };

   function addItem(item) {
      items.push(item);
      var snapPoints = getItemSnapPoints(item, 0, 0);
      itemSnapPoints.push(snapPoints);
      centerizeItem(item, snapPoints);
   }

   function getItemSnapPoints(item, x, y) {
      var snapPoints = [];
      for(var iShape = 0; iShape < item.length; iShape++) {
         var info = item[iShape];
         var snaps = data[level].baseShapes[info.shapeName].snapPoints;
         for(var iSnap = 0; iSnap < snaps.length; iSnap++) {
            var pos = getRaphaelPolarRotation(snaps[iSnap][0], snaps[iSnap][1], info.angle);
            snapPoints.push({
               x: x + info.x + pos.x,
               y: y + info.y + pos.y
            });
         }
      }
      return snapPoints;
   }

   function performAction(action) {
      if(action.type == "rotateLibrary") {
         rotateLibrary(action.params.angle);
      }
      else if(action.type == "addToLibrary") {
         addToLibrary();
      }
      else if(action.type == "placeOnGrid") {
         placeOnGrid(action.params.itemID, action.params.x, action.params.y);
      }
      else if(action.type == "clearGrid") {
         clearGrid();
      }
      else {
         throw "Unknown action " + action.type;
      }
   }

   function addToLibrary() {
      // The base shapes are deep copied from those of each subitem.
      var newItem = [];
      for(var iSub = 0; iSub < workGrid.length; iSub++) {
         for(var iShape = 0; iShape < workGrid[iSub].length; iShape++) {
            var shapeInfo = workGrid[iSub][iShape];
            newItem.push({
               shapeName: shapeInfo.shapeName,
               x: shapeInfo.x,
               y: shapeInfo.y,
               angle: shapeInfo.angle
            });
         }
      }

      if(addAlsoClears) {
         clearGrid();
      }

      /*
      // ----
      // TODO remove
      var targetArray = [];
      for(var iShape = 0; iShape < newItem.length; iShape++) {
         var shapeInfo = newItem[iShape];
         targetArray.push({
            shapeName: shapeInfo.shapeName,
            x: shapeInfo.x - data[level].paper.gridPos.work[0],
            y: shapeInfo.y - data[level].paper.gridPos.work[1],
            angle: shapeInfo.angle
         });
      }
      console.log(JSON.stringify(targetArray));
      // ----
      */

	  shapeWasAddedToLibrary = true;
      addItem(newItem);
   }

   function placeOnGrid(itemID, x, y) {
      var gridItem = [];
      var newSnaps = [];
      workGrid.push(gridItem);
      workGridSnaps.push(newSnaps);
      for(var iShape = 0; iShape < items[itemID].length; iShape++) {
         var shapeInfo = items[itemID][iShape];
         gridItem.push({
            shapeName: shapeInfo.shapeName,
            x: x + shapeInfo.x,
            y: y + shapeInfo.y,
            angle: shapeInfo.angle
         });
      }
      for(var iSnap = 0; iSnap < itemSnapPoints[itemID].length; iSnap++) {
         var point = itemSnapPoints[itemID][iSnap];
         newSnaps.push({
            x: x + point.x,
            y: y + point.y
         });
      }
   }

   function rotateLibrary(angle) {
      for(var iItem = 0; iItem < items.length; iItem++) {
         rotateItem(items[iItem], itemSnapPoints[iItem], angle);
      }
   }

   function rotateItem(item, snapPoints, angle) {
      for(var iShape = 0; iShape < item.length; iShape++) {
         var info = item[iShape];
         var pos = getRaphaelPolarRotation(info.x, info.y, angle);
         info.x = pos.x;
         info.y = pos.y;

         // The new angle of a shape is the sum of its existing
         // angle and the rotation angle. This turns out to be true
         // even if the shape is not at the origin.
         info.angle += angle;
         info.angle = (info.angle % 360 + 360) % 360;
      }
      for(var iSnap = 0; iSnap < snapPoints.length; iSnap++) {
         var point = snapPoints[iSnap];
         var newPos = getRaphaelPolarRotation(point.x, point.y, angle);
         point.x = newPos.x;
         point.y = newPos.y;
      }

      centerizeItem(item, snapPoints);
   }

   function clearGrid() {
      workGrid = [];
      workGridSnaps = [getItemSnapPoints(data[level].target, data[level].paper.gridPos.work[0], data[level].paper.gridPos.work[1])];
   }

   subTask.resetDisplay = function() {
      displayHelper.customValidate = checkResult;
      initPaper();
      if (typeof(enableRtl) != "undefined") {
         $("body").attr("dir", "rtl");
      }
   };

   subTask.getAnswerObject = function() {
      return answer;
   };

   subTask.getDefaultAnswerObject = function() {
      return [];
   };

   subTask.unloadLevel = function(callback) {
      callback();
   };

   function initPaper() {
      paper = subTask.raphaelFactory.create("paper", "paper", data[level].paper.width, data[level].paper.height);
      $("#paper").css({
         width: data[level].paper.width+"px",
         height: data[level].paper.height+"px",
         margin: "auto"
      });
      initOverlays();
      displayError("");
      drawGrids();
      drawTargetShape();
      drawUserItems();
      drawLibrary();
      drawAddButton();
      drawClearButton();
      updateAddClearState();
      drawRotateButtons();
      drawUndoButton();
      drawCounter();
      updateButtonSize();
   }

   function initOverlays() {
      $("#paper .overlay").remove();
      $("#paper").css({ position: "relative" });
      var x,y,w,h;
      var nbOv = (data[level].overlayLayout != "hard") ? 8 : 11;
      for(var iOver = 1; iOver <= nbOv; iOver++){
         var id = "overlay_"+iOver;
         switch(iOver){
            case 1:
               x = 0; y = 0;
               w = paperW;
               if(data[level].overlayLayout != "hard"){
                  h = paperDat.libPos[1];
               }else{
                  h = 17;
               }
               break;
            case 2:
               if(data[level].overlayLayout != "hard"){
                  x = paperDat.libPos[0] + libW;
                  y = 0;
                  w = paperW - x;
                  h = paperH;
               }else{
                  x = 395;
                  y = 0;
                  w = paperW - x;
                  h = paperDat.libPos[1];
               }
               break;
            case 3:
              if(data[level].overlayLayout != "hard"){
                  x = paperDat.gridPos.work[0] + gridWidth;
                  y = paperDat.libPos[1] + libH;
                  w = paperW - x;
                  h = undoPos.centerY - undoButtonParams.height/2 - y;
               }else{
                  x = 117;
                  y = 0;
                  w = 80;
                  h = paperDat.libPos[1];
               }
               break;
            case 4:
               if(data[level].overlayLayout != "hard"){
                  x = paperDat.gridPos.work[0] + gridWidth;
                  y = undoPos.centerY - undoButtonParams.height/2;
                  w = undoPos.centerX - undoButtonParams.width/2 - x;
                  h = paperH - y;
               }else{
                  x = 0;
                  y = paperDat.libPos[1] + libH;
                  w = 196;
                  h = paperH - y;
               }
               break;
            case 5:
               if(data[level].overlayLayout != "hard"){
                  x = undoPos.centerX + undoButtonParams.width/2;
                  y = undoPos.centerY - undoButtonParams.height/2;
                  w = paperW - x;
                  h = paperH - y;
               }else{
                  x = 196;
                  y = 399;
                  w = paperW - x;
                  h = paperH - y;
               }
               break;
            case 6:
               if(data[level].overlayLayout != "hard"){
                  x = undoPos.centerX - undoButtonParams.width/2;
                  y = undoPos.centerY + undoButtonParams.height/2;
                  w = undoButtonParams.width;
                  h = paperH - y;
               }else{
                  x = undoPos.centerX - undoButtonParams.width/2;
                  y = undoPos.centerY + undoButtonParams.height/2;
                  w = undoButtonParams.width;
                  h = paperH - y;
               }
               break;
            case 7:
               if(data[level].overlayLayout != "hard"){
                  x = 0;
                  y = paperDat.gridPos.work[1] - 15;
                  w = paperDat.gridPos.work[0] + gridWidth;
                  if(data[level].overlayLayout != "medium"){
                     h = paperH - y;
                  }else{
                     h = gridHeight + 30;
                  }
               }else{
                  x = paperDat.libPos[0] + libW;
                  y = paperDat.gridPos.work[1] - 15;
                  w = paperW - x;
                  h = undoPos.centerY - undoButtonParams.height/2 - y;
               }
               break;
            case 8:
                x = 0;
               if(data[level].overlayLayout != "hard"){
                  y = paperDat.libPos[1] + libH;
                  w = paperW;
                  h = 16;
               }else{
                  y = 0;
                  w = 120;
                  h = 35;
               }
               break;
            case 9:
               x = undoPos.centerX + undoButtonParams.width/2;
               y = undoPos.centerY - undoButtonParams.height/2;
               w = paperW - x;
               h = paperH - y;
               break;
            case 10:
               x = paperDat.libPos[0] + libW;
               y = undoPos.centerY - undoButtonParams.height/2;
               w = undoPos.centerX - undoButtonParams.width/2 - x;
               h = 18;
               break;
            case 11:
               x = 395;
               y = undoPos.centerY - 5;
               w = undoPos.centerX - undoButtonParams.width/2 - x;
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
   }

   function drawLibrary() {
      var lib = data[level].lib;
      var width = 2 * lib.padding + lib.cols * lib.cellSide + (lib.cols - 1) * lib.cellSpacing;
      var height = 2 * lib.padding + lib.rows * lib.cellSide + (lib.rows - 1) * lib.cellSpacing;
      paper.rect(data[level].paper.libPos[0], data[level].paper.libPos[1], width, height).attr(libAttr.rect);

      paper.text(
         data[level].paper.libPos[0] + data[level].lib.textOffset[0],
         data[level].paper.libPos[1] + data[level].lib.textOffset[1],
         taskStrings.libraryTitle).attr(libAttr.text);
      redrawLibraryItems();
   }

   function redrawLibraryItems() {
      undrawLibraryItems();
      raphLibrary = [];
      for(var iLib = 0; iLib < items.length; iLib++) {
         raphLibrary.push([]);
         drawLibraryItem(iLib);
      }
   }

   function undrawLibraryItems() {
      if(raphLibrary === null || raphLibrary === undefined) {
         return;
      }
      while(raphLibrary.length > 0) {
         popVisualLibrary();
      }
   }

   function popVisualLibrary() {
      if(raphLibrary === null || raphLibrary === undefined) {
         return;
      }
      var raphItem = raphLibrary.pop();
      for(var iObj = 0; iObj < raphItem.length; iObj++) {
         raphItem[iObj].remove();
      }
   }

   function drawLibraryItem(itemID) {
      raphLibrary[itemID] = [];
      var lib = data[level].lib
      var row = Math.floor(itemID / lib.cols);
      var col = Math.floor(itemID % lib.cols);

      var left = data[level].paper.libPos[0] + lib.padding + col * (lib.cellSpacing + lib.cellSide);
      var top = data[level].paper.libPos[1] + lib.padding + row * (lib.cellSpacing + lib.cellSide);
      var rectCenterX = left + lib.cellSide / 2;
      var rectCenterY = top + lib.cellSide / 2;

      // Rectangle.
      var itemRect = paper.rect(left, top, lib.cellSide, lib.cellSide);
      itemRect.attr(libAttr.itemRect);
      raphLibrary[itemID].push(itemRect);

      // Shapes.
      // The item is scaled down in a way that stays constant when rotating.
      // The scale used is the smallest one in which the item is still enabled
      // (i.e. not too big for the grid).
      var boundary = getItemBoundary(items[itemID]);
      var itemCenterX = (boundary.minX + boundary.maxX) / 2;
      var itemCenterY = (boundary.minY + boundary.maxY) / 2;
      var itemWidth = boundary.maxX - boundary.minX;
      var itemHeight = boundary.maxY - boundary.minY;

      rotateItem(items[itemID], [], 45);
      boundary = getItemBoundary(items[itemID]);
      var rotatedWidth = boundary.maxX - boundary.minX;
      var rotatedHeight = boundary.maxY - boundary.minY;
      rotateItem(items[itemID], [], -45);

      // Rotation is not exact, so an item can fit, then
      // be rotated 45, then be rotated -45, then not fit anymore.
      // We add 1 for these edge cases.
      var enabled = (itemWidth <= gridWidth + 1 && itemHeight <= gridHeight + 1);
      var rotatedEnabled = (rotatedWidth <= gridWidth + 1 && rotatedHeight <= gridHeight + 1);

      // Scale options.
      var currScale = (lib.cellSide - 2 * lib.innerPadding) / Math.max(itemWidth, itemHeight);
      var rotatedScale = (lib.cellSide - 2 * lib.innerPadding) / Math.max(rotatedWidth, rotatedHeight);

      var scale;

      if(enabled) {
         if(rotatedEnabled) {
            scale = Math.min(currScale, rotatedScale);
         }
         else {
            scale = currScale;
         }
      }
      else {
         scale = rotatedScale;
      }

      var extraAttr;
      if(!enabled) {
         extraAttr = shapeAttr.disabledAttr;
      }

      var raphElements = drawItem(
         items[itemID],
         itemSnapPoints[itemID],
         rectCenterX - itemCenterX * scale,
         rectCenterY - itemCenterY * scale,
         scale,
         extraAttr
      );
      for(var iElement = 0; iElement < raphElements.length; iElement++) {
         raphLibrary[itemID].push(raphElements[iElement]);
      }

      // Background grid. The line offset makes sure the grid is centered.
      var cellSize = data[level].grid.cellSide * scale;
      var numLines = Math.floor(lib.cellSide / cellSize);
      var lineOffset = (lib.cellSide - (numLines - 1) * cellSize) / 2;
      for(var iRow = 0; iRow < numLines; iRow++) {
         var line = paper.path(["M", left, top + iRow * cellSize + lineOffset, "H", left + lib.cellSide]);
         line.attr(libAttr.gridLine).toBack();
         raphLibrary[itemID].push(line);
         line = paper.path(["M", left + iRow * cellSize + lineOffset, top, "V", top + lib.cellSide]);
         line.attr(libAttr.gridLine).toBack();
         raphLibrary[itemID].push(line);
      }

      // Drag listener.
      if(enabled) {
         var overlay = paper.rect(left, top, lib.cellSide, lib.cellSide);
         overlay.attr({fill: "red", opacity: 0, "cursor": "grab"});
         overlay.toFront();
         Beav.dragWithTouch(overlay, onDragMove, onDragStart(itemID), onDragEnd, displayHelper);
         raphLibrary[itemID].push(overlay);
      }

      // Cover shapes outside border.
      if(!enabled) {
         var coverSize = lib.cellSpacing / 2;
         var coverParams = [
            [left - coverSize - 1, top, coverSize, lib.cellSide],
            [left, top - coverSize - 1, lib.cellSide, coverSize],
            [left + lib.cellSide + 1, top, coverSize, lib.cellSide],
            [left, top + lib.cellSide + 1, lib.cellSide, coverSize],
         ];
         for(var iCover = 0; iCover < coverParams.length; iCover++) {
            raphLibrary[itemID].push(paper.rect(
               coverParams[iCover][0], coverParams[iCover][1], coverParams[iCover][2], coverParams[iCover][3]
            ).attr({
               fill: "white",
               stroke: "none"
            }));
         }
      }
   }

   function onDragMove(dx, dy, x, y, event) {
      if(event.pageX === undefined) {
         event.pageX = x;
         event.pageY = y;
      }
      dragCurPos = getPaperMouse(event);
      for(var iElement = 0; iElement < dragRaph.length; iElement++) {
         dragRaph[iElement].transform(
            ["t", dx, dy] + dragRaph[iElement].data("oldTransform")
         );
      }

      updateShadow(dragCurPos);
   }

   function updateShadow(dragCurPos) {
      if(!raphWorkGrid.isPaperPosOnGrid(dragCurPos)) {
         for(var iElement = 0; iElement < dragRaphShadow.length; iElement++) {
            dragRaphShadow[iElement].hide();
         }
         return;
      }

      var pos = getBestSnap(dragItemID, dragCurPos.left, dragCurPos.top);

      for(var iElement = 0; iElement < dragRaphShadow.length; iElement++) {
         dragRaphShadow[iElement].show();
         dragRaphShadow[iElement].transform(
            ["t", pos.x, pos.y] + dragRaphShadow[iElement].data("oldTransform")
         );
      }
   }

   function getBestSnap(itemID, x, y) {
      var bestShapePoint = {x: 0, y: 0, dist: Infinity};
      var bestGridPoint = {x: 0, y: 0, dist: Infinity};

      var gridLeft = raphWorkGrid.getLeftX();
      var gridTop = raphWorkGrid.getTopY();

      for(var iSnap = 0; iSnap < itemSnapPoints[itemID].length; iSnap++) {
         var itemSnap = itemSnapPoints[itemID][iSnap];

         // Snap to a shape.
         for(var jItem = 0; jItem < workGridSnaps.length; jItem++) {
            for(var jSnap = 0; jSnap < workGridSnaps[jItem].length; jSnap++) {
               var otherSnap = workGridSnaps[jItem][jSnap];

               // The new point is located such that if we place the item there,
               // then the location of the relative point itemSnap will match otherSnap.
               var newPoint = {
                  x: otherSnap.x - itemSnap.x,
                  y: otherSnap.y - itemSnap.y
               };

               // Only consider the new point if the item will be contained in the grid.
               if(newPoint.x - gridLeft < dragItemWidth / 2) {
                  continue;
               }
               if(newPoint.x - gridLeft > gridWidth - dragItemWidth / 2) {
                  continue;
               }
               if(newPoint.y - gridTop < dragItemHeight / 2) {
                  continue;
               }
               if(newPoint.y - gridTop > gridHeight - dragItemHeight / 2) {
                  continue;
               }

               // If the distance from the mouse to the new point is best so far, keep it.
               var dist = (x - newPoint.x) * (x - newPoint.x) + (y - newPoint.y) * (y - newPoint.y);
               if(dist < bestShapePoint.dist) {
                  bestShapePoint.dist = dist;
                  bestShapePoint.x = newPoint.x;
                  bestShapePoint.y = newPoint.y;
               }
            }
         }

         // We do the same thing for the closest grid point.
         var gridSnap = {
            x: gridLeft + Math.round((x + itemSnap.x - gridLeft) / data[level].grid.cellSide) * data[level].grid.cellSide,
            y: gridTop + Math.round((y + itemSnap.y - gridTop) / data[level].grid.cellSide) * data[level].grid.cellSide
         };

         // 0.01 is used to compensate for small errors in the width calculation.
         var gridMinX = gridLeft + Math.ceil((dragItemWidth / 2 + itemSnap.x) / data[level].grid.cellSide - 0.01) * data[level].grid.cellSide;
         var gridMaxX = gridLeft + Math.floor((gridWidth - dragItemWidth / 2 + itemSnap.x) / data[level].grid.cellSide + 0.01) * data[level].grid.cellSide;
         var gridMinY = gridTop + Math.ceil((dragItemHeight / 2 + itemSnap.y) / data[level].grid.cellSide - 0.01) * data[level].grid.cellSide;
         var gridMaxY = gridTop + Math.floor((gridHeight - dragItemHeight / 2 + itemSnap.y) / data[level].grid.cellSide + 0.01) * data[level].grid.cellSide;

         if(gridMinX > gridMaxX || gridMinY > gridMaxY) {
            continue;
         }

         gridSnap.x = Math.max(Math.min(gridSnap.x, gridMaxX), gridMinX);
         gridSnap.y = Math.max(Math.min(gridSnap.y, gridMaxY), gridMinY);

         var newPoint = {
            x: gridSnap.x - itemSnap.x,
            y: gridSnap.y - itemSnap.y
         };

         // Only consider the new point if the item will be contained in the grid.
         // Error of 1 is allowed to compensate for float precision.
         if(newPoint.x - gridLeft + 1 < dragItemWidth / 2) {
            continue;
         }
         if(newPoint.x - gridLeft - 1 > gridWidth - dragItemWidth / 2) {
            continue;
         }
         if(newPoint.y - gridTop + 1 < dragItemHeight / 2) {
            continue;
         }
         if(newPoint.y - gridTop - 1 > gridHeight - dragItemHeight / 2) {
            continue;
         }

         var dist = (x - newPoint.x) * (x - newPoint.x) + (y - newPoint.y) * (y - newPoint.y);
         if(dist < bestGridPoint.dist) {
            bestGridPoint.dist = dist;
            bestGridPoint.x = newPoint.x;
            bestGridPoint.y = newPoint.y;
         }
      }

      if(bestShapePoint.dist < shapeSnapPointThreshold * shapeSnapPointThreshold || bestShapePoint.dist < bestGridPoint.dist) {
         return bestShapePoint;
      }
      return bestGridPoint;
   }

   function onDragStart(itemID) {
      return function(x, y, event) {
         // Dirty IE6 workaround to get the pageX,pageY properties.
         // They appear to be missing from the original mouse event.
         if(event.pageX === undefined) {
            event.pageX = x;
            event.pageY = y;
         }

         dragStartPos = getPaperMouse(event);
         dragCurPos = getPaperMouse(event);
         dragItemID = itemID;
         var boundary = getItemBoundary(items[itemID]);
         dragItemWidth = boundary.maxX - boundary.minX;
         dragItemHeight = boundary.maxY - boundary.minY;
         dragRaph = drawItem(items[itemID], itemSnapPoints[itemID], dragStartPos.left, dragStartPos.top, 1);
         for(var iElement = 0; iElement < dragRaph.length; iElement++) {
            dragRaph[iElement].data("oldTransform", dragRaph[iElement].transform());
         }
         dragRaphShadow = drawItem(items[itemID], itemSnapPoints[itemID], 0, 0, 1, shapeAttr.dragShadow);
         for(var iElement = 0; iElement < dragRaph.length; iElement++) {
            dragRaphShadow[iElement].data("oldTransform", dragRaphShadow[iElement].transform());
            dragRaphShadow[iElement].hide();
         }

         unhighlightError();
      }
   }

   function onDragEnd() {
      for(var iElement = 0; iElement < dragRaph.length; iElement++) {
         dragRaph[iElement].remove();
      }
      for(var iElement = 0; iElement < dragRaphShadow.length; iElement++) {
         dragRaphShadow[iElement].remove();
      }
      dragRaph = [];
      dragRaphShadow = [];

      if(!dragCurPos) {
         return;
      }

      if (answer.length > 20) {
         displayError(taskStrings.moveLimit);
         return;
      }
      // If shape is dragged on library, show an error.
      // But don't show for clicks (small drags).
      if(isPaperPosOnLibrary(dragCurPos) && Beav.Geometry.distance(dragStartPos.left, dragStartPos.top, dragCurPos.left, dragCurPos.top) > dragLibErrorThreshold) {
         displayError(taskStrings.dragOnGridError);
         return;
      }

      if(!raphWorkGrid.isPaperPosOnGrid(dragCurPos)) {
         return;
      }

      var pos = getBestSnap(dragItemID, dragCurPos.left, dragCurPos.top);

      if(pos.dist == Infinity) {
         return;
      }

      if(needAddHint()) {
         displayHelper.showPopupMessage(taskStrings.addToLibHint, "blanket");
         return;
      }

      var raphItem = drawItem(items[dragItemID], itemSnapPoints[dragItemID], pos.x, pos.y, 1);
      raphWorkContents.push(raphItem);

      var action = {
         type: "placeOnGrid",
         params: {
            itemID: dragItemID,
            x: pos.x,
            y: pos.y
         }
      }
      answer.push(action);
      performAction(action);

      updateAddClearState();
      updateUndoButtonState();
      updateCounter();
   }

   function getPaperMouse(event) {
      var offset = $(paper.canvas).offset();
      var scale = displayHelper.scaleFactor || 1;
      return {
         left: (event.pageX - offset.left) / scale,
         top: (event.pageY - offset.top) / scale
      };
   };

   function isPaperPosOnLibrary(pos) {
      return pos.left >= paperDat.libPos[0] &&
             pos.left <= paperDat.libPos[0] + libW &&
             pos.top >= paperDat.libPos[1] &&
             pos.top <= paperDat.libPos[1] + libH;
   }

   function needAddHint() {
      return (data[level].hasHint && !shapeWasAddedToLibrary && workGrid.length == 2 && basicVersionWasSolved);
   }

   function centerizeItem(item, snapPoints) {
      var boundary = getItemBoundary(item);
      var centerX = (boundary.minX + boundary.maxX) / 2;
      var centerY = (boundary.minY + boundary.maxY) / 2;
      for(var iElement = 0; iElement < item.length; iElement++) {
         item[iElement].x -= centerX;
         item[iElement].y -= centerY;
      }
      for(var iSnap = 0; iSnap < snapPoints.length; iSnap++) {
         snapPoints[iSnap].x -= centerX;
         snapPoints[iSnap].y -= centerY;
      }
   }

   function getItemBoundary(item) {
      var boundary = {
         minX: Infinity,
         maxX: -Infinity,
         minY: Infinity,
         maxY: -Infinity
      };
      for(var iShape = 0; iShape < item.length; iShape++) {
         var info = item[iShape];
         var shapeBoundary = getShapeBoundary(info.shapeName, info.x, info.y, info.angle);
         boundary.minX = Math.min(boundary.minX, shapeBoundary.minX);
         boundary.maxX = Math.max(boundary.maxX, shapeBoundary.maxX);
         boundary.minY = Math.min(boundary.minY, shapeBoundary.minY);
         boundary.maxY = Math.max(boundary.maxY, shapeBoundary.maxY);
      }
      return boundary;
   }

   function getShapeBoundary(shapeName, x, y, angle) {
      if(shapeName == "circle") {
         return {
            minX: x - data[level].baseShapes.circle.radius,
            maxX: x + data[level].baseShapes.circle.radius,
            minY: y - data[level].baseShapes.circle.radius,
            maxY: y + data[level].baseShapes.circle.radius,
         };
      }
      else if(shapeName == "triangle") {
         return getPointsBoundary([
            [-data[level].baseShapes.triangle.baseSize / 2, 0],
            [data[level].baseShapes.triangle.baseSize / 2, 0],
            [0, -data[level].baseShapes.triangle.height]
         ], x, y, angle);
      }
      else if(shapeName == "square") {
         return getPointsBoundary([
            [-data[level].baseShapes.square.side / 2, -data[level].baseShapes.square.side / 2],
            [data[level].baseShapes.square.side / 2, -data[level].baseShapes.square.side / 2],
            [-data[level].baseShapes.square.side / 2, data[level].baseShapes.square.side / 2],
            [data[level].baseShapes.square.side / 2, data[level].baseShapes.square.side / 2],
         ], x, y, angle);
      }
      else {
         throw "Unknown shape: " + shapeName;
      }
   }

   function getPointsBoundary(points, x, y, angle) {
      // Each point is rotated around (x, y).
      var boundary = {
         minX: Infinity,
         maxX: -Infinity,
         minY: Infinity,
         maxY: -Infinity
      };

      for (var iPoint = 0; iPoint < points.length; iPoint++) {
         var newPoint = getRaphaelPolarRotation(points[iPoint][0], points[iPoint][1], angle);
         boundary.minX = Math.min(boundary.minX, x + newPoint.x);
         boundary.maxX = Math.max(boundary.maxX, x + newPoint.x);
         boundary.minY = Math.min(boundary.minY, y + newPoint.y);
         boundary.maxY = Math.max(boundary.maxY, y + newPoint.y);
      }
      return boundary;
   }

   function getRaphaelPolarRotation(x, y, angle) {
      // In Raphael, y axis goes down and ortation is clockwise.
      // In the math we use for getPolarRotation, it's the opposite.
      // Therefore we use it "mirrored", i.e. negated y and angle.
      var point = getPolarRotation(x, -y, -angle);
      point.y = -point.y;
      return point;
   }

   function getPolarRotation(x, y, angle) {
      // Rotate (x, y) angle degrees around the origin. Return [newx, newy].
      var radius = Math.sqrt(x * x + y * y);
      var oldPolar = Math.atan2(y, x);
      var newPolar = oldPolar + angle * Math.PI / 180;
      return {
         x: radius * Math.cos(newPolar),
         y: radius * Math.sin(newPolar)
      };
   }

   function drawItem(item, snapPoints, x, y, scale, extraAttr) {
      var raphItem = [];
      for(var iShape = 0; iShape < item.length; iShape++) {
         var info = item[iShape];
         raphItem.push(drawBaseShape(
            info.shapeName,
            x + info.x * scale,
            y + info.y * scale,
            info.angle,
            scale,
            extraAttr
         ));
      }
      if(debugSnap) {
         for(iSnap = 0; iSnap < snapPoints.length; iSnap++) {
            var point = snapPoints[iSnap];
            raphItem.push(paper.circle(
               x + point.x * scale,
               y + point.y * scale,
               3 * scale
            ).attr({fill: "red", opacity: 0.5}));
         }
      }

      return raphItem;
   }

   function drawBaseShape(shapeName, x, y, angle, scale, extraAttr) {
      var shape;
      var params = data[level].baseShapes[shapeName];
      if(shapeName == "circle") {
         shape = paper.circle(x, y, params.radius);
      }
      else if(shapeName == "triangle") {
         var base = params.baseSize;
         shape = paper.path([
            "M", x - base / 2, y,
            "L", x + base / 2, y,
            "L", x, y - params.height,
            "Z"
         ]);
      }
      else if(shapeName == "square") {
         shape = paper.rect(
            x - params.side / 2,
            y - params.side / 2,
            params.side,
            params.side);
      }
      else {
         throw "Unknown base shape: " + shapeName;
      }

      shape.transform(
         ["s", scale, scale, x, y,
          "r", angle, x, y]
      );
      shape.attr(shapeAttr[shapeName]);
      if(extraAttr) {
         shape.attr(extraAttr[shapeName]);
      }
      return shape;
   }

   function drawGrids() {
      // var gridParams = data[level].grid;
      raphWorkGrid = new Grid("paper", paper, gridParams.rows, gridParams.cols, gridParams.cellSide, gridParams.cellSide, data[level].paper.gridPos.work[0], data[level].paper.gridPos.work[1], gridLineAttr);

      raphWorkContents = [];
      // gridWidth = gridParams.cols * gridParams.cellSide;
      // gridHeight = gridParams.rows * gridParams.cellSide;

      // Target.
      raphTargetGrid = new Grid(
         "paper",
         paper,
         gridParams.rows,
         gridParams.cols,
         gridParams.cellSide * data[level].paper.targetScale,
         gridParams.cellSide * data[level].paper.targetScale,
         data[level].paper.gridPos.target[0],
         data[level].paper.gridPos.target[1],
         gridLineAttr
      );

      // Target title.
      paper.text(
         data[level].paper.gridPos.target[0] + data[level].grid.targetTextOffset[0],
         data[level].paper.gridPos.target[1] + data[level].grid.targetTextOffset[1],
         taskStrings.targetTitle
      ).attr(targetTitleAttr);
   }

   function drawUserItems() {
      for(var iItem = 0; iItem < workGrid.length; iItem++) {
         raphWorkContents.push(drawItem(workGrid[iItem], [], 0, 0, 1));
      }
   }

   function drawAddButton() {
      if(!data[level].hasAdd) {
         return;
      }
      var x = (raphWorkGrid.getLeftX() + raphWorkGrid.getRightX()) / 2 - addButtonParams.width / 2;
      var y = raphWorkGrid.getTopY() - addButtonParams.yOffset - addButtonParams.height;
      addButton = {};
      addButton.rect = paper.rect(x, y, addButtonParams.width, addButtonParams.height);
      addButton.text = paper.text(x + addButtonParams.width / 2, y + addButtonParams.height / 2, taskStrings.addToLibrary);
      addButton.overlay = paper.rect(x, y, addButtonParams.width, addButtonParams.height).attr({fill: "red", opacity: 0});
   }

   function drawClearButton() {
      if(!data[level].hasClear) {
         return;
      }
      var x = (raphWorkGrid.getLeftX() + raphWorkGrid.getRightX()) / 2 - clearButtonParams.width / 2;
      var y = raphWorkGrid.getBottomY() + clearButtonParams.yOffset;
      clearButton = {};
      clearButton.rect = paper.rect(x, y, clearButtonParams.width, clearButtonParams.height);
      clearButton.text = paper.text(x + clearButtonParams.width / 2, y + clearButtonParams.height / 2, taskStrings.clearGrid);
      clearButton.overlay = paper.rect(x, y, clearButtonParams.width, clearButtonParams.height).attr({fill: "red", opacity: 0});
   }

   function updateAddClearState() {
      var itemsOnGrid = workGrid.length;

      if (data[level].hasClear) {
         // Enable clear.
         if(itemsOnGrid > 0) {
            clearButton.overlay.unclick();
            clearButton.overlay.click(clickClear);
            clearButton.rect.attr(clearButtonParams.enabledAttr.rect);
            clearButton.text.attr(clearButtonParams.enabledAttr.text);
         }
         // Disable clear.
         else {
            clearButton.overlay.unclick();
            clearButton.rect.attr(clearButtonParams.disabledAttr.rect);
            clearButton.text.attr(clearButtonParams.disabledAttr.text);
         }
      }

      // Enable add.
      if(data[level].hasAdd) {
         if(itemsOnGrid > 0 && items.length < data[level].lib.rows * data[level].lib.cols) {
            addButton.overlay.unclick();
            addButton.overlay.click(clickAdd);
            addButton.rect.attr(addButtonParams.enabledAttr.rect);
            addButton.text.attr(addButtonParams.enabledAttr.text);

         }
         // Disable add.
         else {
            addButton.overlay.unclick();
            addButton.rect.attr(addButtonParams.disabledAttr.rect);
            addButton.text.attr(addButtonParams.disabledAttr.text);
         }
      }
   }

   function drawTargetShape() {
      drawItem(
         data[level].target,
         getItemSnapPoints(data[level].target, 0, 0),
         data[level].paper.gridPos.work[0],
         data[level].paper.gridPos.work[1],
         1,
         shapeAttr.targetShadowAttr
      );

      drawItem(
         data[level].target,
         [],
         data[level].paper.gridPos.target[0],
         data[level].paper.gridPos.target[1],
         data[level].paper.targetScale,
         shapeAttr.targetAttr
      );
   }

   function clickAdd() {
      if(workGrid.length == 0) {
         return;
      }

      var action = {type: "addToLibrary"};
      performAction(action);
      answer.push(action);
      raphLibrary.push([]);
      drawLibraryItem(items.length - 1);

      if(addAlsoClears) {
         undrawGridContents();
      }
      updateAddClearState();
      updateUndoButtonState();
      unhighlightError();
   }

   function clickClear() {
      if(workGrid.length == 0) {
         return;
      }
      var action = {type: "clearGrid"};
      performAction(action);
      answer.push(action);
      undrawGridContents();
      updateAddClearState();
      updateUndoButtonState();
      unhighlightError();
   }

   function undrawGridContents() {
      for(var iItem = 0; iItem < raphWorkContents.length; iItem++) {
         var raphItem = raphWorkContents[iItem];
         for(var iElement = 0; iElement < raphItem.length; iElement++) {
            raphItem[iElement].remove();
         }
      }
   }

   function drawRotateButtons() {
      if(!data[level].hasRotation) {
         return;
      }
      var xCenter, yCenter, xDiff, yDiff;
      var lib = data[level].lib;
      if(lib.buttonsPos == "left") {
         xCenter = data[level].paper.libPos[0];
         yCenter = data[level].paper.libPos[1] + lib.padding + lib.rows / 2 * lib.cellSide + (lib.rows - 1) / 2 * lib.cellSpacing;
         xDiff = 0;
         yDiff = lib.buttonsDist;
      }
      else if(lib.buttonsPos == "top") {
         xCenter = data[level].paper.libPos[0] + lib.padding + lib.cols / 2 * lib.cellSide + (lib.cols - 1) / 2 * lib.cellSpacing;
         yCenter = data[level].paper.libPos[1];
         xDiff = lib.buttonsDist;
         yDiff = 0;
      }
      else {
         throw "Unknown button position: " + lib.buttonsPos;
      }

      var src = $("#rotateIcon").attr("src");

      var buttonInfos = [
         {angle: 45, sign: -1},
         {angle: 315, sign: 1}
      ];
      for(var iInfo = 0; iInfo < buttonInfos.length; iInfo++) {
         var info = buttonInfos[iInfo];
         var x = xCenter + info.sign * xDiff / 2 + lib.rotateOffset[0];
         var y = yCenter + info.sign * yDiff / 2 + lib.rotateOffset[1];
         paper.circle(x, y, rotateButtonParams.radius).attr(rotateButtonParams.attr.circle);
         var image = paper.image(src, x - rotateButtonParams.imageWidth / 2, y - rotateButtonParams.imageHeight / 2, rotateButtonParams.imageWidth, rotateButtonParams.imageHeight);
         image.transform(["s", info.sign, 1]);
         paper.circle(x, y, rotateButtonParams.radius).attr({fill: "red", opacity: 0}).click(clickRotate(info.angle));
      }
   }

   function clickRotate(angle) {
      return function() {
         var action = {
            type: "rotateLibrary",
            params: {angle: angle}
         };

         performAction(action);
         redrawLibraryItems();

         answer.push(action);

         // Consecutive rotations are merged.
         if(answer.length >= 2) {
            var lastAction = answer[answer.length - 2];
            if(lastAction.type == "rotateLibrary") {
               answer.pop();
               lastAction.params.angle += action.params.angle;
               if(lastAction.params.angle % 360 == 0) {
                  answer.pop();
               }
            }
         }

         updateUndoButtonState();
         unhighlightError();
      }
   }

   function drawUndoButton() {
      var x = data[level].undo.centerX - undoButtonParams.width / 2;
      var y = data[level].undo.centerY - undoButtonParams.height / 2;
      undoButton = {};
      undoButton.rect = paper.rect(x, y, undoButtonParams.width, undoButtonParams.height);
      undoButton.text = paper.text(data[level].undo.centerX, data[level].undo.centerY, taskStrings.undo);
      undoButton.overlay = paper.rect(x, y, undoButtonParams.width, undoButtonParams.height);
      undoButton.overlay.attr({fill: "red", opacity: 0});

      updateUndoButtonState();
   }

   function updateUndoButtonState() {
      if(answer && answer.length > 0) {
         undoButton.rect.attr(undoButtonParams.enabledAttr.rect);
         undoButton.text.attr(undoButtonParams.enabledAttr.text);
         undoButton.overlay.unclick();
         undoButton.overlay.click(clickUndo);
      }
      else {
         undoButton.rect.attr(undoButtonParams.disabledAttr.rect);
         undoButton.text.attr(undoButtonParams.disabledAttr.text);
         undoButton.overlay.unclick();
      }
   }

   function clickUndo() {
      unhighlightError();
      if(!answer || answer.length == 0) {
         return;
      }
      var action = answer.pop();
      if(action.type == "rotateLibrary") {
         performAction({
            type: "rotateLibrary",
            params: {angle: -action.params.angle}
         });
         redrawLibraryItems();
      }
      else if(action.type == "placeOnGrid") {
         popGrid();
      }
      else if(action.type == "addToLibrary") {
         undoAdd();
      }
      else if(action.type == "clearGrid") {
         undoClear();
      }
      else {
         throw "Unknown action: " + action.type;
      }

      updateAddClearState();
      updateUndoButtonState();
      updateCounter();
   }

   function updateButtonSize() {
      var set = paper.set(undoButton.rect,undoButton.text,undoButton.overlay);
      if(data[level].hasClear){
         set.push(clearButton.rect,clearButton.text,clearButton.overlay);
      }
      if(data[level].hasAdd){
         set.push(addButton.rect,addButton.text,addButton.overlay);
      }
      if(displayHelper.scaleFactor > maxButtonScale){
         set.scale(maxButtonScale/displayHelper.scaleFactor);
      }
   };

   function popGrid() {
      workGrid.pop();
      workGridSnaps.pop();
      var raphItem = raphWorkContents.pop();
      for(var iElement = 0; iElement < raphItem.length; iElement++) {
         raphItem[iElement].remove();
      }
   }

   function undoAdd() {
      items.pop();
      itemSnapPoints.pop();
      popVisualLibrary();

      if(addAlsoClears) {
         undoClear();
      }
   }

   function undoClear() {
      // Find the last time the user cleared the library.
      // Rotate the items to what they were then.
      // Then redo placeOnGrid and rotateLibrary actions.
      var actions = [];
      var angle = 0;
      for(var iAnswer = answer.length - 1; iAnswer >= 0; iAnswer--) {
         var action = answer[iAnswer];
         if(action.type == "clearGrid") {
            break;
         }
         else if(action.type == "rotateLibrary") {
            angle += action.params.angle;
            angle = (angle % 360 + 360) % 360;
            actions.push(action);
         }
         else if(action.type == "placeOnGrid") {
            actions.push(action);
         }
         else if(action.type == "addToLibrary") {
            if(addAlsoClears) {
               break;
            }
            // We don't need to redo this action.
         }
         else {
            throw "Unknown action: " + action.type;
         }
      }

      rotateLibrary(-angle);

      for(var iAction = actions.length - 1; iAction >= 0; iAction--) {
         var action = actions[iAction];

         performAction(action);

         // Draw item.
         if(action.type == "placeOnGrid") {
            var raphItem = drawItem(items[action.params.itemID], itemSnapPoints[action.params.itemID], action.params.x, action.params.y, 1);
            raphWorkContents.push(raphItem);
         }
      }
   }

   function drawCounter() {
      var x = data[level].paper.counterPos[0];
      var y = data[level].paper.counterPos[1];
      raphCounter = paper.text(x, y, "0");
      raphCounter.attr(counterParams.number);
      updateCounter();

      paper.text(
         x + data[level].paper.counterTextOffset[0],
         y + data[level].paper.counterTextOffset[1],
         taskStrings.placedShapes).attr(counterParams.words);

      paper.text(
         x + data[level].paper.counterTargetOffset[0],
         y + data[level].paper.counterTargetOffset[1],
         taskStrings.targetSteps(data[level].optimal)).attr(counterParams.words);
   }

   function updateCounter() {
      raphCounter.attr("text", getPlaceCount());
   }

   function getPlaceCount() {
      var count = 0;
      for(var iAction = 0; iAction < answer.length; iAction++) {
         if(answer[iAction].type == "placeOnGrid") {
            count++;
         }
      }
      return count;
   }

   function highlightError(shapeInfo, gridID) {
      unhighlightError();
      var scale;
      if(gridID == "work") {
         scale = 1;
      }
      else {
         scale = data[level].paper.targetScale;
      }

      var item = [{
         shapeName: shapeInfo.shapeName,
         x: shapeInfo.x,
         y: shapeInfo.y,
         angle: shapeInfo.angle
      }];

      raphError = drawItem(
         item,
         [],
         data[level].paper.gridPos[gridID][0],
         data[level].paper.gridPos[gridID][1],
         scale,
         shapeAttr.errorAttr
      );
   };

   function unhighlightError() {
      if(raphError) {
         for(var iElement = 0; iElement < raphError.length; iElement++) {
            raphError[iElement].remove();
         }
      }
      raphError = [];
      displayError("");
   };

   function itemHasShape(item, shapeInfo) {
      for(var iShape = 0; iShape < item.length; iShape++) {
         var otherInfo = item[iShape];
         if(eqShapeInfo(shapeInfo, otherInfo)) {
            return true;
         }
      }
      return false;
   }

   function eqShapeInfo(info1, info2) {
      if(info1.shapeName !== info2.shapeName) {
         return false;
      }
      if(!eqEpsilon(info1.x, info2.x) || !eqEpsilon(info1.y, info2.y)) {
         return false;
      }

      // Circles don't care about angles.
      if(info1.shapeName == "circle") {
         return true;
      }

      // Squares care only about 90 degrees.
      else if(info1.shapeName == "square") {
         return eqAngle(info1.angle, info2.angle, 90);
      }

      else if(info1.shapeName == "triangle") {
         return eqAngle(info1.angle, info2.angle, 360);
      }

      else {
         throw "Unknown shape: " + info1.shapeName;
      }
   }

   function eqAngle(angle1, angle2, mod) {
      return eqEpsilon((angle1 % mod + mod) % mod, (angle2 % mod + mod) % mod);
   }

   function eqEpsilon(x, y) {
      return Math.abs(x - y) < epsilon;
   }

   function getTidyUserItem() {
      // Get the shapes made by the user on the target grid,
      // discard any shape that is completely covered by another, identical shape.
      var item = [];

      // Go backwards, insert shapes only if they don't exist yet.
      for(var iSub = workGrid.length - 1; iSub >= 0; iSub--) {
         var subItem = workGrid[iSub];
         for(var iShape = subItem.length - 1; iShape >= 0; iShape--) {
            var info = {
               shapeName: subItem[iShape].shapeName,
               x: subItem[iShape].x - data[level].paper.gridPos.work[0],
               y: subItem[iShape].y - data[level].paper.gridPos.work[1],
               angle: subItem[iShape].angle
            };

            if(!itemHasShape(item, info)) {
               item.push(info);
            }
         }
      }

      // The item is now tidy and reversed.
      item.reverse();
      return item;
   }

   function getMissingShape(item1, item2) {
      // Get shape that appears in item1 but not in item2.
      // Return null if none exist.
      for(var iShape = 0; iShape < item1.length; iShape++) {
         if(!itemHasShape(item2, item1[iShape])) {
            return item1[iShape];
         }
      }
      return null;
   }

   function getBadZOrder(tidyItem) {
      var shapes = [];
      for(var iShape = 0; iShape < tidyItem.length; iShape++) {
         for(var jShape = 0; jShape < data[level].target.length; jShape++) {
            if(eqShapeInfo(data[level].target[jShape], tidyItem[iShape])) {
               shapes.push(data[level].target[jShape]);
               break;
            }
         }
      }

      var zConstraints = {};

      for(var iShape = 0; iShape < data[level].target.length; iShape++) {
         var info = shapes[iShape];
         if(!info.zorder) {
            continue;
         }
         for(var constraint in info.zorder) {
            var newValue = info.zorder[constraint];
            var existing = zConstraints[constraint];
            if(existing !== null && existing > newValue) {
               return info;
            }
            zConstraints[constraint] = newValue;
         }
      }
      return null;
   }

   function checkResult(noVisual) {
      var tidyUserItem = getTidyUserItem();

      var missingShape = getMissingShape(data[level].target, tidyUserItem);
      if(missingShape !== null) {
         if(!noVisual) {
            highlightError(missingShape, "target");
            displayError(taskStrings.missingError);
         }
         return {
            successRate: 0,
            message: taskStrings.missingError
         };
      }

      var extraShape = getMissingShape(tidyUserItem, data[level].target);
      if(extraShape !== null) {
         if(!noVisual) {
            highlightError(extraShape, "work");
            displayError(taskStrings.extraError);
         }
         return {
            successRate: 0,
            message: taskStrings.extraError
         };
      }

      var badOrderShape = getBadZOrder(tidyUserItem);
      if(badOrderShape !== null) {
         if(!noVisual) {
            highlightError(badOrderShape, "work");
            displayError(taskStrings.badOrderShape);
         }
         return {
            successRate: 0,
            message: taskStrings.badOrderShape
         };
      }

      var nbExtraMoves = getPlaceCount() - data[level].optimal;
      if(nbExtraMoves > 0) {
         if(!noVisual) {
			if (data[level].hasHint) {
				basicVersionWasSolved = true;
			}
            unhighlightError();
            platform.validate("done");
         }
         var successRate = 0;
         if (data[level].gradingScheme == "basic") {
            successRate = 0.5;
         } else if (data[level].gradingScheme == "hard") {
			 if (nbExtraMoves == 3) {
				 successRate = 0.1;
			 } else if (nbExtraMoves < 3) {
				 successRate = 0.5;
			 }
		 } else if (data[level].gradingScheme == "medium") {
			 if (nbExtraMoves <= 4) {
				 successRate = 0.1;
			 }
			 if (nbExtraMoves <= 2) {
				 successRate = 0.3;
			 }
			 if (nbExtraMoves == 1) {
				 successRate = 0.5;
			 }
		 }
         return {
            successRate: successRate,
            message: taskStrings.suboptimal(level)
         };
      }

      if(!noVisual){
         platform.validate("done");
      }

      return {
         successRate: 1,
         message: taskStrings.success
      };
   }

   function displayError(msg) {
      if(respEnabled){
         displayHelper.displayError(msg);
      }else{
         $("#error").html(msg);
      }
      // $("#displayHelper_graderMessage").html(msg);
   };

   subTask.getGrade = function(callback) {
      callback(checkResult(true));
   };
}
if (typeof(threeVersions) == "undefined") {
   initialLevel = "basic";
   initWrapper(initTask, ["basic", "easy", "medium", "hard"]);
} else {
   initWrapper(initTask, ["easy", "medium", "hard"]);
}
displayHelper.useFullWidth();
