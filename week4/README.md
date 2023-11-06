# Week 3 Report

## Gallery Slideshow Report

### HTML Part
The HTML part was straight forward asking us to create two div classes one for to be accessed with Javascript and the other to simply display the number in text format showing how many slides are present.

The only tricky part was to understand how to utilise anchor elements as these are used to run Javascript functions on click and even display the slideshow buttons.

### Javascript Part
Now with the HTML and CSS designing laid out the only task remaining was to implement functions handling the slideshow arrow buttons and displaying the current image appropriately.

The tricky part here was to figure out the necessary logic behind loops controlling the gallery slideshow to seemlessly transition between first and last images.

Then came the issue about hiding the slides when clicking the slideshow arrow buttons which was later resolved with setting each slide's display style to none to make them hidden.

But this arose to another problem where all the images are now hidden but was quickly resolved by using the slideIndex variable to keep track of what image the user is currently at and setting that display styling to block.

##
## Form Validation report

### HTML Part
For Form Validation implementing the form structure and labelling the necessary fields like username, email and password was straight-forward, only hurdle was implementing error division classes to be used for displaying the appropriate error message when a user provides invalid input dynamically.

### Javascript Part

Implementing the Javascript was a lot more harder as you had to valid input data with email regex and password length.

The functions dealing with marking an input valid or invalid was a bit tricky to understand when dealing with classList removal and addition as you need to do both operations at the same time (removing and adding classLists depending on the context) for the border colour to be coloured green or red dynamically when an input is valid or invalid respectively.

Adding event listeners was a bit tricky but straightforward as it's needed for validating the form dynamically whenever the user unfocuses from the input text field.

