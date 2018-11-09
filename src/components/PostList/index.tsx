import React from 'react'
import Post from '../Post'

export default function PostList (props:any) {
    const sortedPosts = props.posts.slice().sort((a:any,b:any) => {
        const f = new Date(a.reposted_date).getTime() || new Date(a.date).getTime();
        const s = new Date(b.reposted_date).getTime() || new Date(b.date).getTime();
        return f - s;
    }).reverse();

    const posts = sortedPosts.map(function (post:any) {
        return <Post key={post.postId} post={post} updateData={props.updateData} pinPost={props.pinPost} location={props.location} />
    });
    
    return (
        <>
            {posts}
        </>
    )
}