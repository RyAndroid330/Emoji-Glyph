import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [emoji, setEmoji] = useState('');
  const [emojiList, setEmojiList] = useState([]);
  const emojiPickerRef = useRef(null);
  const emojiListRef = useRef(null);

  useEffect(() => {
    const handleEmojiClick = (event) => {
      const { detail } = event;
      console.log('Emoji object received:', detail);
      if (detail && detail.unicode) {
        setEmoji((prevEmojis) => prevEmojis + detail.unicode);
      }
    };

    const emojiPicker = emojiPickerRef.current;
    emojiPicker.addEventListener('emoji-click', handleEmojiClick);

    return () => {
      emojiPicker.removeEventListener('emoji-click', handleEmojiClick);
    };
  }, []);

  useEffect(() => {
    const fetchEmojiList = async () => {
      try {
        const response = await fetch('/api');
        if (response.ok) {
          const data = await response.json();
          // Map to include both id and emojis
          setEmojiList(
            data.map((item) => ({ id: item.id, emojis: item.emojis }))
          );
        } else {
          console.error('Failed to fetch emoji list');
        }
      } catch (error) {
        console.error('Error fetching emoji list:', error);
      }
    };

    fetchEmojiList();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the emoji list whenever it updates
    if (emojiListRef.current) {
      emojiListRef.current.scrollbottom = emojiListRef.current.scrollHeight;
    }
  }, [emojiList]);

  async function addEmojiToList() {
    if (emoji) {
      try {
        const response = await fetch('/api/glyphs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ glyph: emoji }),
        });

        if (response.ok) {
          // Fetch the updated list from the database
          const fetchResponse = await fetch('/api');
          if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            // Map to include both id and emojis
            setEmojiList(
              data.map((item) => ({ id: item.id, emojis: item.emojis }))
            );
          }
          setEmoji('');
        } else {
          console.error('Failed to insert emoji');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function deleteEmojiFromList(id) {
    try {
      const response = await fetch(`/api/glyphs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Fetch the updated emoji list after deletion
        const fetchResponse = await fetch('/api');
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          // Map to include both id and emojis
          setEmojiList(
            data.map((item) => ({ id: item.id, emojis: item.emojis }))
          );
        }
      } else {
        console.error('Failed to delete emoji');
      }
    } catch (error) {
      console.error('Error deleting emoji:', error);
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
          <ul id="emoji-list" ref={emojiListRef}>
            {emojiList.map((item) => (
              <li key={item.id}>
                {item.emojis}
                <button
                  onClick={() => deleteEmojiFromList(item.id)}
                  style={{ marginLeft: '10px' }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
