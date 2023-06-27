import ReactModal from 'react-modal';

const CommunityModal = ({
    isOpen,
    onRequestClose,
    post,
    user,
    comments,
    handleLikeClick,
    addComment,
    handleCommentChange,
    deleteComment
  }) => {
    const handleLike = () => {
      handleLikeClick(post.grandParentId, post.parentId, post.id);
    };
  
    const handleSubmitComment = (e) => {
      e.preventDefault();
      addComment(e, post.grandParentId, post.parentId, post.id);
    };
  
    const handleChangeComment = (e) => {
      handleCommentChange(post.id, e.target.value);
    };
  
    const handleDeleteComment = (commentId) => {
      deleteComment(post.grandParentId, post.parentId, post.id, commentId);
    };
  
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Selected Post"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            color: 'black',
            backgroundColor: 'white',
            margin: '0 auto',
            width: '50%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'scroll',
          },
        }}
      >
        {post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.docId}>
                  {comment.content}{' '}
                  {user && user.uid === comment.userId && (
                    <button onClick={() => handleDeleteComment(comment.docId)}>
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <p>Likes: {post.likes}</p>
            {user && (
              <button
                onClick={handleLike}
                style={{
                  backgroundColor: post.likedUsers && post.likedUsers.includes(user.uid) ? 'blue' : 'white',
                  color: post.likedUsers && post.likedUsers.includes(user.uid) ? 'white' : 'black',
                }}
              >
                Like
              </button>
            )}
            {user && (
              <form onSubmit={handleSubmitComment}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comments[post.id] || ''}
                  onChange={handleChangeComment}
                />
                <button type="submit">Post</button>
              </form>
            )}
          </>
        )}
      </ReactModal>
    );
  };

export default CommunityModal;
