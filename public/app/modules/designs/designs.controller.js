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
  function(data){

    var self = this;
    this.myEditsArray = [];

    this.load = function(){
      data.getDesignList().then(
        function(listData){
          console.log(listData);
          self.myEditsArray = listData[0];
        }
      );

      console.log('HI');
    }
  }
])
