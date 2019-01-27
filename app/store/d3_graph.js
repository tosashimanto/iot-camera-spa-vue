const d3 = require('d3');


export const state = () => ({})


export const getters = {}

export const mutations = {}

export const actions = {


  async setLineGraph({commit}, d3_graph) {

    this.$axios.get('http://localhost:8080/d3_graph/line_graph_data.json')
      .then(function (response) {
        drawLineGraph(d3_graph, response.data, "Test country");
      })
      .catch(function (error) {
        console.log(error);
      });
  },


}

function drawLineGraph(d3_graph, data, country) {
  const margin = d3_graph.margin,
     width = d3_graph.width,
     height = d3_graph.height;

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const valueline = d3.line()
    .x(function (d) {
      return x(d.Date);
    })
    .y(function (d) {
      return y(d.Imports);
    });
  // define the line
  const valueline2 = d3.line()
    .x(function (d) {
      return x(d.Date);
    })
    .y(function (d) {
      return y(d.Exports);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3.select("#graph-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  var data = data[country];

  // parse the date / time
  const parseTime = d3.timeParse("%Y");

  // format the data
  data.forEach(function (d) {
    d.Date = parseTime(d.Date);
    d.Imports = +d.Imports;
    d.Exports = +d.Exports;
  });

  // sort years ascending
  data.sort(function (a, b) {
    return a["Date"] - b["Date"];
  })

  // Scale the range of the data
  x.domain(d3.extent(data, function (d) {
    return d.Date;
  }));
  y.domain([0, d3.max(data, function (d) {
    return Math.max(d.Imports, d.Exports);
  })]);

  // Add the value line path.
  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

  // Add the value line path.
  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
