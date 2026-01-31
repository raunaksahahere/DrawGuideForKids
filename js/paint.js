const Paint = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    color: 'black',
    brushSize: 10,
    tool: 'brush', // 'brush' or 'eraser'

    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set initial styles
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.addEventListeners();
    },

    addEventListeners: function() {
        // Mouse Events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch Events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling
            this.startDrawing(e);
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e);
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    },

    startDrawing: function(e) {
        this.isDrawing = true;
        const pos = Utils.getPointerPos(this.canvas, e);
        this.lastX = pos.x;
        this.lastY = pos.y;
        
        // Draw a dot immediately for clicks
        this.draw(e);
    },

    draw: function(e) {
        if (!this.isDrawing) return;

        const pos = Utils.getPointerPos(this.canvas, e);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(pos.x, pos.y);
        
        if (this.tool === 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.lineWidth = this.brushSize * 2; // Eraser is bigger
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.brushSize;
        }

        this.ctx.stroke();
        
        this.lastX = pos.x;
        this.lastY = pos.y;
    },

    stopDrawing: function() {
        this.isDrawing = false;
        this.ctx.beginPath(); // Reset path
    },

    setColor: function(newColor) {
        this.color = newColor;
        this.tool = 'brush'; // Switching color automatically switches to brush
    },

    setTool: function(toolName) {
        this.tool = toolName;
    },

    clear: function() {
        Utils.clearCanvas(this.canvas);
    }
};
