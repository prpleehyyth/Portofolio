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
