/**
 * Reusable Navbar Component
 * Automatically injects the navigation bar and highlights the active page.
 * Works from both root-level pages and subdirectory pages (e.g., projects/).
 */
(function () {
    // Detect if we're in a subdirectory (e.g., projects/)
    var path = window.location.pathname;
    var isSubdir = path.includes('/projects/');
    var prefix = isSubdir ? '../' : '';

    // Determine active page from the current filename
    var filename = path.split('/').pop() || 'index.html';
    var activePage = 'index';
    if (filename.includes('projects') || isSubdir) activePage = 'projects';
    if (filename.includes('resume')) activePage = 'resume';
    if (filename.includes('contact')) activePage = 'contact';

    // Build nav links with active state
    var links = [

        { href: prefix + 'projects.html', label: 'PROJECTS', key: 'projects' },
        { href: prefix + 'resume.html', label: 'RESUME', key: 'resume' },
        { href: prefix + 'contact.html', label: 'CONTACT ME', key: 'contact' }
    ];

    var linksHtml = links.map(function (link) {
        var activeClass = link.key === activePage ? ' class="is-active"' : '';
        return '<a href="' + link.href + '"' + activeClass + '>' + link.label + '</a>';
    }).join('\n                ');

    var navHtml = '<nav>\n' +
        '        <div class="wrap">\n' +
        '            <a class="logo" href="' + prefix + 'index.html">SAIFUL<span>.</span>ADI PUTRA</a>\n' +
        '            <div class="nav-links">\n' +
        '                ' + linksHtml + '\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </nav>';

    // Insert navbar at the beginning of <body>
    document.body.insertAdjacentHTML('afterbegin', navHtml);
})();

/**
 * Universal Image Lightbox Feature
 * Enables full-screen image pop-up modal for Certificates, Other Experiences & Project images.
 */
(function setupLightbox() {
    function init() {
        var modalHtml = '<div id="imgLightboxModal" class="img-lightbox-modal" role="dialog" aria-modal="true">' +
            '<button id="imgLightboxClose" class="img-lightbox-close" aria-label="Close">✕</button>' +
            '<div class="img-lightbox-content">' +
                '<img id="imgLightboxSrc" src="" alt="Full view">' +
                '<div id="imgLightboxCaption" class="img-lightbox-caption"></div>' +
            '</div>' +
        '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        var modal = document.getElementById('imgLightboxModal');
        var modalImg = document.getElementById('imgLightboxSrc');
        var modalCaption = document.getElementById('imgLightboxCaption');
        var closeBtn = document.getElementById('imgLightboxClose');

        function openModal(src, captionText) {
            if (!src) return;
            modalImg.src = src;
            if (captionText && captionText.trim().length > 0) {
                modalCaption.textContent = captionText;
                modalCaption.style.display = 'inline-block';
            } else {
                modalCaption.style.display = 'none';
            }
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
            setTimeout(function () {
                modalImg.src = '';
            }, 250);
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target.classList.contains('img-lightbox-content')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });

        // Delegate click event for cert images, experience images, and project previews
        document.body.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName === 'IMG' && (
                target.classList.contains('cert-card-img') ||
                target.classList.contains('dicoding-card-img') ||
                target.classList.contains('other-exp-img') ||
                target.closest('.hero-image') ||
                target.closest('.gallery-grid') ||
                target.classList.contains('lightbox-trigger')
            )) {
                var caption = target.getAttribute('alt') || target.title || '';
                openModal(target.src, caption);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
