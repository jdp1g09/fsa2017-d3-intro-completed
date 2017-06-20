// Task 1. Intro to HTML/SVG tags

// Task 1a. Hello World in D3

d3.select('div#task1a')			// Selects the <div> HTML element with id="task1a"
	.append('p')							// Appends a <p> HTML element
	.text('Hello World') 			// Sets the text inside the HTML element
	.style('color', 'red');		// Sets the style of the text

// Task 1b. Create a Circle in D3

d3.select('svg#task1b')			// Selects the <svg> HTML element with the id="task1b"
	.append('circle') 				// Append a <circle> SVG element
	.attr('cx', 30) 					// Circles use the cx, cy attributes to define their position
	.attr('cy', 24) 					// 0, 0 is the top left of the SVG
	.attr('r', 20) 						// Circles use the r attribute to define the radius in pixels
	.style('fill', 'red');		// Sets the style of the circle

d3.select('svg#task1b')
	.append('line') 					// Append a <line> SVG element
	.attr('x1', 10) 					// Lines use x1, x2, y1, y2 attributes to define their start
	.attr('y1', 10) 					// and end points
	.attr('x2', 30)
	.attr('y2', 50)
	.style('stroke', 'black') // Sets the style of the line
	.style('stroke-width', '3px');

// Task 2. Introduction to data-driven concept

var array = [1, 2, 3, 4, 5];	// Create our "data", in this case it's an array of numbers

// Task 2a. Create 5 "Hello World" paragraphs

d3.select('div#task2a')
	.selectAll('p') 						// Selects all <p> elements in the HTML, currently 0
	.data(array)								// Sets the expected data to our data array, currently 4
	.enter()										// Each new element will "enter" this part of the code
	.append('p')								// Append a new <p> HTML element for each new data point
	.text('Hello World') 				// Set the text for each new data point
	.style('color', 'red');			// Set the style for each new data point

// Task 2b. Create 5 data-driven paragraphs

d3.select('div#task2b')
	.selectAll('p')
	.data(array)
	.enter()
	.append('p')
	.text(function (d, i) {				// Instead of setting the text to a String we can pass a function
		return i + ' ' + d * 5;			// d is the data element, i is the index of it in the array
	})														// Each paragraph's text is set to its index and its value * 5
	.style('color', 'red')
	.transition().duration(3000)	// Over 3 seconds, perform the following:
	.style('color', 'blue');			// Change the style

// Task 2c. Create 5 data-driven circles

d3.select('svg#task2c')
	.selectAll('circle')					// Selects all the circles
	.data(array)
	.enter()
	.append('circle')							// Append new circles
	.attr('cx', function(d, i) {	// Set the cx attribute based on the data value
		return i*20 + 10;
	})
	.attr('cy', 0)
	.attr('r', 0)									// Set the start radius to 0 pixels
	.transition().duration(2000)	// Over 2 seconds, perform the following:
	.attr('r', 10)								// Change the radius to 10 pixels
	.attr('cy', function(d, i) {	// Change cy attribute so the circles move into place
		return i*20 + 10
	});

// Task 3. Filtering

var task3 = d3.select('svg#task3');

task3.selectAll('circle')
	.data(array)
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
	.filter(function (d, i) {			// Filter the data array
		return d > 2;								// Only data values greater than 2 will be in the returned selection
	})
	.style('fill', 'red');				// Colour circles with a value greater than 2 red

// Task 4. Scales - Range & Domain

var width = d3.select('svg').node().clientWidth; 		// Find out the width of the SVG
var height = d3.select('svg').node().clientHeight;	// Find out the height of the SVG

var padding = 20;	// Padding will stop the circles from being half hidden at position 0,0

var xScale = d3.scaleLinear()
	.domain([d3.min(array), d3.max(array)])		// Domain is the range of your data, eg. 1-5
	.range([padding, width - padding]);				// Range is the range of the SVG you want your data
																						// mapped to

var yScale = d3.scaleLinear()
	.domain([d3.min(array), d3.max(array)])
	.range([padding, height - padding]);

