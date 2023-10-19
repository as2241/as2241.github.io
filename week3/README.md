# Week 3 Slideshow report

### HTML Part
The HTML part was straight forward asking us to create two div classes one for to be accessed with Javascript and the other to simply display the number in text format showing how many slides are present.

The only tricky part was to understand how to utilise anchor elements as these are used to run Javascript functions on click and even display the slideshow buttons.

### Javascript Part
Now with the HTML and CSS designing laid out the only task remaining was to implement functions handling the slideshow arrow buttons and displaying the current image appropriately.

The tricky part here was to figure out the necessary logic behind loops controlling the gallery slideshow to seemlessly transition between first and last images.

Then came the issue about hiding the slides when clicking the slideshow arrow buttons which was later resolved with setting each slide's display style to none to make them hidden.

But this arose to another problem where all the images are now hidden but was quickly resolved by using the slideIndex variable to keep track of what image the user is currently at and setting that display styling to block.