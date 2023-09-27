import React from 'react';
import {Component} from 'react';
import params from './../params';
import {
  cloneBoard,
  createMinedBoards,
  flagsUsed,
  hadExplosion,
  invertFlag,
  openField,
  showMines,
  wonGame,
} from './../functions';
import {Alert, StyleSheet, Vibration, View} from 'react-native';
import LevelSelection from './LevelSelection';
import Header from './../components/Header';
import MineField from './../components/MineField';

interface PropsCreateMinedBoards {
  opened: boolean;
  column: number;
  exploded: boolean;
  flagged: boolean;
  mined: boolean;
  nearMines: number;
  row: number;
}

interface State {
  board: PropsCreateMinedBoards[][];
  won: boolean;
  lost: boolean;
  start: boolean;
  showLevelSelection: boolean;
}

export default class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = (): State => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoards(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      start: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    Vibration.vibrate();

    // start game
    let start = true;

    if (lost) {
      showMines(board);
      start = false;
      Alert.alert('Perdeeeeuuu!', 'Aposto 10 pila que não consegue ganhar!!');
    }

    if (won) {
      start = false;
      Alert.alert('Parabénnnsss!!', 'Tu é brabo!');
    }
    this.setState({board, lost, won, start});
  };

  onSelectField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert('Parabéns Meu!', 'Você venceu!');
    }
    this.setState({board, won});
  };

  onLevelSelected = (level: any) => {
    params.difficultLevel = level;
    this.setState(this.createState());
  };

  render() {
    return (
      <View style={styles.conteiner}>
        {/* <Text style={styles.sectionTitle}>Iniciando o Mines!</Text>
            <Text style={styles.sectionDescription}>
              Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
            </Text> */}
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          timeStart={this.state.start}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})}
        />

        {/* <Field/>
              <Field opened/>
              <Field opened nearMines={1}/>
              <Field opened nearMines={2}/>
              <Field opened nearMines={3}/>
              <Field opened nearMines={6}/>
              <Field mined/>
              <Field mined opened/>
              <Field mined opened exploded/>
              <Field flagged/>
              <Field flagged opened/> */}
        <View style={styles.board}>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // conteiner: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f5fcff',
  // },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  conteiner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
});
