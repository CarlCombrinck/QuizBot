function clearChannel(channel){
    return channel.bulkDelete(99);
}

module.exports = clearChannel;