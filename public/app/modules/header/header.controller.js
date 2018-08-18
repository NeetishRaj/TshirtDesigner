/* eslint-disable*/

/*
* controller for the header.
* Note that wrapping dependencies and controller function in "[]" helps to
* preserve the code during minification
*/
angular.module("designEditorApp").
  controller("headerController", [
    "$scope",
    function($scope){
      $scope.appName = "T-Shirt Design Editor";
    }
  ]);
