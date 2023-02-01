import React from "react"
import { PropagateLoader } from "react-spinners"
const Loader =()=>{
    return   <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
   <PropagateLoader color="#36d7b7" />
  </div>
}

export default Loader;