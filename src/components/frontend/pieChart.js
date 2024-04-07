import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const pieData = d3.pie().value((d) => d.value)(
      Object.entries(data).map(([key, value]) => ({ key, value }))
    );

    const colorMap = {
      203: "green",
      211: "#ff4500",
      231: "#FFA500", //Orange
      202: "dodgerblue",
      195: "slategray",
      213: "blue",
    };

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);

    console.log(ref.current);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg.attr("width", 400).attr("height", 200);

    // Create a group for each slice
    const groups = svg
      .append("g")
      .attr("transform", "translate(100, 100)")
      .selectAll("g")
      .data(pieData)
      .enter()
      .append("g");

    groups
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => colorMap[d.data.key])
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    groups
      .append("text")
      .text((d) => `${d.data.key}`)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "17px");

    // svg
    //   .append("circle")
    //   .attr("cx", 2)
    //   .attr("cy", 2)
    //   .attr("r", 40)
    //   .style("fill", "blue")
    //   .attr("transform", "translate(200, 100)");

    svg
      .append("rect")
      .attr("x", 2)
      .attr("y", 2)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "blue")
      .attr("transform", "translate(200, 100)");
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
