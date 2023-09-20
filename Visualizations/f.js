let updateall = function(report_of,date){
    update(report_of,date)
}
function update(report_of,date){
  drawmap();
    d3.select("#canvas_line_chart_power_plant").selectAll(".line").remove();
    d3.select("#canvas_line_chart_power_plant").selectAll(".xAxis_power_plant").remove();
    d3.select("#canvas_line_chart_power_plant").selectAll(".yAxis_power_plant").remove();
    d3.select("#canvas_line_chart").selectAll(".line").remove();
    d3.select("#canvas_line_chart").selectAll(".xAxis_power_plant").remove();
    d3.select("#canvas_line_chart").selectAll(".yAxis_power_plant").remove();
    
    line_chart(report_of,date);
    d3.select("#canvas_bar_graph_time_date").selectAll(".title").remove();
    
    drawbargraph_time_date(1,report_of,date);
    line_chart_power_plant(report_of,date);
    
   
}

let updatehospitalchart = function(report_of,date){
  updatehospital(report_of,date)
}

function updatehospital(report_of,date){
  d3.select("#canvas_line_chart").selectAll(".line").remove();
    d3.select("#canvas_line_chart").selectAll(".xAxis_power_plant").remove();
    d3.select("#canvas_line_chart").selectAll(".yAxis_power_plant").remove();
    
    line_chart(report_of,date);

}

let canvas_map = d3.select("#canvas_map")
                    .attr("width", 600)
                    .attr("height", 350)
let tooltip = d3.select("#tooltip_map")



let st_himark_map_data
let temp_aggregate_mean_data
let projection

let mouseOver = function(d,i) {
  console.log(d.properties.Nbrhood)
              d3.select('#tooltip_map')
                  .style('left', (d3.event.pageX+10) + 'px')
                  .style('top', (d3.event.pageY+10) + 'px')
                  .select('#state').text(d.properties.Nbrhood)


              d3.select('#tooltip_map').classed('hidden', false);
              
              d3.selectAll("path")
              .transition()
              .duration(0)
              .style("opacity", .7)
              
              d3.select(this)
              .transition()
              .duration(0)
              .style("opacity", 1)
              .style("stroke", "black")
              .style("stroke-width","1")
              
          }
let mouseLeave = function(d) {

  try{
  if(d3.select(this)._groups[0][0]["__data__"]['properties']['Nbrhood']!=highlighted._groups[0][0]["__data__"]['properties']['Nbrhood']){
              d3.selectAll("path")
              .transition()
              .duration(0)
              .style("opacity", 1)
              
              d3.select(this)
              .transition()
              .duration(0)
              .style("stroke", "black")
              .style("stroke-width","0.2")
  }}
  catch(err){
      d3.selectAll("path")
      .transition()
      .duration(0)
      .style("opacity", 1)
      
      d3.select(this)
      .transition()
      .duration(0)
      .style("stroke", "black")
      .style("stroke-width","0.2")
  }
          

              d3.select('#tooltip_map').classed('hidden', true);
          }
        
var highlighted = d3.select(null);
function drawmap(){
    canvas_map.selectAll('path')
                .data(st_himark_map_data.features)
                .enter()
                .append('path')
                .attr('d',d3.geoPath().projection(projection))
                .attr('class','State')
                .attr('fill', (item)=> {
                    let id = item.properties.Id
                    if (id==1){ return "pink" }
                    else if(id==2){ return "rgb(157,77,219)" }
                    else if(id==3){ return "yellow" }
                    else if(id==4){ return "rgb(252,8,79)" }
                    else if(id==5){ return "orange" }
                    else if(id==6){ return "blue" }
                    else if(id==7){ return "green" }
                    else if(id==8){ return "yellow" }
                    else if(id==9){ return "rgb(157,77,219)" }
                    else if(id==10){ return "lightblue" }
                    else if(id==11){ return "orange" }
                    else if(id==12){ return "pink" }
                    else if(id==13){ return "blue" }
                    else if(id==14){ return "lightblue" }
                    else if(id==15){ return "purple" }
                    else if(id==16){ return "lightgreen" }
                    else if(id==17){ return "yellow" }
                    else if(id==18){ return "orange" }
                    else if(id==19){ return "red" }
                })
                .attr('id', (item)=> {
                    return item.properties.Id
                })
                .attr('name', (item) => {
                    return item.properties.Nbrhood
                })
                .on('click', function(d){location_selected = d.properties.Id;
                                        let attribute = document.getElementById('report_of').value;
                                        let date  = document.getElementById('date').value;
                                        //myFunction(location_selected,attribute);
                                        d3.select("#canvas_bar_graph_time_date").selectAll(".title").remove();
                                        drawbargraph_time_date(location_selected,attribute,date);
                                        highlighted.style('stroke','black')
                                        .style('stroke-width',"0.2");
                                
                                highlighted = d3.select(this);
                                highlighted.style('stroke','black')
                                        .style('stroke-width',"2.5");
                                        
                                        })
                .on('mouseover',mouseOver)
                .on('mouseleave',mouseLeave)
                .attr('stroke','black')
                .attr('stroke-width',"0.2")
                .attr('transform','translate(25,0)')
                .append("text")
          
                    


}

