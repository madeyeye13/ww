document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsDiv = document.getElementById('comments');


    // Function to fetch and display comments
    function loadComments() {
        fetch('/comments')
            .then(response => response.json())
            .then(data => {
                commentsDiv.innerHTML = '';
                data.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <span style="color:blue;">${comment.name}</span> - ${new Date(comment.created_at).toLocaleDateString()}
                        <p style="border-bottom: 1px solid #ddd;">${comment.comment}</p>
                    `;
                    commentsDiv.appendChild(commentElement);
                });
            });
    }

    // Load comments when the page loads
    loadComments();

    // Handle form submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        fetch('/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, comment })
        })
        .then(response => response.json())
        .then(() => {
            commentForm.reset();
            loadComments(); // Reload comments after submission
        })
        .catch(error => console.error('Error:', error));
    });
});
