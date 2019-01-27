<template>
  <section class="container posts-page">
    <div>
      <svg id="graph-svg" :width="d3_graph.width" :height="d3_graph.height"></svg>
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
        d3_graph: {
          id: "#graph-svg",
          width: 960,
          height: 500,
          margin: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50,
          }
        }
      }
    },

    computed: {
    },

    mounted() {
      const w = this.d3_graph.width - this.d3_graph.margin.left - this.d3_graph.margin.right
      const h = this.d3_graph.height - this.d3_graph.margin.top - this.d3_graph.margin.bottom
      this.d3_graph.width = w
      this.d3_graph.height = h
      this.setLineGraph(this.d3_graph)

    },

    methods: {
      ...mapActions('d3_graph', ['setLineGraph'])
    }
  }

</script>

<style>

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
