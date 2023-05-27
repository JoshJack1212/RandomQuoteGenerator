import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [quoteInfo, setQuoteInfo] = useState({});

  const changeBackgroundColor = () => {
    const randomColor = generateRandomColor();
    setBackgroundColor(randomColor);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getQuote = () => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuoteInfo({
          text: data.content,
          author: data.author,
        });
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  const onClick = () => {
    getQuote();
    changeBackgroundColor();
  };
  

  return (
    <div className="App" class="container" style={{
      backgroundColor,
      color: backgroundColor,
    }}>
      <div id="quote-box">
        <p id="text">{"\" " + quoteInfo.text + " \""}</p>
        <p id="author">{"- " + quoteInfo.author}</p>
        <button id="new-quote" onClick={onClick}>
          New Quote
        </button>
        <a
          href={
            'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            quoteInfo.text
          }
          target="_blank"
          rel="noopener noreferrer"
          id="tweet-quote"
        >
          Post to Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
