# Data Stream D3 Intro

### Intro

* Talk about D3 - maybe with slides / website (basic examples)

### Examples

[Is it better to rent or buy?](https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html?_r=1)

[Intro to Machine Learning](http://www.r2d3.us/visual-intro-to-machine-learning-part-1/)

### Build

#### 1. Intro to HTML/SVG tags & replicate in D3

* Hello World in D3
  * How to add stuff to a page
  * Styling - colour
  * Show chaining
  * Dynamically create, append & style

* Intro to SVG in HTML (no js yet)
  * Add circle and attributes

* Show the same in D3
  * Select SVG
  * Append circle
  * With attribute tag
  * Attributes: cx, cy, r
  * Style: fill

* Add a line in D3
  * attributes: x1, x2, y1, y2
  * style: stroke width & stroke

#### 2. Intro to data-driven concept

* Use array to generate paragraphs
  * Introduce .selectAll
  * Introduce .data
  * Introduce .enter (brush over till later)
  * Append 'hello world' text for each
  * Style: color

* Add function to .text
  * Introduce data-driven element
  * function(d) etc
  * function(d, i) etc

* SelectAll circle
  * .data is array
  * .enter
  * .append circle
  * All the same attributes
  * Go into dev tools and show generated circles on top of each other
  * Any actions or styles can be function driven
  * Change cx for each element in array using function(d, i)
  * Change cy for each element in array using function(d, i)
  * leave radius hard coded

* Transitions for paragraphs
  * .duration 3 second
  * style: color
  * Transitions work on any style or action same as functions

* Transitions for circles  
  * Transition circle radius: 2 seconds
  * Transition cy: 2 seconds

  20 - 30 minutes

### 3. Filtering

* Filtering all the circles
  * Select all circles on page
  * Introduce .filter
  * .filter(d, i)
  * Only elements which return true persist to change style
  * style: red

### 4. Scales - Range & Domain

* Introduce linear scale
  * .scaleLinear
  * .domain 1-5
  * .range  0-100
  * Edit circles
    * Remove transitions
    * cx function returns xscale(d)
  * Change range 0-200
