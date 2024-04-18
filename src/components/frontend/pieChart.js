import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const pieData = d3.pie().value((d) => d.value)(
      Object.entries(data).map(([key, value]) => ({ key, value }))
    );

    console.log(data);

    const colorMap = {
      203: "green",
      211: "#ff4500",
      231: "#FFA500", //Orange
      202: "dodgerblue",
      195: "slategray",
      213: "blue",
    };

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);

    //console.log(ref.current);

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

    // groups
    //   .append("text")
    //   .text(` ${pieData[0].data.value}`)
    //   .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
    //   .style("text-anchor", "middle")
    //   .style("font-size", "17px");

    // svg
    //   .append("circle")
    //   .attr("cx", 2)
    //   .attr("cy", 2)
    //   .attr("r", 40)
    //   .style("fill", "blue")
    //   .attr("transform", "translate(200, 100)");

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 10)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "green")
      .attr("transform", "translate(200, 100)");

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 30)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "#FFA500")
      .attr("transform", "translate(200, 100)");

    groups
      .append("text")
      // .text((d) => `Final Finish Amt ${d.data.value}`)
      .text(`Final Finish Amt: ${pieData[0].data.value}`)
      .attr("x", 140)
      .attr("y", 20);

    groups
      .append("text")
      // .text((d) => `Final Finish Amt ${d.data.value}`)
      .text(`Returns Amt: ${pieData[1].data.value}`)
      .attr("x", 140)
      .attr("y", 40);

    groups
      .append("text")
      // .text((d) => `Final Finish Amt ${d.data.value}`)
      .text(
        `::${(
          (pieData[0].data.value /
            (pieData[0].data.value + pieData[1].data.value)) *
          100
        ).toFixed(2)}%`
      )
      .attr("x", 70)
      .attr("y", 75);

    // svg.append("text").text(`${data.value}`).attr("x", 240).attr("y", 140);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
