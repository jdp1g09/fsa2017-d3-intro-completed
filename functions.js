// Task 1. Intro to HTML/SVG tags

// Task 1a. Hello World in D3

d3.select('div#task1a')     // Selects the <div> HTML element with id="task1a"
  .append('p')              // Appends a <p> HTML element, i.e. a paragraph
  .text('Hello World')      // Sets the text inside the paragraph element to be 'Hello World'
  .style('color', 'red');   // Sets the style of the text, in this case the color of the text will
                            // be red

// Task 1b. Create a Circle in D3

d3.select('svg#task1b')   // Selects the <svg> HTML element with the id="task1b"
  .append('circle')       // Append a <circle> SVG element
  .attr('cx', 30)         // Circles use the cx, cy attributes to define their position (x and y cooridnate)
  .attr('cy', 24)         // 0, 0 is the top left of the SVG
  .attr('r', 20)          // Circles use the r attribute to define the radius in pixels
  .style('fill', 'red');  // Sets the style of the circle, in this case the color/fill of the circle

d3.select('svg#task1b')
  .append('line')         // Append a <line> SVG element
  .attr('x1', 10)         // Lines use x1, x2, y1, y2 attributes to define their start (x1, y1)
  .attr('y1', 10)         // and end points (x2, y2)
  .attr('x2', 30)
  .attr('y2', 50)
  .style('stroke', 'black')       // Sets the style of the line
  .style('stroke-width', '3px');

// Task 2. Introduction to data-driven concept

var myArray = [1, 2, 3, 4, 5];  // Create our data, in this case it's an myArray of numbers

// Task 2a. Create 5 "Hello World" paragraphs

d3.select('div#task2a')
  .selectAll('p')         // Selects all <p> elements in the HTML, there are currently none
  .data(myArray)          // Assign the data, myArray, to all <p> inside the 'div@task2a' element
  .enter()                // For each data point, enter the following piece of code...
  .append('p')            // Append a new <p> HTML element for each new data point
  .text('Hello World')    // Set the text for each new data point
  .style('color', 'red'); // Set the style for each new data point

// Task 2b. Create 5 data-driven paragraphs

d3.select('div#task2b')
  .selectAll('p')
  .data(myArray)
  .enter()
  .append('p')
  .text(function (d, i) {       // Instead of setting the text to a fixed string we can instead
                                // pass a function
    return i + ' ' + d * 5;     // d is the particular data element within the Array
                                // i is the index of that element
  })                            // Each paragraph's text is set to its index and its value * 5
  .style('color', 'red')
  .transition().duration(3000)  // Over 3 seconds, perform the following:
  .style('color', 'blue');      // Change the color to blue

// Task 2c. Create 5 data-driven circles

d3.select('svg#task2c')
  .selectAll('circle')          // Selects all the circles
  .data(myArray)
  .enter()                      // read this code as a 'for-loop'. This now runs once for each point of data in myArray
  .append('circle')             // Append new circles
  .attr('cx', function(d, i) {  // Set the cx attribute based on the data value
    return i*20 + 10;
  })
  .attr('cy', 0)
  .attr('r', 0)                 // Set the start radius to 0 pixels
  .transition().duration(2000)  // Over 2 seconds, which is animated, perform the following:
  .attr('r', 10)                // Change the radius to 10 pixels
  .attr('cy', function(d, i) {  // Change cy attribute so the circles move into place
    return i*20 + 10
  });

// Task 3. Filtering

var task3 = d3.select('svg#task3');

task3.selectAll('circle')       // Create a circle for each point in myArray
  .data(myArray)
  .enter()
  .append('circle')
  .attr('cx', function(d, i) {
    return i*20 + 10;
  })
  .attr('cy', 0)
  .attr('r', 0)
  .transition().duration(2000)
  .attr('r', 10)
  .attr('cy', function(d, i) {
    return i*20 + 10
  });

task3.selectAll('circle')
  .filter(function (d, i) {   // Filter the circles myArray
    return d > 2;             // Only circles, with associated data values
  })                          // greater than 2 will be in the returned selection
  .style('fill', 'red');      // Color the selected circles (with a value greater than 2) red

// Task 4. Scales - Range & Domain

