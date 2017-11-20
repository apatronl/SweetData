var candyMagnetSVG = d3.select('svg.candymagnet');

var candyMapSVG = d3.select('div#candyMapContainer')
   .append('div')
   .classed('svg-container-left', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', "0 0 600 430")
   .classed('svg-content-responsive', true);

var candyBubbleSVG = d3.select('svg.candybubble');

var candyBubbleSVG = d3.select('div#candyDetailsContainer')
   .append('div')
   .classed('svg-container-bubble', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', '0 0 600 600')
   .classed('svg-content-responsive', true);

// var candyDetailsSVG = d3.select("div#candyDetailsContainer")
//     .append('div')
//     .classed("svg-container-right", true)
//     .append("svg")
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .attr("viewBox", "0 0 600 450")
//     // .attr('width', '100%')
//     // .attr('height', '600')
//     .classed("svg-content-responsive", true);

// candyDetailsSVG.append('rect')
//     .attr('width', '100%')
//     .attr('height', '100%');

var keys = {country: 'Q4_COUNTRY', state: 'Q5_STATE_PROVINCE_COUNTY_ETC'};
var feelings = {top_joy: 'JOY', meh: 'MEH', top_despair: 'DESPAIR'};

var candyData = {
    Q6_Butterfinger: {
        key: "Q6_Butterfinger",
        name: "Butterfinger",
        img: "butterfinger.png",
        imgcircle: "butterfinger-circle.png",
        id: "butterfinger",
        color: "#fce032"
    },
    Q6_Candy_Corn: {
        key: "Q6_Candy_Corn",
        name:"Candy Corn",
        img: "candycorn.jpg",
        imgcircle: "candycorn-circle.png",
        id: "candycorn",
        color: "#e6401b"
    },
    Q6_Chiclets: {
        key: "Q6_Chiclets",
        name: "Chiclets",
        img: "chiclets.jpg",
        imgcircle: "chiclets-circle.png",
        id: "chiclets",
        color: "#fbed53"
    },
    Q6_Dots: {
        key: "Q6_Dots",
        name: "Dots",
        img: "dots.jpg",
        imgcircle: "dots-circle.png",
        id: "dots",
        color: "#f9e233"
    },
    Q6_Fuzzy_Peaches: {
        key: "Q6_Fuzzy_Peaches",
        name: "Fuzzy Peaches",
        img: "fuzzypeaches.jpg",
        imgcircle: "fuzzypeaches-circle.png",
        id: "fuzzypeaches"
    },
    Q6_Good_N_Plenty: {
        key: "Q6_Good_N_Plenty",
        name: "Good & Plenty",
        img: "goodnplenty.jpg",
        imgcircle: "goodnplenty-circle.png",
        id: "goodnplenty"
    },
    Q6_Gummy_Bears_straight_up: {
        key: "Q6_Gummy_Bears_straight_up",
        name: "Gummy Bears"
    },
    Q6_Heath_Bar: {
        key: "Q6_Heath_Bar",
        name: "Heath Bar"
    },
    Q6_Hershey_s_Dark_Chocolate: {
        key: "Q6_Hershey_s_Dark_Chocolate",
        name: "Hershey's Dark Chocolate",
        img: "hersheys.jpg",
        imgcircle: "hersheys-circle.png",
        id: "hersheys"
    },
    Q6_Hershey_s_Kisses: {
        key: "Q6_Hershey_s_Kisses",
        name: "Hershey's Kisses",
        img: "kisses.jpg",
        imgcircle: "kisses-circle.png"
    },
    Q6_Hershey_s_Milk_Chocolate: {
        key: "Q6_Hershey_s_Milk_Chocolate",
        name: "Hershey's Milk Chocolate",
        img: "hersheys.jpg",
        imgcircle: "hersheys-circle.png",
        id: "hersheys"
    },
    Q6_Jolly_Rancher_bad_flavor: {
        key: "Q6_Jolly_Rancher_bad_flavor",
        name: "Jolly Rancher (Bad Flavor)",
        img: "jollyrancher.jpg",
        imgcircle: "jollyrancher-circle.png",
        id: "jollyrancher"
    },
    Q6_Jolly_Ranchers_good_flavor: {
        key: "Q6_Jolly_Ranchers_good_flavor",
        name: "Jolly Rancher (Good Flavor)"
    },
    Q6_Junior_Mints: {
        key: "Q6_Junior_Mints",
        name: "Junior Mints",
        img: "juniormints.jpg",
        imgcircle: "juniormints-circle.png",
        id: "juniormints"
    },
    Q6_Kit_Kat: {
        key: "Q6_Kit_Kat",
        name: "Kit Kat",
        img: "kitkat.jpg",
        imgcircle: "kitkat-circle.png",
        id: "kitkat",
        color: "#e92630"
    },
    Q6_LaffyTaffy: {
        key: "Q6_LaffyTaffy",
        name: "Laffy Taffy",
        img: "laffytaffy.png",
        imgcircle: "laffytaffy-circle.png",
        id: "laffytaffy"
    },
    Q6_LemonHeads: {
        key: "Q6_LemonHeads",
        name: "LemonHeads"
    },
    Q6_Licorice_not_black: {
        key: "Q6_Licorice_not_black",
        name: "Licorice",
        img: "licorice.jpg",
        imgcircle: "licorice-circle.png"
    },
    Q6_Licorice_yes_black: {
        key: "Q6_Licorice_yes_black",
        name: "Licorice (black)",
        img: "blacklicorice.jpg",
        imgcircle: "blacklicorice-circle.png",
        id: "blacklicorice"
    },
    Q6_Lollipops: {
        key: "Q6_Lollipops",
        name: "Lollipops",
        img: "lollipop.jpg",
        imgcircle: "lollipop-circle.png"
    },
    Q6_Mike_and_Ike: {
        key: "Q6_Mike_and_Ike",
        name: "Mike and Ike"
    },
    Q6_Milk_Duds: {
        key: "Q6_Milk_Duds",
        name: "Milk Duds"
    },
    Q6_Milky_Way: {
        key: "Q6_Milky_Way",
        name: "Milky Way",
        img: "milkyway.jpg",
        imgcircle: "milkyway-circle.png",
        id: "milkyway",
        color: "#1d6b20"
    },
    Q6_Mint_Kisses: {
        key: "Q6_Mint_Kisses",
        name: "Mint Kisses"
    },
    Q6_Mr_Goodbar: {
        key: "Q6_Mr_Goodbar",
        name: "Mr. Goodbar"
    },
    Q6_Nerds: {
        key: "Q6_Nerds",
        name: "Nerds",
        img: "nerds.jpg",
        imgcircle: "nerds-circle.png",
        color: "#8975b0"
    },
    Q6_Nestle_Crunch: {
        key: "Q6_Nestle_Crunch",
        name: "Crunch",
        img: "crunch.png",
        imgcircle: "crunch-circle.png"
    },
    Q6_Peanut_M_M_s: {
        key: "Q6_Peanut_M_M_s",
        name: "Peanut M&M's",
        img: "peanut-mm.jpg",
        imgcircle: "peanut-mm-circle.png",
        id: "peanutmm"
    },
    Q6_Peeps: {
        key: "Q6_Peeps",
        name: "Peeps",
        img: "peeps.jpg",
        imgcircle: "peeps-circle.png",
        id: "peeps"
    },
    Q6_Pixy_Stix: {
        name: "Pixy Stix"
    },
    Q6_Reese_s_Peanut_Butter_Cups: {
        name: "Reese's",
        img: "reeses.jpg",
        imgcircle: "reeses-circle.png",
        id: "reeses"
    },
    Q6_Reese_s_Pieces: {
        name: "Reese's Pieces",
        img: "reeses.jpg",
        id: "reesespieces"
    },
    Q6_Regular_M_Ms: {
        name: "Milk Chocolate M&M's",
        img: "mm.jpg",
        imgcircle: "mm-circle.png",
        id: "mm"
    },
    Q6_Rolos: {
        name: "Rolos",
        img: "rolo.png",
        imgcircle: "rolo-circle.png",
        id: "rolo"
    },
    Q6_Skittles: {
        name: "Skittles",
        img: "skittles.jpg",
        imgcircle: "skittles-circle.png",
        id: "skittles"
    },
    Q6_Snickers: {
        name: "Snickers",
        img: "snickers.jpg",
        imgcircle: "snickers-circle.png",
        id: "snickers"
    },
    Q6_Sourpatch_Kids_i_e_abominations_of_nature: {
        name: "Sour Patch Kids",
        img: "sour-patch-kids.jpg",
        imgcircle: "sour-patch-kids-circle.png"
    },
    Q6_Starburst: {
        name: "Starburst",
        img: "starburst.jpg",
        imgcircle: "starburst-circle.png",
        id: "starburst"
    },
    Q6_Swedish_Fish: {
        name: "Swedish Fish"
    },
    Q6_Three_Musketeers: {
        name: "3 Musketeers",
        img: "threemusketeers.jpg",
        imgcircle: "threemusketeers-circle.png",
        id: "threemusketeers"
    },
    Q6_Tic_Tacs: {
        name: "Tic Tacs"
    },
    Q6_Tolberone_something_or_other: {
        name: "Toblerone",
        img: "toblerone.png",
        imgcircle: "toblerone-circle.png",
        id: "toblerone"
    },
    Q6_Trail_Mix: {
        key: "Q6_Trail_Mix",
        name: "Trail Mix",
        img: "trailmix.jpg",
        imgcircle: "trailmix-circle.png",
        id: "trailmix"
    },
    Q6_Twix: {
        key: "Q6_Twix",
        name: "Twix",
        img: "twix.jpg",
        imgcircle: "twix-circle.png",
        id: "twix"
    },
    Q6_Whatchamacallit_Bars: {
        key: "Q6_Whatchamacallit_Bars",
        name: "Whatchamacallit Bars"
    },
    Q6_York_Peppermint_Patties: {
        key: "Q6_York_Peppermint_Patties",
        name: "York Peppermint Patties",
        img: "york-peppermint-patties.jpg",
        imgcircle: "york-peppermint-patties-circle.png",
        id: "york"
    }
};

d3.csv('./data/candy.csv', function(error, dataset) {
    if (error) {
        console.error('Error while loading ./data/candy.csv dataset.');
        console.error(error);
        return;
    }

    dataByCandy = [];
    Object.keys(candyData).forEach(function(candy, i) {
        candyDataDict = {};
        candyDataDict[candy] = {joy: 0, meh: 0, despair: 0};
        dataset.forEach(function(d, j) {
            feeling = d[candy];
            if (feeling) candyDataDict[candy][feeling.toLowerCase()] += 1;
        });
        dataByCandy[i] = candyDataDict;
    });
    console.log(dataByCandy);
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
                Object.keys(candyData).forEach(function(candy, i) {
                    candyDataDict = {};
                    candyDataDict.candy = candy;
                    candyDataDict.value = 0;
                    candyFeeling[feeling].push(candyDataDict)
                });
            });
            state.forEach(function(datapoint, i) {
                Object.keys(candyData).forEach(function(candy, i) {
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


    // var drag = d3.drag()
    //     .on('drag', function(d, i) {
    //         var currMagnet = d3.select(this);
    //     //    d.x = currMagnet.x
    //         d.x += d3.event.dx;
    //         d.y += d3.event.dy;
    //         currMagnet.attr('cx', d.x)
    //             .attr('cy', d.y);
    //     });
    // var magnet = candyMagnetSVG.append('g')
    //     .attr('class', 'magnet')
    //     .selectAll('circle')
    //     .data([{x: 700, y: 400}])
    //     .enter()
    //     .append('circle')
    //     .attr('r', 40)
    //     .attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; })
    //     .call(drag);
    var bubbleChartW = parseInt(d3.select('div#candyDetailsContainer').style('width'), 10);
    bubbleChartTitle = candyBubbleSVG.append("g")
        .append("text")
        .attr("id", "keywordTitle")
        .attr("transform", 'translate(20, 35)')
        .attr("text-anchor", "left")
        .style("font-size", (bubbleChartW / 30) + "px")
        .style("font-weight", "bold")
        .text('Click on a state to learn more about it');

    drawMap(dataByState);
});

var selectedFeeling = 'JOY';

// Map

function drawMap(data) {

    var projection = d3.geoAlbersUsa()
    .scale(700)
    .translate([300, 200]);

    // Define Path
    var path = d3.geoPath().projection(projection);

    d3.json('./data/us-states.json', function(error, json) {
        if (error) {
            console.error('Error while loading ./data/us-states.json dataset.');
            console.error(error);
            return;
        }

        for (var i = 0; i < data.length; i++) {
            // Grab State Name
           var dataState = data[i].key;
           // Grab data value for each feeling
           var joyValue = data[i].value['JOY'][0];
           var despairValue = data[i].value['DESPAIR'][0];
           var mehValue = data[i].value['MEH'][0];

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

        var defs = candyMapSVG.append('defs');
        Object.keys(candyData).forEach(function(candy) {
            if (candyData[candy].img) {
                defs.append('pattern')
                    .attr('id', function(d) { return candyData[candy].id; })
                    .attr('patternUnits', 'userSpaceOnUse')
                    .attr('width', 95.5)
                    .attr('height', 100)
                    .append('svg:image')
                    .attr('xlink:href', function(d) { return 'img/' + candyData[candy].img; })
                    .attr('width', 100)
                    .attr('height', 100)
                    .attr('x', 0)
                    .attr('y', 0);
            }
        });

        var state = candyMapSVG.selectAll('g.state')
            .data(json.features);
        var stateEnter = state.enter()
            .append('g')
            .attr('class', 'stateG');

        stateEnter.append('path')
            .attr('class', 'state-boundary')
            .attr('d', path)
            .attr('stroke', '#888')
            .attr('stroke-width', 0.8)
            .style('fill', function(d) {
                var stateName = d.properties.name;
                var topJoy = d.properties.top_joy;
                if (!topJoy) return '#888';
                var candy = topJoy.candy;
                if (candyData[candy].img) {
                    return 'url(#' + candyData[candy].id + ')';
                }
                return '#888';
            })
            .on('mouseover', function(d) {
                // console.log(d.properties.top_joy.candy);
                d3.selectAll('.state-boundary')
                    .attr('opacity', function(e) {
                        return d.properties.name == e.properties.name ? 1 : 0.3;
                    });
            })
            .on('mouseout', function(d) {
                d3.selectAll('.state-boundary')
                    .attr('opacity', 1);
            })
            .on('click', function(d, i) {
                console.log(d.properties.name);
                var stateName = d.properties.name;
                bubbleChartTitle.text('Top ' + selectedFeeling + ' for ' + d.properties.name);
                drawBubbleChart(data[i].value[selectedFeeling]);
            });
        });
}

function updateMap(category) {
    candyMapSVG.selectAll('path')
        .style('fill', function(d) {
            var stateName = d.properties.name;
            var top = d.properties[category];
            if (!top) return '#888';
            var candy = top.candy;
            if (candyData[candy].img) {
                return 'url(#' + candyData[candy].id + ')';
            }
            return '#888';
        })
}

function onMapCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    selectedFeeling = feelings[category];
    // Update map with the selected feeling category
    updateMap(category);
}

// Bubble Chart

function drawBubbleChart(data) {
    candyBubbleSVG.selectAll('.node').remove();

    var w = parseInt(d3.select('div#candyDetailsContainer').style('width'), 10);
    var h = parseInt(d3.select('div#candyDetailsContainer').style('height'), 10);

    var bubble = d3.pack()
        .size([w, h - 35])
        .padding(1.5);

    var root = d3.hierarchy({children: data})
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.value - a.value; });

    bubble(root);

    var maxR = d3.max(root.children, function(d) {
        return d.r;
    });

    var node = candyBubbleSVG.selectAll('.node')
        .data(root.children)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + (d.y + 35) + ')';
            return 'translate(' + (d.x + (w / 2.5) - (maxR * 2)) + ',' + d.y + ')';
        });

    node.append('circle')
        .attr('r', function(d){ return d.r; })
        .style("fill", function(d) {
            return '#fff';
            // var candy = d.data.candy;
            // if (candyData[candy].color) return candyData[candy].color;
            // return '#fff';
        });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-6, 0])
        .html(function(d) {
            var name = candyData[d.data.candy].name;
            return "<strong style='color:white'>" + name + "</strong>";
         });

    var image = node.append('image')
        .attr('class', 'framed')
        .on('mouseenter', tip.show)
        .on('mouseover', function(d) {
            candyBubbleSVG.selectAll('.node')
                .attr('opacity', function(e) {
                    return d.data.candy == e.data.candy ? 1 : 0.3;
                });
        })
        .on('mouseleave', function() {
            candyBubbleSVG.selectAll('.node')
                .attr('opacity', 1);
        })
        .on('mouseout', tip.hide)
        .transition()
        .duration(550)
        .attr('xlink:href', function(d) {
            var candy = d.data.candy;
            var imgCircle = candyData[candy].imgcircle;
            if (!imgCircle) return null;
            return 'img/' + imgCircle;
        })
        .attr("x", function(d) { return -d.r;})
        .attr("y", function(d) { return -d.r;})
        .attr("height", function(d) { return d.r * 2; })
        .attr("width", function(d) { return d.r * 2; });

    image.call(tip);

    node.append('circle')
    .transition()
    .duration(550)
        .attr('r', function(d){ return d.r; })
        .attr('class', 'framed');

}
