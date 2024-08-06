document.querySelectorAll('.server').forEach(server => {
    server.addEventListener('click', () => {
        const genre = server.querySelector('.server-icon span').innerText;
        let content = `<h2>${genre} Games</h2><p>List of ${genre} games will be displayed here.</p>`;

        if (genre === 'Horror') {
            const proxiedUrl = `http://13.115.229.80:3128/https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/`;
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
