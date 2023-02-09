function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  // Demographics Panel
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
  
      // 1. Create the buildCharts function.
     function buildCharts(sample) {
    
      // 2. Use d3.json to load and retrieve the samples.json file
      d3.json("samples.json").then((data) => {
      console.log(data);
  
      // 3. Create a variable that holds the samples array.
      var samplesArray = data.samples;
      console.log(samplesArray)
  
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var desiredSamples = samplesArray.filter(
        (sampleObj) => sampleObj.id == sample
      );
  
      // 5. Create a variable that filters the metadata array for the object with the desired sample number.
      var metadata = data.metadata;
      var desiredMetadata =  metadata.filter(
        (sampleObj) => sampleObj.id == sample);
  
      //  6. Create a variable that holds the first sample in the array.
      var firstSample = desiredSamples[0];
  
      // 7. Create a variable that holds the first sample in the metadata array.
      var firstMetasample = desiredMetadata [0];
      console.log(firstMetasample);
  
      // 8. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = firstSample.otu_ids;
      var otu_labels = firstSample.otu_labels;
      var sample_values = firstSample.sample_values;
  
      // 9. Create a variable that holds the washing frequency.
      var frequency = firstMetasample.wfreq;
      console.log(frequency);
  
      // 10. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order
      //  so the otu_ids with the most bacteria are last.
  
      var yticks = otu_ids.slice(0, 10).map((otu_id) => `otu_id: ${otu_id}`).reverse();
      var xticks = sample_values.slice(0, 10).reverse();
      var text = otu_labels.slice(0, 10).reverse();
  
      // 11. Create the trace for the bar chart.
      var barData = [
        { 
          y: yticks, 
          x: xticks, 
          text: text, 
          type: "bar", 
          orientation: "h" 
        },
      ];
      // 12. Create the layout for the bar chart.
      var barLayout = { title: "Top 10 Bacteria Cultures Found", height: 400 };
  
      // 13. Create the layout for the bubble chart.
      var bubbleLayout = {title: 'Bacteria Cultures per Sample', showlegend: false, height: 600, width: 900}; 
  
      // 14. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bar", barData, barLayout);
      
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          marker: {
            size: sample_values,
            color: otu_ids, 
            colorscale: 'Earth'
          }
        }
      ];
      console.log(bubbleData);
  
      // 15. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
      // 16. Create the trace for the gauge chart.
      var gaugeData = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: frequency,
          title: {text: "Belly Button Washing Frequency"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {range: [null, 10]},
            bar: {color: "black"},
            steps: [
              {range: [0, 2], color: "red" },
              {range: [2, 4], color: "orange"},
              {range: [4, 6], color: "yellow" },
              {range: [6, 8], color: "lightgreen"},
              {range: [8, 10], color: "green"}
              ],
          }
        } 
      ];
        
      // 17. Create the layout for the gauge chart.
      var gaugeLayout = {width: 475, height: 400, margin: { t: 0, b: 0 }   
      };
    
      // 18. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
      });
  }