import React from 'react'
import { Text, StyleSheet } from 'react-native'

const BodyText = ({ children, style = {} }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {},
})

export default BodyText
