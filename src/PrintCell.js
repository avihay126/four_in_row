function PrintCell(props){
return(
  <div >
    <div id={"cell"} color={props.cells.color}>
        {props.cells.value}

    </div>

  </div>
);

}

export default PrintCell;