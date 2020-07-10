import React, { Component } from 'react'

class MobileButton extends Component {
    componentDidMount(){
        fetch("https://api.lingualeo.com/getTranslates", {method: 'POST',headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "Origin": "api.lingaleo.com"
            }, body: JSON.stringify({"text": "car", "apiVersion": "1.0.0"})})
                .then(res=>console.log(res))
        .then(res => console.log(res));
    }
    render() {
        return (
            <div>
                <a className="mobile-button" href={`uniwebview://space?id=${this.props.match.params.spaceID}`}>Enter a space</a>
            </div>
        )
    }
}


export default MobileButton;
