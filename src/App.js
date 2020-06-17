import React, { useEffect, useState  } from 'react';
import './App.css';
import axios from "axios";
import Game from './Containers/Game'
import { range, split, sample, flatten, slice } from 'lodash'

const SCORES_URL = 'https://doomtyper-backend.herokuapp.com/games'

function App() {

  const [ data, setData ] = useState({
    gameWordOptions: [],
    isFetching:false,
  })

  const [ gameWords, setGameWords ] = useState([])

  useEffect(() => {
    const fetchGameWordOptions = async () => {
      try {
        setData({ gameWordOptions: data.gameWordOptions, isFetching:true })
        const response = await axios.get(SCORES_URL);
        setData({ gameWordOptions: response.data, isFetching:true });
        populateGameWords(response.data[1].words)
        // note that the above line can be taken out in order to switch between different topics
      } catch (e) {
        console.log(e);
        setData({ gameWordOptions: data.gameWordOptions, isFetching: false });
      }
    }
    fetchGameWordOptions()

  }, []);



  const populateGameWords = ( phrasesArray ) => {
    console.log(phrasesArray)
    const phrases = range(300).map( () =>
      split(sample(JSON.parse(phrasesArray)),' ')
    )

    const words = flatten(phrases).map((word,id) => (
      {
        word: word,
        class: 'incomplete',
        id,
      }
    ))
    setGameWords( slice( words, 0, 299 ) )
  }


  return (
    <div className="App">
      {
        gameWords.length > 0 && 
          <Game 
            words={gameWords} 
          />
      }
    </div>
  );
}

export default App;
