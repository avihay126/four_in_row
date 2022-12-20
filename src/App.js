
import './App.css';
import React from "react";
import PrintBoard from "./PrintBoard";
import PrintPlayer from "./PrintPlayer";
import PrintPopUp from "./PrintPopUp";


const ROW=6,COLUMNS=7;
const PLAYER1_COLOR="red",PLAYER2_COLOR="yellow",EMPTY_CELL="empty";
const PLAYING="playing",NOT_PLAYING="";
const FOUR_IN_COLUMN=2;
const HORIZONTAL_SLOPE=0,ASCENDING_SLOPE=1,DESCENDING_SLOPE=-1;
const POPUP_SHOWING_TIME=5000;
const HIDDEN_POPUP="none",SHOW_POPUP="show";
const LAST_CELL_IN_COL=5;
const WIN_SIGN="win";
const GAME_OVER=true;

class App extends React.Component {

    state = {
        gameOver: false,
        popup : HIDDEN_POPUP,
        turn: false,
        board: [],
        player1: {
            name: "player 1",
            color: PLAYER1_COLOR,
            playing: PLAYING
        },
        player2: {
            name: "player 2",
            color: PLAYER2_COLOR,
            playing: NOT_PLAYING
        }

    }

    constructor(props) {
        super(props);
        this.initBoard();
    }

    initCol = (colNumber) => {
        let newArray = [];
        for (let i = 0; i < ROW; i++) {
            const cell = {
                color: EMPTY_CELL,
                colNumber: colNumber
            }
            newArray.push(cell);
        }
        return newArray;
    }
    initBoard = () => {
        for (let i = 0; i < COLUMNS; i++) {
            this.state.board.push(this.initCol(i));
        }
    }

    checkTurn = (flag) => {
        let color = "";
        if (flag) {
            color = this.state.player2.color;
            this.changePlayerState(PLAYING,NOT_PLAYING)
        } else {
            color = this.state.player1.color;
            this.changePlayerState(NOT_PLAYING,PLAYING)
        }
        return color;
    }
    changePlayerState=( player1Play,player2Play)=>{
        this.setState({
            player1: {
                playing:player1Play,
                name: this.state.player1.name,
                color:this.state.player1.color,
            },
            player2: {
                playing:player2Play,
                name: this.state.player2.name,
                color:this.state.player2.color,
            }
        })
    }

    gameScene = (col) => {
        let flag = this.state.turn;
        let color = this.checkTurn(flag);
        for (let i = 0; i < col.length; i++) {
            if (col[i].color === EMPTY_CELL) {
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
        if (indexInCol >  FOUR_IN_COLUMN) {
            verticalWin = this.checkVerticalWin(col);
        }
        horizontalWin = this.lineEquationExtraction(col[0].colNumber,indexInCol,HORIZONTAL_SLOPE)
        rightDiagonalWin = this.lineEquationExtraction(col[0].colNumber, indexInCol, ASCENDING_SLOPE);
        leftDiagonalWin = this.lineEquationExtraction(col[0].colNumber, indexInCol, DESCENDING_SLOPE);
        if (this.checkDraw()){
            this.setState({
                popup:SHOW_POPUP,
            })
            this.reloading();
        }
        if (verticalWin || horizontalWin || rightDiagonalWin || leftDiagonalWin) {
            this.setState({
                popup:SHOW_POPUP,
                gameOver: GAME_OVER,

            })
            this.reloading();


        }

    }

    reloading=()=>{
        setTimeout(() => {
            document.location.reload();
        }, POPUP_SHOWING_TIME)
    }
    checkDraw=()=>{
        for (let i = 0; i < this.state.board.length; i++) {
            if (this.state.board[i][LAST_CELL_IN_COL].color===EMPTY_CELL){
                return false
            }
        }
        return true;
    }

    lineEquationExtraction = (a, b, m) => {
        let array = [];
        for (let i = 0; i < COLUMNS; i++) {
            let x = i;
            let y = m * (x - a) + b;
            if (y < ROW && y >=0) {
                array.push(this.state.board[x][y])
            }
        }
        return  this.checkSequence(array);
    }
    checkVerticalWin = (col) => {
        return this.checkSequence(col);
    }
    checkSequence = (column) => {
        let flag = false;
        for (let i = 0; i < column.length - 3; i++) {
            if (column[i].color !== EMPTY_CELL &&
                column[i].color === column[i + 1].color &&
                column[i].color === column[i + 2].color &&
                column[i].color === column[i + 3].color) {
                flag = true;
                column[i].color=WIN_SIGN;
                column[i+1].color=WIN_SIGN;
                column[i+2].color=WIN_SIGN;
                column[i+3].color=WIN_SIGN;
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
                    <PrintBoard columns={this.state.board} change={!this.state.gameOver && this.gameScene}/>
                </div>
                <PrintPopUp state={this.state.popup} winner={this.state.turn ? this.state.player1.name:this.state.player2.name} won={this.state.gameOver}/>


            </div>
        )
    }
}

export default App;
