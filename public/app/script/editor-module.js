/*eslint-disable*/

/* Image Editor module*/
var EditorModule = (function(){

  var canvas, editor;
  var canvasId = "canvasFabric";
  var fabricObjArray = [];
  var canvasWidth, canvasHeight;


  var createEditor = function(container){

    // Create a canvas element for editing
    canvas = document.createElement("CANVAS");
    canvas.setAttribute("id", canvasId);

    // Set canvas dimensions based on its current container element dimensions
    canvasWidth = UtilModule.getElemWidth(container);
    canvasHeight = UtilModule.getElemHeight(container);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    container.appendChild(canvas);

    // Initialize the fanric.js instance with the canvas
    editor = new fabric.Canvas(canvasId);

  }


  var addImage = function(imgElement){

    var newImageInstance = new fabric.Image(imgElement, {
      left: 100,
      top: 100,
      angle: 0,
      opacity: 1.0
    });

    // Add the dblclick event listener to delete this from editor

    newImageInstance.on("mousedown", function(options){
      //
    })

    // Add the new image object to our fabricObjArray
    fabricObjArray.push(newImageInstance);
    editor.add(newImageInstance);
  }


  var removeObject = function(){
    // Find the index of the object to be deleted and delete it from our array
    var index = fabricObjArray.indexOf(editor.getActiveObject());
    fabricObjArray.splice(index, 1);

    editor.remove(editor.getActiveObject());
  }

  var layerUp = function(){
    editor.bringForward(editor.getActiveObject());
  }

  var layerDown = function(    // Return Element Height minus padding and border
){
    editor.sendBackwards(editor.getActiveObject());
  }

  var addText = function(textAreaId){
    var text = document.getElementById((textAreaId)).value;


    if(text !== ""){
      var newFabricText = new fabric.Text(text, {
        shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        fontStyle: 'italic',
        fontFamily: 'Hoefler Text',
        stroke: '#3a3a5d',
        strokeWidth: 3,
        textAlign: 'right',
        lineHeight:1,
        textBackgroundColor: 'rgba(0,200,0,0)'
      });

      // Add the newly created text object to our fabricObjArray
      fabricObjArray.push(newFabricText);
      editor.add(newFabricText);

    } else {
      alert("Please enter text before Submitting")
    }
  }


  var getCurrentStateJson = function(){
    console.log(editor.toJSON());
  }


  var init = function(){

    var container = document.querySelector(".canvasPanel");

    // create the editor based on the container
    createEditor(container);



  }



  return {
    init: init,
    canvasId: canvasId,
    addImage: addImage,
    removeObject: removeObject,
    layerUp: layerUp,
    layerDown: layerDown,
    addText: addText,
    getCurrentStateJson: getCurrentStateJson
  }

})()
