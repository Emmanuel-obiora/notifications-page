import React from 'react'
import './Main.css'
import Data from './data.json'
import {BsFillCircleFill} from 'react-icons/bs'

const Main = () => {

  return (
    <main className='main-container'>
      <section>
        <div className="left-header">
          <h1>Notifications</h1>
          <span>3</span>
        </div>
        <button type='button' className='mark-read'>Mark all as read</button>
      </section>

      <div className="messages">
        {
          Data.map((info, i) => {
            return(
              <article className='messages-art'>
                <div className='messages-cont'>
                  <img src={info.icon} className="user-icon" alt="" />
                  <div className="messages-cont_info">
                    <h2 className="msg">{info.messenger} 
                      <span className="paragraph">{info.highlight}</span>
                      <span className='notice' id={info.classD}>{info.update}</span>
                      <BsFillCircleFill className='red-notice'/>
                    </h2>
                    <span>{info.time}</span>
                  </div>
                  <img src={info.trfImage} className='trf-image' alt="" />
                </div>
                <div className='msg-main'>
                    <p>{info.Msg}</p>
                  </div>
              </article>
            )
          })
        }
        
      </div>
    </main>
  )
}

export default Main