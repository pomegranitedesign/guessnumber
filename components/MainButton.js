import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Colors from '../constants/colors'

const MainButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  buttonText: {
    color: '#ffffff',
  },
})

export default MainButton
