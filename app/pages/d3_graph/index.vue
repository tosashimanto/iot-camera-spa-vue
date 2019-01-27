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



      // function draw(data, country) {
      //
      //   var data = data[country];
      //
      //   // format the data
      //   data.forEach(function (d) {
      //     d.Date = parseTime(d.Date);
      //     d.Imports = +d.Imports;
      //     d.Exports = +d.Exports;
      //   });
      //
      //   // sort years ascending
      //   data.sort(function (a, b) {
      //     return a["Date"] - b["Date"];
      //   })
      //
      //   // Scale the range of the data
      //   x.domain(d3.extent(data, function (d) {
      //     return d.Date;
      //   }));
      //   y.domain([0, d3.max(data, function (d) {
      //     return Math.max(d.Imports, d.Exports);
      //   })]);
      //
      //   // Add the valueline path.
      //   svg.append("path")
      //     .data([data])
      //     .attr("class", "line")
      //     .attr("d", valueline);
      //   // Add the valueline path.
      //   svg.append("path")
      //     .data([data])
      //     .attr("class", "line")
      //     .attr("d", valueline2);
      //   // Add the X Axis
      //   svg.append("g")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(d3.axisBottom(x));
      //
      //   // Add the Y Axis
      //   svg.append("g")
      //     .call(d3.axisLeft(y));
      // }

      this.setLineGraph()
      // // Get the data
      // d3.json("data.json", function (error, data) {
      //   if (error) throw error;
      //
      //   // trigger render
      //   draw(data, "Afghanistan");
      // });

    },

    methods: {

      ...mapActions('d3_graph', ['setLineGraph'])
    }
  }

</script>

<style> /* set the CSS */

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
