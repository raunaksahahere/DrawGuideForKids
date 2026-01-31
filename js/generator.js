const Generator = {
    canvas: null,
    ctx: null,

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

    generate: function(word) {
        // Clear first
        Utils.clearCanvas(this.canvas);
        
        // Reset styles just in case
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'white';
        
        const w = this.canvas.width;
        const h = this.canvas.height;
        const ctx = this.ctx;

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
        ctx.stroke();

        // Rays
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const startR = r + 10;
            const endR = r + 40;
            
            const x1 = cx + Math.cos(angle) * startR;
            const y1 = cy + Math.sin(angle) * startR;
            const x2 = cx + Math.cos(angle) * endR;
            const y2 = cy + Math.sin(angle) * endR;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    },

    drawTree: function(w, h) {
        const ctx = this.ctx;
        
        // Trunk
        ctx.beginPath();
        ctx.rect(w/2 - 20, h - 100, 40, 100);
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
        ctx.stroke();

        // Roof
        ctx.beginPath();
        ctx.moveTo(centerX - houseW/2 - 20, floorY - houseH);
        ctx.lineTo(centerX + houseW/2 + 20, floorY - houseH);
        ctx.lineTo(centerX, floorY - houseH - 80);
        ctx.closePath();
        ctx.stroke();

        // Door
        ctx.beginPath();
        ctx.rect(centerX - 25, floorY - 60, 50, 60);
        ctx.stroke();
        
        // Doorknob
        ctx.beginPath();
        ctx.arc(centerX + 15, floorY - 30, 3, 0, Math.PI * 2);
        ctx.stroke();

        // Window
        ctx.beginPath();
        ctx.rect(centerX - 50, floorY - 90, 30, 30);
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

        // Head
        ctx.beginPath();
        ctx.arc(cx, cy - 20, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Ears
        // Left Ear
        ctx.beginPath();
        ctx.moveTo(cx - 40, cy - 50);
        ctx.lineTo(cx - 50, cy - 90);
        ctx.lineTo(cx - 10, cy - 65);
        ctx.stroke();
        
        // Right Ear
        ctx.beginPath();
        ctx.moveTo(cx + 40, cy - 50);
        ctx.lineTo(cx + 50, cy - 90);
        ctx.lineTo(cx + 10, cy - 65);
        ctx.stroke();

        // Eyes
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 30, 5, 0, Math.PI * 2); // Left
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(cx + 15, cy - 30, 5, 0, Math.PI * 2); // Right
        ctx.stroke();

        // Nose
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy - 10);
        ctx.lineTo(cx + 5, cy - 10);
        ctx.lineTo(cx, cy - 5);
        ctx.closePath();
        ctx.stroke();

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
        
        // Body (Simple Curve)
        ctx.beginPath();
        ctx.arc(cx, cy + 80, 60, Math.PI, 0); // Semi circle body
        ctx.lineTo(cx - 60, cy + 80);
        ctx.stroke();
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
