import logo from './logo.svg';
import './App.css';
import React from "react";
import PrintCell from "./PrintCell";
import PrintColumn from "./PrintColumn";
import PrintBoard from "./PrintBoard";
import PrintPlayer from "./PrintPlayer";

class App extends React.Component {
    state = {
        turn: false,
        board: [],
        player1: {
            name: "player 1",
            color: "red"
        },
        player2: {
            name: "player 2",
            color: "yellow"
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
        } else {
            color = this.state.player1.color;
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
        horizontalWin = this.checkHorizontalWin(indexInCol);
        rightDiagonalWin = this.checkDiagonalWin(col[0].colNumber, indexInCol, 1);
        leftDiagonalWin = this.checkDiagonalWin(col[0].colNumber, indexInCol, -1);
        if (verticalWin || horizontalWin || rightDiagonalWin || leftDiagonalWin) {
            setTimeout(() => {
                alert(col[indexInCol].color + " win")
                document.location.reload();
            }, 10)

        }

    }
    checkDiagonalWin = (a, b, m) => {
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


    checkHorizontalWin = (indexInCol) => {
        let flag = false;
        for (let i = 0; i < this.state.board.length - 3; i++) {
            if (this.state.board[i][indexInCol].color !== "empty" &&
                this.state.board[i][indexInCol].color === this.state.board[i + 1][indexInCol].color &&
                this.state.board[i][indexInCol].color === this.state.board[i + 2][indexInCol].color &&
                this.state.board[i][indexInCol].color === this.state.board[i + 3][indexInCol].color) {
                flag = true;

            }
        }
        return flag;

    }
    checkSequence = (column) => {
        let flag = false;
        for (let i = 0; i < column.length - 3; i++) {
            if (column[i].color !== "empty" &&
                column[i].color === column[i + 1].color &&
                column[i].color === column[i + 2].color &&
                column[i].color === column[i + 3].color) {
                flag = true;
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
                    <PrintBoard columns={this.state.board} change={this.changeColor}/>
                </div>

            </div>
        )
    }
}

export default App;
