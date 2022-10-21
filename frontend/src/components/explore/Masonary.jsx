import React from 'react'
import { Image } from '../post/Image'

export const Masonary = () => {
    const itemData = [
        {
            img: 'https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fce19e055-5952-42f0-a21e-93297f351121.png?alt=media&token=459c1198-1641-4ede-a3ee-d1ede7b635ae',
            title: 'Fern',
        },
        {
            img: 'https://www.visitdubai.com/-/media/gathercontent/poi/s/skydive-dubai/fallback-image/sky-dive-dubai-3.jpg',
            title: 'Snacks',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Tower',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            title: 'Tree',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F6870e933-733c-4b6a-8cec-ac034eae9f89.png?alt=media&token=fbea069c-37ba-41f7-a98e-8b55b9e85e2f',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1666202566722-26e17e78cb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            title: 'Camping Car',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
            title: 'Mountain',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
    ];
    return (
        <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', rowGap: '17px', columnGap: '23px' }}>
            {
                itemData.map(item =>
                    <Image key={item.title} src={item.img}></Image>

                )
            }
        </div>
    )
}
