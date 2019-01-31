<template>
  <section class="container posts-page">
    <div>
      <svg id="circle-002" :width="width" :height="height"></svg>
      <div>r: {{ r }}</div>
      <div>
        <el-button type="primary" @click="handleClickUsMap">US Map</el-button>
        <el-button type="primary" @click="handleClickJapanMap">Japan Map</el-button>
      </div>
    </div>
  </section>
</template>

<script>

  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import cloneDeep from 'lodash.clonedeep'
  const d3 = require('d3');
  const topojson = require('topojson')


  export default {

    data() {
      return {
        width: 200,
        height: 160,
        r: 75,
        map: {
          id:"#circle-002",
          width: 200,
          height: 160,
          r: 75,
          scale : 1600
        }
      }
    },

    computed: {
      line() {

      }
    },

    mounted() {
      console.log("d3 mounted start")

      this.setJapanJSONMap(cloneDeep(this.map))

      const svg = d3.select('#circle-001');
      this.circle = svg.append('circle')
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .attr('r', this.r)
        .style('fill', 'rgba(0, 0, 0, 0.8)')

    },

    async asyncData({store, route}) {

    },

    methods: {

      handleClickUsMap() {
        console.log("handleClickMap")
        // this.setUSJSONMap('#circle-001')
        this.setWorldJSONMap('#circle-001')
      },

      handleClickJapanMap() {
        console.log("handleClickJapanMap")
        this.setJapanJSONMap('#circle-001')
      },

      ...mapActions('d3_map', ['createMap', 'setWorldJSONMap','setJapanJSONMap', 'setUSJSONMap']),
      ...mapActions('images', ['getUsJson'])
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
