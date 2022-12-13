import logo from './logo.svg';
import './App.css';
import React from "react";
import PrintCell from "./PrintCell";
import PrintColumn from "./PrintColumn";
import PrintBoard from "./PrintBoard";

class App extends React.Component {
    state = {
        turn: false,
        board: []
    }
    constructor(props) {
        super(props);
        this.initBoard();
    }

    initCol=(colNumber)=>{
        const rows=6;
        let newArray = [];
        for (let i = 0; i < rows; i++) {
            const cell={
                color: "empty",
                colNumber: colNumber
            }
            newArray.push(cell);
        }
        return newArray;
    }
    initBoard=()=>{
        const columns=7;
        for (let i = 0; i < columns; i++) {
            this.state.board.push(this.initCol(i));
        }
    }

    checkTurn=(flag)=>{
        let color="";
        if (flag){
            color="yellow";
        }else {
            color="red";
        }
        return color;
    }

    changeColor=(col)=>{

        let flag=this.state.turn
        let color=this.checkTurn(flag);
        for (let i = 0; i <col.length; i++) {
            if (col[i].color==="empty"){
                col[i].color=color;
                this.checkWin(col,i);
                flag=!flag;
                break;
            }
        }
        this.setState({
            col:col,
            turn:flag
        })
    }

    checkWin=(col,indexInCol)=>{
        if (indexInCol>2){
            this.checkVerticalWin(col);
        }
        this.checkHorizontalWin(indexInCol);
        this.checkDiagonalWin(col[0].colNumber,indexInCol);

    }
    checkDiagonalWin=(x,y)=>{
        alert(x+","+y)



    }
    checkHorizontalWin=(indexInCol)=>{
        let flag=false;
        for (let i = 0; i < this.state.board.length-3; i++) {
            if (this.state.board[i][indexInCol].color!=="empty"&&
                this.state.board[i][indexInCol].color===this.state.board[i+1][indexInCol].color&&
                this.state.board[i][indexInCol].color===this.state.board[i+2][indexInCol].color&&
                this.state.board[i][indexInCol].color===this.state.board[i+3][indexInCol].color){
                flag=true;

            }
        }
        if (flag)
            alert("win");
        return flag;

    }
    checkVerticalWin=(column)=>{
        let flag=false;
        for (let i = 0; i < column.length-3; i++) {
            if (column[i].color!=="empty"&&
                column[i].color===column[i+1].color&&
                column[i].color===column[i+2].color&&
                column[i].color===column[i+3].color){
                flag=true;
            }
        }
        if (flag){
            alert("win")
        }
        return flag;
    }

    render() {
        return (
            <div className="App">
                <PrintBoard columns={this.state.board} change={this.changeColor}/>
            </div>
        )
    }
}

export default App;
