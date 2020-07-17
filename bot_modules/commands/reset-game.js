function resetGame(quizGuild){
    try {
        quizGuild.resetGame();
        return Promise.resolve("Quiz reset!");
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = resetGame;