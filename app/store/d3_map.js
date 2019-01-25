export const state = () => ({
  map_json: {},
  d3_map :{
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

    const map_json = await this.$axios.$get(`http://localhost:8080/d3_map/us.json`)
    commit('setMapJSON', {map_json})
  },

  async getTestJSON({commit}) {

    const map_json = await this.$axios.$get(`http://localhost:8080/d3_map/us.json`)
    return map_json
  },

  createMap({ commit }, svg, japan) {
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
