module.exports = array => {
    let sorted_array = array.slice(0);
    sorted_array.sort((a, b) => {
        let x = a.properties.name_ca.toLowerCase();
        let y = b.properties.name_ca.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0
    });

    return sorted_array
}