import React from 'react';
import ReactDOM from 'react-dom';
// import image from "./public/019Nantahala_Spring_012_Converted.JPG";
import {Col} from "reactstrap";

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:[],
            skin:[],
            position:[],
        }
    }
    async componentDidMount(){
        await this.setState({
            id: this.props.input.id,
            skin: this.props.input.skin,
            position: this.props.input.position
        })
        // console.log("Tile state: ", this.state)
    }

    async componentDidUpdate(){

        // await console.log("Tile state: ", this.state)
    }


    render(){
        // let POS=this.props.input.id;
        // let top = POS[0] * -100;
        // let left = POS[1] * -285;

        return(
            <Col className="border" onClick={this.props.handleClick} id={this.props.input.id} style={{height:100, width:100,overflow:"hidden"}}>
                <h3 className= "text-primary">{this.props.input.skin}</h3>
                {/* <img src="./019Nantahala_Spring_012_Converted.JPG" style={{top:top, left:left}} alt="puzzle slider block"></img> */}
            </Col>
        )
    }
}

export default Tile