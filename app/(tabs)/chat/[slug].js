import React from 'react'
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native'

export default function DetailChat() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Array(10).fill(null)}
        renderItem={() => <Text style={styles.message}>This is a message</Text>}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  message: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});

