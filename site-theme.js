const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const KEY = 'fs-theme';
const saved = localStorage.getItem(KEY);
const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

if (root && toggle)
{
    root.setAttribute('data-theme', saved || system);
    toggle.addEventListener('click', () =>
    {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem(KEY, next);
    });
}

const revealObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const currentPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
const activePage = currentPage === 'media-kit.html' ? 'media.html' : currentPage;
document.querySelectorAll('.nav-links a').forEach((link) =>
{
    const href = link.getAttribute('href') || '';
    const resolvedPath = new URL(href, window.location.href).pathname;
    const linkPage = resolvedPath.split('/').filter(Boolean).pop() || 'index.html';
    const matches = linkPage === activePage || (href === '#hero' && activePage === 'index.html');
    if (matches)
    {
        link.classList.add('active');
    }
});

const dot = document.getElementById('cursor-dot');
if (dot)
{
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () =>
    {
        cx = lerp(cx, mx, 0.18);
        cy = lerp(cy, my, 0.18);
        dot.style.left = `${cx}px`;
        dot.style.top = `${cy}px`;
        requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', (event) =>
    {
        mx = event.clientX;
        my = event.clientY;
        dot.style.opacity = '0.55';
    });
    document.addEventListener('mouseleave', () =>
    {
        dot.style.opacity = '0';
    });
    document.querySelectorAll('a, button, .card, .hero-card, .page-hero-banner').forEach((el) =>
    {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-on-link'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on-link'));
    });
    animate();
}

document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));
