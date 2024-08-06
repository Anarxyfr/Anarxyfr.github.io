document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.server').forEach(server => {
        server.addEventListener('click', () => {
            const genre = server.querySelector('.server-icon span').innerText;
            let content = `<h2>${genre} Games</h2><p>List of ${genre} games will be displayed here.</p>`;

            if (genre === 'Horror') {
                content = `<h2>${genre} Games</h2>
                            <ul>
                                <li><a href="https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/" target="_blank" onclick="maskLink(this)">Five Nights at Freddy's</a></li>
                                <!-- Add more horror games links here -->
                            </ul>`;
            }

            document.querySelector('.genre-content').innerHTML = content;
            document.querySelector('.header').style.display = 'none';
            document.querySelector('.welcome-content').style.display = 'none';
            document.querySelector('.genre-content').style.display = 'block';
        });
    });

    function maskLink(element) {
        setTimeout(() => {
            element.href = 'about:blank';
        }, 1000);
    }
});
