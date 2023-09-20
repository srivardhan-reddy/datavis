let canvas_map = d3.select("#canvas_map")
                    .attr("width", 500)
                    .attr("height", 400)
let tooltip = d3.select("#tooltip_map")

var colorScale = d3.scaleLinear()
                .domain([0,1,2,3,4,5])
                .range(d3.schemeBlues[5]);

let st_himark_map_data
let projection

let drawmap = () => {
    canvas_map.selectAll('path')
                .data(st_himark_map_data.features)
                .enter()
                .append('path')
                .attr('d',d3.geoPath().projection(projection))
                .attr('class','State')
                .attr('fill', "steelblue")
                .attr('id', (item)=> {
                    return item.properties.Id
                })
                .attr('name', (item) => {
                    return item.properties.Nbrhood
                })
                .on('click', function(d){ console.log(d.properties.Id);})


}

d3.json("map.geo.json").then((data,error) =>{
    if(error){
        console.log(error)
    }
    else{
        st_himark_map_data = data
        projection = d3.geoMercator().fitSize([300,300],data)
        console.log(st_himark_map_data)
        drawmap()
    }
})