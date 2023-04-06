const postForm = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#contents').value.trim();
    const date_created = document.querySelector('#created').value.trim();
  
    if (title && contents && date_created) {
      const response = await fetch('/blog', {
        method: 'POST',
        body: JSON.stringify({ title, contents, date_created }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.postForm').addEventListener('submit', postForm);
  