var width = d3.select('svg').node().clientWidth;    // Find out the width of the SVG
var height = d3.select('svg').node().clientHeight;  // Find out the height of the SVG

var padding = 20;   // Padding will stop the circles from being half hidden at position 0,0

var xScale = d3.scaleLinear()                   // Create a linear scale
  .domain([d3.min(myArray), d3.max(myArray)])   // Domain is the min/max of your data, eg. 1-5
  .range([padding, width - padding])            // Range is the min/max of the SVG you want your
                                                // data mapped to

var yScale = d3.scaleLinear()
  .domain([d3.min(myArray), d3.max(myArray)])
  .range([padding, height - padding]);

var color = d3.scaleOrdinal(d3.schemeCategory20);   // Ordinal Scales are categories
                                                    // schemeCategory20 is a predefined category of
                                                    // 20 colours

d3.select('svg#task4')
  .selectAll('circle')
  .data(myArray)
  .enter()
  .append('circle')
  .attr('cx', function (d, i) {
    return xScale(d);       // Set the x coordinate to be xScale output, given the input of 'd'
  })
  .attr('cy', function (d, i) {
    return yScale(d);       // Set the x coordinate to be yScale output, given the input of 'd'
  })
  .attr('r', 10)
  .transition().duration(2000)      // Over 2 seconds, perform the following:
  .style('fill', function (d, i) {
    return color(i);                // Set the color to the index passed through the color scale
  });

// Task 5. Array of Objects (nested data)

var objArray = [{     // Create an array of objects with x and y co-ordinates
  x: 1,               // this format is also referred to as JSON
  y: 4
}, {
  x: 2,
  y: 10
}, {
  x: 1,
  y: 3
}, {
  x: 2,
  y: 4
}];

var xmax = d3.max(objArray, function (d) {  // xmax will return the object with the max x value
  return d.x;                               // from the objArray
});

var ymax = d3.max(objArray, function (d) {  // ymax will return the object with the max y value
  return d.y;                               // from the objArray
});

// x and y scales are defined same as before, but this time we extracted out xmax and ymax
// Also notice we've inverted the range for the yScale. This move (0,0) to be in the bottom left, rather than top left

var xScale = d3.scaleLinear().domain([0, xmax]).range([padding, width - padding]);
var yScale = d3.scaleLinear().domain([0, ymax]).range([height - padding, padding]);

d3.select('svg#task5')
  .selectAll('circle')
  .data(objArray)      // Use objArray as data this time, so one circle created for each element in objArray
  .enter()
  .append('circle')
  .attr('cx', xScale(0))  // Set initial cx value to the lowest value on the xScale, 0 -> 'padding'
  .attr('cy', yScale(0))  // Set initial cy value to the lowest value on the yScale, 0 -> 'height - padding'
  .attr('r', 10)
  .transition().duration(2000)    // Over 2 seconds, perform the following:
  .attr('cx', function (d, i) {
    return xScale(d.x);           // Move the circles cx value to it's final position using xScale
  })
  .attr('cy', function (d, i) {
    return yScale(d.y);           // Move the circles cy value to it's final position using yScale
  })
  .style('fill', function (d, i) {
    return color(i);
  });

// Task 6. Grouping of Objects
// This allows us to create multiple things for each data point
// In this case a <circle> and a <text> for every point in our Array

var groups = d3.select('svg#task6')
  .selectAll('g.datapoint')         // Select all svg 'groups', refered to as <g>
                                    // which have the 'class' of datapoint
  .data(objArray)                   // Bind the array, objArray, to the groups in the SVG
  .enter()
  .append('g')                      // Create a <g> for each element in objArray
  .attr('class', 'datapoint')       // Assign a CSS class to each of these groups called 'datapoint'
  .attr('transform', 'translate(' + xScale(0) + ',' + yScale(0) + ')'); // <g> position is defined
                                                                        // using a transform

groups.transition().duration(2000)   // After two seconds move the group
  .attr('transform', function(d) {
    return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
  });

groups.append('circle')             // For every group that has been added, append a circle within that group
  .attr('r', 10)                    // Set the radius of that circle
  .transition().duration(2000)
  .style('fill', function (d, i) {
    return color(i);                // Set the color of each circle to be a color from the
  });                               // 'color' scale