d3.json("map.geo.json").then((data,error) =>{
    if(error){
        console.log(error)
    }
    else{
        st_himark_map_data = data
        projection = d3.geoMercator().fitSize([450,300],data)
        //console.log(st_himark_map_data)
        d3.csv("df_aggregate_mean.csv").then((data,error)=>{
            if(error){
                console.log(error)
            }
            else{
                temp_aggregate_mean_data = data
                drawmap()
            }
        })
        
    }
})



//////////////////////////////////
var margin_bar_graph_without_mean = {top: 30, right: 30, bottom: 70, left: 60},
    width = 660 - margin_bar_graph_without_mean.left - margin_bar_graph_without_mean.right,
    height = 600 - margin_bar_graph_without_mean.top - margin_bar_graph_without_mean.bottom;

var svg_bar_graph_without_mean = d3.select("#canvas_bar_graph_mean")
                                    .attr("width", width + margin_bar_graph_without_mean.left + margin_bar_graph_without_mean.right)
                                    .attr("height", height + margin_bar_graph_without_mean.top + margin_bar_graph_without_mean.bottom)
                                    .append("g")
                                    .attr("transform",
                                        "translate(" + margin_bar_graph_without_mean.left + "," + margin_bar_graph_without_mean.top + ")");

let data_bar_graph
let location_selected
let final_data_by_location
let final_attribute

function myFunction(location_selected,final_attribute) {
    
    //location_selected = document.getElementById('location').value;
    //console.log(location_selected)
    //final_data_by_location = data.filter(x => x['location']==location_selected)
    //console.log(final_data_by_location)
    //final_attribute = document.getElementById('report').value;
    //console.log(final_attribute)
    
    drawbargraph(location_selected,final_attribute)
  }


  var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg_bar_graph_without_mean.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg_bar_graph_without_mean.append("g")
  .attr("class", "myYaxis")

function drawbargraph(location_selected,final_attribute){
    d3.csv("df_aggregate_mean.csv").then((alldata,error) => {
        if(error){
            console.log(error)
        }
        else{
            data_bar_graph = alldata.filter(x => x['location']==location_selected)
            data_bar_graph.sort((a,b)=>{
                       return new Date(b.date) - new Date(a.date);
            })
            //console.log(data_bar_graph)
            x.domain(data_bar_graph.map(function(d) { return d.date; }))
            xAxis.transition().duration(1000).call(d3.axisBottom(x))

            // Add Y axis
            y.domain([0, d3.max(data_bar_graph, function(d) { return +d[final_attribute] }) ]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y));
            
            var u = svg_bar_graph_without_mean.selectAll("rect")
                .data(data_bar_graph)

                // update bars
                u
                .enter()
                .append("rect")
                .merge(u)
                .transition()
                .duration(1000)
                    .attr("x", function(d) { return x(d.date); })
                    .attr("y", function(d) { return y(d[final_attribute]); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d[final_attribute]); })
                    .attr("fill", (item)=>{
                        id = item.location
                        if (id==1){ return "pink" }
                        else if(id==2){ return "rgb(157,77,219)" }
                        else if(id==3){ return "yellow" }
                        else if(id==4){ return "rgb(252,8,79)" }
                        else if(id==5){ return "orange" }
                        else if(id==6){ return "blue" }
                        else if(id==7){ return "green" }
                        else if(id==8){ return "yellow" }
                        else if(id==9){ return "rgb(157,77,219)" }
                        else if(id==10){ return "lightblue" }
                        else if(id==11){ return "orange" }
                        else if(id==12){ return "pink" }
                        else if(id==13){ return "blue" }
                        else if(id==14){ return "lightblue" }
                        else if(id==15){ return "purple" }
                        else if(id==16){ return "lightgreen" }
                        else if(id==17){ return "yellow" }
                        else if(id==18){ return "orange" }
                        else if(id==19){ return "red" }
                    })
        }
    })
}
//drawbargraph(1,document.getElementById('report_of').value)



