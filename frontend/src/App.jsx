import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [emoji, setEmoji] = useState(''); // State to store selected emojis
  const [emojiList, setEmojiList] = useState([]); // State to store the list of emojis
  const emojiPickerRef = useRef(null); // Reference to the emoji picker

  useEffect(() => {
    // Add event listener for emoji-click event
    const handleEmojiClick = (event) => {
      const { detail } = event;
      console.log('Emoji object received:', detail); // Log the received emoji object
      if (detail && detail.unicode) {
        setEmoji((prevEmojis) => prevEmojis + detail.unicode); // Concatenate the new emoji
      }
    };

    const emojiPicker = emojiPickerRef.current;
    emojiPicker.addEventListener('emoji-click', handleEmojiClick);

    // Cleanup event listener on component unmount
    return () => {
      emojiPicker.removeEventListener('emoji-click', handleEmojiClick);
    };
  }, []);

  function addEmojiToList() {
    if (emoji) {
      setEmojiList((prevList) => [...prevList, emoji]); // Add the current emoji string to the list
      setEmoji(''); // Clear the input after submission
    }
  }

  return (
    <>
      <nav className="Nav">
        <div>
          <h1>Emoji-Glyph</h1>
          <h5>Leave your Mark!</h5>
        </div>
      </nav>
      <div className="mainHolder">
        <div>
          <emoji-picker ref={emojiPickerRef}></emoji-picker>{' '}
          {/* Use the emoji picker */}
          <input
            id="emoji-input"
            type="text"
            name="glyph"
            value={emoji} // Bind input value to emoji state
            readOnly
            style={{ fontSize: '24px', textAlign: 'center' }}
          />
          <input type="button" value="Submit" onClick={addEmojiToList} />
        </div>
        <div>
          <ul id="emoji-list">
            {emojiList.map((item, index) => (
              <li key={index}>{item}</li> // Render each emoji string as a list item
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
