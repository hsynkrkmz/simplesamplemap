import React, { Component } from "react";
import ComponentMap from "./componentmap.js";

import * as THREE from "three";

class SampleComponent extends Component {
  constructor(props) {
    super(props);
    this.glcomp = React.createRef();
  }
  componentDidMount() {
    this.glcomp.current.addShape(
      "https://ows.terrestris.de/osm/service?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=OSM-WMS&TILED=false&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=40.101821,%2032.971574,40.156400,%2033.041775"
    );
  }

  render() {
    return <ComponentMap ref={this.glcomp} />;
  }
}

export default SampleComponent;
