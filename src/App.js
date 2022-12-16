
import './App.css';
import React from "react";
import PrintBoard from "./PrintBoard";
import PrintPlayer from "./PrintPlayer";
import PrintPopUp from "./PrintPopUp";

class App extends React.Component {
    state = {
        draw: false,
        gameOver: false,
        popup : "none",
        turn: false,
        board: [],
        player1: {
            name: "player 1",
            color: "red",
            playing: "playing"
        },
        player2: {
            name: "player 2",
            color: "yellow",
            playing: ""
        }

    }

    constructor(props) {
        super(props);
        this.initBoard();
    }

    initCol = (colNumber) => {
        const rows = 6;
        let newArray = [];
        for (let i = 0; i < rows; i++) {
            const cell = {
                color: "empty",
                colNumber: colNumber
            }
            newArray.push(cell);
        }
        return newArray;
    }
    initBoard = () => {
        const columns = 7;
        for (let i = 0; i < columns; i++) {
            this.state.board.push(this.initCol(i));
        }
    }

    checkTurn = (flag) => {
        let color = "";
        if (flag) {
            color = this.state.player2.color;
            this.setState({
                player1: {
                    playing:"playing",
                    name: this.state.player1.name,
                    color:this.state.player1.color,
                },
                player2: {
                    playing:"",
                    name: this.state.player2.name,
                    color:this.state.player2.color,
                }

            })

        } else {
            color = this.state.player1.color;
            this.setState({
                player1: {
                    playing:"",
                    name: this.state.player1.name,
                    color:this.state.player1.color,
                },
                player2: {
                    playing:"playing",
                    name: this.state.player2.name,
                    color:this.state.player2.color,
                }

            })

        }
        return color;
    }

    changeColor = (col) => {
        let flag = this.state.turn;
        let color = this.checkTurn(flag);
        for (let i = 0; i < col.length; i++) {
            if (col[i].color === "empty") {
                col[i].color = color;
                this.checkWin(col, i);
                flag = !flag;
                break;
            }
        }
        this.setState({
            col: col,
            turn: flag

        })
    }

    checkWin = (col, indexInCol) => {
        let verticalWin, horizontalWin, rightDiagonalWin, leftDiagonalWin = false;
        if (indexInCol > 2) {
            verticalWin = this.checkVerticalWin(col);
        }
        horizontalWin = this.lineEquationExtraction(col[0].colNumber,indexInCol,0)
        rightDiagonalWin = this.lineEquationExtraction(col[0].colNumber, indexInCol, 1);
        leftDiagonalWin = this.lineEquationExtraction(col[0].colNumber, indexInCol, -1);
        if (this.checkDraw()){
            this.setState({
                popup:"show",
            })
            setTimeout(() => {
                document.location.reload();
            }, 5000)
        }
        if (verticalWin || horizontalWin || rightDiagonalWin || leftDiagonalWin) {
            this.setState({
                popup:"show",
                gameOver: true,

            })
            setTimeout(() => {
                document.location.reload();
            }, 5000)


        }

    }
    checkDraw=()=>{
        for (let i = 0; i < this.state.board.length; i++) {
            if (this.state.board[i][5].color==="empty"){
                return false
            }
        }
        return true;
    }

    lineEquationExtraction = (a, b, m) => {
        let array = [];
        for (let i = 0; i < 7; i++) {
            let x = i;
            let y = m * (x - a) + b;
            if (y < 6 && y > -1) {
                array.push(this.state.board[x][y])
            }
        }
        let flag = this.checkSequence(array);
        return flag;
    }
    checkVerticalWin = (col) => {
        return this.checkSequence(col);
    }
    checkSequence = (column) => {
        let flag = false;
        for (let i = 0; i < column.length - 3; i++) {
            if (column[i].color !== "empty" &&
                column[i].color === column[i + 1].color &&
                column[i].color === column[i + 2].color &&
                column[i].color === column[i + 3].color) {
                flag = true;
                // column[i].color="green";
                // column[i+1].color="green";
                // column[i+2].color="green";
                // column[i+3].color="green";
            }
        }
        return flag;
    }


    render() {
        return (
            <div id="App">
                <div id={"title"}>
                    בשורה A.I.U.A
                </div>
                <div>
                        <PrintPlayer player={this.state.player1}/>
                        <PrintPlayer player={this.state.player2}/>
                    <PrintBoard columns={this.state.board} change={!this.state.gameOver && this.changeColor}/>
                </div>
                <PrintPopUp state={this.state.popup} winner={this.state.turn ? this.state.player1.name:this.state.player2.name} won={this.state.gameOver}/>


            </div>
        )
    }
}

export default App;
