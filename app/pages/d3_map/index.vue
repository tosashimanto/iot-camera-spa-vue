<template>
  <section class="container posts-page">
    <div>
      <svg id="circle-001" :width="width" :height="height"></svg>
      <div>r: {{ r }}</div>
      <div>
        <el-button type="primary" @click="handleClickMap">Test</el-button>
      </div>
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
        width: 600,
        height: 400,
        r: 75
      }
    },

    computed: {
      line() {

      }
    },

    //async asyncData({store, route}) {
    mounted() {
      console.log("d3 mounted start")

      // var v = this;
      // var svg = d3.select('#circle-test');
      // var svg = d3.select(this.$el);
      // var width = +svg.attr('width');
      // var height = +svg.attr('height');
      // //
      // console.log("d3 width=", width)
      // console.log("d3 height=", height)
      console.log("d3 svg=", svg)
      // var projection = d3.geoAlbersUsa();
      // var path = d3.geoPath().projection(projection);

      // await store.dispatch('d3_map/getMapJSON')

      // console.log("test001=", store.getters('d3_map', ['map_json']))
      // store.dispatch('images/getUsJson')


      var svg = d3.select('#circle-001');
      this.circle = svg.append('circle')
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .attr('r', this.r)
        .style('fill', 'rgba(0, 0, 0, 0.8)')

      // d3.json("us.json", function (error, us) {
      //   console.log("*****************************************************")
      //   console.log("error=", error)
      //   console.log("us=", us)
      //   var g = svg.append('g');
      //   g.selectAll('.state')
      //     .data(topojson.feature(us, us.objects.usStates).features)
      //     .enter()
      //     .append("path")
      //     .attr("class", "state")
      //     .attr("d", path)
      //     .on('mouseover', function (d) {
      //       v.$emit('stateSelected', d.properties.STATE_ABBR)
      //     })
      //     .on('mouseout', function (d) {
      //       v.$emit('stateDeselected', d.properties.STATE_ABBR)
      //     })
      //   g.attr('transform', 'scale(0.57)')
      // });
      console.log("==============================================")

    },

    methods: {
      handleClickMap() {
        console.log("handleClickMap")

        var svg = d3.select('#circle-001');
        svg.append('circle')
          .attr('cx', 80)
          .attr('cy', 100)
          .attr('r', this.r)
          .style('fill', 'rgba(255, 0, 0, 0.5)')
      },
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
