import React from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

// Icon 
import AssetsIcon from 'material-ui/svg-icons/maps/directions-car';
import SearchIcon from 'material-ui/svg-icons/device/gps-fixed';
import TimelineIcon from 'material-ui/svg-icons/action/schedule';
import EnRouteIcon from 'material-ui/svg-icons/action/settings-ethernet';
import ToolsIcon from 'material-ui/svg-icons/action/build';
import CameraIcon from 'material-ui/svg-icons/image/photo-camera';
import HomeIcon from 'material-ui/svg-icons/action/home';
import DistrictIcon from 'material-ui/svg-icons/editor/format-shapes';
import TrafficIcon from 'material-ui/svg-icons/maps/traffic';
import TimeLineIcon from 'material-ui/svg-icons/action/timeline';
import ZoneIcon from 'material-ui/svg-icons/action/aspect-ratio';
import EventsIcon from 'material-ui/svg-icons/editor/bubble-chart';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class MapTools extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    };
	}

	mapTool = (index) => {
	    switch (index) {
	    	case 0:
	    		break;
	    	case 1:
	    		break;
	    }
	}

	render() {

	  	return (

			<div 
                style={{ 
                      position    :'fixed', 
                      bottom      : this.props.bottom,
                      width       : this.props.width,
                      marginLeft  :'auto',
                      marginRight :'auto',
                      display     :'block',
                      zIndex: 2,
                      backgroundColor: '#28A0CF',
                }}
            >

			  	<BottomNavigation 
		  			style={{backgroundColor:'#28A0C'}} >
			          <BottomNavigationItem
			            label={<span style={{fontSize:'10px'}}>HOME</span>}
			            icon={<HomeIcon />}
			            onClick={this.mapTool.bind(this,1)}
			          />
			          <BottomNavigationItem
			            label={<span style={{fontSize:'10px'}}>BOUNDARY</span>}
			            icon={<DistrictIcon />}
			            onClick={this.mapTool.bind(this,2)}
			          />
			          <BottomNavigationItem
			            label={<span style={{fontSize:'10px'}}>CAMERAS</span>}
			            icon={<CameraIcon />}
			            onClick={this.mapTool.bind(this,3)}
			          />
			          <BottomNavigationItem
			            label={<span style={{fontSize:'10px'}}>TRAFFIC</span>}
			            icon={<TrafficIcon />}
			            onClick={this.mapTool.bind(this,4)}
			          />
			          <BottomNavigationItem
			            label={<span style={{fontSize:'10px'}}>ROUTE</span>}
			            icon={<TimeLineIcon />}
			            onClick={this.mapTool.bind(this,5)}
			          />
		        </BottomNavigation>

		    </div>
		);
	}

  
}


