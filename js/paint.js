const Paint = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    color: 'black',
    brushSize: 10,
    tool: 'brush', // 'brush', 'eraser', 'fill'

    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        
        // Set initial styles
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.addEventListeners();
    },

    addEventListeners: function() {
        // Mouse Events
        this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch Events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling
            this.handleStart(e);
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e);
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    },

    handleStart: function(e) {
        const pos = Utils.getPointerPos(this.canvas, e);
        
        if (this.tool === 'fill') {
            this.floodFill(Math.floor(pos.x), Math.floor(pos.y), this.color);
        } else {
            this.isDrawing = true;
            this.lastX = pos.x;
            this.lastY = pos.y;
            this.draw(e);
        }
    },

    draw: function(e) {
        if (!this.isDrawing || this.tool === 'fill') return;

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
        if (this.tool === 'eraser') {
            this.tool = 'brush'; // Switch back to brush if we pick a color
        }
    },

    setTool: function(toolName) {
        this.tool = toolName;
    },

    clear: function() {
        Utils.clearCanvas(this.canvas);
    },

    // --- Flood Fill Algorithm ---
    floodFill: function(startX, startY, fillColor) {
        // 1. Get image data
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;

        // 2. Parse fill color (hex to r,g,b)
        const rgb = this.hexToRgb(fillColor);
        if (!rgb) return; // Invalid color

        // 3. Get target color at start position
        const startPos = (startY * width + startX) * 4;
        const startR = data[startPos];
        const startG = data[startPos + 1];
        const startB = data[startPos + 2];
        const startA = data[startPos + 3];

        // 4. Don't fill if color is same
        if (startR === rgb.r && startG === rgb.g && startB === rgb.b && startA === 255) {
            return;
        }

        // 5. Stack-based iterative flood fill
        const stack = [[startX, startY]];
        
        // Helper to check match
        const matchesStartColor = (pos) => {
            return data[pos] === startR && 
                   data[pos + 1] === startG && 
                   data[pos + 2] === startB && 
                   data[pos + 3] === startA;
        };

        // Helper to set color
        const colorPixel = (pos) => {
            data[pos] = rgb.r;
            data[pos + 1] = rgb.g;
            data[pos + 2] = rgb.b;
            data[pos + 3] = 255; // Force opaque
        };

        while (stack.length) {
            const [x, y] = stack.pop();
            const pos = (y * width + x) * 4;

            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            
            if (matchesStartColor(pos)) {
                colorPixel(pos);

                stack.push([x + 1, y]);
                stack.push([x - 1, y]);
                stack.push([x, y + 1]);
                stack.push([x, y - 1]);
            }
        }

        // 6. Put image data back
        this.ctx.putImageData(imageData, 0, 0);
    },

    hexToRgb: function(hex) {
        // Handle standard named colors (basic support) or hex
        // Since we control the palette, we know it's mostly hex.
        // But 'black' is a name.
        if (hex === 'black') return { r: 0, g: 0, b: 0 };
        if (hex === 'white') return { r: 255, g: 255, b: 255 };
        if (hex === 'red') return { r: 255, g: 0, b: 0 };
        if (hex === 'blue') return { r: 0, g: 0, b: 255 };
        // ... extend if needed, but we use data-color in hex mostly in HTML
        
        // Regex for hex
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};
