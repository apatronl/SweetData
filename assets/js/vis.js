// Global variables

var candyBarChartSVG = d3.select('div#barChartContainer')
   .append('div')
   .classed('svg-container-barchart', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('height', '120%')
   .attr('width', '120%')
   .attr('viewBox', '0 0 1000 1000')
   .classed('svg-content-responsive', true);

var padding = {l:150, r:200, b:20, t:10};

barChartWidth = parseInt(d3.select('div#barChartContainer').style('width'), 10);
barChartHeight = parseInt(d3.select('div#barChartContainer').style('height'), 10);
genderBoxWidth = 150;
genderBoxHeight = 200;

candyGenderBox = candyBarChartSVG.append('g')
    .attr('class', 'gender_details')
    .attr('transform', 'translate(' + [barChartWidth - (genderBoxWidth/2), barChartHeight - padding.r + 20]+ ')');
    candyGenderBox.append('rect')
    .attr('width', genderBoxWidth)
    .attr('height', genderBoxHeight);

genderVoteBox = candyBarChartSVG.append('g')
    .attr('class', 'gender_details')
    .attr('transform', 'translate(' + [barChartWidth/3, barChartHeight + 50]+ ')');
    genderVoteBox.append('rect')
    .attr('width', genderBoxWidth)
    .attr('height', genderBoxHeight);

colorLegendBox = candyBarChartSVG.append('g')
    .attr('class', 'gender_details')
    .attr('transform', 'translate(' + [2*barChartWidth/3, barChartHeight + 50]+ ')');
colorLegendBox.append('rect')
    .attr('width', genderBoxWidth)
    .attr('height', genderBoxHeight);

var candyMagnetSVG = d3.select('svg.candymagnet');

var candyMapSVG = d3.select('div#candyMapContainer')
   .append('div')
   .classed('svg-container-left', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', "0 0 600 430")
   .classed('svg-content-responsive', true);

// Add candy map filters
var filterG = candyMapSVG.append('g')
    .attr('transform', 'translate(10,20)');
filterG.append('text')
    .attr('dy', '-0.3em')
    .text('Filters:');

var joyFilter = filterG.append('g')
    .attr('class', 'filter selected')
    .attr('value', 'top_joy')
    .on('click', function() {
        d3.select('.filter.selected').classed('selected', false);
        var clicked = d3.select(this);
        clicked.classed('selected', true);
        onMapCategoryChanged(d3.select(this).attr('value'));
    });
joyFilter.append('rect')
    .attr('height', 20)
    .attr('width', 65)
    .attr('rx', 3)
    .attr('ry', 3);
joyFilter.append('text')
    .attr('x', 4)
    .attr('dy', '1.3em')
    .text('Joy');

var despairFilter = filterG.append('g')
    .attr('class', 'filter')
    .attr('value', 'top_despair')
    .attr('transform', 'translate(73)')
    .on('click', function() {
        d3.select('.filter.selected').classed('selected', false);
        var clicked = d3.select(this);
        clicked.classed('selected', true);
        onMapCategoryChanged(d3.select(this).attr('value'));
    });
despairFilter.append('rect')
    .attr('height', 20)
    .attr('width', 65)
    .attr('rx', 3)
    .attr('ry', 3);
despairFilter.append('text')
    .attr('x', 4)
    .attr('dy', '1.3em')
    .text('Despair');

// Top candy box shown on map hovering by state
var candyMapTopG = candyMapSVG.append('g')
    .attr('class', 'topCandyG')
    .attr('transform', 'translate(410, 100)');
candyMapTopG.append('rect')
    .attr('width', 150)
    .attr('height', 200)
    .attr('class', 'topCandy');
var candyMapTopCandyText = candyMapTopG.append('text')
    .attr('class', 'topCandyTitle')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + [75, 25] + ')');
var candyMapTopCandyFeelingText = candyMapTopG.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + [75, 160] + ')')
    .text('Top JOY Candy');
var candyMapTopCandyNameText = candyMapTopG.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + [75, 180] + ')')
    .text('Reese\'s Pieces');

