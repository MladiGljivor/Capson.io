import React from "react";
import { Modal} from "@mui/material";
import "../start.css"

const Winner = (props) => {


    return <div>
    <Modal
      open={props.open}
      onClose={props.handleClose}
      className="buttonDiv "
     
    >
      <div className="buttonDiv white ">
        <h2>
          {props.winner} won!
        </h2>
        <div >
          <div className="next" onClick={props.win}>Next</div>
        </div>
      </div>
    </Modal>

    </div>



};


export default Winner