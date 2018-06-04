import React from 'react';
import CommentBox from 'react-commentbox';

import '../styles/MyCommentBox.css';

class MyCommentBox extends React.Component {

    state = { authorName: '', authorNameIsSet: false };

    onChangeAuthorName = (e) => this.setState({ authorName: e.currentTarget.value });

    onSubmitAuthorName = (e) => {

        e.preventDefault();
        this.setState({ authorNameIsSet: true });
    };

    // fetch our comments from Contentful
    getComments = () => {

        return this.props.contentfulClient.getEntries({
            'order': 'sys.createdAt', // important for determining nested comments
            'content_type': 'comment',
            'fields.subject': this.props.subjectId,
        }).then( response => {

            return response.items;

        }).catch(console.error);
    };

    // transform Contentful entries to objects that react-commentbox expects.
    normalizeComment = (comment) => {

        const { id, createdAt } = comment.sys;
        const { body, author, parentComment } = comment.fields;

        return {
            id,
            bodyDisplay: body,
            userNameDisplay: author,
            timestampDisplay: createdAt.split('T')[0],
            belongsToAuthor: false,
            parentCommentId: parentComment ? parentComment.sys.id : null
        };
    };

    // make an API call to post a comment
    comment = (body, parentCommentId = null) => {

        return this.props.postData('/create-comment', {
            body,
            parentCommentId,
            authorName: this.state.authorName,
            subjectId: this.props.subjectId
        });
    };

    // will be shown when the comment box is disabled
    disabledComponent = (props) => {

        return (
            <form className="author-name" onSubmit={ this.onSubmitAuthorName }>
                <input
                    type="text"
                    placeholder="Enter your name to post a comment"
                    value={ this.state.authorName }
                    onChange={ this.onChangeAuthorName }
                />
                <button type="submit">Submit</button>
            </form>
        );
    };

    render() {

        return (
            <div>
                <h4>Comments</h4>
                <CommentBox
                    disabled={ !this.state.authorNameIsSet }
                    getComments={ this.getComments }
                    normalizeComment={ this.normalizeComment }
                    comment={ this.comment }
                    disabledComponent={ this.disabledComponent }
                />
            </div>
        );
    };
}

export default MyCommentBox;