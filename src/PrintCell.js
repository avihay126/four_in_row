function PrintCell(props){
return(
  <div id={"cell"} color={props.cells.color}>
    {props.cells.name}
  </div>
);

}

export default PrintCell;