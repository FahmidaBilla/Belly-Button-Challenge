// set url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log output
d3.json(url).then(function(data) {
    console.log(data);
});

// Initializes the page and use D3 to select the dropdown menu
function init() {

    let dropdownMenu = d3.select("#selDataset");

    // collect the sample names and populate dropdown menu:
    d3.json(url).then((data) => {

        let names = data.names;

        names.forEach((id) => {

            console.log(id);

            // Add names to the dropdown mene:

            dropdownMenu.append("option").text(id).property("value",id);
        });

        // Default ID add

        let defaultId = names[0];
        // console log result
        console.log(defaultId);

        // create charts and demographic info

        charts(defaultId);
        demoInfo(defaultId);
        gaugeChart(defaultId);
    });

};

// Funtion for charts based on selection

function charts(newId) {

    // Use D3 to fetch the new data based on the selected data
    d3.json(url).then((data) => {
        let sampleData = data.samples;

        // Filter data for chosen id
        let filteredData = sampleData.filter((sample) => sample.id == newId)[0];

        // Get data from sample

        let sample_values = filteredData.sample_values;
        let otu_ids = filteredData.otu_ids;
        let otu_labels = filteredData.otu_labels;

        // BAR CHART
        // Trace for bar chart to display the top 10 results
        
        let traceBar = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: filteredData.otu_labels,
            type: "bar",
            orientation: "h"
        };

        // Data array
        let traceDataBar = [traceBar];

        // Apply a title to the layout
        let layoutBar = {
            title: `Top 10 OTUs found in individual ${newId}`,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
                pad: 4
              }            
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", traceDataBar, layoutBar);
 
        // BUBBLE CHART
        // Create Trace for bubBle chart
        let traceBubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size:sample_values,
                color: otu_ids,
                colorscale:"Earth"
            }
        };

        // Data array
        let traceDataBubble = [traceBubble]

        // Apply a title to the layout
        let layoutBubble = {
            title:"Sample Size by OTU ID",
            xaxis: {title: "OTU ID"},
            hovermode: "closest",
        };

        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot("bubble", traceDataBubble, layoutBubble);
    });
};

//Sample MetaData
// Create Funtion for metadata based on selection
function demoInfo(newId) {
    d3.json(url).then((data) => {

        let metaData = data.metadata;

         // Filter data for chosen id
        let filteredData = metaData.filter((sample) => sample.id == newId)[0];

        // selecting display
        let demoInfoBox = d3.select("#sample-metadata");

          // Clear existing demo info
        demoInfoBox.html("");

        // Append key/value pairs to demo info box
        Object.entries(filteredData).forEach(([key, value]) => {
            demoInfoBox.append("h5").text(`${key}: ${value}`);
        });
    });
};


// Function to update graphs and info when a new ID is chosen
function optionChanged(newSample) { 

    charts(newSample);
    demoInfo(newSample);
    gaugeChart(newSample);
};

init();
