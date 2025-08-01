import arbitor from "../src/arbiter/arbiter.js";

export const getCharacter = (file) => String.fromCharCode(file + 96);
export const createPosition = () => {
  const position = new Array(8).fill("").map(() => new Array(8).fill(""));

  for (let i = 0; i < 8; i++) {
    position[6][i] = "bp";
    position[1][i] = "wp";
  }

  position[0][0] = "wr";
  position[0][1] = "wn";
  position[0][2] = "wb";
  position[0][3] = "wq";
  position[0][4] = "wk";
  position[0][5] = "wb";
  position[0][6] = "wn";
  position[0][7] = "wr";

  position[7][0] = "br";
  position[7][1] = "bn";
  position[7][2] = "bb";
  position[7][3] = "bq";
  position[7][4] = "bk";
  position[7][5] = "bb";
  position[7][6] = "bn";
  position[7][7] = "br";

  /* This is a position that you can use to test the disambiguation of moves
   * it has three white knights that can all move to the same square and you
   * you should see that the moves are properly disambiguated.
   *
   * position[-1][0] = "bk";
   * position[-1][7] = "wk";
   * position[2][2] = "wn";
   * position[2][6] = "wn";
   * position[4][2] = "wn";
   *
   * Example: if you move the knight on g4 to e5, the notation was originally
   * only "Ne5" but now it should be "Nge5" to signify which knight is moving.
   *
   * All cases should work, if you have two of the same pieces that can move to
   * the same square, but they are on different files or ranks, the notation
   * should be disambiguated by the file, rank, or file and rank, of the piece
   * depending on where the ambiguity is.
   *
   * If you have two knights that can move to the same square, but they
   * are on different files, the notation should be disambiguated by the file.
   *
   * If you have two knights that can move to the same square, but they are on
   * the same file, the notation should be disambiguated by the rank.
   *
   * Take for example this opening:
   * 1. e4 e5
   * 2. Ne2 Nc6
   * 3. Nbc3 ...
   *
   * Since we have two knights that can both move to the c3 square, we need to
   * disambiguate the move. Disambiguating by the file takes priority.
   *
   * If you have two of the same pieces that are on the same file and can move to
   * the same square, you would then disambiguate by the rank.
   *
   * In the rare case that you have three or more of the same piece that can all
   * move to the same square and they share files and ranks, you would disambiguate
   * by both the file and rank. If you move the knight on c3 to e5 in the provided
   * position, the notation should be "Nc3e5" to signify that the knight on c3
   * is moving to e5.
   *
   */

  return position;
};

export const copyPosition = (position) => {
  const newPosition = new Array(8).fill("").map(() => new Array(8).fill(""));

  for (let rank = 0; rank < position.length; rank++) {
    for (let file = 0; file < position[0].length; file++) {
      newPosition[rank][file] = position[rank][file];
    }
  }

  return newPosition;
};

export const areSameColorTiles = (coords1, coords2) =>
  (coords1.x + coords1.y) % 2 === coords2.x + coords2.y;

export const findPieceCoords = (position, type) => {
  let results = [];
  position.forEach((rank, i) => {
    rank.forEach((pos, j) => {
      if (pos === type) results.push({ x: i, y: j });
    });
  });
  return results;
};

export const getNewMoveNotation = ({
  piece,
  rank,
  file,
  x,
  y,
  position,
  previousPosition,
  promotesTo,
}) => {
  let note = "";
  const takes = position[x][y];

  rank = Number(rank);
  file = Number(file);
  if (piece[1] === "k" && Math.abs(file - y) === 2) {
    if (file < y) return "O-O";
    else return "O-O-O";
  }

  if (piece[1] !== "p") {
    note += disambiguateMove(
      piece,
      position,
      previousPosition,
      rank,
      file,
      x,
      y,
      note,
      takes,
    );
  } else if (rank !== x && file !== y) {
    note += getCharacter(file + 1) + "x";
  }

  note += getCharacter(y + 1) + (x + 1);

  const positionAfterMove = arbitor.performMove({
    position,
    piece,
    rank,
    file,
    x,
    y,
  });

  if (promotesTo) note += "=" + promotesTo.toUpperCase();

  const mated = arbitor.isCheckMate(
    positionAfterMove,
    piece[0] === "w" ? "b" : "w",
    "none",
  );
  const checked = arbitor.isPlayerInCheck({
    positionAfterMove: positionAfterMove,
    position: position,
    player: piece[0] === "w" ? "b" : "w",
  });

  if (mated) note += "#";
  else if (checked) note += "+";

  return note;
};

export const disambiguateMove = (
  piece,
  position,
  previousPosition,
  currX,
  currY,
  toX,
  toY,
  note,
  takes,
) => {
  let ambiguousPieces = [];
  const enemyColor = piece[0] === "w" ? "b" : "w";

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (
        position[rank][file] === "" ||
        (rank === currX && file === currY) ||
        position[rank][file][0] === enemyColor
      ) {
        continue;
      } else if (position[rank][file] === piece) {
        const pieceAtPositionValidMoves = arbitor.getValidMoves({
          position: position,
          prevPosition: previousPosition,
          castleDirection: "none",
          piece: position[rank][file],
          rank,
          file,
        });
        if (
          pieceAtPositionValidMoves.some(([x, y]) => x === toX && y === toY)
        ) {
          ambiguousPieces.push({
            pieceAt: position[rank][file],
            rank: rank,
            file: file,
          });
        }
      }
    }
  }

  const pieceLetter = piece[1].toUpperCase();
  const fileChar = getCharacter(currY + 1);
  const rankChar = (currX + 1).toString();

  function appendTake(str) {
    return takes !== "" ? str + "x" : str;
  }

  if (ambiguousPieces.length === 0) {
    // No ambiguity, just return the piece letter
    note += appendTake(pieceLetter);
  } else if (ambiguousPieces.length === 1) {
    // Only one ambiguous piece
    if (ambiguousPieces[0].file !== currY) {
      // try to disambiguate by file
      note += appendTake(pieceLetter + fileChar);
    } else {
      // disambiguate by rank
      note += appendTake(pieceLetter + rankChar);
    }
  } else {
    // More than one ambiguous piece
    let onFile = false;
    let onRank = false;
    ambiguousPieces.forEach((ambiguousPiece) => {
      // Check if the moving piece is on the same file or rank of an ambiguous piece
      if (ambiguousPiece.file === currY) onFile = true;
      if (ambiguousPiece.rank === currX) onRank = true;
    });

    if (onFile && onRank) {
      // Disambiguate depending on both file and rank
      note += appendTake(pieceLetter + fileChar + rankChar);
    } else if (onFile) {
      note += appendTake(pieceLetter + rankChar);
    } else {
      note += appendTake(pieceLetter + fileChar);
    }
  }

  return note;
};
