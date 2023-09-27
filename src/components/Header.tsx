import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Flag from './Flag';
import DisplayTime from './DisplayTime';

const Header: FC<HeaderProps> = ({
  onFlagPress,
  flagsLeft,
  onNewGame,
  timeStart,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <TouchableOpacity onPress={onFlagPress} style={styles.flagButton}>
          <Flag bigger />
        </TouchableOpacity>
        <Text style={styles.flagsLeft}>= {flagsLeft}</Text>
      </View>
      <DisplayTime status={timeStart} />
      <TouchableOpacity style={styles.button} onPress={onNewGame}>
        <Text style={styles.buttonLabel}>Novo Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagsLeft: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Header;
