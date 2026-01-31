const Generator = {
    canvas: null,
    ctx: null,
    isColorMode: false,
    currentWord: '',

    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        // Set styles for generated drawings
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.fillStyle = 'white';
    },

    toggleColorMode: function() {
        this.isColorMode = !this.isColorMode;
        if (this.currentWord) {
            this.generate(this.currentWord);
        }
        return this.isColorMode;
    },

    generate: function(word) {
        this.currentWord = word;
        // Clear first
        Utils.clearCanvas(this.canvas);
        
        // Reset styles just in case
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.fillStyle = 'white'; // Default fill
        
        const w = this.canvas.width;
        const h = this.canvas.height;

        const normalizedWord = word.toLowerCase().trim();

        switch (normalizedWord) {
            case 'sun':
                this.drawSun(w, h);
                break;
            case 'tree':
                this.drawTree(w, h);
                break;
            case 'house':
                this.drawHouse(w, h);
                break;
            case 'cat':
                this.drawCat(w, h);
                break;
            default:
                this.drawUnknown(w, h);
        }
    },

    drawSun: function(w, h) {
        const cx = w / 2;
        const cy = h / 2;
        const r = 60;
        const ctx = this.ctx;

        // Core
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ffff4d'; // Yellow
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Rays
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const startR = r + 10;
            const endR = r + 40;
            
            const x1 = cx + Math.cos(angle) * startR;
            const y1 = cy + Math.sin(angle) * startR;
            const x2 = cx + Math.cos(angle) * endR;
            const y2 = cy + Math.sin(angle) * endR;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        if (this.isColorMode) {
            ctx.strokeStyle = '#ffa502'; // Orange-ish
        }
        ctx.stroke();
        ctx.strokeStyle = 'black'; // Reset
    },

    drawTree: function(w, h) {
        const ctx = this.ctx;
        
        // Trunk
        ctx.beginPath();
        ctx.rect(w/2 - 20, h - 100, 40, 100);
        if (this.isColorMode) {
            ctx.fillStyle = '#8b4513'; // Brown
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Foliage (3 triangles)
        for (let i = 0; i < 3; i++) {
            const y = h - 100 - (i * 50);
            const size = 60 - (i * 10);
            
            ctx.beginPath();
            ctx.moveTo(w/2 - size - 40, y + 40); // Bottom left
            ctx.lineTo(w/2 + size + 40, y + 40); // Bottom right
            ctx.lineTo(w/2, y - 60);             // Top
            ctx.closePath();
            
            if (this.isColorMode) {
                ctx.fillStyle = '#4dff88'; // Green
                ctx.fill();
            } else {
                ctx.fillStyle = 'white';
                ctx.fill();
            }
            ctx.stroke();
        }
    },

    drawHouse: function(w, h) {
        const ctx = this.ctx;
        const floorY = h - 50;
        const houseW = 150;
        const houseH = 120;
        const centerX = w / 2;

        // Body
        ctx.beginPath();
        ctx.rect(centerX - houseW/2, floorY - houseH, houseW, houseH);
        if (this.isColorMode) {
            ctx.fillStyle = '#fce4ec'; // Light Pink
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Roof
        ctx.beginPath();
        ctx.moveTo(centerX - houseW/2 - 20, floorY - houseH);
        ctx.lineTo(centerX + houseW/2 + 20, floorY - houseH);
        ctx.lineTo(centerX, floorY - houseH - 80);
        ctx.closePath();
        if (this.isColorMode) {
            ctx.fillStyle = '#ff4d4d'; // Red
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Door
        ctx.beginPath();
        ctx.rect(centerX - 25, floorY - 60, 50, 60);
        if (this.isColorMode) {
            ctx.fillStyle = '#8b4513'; // Brown
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        // Doorknob
        ctx.beginPath();
        ctx.arc(centerX + 15, floorY - 30, 3, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ffd700'; // Gold
            ctx.fill();
        } else {
             ctx.fillStyle = 'white'; // Fill to cover door line if needed, or just stroke
             ctx.fill();
        }
        ctx.stroke();

        // Window
        ctx.beginPath();
        ctx.rect(centerX - 50, floorY - 90, 30, 30);
        if (this.isColorMode) {
            ctx.fillStyle = '#4d94ff'; // Blue
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        // Window Bars
        ctx.beginPath();
        ctx.moveTo(centerX - 35, floorY - 90);
        ctx.lineTo(centerX - 35, floorY - 60);
        ctx.moveTo(centerX - 50, floorY - 75);
        ctx.lineTo(centerX - 20, floorY - 75);
        ctx.stroke();
    },

    drawCat: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        // Body (Simple Curve) - Draw first so head is on top
        ctx.beginPath();
        ctx.arc(cx, cy + 80, 60, Math.PI, 0); // Semi circle body
        ctx.lineTo(cx - 60, cy + 80);
        if (this.isColorMode) {
            ctx.fillStyle = '#333'; // Dark Gray/Black Cat
            ctx.fill();
            ctx.strokeStyle = '#333'; // Hide outline if filled
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
        }
        ctx.stroke();
        
        // Reset stroke for features if in color mode
        ctx.strokeStyle = this.isColorMode ? '#333' : 'black';

        // Head
        ctx.beginPath();
        ctx.arc(cx, cy - 20, 50, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#333';
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Ears
        // Left Ear
        ctx.beginPath();
        ctx.moveTo(cx - 40, cy - 50);
        ctx.lineTo(cx - 50, cy - 90);
        ctx.lineTo(cx - 10, cy - 65);
        if (this.isColorMode) {
            ctx.fillStyle = '#333';
            ctx.fill();
        } else {
             ctx.fillStyle = 'white';
             ctx.fill();
        }
        ctx.stroke();
        
        // Right Ear
        ctx.beginPath();
        ctx.moveTo(cx + 40, cy - 50);
        ctx.lineTo(cx + 50, cy - 90);
        ctx.lineTo(cx + 10, cy - 65);
        if (this.isColorMode) {
            ctx.fillStyle = '#333';
            ctx.fill();
        } else {
             ctx.fillStyle = 'white';
             ctx.fill();
        }
        ctx.stroke();

        // Features - Need contrast color if cat is black
        ctx.strokeStyle = this.isColorMode ? 'white' : 'black';
        ctx.lineWidth = 3;

        // Eyes
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 30, 5, 0, Math.PI * 2); // Left
        ctx.stroke();
        if (this.isColorMode) {
             ctx.fillStyle = '#4dff88'; // Green Eyes
             ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(cx + 15, cy - 30, 5, 0, Math.PI * 2); // Right
        ctx.stroke();
        if (this.isColorMode) {
             ctx.fillStyle = '#4dff88';
             ctx.fill();
        }

        // Nose
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy - 10);
        ctx.lineTo(cx + 5, cy - 10);
        ctx.lineTo(cx, cy - 5);
        ctx.closePath();
        ctx.stroke();
        if (this.isColorMode) {
            ctx.fillStyle = 'pink';
            ctx.fill();
        }

        // Mouth
        ctx.beginPath();
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(cx, cy + 5);
        ctx.moveTo(cx, cy + 5);
        ctx.lineTo(cx - 10, cy + 10);
        ctx.moveTo(cx, cy + 5);
        ctx.lineTo(cx + 10, cy + 10);
        ctx.stroke();

        // Whiskers
        ctx.beginPath();
        // Left
        ctx.moveTo(cx - 30, cy - 10);
        ctx.lineTo(cx - 60, cy - 15);
        ctx.moveTo(cx - 30, cy);
        ctx.lineTo(cx - 60, cy + 5);
        // Right
        ctx.moveTo(cx + 30, cy - 10);
        ctx.lineTo(cx + 60, cy - 15);
        ctx.moveTo(cx + 30, cy);
        ctx.lineTo(cx + 60, cy + 5);
        ctx.stroke();

        // Restore Defaults
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
    },

    drawUnknown: function(w, h) {
        const ctx = this.ctx;
        ctx.font = '20px Comic Sans MS';
        ctx.fillStyle = 'gray';
        ctx.textAlign = 'center';
        ctx.fillText("I don't know that word yet!", w/2, h/2);
        ctx.fillText("Try: cat, sun, tree, house", w/2, h/2 + 30);
    }
};
