const newsbox = document.getElementById('news');
const categorySelect = document.getElementById('category');
const apiurl = 'https://news-api-project-c4n1.onrender.com';

async function news(category = 'general') {
    try {
        const res = await fetch(`${apiurl}/news?category=${category}`);

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        newsbox.innerHTML = '';
        if (!data.articles || data.articles.length === 0) {
            newsbox.innerHTML = '<p>No news found.</p>';
            return;
        }
        
        data.articles.forEach(item => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'news-card';

            articleDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description || ''}</p>
                <a href="${item.url}" target="_blank">Read more</a>
            `;

            newsbox.appendChild(articleDiv);
        });
    } catch (error) {
        console.error(error);
        newsbox.innerHTML = 'Failed to load news.';
    }
}
categorySelect.addEventListener("change", e => {
  news(e.target.value);
});

// Load default on page load

news();

