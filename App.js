import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const App = () => {
  const [userNumber, setUserNumber] = useState()
  const [gameRounds, setGameRounds] = useState(0)
  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  })

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

  if (!fontsLoaded) return <AppLoading />
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
