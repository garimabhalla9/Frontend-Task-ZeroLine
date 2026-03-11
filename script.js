// ========================================
//   ARROW BUTTON FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    //   ELEMENT SELECTION
    // ========================================
    
    const upBtn = document.querySelector('.btn.up');
    const downBtn = document.querySelector('.btn.down');
    const leftBtn = document.querySelector('.btn.left');
    const rightBtn = document.querySelector('.btn.right');
    const gridItems = document.querySelectorAll('.grid-item');
    
    let currentIndex = 0; // Start with first item (MAIN)
    
    // ========================================
    //   SELECTION MANAGEMENT
    // ========================================
    
    function updateSelection(newIndex) {
        if (newIndex < 0 || newIndex >= gridItems.length) {
            return;
        }
        
        clearSelection();
        
        // Apply new selection
        currentIndex = newIndex;
        const selectedItem = gridItems[currentIndex];
        selectedItem.classList.add('selected');
        selectedItem.style.borderColor = '#333';
        selectedItem.style.transform = 'translateY(-5px)';
        
        console.log(`Selected: ${getCurrentSectionName()}`);
    }
    
    function clearSelection() {
        gridItems.forEach(item => {
            item.classList.remove('selected');
            item.style.borderColor = '#bbb';
            item.style.transform = 'translateY(0)';
        });
    }
    
    function getCurrentSectionName() {
        return gridItems[currentIndex]?.querySelector('.section-label')?.textContent || 'Unknown';
    }
    
    // ========================================
    //   MOUSE SELECTION (Desktop Only)
    // ========================================
    
    function setupMouseSelection() {
        // Check if desktop (min-width: 769px)
        const isDesktop = window.innerWidth >= 769;
        
        if (isDesktop) {
            gridItems.forEach((item, index) => {
                // Add click event to each grid item
                item.addEventListener('click', function() {
                    updateSelection(index);
                    addClickFeedback(this);
                });
                
                item.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.transform = 'translateY(-3px)';
                        this.style.borderColor = '#666';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('selected')) {
                        this.style.transform = 'translateY(0)';
                        this.style.borderColor = '#bbb';
                    }
                });
            });
            
            console.log('🖱️ Mouse selection enabled for desktop');
        }
    }
    
    function addClickFeedback(item) {
        item.style.animation = 'clickPulse 0.4s ease';
        
        setTimeout(() => {
            item.style.animation = '';
        }, 400);
    }
    
    window.addEventListener('resize', function() {
        const newIsDesktop = window.innerWidth >= 769;
        if (newIsDesktop !== window.isDesktop) {
            window.isDesktop = newIsDesktop;
            console.log(`📱 Switched to ${newIsDesktop ? 'desktop' : 'mobile'} mode`);
        }
    });
    
    // Set initial desktop state
    window.isDesktop = window.innerWidth >= 769;
    
    // ========================================
    //   NAVIGATION LOGIC
    // ========================================
    
    function navigateUp() {
        if (currentIndex >= 3) {
            updateSelection(currentIndex - 3);
        }
    }
    
    function navigateDown() {
        if (currentIndex < gridItems.length - 3) {
            updateSelection(currentIndex + 3);
        }
    }
    
    function navigateLeft() {
        if (currentIndex % 3 !== 0) {
            updateSelection(currentIndex - 1);
        }
    }
    
    function navigateRight() {
        if (currentIndex % 3 !== 2 && currentIndex < gridItems.length - 1) {
            updateSelection(currentIndex + 1);
        }
    }
    
    // ========================================
    //   BUTTON EVENT HANDLERS
    // ========================================
    
    function setupButtonListeners() {
        upBtn?.addEventListener('click', navigateUp);
        downBtn?.addEventListener('click', navigateDown);
        leftBtn?.addEventListener('click', navigateLeft);
        rightBtn?.addEventListener('click', navigateRight);
        
        // Add visual feedback to all buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(addButtonFeedback);
    }
    
    function addButtonFeedback(button) {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
            button.style.boxShadow = '0 0 0 2px #fff inset';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
            resetButtonShadow(button);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    }
    
    function resetButtonShadow(button) {
        if (button.classList.contains('outline-btn')) {
            button.style.boxShadow = 'none';
        } else {
            button.style.boxShadow = '0 0 0 2px #fff inset';
        }
    }
    
    // ========================================
    //   KEYBOARD SUPPORT
    // ========================================
    
    function setupKeyboardSupport() {
        document.addEventListener('keydown', handleKeyPress);
    }
    
    function handleKeyPress(e) {
        const keyActions = {
            'ArrowUp': navigateUp,
            'ArrowDown': navigateDown,
            'ArrowLeft': navigateLeft,
            'ArrowRight': navigateRight,
            'Enter': selectCurrentSection
        };
        
        if (keyActions[e.key]) {
            e.preventDefault();
            keyActions[e.key]();
        }
    }
    
    function selectCurrentSection() {
        if (gridItems[currentIndex]) {
            const sectionName = getCurrentSectionName();
            console.log(`Entering section: ${sectionName}`);
            
            const selectedItem = gridItems[currentIndex];
            selectedItem.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                selectedItem.style.animation = '';
            }, 500);
        }
    }
    
    // ========================================
    //   STYLING AND ANIMATIONS
    // ========================================
    
    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: translateY(-5px) scale(1); }
                50% { transform: translateY(-5px) scale(1.05); }
                100% { transform: translateY(-5px) scale(1); }
            }
            
            @keyframes clickPulse {
                0% { transform: translateY(-5px) scale(1); }
                50% { transform: translateY(-5px) scale(1.1); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
                100% { transform: translateY(-5px) scale(1); }
            }
            
            .grid-item.selected {
                border-color: #333 !important;
                transform: translateY(-5px) !important;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
            }
            
            .btn:active {
                transform: scale(0.95) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    //   INITIALIZATION
    // ========================================
    
    function initialize() {
        setupButtonListeners();
        setupKeyboardSupport();
        setupMouseSelection(); // Add mouse selection for desktop
        addCustomStyles();
        updateSelection(0); // Select first item
        
        console.log('🎮 Arrow button functionality initialized');
        console.log('�️ Mouse selection enabled for desktop');
        console.log('⌨️ Keyboard support enabled');
        console.log('�📍 Use arrow keys, click buttons, or click grid items to navigate');
        console.log('⏎ Press Enter to select a section');
    }
    
    // Start the application
    initialize();
});
