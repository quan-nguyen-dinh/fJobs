

import { router } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

function index() {
  return (
    <Text onPress={() => {
        router.push(`chat/${123}`);
    }}>Chat layout</Text>
  )
}

export default index