import React, { useMemo, useRef } from 'react'
import defaultImg from '../../assets/dafault.png'
import { Link } from 'react-router-dom'
import { emojiIcon, galleryIcon, likeOutline } from '../../assets/svgIcons';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../Interceptor/apiCall';
import { url } from '../../baseUrl';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth'
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Resizer from "react-image-file-resizer";

export default function ChatBox({ roomId }) {
    const [RoomName, setRoomName] = useState('')
    const [roomDetails, setRoomDetails] = useState('')
    const context = useContext(AuthContext)
    const [roomImage, setRoomImage] = useState()
    const [message, setMessage] = useState('')
    const [snapShotMessages, setSnapShotMessages] = useState([])

    const q = useMemo(() => query(collection(db, roomId), orderBy("timestamp", "asc")), [roomId])
    const scrollRef = useRef()

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setSnapShotMessages(messages)
        });
        return () => unsubscribe()
    }, [q, roomId])

    useEffect(() => {
        updateScroll()
    }, [snapShotMessages])


    function updateScroll() {
        var element = scrollRef.current;
        element.scrollTop = element.scrollHeight;
    }
    function handleKeyPress(e) {
        if (e.keyCode !== 13 || !message || message.trim().length === 0) return
        sendMessage(message)
    }

    async function handleLike() {
        sendMessage("like_true")
    }

    async function sendMessage(m, file) {
        try {
            await addDoc(collection(db, roomId), {
                message: m,
                uid: context.auth._id,
                timestamp: serverTimestamp(),
                file: file ? true : false
            });
            setMessage('')
        } catch (e) {
            console.error(e);
        }
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                2200,
                1800,
                "JPEG",
                70,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    async function handleUplaodImage(e) {
        const file = e.target.files[0]
        console.log(file);
        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
            const newFile = await resizeFile(file)
            const storageRef = ref(storage, 'images/' + newFile.name);
            const uploadTask = uploadBytesResumable(storageRef, newFile);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error);
                    context.throwErr("Some error occured")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        sendMessage(downloadURL, true).then(() => {
                            console.log("done");
                        })
                    });
                }
            );
            console.log(newFile);
        } else {
            context.throwErr('File type not supported')
        }
    }

    useEffect(() => {
        api.get(`${url}/chat/${roomId}`).then(res => {
            const nameArr = res.data.people.filter(id => id !== context.auth._id)
            return api.get(`${url}/user/get/${nameArr[0]}`).then((res) => {
                setRoomName(res.data.name);
                setRoomImage(res.data.avatar)
                setRoomDetails(res.data.username)
            })
        }).then((resp => {
            setRoomName(resp.data.name)
        })).catch(err => console.log(err))

    }, [context.auth._id, roomId])


    return (
        <div style={{ width: '100%', position: 'relative', height: '100%' }}>
            <div className="header_chat" style={{ width: '100%', borderBottom: '1px solid #dbdbdb', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to={`/${roomDetails}`} >
                    <div className="info_user_chat" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '28px' }}>
                        <img src={roomImage || defaultImg} style={{ width: '40px', borderRadius: '50%' }} alt="" />
                        <p style={{ marginLeft: '10px', fontSize: '14px' }}>{RoomName}</p>
                    </div>
                </Link>
                <div className="svg_info" style={{ marginRight: '18px' }}>
                    <Link to={`/${roomDetails}`} className='no_style' style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg aria-label="View thread details" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                    </Link>
                </div>
            </div>
            <div className="chat_content" style={{ width: '100%' }}>
                <div className="converstaions" ref={scrollRef} style={{ height: '72vh', overflowY: 'scroll', padding: '20px 0px', width: '100%', fontSize: '14px' }}>

                    {
                        snapShotMessages.map((msg, index) => {
                            return <div key={index}>{context.auth._id === msg.uid ?
                                msg.message === "like_true" ?
                                    <div className="my_text" style={{ marginLeft: 'auto', width: 'fit-content', marginRight: '18px', color: 'white', padding: '10px 16px', borderRadius: '22px', marginTop: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <svg aria-label="Like" className="_ab6-" color="#ed4956" fill="#ed4956" height="44" role="img" viewBox="0 0 48 48" width="44"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                    </div> :
                                    msg.file ? <div className="my_text" style={{ marginLeft: 'auto', width: 'fit-content', marginRight: '18px', color: 'white', padding: '10px 16px', borderRadius: '22px', marginTop: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <img style={{ maxWidth: '400px', borderRadius: '14px', border: '1px solid #e3e3e3' }} src={msg.message} alt="img" />
                                    </div> :
                                        <div className="my_text" style={{ marginLeft: 'auto', width: 'fit-content', marginRight: '18px', backgroundColor: '#7c3aed', color: 'white', padding: '10px 16px', borderRadius: '22px', marginTop: '18px', maxWidth: '60%' }}>
                                            {
                                                msg.message
                                            }
                                        </div>
                                :
                                msg.message === "like_true" ?
                                    <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '18px', }}>
                                        <img style={{ width: '30px', borderRadius: '50%', marginBottom: '-7px', marginLeft: '18px' }} src={roomImage || defaultImg} alt="" />
                                        <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', color: 'black', padding: '10px 16px', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
                                            <svg aria-label="Like" className="_ab6-" color="#ed4956" fill="#ed4956" height="44" role="img" viewBox="0 0 48 48" width="44"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                        </div>
                                    </div>
                                    :
                                    msg.file ?
                                        <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '18px', }}>
                                            <img style={{ width: '30px', borderRadius: '50%', marginTop: '15px', marginLeft: '18px' }} src={roomImage || defaultImg} alt="" />
                                            <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', color: 'black', padding: '10px 16px', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
                                                <img style={{ maxWidth: '400px', borderRadius: '14px', border: '1px solid #e3e3e3', marginLeft: '-8px' }} src={msg.message} alt="img" />
                                            </div>
                                        </div>
                                        :
                                        <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '18px', }}>
                                            <img style={{ width: '30px', borderRadius: '50%', marginTop: '12px', marginLeft: '18px' }} src={roomImage || defaultImg} alt="" />
                                            <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', backgroundColor: '#dbdbdb', color: 'black', padding: '10px 16px', borderRadius: '22px', maxWidth: '60%' }}>
                                                {msg.message}
                                            </div>
                                        </div>
                            }
                            </div>
                        })
                    }

                </div>

                <div className="input_container" style={{ width: '100%', position: 'absolute', bottom: '8px', zIndex: '22' }}>
                    <div className="input_box" style={{ width: '95%', display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid #dbdbdb', margin: 'auto', height: '48px', borderRadius: '19px', justifyContent: 'space-evenly' }}>
                        {emojiIcon}
                        <input onKeyDown={e => handleKeyPress(e)} onChange={e => setMessage(e.target.value)} value={message} style={{ width: '80%', height: '100%', border: 'none', marginLeft: '5px', outline: 'none' }} type="text" placeholder='Message...' />
                        <input onChange={(e) => handleUplaodImage(e)} type="file" id="image_chat" hidden />
                        <label htmlFor="image_chat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            {galleryIcon}
                        </label>
                        <button onClick={() => handleLike()} className='no_style' style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {likeOutline}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
