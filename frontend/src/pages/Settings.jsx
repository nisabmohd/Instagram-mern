import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import defaultimg from '../assets/dafault.png'
import { useState } from 'react'
import { api } from '../Interceptor/apiCall'
import { url } from '../baseUrl'
import Resizer from "react-image-file-resizer";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase';

export const Settings = () => {
    const context = useContext(AuthContext)
    const [username, setUsername] = useState(context.auth.username)
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState(context.auth.bio)
    const [website, setWebsite] = useState(context.auth.website)
    const [name, setName] = useState(context.auth.name)
    const [avatar, setAvatar] = useState(context.auth.avatar)

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                20,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    function edit() {
        let data;
        if (!email) {
            data = {
                username, name, bio, website, avatar
            }
        } else {
            data = {
                email, username, name, bio, website, avatar
            }
        }
        api.put(`${url}/user`, data).then((res) => {
            if (res.data) {
                context.throwSuccess('updated')
                context.auth = {
                    ...context.auth, ...data
                }
            }
        }).catch(err => {
            context.throwErr(err.response.data.message)
        })
        console.log(data);
    }

    async function handleChangeAvatar(e) {
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
                        setAvatar(downloadURL)
                    });
                }
            );
            console.log(newFile);
        } else {
            context.throwErr('File type not supported')
        }
    }


    return (
        <>
            <div className='' style={{ width: '100%', backgroundColor: 'white', marginTop: '22px', border: '1px solid #dbdbdb', display: 'flex', flexDirection: 'row', minHeight: '90vh', marginBottom: '3vh' }}>
                <div className="left-sett" style={{ width: '230px', height: '100%', marginLeft: '0px', marginTop: '17px' }}>
                    <div style={{ margin: '20px 0px', fontSize: '14.7px', color: 'black', fontWeight: 'bold', borderLeft: '2px solid black', paddingLeft: '22px', height: '29px', display: 'flex', alignItems: 'center' }}>Edit Profile</div>
                    <div style={{ margin: '20px 5px', fontSize: '14.7px', color: 'gray', paddingLeft: '22px', height: '29px', display: 'flex', alignItems: 'center' }}>Change Password</div>

                </div>
                <div className="right-set" style={{ width: '70%', marginLeft: 'auto', borderLeft: '1px solid #dbdbdb' }}>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', textAlign: 'right' }}>
                            <img src={avatar ? avatar : defaultimg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', marginLeft: 'auto', marginRight: '27px', }} alt="" />
                        </div>
                        <div className="tableright" style={{ width: '70%' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '19px' }}>{context.auth.username}</p>
                            <input onChange={(e) => handleChangeAvatar(e)} id='imgchange' type="file" hidden />
                            <label htmlFor="imgchange" style={{ color: '#2196f3', fontWeight: 'bold', fontSize: '13.5px', cursor: 'pointer', marginTop: '-2px' }}>Change profile photo</label>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold', fontSize: '14px' }}>Name</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input onChange={(e) => setName(e.target.value)} type="text" value={name} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontSize: '14px' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Help people follow your account by using the username that you're known by: either your full name, nickname or business name.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold', fontSize: '14px' }}>Username</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontSize: '14px' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Help people follow your account by using the username.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold', fontSize: '14px' }}>Website</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input onChange={(e) => setWebsite(e.target.value)} type="text" value={website} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontSize: '14px' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Providing links will enhace your social reach.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold', fontSize: '14px' }}>Bio</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <textarea onChange={(e) => setBio(e.target.value)} value={bio} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontSize: '14px' }} />
                            <p style={{ marginTop: '3px', fontSize: '13.2px', width: '60%', color: 'gray' }}>23 / 150</p>

                            <p style={{ marginTop: '23px', fontSize: '14.52px', width: '60%', color: 'gray', fontWeight: 'bold' }}>Personal information</p>
                            <p style={{ marginTop: '3px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Provide your personal information, even if the account is used for a business, pet or something else. This won't be part of your public profile.</p>

                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold', fontSize: '14px' }}>Email</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontWeight: '14px', fontSize: '14px' }} placeholder="Enter Email" />

                        </div>
                    </div>

                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            {
                                !(username && name && bio && website) ?
                                    <button disabled style={{ border: 'none', outline: 'none', background: 'blue', padding: '4px 9px', borderRadius: '5px', color: 'gray', backgroundColor: 'rgb(172 194 212)', marginTop: '18px', fontSize: '13px', width: '75px', cursor: 'not-allowed' }}>Submit</button>
                                    :
                                    <button onClick={() => edit()} style={{ border: 'none', outline: 'none', background: 'blue', padding: '4px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75px', fontWeight: 'bold' }}>Submit</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
