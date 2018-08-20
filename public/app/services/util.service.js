/*eslint-disable*/

/*
* util service
* This is a commonly used utility functions for the editor to work
* All the functions deal with operations on DOM
*/

// IIFE to create closure and avoid polluting global space
(function(){

  var designEditorApp = angular.module("designEditorApp");

  function utilFactory($window) {

    if(!$window){
      console.log("cant access window object in util service");
      return null;
    }

    $window.util = {};
    /*
     * A Utility function that returns the current width of any DOM element
     * by subtracting the padding and border from it
     * @public
     * @param {DOM Object} Any DOM element
     * @return {Float} Element width minus padding and border
     */

    $window.util.getElemWidth = function(element){
      if(typeof element === "undefined"){
        console.log("Invalid element for getElemWidth function")
        return false;
      }
      
      var cs = $window.getComputedStyle(element);
      var paddingX = $window.parseFloat(cs.paddingLeft) + $window.parseFloat(cs.paddingRight);
      var borderX = $window.parseFloat(cs.borderLeftWidth) + $window.parseFloat(cs.borderRightWidth);

      return element.offsetWidth - paddingX - borderX;
    }

    /*
     * A Utility function that returns the current height of any DOM element
     * by subtracting the padding and border from it
     * @public
     * @param {DOM Object} Any DOM element
     * @return {Float} Element height minus padding and border
     */
    $window.util.getElemHeight = function(element){
      if(typeof element === "undefined"){
        console.log("Invalid element for getElemHeight function")
        return false;
      }

      var cs = $window.getComputedStyle(element);
      var paddingY = $window.parseFloat(cs.paddingTop) + $window.parseFloat(cs.paddingBottom);
      var borderY = $window.parseFloat(cs.borderTopWidth) + $window.parseFloat(cs.borderBottomWidth);

      return element.offsetHeight - paddingY - borderY;
    }

    /*
     * Creates the canvas element in the DOM based on current available
     * dimensions and inside the passed parent element
     * @public
     * @param {DOM Object} Any DOM element
     * @param {String} string id for the created canvas object
     * @return {Object} returns the created canvas object, false if any issues
     */
    $window.util.createCanvas = function(parentElement, canvasId){

      if(typeof parentElement === "undefined"){
        console.log("Invalid parent element passed for canvas container")
        return false;
      }

      // Create a canvas element for editing
      var canvas = $window.document.createElement("CANVAS");
      canvas.setAttribute("id", canvasId);

      // Set canvas dimensions based on its current container element dimensions
      canvas.width = $window.util.getElemWidth(parentElement);
      canvas.height = $window.util.getElemHeight(parentElement);

      parentElement.appendChild(canvas);

      return canvas;
    }

    return $window.util;
  }

  // Define dependencies for utilFactory
  utilFactory.$inject = ['$window'];

  // Register factory with our main angular app
  designEditorApp.factory('util', utilFactory);

})();
