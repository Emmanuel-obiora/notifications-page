import React, {useState, useEffect} from 'react';
import {BsFillCircleFill} from 'react-icons/bs';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import '../../styles.css';

const Main = () => {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotification = () => {
    setIsLoading(true);
    fetch('https://obi-server.onrender.com/notify')
    .then((data) => {
      // console.log(data);
      return data.json();
     }).then((response) => {
            // console.log(response);
            setNotification(response)
            setIsLoading(false)
        }).catch((err) =>{
            console.log(err);
            setIsLoading(false);
        });
  }

  useEffect(() => {
      getNotification();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const markAllUnread = ('click', ()=> {
      setNotification((prev) => prev.map(n => (
        {...n, isUnread:false}
      )))
    });

    function handleNotificationClick(id){
      setNotification((prev) => prev.map(n => (n.id === id? 
        {
          ...n, isUnread: false
        }: n)))
    }


  return (
    <main className='Container'>
      <section>
        <div className="left-header">
          <h1>Notifications</h1>
          <span>{notification.filter(n => n.isUnread).length}</span>
        </div>
        <button type='button' id='mark' onClick={markAllUnread} className='right-header'>Mark all as read</button>
      </section>

      <div className="messages-container">
        {
          notification.map((info) => {
            return(
              <article className='messages-container_sub' key={info.id} onClick={()=> 
                handleNotificationClick(info.id)} data-unread={info.isUnread}>
                <div className='messages-container_sub_roll'>
                  {/* <span className="user-icon">{info.icon}</span> */}
                  {/* <img src={info.icon} className="user-icon" alt="" /> */}
                  <div className="message-details">
                    <h2 className="message-details_head">{info.messenger} 
                      <span className="message-details_head_para">{info.highlight}</span>
                      <span className='message-details_head_notice' id={info.classD}>{info.update}</span>
                      {info.isUnread &&(
                        <BsFillCircleFill className='red-notice'/>
                      )}
                    </h2>
                    <span className="messages-details_time">{info.time}</span>
                  </div>
                  <img src={info.trfImage} className='trf-image' alt="" />
                </div>
                {info.msgUnread && (
                  <p className='messages-container_sub-but'>{info.Msg}</p>
                )}
              </article>
            )
          })
        }
        
      </div>
      {isLoading && (
        <LoadingSpinner />
        )}
    </main>
  )
}

export default Main