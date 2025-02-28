document.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelectorAll(".blog-post");
    posts.forEach((post, index) => {
        post.style.opacity = "0";
        post.style.transform = "translateY(30px)";
        setTimeout(() => {
            post.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
        }, 200 * index);
    });
});

