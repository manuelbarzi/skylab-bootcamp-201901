import React, { useState, Fragment, useEffect } from "react";
import logic from "../../logic";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import Feedback from "../Feedback";
import "./index.sass";

function Search({ history, match }) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const handleHashtagInput = event => setTag(event.target.value);
  const [searchFeedback, setSearchFeedback] = useState(null);

  const searchByTag = async initTag => {
    logic
      .retrieveAllPosts()
      .then(posts => {
        const filtered = posts.docs.filter(obj =>
          obj.tags.includes(`#${initTag}`)
        );
        setPosts(filtered);
        console.log("username", posts.docs);
        window.scrollTo(0, 0);
        if (filtered.length === 0) {
          showSearchFeedback("No results");
        }
      })
      .catch(({ message }) => showSearchFeedback(message));
  };

  const retrieveUserFavs = () => {
    logic.retrieveUser().then(user => setUserFavorites(user.favorites));
  };

  const handleClick = event => {
    event.preventDefault();
    history.push(`/search/${tag}`);
  };

  const hideSearchFeedback = () => setSearchFeedback(null);
  const showSearchFeedback = message => {
    setSearchFeedback(message);
    setTimeout(hideSearchFeedback, 2000);
  };

  useEffect(() => {
    retrieveUserFavs();
    const initTag = match.params.tag;
    if (initTag) searchByTag(initTag);
  }, [match.params.tag]);
  return (
    <Fragment>
      <div className="add-post">
        <form className="search-container" onSubmit={handleClick}>
          <input
            className="search-input"
            type="text"
            name="title"
            onChange={handleHashtagInput}
            placeholder="Search by tag"
          />
          {searchFeedback && <Feedback message={searchFeedback} />}
        </form>
      </div>
      <div className="card-list">
        {posts &&
          posts.map(post => (
            <Card
              username={post.user_id.username}
              key={post._id}
              title={post.title}
              image={post.image}
              description={post.description}
              comments={post.comments}
              postId={post._id}
              searchByTag={searchByTag}
              userFavorites={userFavorites}
              countfavs={post.countfavs}
              date={post.date}
              call={retrieveUserFavs}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default withRouter(Search);
