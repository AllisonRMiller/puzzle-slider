import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container, Row} from "reactstrap";
import Tile from "./tile";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winPOS: [],
            currentPOS: []
        }

        this.starterPositions = this.starterPositions.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.shuffle=this.shuffle.bind(this);
        this.generateCheckWin = this.generateCheckWin.bind(this);

    }

    componentDidMount() {
        // set startPOS here
        this.starterPositions();
        this.generateCheckWin();
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
        console.log("state at start: ", this.state)
    }


    async generateCheckWin(){
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
        let endPOS=outerPOS;
        await this.setState({
            winPOS: endPOS
        })
    }
    


    componentDidUpdate() {
        // checkwin here by comparing startPOS to currentPOS
        console.log("component updated");
        console.log("winArray: ", this.state.winPOS);
        let finishPOS = JSON.stringify(this.state.winPOS);
        let localPOS = JSON.stringify(this.state.currentPOS);
        if (localPOS===finishPOS){console.log("win!")}
        // popup will fire when win condition met
    }

    async makeMove(foundTile, zeroTile) {
        console.log("makeMove ran");

        let ft1= foundTile.position[0];
        let ft2= foundTile.position[1]; 
        let zt1=zeroTile.position[0];
        let zt2=zeroTile.position[1]; 
        let tempTile=foundTile;
        foundTile = zeroTile;
        foundTile.position=[ft1,ft2];
        let blankTile = tempTile;
        blankTile.position=[zt1,zt2];
        let tempArray = this.state.currentPOS;
        tempArray[ft1][ft2] = foundTile;
        tempArray[zt1][zt2] = blankTile;
        console.log(tempArray);
        await this.setState({
            currentPOS : tempArray
        });
        console.log(this.state);
    }


    async handleClick(e) {
        e.preventDefault();
        let clickArr = this.state.currentPOS;
        let foundTile = await clickArr.map(y => y.find((x) => { if (x.id == e.target.id) return x })).filter(x => x != undefined)
        console.log("foundTile: ",foundTile);
        foundTile = foundTile[0];
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

    async shuffle(){
        console.log("Shuffle ran");
        let clickArr = this.state.currentPOS;
        console.log(clickArr);
        let blankCoord = [0,0];
        let tempArray = clickArr;
        // zero tile identifies all neighbors and randomly selects a move from one of these options
        for (let i = Math.floor(Math.random() * 40)+10; i>0; i--){
        let blankTile = clickArr.map(y => y.find((x) => { if (JSON.stringify(x.id) == JSON.stringify(blankCoord)) return x })).filter(x => x != undefined);
        blankTile= blankTile[0];
        let blankInd1= blankTile.position[0];
        let blankInd2= blankTile.position[1];
        let blankNeighbors = [];
        if(blankInd1 - 1 >= 0){blankNeighbors.push([blankInd1-1,blankInd2])};
        if(blankInd1 + 1 < clickArr.length ){blankNeighbors.push([blankInd1+1,blankInd2])};
        if(blankInd2 - 1 >= 0){blankNeighbors.push([blankInd1,blankInd2-1])};
        if(blankInd2 + 1 < clickArr.length){blankNeighbors.push([blankInd1,blankInd2+1])};
        let randomNeighbor = Math.floor((Math.random()) * (blankNeighbors.length));
        let newNeighbor = blankNeighbors[randomNeighbor];
        let tempTile=clickArr[newNeighbor[0]][newNeighbor[1]];
        let neighborTile = blankTile;
        neighborTile.position=[newNeighbor[0],newNeighbor[1]];
        let zeroTile = tempTile;
        zeroTile.position=[blankInd1,blankInd2];
        tempArray[newNeighbor[0]][newNeighbor[1]] = neighborTile;
        tempArray[blankInd1][blankInd2] = zeroTile}
        console.log("tempArray: ", tempArray)
        await this.setState({
            currentPOS : tempArray
        });
    }


    // make button say "start">"retry"> on win "Play again">reset board
    render() {
        return (
            <Container className="border text-center bg-light">
                <Row className="justify-content-center">
                    <h1 className="text-info">Puzzle Slider</h1>
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
                                <Row className="justify-content-center"><Button className="btn btn-primary" onClick={this.shuffle}>Start</Button></Row>
            </Container>
        )
    }
}

export default Board