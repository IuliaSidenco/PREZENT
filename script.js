// Конфетти
const confettiContainer = document.getElementById('confetti');
const colors = ['#ffd700','#ffffff','#ff69b4','#ffa500','#fd010d'];
for(let i=0;i<30;i++){
    const c = document.createElement('div');
    c.classList.add('confetti');
    c.style.left = Math.random()*100+'%';
    c.style.width = 5+Math.random()*5+'px';
    c.style.height = c.style.width;
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay = (Math.random()*5)+'s';
    confettiContainer.appendChild(c);
}

// Музыка
const muzic = document.getElementById('bg-muzic');
let isPlaying = false;
function toggleMuzic() {
    if(!isPlaying){
        muzic.play().catch(e => console.log(e));
        isPlaying = true;
    } else {
        muzic.pause();
        isPlaying = false;
    }
}

// Салют
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let fireworks = [];

class Firework {
    constructor(x,y,color){
        this.particles = [];
        for(let i=0;i<30;i++){
            const angle = Math.random()*2*Math.PI;
            const speed = Math.random()*5 + 2;
            this.particles.push({
                x:x,
                y:y,
                vx: Math.cos(angle)*speed,
                vy: Math.sin(angle)*speed,
                alpha:1,
                color: color
            });
        }
    }
    update(){
        this.particles.forEach(p=>{
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= 0.02;
        });
        this.particles = this.particles.filter(p=>p.alpha>0);
    }
    draw(){
        this.particles.forEach(p=>{
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,2*Math.PI);
            ctx.fill();
        });
    }
}

function randomColor(){
    const colors = ['255,215,0','255,105,180','255,69,0','0,191,255','173,255,47'];
    return colors[Math.floor(Math.random()*colors.length)];
}

function launchFireworks(){
    for(let i=0;i<5;i++){
        const x = Math.random()*canvas.width;
        const y = Math.random()*canvas.height/2;
        fireworks.push(new Firework(x,y,randomColor()));
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fireworks.forEach(f=>{
        f.update();
        f.draw();
    });
    fireworks = fireworks.filter(f=>f.particles.length>0);
    requestAnimationFrame(animate);
}
animate();

// Кнопка
document.querySelector('.muzic-btn').addEventListener('click', ()=>{
    toggleMuzic();     // музыка
    launchFireworks(); // салют
});
