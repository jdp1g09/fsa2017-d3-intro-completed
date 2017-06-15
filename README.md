# Data Stream D3 Intro

### Intro

* Talk about D3 - maybe with slides / website (basic examples)

### Examples

[Is it better to rent or buy?](https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html?_r=1)

[Intro to Machine Learning](http://www.r2d3.us/visual-intro-to-machine-learning-part-1/)

### 1. Intro to HTML/SVG tags & replicate in D3

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

### 2. Intro to data-driven concept

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
  
> ~ 20 - 30 minutes

### 3. Filtering

* Filtering all the circles
  * Select all circles on page
  * Introduce .filter
  * .filter(d, i)
  * Only elements which return true persist to change style
  * style: red

### 4. Scales - Range & Domain

* Introduce linear scale
  * Create xScale using:
    * .scaleLinear
    * .domain 1-5
    * .range  0-100
    * Introduce padding
      * Add padding to range to give a margin around our datapoints
  * Edit circles
    * Remove transitions
    * cx function returns xscale(d)
  * Hardcode range 0-500 to match svg width
  * Dynamically get width from d3 svg element & update range
  * Update CSS width to show scale changing
  * This is basic resizing and shows how you can create a dynamic graph to work on multiple screen sizes
  * Replace hardcoded domain with d3.min, d3.max of array
  * Create yScale using same data point
  * Usually we'd have more than one datapoint
  * Introduce ordinal scale and compare to continuous scale
    * Create color scale
       * .scaleOrdinal(d3.schemeCategory10)
    * Change fill to use color(i)
    * Keep color transitions
  
### 5. Arrray of Objects (Nested Data)

* Create object array
  * eg. [{x: 1, y: 2}]
  * Create similar svg to previous task
  * .data(objectArray)
  * Update scales
    * Set mins to 0
    * Set max to use d3.max
  * Add transition from xScale(d.x)
  * Invert yScale to format graph as expected
    * Origin changes from top left to bottom left
    * See transition origin change on chart
  
> ~ 40 mins - 1 hour

### 6. Groups

* Introduce groups
  * Create group for circle to sit inside
    * Create group variable for each data element
    * .append(g)
    * Add class datapoint
    * selectAll will select everything - so sensible to add a class so you don't get mixed up
    * Add attribute transform to translate as groups don't have cx, cy attributes
  * Add transform transition to groups instead of circle
  * Append circle to each group
    * Remove cx, cy from circle
  * Should look the same, but HTML will be different
  * Append text to each group
    * Set text to hello world
    * Set text to x, y coords using function(d, i)
    * Style text to be in readable position
      * Set text-anchor to end
      * Set transform to translate -10, -5
  * Add x, y coords to each datapoint on graph

### 7. Axes

* Introduce Axes
  * Create xAxis
    * .axisBottom(xScale) - NOTE: labels on bottom of axis, not that it's on bottom of chart
  * Add axis to chart
    * .append(g).call(xAxis)
    * .attr(transform, ...)
    * .call(xAxis)
  * Change to .axisTop to show difference
  * Create yAxis
    * .axisLeft(yScale)
  
### 8. Interaction  
  
* Introduce tooltips
  * Add text style opacity 0
  * Introduce .on() on circle
    * .on(mouseenter, function(d, i)
    * console.log(d)
    * Show interaction and output in console
    * Select text by selceting parent, then selectAll text
    * Set opacity to 1
  * Introduce .on(mouseout)
    * Set opacity back to 0
  * Add transition on opacity
