import PrintCell from "./PrintCell";
import React from "react";


function PrintColumn(props){
    return(
        <div  onClick={()=>props.change(props.column)} >
            {

                props.column.map((cell)=>{
                  return(
                          <tr>
                              <PrintCell cells={cell}/>
                          </tr>
                  )
                    }

                )


            }

        </div>
    )
}

export default PrintColumn;