import React from 'react';
import ReactDOM from 'react-dom';
import { h1, Button, Container, Row, Col } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css"
import Tile from "./tile";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            currentPOS: outerPOS
        })
        const startPOS = outerPOS
        console.log("state at start: ", this.state)
        return startPOS
    }





    componentDidUpdate() {
        // checkwin here by comparing startPOS to currentPOS
        // disable all click handlers if checkwin goes through
    }

    async makeMove(foundTile, zeroTile) {
        console.log("makeMove ran");
        console.log(foundTile);
        console.log(zeroTile);
        // create proxy variables
        let ft1= foundTile.position[0];
        let ft2= foundTile.position[1]; 
        let zt1=zeroTile.position[0];
        let zt2=zeroTile.position[1]; 
        let tempTile=foundTile;
        console.log("tempTile: ", tempTile);
        foundTile = zeroTile;
        foundTile.position=[ft1,ft2];
        console.log("foundTile: ", foundTile)
        let blankTile = tempTile;
        blankTile.position=[zt1,zt2];
        console.log("blankTile: ", blankTile);
        let tempArray = this.state.currentPOS;
        console.log(tempArray);
        tempArray[ft1][ft2] = foundTile;
        tempArray[zt1][zt2] = blankTile;
        console.log(tempArray);
        await this.setState({
            currentPOS : tempArray
        });
        console.log(this.state);
    }



    handleClick(e) {
        e.preventDefault();
        console.log("tile: ", e.target.id)
        let clickArr = this.state.currentPOS;
        let foundTile = clickArr.map(y => y.find((x) => { if (x.id == e.target.id) return x })).filter(x => x != undefined)
        foundTile = foundTile[0];
        console.log(foundTile, "tile POS: ", foundTile.position)
        let ind1 = foundTile.position[0]
        let ind2 = foundTile.position[1]
        let blank = [0, 0]

        if (ind1 - 1 >= 0 &&
            JSON.stringify(clickArr[ind1 - 1][ind2].id) ===
            JSON.stringify(blank)) 
            { this.makeMove(foundTile, clickArr[ind1 - 1][ind2]) }
        else if (ind1 + 1 < clickArr.length && 
            JSON.stringify(clickArr[ind1 + 1][ind2].id) === 
            JSON.stringify(blank)) 
            { this.makeMove(foundTile, clickArr[ind1 + 1][ind2]) }
        else if (ind2 - 1 >= 0 && 
            JSON.stringify(clickArr[ind1][ind2 - 1].id) === 
            JSON.stringify(blank)) 
            { this.makeMove(foundTile, clickArr[ind1][ind2 - 1]) }
        else if (ind2 + 1 < clickArr[ind1].length && 
            JSON.stringify(clickArr[ind1][ind2 + 1].id) === 
            JSON.stringify(blank)) 
            { this.makeMove(foundTile, clickArr[ind1][ind2 + 1]) }
        else { console.log("not a valid move") }

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