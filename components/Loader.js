import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({color,size}) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
