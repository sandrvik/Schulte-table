let size = 5;

function shuffle(array) {
    let i = array.length,
        j = 0;

    while (i--) {

        j = Math.floor(Math.random() * (i + 1));

        // swap randomly chosen element with current element
        [array[i],array[j]] = [array[j],array[i]];
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
let container = document.querySelector('.container');
for (let i = 0; i < Math.pow(size, 2); i++) {
    let button = document.createElement('button');
    button.classList.add('button', 'wrongButton');
    button.style.width = 98/size +'vmin';
    button.style.height = 98/size +'vmin';
    container.append(button);
}

//Create an array and fill the buttons
let arr = createArr(size);
let shuffledArr = shuffle([...arr]);
let buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach((button, index) => button.textContent = shuffledArr[index].toString());

buttons.sort((a,b) => +(a.textContent) - +(b.textContent));
buttons[0].classList.add('button', 'trueButton');
buttons.forEach((button, index) => button.addEventListener('click', function() {
                                                                if (+button.textContent === arr[0]) {
                                                                    arr.shift();
                                                                    if (buttons[index+1]) {
                                                                        buttons[index+1].classList.add('trueButton');
                                                                        button.classList.remove('trueButton');
                                                                    } else { button.classList.remove('trueButton'); console.log('win');}
                                                                    
                                                                }
                                                                }))