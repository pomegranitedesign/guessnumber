import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TitleText = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 20,
  },
})

export default TitleText
