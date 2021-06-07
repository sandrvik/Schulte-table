let size = 5;

let startTime, endTime;

let arr, shuffledArr;

let result;

let resultTime;

function makeResult() {
    result = document.createElement('div');
    result.className = "result";
    result.textContent = `${resultTime} sec`;
}

// Get radio buttons and add listener for each
let difficulties = document.getElementsByName('difficulty');
difficulties.forEach(difficulty => {
    return difficulty.addEventListener('click', () => size = +difficulty.defaultValue)
});


function shuffle(array) {
    let i = array.length,
        j = 0;

    while (i--) {

        j = Math.floor(Math.random() * (i + 1));

        // swap randomly chosen element with current element
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function createArr(s) {
    let size = Math.pow(s, 2);
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i + 1);
    }
    return arr;
}

// Style and create the table
function createTable() {
    let container = document.querySelector('.container');
    for (let i = 0; i < Math.pow(size, 2); i++) {
        let cell = document.createElement('button');
        cell.classList.add('cell');
        cell.style.width = 98 / size + 'vmin';
        cell.style.height = 98 / size + 'vmin';
        container.append(cell);
    }

    //Create an array and fill the cells
    arr = createArr(size);
    shuffledArr = shuffle([...arr]);
    let cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach((cell, index) => cell.textContent = shuffledArr[index].toString());

    cells.sort((a, b) => +(a.textContent) - +(b.textContent));
    cells[0].classList.add('trueCell');
    cells.forEach((cell, index) => cell.addEventListener('click', function () {
        if (+cell.textContent === arr[0]) {
            arr.shift();
            if (cells[index + 1]) {
                cells[index + 1].classList.add('trueCell');
                setTimeout(() => cell.classList.remove('trueCell'), 150);  // trick for mobile platforms
            } else {
                endTime = new Date().getTime();
                setTimeout(() => cell.classList.remove('trueCell'), 150);
                resultTime = ((endTime - startTime) / 1000).toFixed(1);
                document.querySelector('.mainContainer').classList.add('hidden');
                container.innerHTML = ""; //clear all cells
                document.querySelector('.startButton').textContent = "RESTART";              
                result ? result.textContent = `${resultTime} sec` : makeResult();
                document.querySelector('.schulteContainer').classList.remove('hidden');
                document.querySelector('.buttonContainer').prepend(result);
            }
        }
    }))
}


document.querySelector('.startButton').addEventListener('click', function () {
    createTable();
    document.querySelector('.mainContainer').classList.remove('hidden');
    document.querySelector('.schulteContainer').classList.add('hidden');
    startTime = new Date().getTime();
})