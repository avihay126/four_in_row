import PrintCell from "./PrintCell";
import React from "react";


function PrintPlayer(props){
    return(
        <div id={props.player.name}class={"player"} state={"playing"}>
            <PrintCell cells={props.player}/>
        </div>
    )

}
export default PrintPlayer;