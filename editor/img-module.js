/*eslint-disable*/

/*
* Image Handler Module to run on client side and perform common image based
* operations, including communications with server side
*/
var ImgModule = (function(){

  /*
  * It contains the dataURL for the images fetched by user from device
  * @type Array
  */
  var imageArray = [];



  /*
   * Creates a new img element in view and adds the image to imageArray as well
   * @private
   * @param {String} image data string
   * @return {Null}
   */
  var addNewImage = function(imgDataUrl){
    // Push the image src to image array
    imageArray.push(imgDataUrl);

    // Create and Add the new image element in the display area
    var imgContainer = document.querySelector('.imagesContainer');
    var newImage = document.createElement("IMG");
    newImage.setAttribute("src", imgDataUrl);
    newImage.setAttribute("draggable", "false");
    imgContainer.appendChild(newImage);

    // Add a click event listener to add them to edit area
    newImage.addEventListener("click", function(){
      EditorModule.addImage(this);
    });
  }

  /*
   * Fetches the image file from local device and saves it in the browser
   * @public
   * @param {Object} the event object passed by the calling element
   * @return {Null}
   */
  var fetchImage = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){

      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;

      // Call addNewImage to update the view with new image
      addNewImage(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };



  /*
   * Fetches the image data url from the Fabric.js canvas and downloads it
   * as a "image/png" format
   * @public
   * @param {String} Id of the input element that holds the image name
   * @return {Null}
   */
  var downloadImage = function(inputId){
    var download = document.getElementById("download");
    var imageName = document.getElementById(inputId).value;
		var image = document.
      getElementById(EditorModule.canvasId).
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


  return {
    fetchImage: fetchImage,
    downloadImage: downloadImage
  };
})()
