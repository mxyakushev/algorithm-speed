// VARIABLES

const input = document.querySelector('.input');
const generateButton = document.querySelector('.generate-button');
const sortButton = document.querySelector('.sort-button');
const givenArray = document.querySelector('.given-array');
const speed = document.querySelector('.speed');
const sorted = document.querySelector('.sorted');
const result = document.querySelector('.result');

let array;
let performanceArray= [];
let sortedArr;
let noMultipleSort = 0;

// LISTENERS

generateButton.addEventListener('click', () => {
    array = [];
    sortedArr = [];
    noMultipleSort = 0;
    clearTemplates();
    generateArray();
    showArray(array, innerGivenArray, 'Generated array');
});

sortButton.addEventListener('click', () => {
    noMultipleSort++;
    if(noMultipleSort == 1){
        clearTemplates();
        performanceArray.push(['Merge Sort', checkSpeed(mergeSort)]);
        performanceArray.push(['Quick Sort', checkSpeed(quickSort)]);
        performanceArray.push(['Insertion Sort', checkSpeed(insertionSort)]);
        performanceArray.push(['Sort By Choice', checkSpeed(sortByChoice)]);
        performanceArray.push(['Bubble Sort', checkSpeed(bubbleSort)]);
        showArray(sortedArr, innerSorted, 'Sorted array');
        performanceArray.forEach(elem => {
            createTemplate(`${elem[0]}: ${elem[1]} ms`, innerSpeed)
        })
        createTemplate(findFastest(performanceArray), innerResult);
    }
    else {
        alert('You have already sorted the array !');
    }
})

// FUNCTIONS

function clearTemplates(){
    performanceArray = [];
    speed.innerHTML = '';
    sorted.innerHTML = '';
    result.innerHTML = '';
}

function generateArray() {
    array = Array(1000).fill(null).map(() => Math.floor(Math.random() * 5000));
}

function showArray(arr, wrapper, text) {
    let elements = '';
    arr.forEach(el => {
        elements += `${el.toString()}, `;
        createTemplate(`${text}: <span class="small">[${elements.replace(/,\s*$/, "")
            }]</span>`, wrapper);
    })
}

function checkSpeed(sortFunction) {
    const array2 = [...array];
    const t0 = new Date().getTime();
    sortFunction(array2);
    const t1 = new Date().getTime();
    sortedArr = array2;
    performance = t1 - t0;
    return performance;
}

function bubbleSort(array){
    for(let j = 0; j < array.length; j++){
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
    }
    return array;
}

function sortByChoice(array){
    for(let i = 0; i < array.length - 1; i++){
        let minIndex = i;
        for(let j = i + 1; j < array.length; j++){
            if(array[j] < array[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex != i){
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}

function insertionSort(array){
    for(let i = 1; i < array.length; i++){
        let key = array[i];
        let j = i - 1;

        while(j >= 0 && array[j] > key){
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}

function quickSort(array){
    if(array.length <= 1){
        return array;
    }
    const pivot = array[array.length - 1];
    const leftArr = [];
    const rightArr = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            leftArr.push(array[i])
        } else {
            rightArr.push(array[i]);
        }
    }
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}

function mergeSort(array){
    if(array.length <= 1){
        return array;
    }
    const midIndex = Math.floor(array.length / 2);
    const leftArr = array.slice(0, midIndex);
    const rightArr = array.slice(midIndex);

    return merge(
        mergeSort(leftArr),
        mergeSort(rightArr)
    )
}

function merge(left, right){
    const output = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
        const leftEl = left[leftIndex];
        const rightEl = right[rightIndex];

        if(leftEl < rightEl){
            output.push(leftEl);
            leftIndex++;
        } else {
            output.push(rightEl);
            rightIndex++;
        }
    }

    return [...output, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

function createTemplate(text, callback){
    let template = `<div class='display'>
                            ${text}
                        </div>`;
    callback(template);
}

function innerGivenArray(temp){
    givenArray.innerHTML = temp;
}

function innerSpeed(temp){
    speed.insertAdjacentHTML('afterbegin', temp);
}

function innerResult(temp){
    result.innerHTML = temp;
}

function innerSorted(temp){
    sorted.innerHTML = temp;
}

function findFastest(perf){
    let min = perf[0][1];
    let fastest;
    let count = 0;
    for(let i = 1; i < 5; i++){
        if (min > perf[i][1]){
            min = perf[i][1];
        }
    }
    perf.forEach(el => {
        if(el[1] == min){
            count++;
            fastest = el[0];
        }
    })
    if(count > 1){
        return 'NO WINNERS';
    } else {
        return `${fastest} WINS`;
    }
}