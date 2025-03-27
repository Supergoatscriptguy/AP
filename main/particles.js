document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('stars-bg');
    const ctx = canvas.getContext('2d');
    

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    

    const particleCount = 45;
    const particles = [];
    

    class Star {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.brightness = Math.random() * 0.5 + 0.5;
            this.color = this.getStarColor();
        }
        
        getStarColor() {
            
            const colors = [
                'rgba(255, 255, 255, ' + this.brightness + ')', 
                'rgba(235, 240, 255, ' + this.brightness + ')', 
                'rgba(255, 240, 220, ' + this.brightness + ')',  
                'rgba(255, 210, 170, ' + this.brightness + ')',  
                'rgba(255, 180, 180, ' + this.brightness + ')'  
            ];
            
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {

            this.y += this.speed;
            

            this.x += Math.random() * 0.4 - 0.2;
            

            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            

            if (Math.random() < 0.01) {
                this.brightness = Math.random() * 0.5 + 0.5;
                this.color = this.getStarColor();
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Star());
    }
    

    function animate() {

        ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});