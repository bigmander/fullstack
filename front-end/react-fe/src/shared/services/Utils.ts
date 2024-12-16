export function getRandomColor() {
    return '#' + getRandomNumber(256).toString(16) +
        getRandomNumber(256).toString(16) +
        getRandomNumber(256).toString(16);
}

export function getRandomNumber(max = 256, min = 0) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}