console.log('Insertion sort');

function insertionSort(arr) {
    let i, len = arr.length, el, j;

    for (i = 0; i < len; i++) {
        el = arr[i];
        j = i;

        while (j > 0 && arr[j - 1] >= el) {
            arr[j] = arr[j - 1];
            --j;
        }

        arr[j] = el;
    }

    return arr;
}


console.log(insertionSort([7, 5, 2, 4, 3, 9])); //[2, 3, 4, 5, 7, 9]
console.log(insertionSort([9, 7, 5, 4, 3, 1])); //[1, 3, 4, 5, 7, 9]
console.log(insertionSort([1, 2, 3, 4, 5, 6])); //[1, 2, 3, 4, 5, 6]