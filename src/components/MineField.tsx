import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Field from './Field';

const MineField: FC<MineFieldProps> = ({board, onOpenField, onSelectField}) => {
  const rows = board.map((row: any, r: any) => {
    const columns = row.map((field: any, c: any) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => onOpenField(r, c)}
          onSelect={() => onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={styles.column}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    backgroundColor: '#EEE',
  },
  column: {
    flexDirection: 'row',
  },
});

export default MineField;
