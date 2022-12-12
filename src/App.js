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
      alert(x.color);


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
