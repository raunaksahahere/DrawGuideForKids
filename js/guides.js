const Guides = {
    ghostCanvas: null,
    refCanvas: null,
    isVisible: false,

    init: function(ghostCanvasId, refCanvasId) {
        this.ghostCanvas = document.getElementById(ghostCanvasId);
        this.refCanvas = document.getElementById(refCanvasId);
    },

    updateGuide: function() {
        if (!this.isVisible) return;
        
        const ctx = this.ghostCanvas.getContext('2d');
        const width = this.ghostCanvas.width;
        const height = this.ghostCanvas.height;

        // Clear existing guide
        ctx.clearRect(0, 0, width, height);

        // Copy from reference canvas
        ctx.drawImage(this.refCanvas, 0, 0);
        
        // Make it "ghostly" - we can rely on CSS opacity, 
        // or we can manipulate pixels if we want to change color.
        // For simplicity, we'll rely on CSS opacity (set in style.css).
    },

    toggle: function() {
        this.isVisible = !this.isVisible;
        
        if (this.isVisible) {
            this.updateGuide();
            return true; // Shown
        } else {
            const ctx = this.ghostCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.ghostCanvas.width, this.ghostCanvas.height);
            return false; // Hidden
        }
    }
};
