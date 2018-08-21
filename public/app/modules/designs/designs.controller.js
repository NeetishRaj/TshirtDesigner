/*eslint-disable*/

/*
* controller for the My designs view, which retrieves and shows all the Designs
* from the database
* @alias: "designs"
* Note that wrapping dependencies and controller function in "[]" helps to
* preserve the code during minification
*/
angular.module("designEditorApp").controller("designsController", [
  "data",
  "$window",
  function(data, $window, $state){

    var self = this;
    this.myEditsArray = [];

    this.load = function(){
      data.getDesignList().then(
        function(listData){
          /*
          * @TODO find out why there is double elemnts in data return
          * everytime
          */
          // console.log(listData);
          self.myEditsArray = listData[0];
        }
      );
    }

    this.goToEditor = function(index){
      data.designListBuffer = $window.JSON.parse(self.myEditsArray[index].edits);
    }
  }
])
