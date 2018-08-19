/* eslint-disable*/

/*
* controller for the editor.
* @alias: "editor"
* Note that wrapping dependencies and controller function in "[]" helps to
* preserve the code during minification
*/
angular.module("designEditorApp").
  controller("editorController", [
    "$window",
    "util",
    function($window, util){

      var self = this;

      /*
      * Boolean variables to show their corresponding modal divs bu using
      * ng-show directive
      */
      this.showImageUploadModal = false;
      this.showTextInputModal = false;
      this.showImageDownloadModal = false;
      this.showEditHistoryModal = false;

      /*
       * Toggles the display of designated modal box using ng-show
       * @public
       * @param {String} type of  modal div element that needs to be displayed
       * @return {Null}
       */
      this.toggleDisplayModal = function(modalType){
        if(modalType === "imageUploadModal"){
          self.showImageUploadModal = !self.showImageUploadModal;
        } else if (modalType === "textInputModal") {
          self.showTextInputModal = !self.showTextInputModal;
        } else if (modalType === "imageDownloadModal") {
          self.showImageDownloadModal = !self.showImageDownloadModal;
        } else if (modalType === "editHistoryModal") {
          self.showEditHistoryModal = !self.showEditHistoryModal;
        }
      }

      /*
      * Consists of image data urls for all the uploaded images which can be
      * used to construct img elements
      */
      this.imageDataList = new $window.Array();

      /*
       * Toggles the display of designated modal box using ng-show
       * @public
       * @param {String} type of  modal div element that needs to be displayed
       * @return {Null}
       */
      this.uploadImages = function(){
        var reader = new $window.FileReader();

        reader.onload = function(){
          // This dataURL can be used as src value for emg elements
          var dataURL = reader.result;
          self.imageDataList.push(dataURL);
        };
        var input = $window.document.querySelector('input[type="file"]');

        reader.readAsDataURL(input.files[0]);
      }


      this.addImage = function($event){
        var imgElement = $event.currentTarget;
        var newImageInstance = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          angle: 0,
          opacity: 1.0
        });

        // Add the dblclick event listener to delete this from editor

        newImageInstance.on("mousedown", function(options){
          //
        });

        self.fabricCanvas.add(newImageInstance);
        // Add the new image object to our fabricObjArray
        self.fabricObjArray.push(newImageInstance);
      }

      /*
      * create the canvas and initialize the fabric editor
      *
      */

      this.canvasId = "canvasFabric";
      this.fabricObjArray = [];
      this.fabricCanvas = {};


      /*
       * The initial function that is called after loading of DOM
       * it creates and initializes our fabric canvas
       * @return {Null}
       */
      this.load = function(){
        var parentElement = $window.document.querySelector(".canvasPanel");
        util.createCanvas(parentElement, self.canvasId);

        // Initialize the fanric.js instance with the canvas
        self.fabricCanvas = new fabric.Canvas(self.canvasId);


        /*
        * Set eventlisteners to track user actions after each render
        * and save the state for redo operations.
        * NOTE; we will save state based on 3 events
        * object added, object removed and object modified
        */
        self.fabricCanvas.on({
          "object:added": self.updateActionList,
          "object:removed": self.updateActionList,
          "object:modified": self.updateActionList
        });
      }


      /*
      * This function on the call of three events push the current
      * fabric state to the array in order to be retrieved later
      */
      this.updateActionList = function(){

        if(self.undoRedoFlag){
          self.undoRedoFlag = false;
          return false;
        }
        // There is no objects in the canvas then clear the array
        self.actionsArray.push(angular.toJson(self.fabricCanvas));
        self.currentActionIndex = self.actionsArray.length - 1;
        console.log("updated");
      }

      this.currentActionIndex = 0;
      this.undoRedoFlag = false;
      /*
      * Undo function reverts the editor to last edit state by going back
      * the actions array and by keeping track of currentActionIndex
      */
      this.undo = function(){

        if(self.currentActionIndex > 0){
          self.currentActionIndex -= 1;
        }

        self.undoRedoFlag = true;
        console.log(self.currentActionIndex);
        /*
        * In order to to undo we must load old json states that had been pushed
        * on each modifications
        */
        self.loadFabricOnJSON(self.actionsArray[self.currentActionIndex]);
      }


      /*
      * Redo function reverts the editor to next edit state by going
      * one step the actions array and by keeping track of currentActionIndex
      */
      this.redo = function(){

        if(self.currentActionIndex < this.actionsArray.length -1 ){
          self.currentActionIndex += 1;
        }
        console.log(self.currentActionIndex);
        self.undoRedoFlag = true;

        /*
        * In order to to redo we must load old json states that had been pushed
        * on each modifications
        */
        self.loadFabricOnJSON(self.actionsArray[self.currentActionIndex]);

      }

      this.goToEditHistory = function($index){
        self.undoRedoFlag = true;
        self.loadFabricOnJSON(self.actionsArray[$index]);
      }

      this.loadFabricOnJSON = function(jsonArg){
        self.fabricCanvas.loadFromJSON(
          jsonArg,
          function(){
            self.fabricCanvas.renderAll();
            self.fabricCanvas.calcOffset();
          },
          function(o, object){
            self.fabricCanvas.setActiveObject(object);
          }
        );
      }


      /*
       * This takes text from the input box and creates a fabric instance
       * of that text
       * @param {String} the string id of the textarea element
       * @return {Null}
       */
      this.addText = function(textAreaId){
        var text = $window.document.getElementById(textAreaId).value;

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
          self.fabricObjArray.push(newFabricText);
          self.fabricCanvas.add(newFabricText);

        } else {
          $window.alert("Please enter text before Submitting")
        }
      }

      /*
       * It removes the current selected object after the button press
       * @return {Null}
       */
      this.removeObject = function(){
        /*
        * Find the index of the object to be deleted and delete it from
        *  our array fabricObjArray
        */
        var fabCan = self.fabricCanvas;
        var index = self.fabricObjArray.indexOf(fabCan.getActiveObject());

        // Clear the object from our array
        self.fabricObjArray.splice(index, 1);

        // Clear the object from fabric's collection
        fabCan.remove(fabCan.getActiveObject());
      };


      /*
       * Moves the selected object one layer up
       * @return {Null}
       */
      this.layerUp = function(){
        self.fabricCanvas.bringForward(self.fabricCanvas.getActiveObject());
      };

      /*
       * Moves the selected object one layer down
       * @return {Null}
       */
      this.layerDown = function(){
        self.fabricCanvas.sendBackwards(self.fabricCanvas.getActiveObject());
      };


      /*
       * Fetches the image data url from the Fabric.js canvas and downloads it
       * as a "image/png" format
       * @public
       * @param {String} Id of the input element that holds the image name
       * @return {Null}
       */
      this.downloadImage = function(inputId){
        var download = $window.document.getElementById("download");
        var imageName = $window.document.getElementById(inputId).value;
        var image = $window.document.
        getElementById(self.canvasId).
        toDataURL("image/png").
        replace("image/pngremoveObject", "image/octet-stream");

        // Set the image name for the downloaded image

        /*
        * @TODO Fix the download image button bug
        * It downloads the image after the second press of the button
        */
        if(imageName === "" || typeof imageName === "undefined"){
          imageName = "MyTshirtDesign.png"
        }

        // Downloads the image
        download.setAttribute("href", image);
        download.setAttribute("download", imageName);
      }


      this.actionsArray = [];

      /*
       * It reonoves all the objects from the fabric canvas
       * @return {Null}
       */
      this.clearEditor = function(){

        // Warn the user
        $window.alert("Warning: Edit history will be deleted");

        // Clear our objects array fabricObjArray
        self.fabricObjArray = [];

        // Clear the actionsArray that provides edit history
        self.actionsArray = [];

        // Finally clear the fabric canvas with all the objects
        self.fabricCanvas.clear();
      };



    }
  ]);


  /*
  * A return-files directive to work with the images upload and catch the
  * ng-change event properly without throwing error
  */
  angular.module("designEditorApp").directive("returnFiles", function() {
    return {
      require: "ngModel",
      link: function postLink(scope,elem,attrs,ngModel) {
        elem.on("change", function(e) {
          var files = elem[0].files;
          ngModel.$setViewValue(files);
        })
      }
    }
  });
