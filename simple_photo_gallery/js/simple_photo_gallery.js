//lightbox2 options
lightbox.option({
      'wrapAround': true,
      'showImageNumberLabel': false
    })

//Get input element
let filter = document.getElementById('filter');

//Add keyup event to the input element
filter.addEventListener('keyup', function(){

  //Get values from the input element
  let value = filter.value.toLowerCase();
  //Get all divs that wrap around each image and link
  let imgs = document.getElementsByClassName('imgs');
  //Get all link tags
  let caption = document.getElementsByTagName('a');

  //Loop through all attributes of each links
  for (let i = 0; i < imgs.length; i++) {
    //Get attribute values in lower case
    let attrValue = caption[i].getAttribute("data-title").toLowerCase();
    //If attribute values matches input values, display the image
    if (attrValue.includes(value) === true) {
       imgs[i].style.display = '';
    }
    //If no matches, hide the image
     else {
       imgs[i].style.display = 'none';
    }
  }
});