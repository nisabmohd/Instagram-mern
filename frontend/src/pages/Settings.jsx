import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import defaultimg from '../assets/dafault.png'


export const Settings = () => {
    const context = useContext(AuthContext)
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
                            <img src={context?.auth?.avatar?context.auth.avatar:defaultimg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', marginLeft: 'auto', marginRight: '27px', }} alt="" />
                        </div>
                        <div className="tableright" style={{ width: '70%' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '19px' }}>{context.auth.username}</p>
                            <p style={{ color: '#2196f3', fontWeight: 'bold', fontSize: '13.5px' }}>Change profile photo</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold' }}>Name</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input type="text" value={context.auth.name} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Help people follow your account by using the username that you're known by: either your full name, nickname or business name.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold' }}>Username</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input type="text" value={context.auth.username} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Help people follow your account by using the username.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold' }}>Website</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input type="text" value={context.auth.website} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%' }} />
                            <p style={{ marginTop: '13px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Providing links will enhace your social reach.</p>
                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold' }}>Bio</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <textarea value={context.auth.bio} style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%' }} />
                            <p style={{ marginTop: '3px', fontSize: '13.2px', width: '60%', color: 'gray' }}>23 / 150</p>

                            <p style={{ marginTop: '23px', fontSize: '14.52px', width: '60%', color: 'gray', fontWeight: 'bold' }}>Personal information</p>
                            <p style={{ marginTop: '3px', fontSize: '13.2px', width: '60%', color: 'gray' }}>Provide your personal information, even if the account is used for a business, pet or something else. This won't be part of your public profile.</p>

                        </div>
                    </div>
                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                            <p style={{ marginRight: '27px', fontWeight: 'bold' }}>Email</p>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <input type="text" style={{ outline: 'none', border: '1px solid #dbdbdb', padding: '3px 9px', borderRadius: '3px', width: '60%', fontWeight: '14px' }} placeholder="Enter Email" />

                        </div>
                    </div>

                    <div className="input" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '95%', margin: '20px 2px', marginLeft: 'auto' }}>
                        <div className="tableleft" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', marginBottom: 'auto' }}>
                        </div>
                        <div className="tableright" style={{ width: '80%' }}>
                            <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '4px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75px', fontWeight: 'bold' }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
