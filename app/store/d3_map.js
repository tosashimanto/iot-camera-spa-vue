// import d3 from 'd3'
const d3 = require('d3');
const topojson = require('topojson')


export const state = () => ({
  map_json: {},
  d3_map: {
    width: null,
    height: null
  }
})

export const getters = {
  map_json: state => state.map_json,
}

export const mutations = {

  setMapJSON(state, {map_json}) {
    console.log("setMapJSON")
    map_json = map_json
    console.log("map_json=", map_json)
  },
  setD3Map(state, {width, height}) {
    console.log("setD3Map")
    d3_map.width = width
    d3_map.height = height

  },

}

export const actions = {


  async getMapJSON({commit}) {

    const map_json = await this.$axios.$get(`http://localhost:8080/d3_map/us.topojson`)
    commit('setMapJSON', {map_json})
  },


  async setWorldJSONMap({commit}, id_name) {
    var projection = d3.geoAlbersUsa();
    var path = d3.geoPath().projection(projection);
    const svg = d3.select(id_name);
    svg.append('circle')
      .attr('cx', 80)
      .attr('cy', 100)
      .attr('r', this.r)
      .style('fill', 'rgba(255, 0, 0, 0.5)')


    this.$axios.get('http://localhost:8080/d3_map/world110.topojson')
      .then(function (response) {

        const world = response.data
        const aProjection = d3
          .geoMercator()
          // .center([136.0, 35.6])
          .translate([1024 / 2, 800 / 2])
          .scale(120);
        const geoPath = d3.geoPath().projection(aProjection);

        const g = svg.append('g');
        g.selectAll('.state')
          .data(topojson.feature(world, world.objects.world110).features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", geoPath)

        // .style("stroke", "red")
        // .style("stroke-width", 0.1)
        // .style("fill", "#00ffff");

      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async setJapanJSONMap({commit}, map) {
    console.log("setJapanJSONMap")
    const svg = d3.select(map.id);
    svg.append('circle')
      .attr('cx', 280)
      .attr('cy', 100)
      .attr('r', 50)
      .style('fill', 'rgba(255, 255, 0, 0.5)')

    const map_param = {}
    map_param.width = map.width
    map_param.height = map.height
    map_param.scale = map.scale


    console.log("map.width1=", map.width)
    this.$axios.get('http://localhost:8080/d3_map/japan.json')
      .then(function (response) {


        const japan = response.data
        const aProjection = d3.geoMercator()
          .center([136.0, 35.6])
          .translate([map_param.width / 2, map_param.height / 2])
          .scale(map_param.scale);
        const geoPath = d3.geoPath().projection(aProjection);

        //マップ描画
        const map = svg.selectAll("path").data(japan.features)
          .enter()
          .append("path")
          .attr("d", geoPath)
          .style("stroke", "#ffffff")
          .style("stroke-width", 0.1)
          .style("fill", "#5EAFC6")

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

  async setUSJSONMap({commit}, id_name) {
    var projection = d3.geoAlbersUsa();
    var path = d3.geoPath().projection(projection);
    const svg = d3.select(id_name);
    svg.append('circle')
      .attr('cx', 80)
      .attr('cy', 100)
      .attr('r', this.r)
      .style('fill', 'rgba(255, 0, 0, 0.5)')


    this.$axios.get('http://localhost:8080/d3_map/us.topojson')
      .then(function (response) {

        const us = response.data
        const g = svg.append('g');
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


  createMap({commit}, svg, japan) {
    var aProjection = d3.geoMercator()
      .center([136.0, 35.6])
      .translate([width / 2, height / 2])
      .scale(scale);
    var geoPath = d3.geoPath().projection(aProjection);

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
  }
}
