import React from "react";

const PostList = props => {
    return (
        <div className="postlist">
            {props.posts.map(post => <div className="post" key={post.id}>{post.title}</div>)}
        </div>
    )
}

export default PostList;