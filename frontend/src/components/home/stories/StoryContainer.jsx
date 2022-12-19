import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { url } from '../../../baseUrl'
import { api } from '../../../Interceptor/apiCall'
import Story from './Story'

export default function StoryContainer() {
    const [stories, setStories] = useState([])
    useEffect(() => {
        api.get(`${url}/story/home`).then((res) => {
            setStories(res.data)
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            {stories.length === 0 && <p style={{ margin: 'auto', textAlign: 'center' }}>Nothing to see here</p>}
            {
                stories.map(story =>
                    <Story key={story[0].id} id={story[0].id} owner={story[0].owner} seen={[]} />
                )
            }
        </>
    )
}
