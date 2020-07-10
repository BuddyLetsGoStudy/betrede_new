import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getScene } from '../../actions/artspace'

class flatSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWall: 1
        };
    }

    calcWidth = () => {
        const { sceneIsLoading, space, artObjectsRedux } = this.props;
        const {currentWall} = this.state;
        console.log(space, artObjectsRedux);
        const calcedWidth = document.getElementsByClassName('flat-space-wall')[currentWall - 1].clientWidth;
        const calcedHeight = document.getElementsByClassName('flat-space-wall')[currentWall - 1].clientHeight;
        Array.from(document.getElementsByClassName('flat-space-artobject-cont')).map((elem, i) => {
            elem.style.width = `${calcedWidth / 3}px`;
            elem.style.height = `${calcedHeight}px`;
            if (i >= 9) {
                i -= 9;
            } else if (i >= 6) {
                i -= 6
            } else if (i >= 3) {
                i -= 3
            }
            elem.style.left = `${calcedWidth / 3 * i}px`;
            // elem.firstChild.style.width = `${(calcedWidth * 0.00111111) * 29.7}px`;
            // elem.firstChild.style.height = `${(calcedHeight * 0.00285674) * 42}px`;
        })

        artObjectsRedux.map(artObj => {
            const { position } = artObj;
            const { width, height, upload } = artObj.artobject;
            console.log(position, calcedWidth, calcedHeight)
            const artObjContElem = document.getElementsByClassName('flat-space-artobject-cont')[position - 1];
            const artObjElem = artObjContElem.firstChild;
            artObjElem.style.width = `${(calcedWidth * 0.00111111) * width * 100}px`;
            artObjElem.style.height = `${(calcedHeight * 0.00285674) * height * 100}px`;
            artObjElem.style.backgroundImage = `url('${upload}')`
            artObjElem.classList.add('flat-space-artobject-active'); 
        })
    }

    changeWall = e => {
        if (e.target.innerText === "<") {
            this.setState(prevState => ({currentWall: prevState.currentWall - 1 === 0 ? 4 : prevState.currentWall - 1}))
        } else {
            this.setState(prevState => ({currentWall: prevState.currentWall + 1 === 5 ? 1 : prevState.currentWall + 1}))
        }
    }

    componentDidMount(){
        this.props.getScene(this.props.match.params.spaceID)

    }
    
    componentDidUpdate() {
        !this.props.sceneIsLoading && this.calcWidth();
    }
    
    render() {
        const { sceneIsLoading, space } = this.props;
        const { currentWall } = this.state;
        const { spaceID } = this.props.match.params;

        if (spaceID && sceneIsLoading) {
            return <div className={'loader'}/>
        } else {
            return (
                <div className="flat-space-cont">
                    <div className="flat-space-left-button" onClick={this.changeWall}>{"<"}</div>
                    <div className="flat-space-right-button" onClick={this.changeWall}>{">"}</div>

                    <div className="flat-space-avatar"/>
                    <div className="flat-space-name">{space.name}</div>

                    <div className={`flat-space-wall ${ currentWall === 1 ? '' : 'display-none'}`} id="first" >
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 2 ? '' : 'display-none'}`} id="second">
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 3 ? '' : 'display-none'}`} id="third">
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 4 ? '' : 'display-none'}`} id="fourth">
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject"></div>
                        </div>
                    </div>

                    <div className="flat-space-description"></div>

                    <div className="flat-space-button">View in 3D</div>

                    <div className="flat-space-gradient-cont">
                        <div className="flat-space-gradient-top"/>
                        <div className="flat-space-gradient-bottom"/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    artObjectsRedux: state.artspace.artObjects,
    space: state.artspace.space,
    sceneIsLoading: state.artspace.sceneIsLoading,
    artObjectsData: state.artspace.artObjectsData
})

export default connect(mapStateToProps, { getScene })(flatSpace)
