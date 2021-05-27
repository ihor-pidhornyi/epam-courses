export default (field, coord) => {
    if(field[coord] === 0) {
        return true;
    }
    return false;
}