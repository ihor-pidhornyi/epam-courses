console.log('Heap sort');

function heapSort(arr) {
    let len = arr.length,
        end = len;

    heapify(arr, len);

    while (end > 0) {
        swap(arr, --end, 0);
        siftDown(arr, 0, end);
    }
    return arr;
}

function heapify(arr, len) {
    let mid = Math.floor(len / 2 - 1);
    while (mid >= 0) {
        siftDown(arr, mid--, len);
    }
}

function siftDown(arr, start, end) {
    let root, child, toSwap
    while (start < end) {
        root = start;
        child = start * 2 + 1;
        toSwap = child + 1;
        if (child < end && arr[root] < arr[child]) {
            root = child
        }
        if (toSwap < end && arr[root] < arr[toSwap]) {
            root = toSwap
        }
        if (root === start) {
            return;
        }
        swap(arr, start, root);
        start = root;
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}