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

        // Keyword Mapping System
        if (this.match(normalizedWord, ['sun', 'sunny', 'day', 'light'])) {
            this.drawSun(w, h);
        } else if (this.match(normalizedWord, ['tree', 'forest', 'wood', 'plant'])) {
            this.drawTree(w, h);
        } else if (this.match(normalizedWord, ['house', 'home', 'building', 'cottage'])) {
            this.drawHouse(w, h);
        } else if (this.match(normalizedWord, ['cat', 'kitty', 'kitten', 'meow', 'pet'])) {
            this.drawCat(w, h);
        } else if (this.match(normalizedWord, ['car', 'auto', 'vehicle', 'drive', 'bus', 'truck'])) {
            this.drawCar(w, h);
        } else if (this.match(normalizedWord, ['flower', 'rose', 'daisy', 'tulip', 'garden'])) {
            this.drawFlower(w, h);
        } else if (this.match(normalizedWord, ['heart', 'love', 'like', 'valentine'])) {
            this.drawHeart(w, h);
        } else if (this.match(normalizedWord, ['star', 'night', 'magic', 'space', 'sky'])) {
            this.drawStar(w, h);
        } else if (this.match(normalizedWord, ['cloud', 'rain', 'storm', 'weather', 'air'])) {
            this.drawCloud(w, h);
        } else if (this.match(normalizedWord, ['fish', 'sea', 'ocean', 'water', 'swim'])) {
            this.drawFish(w, h);
        } else if (this.match(normalizedWord, ['robot', 'bot', 'tech', 'machine', 'ai', 'cyborg'])) {
            this.drawRobot(w, h);
        } else if (this.match(normalizedWord, ['moon', 'crescent', 'night', 'sleep'])) {
            this.drawMoon(w, h);
        } else if (this.match(normalizedWord, ['balloon', 'party', 'birthday', 'float'])) {
            this.drawBalloon(w, h);
        } else if (this.match(normalizedWord, ['smile', 'happy', 'face', 'joy', 'fun', 'laugh'])) {
            this.drawSmiley(w, h);
        } else {
            // Default Fallback
            this.drawSmiley(w, h, true); // True implies it's a fallback
        }
    },

    match: function(input, keywords) {
        return keywords.some(k => input.includes(k) || k.includes(input));
    },

    // --- Drawing Functions ---

    drawSun: function(w, h) {
        const cx = w / 2;
        const cy = h / 2;
        const r = 60;
        const ctx = this.ctx;

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
        ctx.strokeStyle = 'black'; 
    },

    drawTree: function(w, h) {
        const ctx = this.ctx;
        
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

        for (let i = 0; i < 3; i++) {
            const y = h - 100 - (i * 50);
            const size = 60 - (i * 10);
            
            ctx.beginPath();
            ctx.moveTo(w/2 - size - 40, y + 40); 
            ctx.lineTo(w/2 + size + 40, y + 40); 
            ctx.lineTo(w/2, y - 60);             
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

        ctx.beginPath();
        ctx.rect(centerX - houseW/2, floorY - houseH, houseW, houseH);
        if (this.isColorMode) {
            ctx.fillStyle = '#fce4ec'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - houseW/2 - 20, floorY - houseH);
        ctx.lineTo(centerX + houseW/2 + 20, floorY - houseH);
        ctx.lineTo(centerX, floorY - houseH - 80);
        ctx.closePath();
        if (this.isColorMode) {
            ctx.fillStyle = '#ff4d4d'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(centerX - 25, floorY - 60, 50, 60);
        if (this.isColorMode) {
            ctx.fillStyle = '#8b4513'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(centerX + 15, floorY - 30, 3, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ffd700'; 
            ctx.fill();
        } else {
             ctx.fillStyle = 'white';
             ctx.fill();
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(centerX - 50, floorY - 90, 30, 30);
        if (this.isColorMode) {
            ctx.fillStyle = '#4d94ff'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
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

        ctx.beginPath();
        ctx.arc(cx, cy + 80, 60, Math.PI, 0); 
        ctx.lineTo(cx - 60, cy + 80);
        if (this.isColorMode) {
            ctx.fillStyle = '#333'; 
            ctx.fill();
            ctx.strokeStyle = '#333'; 
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
        }
        ctx.stroke();
        
        ctx.strokeStyle = this.isColorMode ? '#333' : 'black';

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

        ctx.strokeStyle = this.isColorMode ? 'white' : 'black';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(cx - 15, cy - 30, 5, 0, Math.PI * 2); 
        ctx.stroke();
        if (this.isColorMode) {
             ctx.fillStyle = '#4dff88'; 
             ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(cx + 15, cy - 30, 5, 0, Math.PI * 2); 
        ctx.stroke();
        if (this.isColorMode) {
             ctx.fillStyle = '#4dff88';
             ctx.fill();
        }

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

        ctx.beginPath();
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(cx, cy + 5);
        ctx.moveTo(cx, cy + 5);
        ctx.lineTo(cx - 10, cy + 10);
        ctx.moveTo(cx, cy + 5);
        ctx.lineTo(cx + 10, cy + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 30, cy - 10);
        ctx.lineTo(cx - 60, cy - 15);
        ctx.moveTo(cx - 30, cy);
        ctx.lineTo(cx - 60, cy + 5);
        ctx.moveTo(cx + 30, cy - 10);
        ctx.lineTo(cx + 60, cy - 15);
        ctx.moveTo(cx + 30, cy);
        ctx.lineTo(cx + 60, cy + 5);
        ctx.stroke();

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
    },

    drawCar: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        ctx.beginPath();
        ctx.rect(cx - 80, cy, 160, 50); 
        if (this.isColorMode) {
            ctx.fillStyle = '#ff4d4d'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 50, Math.PI, 0); 
        if (this.isColorMode) {
            ctx.fillStyle = '#ff4d4d';
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 35, Math.PI, 0); 
        if (this.isColorMode) {
            ctx.fillStyle = '#4d94ff'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - 35);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        const wheelY = cy + 50;
        
        ctx.beginPath();
        ctx.arc(cx - 50, wheelY, 20, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#333';
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(cx + 50, wheelY, 20, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#333';
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        
        if (this.isColorMode) {
             ctx.fillStyle = '#ccc';
        }
        
        ctx.beginPath();
        ctx.arc(cx - 50, wheelY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(cx + 50, wheelY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    },

    drawFlower: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        ctx.beginPath();
        ctx.moveTo(cx, cy + 50);
        ctx.lineTo(cx, cy + 150);
        ctx.lineWidth = 8;
        if (this.isColorMode) {
            ctx.strokeStyle = '#4dff88'; 
        }
        ctx.stroke();
        
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';

        ctx.beginPath();
        ctx.ellipse(cx + 20, cy + 100, 20, 10, Math.PI / 4, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#4dff88';
            ctx.fill();
             ctx.strokeStyle = '#4dff88'; 
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
        ctx.strokeStyle = 'black'; 

        const petalCount = 6;
        for (let i = 0; i < petalCount; i++) {
            const angle = (Math.PI * 2 / petalCount) * i;
            const px = cx + Math.cos(angle) * 40;
            const py = cy + Math.sin(angle) * 40;

            ctx.beginPath();
            ctx.arc(px, py, 25, 0, Math.PI * 2);
            if (this.isColorMode) {
                ctx.fillStyle = '#ff4d4d'; 
                ctx.fill();
            } else {
                ctx.fillStyle = 'white';
                ctx.fill();
            }
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, 20, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ffff4d'; 
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
    },

    // --- NEW DRAWINGS ---

    drawHeart: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2 + 20;

        ctx.beginPath();
        ctx.moveTo(cx, cy + 60);
        ctx.bezierCurveTo(cx - 80, cy, cx - 80, cy - 100, cx, cy - 40);
        ctx.bezierCurveTo(cx + 80, cy - 100, cx + 80, cy, cx, cy + 60);
        
        if (this.isColorMode) {
            ctx.fillStyle = '#ff4d4d'; // Red
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
    },

    drawStar: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;
        const r = 80;
        const innerR = 40;

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
            const angleInner = angle + Math.PI / 5;
            
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            const xi = cx + Math.cos(angleInner) * innerR;
            const yi = cy + Math.sin(angleInner) * innerR;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            ctx.lineTo(xi, yi);
        }
        ctx.closePath();
        
        if (this.isColorMode) {
            ctx.fillStyle = '#ffff4d'; // Yellow
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
    },

    drawCloud: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        ctx.beginPath();
        ctx.arc(cx - 50, cy + 20, 40, 0, Math.PI * 2);
        ctx.arc(cx + 50, cy + 20, 40, 0, Math.PI * 2);
        ctx.arc(cx, cy - 20, 50, 0, Math.PI * 2);
        ctx.closePath(); // Roughly closes the cloud shape
        
        if (this.isColorMode) {
            ctx.fillStyle = '#4d94ff'; // Light Blue
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
    },

    drawMoon: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, 70, 0.8 * Math.PI, 2.7 * Math.PI); // Outer arc
        ctx.bezierCurveTo(cx - 20, cy - 40, cx - 20, cy + 40, cx - 50, cy + 50); // Inner curve (rough approximation of crescent)
        ctx.closePath();
        
        if (this.isColorMode) {
            ctx.fillStyle = '#f1c40f'; // Moon Yellow
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();
    },

    drawFish: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        // Body
        ctx.beginPath();
        ctx.ellipse(cx, cy, 80, 50, 0, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ff9f43'; // Orange Fish
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Tail
        ctx.beginPath();
        ctx.moveTo(cx - 80, cy);
        ctx.lineTo(cx - 120, cy - 30);
        ctx.lineTo(cx - 120, cy + 30);
        ctx.closePath();
        if (this.isColorMode) {
            ctx.fillStyle = '#ff9f43';
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Eye
        ctx.beginPath();
        ctx.arc(cx + 50, cy - 15, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    },

    drawRobot: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        // Head
        ctx.beginPath();
        ctx.rect(cx - 40, cy - 80, 80, 70);
        if (this.isColorMode) {
            ctx.fillStyle = '#b2bec3'; // Gray
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Eyes
        ctx.beginPath();
        ctx.arc(cx - 20, cy - 50, 10, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy - 50, 10, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#fab1a0'; // Glowing eyes?
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Antenna
        ctx.beginPath();
        ctx.moveTo(cx, cy - 80);
        ctx.lineTo(cx, cy - 110);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy - 110, 5, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = 'red';
            ctx.fill();
        }
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.rect(cx - 50, cy, 100, 80);
        if (this.isColorMode) {
            ctx.fillStyle = '#636e72'; // Darker Gray
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Arms
        ctx.beginPath();
        ctx.moveTo(cx - 50, cy + 20);
        ctx.lineTo(cx - 90, cy + 50);
        ctx.moveTo(cx + 50, cy + 20);
        ctx.lineTo(cx + 90, cy + 50);
        ctx.stroke();
    },

    drawBalloon: function(w, h) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        // String
        ctx.beginPath();
        ctx.moveTo(cx, cy + 50);
        ctx.quadraticCurveTo(cx + 20, cy + 100, cx, cy + 150);
        ctx.stroke();

        // Balloon
        ctx.beginPath();
        ctx.ellipse(cx, cy - 20, 60, 75, 0, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ff7675'; // Pink/Red
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Knot
        ctx.beginPath();
        ctx.moveTo(cx, cy + 55);
        ctx.lineTo(cx - 5, cy + 65);
        ctx.lineTo(cx + 5, cy + 65);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },

    drawSmiley: function(w, h, isFallback = false) {
        const ctx = this.ctx;
        const cx = w / 2;
        const cy = h / 2;

        // Face
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        if (this.isColorMode) {
            ctx.fillStyle = '#ffeaa7'; // Skin tone/Yellow
            ctx.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        ctx.stroke();

        // Eyes
        ctx.beginPath();
        ctx.arc(cx - 25, cy - 20, 10, 0, Math.PI * 2);
        ctx.arc(cx + 25, cy - 20, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Smile
        ctx.beginPath();
        ctx.arc(cx, cy + 10, 40, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        if (isFallback) {
            ctx.font = '16px Comic Sans MS';
            ctx.fillStyle = 'gray';
            ctx.textAlign = 'center';
            ctx.fillText("I don't know that word,", w/2, h - 30);
            ctx.fillText("but here is a smile!", w/2, h - 10);
        }
    }
};
