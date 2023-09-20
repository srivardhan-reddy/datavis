let canvas_treemap_wihout_date = d3.select('#canvas_treemap_wihout_date')
                .attr("width", 700)
                .attr("height", 500)
let df_aggregate_mean_without_date

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(df_aggregate_mean_without_date, (node) => {
        return node['Children']
    }).sum((node) => {
        return node['value']
    })

    let createTreeMap = d3.treemap()
                            .size([700,500])
                            .padding(10)
                            .paddingInner(2);

    createTreeMap(hierarchy)
    let tiles = hierarchy.leaves()
    //console.log(tiles)

    var color = d3.scaleOrdinal()
    .domain([1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
    .range([ "rgb(0, 139, 216)", "rgb(0, 174, 88)", "rgb(239, 39, 48)","rgb(52, 43, 0)","rgb(202, 99, 117)","rgb(194, 44, 6)",
    "rgb(225, 187, 30)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)",
    "rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)","rgb(252, 143, 50)"])

    let block = canvas_treemap_wihout_date.selectAll('g')
                        .data(tiles)
                        .enter()
                        .append('g')
                        .attr('transform' , (t) => {
                            return 'translate( ' + t['x0'] + ', ' + t['y0'] + ')'
                        })
    block.append('rect')
            .attr('class','tile')
            .attr('fill',(t) => {
                let category = t['parent']['data']['Name']
                if (category===1){
                    return "rgb(0, 174, 88)"
                }
                else if (category === 2){
                    return "rgb(0, 139, 216)"
                }
                else if (category === 3){
                    return "rgb(239, 39, 48)"
                }
                else if (category===4){
                    return "rgb(52, 143, 50)"
                }
                else if (category===5){
                    return "rgb(202, 99, 117)"
                }
                else if (category===6){
                    return "rgb(194, 44, 6)"
                }
                else if (category===7){
                    return "rgb(225, 187, 30)"
                }
                else if (category===8){
                    return "rgb(115, 171, 141)"
                }
                else if (category===9){
                    return "rgb(177, 190, 182)"
                }
                else if (category===10){
                    return "rgb(59, 246, 200)"
                }
                else if (category===11){
                    return "rgb(103, 53, 220)"
                }
                else if (category===12){
                    return "rgb(52, 156, 0)"
                }
                else if (category===13){
                    return "rgb(152, 178, 184)"
                }
                else if (category===14){
                    return "rgb(177, 71, 37)"
                }
                else if (category===15){
                    return "rgb(206, 170, 53)"
                }
                else if (category===16){
                    return "rgb(201, 32, 71)"
                }
                else if (category===17){
                    return "rgb(231, 163, 119)"
                }
                else if (category===18){
                    return "rgb(186, 26, 151)"
                }
                else if (category===19){
                    return "rgb(11, 179, 189)"
                }
            })
            .attr('data-name',(t) => {
                return t['data']['Name']
            })
            .attr('data-category', (t) => {
                return t['parent']['data']['Name']
            })
            .attr('data-value', (t)=>{
                return t['data']['value']
            })
            .attr('width', (t)=>{
                return t['x1'] - t['x0']
            })
            .attr('height', (t)=> {
                return t['y1'] - t['y0']
            })
            .attr('padding',5)
            .attr('stroke','black')
            .attr('stroke-width',1)

    block.append('text')
            .text((t) => {
                return t['data']['Name']
            })
            .attr('x',function() {
                const parentData = d3.select(this.parentNode).datum();
                return ((parentData.x1 - parentData.x0) / 2)-30;})
            .attr('y',function() {
                const parentData = d3.select(this.parentNode).datum();
                return (parentData.y1 - parentData.y0) / 2;})
            .attr("font-size", "8px")
            .attr('font-weight',100)

    canvas_treemap_wihout_date.selectAll('titles')
            .data(hierarchy.descendants().filter(function(d){return d.depth==1 }))
            .enter()
            .append("text")
              .attr("x", function(d){ return d.x0})
              .attr("y", function(d){ return d.y0+6})
              .text(function(d){return d.data.Name })
              .attr("font-size", "19px")
              .attr("fill",  function(d){ return color(d.data.Name)} )

        
}



d3.json('df_aggregate_mean_without_date.json').then((data,error) => {
    if(error){
        console.log(error)
    }
    else{
        df_aggregate_mean_without_date = data
        //console.log(df_aggregate_mean_without_date)
        drawTreeMap()
    }
})