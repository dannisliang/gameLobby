import React from 'react';
import index from  './index.css'
const Message = (props) => {
    const { team1 = "中国队ssssssssssss", team2 = "韩国队ssssssssss" } = props
    return (
        <div style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}>
            {/* <div style={{ textAlign: "center", marginBottom: "4px", }} className="border">第n桌</div> */}
            <div style={{ textAlign: "center" }} className={index.flexRow} >
                <span  style={{maxWidth:"100px",display:"block"}}>{team1}</span><span style={{ color: "red", fontWeight: "500", fontSize: "20px" }}> vs </span><span style={{maxWidth:"100px",display:"block"}}>{team2}</span>
                {/* {<span style={{right:"0",cursor:"pointer",color:"red",position:"absolute"}}>详情</span>} */}
            </div>
        </div>
    )
}
export default React.memo(Message)