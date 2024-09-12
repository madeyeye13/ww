document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsDiv = document.getElementById('comments');
    const commentsCountElement = document.querySelector('#comnt h3'); // Selecting the h3 element to update the count

    // Function to fetch and display comments
    function loadComments() {
        fetch('/comments')
            .then(response => response.json())
            .then(data => {
                commentsDiv.innerHTML = ''; // Clear existing comments
                const commentCount = data.comments.length; // Get the number of comments

                // Update the comments count
                commentsCountElement.textContent = `${commentCount} Comment${commentCount !== 1 ? 's' : ''}`; // Update the h3 text

                // Display each comment
                data.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.style.marginBottom = '20px'; // Add spacing between comments
                    commentElement.innerHTML = `
                        <span style="color:black;">${comment.name}</span> - ${new Date(comment.created_at).toLocaleDateString()}
                        <p style="border-bottom: 1px solid #ddd; line-height: 2em; font-size: 0.8em">${comment.comment}</p>
                    `;
                    commentsDiv.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
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
            commentForm.reset(); // Reset the form after submission
            loadComments(); // Reload comments after submission
        })
        .catch(error => console.error('Error submitting comment:', error));
    });
});
