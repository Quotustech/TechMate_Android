import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Define a custom CodeBlock component to display code snippets


const Response = ({data}) => {

  
  const scrollViewRef = useRef();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.questionContainer}>
          <Text style={styles.questionText}>
            <Text style={styles.questionLabel}>Q: </Text>
            {data.question} 
          </Text>
        </ScrollView>
        
        {/* Add an answer container below the question section */}
        <ScrollView style={styles.answerContainer}>
          <Text style={styles.answerLabel}>Answer:</Text>
          <Text style={styles.answerText}>
          {data?.answer} 
          {data?.response} 




 
          </Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',

    },
    scrollContainer: {
      padding: 10,
    },
    questionContainer: {
      padding: 10,
      marginBottom: 5,
      borderRadius: 10,
      maxHeight: 60,
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#131717', // Change text color to white
    },
    questionLabel: {
      color: '#131717',
    },
    answerContainer: {
      backgroundColor: '#ffff',
      padding: 10,
      borderRadius: 10,
      maxHeight: 460,
    },
    answerLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#131717',

    },
    answerText: {
      fontSize: 16,
      color:'#131717'
    },
  });
  
  
  
  
  
  

export default Response;

