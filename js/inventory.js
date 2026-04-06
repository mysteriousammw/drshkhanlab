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

    // Store original card order for re-sorting
    let originalChemCards = [];
    let originalConsCards = [];

    // Store original card order on load
    if (chemicalsGrid) {
        originalChemCards = Array.from(chemicalsGrid.querySelectorAll('.inventory-card'));
    }
    if (consumablesGrid) {
        originalConsCards = Array.from(consumablesGrid.querySelectorAll('.inventory-card'));
    }

    // Initialize event listeners
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
        const searchTerm = inventorySearch ? inventorySearch.value.toLowerCase().trim() : '';
        const typeValue = typeFilter ? typeFilter.value : 'all';
        const projectValue = projectFilter ? projectFilter.value.toLowerCase() : 'all';
        const sortValue = sortSelect ? sortSelect.value : 'name-asc';

        console.log('Filter triggered:', { searchTerm, typeValue, projectValue, sortValue });

        let visibleChemicals = 0;
        let visibleConsumables = 0;

        // Filter Chemicals
        if (chemicalsGrid) {
            const chemCards = chemicalsGrid.querySelectorAll('.inventory-card');
            chemCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardProject = (card.dataset.project || '').toLowerCase();
                const cardName = (card.dataset.name || '').toLowerCase();
                const cardManufacturer = (card.dataset.manufacturer || '').toLowerCase();

                let shouldHide = false;

                // Check type filter - only hide if type is specified and doesn't match
                if (typeValue === 'consumable') {
                    shouldHide = true;
                }

                // Check project filter
                if (!shouldHide && projectValue !== 'all' && cardProject !== projectValue) {
                    shouldHide = true;
                }

                // Check search term
                if (!shouldHide && searchTerm && !cardName.includes(searchTerm) && !cardManufacturer.includes(searchTerm)) {
                    shouldHide = true;
                }

                if (shouldHide) {
                    card.classList.add('hidden');
                } else {
                    card.classList.remove('hidden');
                    visibleChemicals++;
                }
            });

            // Sort chemicals
            sortGrid(chemicalsGrid, sortValue);
        }

        // Filter Consumables
        if (consumablesGrid) {
            const consCards = consumablesGrid.querySelectorAll('.inventory-card');
            consCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardProject = (card.dataset.project || '').toLowerCase();
                const cardName = (card.dataset.name || '').toLowerCase();

                let shouldHide = false;

                // Check type filter
                if (typeValue === 'chemical') {
                    shouldHide = true;
                }

                // Check project filter
                if (!shouldHide && projectValue !== 'all' && cardProject !== projectValue) {
                    shouldHide = true;
                }

                // Check search term
                if (!shouldHide && searchTerm && !cardName.includes(searchTerm)) {
                    shouldHide = true;
                }

                if (shouldHide) {
                    card.classList.add('hidden');
                } else {
                    card.classList.remove('hidden');
                    visibleConsumables++;
                }
            });

            // Sort consumables
            sortGrid(consumablesGrid, sortValue);
        }

        // Update counts
        if (chemCountEl) chemCountEl.textContent = visibleChemicals;
        if (consCountEl) consCountEl.textContent = visibleConsumables;

        console.log('Results:', { visibleChemicals, visibleConsumables });

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
            const nameA = (a.dataset.name || '').toLowerCase();
            const nameB = (b.dataset.name || '').toLowerCase();
            const projA = (a.dataset.project || '').toLowerCase();
            const projB = (b.dataset.project || '').toLowerCase();

            if (sortValue === 'name-asc') {
                return nameA.localeCompare(nameB);
            } else if (sortValue === 'name-desc') {
                return nameB.localeCompare(nameA);
            } else if (sortValue === 'project') {
                return projA.localeCompare(projB);
            }
            return 0;
        });

        // Re-append sorted visible cards
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
