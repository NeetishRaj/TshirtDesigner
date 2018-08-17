/*eslint-disable*/

/*
 * A Utility module to provide few commonly used functions to operated on the
 * client side (browser)
 */
var UtilModule = (function(){

  /*
   * A Utility function that returns the current width of any DOM element
   * by subtracting the padding and border from it
   * @public
   * @param {DOM Object} Any DOM element
   * @return {Float} Element width minus padding and border
   */
  var getElemWidth = function(element){
    var cs = window.getComputedStyle(element);
    var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

    return element.offsetWidth - paddingX - borderX;
  }

  /*
   * A Utility function that returns the current height of any DOM element
   * by subtracting the padding and border from it
   * @public
   * @param {DOM Object} Any DOM element
   * @return {Float} Element height minus padding and border
   */
  var getElemHeight = function(element){
    var cs = window.getComputedStyle(element);
    var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    return element.offsetHeight - paddingY - borderY;
  }

  /*
   * Opens the designated modal box in the browser
   * @public
   * @param {String} The id of the modal div element that needs to be displayed
   * @return {Boolean} true if successful, false otherwise
   */
  var openModal = function(modalDivId){
    if(!document.getElementById(modalDivId)){
      console.error("Invalid Modal Id provided");
      return false;
    }

    var modal = document.getElementById(modalDivId);
    modal.style.display = "block";

    // Add an event on the modal div to close on clicking anywhere
    window.addEventListener("click", function(event){
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });

    return true;
  }

  /*
   * Closes the designated modal box in the browser
   * @public
   * @param {String} The id of the modal div element that needs to be hidden
   * @return {Boolean} true if sOpensuccessful, false otherwise
   */
  var closeModal = function(modalDivId){
    if(!document.getElementById(modalDivId)){
      console.error("Invalid Modal Id provided");
      return false;
    }

    document.getElementById(modalDivId).style.display = "none";
  }



  return {
    getElemWidth: getElemWidth,
    getElemHeight: getElemHeight,
    openModal: openModal,
    closeModal: closeModal
  };

})();
