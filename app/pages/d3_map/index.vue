<template>
  <section class="container posts-page">
    <div>
      <svg id="circle-001" :width="width" :height="height"></svg>
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

      var projection = d3.geoAlbersUsa();
      var path = d3.geoPath().projection(projection);

      // await store.dispatch('d3_map/getMapJSON')

      // console.log("test001=", store.getters('d3_map', ['map_json']))
      // store.dispatch('images/getUsJson')


      const svg = d3.select('#circle-001');
      this.circle = svg.append('circle')
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .attr('r', this.r)
        .style('fill', 'rgba(0, 0, 0, 0.8)')

      // d3.json('http://localhost:8080/d3_map/us.json', function (error, us) {
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

    async asyncData({store, route}) {
      var projection = d3.geoAlbersUsa();
      var path = d3.geoPath().projection(projection);
      const svg = d3.select('#circle-001');

      const japan = await store.dispatch('d3_map/getTestJSON')
      console.log("tttttttttttttt")
      console.log("japan", japan)


      var g = svg.append('g');
      //マップ描画
      // var map = g.selectAll("path").data(japan.features)
      //    .enter()
      //   .append("path")
      //   .attr("d", path)
      //   .style("stroke", "#ffffff")
      //   .style("stroke-width", 0.1)
      //   .style("fill", "#5EAFC6");

      // const us =  await store.dispatch('d3_map/getTestJSON')
      // const t = {
      //   abc:"123"
      // }
      // console.log("------", us)
      // d3.json('http://localhost:8080/d3_map/us.json', function (error, us) {
      //   if (error) throw error;
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

    },

    methods: {
      handleClickUsMap() {
        console.log("handleClickMap")

        var projection = d3.geoAlbersUsa();
        var path = d3.geoPath().projection(projection);
        const svg = d3.select('#circle-001');
        svg.append('circle')
          .attr('cx', 80)
          .attr('cy', 100)
          .attr('r', this.r)
          .style('fill', 'rgba(255, 0, 0, 0.5)')


        this.$axios.get('http://localhost:8080/d3_map/us.json')
          .then(function (response) {

            var us = response.data

            var g = svg.append('g');
            g.selectAll('.state')
              .data(topojson.feature(us, us.objects.usStates).features)
              .enter()
              .append("path")
              .attr("class", "state")
              .attr("d", path)
              .on('mouseover', function (d) {
                v.$emit('stateSelected', d.properties.STATE_ABBR)
              })
              .on('mouseout', function (d) {
                v.$emit('stateDeselected', d.properties.STATE_ABBR)
              })
            g.attr('transform', 'scale(0.57)')
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      handleClickJapanMap() {
        console.log("handleClickJapanMap")

        // var projection = d3.geoAlbersUsa();
        // var path = d3.geoPath().projection(projection);
        const svg = d3.select('#circle-001');
        svg.append('circle')
          .attr('cx', 80)
          .attr('cy', 100)
          .attr('r', this.r)
          .style('fill', 'rgba(255, 0, 0, 0.5)')


        this.$axios.get('http://localhost:8080/d3_map/japan.json')
          .then(function (response) {

            var width = 600,
              height = 600;
            var scale = 1600;

            // const japan = this.getTestJSON()
            var japan = response.data
            var aProjection = d3.geoMercator()
              .center([136.0, 35.6])
              .translate([width / 2, height / 2])
              .scale(scale);
            var geoPath = d3.geoPath().projection(aProjection);
            // var svg = d3.select("svg").attr("width", width).attr("height", height);

            //マップ描画
            var map = svg.selectAll("path").data(japan.features)
              .enter()
              .append("path")
              .attr("d", geoPath)
              .style("stroke", "#ffffff")
              .style("stroke-width", 0.1)
              .style("fill", "#5EAFC6");

            //ズームイベント設定
            var zoom = d3.zoom().on('zoom', function () {
              aProjection.scale(scale * d3.event.transform.k);
              map.attr('d', geoPath);
            });
            svg.call(zoom);

            //ドラッグイベント設定
            var drag = d3.drag().on('drag', function () {
              var tl = aProjection.translate();
              aProjection.translate([tl[0] + d3.event.dx, tl[1] + d3.event.dy]);
              map.attr('d', geoPath);
            });
            map.call(drag);
          });
      },

      test(us) {
        var projection = d3.geoAlbersUsa();
        var path = d3.geoPath().projection(projection);
        const svg = d3.select('#circle-001');
        var g = svg.append('g');
        g.selectAll('.state')
          .data(topojson.feature(us, us.objects.usStates).features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path)
          .on('mouseover', function (d) {
            v.$emit('stateSelected', d.properties.STATE_ABBR)
          })
          .on('mouseout', function (d) {
            v.$emit('stateDeselected', d.properties.STATE_ABBR)
          })
        g.attr('transform', 'scale(0.57)')
      },

      ...mapActions('d3_map', ['createMap', 'getTestJSON']),
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
