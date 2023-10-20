import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WelcomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Examples</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            Explain quantum computing in simple terms.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capabilities</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            Remembers what the user said earlier in the conversation.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Limitations</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            May occasionally generate incorrect information.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Info</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            How do I make an HTTP request in JavaScript?
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Card</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            This is a sample card description. You can replace this with your content.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Another Sample Card</Text>
        <View style={styles.card}>
          <Text style={styles.cardDescription}>
            This is another sample card description. You can replace this with your content.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default WelcomeScreen;