var color = d3.scaleOrdinal(d3.schemeCategory20);	// Ordinal Scales are categories
																									// schemeCategory20 is a predefined category of
																									// 20 colours

d3.select('svg#task4')
	.selectAll('circle')
	.data(array)
	.enter()
	.append('circle')
	.attr('cx', function (d, i) {
		return xScale(d);						// Set the cx attribute to the data value passed through the xScale
	})
	.attr('cy', function (d, i) {
		return yScale(d);						// Set the cy attribute to the data value passed through the yScale
	})
	.attr('r', 10)
	.transition().duration(2000)	// Over 2 seconds, perform the following:
	.style('fill', function (d, i) {
		return color(i);						// Set the color to the index passed through the color scale
	});

// Task 5. Array of Objects (nested data)

var objArray = [{ 		// Create an array of objects with x and y co-ordinates
	x: 1,
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

var xmax = d3.max(objArray, function (d) {		// xmax will return the max x value from the objArray
	return d.x;
});

var ymax = d3.max(objArray, function (d) {		// ymax will return the max y value from the objArray
	return d.y;
});

// x and y scales are defined same as before, but this time we extracted out xmax and ymax

var xScale = d3.scaleLinear().domain([0, xmax]).range([padding, width - padding]);
var yScale = d3.scaleLinear().domain([0, ymax]).range([height - padding, padding]);

d3.select('svg#task5')
	.selectAll('circle')
	.data(objArray)					// Use objArray as data this time
	.enter()
	.append('circle')
	.attr('cx', xScale(0))	// Set initial cx value to the lowest value on the xScale
	.attr('cy', yScale(0))  // Set initial cy value to the lowest value on the yScale
	.attr('r', 10)
	.transition().duration(2000)		// Over 2 seconds, perform the following:
	.attr('cx', function (d, i) {
		return xScale(d.x);						// Move the circles cx value to it's final position using xScale
	})
	.attr('cy', function (d, i) {
		return yScale(d.y);						// Move the circles cy value to it's final position using yScale
	})
	.style('fill', function (d, i) {
		return color(i);
	});

// Task 6. Grouping of Objects

var groups = d3.select('svg#task6')
	.selectAll('g.datapoint')
	.data(objArray)
	.enter()
	.append('g')
	.attr('class', 'datapoint')
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

// Task 7. Axes

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

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
	.append('g')
	.attr("transform", "translate(0," + (height - padding) + ")")
	.call(xAxis);

d3.select('svg#task7')
	.append('g')
	.attr("transform", "translate(" + padding + "," + 0 + ")")
	.call(yAxis);

// Task 8. Interaction

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

d3.select('svg#task8')
	.append('g')
	.attr("transform", "translate(0," + (height - padding) + ")")
	.call(xAxis);

d3.select('svg#task8')
	.append('g')
	.attr("transform", "translate(" + padding + "," + 0 + ")")
	.call(yAxis);

var groups = d3.select('svg#task8')
	.selectAll('g.datapoint')
	.data(objArray)
	.enter()
	.append('g')
	.attr('class', 'datapoint')
	.attr('transform', 'translate(' + xScale(0) + ',' + yScale(0) + ')');

groups.transition().duration(2000)
	.attr('transform', function(d) {
		return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
	});

groups.append('circle')
	.attr('r', 10)
	.on('mouseenter', function(d, i) {
		d3.select(this.parentElement)
			.selectAll('text')
			.transition().duration(500)
			.style('opacity', 1);
	})
	.on('mouseout', function(d, i) {
		d3.select(this.parentElement)
			.selectAll('text')
			.transition().duration(500)
			.style('opacity', 0);
	})
	.transition().duration(2000)
	.style('fill', function (d, i) {
		return color(i);
	});

groups.append('text')
	.text(function(d, i) {
		return '(' + d.x  + ', ' + d.y + ')';
	})
	.attr('transform', 'translate(-10, -5)')
	.style('text-anchor', 'end')
	.style('opacity', 0);
