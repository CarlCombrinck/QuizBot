![QuizBot](/assets/images/full_logo.png)

## Description
This bot allows for the hosting of a trivia night on Discord. It provides commands and functionality for tasks such as displaying questions, retrieving answers, grading answers, displaying a leaderboard and more.
The bot is - currently - only useable by a single guild due to its design and lack of a persistent storage solution as it was originally only meant to serve a single Discord guild whilst being run locally by the user. It has not been deployed due to the above constraints but some redesigning could see this change.

## Command List
See ![Command.pdf](/docs/Commands.pdf) for the list of supported commands.

## TODO
### Commands
- [ ] Improve the mute, unmute, split and regroup commands. *Currently awaits each promise to resolve to avoid exceeding rate limit*
- [ ] Add ability to ask mutliple choice questions.
- [ ] Add speed round functionality.
- [ ] Improve command syntax.

### Embeds
- [ ] Add multiple choice embed.

### Code Improvements
- [ ] OOP needs some work/rethinking. *All information pertaining to a quiz is currently stored in a single QuizGuild object*
- [ ] Improve error and promise handling.
- [ ] Add comments to code.
- [ ] Simplify function parameters. *Some redundancies are present*

### Long Term
- [ ] Introduce persistent storage.
- [ ] Add question bank.
- [ ] Deploy?

###### Version 1.0.0
