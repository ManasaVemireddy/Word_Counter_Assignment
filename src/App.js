import React, { useState, useEffect } from 'react';

const TextAreaWithStats = () => {
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  useEffect(() => {
    updateWordAndCharCount();
  }, [text]);

  const updateWordAndCharCount = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size);
    const characters = text.replace(/[^\w]/g, '');
    setCharCount(characters.length);
  };

  const handleReplace = () => {
    const regex = new RegExp(searchText, 'gi'); // Case-insensitive replacement
    const updatedText = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    setText(updatedText);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Real-Time Text Analysis & Replacement</h1>
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }}
        onInput={(e) => setText(e.currentTarget.innerHTML)}
        rows="10"
        style={{
          width: '100%',
          fontSize: '16px',
          padding: '10px',
          border: '1px solid #ccc',
          minHeight: '150px',
          borderRadius: '4px',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <strong>Unique Words:</strong> {uniqueWordCount}
        <br />
        <strong>Character Count (Excl. Spaces & Punctuation):</strong> {charCount}
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search for..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={handleReplace} style={{ marginLeft: '10px' }}>
          Replace All
        </button>
      </div>
    </div>
  );
};

export default TextAreaWithStats;
