import React from 'react';
import { createClient } from 'contentful';

import '../styles/App.css';
import MyCommentBox from './MyCommentBox.jsx';

const fakeBlogPostId = 'my-blog-post';

const postData = (url, data) => {

    return fetch(`.netlify/functions${url}`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        //mode: 'cors' // if your endpoints are on a different domain
    }).then(response => response.json());
};

const contentfulClient = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID || 'my-space-id',
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || 'my-access-token',
    host: process.env.REACT_APP_CONTENTFUL_HOST
});

const App = props => (
    <div>
        <h3>Authless Comments Example</h3>
        <div>
            <MyCommentBox
                subjectId={fakeBlogPostId}
                postData={postData}
                contentfulClient={contentfulClient}
            />
        </div>
    </div>
);


export default App;
