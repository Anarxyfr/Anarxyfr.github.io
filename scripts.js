document.querySelectorAll('.server').forEach(server => {
    server.addEventListener('click', () => {
        const genre = server.querySelector('.server-icon span').innerText;
        let content = `<h2>${genre} Games</h2><p>List of ${genre} games will be displayed here.</p>`;

        if (genre === 'Horror') {
            const proxiedUrl = `https://proxy.hide.me/go.php?u=https%3A%2F%2Fwellsousaaa.github.io%2FFive-Nights-at-Freddys-Web%2F&b=1`;
            content = `<h2>${genre} Games</h2>
                        <ul>
                            <li><a href="${proxiedUrl}" target="_blank">Five Nights at Freddy's</a></li>
                            <!-- Add more horror games links here -->
                        </ul>`;
        }

        document.querySelector('.genre-content').innerHTML = content;
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.welcome-content').style.display = 'none';
        document.querySelector('.genre-content').style.display = 'block';
    });
});
