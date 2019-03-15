import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";

function GetProfilePost({ match }) {
  const { user } = useContext(UserContext);
  const { id } = user;
  const [postsUser, setPostsUser] = useState([]);

  useEffect(() => {
    const postUserId = match.params.userId;
    getUserPosts(postUserId);
  }, []);

  const getUserPosts = (postUserId = id) => {
    logic.retrievePostByUser(postUserId).then(res => setPostsUser(res));
  };

  return (
    <div className="card-listt">
      <h2>{postsUser.user && postsUser.user.username}</h2>
      {postsUser.post &&
        postsUser.post.map(post => (
          <Card
            key={post._id}
            title={post.title}
            image={post.image}
            description={post.description}
            comments={post.comments}
            countfavs={post.countfavs}
            postId={post && post._id}
            call={getUserPosts}
          />
        ))}
    </div>
  );
}

export default withRouter(GetProfilePost);
