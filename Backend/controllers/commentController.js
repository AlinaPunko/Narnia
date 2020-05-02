const commentRepository = require('../api/comment')
const userRepository = require('../api/user')

module.exports = async (message, ws, aWss) => {
    const commentInfo = JSON.parse(message.data);
    await commentRepository.add(commentInfo);
    const comments = await commentRepository.getByFullInfo(commentInfo.authorId, commentInfo.bookId, commentInfo.text);
    const comment = comments[0];
    const user = await userRepository.getById(comment.authorId);
    const commentFullInfo = {
        bookId: comment.bookId,
        id: comment.id,
        text: comment.text,
        userName: user[0].name,
        userPhoto: user[0].photo
    };
    aWss.clients.forEach(function (client) {
        console.log('ewrwer');
        client.send(JSON.stringify(commentFullInfo));
    });
}