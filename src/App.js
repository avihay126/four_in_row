import logo from './logo.svg';
import './App.css';
import React from "react";
import PrintCell from "./PrintCell";
import PrintColumn from "./PrintColumn";
import PrintBoard from "./PrintBoard";

class App extends React.Component {
    state = {
        player: false,
        columns: []
    }
    constructor(props) {
        super(props);
        this.initBoard();
    }

    initCol=()=>{
        const rows=6;
        let newArray = [];
        for (let i = 0; i < rows; i++) {
            const cell={
                color: "empty"
            }
            newArray.push(cell);
        }
        return newArray;
    }
    initBoard=()=>{
        const columns=7;
        for (let i = 0; i < columns; i++) {
            this.state.columns.push(this.initCol());
        }
    }

    changeColor=(col)=>{
        let flag=this.state.player
        let color="";
        if (flag){
            color="yellow";
        }else {
            color="red";
        }
        let cellToCheck;
        for (let i = 0; i <col.length; i++) {
            if (col[i].color==="empty"){
                col[i].color=color;
                cellToCheck=col[i];
                this.checkVerticalWin(col);
                flag=!flag;
                break;
            }
        }
        this.checkWin(cellToCheck);
        this.setState({
            col:col,
            player: flag
        })
    }
    checkWin=(cellToCheck)=>{
      const newBoard=this.state.columns;
      let x=cellToCheck;
      // alert(x.color);
    }
    checkVerticalWin=(column)=>{
        let flag=false;
        for (let i = 0; i < column.length-4; i++) {
            if (column[i].color!=="empty"&&column[i].color===column[i+1].color&&column[i].color===column[i+2].color&&column[i].color===column[i+3].color){
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
                <PrintBoard columns={this.state.columns} change={this.changeColor}/>
            </div>
        )
    }
}

export default App;
