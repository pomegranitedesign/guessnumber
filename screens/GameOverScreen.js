import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const GameOverScreen = ({ nRounds = 0, correctAnswer = 0, startNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of Rounds: {nRounds}</Text>
      <Text>The Number was: {correctAnswer}</Text>

      <View style={styles.newGameButton}>
        <Button title="NEW GAME" onPress={startNewGame} color="#4cd137" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  newGameButton: {
    marginTop: 20,
    width: 200,
  },
})

export default GameOverScreen
