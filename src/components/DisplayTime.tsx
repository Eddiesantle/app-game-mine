import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface PropsDisplayTime {
  status: boolean;
}
const DisplayTime: FC<PropsDisplayTime> = ({status}) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  console.log('🚀 ~ file: DisplayTime.tsx:8 ~ status:', status);

  useEffect(() => {
    if (status) {
      resetTimer();
      // If status is true, start the timer
      setIsActive(true);
    } else {
      // If status is false, pause the timer
      setIsActive(false);
    }
  }, [status]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds === 59 ? 0 : prevSeconds + 1));
        if (seconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  /* const toggleTimer = () => {
    setIsActive(!isActive);
  };
 */
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fontTimeHead}>TIME</Text>
      <Text style={styles.fontTime}>{`${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
      {/* <TouchableOpacity onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  fontTime: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: '600',
  },
  fontTimeHead: {
    color: '#FF0000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default DisplayTime;
