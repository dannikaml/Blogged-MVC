const deleteForms = document.querySelectorAll('.delete-form');

deleteForms.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent the form from submitting normally
    const postId = e.target.getAttribute('action').split('/').pop();
    try {
      const response = await fetch(`/blogs/${postId}`, {
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

