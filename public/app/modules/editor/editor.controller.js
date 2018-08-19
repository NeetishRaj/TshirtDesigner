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

      /*
       * Toggles the display of designated modal box using ng-show
       * @public
       * @param {String} type of  modal div element that needs to be displayed
       * @return {Null}
       */
      this.toggleDisplayModal = function(modalType){
        if(modalType === "imageUploadModal"){
          this.showImageUploadModal = !this.showImageUploadModal;
        } else if (modalType === "textInputModal") {
          this.showTextInputModal = !this.showTextInputModal;
        } else if (modalType === "imageDownloadModal") {
          this.showImageDownloadModal = !this.showImageDownloadModal;
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

        // Add the new image object to our fabricObjArray
        self.fabricObjArray.push(newImageInstance);
        editor.add(newImageInstance);
      }

      /*
      * create the canvas and initialize the fabric editor
      *
      */
      var parentElement = $window.document.querySelector(".canvasPanel");
      console.log(parentElement);
      this.canvasId = "canvasFabric";
      this.canvas = util.createCanvas(parentElement, self.canvasId);
      this.fabricObjArray = [];

      // Initialize the fanric.js instance with the canvas
      this.editor = new fabric.Canvas(self.canvasId);


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
