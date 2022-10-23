import React from 'react'
import { Image } from '../post/Image'

export const Masonary = ({ posts }) => {

    return (
        <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', rowGap: '17px', columnGap: '23px' }}>
            {
                posts?.map(item =>
                    <Image key={item._id} src={item.images[0]}></Image>
                )
            }
        </div>
    )
}
