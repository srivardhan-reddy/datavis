var margin_bar_graph_without_mean = {top: 30, right: 30, bottom: 70, left: 60},
    width = 660 - margin_bar_graph_without_mean.left - margin_bar_graph_without_mean.right,
    height = 600 - margin_bar_graph_without_mean.top - margin_bar_graph_without_mean.bottom;

var svg_bar_graph_without_mean = d3.select("#canvas_bar_graph_mean")
                                    .attr("width", width + margin_bar_graph_without_mean.left + margin_bar_graph_without_mean.right)
                                    .attr("height", height + margin_bar_graph_without_mean.top + margin_bar_graph_without_mean.bottom)
                                    .append("g")
                                    .attr("transform",
                                        "translate(" + margin_bar_graph_without_mean.left + "," + margin_bar_graph_without_mean.top + ")");

let data
let location_selected
let final_data_by_location
let final_attribute

function myFunction() {
    
    location_selected = document.getElementById('location').value;
    console.log(location_selected)
    final_data_by_location = data.filter(x => x['location']==location_selected)
    console.log(final_data_by_location)
    final_attribute = document.getElementById('report').value;
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
            data = alldata.filter(x => x['location']==location_selected)
            data.sort((a,b)=>{
                       return new Date(b.date) - new Date(a.date);
            })
            console.log(data)
            x.domain(data.map(function(d) { return d.date; }))
            xAxis.transition().duration(1000).call(d3.axisBottom(x))

            // Add Y axis
            y.domain([0, d3.max(data, function(d) { return +d[final_attribute] }) ]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y));
            
            var u = svg_bar_graph_without_mean.selectAll("rect")
                .data(data)

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
                    .attr("fill", "steelblue")
        }
    })
}
drawbargraph(1,'shake_intensity_mean')
// let drawbargraph = () => {

//     final_data_by_location.sort((a,b)=>{
//         return new Date(b.date) - new Date(a.date);
//     })
    
//     var x = d3.scaleBand()
//         .range([ 0, width ])
//         .domain(final_data_by_location.map(function(d) {return d.date; }))
//         .padding(0.2);
//     svg_bar_graph_without_mean.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//     var y = d3.scaleLinear()
//             .domain([0,d3.max(final_data_by_location,function(d){return +d[final_attribute];})]).nice()
//             .range([ height, 0]);
//     svg_bar_graph_without_mean.append("g")
//         .attr("class", "myYaxis")
//         .call(d3.axisLeft(y));

//     console.log(final_attribute)
//     function update(final_data_by_location) {

//         var u = svg_bar_graph_without_mean.selectAll("rect")
//             .data(final_data_by_location)
        
//         u
//         .enter()
//         .append("rect")
//         .merge(u)
//         .transition()
//         .duration(500)
//         .attr("x", function(d) { return x(d.date); })
//         .attr("y", function(d) { return y(d[final_attribute]); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d[final_attribute]); })
//         .attr("fill", "steelblue")
//         }
//         update(data)
    
// }


// d3.csv("df_aggregate_mean.csv").then((d,error) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         data = d
//         //console.log(data)
//         final_attribute="shake_intensity_mean"
//         final_data_by_location = data
//         drawbargraph()

//     }
// })

