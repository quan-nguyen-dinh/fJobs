import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import {REACT_APP_DEV_MODE} from '@env';
const index = (REACT_APP_DEV_MODE) => {
  console.log()
  return (
   <Redirect href="/(authenticate)/login"/>
  )
}

export default index

const styles = StyleSheet.create({})

//index.js => /