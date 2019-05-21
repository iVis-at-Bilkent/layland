# layland
Cytoscape.js-based graph layout and analysis tool. Enjoy [here](https://ivis-at-bilkent.github.io/layland/)!

Currently supports [cose-bilkent](https://github.com/cytoscape/cytoscape.js-cose-bilkent), [fcose](https://github.com/iVis-at-Bilkent/cytoscape.js-fcose) and [cola](https://github.com/cytoscape/cytoscape.js-cola) layouts. 

#### Running a Local Instance
In order to deploy and run a local instance of the tool, please follow the steps below:

- Installation
```
git clone https://github.com/iVis-at-Bilkent/layland.git
cd layland
npm install 
```

- Build and Start
```
npm run build
(sudo) npm start
```

Then, open a web browser and navigate to localhost. Please note that the default port is 80 but you can run this application in another port by setting 'port' environment variable.
