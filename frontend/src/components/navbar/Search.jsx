import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { api } from '../../Interceptor/apiCall'
import { url } from '../../baseUrl'
import { User } from '../dialog/User'
import { Spinner } from '../../assets/Spinner'
import CloseIcon from '@mui/icons-material/Close';

export default function Search() {
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [userResults, setuserResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const time = setTimeout(() => {
      if (!text) {
        setLoading(false)
        return
      }
      api.get(`${url}/user/search/${text}`).then(res => {
        if (res.data) {
          console.log(res.data);
          setuserResults(res.data)
        }
        setLoading(false)
      })
    }, 1200)
    return () => { clearInterval(time); setuserResults([]); setLoading(true) }
  }, [text])

  return (
    <>
      <div className="search" style={{ position: 'relative' }}>
        <SearchIcon sx={{ fontSize: '17px', marginRight: '8px', color: 'gray' }} />
        <input
          onClick={() => setShow(true)}
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: "100%", fontSize: '14px' }}
          type="text" className="noborder" placeholder="Search" />
        {show && <CloseIcon onClick={() => setShow(false)} sx={{ fontSize: '17px', marginRight: '8px', color: 'gray', cursor: 'pointer' }} />}
      </div>
      {show && <div className="containerSuggest" style={{ position: 'absolute', top: '58px', backgroundColor: 'white', width: '390px', border: '1px solid #e7e7e7', borderRadius: '8px', minHeight: '75px', maxHeight: '300px', overflowY: 'auto', padding: '15px 15px' }}>
        {loading && <Spinner />}
        {userResults.length === 0 && !loading ? <p style={{ fontSize: '13px', textAlign: 'center', marginTop: '22px' }}>Nothing to see !</p>
          :
          <>
            {
              userResults.map(item =>
                <User setShow={setShow} key={item._id} user={item} />
              )
            }

          </>
        }

      </div>}

    </>
  );
}
