var candyMagnetSVG = d3.select('svg.candymagnet');
var candyMapSVG = d3.select("div#candyMapContainer")
   .append("div")
   .classed("svg-container-left", true) //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 600 450")
   //class to make it responsive
   .classed("svg-content-responsive", true);

  // candyMapSVG.append("rect")
  //       .attr("width", "100%")
  //       .attr("height", "100%")
  //       .attr("fill", "white");

   var candyDetailsSVG = d3.select("div#candyDetailsContainer")
      .append("div")
      .classed("svg-container-right", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
    //   .attr("viewBox", "0 0 600 200")
        .attr('width', '100%')
        .attr('height', '100%')
      //class to make it responsive
      .classed("svg-content-responsive", true);

var keys = {country: 'Q4_COUNTRY', state: 'Q5_STATE_PROVINCE_COUNTY_ETC'};
var feelings = {joy: 'JOY', meh: 'MEH', despair: 'DESPAIR'};

var candyDataToCandyName = {
    Q6_Butterfinger: "Butterfinger",
    Q6_Candy_Corn: "Candy Corn",
    Q6_Chiclets: "Chiclets",
    Q6_Dots: "Dots",
    Q6_Fuzzy_Peaches: "Fuzzy Peaches",
    Q6_Good_N_Plenty: "Good & Plenty",
    Q6_Gummy_Bears_straight_up: "Gummy Bears",
    Q6_Healthy_Fruit: "Healthy Fruit",
    Q6_Heath_Bar: "Heath Bar",
    Q6_Hershey_s_Dark_Chocolate: "Hershey's Dark Chocolate",
    Q6_Hershey_s_Kisses: "Hershey's Kisses",
    Q6_Hershey_s_Milk_Chocolate: "Hershey's Milk Chocolate",
    Q6_Jolly_Rancher_bad_flavor: "Jolly Rancher (Bad Flavor)",
    Q6_Jolly_Ranchers_good_flavor: "Jolly Rancher (Good Flavor)",
    Q6_Junior_Mints: "Junior Mints",
    Q6_Kit_Kat: "Kit Kat",
    Q6_LaffyTaffy: "Laffy Taffy",
    Q6_LemonHeads: "LemonHeads",
    Q6_Licorice_not_black: "Licorice (not black)",
    Q6_Licorice_yes_black: "Licorice (black)",
    Q6_Lollipops: "Lollipops",
    Q6_Mike_and_Ike: "Mike and Ike",
    Q6_Milk_Duds: "Milk Duds",
    Q6_Milky_Way: "Milky Way",
    Q6_Mint_Kisses: "Mint Kisses",
    Q6_Mr_Goodbar: "Mr. Goodbar",
    Q6_Nerds: "Nerds"
};

var candyToColor = {
    Q6_Butterfinger: "#fce032",
    Q6_Candy_Corn: "#e6401b",
    Q6_Chiclets: "#fbed53",
    Q6_Dots: "#f9e233",
    Q6_Fuzzy_Peaches: "Fuzzy Peaches",
    Q6_Good_N_Plenty: "Good & Plenty",
    Q6_Gummy_Bears_straight_up: "Gummy Bears",
    Q6_Healthy_Fruit: "Healthy Fruit",
    Q6_Heath_Bar: "Heath Bar",
    Q6_Hershey_s_Dark_Chocolate: "Hershey's Dark Chocolate",
    Q6_Hershey_s_Kisses: "Hershey's Kisses",
    Q6_Hershey_s_Milk_Chocolate: "Hershey's Milk Chocolate",
    Q6_Jolly_Rancher_bad_flavor: "Jolly Rancher (Bad Flavor)",
    Q6_Jolly_Ranchers_good_flavor: "Jolly Rancher (Good Flavor)",
    Q6_Junior_Mints: "Junior Mints",
    Q6_Kit_Kat: "#e92630",
    Q6_LaffyTaffy: "Laffy Taffy",
    Q6_LemonHeads: "LemonHeads",
    Q6_Licorice_not_black: "Licorice (not black)",
    Q6_Licorice_yes_black: "Licorice (black)",
    Q6_Lollipops: "Lollipops",
    Q6_Mike_and_Ike: "Mike and Ike",
    Q6_Milk_Duds: "Milk Duds",
    Q6_Milky_Way: "#1d6b20",
    Q6_Mint_Kisses: "Mint Kisses",
    Q6_Mr_Goodbar: "Mr. Goodbar",
    Q6_Nerds: "#8975b0"
};

// var drag = d3.behavior.drag()
//     .origin(function(d) { return d })
//     .on('drag', function(d, i) {
//         d.x += d3.event.dx
//         d.y += d3.event.dy
//         d3.select(this).attr("transform", function(d,i) {
//             return "translate(" + [d.x, d.y] + ")"
//         })
//     })
//     .on('dragend', function () {
//         console.log('drag ended');
//     });

// function dragmove(d) {
//     if (!d.pinch) {
//
//     }
// }

d3.csv('./data/candy.csv', function(error, dataset) {
    if (error) {
        console.error('Error while loading ./data/candy.csv dataset.');
        console.error(error);
        return;
    }

    dataByCandy = [];
    Object.keys(candyDataToCandyName).forEach(function(candy, i) {
        candyData = {};
        candyData[candy] = {joy: 0, meh: 0, despair: 0};
        dataset.forEach(function(d, j) {
            feeling = d[candy].toLowerCase();
            if (feeling) candyData[candy][feeling] += 1;
        });
        dataByCandy[i] = candyData;
    });

    dataByState = d3.nest()
        .key(function(d) {
            var country = d[keys.country];
            var state = d[keys.state];
            if (country != "United States" || country == "" || state == "") return undefined;
            return d[keys.state];
        })
        .rollup(function(state) {
            var candyFeeling = {
                'JOY': [],
                'MEH': [],
                'DESPAIR': []
            };
            Object.keys(candyFeeling).forEach(function(feeling, i) {
                candyDataArr = [];
                Object.keys(candyDataToCandyName).forEach(function(candy, i) {
                    candyData = {};
                    candyData.candy = candy;
                    candyData.value = 0;
                    candyFeeling[feeling].push(candyData)
                });
            });
            state.forEach(function(datapoint, i) {
                Object.keys(candyDataToCandyName).forEach(function(candy, i) {
                    var currFeeling = datapoint[candy];
                    if (currFeeling == 'JOY' || currFeeling == 'MEH' || currFeeling == 'DESPAIR') {
                        candyFeeling[currFeeling][i].value += 1;
                    }
                });
            });
            return candyFeeling;
        })
        .entries(dataset);

        dataByState.forEach(function(state) {
            Object.values(feelings).forEach(function(feeling) {
                state.value[feeling].sort(function(a, b) {
                    return b.value - a.value;
                })
            });
        });

        dataByState.sort(function(a,b) {
            return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);
        });
        console.log(dataByState);


    var drag = d3.drag()
        .on('drag', function(d, i) {
            var currMagnet = d3.select(this);
        //    d.x = currMagnet.x
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            currMagnet.attr('cx', d.x)
                .attr('cy', d.y);
        });
    var magnet = candyMagnetSVG.append('g')
        .attr('class', 'magnet')
        .selectAll('circle')
        .data([{x: 700, y: 400}])
        .enter()
        .append('circle')
        .attr('r', 40)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .call(drag);

    drawMap(dataByState);
});