groups.append('text')               // Add a piece of text for each group, which will act as our label
  .text(function(d, i) {
    return '(' + d.x  + ', ' + d.y + ')';   // Set the value of this text to show '(x, y)'
  })
  .attr('transform', 'translate(-10, -5)')  // Shift the position of the text up and left
                                            // From where the circle is
  .style('text-anchor', 'end');             // Set the 'end' of the text to this
                                            // Position (right-align)

// Task 7. Axes

var xAxis = d3.axisBottom(xScale);    // Create an axis variable that show labels on the *bottom*
var yAxis = d3.axisLeft(yScale);      // Create an axis variable that show labels on the *left*

var groups = d3.select('svg#task7')
  .selectAll('g')
  .data(objArray)
  .enter()
  .append('g')
  .attr('transform', 'translate(' + xScale(0) + ',' + yScale(0) + ')');

groups.transition().duration(2000)
  .attr('transform', function(d) {
    return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
  });

groups.append('circle')
  .attr('r', 10)
  .transition().duration(2000)
  .style('fill', function (d, i) {
    return color(i);
  });

groups.append('text')
  .text(function(d, i) {
    return '(' + d.x  + ', ' + d.y + ')';
  })
  .attr('transform', 'translate(-10, -5)')
  .style('text-anchor', 'end');

d3.select('svg#task7')
  .append('g')                                                  // Append a group to our <svg>
  .attr('transform', 'translate(0,' + (height - padding) + ')') // Move this group to the bottom
                                                                // of the svg
  .call(xAxis);                                               // Create the axis within this group

d3.select('svg#task7')
  .append('g')                                                // Append a group to our <svg>
  .attr('transform', 'translate(' + padding + ',' + 0 + ')')  // Move this group a distance of
                                                              // 'padding' in x-axis
    .call(yAxis);                                             // Create the axis within this group

// Task 8. Interaction

var xAxis = d3.axisBottom(xScale);  // Create an axis variable that show labels on the *bottom*
                                    // and uses xScale domain
var yAxis = d3.axisLeft(yScale);    // Create an axis variable that show labels on the *left*
                                    // and uses yScale domain

d3.select('svg#task8')   // Add the x-axis
  .append('g')
  .attr('transform', 'translate(0,' + (height - padding) + ')')
  .call(xAxis);

d3.select('svg#task8')   // Add the y-axis
  .append('g')
  .attr('transform', 'translate(' + padding + ',' + 0 + ')')
  .call(yAxis);

var groups = d3.select('svg#task8')   // Create a <g> for each data point that we have
  .selectAll('g.datapoint')
  .data(objArray)
  .enter()
  .append('g')
  .attr('class', 'datapoint')
  .attr('transform', 'translate(' + xScale(0) + ',' + yScale(0) + ')');

groups.transition().duration(2000)    // Animate the position of each <g> to it's correct location
  .attr('transform', function(d) {
    return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
  });

groups.append('circle')
  .attr('r', 10)
  .on('mouseenter', function(d, i) {  // When the user's mouse 'enters' this circle, run this code
    d3.select(this.parentElement)     // Get the parent element, the <g>, for this circle
      .selectAll('text')              // Select the <text> within this group
      .transition().duration(500)     // Take 0.5 second to:
      .style('opacity', 1);           // Set opacity to 1
  })
  .on('mouseout', function(d, i) {    // When the user's mouse leaves this circle, run this code
    d3.select(this.parentElement)     // Get the parent element, the <g>, for this circle
      .selectAll('text')              // Select the <text> within this group
      .transition().duration(500)     // Take 0.5 second to:
      .style('opacity', 0);           // Set opacity to 0
  })
  .transition().duration(2000)
  .style('fill', function (d, i) {
    return color(i);
  });

groups.append('text')                 // Add the text for each group
  .text(function(d, i) {
    return '(' + d.x  + ', ' + d.y + ')';
  })
  .attr('transform', 'translate(-10, -5)')
  .style('text-anchor', 'end')
  .style('opacity', 0);               // Set the opacity to be 0, this make it invisible by default
