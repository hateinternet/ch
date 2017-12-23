module.exports = [
    'general',
    'footer',

    'philosophy',
    'collections',
    'history',
    'achievements',

    'stories'
].reduce((data, piece) => {
    data[piece] = require(`./${piece}`);

    return data;
}, {});
