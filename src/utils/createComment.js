const contentful = require('contentful-management');
const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN
});

module.exports = function createComment(body, authorName, subjectId, parentCommentId = null) {

    return client.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.createEntry('comment', {
            fields: {
                body: {
                    'en-US': body
                },
                author: {
                    'en-US': authorName
                },
                subject: {
                    'en-US': subjectId
                },
                parentComment: {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: parentCommentId
                        }
                    }
                }
            }
        }))
        .then(entry => entry.publish());
};