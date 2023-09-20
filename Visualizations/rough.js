var x_power_plant = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width_power_plant ]);
    var xAxis_power_plant = svg_line_chart_power_plant.append("g")
      .attr("transform", "translate(0," + height_power_plant + ")")
      .call(d3.axisBottom(x_power_plant));

    // Add y_power_plant axis
    var y_power_plant = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height_power_plant, 0 ]);
    var yAxis_power_plant = svg_line_chart_power_plant.append("g")
      .call(d3.axisLeft(y_power_plant));

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg_line_chart_power_plant.append("defs").append("svg_line_chart_power_plant:clipPath")
        .attr("id", "clip")
        .append("svg_line_chart_power_plant:rect")
        .attr("width_power_plant", width_power_plant )
        .attr("height_power_plant", height_power_plant )
        .attr("x", 0)
        .attr("y_power_plant", 0);

    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width_power_plant,height_power_plant] ] )  // initialise the brush area: start at 0,0 and finishes at width_power_plant,height_power_plant: it means I select the whole graph area
        .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line = svg_line_chart_power_plant.append('g')
      .attr("clip-path", "url(#clip)")

    // Add the line
    line.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width_power_plant", 1.5)
      .attr("d", d3.line()
        .x_power_plant(function(d) { return x_power_plant(d.date) })
        .y_power_plant(function(d) { return y_power_plant(d.value) })
        )

    // Add the brushing
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

      // What are the selected boundaries?
      extent = d3.event.selection

      // If no selection, back to initial coordinate. Otherwise, update x_power_plant axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x_power_plant.domain([ 4,8])
      }else{
        x_power_plant.domain([ x_power_plant.invert(extent[0]), x_power_plant.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and line position
      xAxis_power_plant.transition().duration(1000).call(d3.axisBottom(x_power_plant))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_power_plant(d.date) })
            .y(function(d) { return y_power_plant(d.value) })
          )
    }

    // If user double click, reinitialize the chart
    svg_line_chart_power_plant.on("dblclick",function(){
      x_power_plant.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_power_plant.transition().call(d3.axisBottom(x_power_plant))
      line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x_power_plant(function(d) { return x_power_plant(d.date) })
          .y_power_plant(function(d) { return y_power_plant(d.value) })
      )
    });