import React from 'react'
import Story from './Story'

export default function StoryContainer({ stories }) {
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
