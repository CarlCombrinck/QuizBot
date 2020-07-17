function resetAll(quizGuild){
    try {
        quizGuild.resetAll();
        return Promise.resolve("Reset everything!");
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = resetAll;