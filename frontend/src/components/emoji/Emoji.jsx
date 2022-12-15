import React from 'react'
import EmojiPicker from 'emoji-picker-react';

export default function Emoji({ getEmoji }) {
    return (
        <EmojiPicker onEmojiClick={(e) => getEmoji(e.emoji)} />
    )
}