///////////////bar-graph-hour
var margin_bar_graph_time = {top: 30, right: 30, bottom: 70, left: 60},
    width_time_date = 650 - margin_bar_graph_time.left - margin_bar_graph_time.right,
    height_time_date = 320 - margin_bar_graph_time.top - margin_bar_graph_time.bottom;

var svg_bar_graph_time_date = d3.select("#canvas_bar_graph_time_date")
                                    .attr("width", width_time_date + margin_bar_graph_time.left + margin_bar_graph_time.right)
                                    .attr("height", height_time_date + margin_bar_graph_time.top + margin_bar_graph_time.bottom)
                                    .append("g")
                                    .attr("transform",
                                        "translate(" + margin_bar_graph_time.left + "," + margin_bar_graph_time.top + ")");

let data_bar_graph_time_date

var x_time_date = d3.scaleBand()
  .range([ 0, width_time_date ])
  .padding(0.2);
var xAxis_time_date = svg_bar_graph_time_date.append("g")
  .attr("transform", "translate(0," + height_time_date + ")")

// Initialize the Y axis
var y_time_date = d3.scaleLinear()
  .range([ height_time_date, 0]);
var yAxis_time_date = svg_bar_graph_time_date.append("g")
  .attr("class", "myYaxis")

function drawbargraph_time_date(location_selected,final_attribute,date){
    d3.csv("data_with_time.csv").then((data,error)=>{
        if(error){
            console.log(error)
        }
        else{
            //console.log(data)
            data_bar_graph_time_date = data.filter(x => x['date']==date && x['location']==location_selected)
            //console.log(data_bar_graph_time_date)

            x_time_date.domain(data_bar_graph_time_date.map(function(d) {return d.hour; }))
            xAxis_time_date.transition().duration(1000).call(d3.axisBottom(x_time_date))

            y_time_date.domain([0, d3.max(data_bar_graph_time_date, function(d) { return +d[final_attribute] }) ]);
            yAxis_time_date.transition().duration(1000).call(d3.axisLeft(y_time_date));

            var u = svg_bar_graph_time_date.selectAll("rect")
                .data(data_bar_graph_time_date)
            u
            .enter()
            .append("rect")
            .merge(u)
            .transition()
            .duration(1000)
                .attr("x", function(d) { return x_time_date(d.hour); })
                .attr("y", function(d) { return y_time_date(d[final_attribute]); })
                .attr("width", x_time_date.bandwidth())
                .attr("height", function(d) { return height_time_date - y_time_date(d[final_attribute]); })
                .attr("fill", (item)=>{
                    let id = item.location
                    if (id==1){ return "pink" }
                    else if(id==2){ return "rgb(157,77,219)" }
                    else if(id==3){ return "yellow" }
                    else if(id==4){ return "rgb(252,8,79)" }
                    else if(id==5){ return "orange" }
                    else if(id==6){ return "blue" }
                    else if(id==7){ return "green" }
                    else if(id==8){ return "yellow" }
                    else if(id==9){ return "rgb(157,77,219)" }
                    else if(id==10){ return "lightblue" }
                    else if(id==11){ return "orange" }
                    else if(id==12){ return "pink" }
                    else if(id==13){ return "blue" }
                    else if(id==14){ return "lightblue" }
                    else if(id==15){ return "purple" }
                    else if(id==16){ return "lightgreen" }
                    else if(id==17){ return "yellow" }
                    else if(id==18){ return "orange" }
                    else if(id==19){ return "red" }
                })
                
                u
                    .exit()
                    .remove()
                
              
                svg_bar_graph_time_date.append("text")
                    .attr("transform", "translate(" + (width_time_date/2) + " ," + (height_time_date+30) + ")")
                    .style("text-anchor", "middle")
                    .style("font-size", "10px")
                    .text("Time of Day");
                
                    svg_bar_graph_time_date.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -(height_time_date/2))
                    .attr("y", -30)
                    .style("text-anchor", "middle")
                    .style("font-size", "10px")
                    .text("Mean report");
                
                    svg_bar_graph_time_date.append("text")
                    .attr('class','title')
                    .attr("x", width_time_date/2)
                    .attr("y", 20)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .attr("transform", "translate("+(0)+","+(0)+")")
                    .text(date);
                
            
                
            
                
        }
    })
}
drawbargraph_time_date(1,document.getElementById('report_of').value,document.getElementById('date').value);



