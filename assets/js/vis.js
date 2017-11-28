// Global variables
// var candyBarChartSVG = d3.select('svg.barChart');

var candyBarChartSVG = d3.select('div#barChartContainer')
   .append('div')
   .classed('svg-container-barchart', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('height', '120%')
   .attr('viewBox', '0 0 600 800')
   .classed('svg-content-responsive', true);

var candyMagnetSVG = d3.select('svg.candymagnet');

var candyMapSVG = d3.select('div#candyMapContainer')
   .append('div')
   .classed('svg-container-left', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', "0 0 600 430")
   .classed('svg-content-responsive', true);

var candyMapTopG = candyMapSVG.append('g')
    .attr('class', 'topCandy')
    .attr('transform', 'translate(410, 100)');
candyMapTopG.append('rect')
    .attr('width', 150)
    .attr('height', 200);
var candyMapTopCandyText = candyMapTopG.append('text');

var candyBubbleSVG = d3.select('div#candyDetailsContainer')
   .append('div')
   .classed('svg-container-bubble', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', '0 0 600 600')
   .classed('svg-content-responsive', true);

var keys = {country: 'Q4_COUNTRY', state: 'Q5_STATE_PROVINCE_COUNTY_ETC'};
var feelings = {top_joy: 'JOY', meh: 'MEH', top_despair: 'DESPAIR'};
selectedCandies = {1:'Butterfinger', 2:'Candy Corn', 3:'Chiclets', 4:'Dots'};
var padding = {l:100, r:200, b:20, t:10};

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
        name: "Gummy Bears",
        img: "gummybears.jpg",
        imgcircle: "gummybears-circle.png",
        id: "gummybears"
    },
    Q6_Heath_Bar: {
        key: "Q6_Heath_Bar",
        name: "Heath Bar",
        img: "heath.jpg",
        imgcircle: "heath-circle.png",
        id: "heathbar"
    },
    Q6_Hershey_s_Dark_Chocolate: {
        key: "Q6_Hershey_s_Dark_Chocolate",
        name: "Hershey's Dark Chocolate",
        img: "hersheys-dark.jpg",
        imgcircle: "hersheys-dark-circle.png",
        id: "hersheys"
    },
    Q6_Hershey_s_Kisses: {
        key: "Q6_Hershey_s_Kisses",
        name: "Hershey's Kisses",
        img: "kisses.jpg",
        imgcircle: "kisses-circle.png",
        id: "kisses"
    },
    Q6_Hershey_s_Milk_Chocolate: {
        key: "Q6_Hershey_s_Milk_Chocolate",
        name: "Hershey's Milk Chocolate",
        img: "hersheys.jpg",
        imgcircle: "hersheys-circle.png",
        id: "hersheys"
    },
    Q6_Jolly_Ranchers_good_flavor: {
        key: "Q6_Jolly_Ranchers_good_flavor",
        name: "Jolly Rancher (Good Flavor)",
        img: "jollyrancher.jpg",
        imgcircle: "jollyrancher-circle.png",
        id: "jollyrancher"
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
        name: "LemonHeads",
        img: "lemonheads.jpg",
        imgcircle: "lemonheads-circle.png",
        id: "lemonheads"
    },
    Q6_Licorice_not_black: {
        key: "Q6_Licorice_not_black",
        name: "Licorice",
        img: "licorice.jpg",
        imgcircle: "licorice-circle.png",
        id: "licorice"
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
        imgcircle: "lollipop-circle.png",
        id: "lollipop"
    },
    Q6_Mike_and_Ike: {
        key: "Q6_Mike_and_Ike",
        name: "Mike and Ike",
        img: "mikeandike.jpg",
        imgcircle: "mikeandike-circle.png",
        id: "mikeandike"
    },
    Q6_Milk_Duds: {
        key: "Q6_Milk_Duds",
        name: "Milk Duds",
        img: "milkduds.jpg",
        imgcircle: "milkduds-circle.png",
        id: "milkduds"
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
        name: "Mint Kisses",
        img: "mint-kisses.jpg",
        imgcircle: "mint-kisses-circle.png",
        id: "mintkisses"
    },
    Q6_Mr_Goodbar: {
        key: "Q6_Mr_Goodbar",
        name: "Mr. Goodbar",
        img: "mrgoodbar.jpg",
        imgcircle: "mrgoodbar-circle.png",
        id: "mrgoodbar"
    },
    Q6_Nerds: {
        key: "Q6_Nerds",
        name: "Nerds",
        img: "nerds.jpg",
        imgcircle: "nerds-circle.png",
        id: "nerds",
        color: "#8975b0"
    },
    Q6_Nestle_Crunch: {
        key: "Q6_Nestle_Crunch",
        name: "Crunch",
        img: "crunch.png",
        imgcircle: "crunch-circle.png",
        id: "crunch"
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
        name: "Pixy Stix",
        img: "pixystix.jpg",
        imgcircle: "pixystix-circle.png",
        id: "pixystix"
    },
    Q6_Reese_s_Peanut_Butter_Cups: {
        name: "Reese's",
        img: "reeses.jpg",
        imgcircle: "reeses-circle.png",
        id: "reeses"
    },
    Q6_Reese_s_Pieces: {
        name: "Reese's Pieces",
        img: "reeses-pieces.jpg",
        imgcircle: "reeses-pieces-circle.png",
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
        imgcircle: "sour-patch-kids-circle.png",
        id: "sourpatch"
    },
    Q6_Starburst: {
        name: "Starburst",
        img: "starburst.jpg",
        imgcircle: "starburst-circle.png",
        id: "starburst"
    },
    Q6_Swedish_Fish: {
        name: "Swedish Fish",
        img: "swedishfish.jpg",
        imgcircle: "swedishfish-circle.png",
        id: "swedishfish"
    },
    Q6_Three_Musketeers: {
        name: "3 Musketeers",
        img: "threemusketeers.jpg",
        imgcircle: "threemusketeers-circle.png",
        id: "threemusketeers"
    },
    Q6_Tic_Tacs: {
        name: "Tic Tacs",
        img: "tictac.jpg",
        imgcircle: "tictac-circle.png",
        id: "tictac"
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
        name: "Whatchamacallit Bars",
        img: "whatchamacallit.jpg",
        imgcircle: "whatchamacallit-circle.png",
        id: "whatchamacallit"
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
        candyDataDict = {key: candy, joy: 0, meh: 0, despair: 0, Female: 0, Male: 0, 'I\'d rather not say': 0, Other: 0};
        dataset.forEach(function(d, j) {
            gender = d['Q2_GENDER'];
            if (gender) candyDataDict[gender] += 1;
            feeling = d[candy];
            if (feeling) candyDataDict[feeling.toLowerCase()] += 1;
        });
        candyDataDict['total_votes'] = candyDataDict.Male + candyDataDict.Female + candyDataDict['I\'d rather not say'] + candyDataDict.Other;
        candyDataDict['avg_female'] = candyDataDict.Female / candyDataDict['total_votes'];
        candyDataDict['avg_male'] = candyDataDict.Male / candyDataDict['total_votes'];
        candyDataDict['avg_not_say'] = candyDataDict['I\'d rather not say'] / candyDataDict['total_votes'];
        candyDataDict['avg_other'] = candyDataDict.Other / candyDataDict['total_votes'];
        dataByCandy[i] = candyDataDict;
    });

    // dataByCandy.sort(function(a, b) {
    //     return a.joy - b.joy;
    // });
    // console.log(dataByCandy);

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
    var mapW = parseInt(d3.select('div#candyMapContainer').style('width'), 10);
    mapTitle = candyMapSVG.append("g")
        .append("text")
        .attr("id", "keywordTitle")
        .attr('text-anchor', 'middle')
        .attr("transform", 'translate(' + (mapW / 2) + ', 25)')
        .attr("text-anchor", "left")
        .style("font-size", (mapW / 30) + "px")
        .style("font-weight", "bold")
        .text('');

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
    bubbleChartTitle.text('Top ' + selectedFeeling + ' for ' + dataByState[0].key);
    drawBubbleChart(dataByState[0].value['JOY']);

   drawBarChart();
});

