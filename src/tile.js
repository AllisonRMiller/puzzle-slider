import React from 'react';
import ReactDOM from 'react-dom';
import {Col} from "reactstrap";

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:[],
            skin:[],
        }
    }
    componentDidMount(){
        this.setState({
            id: this.props.input.id,
            skin: this.props.input.skin,
        })
        console.log("Tile state: ", this.state)
    }


    render(){
        return(
            <Col id={this.state.id}>
                {this.state.skin}
            </Col>
        )
    }
}

export default Tile