var candyBubbleSVG = d3.select('div#candyDetailsContainer')
   .append('div')
   .classed('svg-container-bubble', true)
   .append('svg')
   .attr('preserveAspectRatio', 'xMinYMin meet')
   .attr('viewBox', '0 0 600 600')
   .classed('svg-content-responsive', true);

var lineGraphSVG = d3.select('div#rankLineGraphContainer')
    .append('div')
    .classed('svg-container-linegraph', true)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('height', '120%')
    .attr('width', '120%')
    .attr('viewBox', '0 0 800 900')
    .classed('svg-content-responsive', true);

var candyRankData = [
    {
      data: [{year: 2014, rank: 1, key: 'Q6_Reese_s_Peanut_Butter_Cups', color: '#fc541f'},
             {year: 2015, rank: 1},
             {year: 2016, rank: 2},
             {year: 2017, rank: 1}]
    },
    {
      data: [{year: 2014, rank: 2, key: 'Q6_Kit_Kat', color: '#e80b18'},
             {year: 2015, rank: 2},
             {year: 2016, rank: 1},
             {year: 2017, rank: 2}]
    },
    {
      data: [{year: 2014, rank: 4, key: 'Q6_Twix', color: '#e7ab27'},
             {year: 2015, rank: 3},
             {year: 2016, rank: 3},
             {year: 2017, rank: 3}]
    },
    {
      data: [{year: 2014, rank: 5, key: 'Q6_Snickers', color: '#48241c'},
             {year: 2015, rank: 4},
             {year: 2016, rank: 4},
             {year: 2017, rank: 4}]
    },
    {
      data: [{year: 2014, rank: 10, key: 'Q6_Tolberone_something_or_other', color: '#f0cf7f'},
             {year: 2015, rank: 11},
             {year: 2016, rank: 5},
             {year: 2017, rank: 5}]
    }
];

var keys = {country: 'Q4_COUNTRY', state: 'Q5_STATE_PROVINCE_COUNTY_ETC'};
var feelings = {top_joy: 'JOY', meh: 'MEH', top_despair: 'DESPAIR'};
genderToColor = {
        "Female":"#fcbded",
        "Male": "#bde8fc",
        "I'd rather not say" : "#bdfcbe",
        "Other" : "#fcf2bd"
    };

stackBarColors = {
    'joy' : '#f4ee33',
    'meh' : '#FDC086',
    'despair' : '#386cb0'
};

selectedCandies = {1:'Butterfinger', 2:'Candy Corn', 3:'Chiclets', 4:'Dots'};