///////////////////////power_plant

var margin_power_plant = {top: 10, right: 30, bottom: 30, left: 60},
    width_power_plant = 400 - margin_power_plant.left - margin_power_plant.right,
    height_power_plant = 220 - margin_power_plant.top - margin_power_plant.bottom;

var svg_line_chart_power_plant = d3.select("#canvas_line_chart_power_plant")
                .attr("width", width_power_plant + margin_power_plant.left + margin_power_plant.right)
                .attr("height", height_power_plant + margin_power_plant.top + margin_power_plant.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin_power_plant.left + "," + margin_power_plant.top + ")");

function line_chart_power_plant(attribute,date){
d3.csv("power_plant_data.csv").then((data,error)=>{
    if(error){
        console.log(error)
    }
    else{
        data = data.filter(x => x['date']==date)
        //console.log(data)
        
       data.forEach((d,index) => {
        data[index] = {date: d3.timeParse("%H:%M:%S")(d.time_of_day), value:d[attribute]}
       });
    
       function sortByDateAscending(a, b) {
        return a.date - b.date;
    }
    data = data.sort(sortByDateAscending);
       //console.log(data)

       var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width_power_plant ]);
    xAxis = svg_line_chart_power_plant.append("g")
      .attr('class','xAxis_power_plant')
      .attr("transform", "translate(0," + height_power_plant + ")")
      .call(d3.axisBottom(x));

    
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height_power_plant, 0 ]);
    yAxis = svg_line_chart_power_plant.append("g")
    .attr('class','yAxis_power_plant')
      .call(d3.axisLeft(y));

   
    var clip = svg_line_chart_power_plant.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width_power_plant )
        .attr("height", height_power_plant )
        .attr("x", 0)
        .attr("y", 0);

    const max = d3.max(data, function(d) { return +d.value; })

        svg_line_chart_power_plant.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
          .data([
            {offset: "0%", color: "blue"},
            {offset: "100%", color: "red"}
          ])
        .enter().append("stop")
          .attr("offset", function(d) { return d.offset; })
          .attr("stop-color", function(d) { return d.color; });
  
    
    var brush = d3.brushX()                   
        .extent( [ [0,0], [width_power_plant,height_power_plant] ] )  
        .on("end", updateChart)               

    
    var line = svg_line_chart_power_plant.append('g')
      .attr("clip-path", "url(#clip)")

    
    line.append("path")
      .datum(data)
      .merge(line)
      .transition()
      .duration(100)
      .attr("class", "line")  
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) {return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
        
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);

    
    var idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      
      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([ 4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and line position
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
          )
          
    }


    // If user double click, reinitialize the chart
    svg_line_chart_power_plant.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis.transition().call(d3.axisBottom(x))
      line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
      )
    });
    svg_line_chart_power_plant.append("text")
    .attr("transform", "translate(" + (width_power_plant/2) + " ," + (height_power_plant+30) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .text("Time of Day");

    svg_line_chart_power_plant.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height_power_plant/2))
    .attr("y", -30)
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .text("report");

    svg_line_chart_power_plant.append("text")
    .attr('class','title')
    .attr("x", width_power_plant/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .attr("transform", "translate("+(0)+","+(height_power_plant+50)+")")
    
        
    }
    

})
}
line_chart_power_plant(document.getElementById('report_of').value,document.getElementById('date').value)

