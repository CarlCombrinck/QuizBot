function clearScores(scoreChannel){
    return scoreChannel.bulkDelete(99);
}

module.exports = clearScores;