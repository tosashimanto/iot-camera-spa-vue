<template>
  <section class="container posts-page">
    <div>
      <svg id="graph-svg" :width="width" :height="height"></svg>

    </div>
  </section>
</template>

<script>

  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

  const d3 = require('d3');
  const topojson = require('topojson')

  // 1. データの準備
  var dataset = [
    [5, 20],
    [25, 67],
    [85, 21],
    [100, 33],
    [220, 88],
    [250, 50],
    [330, 95],
    [410, 12],
    [475, 44],
    [480, 90]
  ];


  var margin = { "top": 30, "bottom": 60, "right": 30, "left": 60 };


  export default {

    data() {
      return {
        width: 800,
        height: 600,
        r: 75,
        map: {
          id: "#graph-svg",
          width: 1024,
          height: 800,
          r: 75,
          scale: 1600
        }
      }
    },

    mounted() {
      console.log("d3 mounted start")


      // 2. SVG領域の設定
      const svg = d3.select("#graph-svg").attr("width", this.width).attr("height", this.height);


      // 3. 軸スケールの設定
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([margin.left, this.width - margin.right]);

      var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
        .range([this.height - margin.bottom, margin.top]);

      // 4. 軸の表示
      var axisx = d3.axisBottom(xScale).ticks(5);
      var axisy = d3.axisLeft(yScale).ticks(5);

      // X Label
      svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (this.height - margin.bottom) + ")")
        .call(axisx)
        .append("text")
        .attr("fill", "black")
        .attr("x", (this.width - margin.left - margin.right) / 2 + margin.left)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("font-size", "10pt")
        .attr("font-weight", "bold")
        .text("X Label");

      // Y Label
      svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .call(axisy)
        .append("text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("x", -(this.height - margin.top - margin.bottom) / 2 - margin.top)
        .attr("y", -35)
        .attr("transform", "rotate(-90)")
        .attr("font-weight", "bold")
        .attr("font-size", "10pt")
        .text("Y Label");

      // 5. ラインの表示
      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d[0]); })
          .y(function(d) { return yScale(d[1]); }));

    }

  }

</script>

<style>
  .state {
    fill: #555;
    stroke: #000;
  }

  .state:hover {
    fill: steelblue;
  }
</style>
