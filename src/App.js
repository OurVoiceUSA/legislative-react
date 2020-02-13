import React, { Component } from 'react';
import LRTree from 'legislative-rtree';
import {geolocated} from 'react-geolocated';

import Location from './components/location-component/location.component'
import Districts from './components/district/districts.component'
import Profile from './components/profile/profile.component'

function _browserLocation(props) {
  if (!props.isGeolocationAvailable || !props.isGeolocationEnabled)
    return {};
  if (props.coords)
    return {
      lng: props.coords.longitude,
      lat: props.coords.latitude
    };
  return {};
}



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      districts: [],
      civ: {},
    };
  }

  componentDidMount() {
    this._loadData();
  }

  _loadData = async () => {
    let tree = new LRTree();

    let location = _browserLocation(this.props);

    if (!location.lng) {
      setTimeout(() => this._loadData(), 500);
      return;
    } 

    let districts = await tree.getDistricts(location.lng, location.lat);
    let civ = await tree.mimicGoogleCivicsAPI(location.lng, location.lat);

    this.setState({civ, districts});
  }

  render() {
    const {civ, districts} = this.state;
    let properties = ["name", "address", "line1", "line2", "line3", "zip", "phone", "phones", "photoUrl", "city", "party", "urls", "type", "id"]
    let location = _browserLocation(this.props);
    if (!location.lng || !location.lat) return (<div>Loading location from browser...</div>);

    return (
      <div>
         <Location location={location}/>
        <br />
        <br />
        <Districts dist={districts}/> 
        <br />
        <br />
        <Profile official={civ} propElem={properties} />
      </div>
    );
  }
}



export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
