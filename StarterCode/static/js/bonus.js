// set url
//const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log output
// d3.json(url).then(function(data) {
//     console.log(data);
// });

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

        gaugeChart(defaultId);
    });

};

//Funtion for charts based on selection

function gaugeChart(newId) {

    // Use D3 to fetch the new data based on the selected data
    d3.json(url).then((data) => {
        let metaData = data.metadata;

        // Filter data for chosen id
        let filteredData = metaData.filter((sample) => sample.id == newId)[0];

        // GAUGE CHART
        // Create trace for gauge chart
        traceGauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: filteredData.wfreq,
            type: "indicator",
            mode: "gauge+number",
            title: { text: "<b>Belly Button Washing frequency</b><br>Scrubs per Week", 
            font: { size: 20 } },
            gauge: {
                axis: { range: [null, 9], tickmode: "angular"},
                shape: "angular",
                bgcolor: "white",
                borderwidth: 1,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1], color: "#FFFFFF"},
                  { range: [1, 2], color: "#FEFEFA"},
                  { range: [2, 3], color: "#FBFCF8"},
                  { range: [3, 4], color: "#FDFFF5" },
                  { range: [4, 5], color: "#F8F8E8" },
                  { range: [5, 6], color: "#F9FFE3" },
                  { range: [6, 7], color: "#F1F9EC" },
                  { range: [7, 8], color: "#E9FFDB" },
                  { range: [8, 9], color: "#D0F0C0" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 1,
                    value: filteredData.wfreq
                }
            }
        };

        // Data array
        let traceDataGauge =[traceGauge];

        // Apply the layout
        let layoutGauge =  {
            width: 450,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "#FEFEFA",
            font: { color: "darkblue", family: "Arial" }
        }; 
        
        
        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot("gauge", traceDataGauge, layoutGauge);
    });
};
// Function to update graphs and info when a new ID is chosen
function optionChanged(newSample) { 

    gaugeChart(newSample);
};

init();
