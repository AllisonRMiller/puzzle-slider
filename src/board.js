import React from 'react';
import ReactDOM from 'react-dom';
import { h1, Button, Container, Row, Col } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css"
import Tile from "./tile";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPOS: [],
            currentPOS: []

        }
        this.starterPositions = this.starterPositions.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.makeMove = this.makeMove.bind(this);

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
                    skin: [i, j],
                    position: [i, j]
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
        // checkwin here by comparing startPOS to currentPOS
        // disable all click handlers if checkwin goes through
    }

    makeMove() {
        console.log("makeMove ran")
        // temporary object 
    }



    handleClick(e) {
        e.preventDefault();
        console.log("tile: ", e.target.id)//This is not actually displaying props this is grabbing an html id
        let clickArr = this.state.currentPOS;
        // let clickTile = e.target.id.split(",").map(x=>parseInt(x))
        console.log(clickArr);
        // console.log(clickTile);
        var foundTile = clickArr.map(y => y.find((x) => { if (x.id == e.target.id) return x })).filter(x => x != undefined)
        // function findTile(){for (let i=0; i<clickArr.length; i++){clickArr[i].find((x)=>{return x.id===clickTile})}}
        // findTile()
        foundTile = foundTile[0];
        console.log(foundTile, "tile POS: ", foundTile.position)
        var ind1 = foundTile.position[0]
        console.log(ind1)
        var ind2 = foundTile.position[1]
        console.log(ind2)
        var blank = [0, 0]
        // console.log(typeof clickArr[ind1 - 1][ind2].id)
        // console.log("ID of upward neighbor: ", clickArr[ind1 - 1][ind2].id,
        //     "blank: ", blank,
        //     "comparison result: ", JSON.stringify(clickArr[ind1 - 1][ind2].id) === JSON.stringify(blank))
        if (ind1 - 1 >= 0 && JSON.stringify(clickArr[ind1 - 1][ind2].id) === JSON.stringify(blank)){ this.makeMove() }
        else if (ind1 + 1 < clickArr.length && JSON.stringify(clickArr[ind1 + 1][ind2].id) === JSON.stringify(blank)){ this.makeMove() }
        else if (ind2 - 1 >= 0 && JSON.stringify(clickArr[ind1][ind2 - 1].id) === JSON.stringify(blank)){ this.makeMove() }
        else if (ind2 + 1 < clickArr[ind1].length && JSON.stringify(clickArr[ind1][ind2 + 1].id) === JSON.stringify(blank)) { this.makeMove() }
        else { console.log("not a valid move") }

        // Math for checking to see if a move can be made: 
        // arr[--, ++ when result != -1 or arr.length][same] or arr[same][--,++ when result != -1 or arr.length].id===[0][0] 
        // then switch
    }

    render() {
        return (
            <Container className="text-center">
                <Row className="justify-content-center">
                    <h1>Puzzle Slider</h1>
                </Row>
                {this.state.currentPOS.map(
                    (item, index) =>
                        <Row key={index}>{
                            item.map((item2, index2) =>
                                (<Tile
                                    key={index2}
                                    input={item2}
                                    handleClick={this.handleClick}
                                />))}</Row>)}
            </Container>
        )
    }
}

export default Board