import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {


    
    const pieData = d3.pie().value(d => d.value)(Object.entries(data).map(([key, value]) => ({ key, value })));

    const colorMap = {
        203: 'green',
        211: '#orangered',
        231: '#orange',
        202: 'dodgerblue',
        195: 'slategray',
        213: 'blue'
      };

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);
    const color = (key) => colorMap[key]
    //console.log(color);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    svg
      .attr('width', 200)
      .attr('height', 200)
      .append('g')
      .attr('transform', 'translate(100, 100)')
      .selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => color(d.data.key.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Optional: Add labels, tooltips, etc. here

  }, [data]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
