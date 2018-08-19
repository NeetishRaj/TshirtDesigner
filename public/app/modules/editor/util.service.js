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
      var cs = $window.getComputedStyle(element);
      var paddingY = $window.parseFloat(cs.paddingTop) + $window.parseFloat(cs.paddingBottom);
      var borderY = $window.parseFloat(cs.borderTopWidth) + $window.parseFloat(cs.borderBottomWidth);

      return element.offsetHeight - paddingY - borderY;
    }

    return $window.util;
  }

  // Define dependencies for utilFactory
  utilFactory.$inject = ['$window'];

  // Register factory with our main angular app
  designEditorApp.factory('util', utilFactory);

})();
