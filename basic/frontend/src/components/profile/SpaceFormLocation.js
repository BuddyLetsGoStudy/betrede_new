import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class SpaceFormLocation extends Component {
    constructor(props){
        super(props) 
    }

    mapClick = e => this.props.onChangeState('geo', e.get('coords'));

    render() {
        const { geo } = this.props;
        return (
            <div className="space-form-location-cont">
                <div className="space-form-location-map">
                    <YMaps
                        enterprise
                        query={{
                            apikey: '2e5ff6ae-71b4-4e26-baec-fbe0a49a07fd',
                        }}
                        >
                        <Map onClick={this.mapClick} defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={530} height={243}>
                        <Placemark geometry={geo} />
                        </Map>
                    </YMaps>
                </div>
            </div>
        )
    }
}

export default SpaceFormLocation;
