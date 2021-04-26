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

let startTime, endTime;

document.querySelector('.startButton').addEventListener('click', function(){
    document.querySelector('.mainContainer').classList.remove('hidden');
    document.querySelector('.initialContainer').classList.add('hidden');
    startTime = new Date().getTime();
})


// Style and create the table
let container = document.querySelector('.container');
for (let i = 0; i < Math.pow(size, 2); i++) {
    let button = document.createElement('button');
    button.classList.add('button','wrongButton');
    button.style.width = 98/size +'vmin';
    button.style.height = 98/size +'vmin';
    container.append(button);
}

//Create an array and fill the buttons
let arr = createArr(size);
let shuffledArr = shuffle([...arr]);
let buttons = Array.from(document.querySelectorAll('.wrongButton'));
buttons.forEach((button, index) => button.textContent = shuffledArr[index].toString());

buttons.sort((a,b) => +(a.textContent) - +(b.textContent));
buttons[0].classList.add('trueButton');
buttons.forEach((button, index) => button.addEventListener('click', function() {
                                                                let removeTrueButtonStyle = function() {button.classList.remove('trueButton');};
                                                                if (+button.textContent === arr[0]) {
                                                                    arr.shift();
                                                                    if (buttons[index+1]) {
                                                                        buttons[index+1].classList.add('trueButton');
                                                                        setTimeout(removeTrueButtonStyle,150);
                                                                    } else {
                                                                            endTime = new Date().getTime(); 
                                                                            setTimeout(removeTrueButtonStyle,150);
                                                                            let resultTime = ((endTime - startTime)/1000).toFixed(1);
                                                                            document.querySelector('.mainContainer').classList.add('hidden');
                                                                            document.querySelector('.startButton').textContent = `${resultTime} sec`;
                                                                            document.querySelector('.initialContainer').classList.remove('hidden');}
                                                                }
                                                                }))
