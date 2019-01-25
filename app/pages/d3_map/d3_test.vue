<template>
  <section class="container posts-page">
    <div id="vue">
      <svg id="circle-001" :width="width" :height="height"></svg>
      <div>r: {{ r }}</div>
    </div>
  </section>
</template>

<script>

  import {mapGetters} from 'vuex'

  const d3 = require('d3');
  const topojson = require('topojson')

  export default {
    data() {
      return {
        width: 500,
        height: 500,
        r: 175
      }
    },

    mounted(){
      var svg = d3.select('#circle-001');
      this.circle = svg.append('circle')
        .attr('cx', this.width/2)
        .attr('cy', this.height/2)
        .attr('r', this.r)
        .style('fill','rgba(255, 0, 0, 0.8)')
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
