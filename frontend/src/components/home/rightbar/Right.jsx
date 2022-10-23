import React from 'react'
import { useContext } from 'react'
import { UserCard } from './UserCard'
import { AuthContext } from '../../../context/Auth'
import defaultImg from '../../../assets/dafault.png'
import { Link } from 'react-router-dom'

export default function Right() {
    const { auth } = useContext(AuthContext)
    return (
        <div style={{ marginTop: '15px' }}>
            <div className="my-acc" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="img" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        <Link to={`/${auth?.username}`}><img src={auth?.avatar ? auth.avatar : defaultImg} style={{ minWidth: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} alt="" /></Link>

                    }
                    <div className="name" style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px' }}>
                        <Link to={`/${auth?.username}`} style={{ color: 'black', fontSize: '14.75px', fontWeight: 'bold' }}>{auth?.username}</Link>
                        <Link to={`/${auth?.username}`} style={{ color: 'gray', fontSize: '14.75px', marginTop: '9px' }}>{auth?.name}</Link>
                    </div>
                </div>
                <div className="switch">
                    <p style={{ color: '#0095F6', fontSize: '14.55px' }}>Switch</p>
                </div>
            </div>
            <div className="suggestions" style={{ marginTop: '21px' }}>
                <div className="header-suggest" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'gray', fontSize: '14.75px' }}>Suggetions for you</p>
                    <button className='no-style'><p style={{ color: 'black', fontSize: '14.05px' }}>See All</p></button>
                </div>
                <div className="allusers" style={{ display: 'flex', alignItems: 'center', marginTop: '17px', flexDirection: 'column' }}>
                    <UserCard avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="terylucas" />
                    <UserCard avatar="https://qph.cf2.quoracdn.net/main-thumb-60436564-200-bhyllakzcxjltebruvflfcbrlwdhdrdj.jpeg" username="neymor78" />
                    <UserCard avatar="https://external-preview.redd.it/o8AyX6kX667pE4-fPQAxKe1oUPejcofY5CzuHhM69v8.jpg?auto=webp&s=1dafcc985d809dc246ff685b73bd9867b85953b3" username="billyboy" />
                    <UserCard avatar="https://qph.cf2.quoracdn.net/main-thumb-60436564-200-bhyllakzcxjltebruvflfcbrlwdhdrdj.jpeg" username="terylucas" />
                    <UserCard avatar="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" username="neymor78" />
                </div>
            </div>
        </div>
    )
}
