import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Tile from "./tile";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPOS: [],
            currentPOS: []

        }
        this.starterPositions = this.starterPositions.bind(this);

    }

    componentDidMount() {
        // set startPOS here
        this.starterPositions();
        // shuffle here
    }

    async starterPositions() {
        var innerPOS = [];
        var outerPOS = [];
        for (var i = 0; i < 4; i++) {
            innerPOS = [];
            for (var j = 0; j < 4; j++) {
                let starterTile = {
                    id: [i, j],
                    skin: [i, j]
                }
                innerPOS.push(starterTile)
            }
            outerPOS.push(innerPOS)
        }
        console.log("beginPOS: ", outerPOS)
        await this.setState({
            startPOS: outerPOS,
            currentPOS: outerPOS
        })
        console.log("state at start: ", this.state)
    }

    componentDidUpdate() {
        // change currentPOS
        // checkwin here by comparing startPOS to currentPOS
        // disable all click handlers if checkwin goes through
    }

    handleClick(e) {

        // Math for checking to see if a move can be made: 
        // arr[--, ++ when result != -1 or arr.length][same] or arr[same][--,++ when result != -1 or arr.length].id===[0][0] 
        // then switch
    }

    render() {
        return (
            <Container class="container-flex">
                {this.state.currentPOS.map(
                    (item, index) =>
                        <Row key={index}>{
                            item.map((item2, index2) =>
                                (<Tile
                                    key={index2}
                                    input={item2}
                                />))}</Row>)}
            </Container>
        )
    }
}

export default Board