var selectedFeeling = 'JOY';
var barSelectedFeeling = 'JOY';

// Map

function drawMap(data) {

    var projection = d3.geoAlbersUsa()
        .scale(500)
        .translate([200, 200]);

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
                d3.selectAll('.state-boundary')
                    .attr('opacity', function(e) {
                        return d.properties.name == e.properties.name ? 1 : 0.3;
                    });
                mapTitle.text(d.properties.name);
                candyMapTopCandyText.text(d.properties.name);
            })
            .on('mouseout', function(d) {
                d3.selectAll('.state-boundary')
                    .attr('opacity', 1);
                mapTitle.text('');
                candyMapTopCandyText.text('');
            })
            .on('click', function(d, i) {
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
        .size([w, w - 35])
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
        });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-6, 0])
        .html(function(d, i) {
            var name = candyData[d.data.candy].name;
            return "<strong style='color:white'>" + name + "</strong><br> Rank: " + (i + 1) + '<br>' + d.data.value + ' ' + selectedFeeling + ' votes';
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


// Bar Chart

    function drawBarChart() {

        dataByCandy.sort(function(a, b) {
            return b.joy - a.joy;
        });
        barChartWidth = parseInt(d3.select('div#barChartContainer').style('width'), 10);
        barChartHeight = parseInt(d3.select('div#barChartContainer').style('height'), 10);

        domainMap = {};
        domainMap['JOY'] = d3.max(dataByCandy, function(d) {
            return d.joy;
        });
        domainMap['DESPAIR'] = d3.max(dataByCandy, function(d) {
            return d.despair;
        });



        barChartXscale = d3.scaleLinear()
            .range([0, barChartWidth - padding.r]);

        barChartXaxis = d3.axisBottom(barChartXscale).ticks(13);

        barChartRange = [];

        barChartYscale = d3.scaleBand()
            .range([0, barChartHeight - 1.2 - padding.b]);

        barChartYaxis = d3.axisLeft(barChartYscale).ticks(Object.keys(candyData).length).tickSizeOuter(0);

        xAxisG = candyBarChartSVG.append('g')
            .attr('class', 'x_axis')
            .attr("transform", "translate(" + 1.6*padding.l + "," + (barChartHeight - padding.b)  + ")")
            .text('BarChartXAxis');

        yAxisG = candyBarChartSVG.append('g')
            .attr('class', 'y_axis')
            .attr("transform", "translate(" + 1.5*padding.l + "," + 0 +")")
            .text('BarChartYAxis');

        updateBarChart('JOY');
    }


    function updateBarChart(filter) {
        candyBarChartSVG.selectAll('.bar').remove();

        if (filter === 'JOY') {
            dataByCandy.sort(function(a, b) {
                return b.joy - a.joy;
            });
        }

        if (filter === 'DESPAIR') {
            dataByCandy.sort(function(a, b) {
                return b.despair - a.despair;
            });
        }

        dataByCandy.forEach(function(d, i) {
            barChartRange[i] = candyData[d.key].name;
        });

        barChartXscale.domain([0, domainMap[filter]]);
        barChartYscale.domain(barChartRange);

        xAxisG.transition(250).call(barChartXaxis);
        yAxisG.transition(250).call(barChartYaxis);


        var barHeight = 10;
        var barBand = (barChartHeight - padding.b)/Object.keys(candyData).length;

        var barTip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([20, 0])
            .html(function(d, i) {
                console.log(d.key);
                var name = candyData[d.key].name;
                return "<strong style='color:white'>"  + name
                    + "</strong><br> Female: " + d.Female + '<br>'
                    + "</strong><br> Male: " + d.Male + '<br>'
                    + "</strong><br> Not say: " + d["I\'d rather not say"] + '<br>';
             });
         candyBarChartSVG.call(barTip);

        var bars = candyBarChartSVG.selectAll('.bar')
            .data(dataByCandy, function(d) {
                return d.key;
            });

        var barsEnter = bars.enter()
            .append('g')
            .attr('class', 'barG');
        // bars.merge(barsEnter);

        var bar = barsEnter
            .append('rect')
            .attr('class', 'bar')
            .on('mouseenter', barTip.show)
            .on('mouseover', function(d) {
                candyBarChartSVG.selectAll('.bar')
                .attr('opacity', function(e) {
                    return d.key == e.key ? 1 : 0.3;
                });
            })
            .on('mouseleave', function() {
                candyBarChartSVG.selectAll('.bar')
                .attr('opacity', 1);
            })
            .on('mouseout', barTip.hide);

        bar.attr('transform', function(d, i){
                return 'translate('+[1.6*padding.l, i * barBand]+')';
            })
            .transition().duration(400)
            .attr('width', function(d) { return barChartXscale(d[filter.toLowerCase()]); })
            .attr('height', function(d) { return barHeight; })
            .attr('fill', '#25aebb');

        bar.append('text')
            .attr('x', -20)
            .attr('dy', '0.9em')
            .text(function(d) {
                return candyData[d.key].name;
            });

        // bars.exit().remove();
    }

    function onBarSelectChanged() {
        // Get current value of select element
        var select = d3.select('#candyFeelingSelect').node();
        feeling = select.options[select.selectedIndex].value;
        barSelectedFeeling = feeling;
        updateBarChart(barSelectedFeeling);

        // for(i = 1; i < 5; i++) {
        //     var select = d3.select('#candyFeelingSelect' + i).node();
        //     var candy = select.options[select.selectedIndex].value;
        //     // Don't redraw a bar that is already selected
        //     if (candy !== selectedCandies[i]) {
        //       selectedCandies[i] = candy;
        //     }
        // }
    }
