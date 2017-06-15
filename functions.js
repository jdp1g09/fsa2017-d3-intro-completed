// 1. Intro to HTML/SVG tags

d3.select('div#task1a')
	.append('p')
	.text('Hello World')
	.style('color', 'red');

d3.select('svg#task1b')
	.append('circle')
	.attr('cx', 30)
	.attr('cy', 24)
	.attr('r', 20)
	.style('fill', 'red');

d3.select('svg#task1b')
	.append('line')
	.attr('x1', 10)
	.attr('y1', 10)
	.attr('x2', 30)
	.attr('y2', 50)
	.style('stroke', 'black')
	.style('stroke-width', '3px');

// 2. Introduction to data-driven concept

var array = [1, 2, 3, 4, 5];

d3.select('div#task2a')
	.selectAll('p')
	.data(array)
	.enter()
	.append('p')
	.text('Hello World')
	.style('color', 'red');

d3.select('div#task2b')
	.selectAll('p')
	.data(array)
	.enter()
	.append('p')
	.text(function (d, i) {
		return i + ' ' + d * 5;
	})
	.style('color', 'red')
	.transition().duration(3000)
	.style('color', 'blue');

d3.select('svg#task2c')
	.selectAll('circle')
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

// 3. Filtering

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
	.filter(function (d, i) {
		console.log()
		return d > 2;
	})
	.style('fill', 'red');


// 4. Scales - Range & Domain

var width = d3.select('svg').node().clientWidth;
var height = d3.select('svg').node().clientHeight;

var padding = 20;

var xScale = d3.scaleLinear().domain([d3.min(array), d3.max(array)]).range([padding, width - padding]);
var yScale = d3.scaleLinear().domain([d3.min(array), d3.max(array)]).range([padding, height - padding]);

var color = d3.scaleOrdinal(d3.schemeCategory20);

d3.select('svg#task4')
	.selectAll('circle')
	.data(array)
	.enter()
	.append('circle')
	.attr('cx', function (d, i) {
		return xScale(d);
	})
	.attr('cy', function (d, i) {
		return yScale(d);
	})
	.attr('r', 10)
	.transition().duration(2000)
	.style('fill', function (d, i) {
		return color(i);
	});

// 5. Array of Objects (nested data)

var objArray = [{
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

var xmax = d3.max(objArray, function (d) {
	return d.x;
});

var ymax = d3.max(objArray, function (d) {
	return d.y;
});

var xScale = d3.scaleLinear().domain([0, xmax]).range([padding, width - padding]);
var yScale = d3.scaleLinear().domain([0, ymax]).range([height - padding, padding]);

d3.select('svg#task5')
	.selectAll('circle')
	.data(objArray)
	.enter()
	.append('circle')
	.attr('cx', xScale(0))
	.attr('cy', yScale(0))
	.attr('r', 10)
	.transition().duration(2000)
	.attr('cx', function (d, i) {
		return xScale(d.x);
	})
	.attr('cy', function (d, i) {
		return yScale(d.y);
	})
	.style('fill', function (d, i) {
		return color(i);
	});

// 6. Grouping of Objects

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

// 7. Axes

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

// 8. Interaction

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
