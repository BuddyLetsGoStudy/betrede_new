import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getScene } from '../../actions/artspace'
import _ from 'lodash';
import FlatSpaceArtobjectModal from "./FlatSpaceArtobjectModal";

class flatSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWall: 1,
            showPopup: false,
            currentArtObject: {title: '', description: '', upload: ''}
        };
    }

    calcWidth = () => {
        const { sceneIsLoading, space, artObjectsRedux } = this.props;
        const { currentWall } = this.state;
        const calcedWidth = document.getElementsByClassName('flat-space-wall')[currentWall - 1].clientWidth;
        const calcedHeight = calcedWidth === 1035 ? 390 : document.getElementsByClassName('flat-space-wall')[currentWall - 1].clientHeight;
        calcedWidth === 1035 ? document.getElementsByClassName('flat-space-wall')[currentWall - 1].style.paddingTop = `${calcedHeight}px` : null
        // const backgroundGradientElem = document.getElementsByClassName('flat-space-gradient-cont')[0];
        // const wallMarginTop = document.getElementsByClassName('flat-space-wall')[currentWall - 1].getBoundingClientRect().x;
        // backgroundGradientElem.style.top = `${wallMarginTop}px`;
        // backgroundGradientElem.style.height = `calc(100% - ${wallMarginTop}px)`;
    
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
        })

        artObjectsRedux.map(artObj => {
            const { position } = artObj;
            const { width, height, upload, name } = artObj.artobject;
            const artObjContElem = document.getElementsByClassName('flat-space-artobject-cont')[position - 1];
            const artObjElem = artObjContElem.firstChild;
            artObjElem.style.width = `${(calcedWidth * 0.00111111) * width * 100}px`;
            artObjElem.style.height = `${(calcedHeight * 0.00285674) * height * 100}px`;
            artObjElem.style.backgroundImage = `url('${upload}')`
            artObjElem.classList.add('flat-space-artobject-active'); 
            artObjElem.innerHTML = `<div class="flat-space-artobject-pic-alt"></div> <div>${name}<br>${width * 100}X${height * 100}cm</div>`
        })
    }

    onHover = e => e.target.firstChild.style.display = 'block';

    onUnHover = e => e.currentTarget.firstChild.style.display = 'none';

    changeWall = e => {
        if (e.target.id === "<") {
            this.setState(prevState => ({currentWall: prevState.currentWall - 1 === 0 ? 4 : prevState.currentWall - 1}))
        } else {
            this.setState(prevState => ({currentWall: prevState.currentWall + 1 === 5 ? 1 : prevState.currentWall + 1}))
        }
    }

    openPopup = e => {
        console.log(this.props.artObjectsRedux);
        console.log(e.currentTarget.id);
        this.setState({showPopup: true, currentArtObject: this.props.artObjectsRedux.filter(el => el.position === parseInt(e.currentTarget.id, 10))[0].artobject})
    }

    closePopup = () => this.setState({showPopup: false});

    componentDidMount(){
        this.props.getScene(this.props.match.params.spaceID)
    }
    
    componentDidUpdate() {
        !this.props.sceneIsLoading && this.calcWidth();
    }

    
    
    render() {
        const { sceneIsLoading, space } = this.props;
        const { currentWall, showPopup, currentArtObject } = this.state;
        const { spaceID } = this.props.match.params;
        const walls = ['first', 'second', 'third', 'fourth']

        if (spaceID && sceneIsLoading) {
            return <div className={'loader'}/>
        } else {
            return (
                <div className="flat-space-cont">
                    <div className="flat-space-left-button" onClick={this.changeWall} id="<"></div>
                    <div className="flat-space-right-button" onClick={this.changeWall} id=">"></div>

                    <div className="flat-space-avatar"/>
                    <div className="flat-space-name">{space.name}</div>
                    {/* {
                        walls.map((num, i) => 
                            <div className={`flat-space-wall ${ currentWall === i + 1 ? '' : 'display-none'}`} id={num}>
                                <div className="flat-space-artobject-cont">
                                    <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={1 * (i + 1)} onClick={this.openPopup}>
                                    </div>
                                </div>
                                <div className="flat-space-artobject-cont">
                                    <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={2 * (i + 1)} onClick={this.openPopup}>
                                    </div>
                                </div>
                                <div className="flat-space-artobject-cont">
                                    <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={3 * (i + 1)} onClick={this.openPopup}>
                                    </div>
                                </div>
                            </div>
                        )
                    } */}

                    <div className={`flat-space-wall ${ currentWall === 1 ? '' : 'display-none'}`} id={1}>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={1} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={2} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={3} onClick={this.openPopup}>
                            </div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 2 ? '' : 'display-none'}`} id={2}>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={4} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={5} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={6} onClick={this.openPopup}>
                            </div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 3 ? '' : 'display-none'}`} id={3}>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={7} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={8} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={9} onClick={this.openPopup}>
                            </div>
                        </div>
                    </div>

                    <div className={`flat-space-wall ${ currentWall === 4 ? '' : 'display-none'}`} id={4}>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={10} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={11} onClick={this.openPopup}>
                            </div>
                        </div>
                        <div className="flat-space-artobject-cont">
                            <div className="flat-space-artobject" onMouseEnter={this.onHover} onMouseLeave={this.onUnHover} id={12} onClick={this.openPopup}>
                            </div>
                        </div>
                    </div>

                    <div className="flat-space-description">{space.description}</div>

                    <a className="flat-space-button" href={`/space/${space.id}/`}>View 3D</a> 

                    <div className="flat-space-gradient-cont">
                        <div className="flat-space-gradient-top"/>
                        <div className="flat-space-gradient-bottom"/>
                    </div>
                    <FlatSpaceArtobjectModal show={showPopup} artObject={currentArtObject} closePopup={this.closePopup}/>
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
