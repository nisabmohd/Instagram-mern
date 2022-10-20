import React from 'react'
import Box from '@mui/material/Box';
import { ImageList, ImageListItem } from '@mui/material';

export const Masonary = () => {
    const itemData = [
        {
            img: 'https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fce19e055-5952-42f0-a21e-93297f351121.png?alt=media&token=459c1198-1641-4ede-a3ee-d1ede7b635ae',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
            title: 'Snacks',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
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
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
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
            img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
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
    ];
    return (
        <Box sx={{ width: "90%", height: "fit-content", overflowY: 'scroll',}}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=288&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{borderRadius:'5px'}}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    )
}
