document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modules
    Generator.init('reference-canvas');
    Paint.init('drawing-canvas');
    Guides.init('ghost-canvas', 'reference-canvas');

    // UI Elements
    const wordInput = document.getElementById('word-input');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const brushBtn = document.getElementById('brush-btn');
    const eraserBtn = document.getElementById('eraser-btn');
    const guideBtn = document.getElementById('guide-btn');
    const colorBtns = document.querySelectorAll('.color-btn');

    // Default startup
    Generator.generate('cat'); // Start with a cat so it's not empty
    
    // Generate Button
    generateBtn.addEventListener('click', () => {
        const word = wordInput.value;
        if (word.trim()) {
            Generator.generate(word);
            // If guide is on, update it immediately
            if (Guides.isVisible) {
                Guides.updateGuide();
            }
        }
    });

    // Enter key in input
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Clear Button
    clearBtn.addEventListener('click', () => {
        Paint.clear();
    });

    // Tool Buttons
    brushBtn.addEventListener('click', () => {
        Paint.setTool('brush');
        updateActiveTool(brushBtn);
    });

    eraserBtn.addEventListener('click', () => {
        Paint.setTool('eraser');
        updateActiveTool(eraserBtn);
    });

    function updateActiveTool(activeBtn) {
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // Color Buttons
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            Paint.setColor(color);
            
            // Visual feedback
            colorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // If we pick a color, we probably want the brush
            updateActiveTool(brushBtn);
        });
    });

    // Guide Button
    guideBtn.addEventListener('click', () => {
        const isShown = Guides.toggle();
        if (isShown) {
            guideBtn.style.backgroundColor = '#ffeaa7'; // Highlight
            guideBtn.textContent = '👻 Hide Guide';
        } else {
            guideBtn.style.backgroundColor = '';
            guideBtn.textContent = '👻 Guide';
        }
    });
});
