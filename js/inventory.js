// ========================================
// Inventory Page - Filter & Search Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const inventorySearch = document.getElementById('inventorySearch');
    const typeFilter = document.getElementById('typeFilter');
    const projectFilter = document.getElementById('projectFilter');
    const sortSelect = document.getElementById('sortSelect');
    const chemicalsGrid = document.getElementById('chemicalsGrid');
    const consumablesGrid = document.getElementById('consumablesGrid');
    const chemCountEl = document.getElementById('chemCount');
    const consCountEl = document.getElementById('consCount');

    // Initialize
    if (inventorySearch) {
        inventorySearch.addEventListener('input', filterInventory);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterInventory);
    }
    if (projectFilter) {
        projectFilter.addEventListener('change', filterInventory);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterInventory);
    }

    function filterInventory() {
        const searchTerm = inventorySearch ? inventorySearch.value.toLowerCase() : '';
        const typeValue = typeFilter ? typeFilter.value : 'all';
        const projectValue = projectFilter ? projectFilter.value.toLowerCase() : 'all';
        const sortValue = sortSelect ? sortSelect.value : 'name-asc';

        let visibleChemicals = 0;
        let visibleConsumables = 0;

        // Filter Chemicals
        if (chemicalsGrid) {
            const chemCards = chemicalsGrid.querySelectorAll('.inventory-card');
            chemCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardProject = card.dataset.project;
                const cardName = card.dataset.name;
                const cardManufacturer = card.dataset.manufacturer;

                // Check type filter
                if (typeValue !== 'all' && typeValue !== 'chemical') {
                    card.classList.add('hidden');
                    return;
                }

                // Check project filter
                if (projectValue !== 'all' && cardProject !== projectValue) {
                    card.classList.add('hidden');
                    return;
                }

                // Check search term
                if (searchTerm && !cardName.includes(searchTerm) && !cardManufacturer.includes(searchTerm)) {
                    card.classList.add('hidden');
                    return;
                }

                card.classList.remove('hidden');
                visibleChemicals++;
            });

            // Sort chemicals
            sortGrid(chemicalsGrid, sortValue);
        }

        // Filter Consumables
        if (consumablesGrid) {
            const consCards = consumablesGrid.querySelectorAll('.inventory-card');
            consCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardProject = card.dataset.project;
                const cardName = card.dataset.name;

                // Check type filter
                if (typeValue !== 'all' && typeValue !== 'consumable') {
                    card.classList.add('hidden');
                    return;
                }

                // Check project filter
                if (projectValue !== 'all' && cardProject !== projectValue) {
                    card.classList.add('hidden');
                    return;
                }

                // Check search term
                if (searchTerm && !cardName.includes(searchTerm)) {
                    card.classList.add('hidden');
                    return;
                }

                card.classList.remove('hidden');
                visibleConsumables++;
            });

            // Sort consumables
            sortGrid(consumablesGrid, sortValue);
        }

        // Update counts
        if (chemCountEl) chemCountEl.textContent = visibleChemicals;
        if (consCountEl) consCountEl.textContent = visibleConsumables;

        // Show no results message if needed
        if (visibleChemicals === 0 && visibleConsumables === 0) {
            showNoResults();
        } else {
            hideNoResults();
        }
    }

    function sortGrid(grid, sortValue) {
        const cards = Array.from(grid.querySelectorAll('.inventory-card:not(.hidden)'));
        const hiddenCards = Array.from(grid.querySelectorAll('.inventory-card.hidden'));

        cards.sort((a, b) => {
            if (sortValue === 'name-asc') {
                return a.dataset.name.localeCompare(b.dataset.name);
            } else if (sortValue === 'name-desc') {
                return b.dataset.name.localeCompare(a.dataset.name);
            } else if (sortValue === 'project') {
                return a.dataset.project.localeCompare(b.dataset.project);
            }
            return 0;
        });

        // Re-append sorted cards
        cards.forEach(card => grid.appendChild(card));
        // Re-append hidden cards at end
        hiddenCards.forEach(card => grid.appendChild(card));
    }

    function showNoResults() {
        hideNoResults();
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No items found</p>
            <small>Try adjusting your search or filters</small>
        `;
        if (chemicalsGrid && chemicalsGrid.querySelectorAll('.inventory-card:not(.hidden)').length === 0) {
            chemicalsGrid.appendChild(noResults.cloneNode(true));
        }
        if (consumablesGrid && consumablesGrid.querySelectorAll('.inventory-card:not(.hidden)').length === 0) {
            consumablesGrid.appendChild(noResults.cloneNode(true));
        }
    }

    function hideNoResults() {
        document.querySelectorAll('.no-results').forEach(el => el.remove());
    }

    // Keyboard shortcut for inventory search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !searchModalActive() && document.querySelector('.inventory-search input')) {
            e.preventDefault();
            document.querySelector('.inventory-search input').focus();
        }
    });

    function searchModalActive() {
        const modal = document.getElementById('searchModal');
        return modal && modal.classList.contains('active');
    }
});
