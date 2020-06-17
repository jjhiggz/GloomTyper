import React, { useState, useEffect, useRef }  from 'react'
import { range, split, sample, flatten, slice } from 'lodash'

//variables dependent on input, to avoid async issues
let lastCharacterVar = ''
let currentWordVar = {}
let currentWordRightVar = ''
let inputVar = ''


export default function Game({words}) {

  const [ input, setInput ] = useState( '' )
  const [ completeWords, setCompleteWords ] = useState( [] )
  const [ currentWordIndex, setCurrentWordIndex  ] = useState( 0 )
  const [ currentCharacterIndex, setCurrentCharacterIndex ] = useState( 0 )
  const [ testWords, setTestWords ] = useState( [] )
  const inputEl = useRef(null); 
  useEffect(() => {
    setTestWords( words )
    currentWordVar = words[currentWordIndex]
  }, [] )

  const isInputCorrect = () => inputVar === currentWordVar.word

  const indexFirstIncorrectCharacter = () => {
    return Range(inputVar.split('')).find( index => (
      inputVar.split[index] !== currentWordVar.split[index]
    ))
  }

  const getCurrentWordRight = () => {
    const index = indexFirstIncorrectCharacter(inputVar, currentWordVar)
    return slice(
      currentWordVar.split(''),
      index || inputVar.split('').length,
      currentWordVar.split('').length
    ).join('')
  }
  

  const handleInputChange = (event) => {
    inputVar = event.target.value
    lastCharacterVar = inputVar.substr(-1)
    if( lastCharacterVar === ' ' ){ handleSpace(input) }
    else{
      //use this for a spacebar sound effect
    }
    setInput( event.target.value )
    //***
  }

  const handleSpace = () => {
    console.log('setting')
    inputVar = inputVar.trim()
    // you could play a sample with spacebar here using playReload
    setCompleteWords( [...completeWords, generateCompleteWord() ])
    setCurrentWordIndex( currentWordIndex + 1 )
    setInput('')
    setTestWords( slice( testWords, 1, testWords.length))
    currentWordVar = words[ currentWordIndex + 1 ]
    inputEl.current.value = ''
  }
  
  const generateCompleteWord= () => {
    return {
      id:currentWordVar.id,
      class: isInputCorrect() ? 'correct' : 'incorrect',
      word: inputVar,
    }
  }
  const isFirstLetter = () => {

  }

  const renderWords = ( array ) => {
    return array.map(word => {
      return (
        <span
          key={word.id}
          className={word.class}
        >{word.word}</span>
      )
    })
  }
  const incrementCurrentWordIndex = () => {
    setTestWords(words)
  }
  
  return (
    <div>
      <div className="game-container nes-container">
        <div className="input-wrapper">
          <div className="test-input-group">
            <span
              id='test-input-div'
              type='text'
              key='word.id'
              >
                { renderWords(completeWords) }
            </span>
            <span 
              className={ isInputCorrect() ? 'correct test-input' : 'incorrect test-input'}
              // key="this.input"
            >
              { input }
            </span>
          </div>
        </div>

        <div className="test-wrapper">
          <div className="test-prompt">
            <span 
              className="test-word current-word"
            >
              {currentWordRightVar}
            </span>
            <span
              className="test-word undefined"
            >
            { renderWords( testWords ) }
            </span>
          </div>
        </div>
      </div>
      <input
        ref={inputEl}
        className="input-box"
        id='test-input'
        type='text'
        onInput={ handleInputChange }
      ></input>

    </div>
  )
}