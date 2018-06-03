const createComment = require('../utils/createComment');

exports.handler = function (event, context, callback) {

    const { body, authorName, subjectId, parentCommentId } = JSON.parse(event.body);

    createComment(body, authorName, subjectId, parentCommentId)
        .then(entry => callback(null, {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: JSON.stringify({ message: 'OK' })
        }))
        .catch(callback);
};
