function clearAnswers(textChannelArray){
    const clearing = [];
    for(let channel of textChannelArray){
        clearing.push(channel.bulkDelete(99));
    }
    return Promise.all(clearing);
}

module.exports = clearAnswers;