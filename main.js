const board = document.querySelector(".board");
let currentPlayer = "X";
let cells = Array.from({length: 9});

const handleClick = (e) => {
    const cellIndex = e.target.dataset.index;
    // console.log(cellIndex);

    // Check If Cell Is Empty Or Not
    if(cells[cellIndex]) return;

    updateCell(cellIndex, currentPlayer);

    const winner = checkWinner();
    console.log(winner);
    if ( winner || !cells.includes(undefined)) {
        alert(winner ? `Player ${winner} Wins!` : "Its A Draw!");
    }

    

}

cells.forEach((cell, index) => {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    
    cell.addEventListener("click", handleClick);
    

    board.appendChild(cell);
})

const updateCell = (index, value) => {
    cells[index] = value;
    const cell = board.querySelector(`[data-index = "${index}"]`);
    cell.textContent = value;
    cell.classList.add(value === "X" ? "player-x" : "player-o");
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(cells);
}

const checkWinner = () => {
    const winningCombos = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [3,4,5],
        [6,7,8],
        [2,4,6],
    ];

    for(const compo of winningCombos) {
        const [a,b,c] = compo;

        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {

            return cells[a];
        }
    }
    return null;
};

const resetGame = () => {
    cells = Array.from({length: 9});
    currentPlayer = "X";

    board.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent = "";
        cell.remove.classList("player-x", "player-o");
    });
}

// document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") resetGame();
// });
