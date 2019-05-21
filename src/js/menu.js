import $ from 'jquery';
import 'bootstrap';
import {cy} from './cy-utilities';
import { saveAs } from 'file-saver';

$("body").on("change", "#inputFile", function(e, fileObject) {
  var inputFile = this.files[0] || fileObject;

  if (inputFile) {
    var fileExtension = inputFile.name.split('.').pop();
    var r = new FileReader();
    r.onload = function(e) {
      cy.remove(cy.elements());
      var content = e.target.result;
      if(fileExtension == "graphml" || fileExtension == "xml"){
        cy.graphml({layoutBy: 'null'});
        cy.graphml(content);
      }
      else{
        var tsv = cy.tsv();
        tsv.importTo(content);        
      }
    };
    r.addEventListener('loadend', function(){
      if(!fileObject)
        document.getElementById("fileName").innerHTML = inputFile.name;
      
      if(inputFile.name == "samples/sample1.graphml"){
        cy.nodes().forEach(function(node, i){
          let width = [30, 70, 110];
          let size = width[i%3];
          node.css("width", size);
          node.css("height", size);
        });
      }
      
      $("#runLayout").trigger("click");
    });
    r.readAsText(inputFile);
  } else { 
    alert("Failed to load file");
  }
  $("#inputFile").val(null);
});

document.getElementById("openFile").addEventListener("click", function(){
  document.getElementById("inputFile").click();
});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

document.getElementById("saveFile").addEventListener("click", function(){
  let graphString = cy.graphml();
  download('graph.graphml', graphString);
});

document.getElementById("saveJPG").addEventListener("click", function(){
  let jpgContent = cy.jpg({output: "blob", scale: 2, full: true});
  saveAs(jpgContent, "graph.jpg");
});

function evaluate(layoutTime){
  let graphProperties = cy.layvo("get").generalProperties();
	document.getElementById("numOfNodes").innerHTML = cy.nodes().length;
	document.getElementById("numOfEdges").innerHTML = cy.edges().length;	
  document.getElementById("layoutTime").innerHTML = Math.round(layoutTime * 10 ) / 10 + " ms"; 
	document.getElementById("numberOfEdgeCrosses").innerHTML = graphProperties.numberOfEdgeCrosses;
	document.getElementById("numberOfNodeOverlaps").innerHTML = graphProperties.numberOfNodeOverlaps;
	document.getElementById("averageEdgeLength").innerHTML = Math.round(graphProperties.averageEdgeLength * 10 ) / 10;
	document.getElementById("totalArea").innerHTML = Math.round(graphProperties.totalArea * 10 ) / 10;
}

$("body").on("click", "#runLayout", function(){
  let layoutType = document.getElementById("layout");
  let quality = $("#quality").find("option:selected").text();
  let randomize = $("#randomize").is(":checked");

  let startTime;
  let endTime;
  
  if(layoutType.options[layoutType.selectedIndex].text == "fCoSE") {
    startTime = performance.now();
    cy.layout({name: "fcose", quality: quality, randomize: randomize, tile: true}).run();
    endTime = performance.now();
    evaluate(endTime - startTime);
  }
  else if(layoutType.options[layoutType.selectedIndex].text == "CoSE"){
    startTime = performance.now();
    cy.layout({name: "cose-bilkent", quality:quality, randomize: randomize, animationDuration: 1000}).run();
    endTime = performance.now();
    evaluate(endTime - startTime);
  }
  else if(layoutType.options[layoutType.selectedIndex].text == "Cola"){
    startTime = performance.now();
    cy.layout({name: "cola", randomize: true, animate: false}).run();
    endTime = performance.now();
    evaluate(endTime - startTime);
  }
  else {
    startTime = performance.now();
    cy.layout({name: "random", padding: 20}).run();
    endTime = performance.now();
    evaluate(endTime - startTime);    
  }
});

function loadXMLDoc(fileName) {
	var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // for IE 5/6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", fileName, false);
    xhttp.send();
    return xhttp.response;
}

function loadSample(fileName){
	var xmlResponse = loadXMLDoc(fileName);

	var fileObj = new File([xmlResponse], fileName, {
		type: "text/plain"
	});

	return fileObj;
}

$("body").on("change", "#samples", function() {
	let samples = document.getElementById("samples");
	let graph = loadSample("samples/"+samples.options[samples.selectedIndex].text+".graphml");
	$("#inputFile").trigger("change", [graph]);
  document.getElementById("fileName").innerHTML = samples.options[samples.selectedIndex].text + ".graphml";
});

$( document ).keypress(function( event ) {
  let keycode = (event.keyCode ? event.keyCode : event.which);
  if ( keycode == 110 ) {
    event.preventDefault();
    cy.add({
        group: 'nodes'
    });
  }
  else if ( keycode == 101 ) {
    event.preventDefault();
    if(cy.nodes(":selected").length == 2)
      cy.add({ group: 'edges', data: {source: cy.nodes(":selected")[0].data("id"), target: cy.nodes(":selected")[1].data("id") } });
  }
  else if ( keycode == 127 ) {
    event.preventDefault();
    cy.elements(":selected").remove();
  }
  else if ( keycode == 108 ) {
    event.preventDefault();
    $("#runLayout").trigger("click");
  }
});

export {evaluate};



