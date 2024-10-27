import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [emoji, setEmoji] = useState('');
  const [emojiList, setEmojiList] = useState([]);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    // Add event listener for emoji-click event
    const handleEmojiClick = (event) => {
      const { detail } = event;
      console.log('Emoji object received:', detail);
      if (detail && detail.unicode) {
        setEmoji((prevEmojis) => prevEmojis + detail.unicode);
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
      setEmojiList((prevList) => [...prevList, emoji]);
      setEmoji('');
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
          <emoji-picker ref={emojiPickerRef}></emoji-picker>
          <input
            id="emoji-input"
            type="text"
            name="glyph"
            value={emoji}
            readOnly
            style={{ fontSize: '24px', textAlign: 'center' }}
          />
          <input type="button" value="Submit" onClick={addEmojiToList} />
        </div>
        <div>
          <ul id="emoji-list">
            {emojiList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