var candyData = {
    Q6_Butterfinger: {
        key: "Q6_Butterfinger",
        name: "Butterfinger",
        img: "butterfinger.png",
        imgcircle: "butterfinger-circle.png",
        id: "butterfinger",
        color: "#fce032",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Candy_Corn: {
        key: "Q6_Candy_Corn",
        name:"Candy Corn",
        img: "candycorn.jpg",
        imgcircle: "candycorn-circle.png",
        id: "candycorn",
        color: "#e6401b",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Chiclets: {
        key: "Q6_Chiclets",
        name: "Chiclets",
        img: "chiclets.jpg",
        imgcircle: "chiclets-circle.png",
        id: "chiclets",
        color: "#fbed53",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Dots: {
        key: "Q6_Dots",
        name: "Dots",
        img: "dots.jpg",
        imgcircle: "dots-circle.png",
        id: "dots",
        color: "#f9e233",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Fuzzy_Peaches: {
        key: "Q6_Fuzzy_Peaches",
        name: "Fuzzy Peaches",
        img: "fuzzypeaches.jpg",
        imgcircle: "fuzzypeaches-circle.png",
        id: "fuzzypeaches",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Good_N_Plenty: {
        key: "Q6_Good_N_Plenty",
        name: "Good & Plenty",
        img: "goodnplenty.jpg",
        imgcircle: "goodnplenty-circle.png",
        id: "goodnplenty",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Gummy_Bears_straight_up: {
        key: "Q6_Gummy_Bears_straight_up",
        name: "Gummy Bears",
        img: "gummybears.jpg",
        imgcircle: "gummybears-circle.png",
        id: "gummybears",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Heath_Bar: {
        key: "Q6_Heath_Bar",
        name: "Heath Bar",
        img: "heath.jpg",
        imgcircle: "heath-circle.png",
        id: "heathbar",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Hershey_s_Dark_Chocolate: {
        key: "Q6_Hershey_s_Dark_Chocolate",
        name: "Hershey's Dark Chocolate",
        img: "hersheys-dark.jpg",
        imgcircle: "hersheys-dark-circle.png",
        id: "hersheys",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Hershey_s_Kisses: {
        key: "Q6_Hershey_s_Kisses",
        name: "Hershey's Kisses",
        img: "kisses.jpg",
        imgcircle: "kisses-circle.png",
        id: "kisses",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Hershey_s_Milk_Chocolate: {
        key: "Q6_Hershey_s_Milk_Chocolate",
        name: "Hershey's Milk Chocolate",
        img: "hersheys.jpg",
        imgcircle: "hersheys-circle.png",
        id: "hersheys",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Jolly_Ranchers_good_flavor: {
        key: "Q6_Jolly_Ranchers_good_flavor",
        name: "Jolly Rancher (Good Flavor)",
        img: "jollyrancher.jpg",
        imgcircle: "jollyrancher-circle.png",
        id: "jollyrancher",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Junior_Mints: {
        key: "Q6_Junior_Mints",
        name: "Junior Mints",
        img: "juniormints.jpg",
        imgcircle: "juniormints-circle.png",
        id: "juniormints",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Kit_Kat: {
        key: "Q6_Kit_Kat",
        name: "Kit Kat",
        img: "kitkat.jpg",
        imgcircle: "kitkat-circle.png",
        id: "kitkat",
        color: "#e92630",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_LaffyTaffy: {
        key: "Q6_LaffyTaffy",
        name: "Laffy Taffy",
        img: "laffytaffy.png",
        imgcircle: "laffytaffy-circle.png",
        id: "laffytaffy",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_LemonHeads: {
        key: "Q6_LemonHeads",
        name: "LemonHeads",
        img: "lemonheads.jpg",
        imgcircle: "lemonheads-circle.png",
        id: "lemonheads",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Licorice_not_black: {
        key: "Q6_Licorice_not_black",
        name: "Licorice",
        img: "licorice.jpg",
        imgcircle: "licorice-circle.png",
        id: "licorice",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Licorice_yes_black: {
        key: "Q6_Licorice_yes_black",
        name: "Licorice (black)",
        img: "blacklicorice.jpg",
        imgcircle: "blacklicorice-circle.png",
        id: "blacklicorice",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Lollipops: {
        key: "Q6_Lollipops",
        name: "Lollipops",
        img: "lollipop.jpg",
        imgcircle: "lollipop-circle.png",
        id: "lollipop",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Mike_and_Ike: {
        key: "Q6_Mike_and_Ike",
        name: "Mike and Ike",
        img: "mikeandike.jpg",
        imgcircle: "mikeandike-circle.png",
        id: "mikeandike",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Milk_Duds: {
        key: "Q6_Milk_Duds",
        name: "Milk Duds",
        img: "milkduds.jpg",
        imgcircle: "milkduds-circle.png",
        id: "milkduds",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Milky_Way: {
        key: "Q6_Milky_Way",
        name: "Milky Way",
        img: "milkyway.jpg",
        imgcircle: "milkyway-circle.png",
        id: "milkyway",
        color: "#1d6b20",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Mint_Kisses: {
        key: "Q6_Mint_Kisses",
        name: "Mint Kisses",
        img: "mint-kisses.jpg",
        imgcircle: "mint-kisses-circle.png",
        id: "mintkisses",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Mr_Goodbar: {
        key: "Q6_Mr_Goodbar",
        name: "Mr. Goodbar",
        img: "mrgoodbar.jpg",
        imgcircle: "mrgoodbar-circle.png",
        id: "mrgoodbar",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Nerds: {
        key: "Q6_Nerds",
        name: "Nerds",
        img: "nerds.jpg",
        imgcircle: "nerds-circle.png",
        id: "nerds",
        color: "#8975b0",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Nestle_Crunch: {
        key: "Q6_Nestle_Crunch",
        name: "Crunch",
        img: "crunch.png",
        imgcircle: "crunch-circle.png",
        id: "crunch",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Peanut_M_M_s: {
        key: "Q6_Peanut_M_M_s",
        name: "Peanut M&M's",
        img: "peanut-mm.jpg",
        imgcircle: "peanut-mm-circle.png",
        id: "peanutmm",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Peeps: {
        key: "Q6_Peeps",
        name: "Peeps",
        img: "peeps.jpg",
        imgcircle: "peeps-circle.png",
        id: "peeps",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Pixy_Stix: {
        name: "Pixy Stix",
        img: "pixystix.jpg",
        imgcircle: "pixystix-circle.png",
        id: "pixystix",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Reese_s_Peanut_Butter_Cups: {
        name: "Reese's",
        img: "reeses.jpg",
        imgcircle: "reeses-circle.png",
        id: "reeses",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Reese_s_Pieces: {
        name: "Reese's Pieces",
        img: "reeses-pieces.jpg",
        imgcircle: "reeses-pieces-circle.png",
        id: "reesespieces",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Regular_M_Ms: {
        name: "Milk Chocolate M&M's",
        img: "mm.jpg",
        imgcircle: "mm-circle.png",
        id: "mm",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Rolos: {
        name: "Rolos",
        img: "rolo.png",
        imgcircle: "rolo-circle.png",
        id: "rolo",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Skittles: {
        name: "Skittles",
        img: "skittles.jpg",
        imgcircle: "skittles-circle.png",
        id: "skittles",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Snickers: {
        name: "Snickers",
        img: "snickers.jpg",
        imgcircle: "snickers-circle.png",
        id: "snickers",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Sourpatch_Kids_i_e_abominations_of_nature: {
        name: "Sour Patch Kids",
        img: "sour-patch-kids.jpg",
        imgcircle: "sour-patch-kids-circle.png",
        id: "sourpatch",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Starburst: {
        name: "Starburst",
        img: "starburst.jpg",
        imgcircle: "starburst-circle.png",
        id: "starburst",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Swedish_Fish: {
        name: "Swedish Fish",
        img: "swedishfish.jpg",
        imgcircle: "swedishfish-circle.png",
        id: "swedishfish",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Three_Musketeers: {
        name: "3 Musketeers",
        img: "threemusketeers.jpg",
        imgcircle: "threemusketeers-circle.png",
        id: "threemusketeers",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Tic_Tacs: {
        name: "Tic Tacs",
        img: "tictac.jpg",
        imgcircle: "tictac-circle.png",
        id: "tictac",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Tolberone_something_or_other: {
        name: "Toblerone",
        img: "toblerone.png",
        imgcircle: "toblerone-circle.png",
        id: "toblerone",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Trail_Mix: {
        key: "Q6_Trail_Mix",
        name: "Trail Mix",
        img: "trailmix.jpg",
        imgcircle: "trailmix-circle.png",
        id: "trailmix",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Twix: {
        key: "Q6_Twix",
        name: "Twix",
        img: "twix.jpg",
        imgcircle: "twix-circle.png",
        id: "twix",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_Whatchamacallit_Bars: {
        key: "Q6_Whatchamacallit_Bars",
        name: "Whatchamacallit Bars",
        img: "whatchamacallit.jpg",
        imgcircle: "whatchamacallit-circle.png",
        id: "whatchamacallit",
        joy_by_gender: [],
        despair_by_gender:[]
    },
    Q6_York_Peppermint_Patties: {
        key: "Q6_York_Peppermint_Patties",
        name: "York Peppermint Patties",
        img: "york-peppermint-patties.jpg",
        imgcircle: "york-peppermint-patties-circle.png",
        id: "york",
        joy_by_gender: [],
        despair_by_gender:[]
    }
};

d3.csv('./data/candy.csv', function(error, dataset) {
    if (error) {
        console.error('Error while loading ./data/candy.csv dataset.');
        console.error(error);
        return;
    }

    // Data organized by candy
    genderVoteKeys = {
        "Male" : 0,
        "Female": 0,
        "Other" : 0,
        "I'd rather not say" : 0
      };

    dataByCandy = [];
    Object.keys(candyData).forEach(function(candy, i) {
        candyDataDict = {};
        candyDataDict = {
            key: candy,
            joy: 0,
            meh: 0,
            despair: 0,

            // joy by gender
            joy_Female: 0,
            joy_Male: 0,
            'joy_I\'d rather not say': 0,
            joy_Other: 0,

            // despair by gender
            despair_Female: 0,
            despair_Male: 0,
            'despair_I\'d rather not say': 0,
            despair_Other: 0
        };
        dataset.forEach(function(d, j) {
            feeling = d[candy];
            if (feeling) {
                candyDataDict[feeling.toLowerCase()] += 1;
                gender = d['Q2_GENDER'];
                if (gender && feeling != 'MEH') {
                    genderKey = feeling.toLowerCase() + '_' + gender;
                    candyDataDict[genderKey] += 1;
                }
            }
        });
        joyCandyDict = {};
        despairCandyDict = {};

        // Joy averages by gender
        joyCandyDict['joy_avg_Female'] = (candyDataDict.joy_Female / candyDataDict.joy)*100;
        joyCandyDict['joy_avg_Male'] = (candyDataDict.joy_Male / candyDataDict.joy)*100;
        joyCandyDict['joy_avg_Other'] = (candyDataDict.joy_Other / candyDataDict.joy)*100;
        joyCandyDict['joy_avg_I\'d rather not say'] = (candyDataDict['joy_I\'d rather not say'] / candyDataDict.joy)*100;


        // Despair averages by gender
        despairCandyDict['despair_avg_Female'] = (candyDataDict.despair_Female / candyDataDict.despair) *100;
        despairCandyDict['despair_avg_Male'] = (candyDataDict.despair_Male / candyDataDict.despair)*100;
        despairCandyDict['despair_avg_Other'] = (candyDataDict.despair_Other / candyDataDict.despair)*100;
        despairCandyDict['despair_avg_I\'d rather not say'] = (candyDataDict['despair_I\'d rather not say'] / candyDataDict.despair)*100;

        dataByCandy[i] = candyDataDict;
        candyData[candy].joy_by_gender[0] = joyCandyDict;
        candyData[candy].despair_by_gender[0] = despairCandyDict;
    });
    dataset.forEach(function(d, j) {
        gender = d['Q2_GENDER'];
        if (gender) {
            genderVoteKeys[gender] += 1;
        }
    });

    // Data organized by US states
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

    var mapW = parseInt(d3.select('div#candyMapContainer').style('width'), 10);

    var bubbleChartW = parseInt(d3.select('div#candyDetailsContainer').style('width'), 10);
    bubbleChartTitle = candyBubbleSVG.append("g")
        .append("text")
        .attr("id", "keywordTitle")
        .attr("transform", 'translate(20, 35)')
        .attr("text-anchor", "left")
        .style("font-size", (bubbleChartW / 30) + "px")
        .style("font-weight", "bold")
        .text('Click on a state to learn more about it');

    // Draw initial map
    drawMap(dataByState);
    candyMapTopCandyText.text(dataByState[0].key);
    drawMapTopCandy(dataByState[0].value['JOY']);

    // Draw initial bubble chart
    bubbleChartTitle.text('Level of ' + selectedFeeling + ' per Candy in ' + dataByState[0].key);
    drawBubbleChart(dataByState[0].value['JOY']);

    // Draw initial bar chart
    drawBarChart();

    // Draw initial line graph
    drawRankLineGraph();
});

var selectedFeeling = 'JOY';
var barSelectedFeeling = 'ALL';

// Map

function drawMap(data) {

    var projection = d3.geoAlbersUsa()
        .scale(530)
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
            .on('mouseover', function(d, i) {
                d3.selectAll('.state-boundary')
                    .attr('opacity', function(e) {
                        return d.properties.name == e.properties.name ? 1 : 0.3;
                    });
                candyMapTopCandyText.text(d.properties.name);
                drawMapTopCandy(data[i].value[selectedFeeling]);
                candyMapTopCandyFeelingText.text('Top ' + selectedFeeling + ' candy');
            })
            .on('mouseout', function(d) {
                d3.selectAll('.state-boundary')
                    .attr('opacity', 1);
                // candyMapTopCandyText.text('');
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

function drawMapTopCandy(stateData) {
    candyMapTopG.selectAll('.topCandyC').remove();
    // console.log(stateData);
    candyMapTopCandyNameText.text(candyData[stateData[0].candy].name);
    candyMapTopG.append('image')
        .attr('class', 'topCandyC')
        .attr('xlink:href', function() {
            var candy = stateData[0].candy;
            var imgCircle = candyData[candy].imgcircle;
            if (!imgCircle) return null;
            return 'img/' + imgCircle;
        })
        .attr('x', function(d) { return 25; })
        .attr('y', function(d) { return 35; })
        .attr('height', function(d) { return 100; })
        .attr('width', function(d) { return 100; });
}

function onMapCategoryChanged(category) {
    selectedFeeling = feelings[category];
    updateMap(category);

    // Update bubble chart
    bubbleChartTitle.text('Level of ' + selectedFeeling + ' per Candy in ' + dataByState[0].key);
    drawBubbleChart(dataByState[0].value[selectedFeeling]);
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


        domainMap = {};

        domainMap['JOY'] = d3.max(dataByCandy, function(d) {
            return d.joy;
        });
        domainMap['MEH'] = d3.max(dataByCandy, function(d) {
            return d.meh;
        });
        domainMap['DESPAIR'] = d3.max(dataByCandy, function(d) {
            return d.despair;
        });
        domainMap['ALL'] =d3.max(dataByCandy, function(d) {
            return d.joy + d.meh + d.despair;
        });

    barChartXscale = d3.scaleLinear()
        .range([0, barChartWidth - padding.r]);

        barChartXaxis = d3.axisBottom(barChartXscale);

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

    // xAxis Label
    candyBarChartSVG.append('text')
        .attr('class', 'bar_chart_axis_label')
        .attr('x', 0.67*barChartWidth)
        .attr('y', barChartHeight + padding.t + 20)
        .text('Votes');

    // yAxis Label
    candyBarChartSVG.append('text')
        .attr('class', 'bar_chart_axis_label')
        .attr('x', 0)
        .attr('y', barChartHeight/2)
        .text('Candy');

    var total = genderVoteKeys['Male'] + genderVoteKeys['Female'] + genderVoteKeys['Other'] + genderVoteKeys['I\'d rather not say'];
    genderVoteBox.append('text')
            .attr('class', 'genderVotesTitle')
            .attr('x', 17)
            .attr('y', 20)
            .text('Total Votes: ' + total);

    Object.keys(genderVoteKeys).forEach(function(key, i) {
        if (key) {
        genderVoteBox.append('text')
            .attr('class', 'genderVotes')
            .attr('x', 20)
            .attr('y', 40 + (20*i))
            .text(key + ': ' + genderVoteKeys[key]);
        }
    });
    // colorLegendBox.append('rect')
    //         .attr('class', 'genderVotesTitle')
    //         .attr('x', 17)
    //         .attr('y', 20)
    //         .text('Total Votes: ' + total);

    colorLegendBox.append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', stackBarColors.joy)
        .attr('transform', 'translate(0, 5)');
    colorLegendBox.append('text')
                .attr('class', 'genderVotesTitle')
                .text('Joy');
    colorLegendBox.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', stackBarColors.meh)
                    .attr('transform', 'translate(30, 5)');
    colorLegendBox.append('text')
                .attr('class', 'genderVotesTitle')
                .text('Meh').attr('transform', 'translate(30, 0)');;
                            colorLegendBox.append('rect')
                                .attr('width', 20)
                                .attr('height', 20)
                                .attr('transform', 'translate(60, 5)')
                                .attr('fill', stackBarColors.despair);
                            colorLegendBox.append('text')
                                        .attr('class', 'genderVotesTitle')
                                        .attr('transform', 'translate(60, 0)')
                                        .text('Despair');
    updateBarChart('ALL');
}



function updateBarChart(filter) {
    candyBarChartSVG.selectAll('.bar').remove();
    if (filter === 'ALL') {
         barChartXaxis.ticks(16);
    }
    if (filter === 'JOY') {
        dataByCandy.sort(function(a, b) {
            return b.joy - a.joy;
        });
        barChartXaxis.ticks(13);
    }

        if (filter === 'DESPAIR') {
            dataByCandy.sort(function(a, b) {
                return b.despair - a.despair;
            });
            barChartXaxis.ticks(11);
        }


        dataByCandy.forEach(function(d, i) {
            barChartRange[i] = candyData[d.key].name;
        });

        barChartXscale.domain([0, domainMap[filter]]);
        barChartYscale.domain(barChartRange);

        xAxisG.transition(250).call(barChartXaxis);
        yAxisG.transition(250).call(barChartYaxis);


        var barHeight = (barChartHeight - 155)/Object.keys(candyData).length;
        var barBand = (barChartHeight - padding.b)/Object.keys(candyData).length;
        var barTip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([20, 100]);

        if (filter === 'ALL') {
            var key = ['joy', 'despair', 'meh'];
            var stack = d3.stack()
                .keys(key)
                .offset(d3.stackOffsetNone);
            var layers = stack(dataByCandy);
            dataByCandy.sort(function(a, b) {
                return b.joy - a.joy;
            });

        var bars = candyBarChartSVG.selectAll(".bar")
            .data(layers)
            .enter().append("g")
            .attr("class", "bar")
            .attr('transform', function(d, i){
                    return 'translate('+[1.6*padding.l, 0]+')';
            })
            .style("fill", function(d) {console.log(d.key); return stackBarColors[d.key]});


          bars.selectAll("rect")
              .data(function(d) { return d; })
              .enter().append("rect")
              .attr("x", function(d) { return barChartXscale(d[0]); })
              .attr("y", function(d, i) { return i * barBand;})
              .attr("height", barHeight)
              .attr("width", function(d) { return barChartXscale(d[1]) - barChartXscale(d[0]) });

        } else {
            barTip.html(function(d, i) {
                var name = candyData[d.key].name;
                return "<strong style='color:white'>"  + name
                    + "</strong><br>"+ filter +" : " + d[filter.toLowerCase()] + '<br>';
             });

        candyBarChartSVG.call(barTip);

        var bars = candyBarChartSVG.selectAll('.bar')
            .data(dataByCandy, function(d) {
                return d.key;
            });

        var barsEnter = bars.enter()
            .append('g')
            .attr('class', 'barG');

        var bar = barsEnter
            .append('rect')
            .attr('class', 'bar')
            .on('mouseenter', barTip.show)
            .on('mouseover', function(d) {
                candyBarChartSVG.selectAll('.bar')
                .attr('opacity', function(e) {
                    return d.key == e.key ? 1 : 0.3;
                });
                drawPieChart(filter, d.key);

            })
            .on('mouseleave', function() {
                candyBarChartSVG.selectAll('.bar')
                    .attr('opacity', 1);
                candyGenderBox.selectAll('.arc').remove();
                candyGenderBox.selectAll('.gender_details').remove();
            })
            .on('mouseout', barTip.hide);

        bar.attr('transform', function(d, i){
                return 'translate('+[1.6*padding.l, (i * barBand)]+')';
            })
            .transition().duration(400)
            .attr('width', function(d) { return barChartXscale(d[filter.toLowerCase()]); })
            .attr('height', () => barHeight )
            .attr('fill', stackBarColors[filter.toLowerCase()]);
        }
}

function onBarSelectChanged() {
    // Get current value of select element
    var select = d3.select('#candyFeelingSelect').node();
    feeling = select.options[select.selectedIndex].value;
    barSelectedFeeling = feeling;
    updateBarChart(barSelectedFeeling);

    // if (barSelectedFeeling === 'JOY') {
    //         updateMap('top_joy');
    // }
    // if (barSelectedFeeling === 'DESPAIR') {
    //      updateMap('top_despair');
    // }
}

function drawPieChart(feeling, candy) {
        candyGenderBox.selectAll('.arc').remove();

        var pieChartData = [];

        var pieRadius = 65;

        var labels = {}

            var path = d3.arc()
                .innerRadius(0)
                .outerRadius(pieRadius);

            var pathLabel = d3.arc()
                  .innerRadius(0)
                  .outerRadius(2.5*pieRadius);

            var genderPie = d3.pie()
                .value(function(d) {return d.value;})
                .sort(null);

            if (feeling === 'JOY') {
               joyByGender = candyData[candy].joy_by_gender[0];
               genderKeys = Object.keys(joyByGender);
               genderKeys.forEach(
                 function(key,i) {
                        key_arr = key.split("_");
                        gender = key_arr[key_arr.length - 1];
                        return pieChartData[i] = {
                            'key' : key,
                            'value' : joyByGender[key],
                            'gender' : gender,
                            'color' : genderToColor[gender]
                        };
                    }
                );
            }
            if (feeling === 'DESPAIR') {
                despairByGender = candyData[candy].despair_by_gender[0];
                genderKeys = Object.keys(despairByGender);
                genderKeys.forEach(
                       function(key,i) {
                        key_arr = key.split("_");
                        gender = key_arr[key_arr.length - 1];
                        return pieChartData[i] = {
                            'key' : key,
                            'value' : despairByGender[key],
                            'gender' : gender,
                            'color' : genderToColor[gender]
                        };
                    }
                );
            }

             var arcs = candyGenderBox.selectAll('.arc')
                .data(genderPie(pieChartData))
                .enter()
                .append('g')
                .attr('class', 'arc')

                arcs.append('path')
                    .attr('d', path)
                    .attr('fill', function(d) {return d.data.color;});

            arcs.append("text")
                .attr('class', 'label')
                .attr('transform', function(d) {
                    var pos = pathLabel.centroid(d);
                    if (d.data.gender === "Male") {
                        pos[0] = pos[0] - 40;
                    }
                    if (d.data.gender === "Other") {
                       pos[0] = pos[0] - 50;
                   }

                    if (d.data.gender === "Female") {
                       pos[0] = pos[0] - 20;
                   }
                    return "translate(" + pos + ")";
                })
                .attr('dy', '0.35em')
                .attr("dx", ".35em")
                .text(function(d) {return d.data.gender + ' ' + Math.round(d.data.value, 1) + '%';});
}

function drawRankLineGraph() {
    var lineGraphWidth = parseInt(d3.select('div#rankLineGraphContainer').style('width'), 10);
    var lineGraphHeight = parseInt(d3.select('div#rankLineGraphContainer').style('height'), 10);

    // var dateDomain = [new Date(2014, 0), new Date(2017, 2)];
    var xScale = d3.scaleLinear().domain([2014, 2017]).range([0, lineGraphWidth - 50]);
    var yScale = d3.scaleLinear().domain([0, 12]).range([0, lineGraphHeight - padding.b]);

    var xAxis = d3.axisBottom(xScale).ticks(4).tickFormat(d3.format('d'));;
    var yAxis = d3.axisLeft(yScale).ticks(12);

    var graphG = lineGraphSVG.selectAll('.lineG')
        .data(candyRankData)
        .enter()
        .append('g')
        .attr('class', 'lineG')
        .attr('transform', 'translate(25, 10)');

    lineGraphSVG.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(50,' + (lineGraphHeight - padding.b + 10) + ')')
        .call(xAxis);

    lineGraphSVG.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(50,' + 10 + ')')
        .call(yAxis);

    var lineInterpolate = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.rank); });

    graphG.selectAll('.line-graph')
        .data(function(d) {
            return [d.data];
        })
        .enter()
        .append('path')
        .attr('class', 'line-graph')
        .attr('d', lineInterpolate)
        .style('stroke', function(d) {
            return d[0].color;
        })
        .attr('transform', 'translate(25, 0)');
    graphG.append('text')
        .attr('transform', function(d) {
            return 'translate(' + [xScale(d.data[3].year) + 35, yScale(d.data[3].rank)] + ')';
        })
        .attr('dy', '.35em')
		.attr('text-anchor', 'start')
        .text(function(d) {
            console.log(d.data[0].key);
            return candyData[d.data[0].key].name;
        });

    graphG.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'bar_chart_axis_label')
        .attr('transform', 'translate(' + [lineGraphWidth/2, lineGraphHeight - padding.b + 35] + ')')
        .text('Year');

    graphG.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'bar_chart_axis_label')
        .attr('transform', 'translate(' + [0, (lineGraphHeight - padding.b + 35)/2] + ') rotate(270)')
        .text('Rank');
}
