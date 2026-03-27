// ========================================
// Animal Biotechnology Lab - Main JavaScript
// ========================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Search Functionality
const searchableContent = [
    // Research
    { title: 'Livestock Genetic Improvement', category: 'Research', url: 'pages/research-ongoing.html', desc: 'Gene identification and utilization for genetic improvement' },
    { title: 'Embryo Biotechnology', category: 'Research', url: 'pages/research-ongoing.html', desc: 'Embryo production, preservation, and transfer protocols' },
    { title: 'Disease Resistance', category: 'Research', url: 'pages/research-ongoing.html', desc: 'Molecular mechanisms of disease resistance' },
    { title: 'Conservation Genetics', category: 'Research', url: 'pages/research-ongoing.html', desc: 'Genetic characterization of indigenous breeds' },
    // Publications
    { title: 'Heat Shock Protein Genes', category: 'Publications', url: 'pages/publications.html', desc: 'Molecular characterization in indigenous cattle' },
    { title: 'In Vitro Embryo Production', category: 'Publications', url: 'pages/publications.html', desc: 'Optimized protocol for Nili-Ravi buffalo' },
    { title: 'Genetic Diversity of Pakistani Goats', category: 'Publications', url: 'pages/publications.html', desc: 'Microsatellite marker analysis' },
    // People
    { title: 'Dr. Sher Hayat Khan', category: 'People', url: 'pages/key-personnel.html', desc: 'Principal Investigator & Associate Professor' },
    { title: 'PhD Students', category: 'People', url: 'pages/members.html', desc: 'Current doctoral researchers' },
    { title: 'MS Students', category: 'People', url: 'pages/members.html', desc: 'Current masters students' },
    // Resources
    { title: 'Chemicals Inventory', category: 'Resources', url: 'pages/inventory.html', desc: 'Lab chemicals and reagents' },
    { title: 'Equipment', category: 'Resources', url: 'pages/inventory.html', desc: 'Lab equipment and instruments' },
    { title: 'Protocols', category: 'Resources', url: 'pages/protocols.html', desc: 'Standard lab protocols and methods' },
];

function performSearch(query) {
    if (!query.trim()) {
        searchResults.innerHTML = '';
        return;
    }

    const results = searchableContent.filter(item => {
        const searchStr = (item.title + ' ' + item.desc + ' ' + item.category).toLowerCase();
        return searchStr.includes(query.toLowerCase());
    });

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">No results found</p>';
        return;
    }

    searchResults.innerHTML = results.map(item => `
        <a href="${item.url}" class="search-result-item" onclick="closeSearch()">
            <span style="display:inline-block;padding:2px 8px;background:rgba(0,180,216,0.1);border-radius:4px;font-size:0.7rem;color:var(--accent);margin-bottom:8px;">${item.category}</span>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </a>
    `).join('');
}

function openSearch() {
    searchModal.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
}

function closeSearch() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
}

if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));
}

searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeSearch();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
    }
    if (e.key === '/' && !searchModal.classList.contains('active')) {
        e.preventDefault();
        openSearch();
    }
});

// Animate Statistics on Scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.about-stats').forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