//////////HOSPITAL DATA
var margin_line_chart = {top: 10, right: 30, bottom: 30, left: 60},
    width_line_chart = 400 - margin_line_chart.left - margin_line_chart.right,
    height_line_chart = 220 - margin_line_chart.top - margin_line_chart.bottom;

var svg_line_chart = d3.select("#canvas_line_chart")
                .attr("width", width_line_chart + margin_line_chart.left + margin_line_chart.right)
                .attr("height", height_line_chart + margin_line_chart.top + margin_line_chart.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin_line_chart.left + "," + margin_line_chart.top + ")");

function line_chart(attribute,date){
d3.csv("df_line.csv").then((data,error)=>{
    if(error){
        console.log(error)
    }
    else{
        data = data.filter(x => x['date']==date && x['location']==document.getElementById('hospital').value)
        //console.log(data)
        
       data.forEach((d,index) => {
        data[index] = {date: d3.timeParse("%H:%M:%S")(d.time_of_day), value:d[attribute],location:d.location}
       });
    
       function sortByDateAscending(a, b) {
        return a.date - b.date;
    }
    data = data.sort(sortByDateAscending);
       //console.log(data)

       var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width_line_chart ]);
    xAxis_hos = svg_line_chart.append("g")
      .attr('class','xAxis_power_plant')
      .attr("transform", "translate(0," + height_line_chart + ")")
      .call(d3.axisBottom(x));

    
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height_line_chart, 0 ]);
    yAxis_hos = svg_line_chart.append("g")
    .attr('class','yAxis_power_plant')
      .call(d3.axisLeft(y));

   
    var clip = svg_line_chart.append("defs").append("svg:clipPath")
        .attr("id", "clip_hos")
        .append("svg:rect")
        .attr("width", width_line_chart )
        .attr("height", height_line_chart )
        .attr("x", 0)
        .attr("y", 0);

    
  
    
    var brush = d3.brushX()                   
        .extent( [ [0,0], [width_line_chart,height_line_chart] ] )  
        .on("end", updateChart)       

    
    const max = d3.max(data, function(d) { return +d.value; })

    svg_line_chart.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
          .data([
            {offset: "0%", color: "blue"},
            {offset: "100%", color: "red"}
          ])
        .enter().append("stop")
          .attr("offset", function(d) { return d.offset; })
          .attr("stop-color", function(d) { return d.color; });
  
    
  
    
    var line = svg_line_chart.append('g')
      .attr("clip-path", "url(#clip_hos)")

    
    line.append("path")
      .datum(data)
      .merge(line)
      .transition()
      .duration(100)
      .attr("class", "line")  
      .attr("fill", "none")
      .attr("stroke","url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) {return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
        
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);

    
    var idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      
      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([ 4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and line position
      xAxis_hos.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
          )
          
    }


    // If user double click, reinitialize the chart
    svg_line_chart.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_hos.transition().call(d3.axisBottom(x))
      line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
      )
    });
    svg_line_chart.append("text")
    .attr("transform", "translate(" + (width_line_chart/2) + " ," + (height_line_chart+30) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .text("Time of Day");

    svg_line_chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height_line_chart/2))
    .attr("y", -30)
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .text("report");

    svg_line_chart.append("text")
    .attr('class','title')
    .attr("x", width_line_chart/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text();
        
    }
    

})
}
line_chart(document.getElementById('report_of').value,document.getElementById('date').value)

////////////////////////scatter
var margin_power_count = {top: 20, right: 20, bottom: 30, left: 40},
width_power_count = 400 - margin_power_count.left - margin_power_count.right,
    height_power_count = 220 - margin_power_count.top - margin_power_count.bottom,
    idleTimeout, idleDelay = 350;


// setup fill color

//var color = d3.scaleOrdinal().range(d3.schemeCategory20);

// add the graph canvas to the body of the webpage
var svg_power_count = d3.select("#canvas_scatter_plot_power_count")
    .attr("width", width_power_count + margin_power_count.left + margin_power_count.right)
    .attr("height", height_power_count + margin_power_count.top + margin_power_count.bottom)
  .append("g")
    .attr("transform", "translate(" + margin_power_count.left + "," + margin_power_count.top + ")");



// add the tooltip_power_count area to the webpage
var div_legend = d3.select('#tooltip_scatter_plot_power_count')
  .attr('class', 'tooltip')               
  .style('opacity', 0);


