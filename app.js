document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const width = 4;
    let squares = [];
    let score = 0;

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = 0;
            gridContainer.appendChild(square);
            squares.push(square);
        }
        generateNumber();
        generateNumber();
    }

    function generateNumber() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        while (squares[randomIndex].innerHTML != 0) {
            randomIndex = Math.floor(Math.random() * squares.length);
        }
        squares[randomIndex].innerHTML = Math.random() < 0.9 ? 2 : 4;
    }

    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];

                let filteredRow = row.filter(num => num); // Удаляем все нули
                let empty = Array(4 - filteredRow.length).fill(0); // Заполняем пустыми местами
                let newRow = empty.concat(filteredRow); // Объединяем пустые места и плитки

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
        combineRow();
    }

    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];
    
                let filteredRow = row.filter(num => num); // Удаляем все нули
                let empty = Array(4 - filteredRow.length).fill(0); // Заполняем пустыми местами
                let newRow = filteredRow.concat(empty); // Объединяем плитки и пустые места
    
                // Обновляем значения в клетках
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
        combineRow();
    }

    function moveUp() {
        for (let i = 0; i < width; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
    
            let filteredColumn = column.filter(num => num); // Удаляем все нули
            let empty = Array(4 - filteredColumn.length).fill(0); // Заполняем пустыми местами
            let newColumn = filteredColumn.concat(empty); // Объединяем плитки и пустые места
    
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
        combineColumn();
        moveUp();
    }
    
    function moveDown() {
        for (let i = 0; i < width; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
    
            let filteredColumn = column.filter(num => num); 
            let empty = Array(4 - filteredColumn.length).fill(0);
            let newColumn = empty.concat(filteredColumn);
    
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
        combineColumn();
        moveDown();
    }
    
    document.addEventListener('keyup', control);

    function control(e) {
        if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            moveUp();
        } else if (e.keyCode === 40) {
            moveDown();
        }
        generateNumber(); 
    }

    function combineRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
            }
        }
    }
    function combineColumn() {
        for (let i = 0; i < width * (width - 1); i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal; 
            }
        }
    }    
    let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
}, false);

function handleSwipe() {
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
            moveRight();
        } else if (deltaX < -50) {
            moveLeft();
        }
    } else {
        if (deltaY > 50) {
            moveDown();
        } else if (deltaY < -50) {
            moveUp();
        }
    }
    updateBoard();
}

    createBoard();
});
