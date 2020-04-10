import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  })
}

const App = () => {
  const [userNumber, setUserNumber] = useState()
  const [gameRounds, setGameRounds] = useState(0)
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoaded(true)}
        onError={(error) => console.error(error)}
      />
    )
  }

  // Helpers
  const startNewGame = () => {
    setGameRounds(0)
    setUserNumber(null)
  }

  const handleGameOver = (nRounds) => setGameRounds(nRounds)

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGameRounds(0)
  }

  let content = <StartGameScreen startGameHandler={startGameHandler} />
  if (userNumber && gameRounds <= 0)
    content = (
      <GameScreen userChoice={userNumber} handleGameOver={handleGameOver} />
    )
  else if (gameRounds > 0)
    content = (
      <GameOverScreen
        nRounds={gameRounds}
        correctAnswer={userNumber}
        startNewGame={startNewGame}
      />
    )

  return (
    <View style={styles.screen}>
      <Header title="Guess The Number" />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default App
