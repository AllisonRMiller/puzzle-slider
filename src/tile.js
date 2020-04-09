import React from 'react';
import ReactDOM from 'react-dom';
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
        console.log("Tile state: ", this.state)
    }


    render(){
        return(
            <Col className="border" onClick={this.props.handleClick} id={this.state.id}>
                {this.state.skin}
            </Col>
        )
    }
}

export default Tile