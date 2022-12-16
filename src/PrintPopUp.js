function PrintPopUp(props){
    return(
        <div id={"popUp"} state={props.state} >
            {
                props.won ?
                <div>
                    The winner is :
                    {props.winner}
                </div>:
                    <div>
                        Draw!
                    </div>
            }

        </div>
    )
}

export default PrintPopUp;