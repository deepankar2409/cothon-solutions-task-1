// Toggle Navigation
function toggleNav() {
    document.querySelector('.links').classList.toggle('show');
}

// Smooth Scroll for Hero Section
document.querySelector('.scroll-down').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#explore').scrollIntoView({ behavior: 'smooth' });
});

// Handle Post Submission
document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    displayPost({ title, content, timestamp: new Date().toISOString() });
});

// Display Post
function displayPost(post) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post');
    postContainer.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <span>${new Date(post.timestamp).toLocaleString()}</span>
    `;
    document.body.appendChild(postContainer);
}

// Social Media Sharing
function shareOnSocialMedia(platform) {
    const postUrl = encodeURIComponent(window.location.href);
    const urls = {
        facebook: `https://www.facebook.com/sharer.php?u=${postUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${postUrl}`
    };
    window.open(urls[platform], '_blank');
}

// Like Functionality with Dynamic ID
function setupLikeButton(buttonId, countId) {
    let likeCount = 0;
    document.getElementById(buttonId).addEventListener('click', () => {
        likeCount++;
        document.getElementById(countId).textContent = likeCount;
    });
}

// Set up like buttons
setupLikeButton('likeButton', 'likeCount');
setupLikeButton('likeButton1', 'likeCount1');

// Display Comments and Photos
function displayComment(commentData, containerId) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <strong>${commentData.username}</strong>
        <p>${commentData.comment}</p>
        <span>${new Date(commentData.timestamp).toLocaleString()}</span>
    `;
    document.getElementById(containerId).appendChild(commentDiv);
}

function displayPhoto(photoSrc, containerId) {
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('uploaded-photo');
    photoContainer.innerHTML = `<img src="${photoSrc}" alt="Uploaded Photo">`;
    document.getElementById(containerId).appendChild(photoContainer);
}

// Comment Submission Handling
function setupCommentForm(formId, containerId) {
    document.getElementById(formId).addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.querySelector(`#${formId} #username`).value;
        const comment = document.querySelector(`#${formId} #comment`).value;
        displayComment({ username, comment, timestamp: new Date().toISOString() }, containerId);
    });
}

// Photo Upload Handling
function setupPhotoUpload(formId, inputId, containerId) {
    document.getElementById(formId).addEventListener('submit', (event) => {
        event.preventDefault();
        const file = document.getElementById(inputId).files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                displayPhoto(event.target.result, containerId);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Set up comment and photo upload forms
setupCommentForm('commentForm', 'commentsContainer');
setupCommentForm('commentForm1', 'commentsContainer1');
setupPhotoUpload('photoForm', 'photoInput', 'photoContainer');
setupPhotoUpload('photoForm1', 'photoInput1', 'photoContainer1');
