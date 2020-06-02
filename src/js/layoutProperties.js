import $ from 'jquery';

let layoutProperties = {

};

let defaultFcoseProperties = {
  name: "fcose",
  quality: "default",
  randomize: true,
  packComponents: true,  
  uniformNodeDimensions: false,
  animate: true,
  tile: true,
  initialEnergyOnIncremental: 0.3,
  step: "all"
};

let defaultCoseProperties = {
  name: "cose-bilkent",
  quality: "default",
  randomize: true,
  animate: true,
  animationDuration: 1000,
  uniformNodeDimensions: false,
  tile: true,
  initialEnergyOnIncremental: 0.3
};

let defaultColaProperties = {
  name: "cola",
  quality: "default",
  randomize: true,
  animate: true,
  uniformNodeDimensions: false,
  tile: true,
  initialEnergyOnIncremental: 0.3
};

let currentFcoseProperties = $.extend(true, {}, defaultFcoseProperties);
let currentCoseProperties = $.extend(true, {}, defaultCoseProperties);
let currentColaProperties = $.extend(true, {}, defaultColaProperties);

layoutProperties.getFcoseProperties = function() {
  return currentFcoseProperties;
};

layoutProperties.getCoseProperties = function() {
  return currentCoseProperties;
};

layoutProperties.getColaProperties = function() {
  return currentColaProperties;
};

layoutProperties.setCurrentProperties = function() {
  let fcoseQuality = "default";
  if (document.getElementById("fcose_quality").selectedIndex === 0) {
    fcoseQuality = "draft";
  }
  else if (document.getElementById("fcose_quality").selectedIndex === 2) {
    fcoseQuality = "proof";
  }
  currentFcoseProperties.quality = fcoseQuality;
  currentFcoseProperties.randomize = document.getElementById("fcose_randomize").checked;
  currentFcoseProperties.packComponents = document.getElementById("fcose_packComponents").checked;
  currentFcoseProperties.uniformNodeDimensions = document.getElementById("fcose_uniformNodeDimensions").checked;
  currentFcoseProperties.animate = document.getElementById("fcose_animate").checked;
  currentFcoseProperties.tile = document.getElementById("fcose_tile").checked;

  let coseQuality = "default";
  if (document.getElementById("cose_quality").selectedIndex === 0) {
    coseQuality = "draft";
  }
  else if (document.getElementById("cose_quality").selectedIndex === 2) {
    coseQuality = "proof";
  }
  currentCoseProperties.quality = coseQuality;
  currentCoseProperties.randomize = document.getElementById("cose_randomize").checked;
  currentCoseProperties.uniformNodeDimensions = document.getElementById("cose_uniformNodeDimensions").checked;
  currentCoseProperties.animate = document.getElementById("cose_animate").checked;
  currentCoseProperties.tile = document.getElementById("cose_tile").checked;
};


layoutProperties.setModalValues = function() {
  let fcoseSelectedIndex;
  if (currentFcoseProperties.quality == "draft") {
    fcoseSelectedIndex = 0;
  }
  else if (currentFcoseProperties.quality == "default") {
    fcoseSelectedIndex = 1;
  }
  else {
    fcoseSelectedIndex = 2;
  }
  document.getElementById("fcose_quality").selectedIndex = fcoseSelectedIndex;
  document.getElementById("fcose_randomize").checked = currentFcoseProperties.randomize;
  document.getElementById("fcose_packComponents").checked = currentFcoseProperties.packComponents;
  document.getElementById("fcose_uniformNodeDimensions").checked = currentFcoseProperties.uniformNodeDimensions;
  document.getElementById("fcose_animate").checked = currentFcoseProperties.animate;
  document.getElementById("fcose_tile").checked = currentFcoseProperties.tile;

  let coseSelectedIndex;
  if (currentCoseProperties.quality == "draft") {
    coseSelectedIndex = 0;
  }
  else if (currentCoseProperties.quality == "default") {
    coseSelectedIndex = 1;
  }
  else {
    coseSelectedIndex = 2;
  }
  document.getElementById("cose_quality").selectedIndex = coseSelectedIndex;
  document.getElementById("cose_randomize").checked = currentCoseProperties.randomize;
  document.getElementById("cose_uniformNodeDimensions").checked = currentCoseProperties.uniformNodeDimensions;
  document.getElementById("cose_animate").checked = currentCoseProperties.animate;
  document.getElementById("cose_tile").checked = currentCoseProperties.tile;
};

export {layoutProperties};