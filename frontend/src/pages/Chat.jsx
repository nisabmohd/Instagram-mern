import React, { } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ChatBox from '../components/chat/ChatBox'
import RoomName from '../components/chat/RoomName'
import { api } from '../Interceptor/apiCall'
import { Default } from '../components/chat/Default'
import { useParams } from 'react-router-dom'
import { url } from '../baseUrl'

export const Chat = () => {
  const [rooms, setRooms] = useState([])
  const params = useParams()

  useEffect(() => {
    api.get(`${url}/chat/getrooms`).then(res => {
      setRooms(res.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="chatpage" style={{ width: '100%', backgroundColor: 'white', marginTop: '18px', border: '1px solid #dbdbdb', display: 'flex', flexDirection: 'row', height: '90vh', marginBottom: '3vh', borderRadius: '4px' }}>
      <div className="left_chat_bar" style={{ width: '33%', borderRight: '1px solid #dbdbdb', height: '100%', overflowY: 'scroll' }}>
        <div className="username" style={{ borderBottom: '1px solid #dbdbdb', width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '28px' }}>{"Messages"}</p>
          <svg style={{ marginRight: '18px' }} aria-label="New message" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
        </div>
        {
          rooms?.map(item => <RoomName key={item.roomId} roomId={item.roomId} />)
        }
      </div>
      <div className="right_chatbar" style={{ width: '67%' }}>
        {
          params.id === "all" ? <Default /> :
            <ChatBox roomId={params.id} />
        }
      </div>
    </div>
  )
}
