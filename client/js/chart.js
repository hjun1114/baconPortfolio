var BaconPieChart = function(container, size) {
  var container = container;
  var thermoRadius = size;
  var chartRadius = 0.8 * size;
  var innerRadius = 0.5 * size;
  var arcTickness = chartRadius - innerRadius;
  var w = 2 * thermoRadius; // width
  var h = 2 * thermoRadius; // height
  var pi = Math.PI;
  var color = d3.scaleOrdinal().domain(['Wow', 'Ok', 'Bleh', 'Oh']).range(['#009AB9', '#129AFF', '#54D6FF', '#ffa850']);
  var data = []; 
  var emptyTooltipText = 'to get more info';
  var emptyTooltipTitle = 'CLICK';
  var initialised = false;

  // d3 objects manipulated and other dynamic properties
  var vis, tooltip, tooltipTitle, indicatorRotation, indicatorHandle, currentPercentage;

  // String helper functions
  function translate(x, y) { return 'translate(' + x + ',' + y + ')'; }
  function rotate(deg) { return 'rotate(' + deg + ')'; }
  function and() { return ' '; }

  // Angle manipulation
  function radToDeg(rad) { return rad * 180 / pi; }
  function degToRad(deg) { return deg * pi / 180; }

  var update = function(newData) {
    data = newData;
    draw(data);

    indicatorHandle.transition().duration(500).attr('fill', 'transparent');
    tooltipTitle.text(emptyTooltipTitle);
    tooltip.text(emptyTooltipText);
  }
  
  function draw(data) {
    var arc = d3.arc()
      .outerRadius(chartRadius)
      .innerRadius(innerRadius);

    var thermo = d3.arc()
      .outerRadius(thermoRadius)
      .innerRadius(chartRadius + 5)
      .startAngle(0) // start to the right
      .endAngle(pi / 2); // end to the top

    var indicator = d3.arc()
      .outerRadius(40)
      .innerRadius(0)
      .startAngle(- pi / 4)
      .endAngle(pi / 4);

    if (!initialised) { // Create these elementso only once
      vis = d3.select(container)
        .append('svg:svg') // create the SVG element inside the <body>
        .attr('width', 414) // set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', h - 0.2 * size)
        .append('svg:g') //make a group to hold our pie chart
        .attr('transform', translate(414/2 - (thermoRadius - chartRadius) / 2, thermoRadius)); // move the center of the pie chart from 0, 0 to radius, radius
      
      var innerText = vis.append('svg:g')
        .attr('class', 'innerText');

      tooltipTitle = innerText.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'inner-tooltip-title')
        .attr('transform', translate(0, -15))
        .text(emptyTooltipTitle);

      tooltip = innerText.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'inner-tooltip')
        .attr('transform', translate(0, 15))
        .text(emptyTooltipText);

      indicatorRotation = vis.append('svg:g')
        .attr('width', innerRadius)
        .attr('height', innerRadius)

      indicatorHandle = indicatorRotation.append('svg:path')
        .attr('class', 'indicator')
        .attr('transform', rotate(0) + and() + translate(0, -innerRadius + arcTickness / 3 ))
        .attr('fill',  'none')
        .attr('d', indicator);

      // Add thermo
      vis.append('svg:path')
        .attr('class', 'thermo')
        .attr('d', thermo);
      
      initialised = true;
    }

    var arcs = d3.pie() 
      .sort(function(a, b) { return a.category.localeCompare(b.category) })
      .value(function(d) { return d.value; })(data);

    // build all the arcs
    var path = vis.selectAll('g.slice') 
      .data(arcs, function(d) { return d.category });
    
    var didClickOnSlice = function(d, i) {
      var textAnimation = function() {
          var current = tooltipTitle.text();
          current = current.substring(0, current.length - 1);
          if (isNaN(parseFloat(current)) || !isFinite(current)) {
            currentPercentage = d.data.value;
            tooltipTitle.text(currentPercentage + '%');
            return;
          }

          var interpolate = d3.interpolate(currentPercentage, d.value);
          currentPercentage = d.data.value;
          return function(t) {
            tooltipTitle.text(parseInt(interpolate(t)) + '%');
          };
      };

      tooltipTitle.transition().duration(500).tween('text', textAnimation);
      tooltip.text(d.data.category);

      var angle = (radToDeg(d.startAngle) + radToDeg(d.endAngle)) / 2 // Get the middle of the arc
      indicatorRotation.transition().duration(500).attr('transform', rotate(angle));
      indicatorHandle.transition().duration(500).attr('fill', color(i));
    }

    function arcTween(a) {
      var interpolate = d3.interpolate(this._current, a);
      this._current = interpolate(0);
      return function(t) {
        console.log(interpolate(t));
        return arc(interpolate(t));
      };
    }

    path.enter()       
      .append('svg:g')
      .attr('class', 'slice')      
      .on('click', didClickOnSlice)
      .append('svg:path')
      //.merge(arcs)
      .attr('fill', function(d, i) { return color(i); })
      .attr('d', arc)

      /*
      .each(function(d) { this._current = d; }) // store the initial angles
      .transition()
      .duration(500)
      .attrTween('d', arcTween);
      */
    path.exit().remove();
  }

  return {
    update: update
  };
}
