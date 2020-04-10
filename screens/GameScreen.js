import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randNum = Math.floor(Math.random() * (max - min) + min)
  if (randNum === exclude) return generateRandomBetween(min, max, exclude)
  else return randNum
}

const GameScreen = ({ userChoice = 0, handleGameOver }) => {
  const [rounds, setRounds] = useState(0)
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  )

  // Refs
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) handleGameOver(rounds)
  }, [currentGuess, userChoice, handleGameOver])

  const nextGuess = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert('Don\t lie!', 'You know this is not true...', [
        { text: 'Sorry', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') currentHigh.current = currentGuess
    else currentLow.current = currentGuess

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )

    setRounds((currentRounds) => (currentRounds += 1))
    setCurrentGuess(nextNumber)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => nextGuess('lower')} />
        <Button title="Greater" onPress={() => nextGuess('greater')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
})

export default GameScreen
