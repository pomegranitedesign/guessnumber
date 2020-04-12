import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import uuid from 'uuid/v4'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randNum = Math.floor(Math.random() * (max - min) + min)
  if (randNum === exclude) return generateRandomBetween(min, max, exclude)
  else return randNum
}

const GameScreen = ({ userChoice = 0, handleGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)

  const [prevGuesses, setPrevGuesses] = useState([initialGuess])
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  // Refs
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) handleGameOver(prevGuesses.length)
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

    setPrevGuesses((current) => [...current, nextNumber])
    setCurrentGuess(nextNumber)
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuess('lower')}>
          <Ionicons name="md-remove" size={24} color="#ffffff" />
        </MainButton>

        <MainButton onPress={() => nextGuess('greater')}>
          <Ionicons name="md-add" size={24} color="#ffffff" />
        </MainButton>
      </Card>

      <ScrollView>
        {prevGuesses.map((guess) => (
          <View key={uuid()}>
            <Text>{guess}</Text>
          </View>
        ))}
      </ScrollView>
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
