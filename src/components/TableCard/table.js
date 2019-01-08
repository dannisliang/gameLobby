import React from 'react'
import index from './index.css'
import play from '@/assets/player.svg'
const Table = (props) => {
    const { user, size, scale, margin } = props;
    return (
        <div className={index.flexColumn}  >

            <div className={index.cricleRed}>
                <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
            </div>

            <div className={index.middleimg}>

                <div className={index.cricleRed}>
                    <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                </div>

                <div
                    className={index.boards}
                    style={{ width: size + "px", height: size + "px", backgroundSize: size + "px" }}>
                </div>

                <div className={index.cricleRed}>
                    <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                </div>

            </div>

            <div className={index.cricleRed}>
                <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
            </div>

        </div>
    )
}
export default React.memo(Table)    