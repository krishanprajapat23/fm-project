const article = document.querySelectorAll('article');

for (let i = 0; i < article.length; i++) {
    article[i].querySelector('.faq-title-wrapper').addEventListener("click", function() {
        // Check if the clicked item already has the "show" class
        const isActive = this.parentNode.classList.contains("show");

        // Remove "show" class from all items
        for (let j = 0; j < article.length; j++) {
            article[j].classList.remove("show");
        }
        
        // If the clicked item was not active, add "show" class
        if (!isActive) {
            this.parentNode.classList.add("show");
        }
    });
}
