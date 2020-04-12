import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import colors from '../constants/colors'

const GameOverScreen = ({ nRounds = 0, correctAnswer = 0, startNewGame }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          resizeMode="cover"
        />
      </View>
      <BodyText style={{ marginVertical: 20 }}>
        Your phone needed <Text style={styles.highlight}>{nRounds}</Text> to
        guess the number <Text style={styles.highlight}>{correctAnswer}</Text>
      </BodyText>
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

  imageContainer: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#000000',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  highlight: {
    color: colors.primary,
  },
})

export default GameOverScreen
