const commentForm = document.querySelector('#comment-form');
const deleteCommentForms = document.querySelectorAll('.delete-comment-form');

// Handle submission of new comment
commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const postId = e.target.getAttribute('action').split('/')[2];
  const commentContent = e.target.querySelector('#comment-content').value;
  try {
    const response = await fetch(`/blogs/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text: commentContent }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      location.reload(); // reload the page after comment submission
    }
  } catch (err) {
    console.error(err);
  }
});


// Handle deletion of comment
deleteCommentForms.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentId = e.target.getAttribute('data-comment-id');
    try {
      const response = await fetch(`/blogs/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        location.reload(); // reload the page after deletion
      }
    } catch (err) {
      console.error(err);
    }
  });
});

