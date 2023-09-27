import React, {FC} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  NativeSyntheticEvent,
} from 'react-native';

interface LevelSelection {
  onCancel: (event: NativeSyntheticEvent<any>) => void;
  isVisible: boolean;
  onLevelSelected: (r: number) => void;
}

const LevelSelection: FC<LevelSelection> = ({
  onCancel,
  isVisible,
  onLevelSelected,
}) => {
  return (
    <Modal
      onRequestClose={onCancel}
      visible={isVisible}
      animationType="slide"
      transparent={true}>
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecione o Nível</Text>
          <TouchableOpacity
            style={[styles.button, styles.bgEasy]}
            onPress={() => onLevelSelected(0.1)}>
            <Text style={styles.buttonLabel}>Fácil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgNormal]}
            onPress={() => onLevelSelected(0.2)}>
            <Text style={styles.buttonLabel}>Intermadiário</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgHard]}
            onPress={() => onLevelSelected(0.3)}>
            <Text style={styles.buttonLabel}>Difícil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderRadius: 8,
  },
  title: {
    marginBottom: 15,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    width: 150,
  },
  buttonLabel: {
    paddingHorizontal: 5,
    fontSize: 18,
    color: '#EEE',
    fontWeight: '700',
  },
  bgEasy: {
    backgroundColor: '#49b65d',
  },
  bgNormal: {
    backgroundColor: '#2765F7',
  },
  bgHard: {
    backgroundColor: '#F26337',
  },
});

export default LevelSelection;
