import cytoscape from 'cytoscape';
import graphml from "cytoscape-graphml";
import tsv from "../../cytoscape-tsv.js";
import fcose from "cytoscape-fcose";
import coseBilkent from "cytoscape-cose-bilkent";
import cola from "cytoscape-cola";
import layvo from "cytoscape-layvo";
import layoutUtilities from "cytoscape-layout-utilities";
import $ from 'jquery';
import {evaluate} from './menu';

cytoscape.use(graphml, $);
cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(cola);
cytoscape.use(tsv);
cytoscape.use(layvo);
cytoscape.use(layoutUtilities);

let cy = window.cy = cytoscape({
  container: document.getElementById('cy'),
  ready: function(){
    this.layoutUtilities({componentSpacing: 30, desiredAspectRatio: $(this.container()).width() / $(this.container()).height()});
    this.nodes().forEach(function(node, i){
      let width = [30, 70, 110];
      let size = width[i%3];
      node.css("width", size);
      node.css("height", size);
    });
    let startTime;
    let endTime;
    startTime = performance.now();
    this.layout({name: "fcose", padding: 20}).run();
    endTime = performance.now();
    let graphProperties = this.layvo("get").generalProperties();
    document.getElementById("numOfNodes").innerHTML = this.nodes().length;
    document.getElementById("numOfEdges").innerHTML = this.edges().length;
    document.getElementById("layoutTime").innerHTML = Math.round((endTime - startTime) * 10 ) / 10 + " ms";
    document.getElementById("numberOfEdgeCrosses").innerHTML = graphProperties.numberOfEdgeCrosses;
    document.getElementById("numberOfNodeOverlaps").innerHTML = graphProperties.numberOfNodeOverlaps;
    document.getElementById("averageEdgeLength").innerHTML = Math.round(graphProperties.averageEdgeLength * 10 ) / 10;
    document.getElementById("totalArea").innerHTML = Math.round(graphProperties.totalArea * 10 ) / 10; 
  },
//  layout: {name: "fcose", tile:true},
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#ad1a66',
      }
    },
    {
      selector: 'node:parent',
      style: {
        "border-width": 3,
        'background-opacity': 0.333,
        'background-color': '#ad1a66',
        'border-color': '#ad1a66'
      }
    },    
    {
      selector: 'edge',
      style: {
        'line-color': '#ad1a66'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': '#8FBC8F'
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': '#8FBC8F'
      }
    }
  ],
	elements: [{ group:'nodes', data:{ id: 'n0', label: 'n0'}},
    { group:'nodes', data:{ id: 'n1', label: 'n1'}},
    { group:'nodes', data:{ id: 'n2', label: 'n2'}},
    { group:'nodes', data:{ id: 'n3', label: 'n3'}},
    { group:'nodes', data:{ id: 'n4', label: 'n4', parent: 'n37'}},
    { group:'nodes', data:{ id: 'n5', label: 'n5'}},
    { group:'nodes', data:{ id: 'n6', label: 'n6'}},
    { group:'nodes', data:{ id: 'n7', label: 'n7', parent: 'n37'}},
    { group:'nodes', data:{ id: 'n8', label: 'n8', parent: 'n37'}},
    { group:'nodes', data:{ id: 'n9', label: 'n9', parent: 'n37'}},
    { group:'nodes', data:{ id: 'n10', label: 'n10', parent: 'n38'}},
    { group:'nodes', data:{ id: 'n12', label: 'n12'}},
    { group:'nodes', data:{ id: 'n13', label: 'n13'}},
    { group:'nodes', data:{ id: 'n14', label: 'n14'}},
    { group:'nodes', data:{ id: 'n15', label: 'n15'}},
    { group:'nodes', data:{ id: 'n16', label: 'n16'}},
    { group:'nodes', data:{ id: 'n17', label: 'n17'}},
    { group:'nodes', data:{ id: 'n18', label: 'n18'}},
    { group:'nodes', data:{ id: 'n19', label: 'n19'}},
    { group:'nodes', data:{ id: 'n20', label: 'n20'}},
    { group:'nodes', data:{ id: 'n21', label: 'n21'}},
    { group:'nodes', data:{ id: 'n22', label: 'n22'}},
    { group:'nodes', data:{ id: 'n23', label: 'n23'}},
    { group:'nodes', data:{ id: 'n24', label: 'n24', parent: 'n39'}},
    { group:'nodes', data:{ id: 'n25', label: 'n25', parent: 'n39'}},
    { group:'nodes', data:{ id: 'n26', label: 'n26', parent: 'n42'}},
    { group:'nodes', data:{ id: 'n27', label: 'n27', parent: 'n42'}},
    { group:'nodes', data:{ id: 'n28', label: 'n28', parent: 'n42'}},
    { group:'nodes', data:{ id: 'n29', label: 'n29', parent: 'n40'}},
    { group:'nodes', data:{ id: 'n31', label: 'n31', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n32', label: 'n32', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n33', label: 'n33', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n34', label: 'n34', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n35', label: 'n35', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n36', label: 'n36', parent: 'n41'}},
    { group:'nodes', data:{ id: 'n37', label: 'n37'}},
    { group:'nodes', data:{ id: 'n38', label: 'n38'}},
    { group:'nodes', data:{ id: 'n39', label: 'n39', parent: 'n43'}},
    { group:'nodes', data:{ id: 'n40', label: 'n40', parent: 'n42'}},
    { group:'nodes', data:{ id: 'n41', label: 'n41', parent: 'n42'}},
    { group:'nodes', data:{ id: 'n42', label: 'n42', parent: 'n43'}},
    { group:'nodes', data:{ id: 'n43', label: 'n43'}},
    { group:'edges', data:{ id: 'e0', source: 'n0', target: 'n1'} },
    { group:'edges', data:{ id: 'e1', source: 'n1', target: 'n2'} },
    { group:'edges', data:{ id: 'e2', source: 'n2', target: 'n3'} },
    { group:'edges', data:{ id: 'e3', source: 'n0', target: 'n3'} },
    { group:'edges', data:{ id: 'e4', source: 'n1', target: 'n4'} },
    { group:'edges', data:{ id: 'e5', source: 'n2', target: 'n4'} },
    { group:'edges', data:{ id: 'e6', source: 'n4', target: 'n5'} },
    { group:'edges', data:{ id: 'e7', source: 'n5', target: 'n6'} },
    { group:'edges', data:{ id: 'e8', source: 'n4', target: 'n6'} },
    { group:'edges', data:{ id: 'e9', source: 'n4', target: 'n7'} },
    { group:'edges', data:{ id: 'e10', source: 'n7', target: 'n8'} },
    { group:'edges', data:{ id: 'e11', source: 'n8', target: 'n9'} },
    { group:'edges', data:{ id: 'e12', source: 'n7', target: 'n9'} },
    { group:'edges', data:{ id: 'e13', source: 'n13', target: 'n14'} },
    { group:'edges', data:{ id: 'e14', source: 'n12', target: 'n14'} },
    { group:'edges', data:{ id: 'e15', source: 'n14', target: 'n15'} },
    { group:'edges', data:{ id: 'e16', source: 'n14', target: 'n16'} },
    { group:'edges', data:{ id: 'e17', source: 'n15', target: 'n17'} },
    { group:'edges', data:{ id: 'e18', source: 'n17', target: 'n18'} },
    { group:'edges', data:{ id: 'e19', source: 'n18', target: 'n19'} },
    { group:'edges', data:{ id: 'e20', source: 'n17', target: 'n20'} },
    { group:'edges', data:{ id: 'e21', source: 'n19', target: 'n20'} },
    { group:'edges', data:{ id: 'e22', source: 'n16', target: 'n20'} },
    { group:'edges', data:{ id: 'e23', source: 'n20', target: 'n21'} },
    { group:'edges', data:{ id: 'e25', source: 'n23', target: 'n24'} },
    { group:'edges', data:{ id: 'e26', source: 'n24', target: 'n25'} },
    { group:'edges', data:{ id: 'e27', source: 'n26', target: 'n38'} },
    { group:'edges', data:{ id: 'e29', source: 'n26', target: 'n39'} },
    { group:'edges', data:{ id: 'e30', source: 'n26', target: 'n27'} },
    { group:'edges', data:{ id: 'e31', source: 'n26', target: 'n28'} },
    { group:'edges', data:{ id: 'e33', source: 'n21', target: 'n31'} },
    { group:'edges', data:{ id: 'e35', source: 'n31', target: 'n33'} },
    { group:'edges', data:{ id: 'e36', source: 'n31', target: 'n34'} },
    { group:'edges', data:{ id: 'e37', source: 'n33', target: 'n34'} },
    { group:'edges', data:{ id: 'e40', source: 'n16', target: 'n40'} }
  ],
});

export {cy};