function drawMap(data) {

    var projection = d3.geoAlbersUsa()
    .scale(700)
    .translate([300, 200]);

    // Define Path
    var path = d3.geoPath().projection(projection);

    // Define color scale. A range of color to represent different shade of the color
    // In this example, we will represent the color Blue in different shades.
    var color = d3.scaleQuantize()
        .range(["rgb(161,217,155)","rgb(116,196,118)",
            "rgb(65,171,93)","rgb(35,139,69)",
            "rgb(0,90,50)"]);

    d3.json('./data/us-states.json', function(error, json) {


        for (var i = 0; i < data.length; i++) {
            // Grab State Name
           var dataState = data[i].key;
           // Grab data value for each feeling
           var joyValue = data[i].value['JOY'][0];
           var despairValue = data[i].value['DESPAIR'][0];
           var mehValue = data[i].value['MEH'][0];
        // Find the corresponding state inside the GeoJSON
           for (var j = 0; j < json.features.length; j++)  {
               var jsonState = json.features[j].properties.name;
               if (dataState == jsonState) {
                   json.features[j].properties.top_joy = joyValue;
                   json.features[j].properties.top_meh = mehValue;
                   json.features[j].properties.top_despair = despairValue;
                   break;
               }
           }
        }

        candyMapSVG.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("class", "state-boundary")
       .attr("d", path)
       .style("fill", function(d) {
           var stateName = d.properties.name;
           var topJoy = d.properties.top_joy;
           if (!topJoy) return '#fff';
           var color = candyToColor[topJoy.candy];
           if (!color.startsWith('#')) return '#888';
           return color != undefined ? color : '#fff';
       })
       .on("mouseover", function(d) {
           d3.select(this).style('fill', '#000');
        //    console.log(d.properties.name)
       })
       .on('mouseout', function(d) {
           var topJoy = d.properties.top_joy;
           if (!topJoy) {
               d3.select(this).style('fill', '#fff');
               return;
           }
           var color = candyToColor[topJoy.candy];
           if (!color) {
               d3.select(this).style('fill', '#000');
           } else {
               if (!color.startsWith('#')) {
                   d3.select(this).style('fill', '#888');
               } else {
                   d3.select(this).style('fill', color);
               }
           }
       });
    });
}
