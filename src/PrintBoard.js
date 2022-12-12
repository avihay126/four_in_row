import PrintColumn from "./PrintColumn";
import React from "react";

function PrintBoard(props) {
    return (
        <div id={"board"}>
            {
                props.columns.map((column) => {
                    return (

                            <td>
                                <PrintColumn change={props.change} column={column}/>
                            </td>

                )
                })
            }

        </div>
    )


}

export default PrintBoard;