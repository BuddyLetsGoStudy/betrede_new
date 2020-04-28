import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class SpaceFormLocation extends Component {
    constructor(props){
        super(props) 
        this.state = {cords: [0, 0]};
    }

    mapClick = e => this.setState({cords: e.get('coords')}, this.props.onChangeState('geo', `${this.state.cords[0]}, ${this.state.cords[1]}`));

    render() {
        const { cords } = this.state;
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
                        <Placemark geometry={cords} />
                        </Map>
                    </YMaps>
                </div>
            </div>
        )
    }
}

export default SpaceFormLocation;
