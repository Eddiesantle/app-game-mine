/* Função que cria o tabuleiro */
const createBoard = (rows: number, columns: number): FieldProps[][] => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          } as FieldProps;
        });
    });
};

/* FUnção que espalha as minas */
const spreadMines = (board: FieldProps[][], minesAmount: number) => {
  const rows: number = board.length;
  const columns: number = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = Math.floor(Math.random() * rows);
    const columnsSel = Math.floor(Math.random() * columns);

    if (!board[rowSel][columnsSel].mined) {
      board[rowSel][columnsSel].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoards = (
  rows: number,
  columns: number,
  minesAmount: number,
) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

const cloneBoard = (board: FieldProps[][]): FieldProps[][] => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

const getNeighbords = (board: FieldProps[][], row: number, column: number) => {
  const neighbors: FieldProps[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach((r: number) => {
    columns.forEach((c: number) => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diferent && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });

  return neighbors;
};

const safeNeighborhood = (
  board: FieldProps[][],
  row: number,
  column: number,
) => {
  const safes = (result: boolean, neighbor: FieldProps) =>
    result && !neighbor.mined;

  return getNeighbords(board, row, column).reduce(safes, true);
};

const openField = (board: FieldProps[][], row: number, column: number) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbords(board, row, column).forEach((n: any) =>
        openField(board, n.row, n.column),
      );
    } else {
      const neighbors = getNeighbords(board, row, column);
      field.nearMines = neighbors.filter((n: any) => n.mined).length;
    }
  }
};

const fields = (board: any) => [].concat(...board);
const hadExplosion = (board: FieldProps[][]) =>
  fields(board).filter((field: FieldProps) => field.exploded).length > 0;
const pendding = (field: FieldProps) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);
const wonGame = (board: FieldProps[][]) =>
  fields(board).filter(pendding).length === 0;
const showMines = (board: FieldProps[][]) =>
  fields(board)
    .filter((field: FieldProps) => field.mined)
    .forEach((field: FieldProps) => (field.opened = true));

const invertFlag = (board: FieldProps[][], row: number, column: number) => {
  const field = board[row][column];
  field.flagged = !field.flagged;
};

const flagsUsed = (board: FieldProps[][]) =>
  fields(board).filter((field: FieldProps) => field.flagged).length;

export {
  createMinedBoards,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
};