// load data
d3.csv("power_count_date_zoom.csv").then((data, error) => {
  var cValue = function(d) { return d.location;};
  var brush = d3.brush().on("end", brushended);

  var x = d3.scaleTime().range([0, width_power_count]);
var y = d3.scaleLinear().range([height_power_count, 0]);

var xAxis_power = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

function brushended() {
      var s = d3.event.selection;
      if (!s) {
        if (!idleTimeout)
          return idleTimeout = setTimeout(idled, idleDelay);
        x.domain(x0);
        y.domain(y0);
      } else {
        x.domain([s[0][0], s[1][0]].map(x.invert, x));
        y.domain([s[1][1], s[0][1]].map(y.invert, y));
        svg_power_count.select(".brush").call(brush.move, null);
      }
      zoom();
    }

    function idled() {
      idleTimeout = null;
    }

    function zoom() {
      var t = svg_power_count.transition().duration(750);
      svg_power_count.select(".axis--x").transition(t).call(xAxis_power);
      svg_power_count.select(".axis--y").transition(t).call(yAxis);
      svg_power_count.selectAll("circle").transition(t)
        .attr("cx", function(d) {
          return x(moment(d.index).toDate());
        })
        .attr("cy", function(d) {
          return y(d.count);
        });
    }

  var x0 = d3.extent(data, function(d) {
    return moment(d.index).toDate();
  })

  var y0 = d3.extent(data, function(d){
    return d.count;
  })

  // don't want dots overlapping axis, so add in buffer to data domain
//   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
//   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
var color = d3.scaleOrdinal().domain(data)
  .range(["gold", "blue", "green", "yellow", "Chocolate", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange", "cyan",
"magenta", "steelblue", "silver", "mint", "lightgreen", "purple"])

    x.domain(x0).nice();
    y.domain(y0).nice();

  // x-axis
  svg_power_count.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height_power_count + ")")
      .call(xAxis_power)
    .append("text")
      .attr("class", "label")
      .attr("x", width_power_count)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Date");

  // y-axis
  svg_power_count.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Reports");

  svg_power_count.append("g").attr("class", "brush").call(brush).append("g")
    .attr("transform", "translate(" + margin_power_count.left + "," + margin_power_count.top + ")");

    svg_power_count.append("defs").append("clipPath")
        .attr("id", "clip_power").append("rect")
        .attr("width", width_power_count)
        .attr("height", height_power_count);

  var circlegroup = svg_power_count.append("g");

  circlegroup.attr("clip-path", "url(#clip_power)");
  // draw dots
  
  circlegroup.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(moment(d.index).toDate()); })
      .attr("cy", function(d) { return y(d.count); })
      .style("fill", function(d) { 
        let id=d.location
        if (id==1){ return "gold" }
            else if(id==2){ return "blue" }
            else if(id==3){ return "green" }
            else if(id==4){ return "yellow" }
            else if(id==5){ return "darkcyan" }
            else if(id==6){ return "grey" }
            else if(id==7){ return "darkgreen" }
            else if(id==8){ return "pink" }
            else if(id==9){ return "brown" }
            else if(id==10){ return "slateblue" }
            else if(id==11){ return "chocolate" }
            else if(id==12){ return "orange" }
            else if(id==13){ return "cyan" }
            else if(id==14){ return "magenta" }
            else if(id==15){ return "steelblue" }
            else if(id==16){ return "silver" }
            else if(id==17){ return "khaki" }
            else if(id==18){ return "lightgreen" }
            else if(id==19){ return "purple" };}) 
      .on("mouseover", function(d) {

        div_legend.transition()
        .duration(200)
        .style("opacity", .9);
   div_legend.html(" Date : " + moment(d.index).toDate() + " Location : " + d.location)
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
          
      })
      .on("mouseout", function(d) {
          div_legend.transition()
               .duration(800)
               .style("opacity", 0);
      });

      // svg_power_count.append("rect").attr("x",300).attr("y",0).attr("width",10).attr("height",10).style("fill", "gold")
      // svg_power_count.append("rect").attr("x",300).attr("y",20).attr("width",10).attr("height",10).style("fill", "blue")
      // svg_power_count.append("rect").attr("x",300).attr("y",40).attr("width",10).attr("height",10).style("fill", "green")
      // svg_power_count.append("rect").attr("x",300).attr("y",60).attr("width",10).attr("height",10).style("fill", "yellow")
      // svg_power_count.append("rect").attr("x",300).attr("y",80).attr("width",10).attr("height",10).style("fill", "darkcyan")
      // svg_power_count.append("rect").attr("x",300).attr("y",100).attr("width",10).attr("height",10).style("fill", "grey")
      // svg_power_count.append("rect").attr("x",300).attr("y",120).attr("width",10).attr("height",10).style("fill", "darkgreen")
      // svg_power_count.append("rect").attr("x",300).attr("y",140).attr("width",10).attr("height",10).style("fill", "pink")
      // svg_power_count.append("rect").attr("x",300).attr("y",160).attr("width",10).attr("height",10).style("fill", "brown")
      // svg_power_count.append("rect").attr("x",300).attr("y",180).attr("width",10).attr("height",10).style("fill", "slateblue")
      // svg_power_count.append("rect").attr("x",300).attr("y",200).attr("width",10).attr("height",10).style("fill", "chocolate")
      // svg_power_count.append("rect").attr("x",300).attr("y",220).attr("width",10).attr("height",10).style("fill", "orange")
      // svg_power_count.append("rect").attr("x",300).attr("y",240).attr("width",10).attr("height",10).style("fill", "cyan")
      // svg_power_count.append("rect").attr("x",300).attr("y",260).attr("width",10).attr("height",10).style("fill", "magenta")
      // svg_power_count.append("rect").attr("x",300).attr("y",280).attr("width",10).attr("height",10).style("fill", "steelblue")
      // svg_power_count.append("rect").attr("x",300).attr("y",300).attr("width",10).attr("height",10).style("fill", "silver")
      // svg_power_count.append("rect").attr("x",300).attr("y",320).attr("width",10).attr("height",10).style("fill", "khaki")
      // svg_power_count.append("rect").attr("x",300).attr("y",340).attr("width",10).attr("height",10).style("fill", "lightgreen")
      // svg_power_count.append("rect").attr("x",300).attr("y",360).attr("width",10).attr("height",10).style("fill", "purple")
      
      // svg_power_count.append("text").attr("x",320).attr("y",5).text("PALACE HILLS").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",25).text("NORTHWEST").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",45).text("OLD TOWN").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",65).text("SAFE TOWN").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",85).text("SOUTHWEST").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",105).text("DOWNTOWN").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",125).text("WILSON FOREST").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",145).text("SCENIC VISTA").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",165).text("BROADVIEW").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",185).text("CHAPPARAL").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",205).text("TERRAPIN SPRINGS").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",225).text("PEPPER MILL").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",245).text("CHEDDARFORD").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",265).text("EASTON").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",285).text("WESTON").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",305).text("SOUTHTON").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",325).text("OAK WILLOW").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",345).text("EAST PARTON").style("font-size", "10px").attr("alignment-baseline","middle")
      // svg_power_count.append("text").attr("x",320).attr("y",365).text("WEST PARTON").style("font-size", "10px").attr("alignment-baseline","middle")

      svg_power_count.append("text")
            .attr('class','title')
            .attr("x", width_power_count/2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
           

      svg_power_count.append("text")
            .attr("transform", "translate(" + (width_power_count/2) + " ," + (height_power_count+30) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "10px")
            .text("Time of Day");
        
      svg_power_count.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height_power_count/2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .style("font-size", "10px")
            .text("Number of Complaints");

      
      svg_power_count.on("dblclick",function(){
              x.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_power.transition().call(d3.axisBottom(x))
              line
                .select('.line')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.count) })
              )
            });


  // draw legend
  // var legend = svg_power_count.selectAll(".legend")
  //     .data(color.domain())
  //   .enter().append("g")
  //     .attr("class", "legend")
  //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // // draw legend colored rectangles
  // legend.append("rect")
  //     .attr("x", width_power_count - 18)
  //     .attr("width", 18)
  //     .attr("height", 18)
  //     .style("fill", color);

  // // draw legend text
  // legend.append("text")
  //     .attr("x", width_power_count - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .text(function(d) { console.log(d);return d;})
});
