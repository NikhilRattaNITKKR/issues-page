import React, { useEffect, useState, Fragment } from "react";
import "./static/App.css";
import Message from "./components/Message";
import {
  FaStar,
  FaCodeBranch,
  FaEye,
  FaRegDotCircle,
  FaCommentAlt,
  FaGithub,
} from "react-icons/fa";


//redux
import { getIssues, getMoreIssues } from "./redux/action.js/IssueAction";
import { connect } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";

const App = ({ issuesData, getMoreIssues, getIssues, errMsg, loading }) => {
  const [username, setUsername] = useState("facebook");
  const [repo, setRepo] = useState("create-react-app");
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = () => {
    if (username.trim() && repo.trim()) {
      setPage(1);
      getIssues(username.trim(), repo.trim(), page);
    }
  };

  const fetchMoreIssue = () => {
    const temp = page + 1;
    setPage(page + 1);
    getMoreIssues(username.trim(), repo.trim(), temp);
  };

  return (
    <div className="root-div">
      <div className="form-div">
        <FaGithub className="github-icon" />

        <div className="">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div placeholder="Repository name" className="inp-repo-div">
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </div>
        <button
          className="btn-div"
          onClick={() => {
            fetchIssue();
          }}
        >
          {" "}
          Search{" "}
        </button>
      </div>
      <div className="issues-div ">
        <InfiniteScroll
          dataLength={issuesData.length}
          next={fetchMoreIssue}
          hasMore={true}
          loader={<h2> </h2>}
        >
          {issuesData.length ? (
            <Fragment>
              <div className="three">
                <div className="watch">
                  <FaEye className="icon-color" /> watch{" "}
                </div>
                <div className="fork">
                  <FaCodeBranch className="icon-color" /> fork{" "}
                </div>
                <div className="star">
                  <FaStar className="icon-color" /> star{" "}
                </div>
                
              </div>
             

              {issuesData.map((issue) => {
                return (
                  <div className="issue-div" key={issue.number}>
                    <div className="issue-title-div">
                      <FaRegDotCircle className="issue-circle" /> {issue.title}
                      {issue.labels.map((label) => {
                        return (
                          <span
                            key={label.id}
                            className={`label-span ${label.color}  `}
                          >
                            {" "}
                            {label.name}{" "}
                          </span>
                        );
                      })}
                    </div>
                    <div className="by-div">
                      {" "}
                      <p>
                        {" "}
                        #{issue.number} opened by <b> {issue.user.login} </b>{" "}
                      </p>{" "}
                      <p className="comment">
                        {" "}
                        <FaCommentAlt className="icon-color" /> {issue.comments}{" "}
                        comments{" "}
                      </p>{" "}
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ) : !loading ? (
            errMsg ? (
              <Message message="No such repository addresss!" />
            ) : (
              <Message message="No issue in this repository!" />
            )
          ) : (
            <h2>
              {" "}
              <Message message="Loading..." />{" "}
            </h2>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issuesData: state.issues,
    errMsg: state.err,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getIssues: (username, repo, page) =>
      dispatch(getIssues(username, repo, page)),
    getMoreIssues: (username, repo, page) =>
      dispatch(getMoreIssues(username, repo, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
