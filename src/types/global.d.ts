type ParamsProps = {
  blockSize: number;
  borderSize: number;
  fontSize: number;
  headerRatio: number;
  difficultLevel: number;
  getColumnsAmount: () => number;
  getRowsAmount: () => number;
};

type FieldProps = {
  opened: boolean;
  column: number;
  exploded: boolean;
  flagged: boolean;
  mined: boolean;
  nearMines: number;
  row: number;
};

interface FieldComponentProps extends FieldProps {
  onOpen: () => void;
  onSelect: () => void;
}

interface FlagProps {
  bigger?: boolean;
}

interface HeaderProps {
  onFlagPress: () => void;
  flagsLeft: string | number;
  onNewGame: () => void;
}

interface MineFieldProps {
  board: FieldProps[][];
  onOpenField: (r: number, c: number) => void;
  onSelectField: (r: number, c: number) => void;
}
