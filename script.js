// --- 1. CONFIGURAZIONE BASE DI THREE.JS ---

// Ottieni il Canvas
const canvas = document.getElementById('hero-canvas');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Scena
const scene = new THREE.Scene();

// Telecamera (Camera prospettica)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); // Alpha: true per rendere lo sfondo trasparente se necessario
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Luce
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

// --- 2. AGGIUNTA OGGETTI 3D (Placeholders) ---

// Esempio: un modello 3D del prodotto (dovrebbe essere caricato con GLTFLoader/FBXLoader)
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, specular: 0x999999, shininess: 30 });
const productModel = new THREE.Mesh(geometry, material);
scene.add(productModel);

// Posizionamento iniziale del modello
productModel.position.set(0, 0, 0);


// --- 3. ANIMAZIONE E LOOP DI RENDER ---

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Animazione di base (rotazione automatica)
    productModel.rotation.y = elapsedTime * 0.1;
    productModel.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;

    // Renderizza la scena
    renderer.render(scene, camera);

    // Richiede il frame successivo
    window.requestAnimationFrame(tick);
};

tick();

// --- 4. GESTIONE EVENTI (Scroll e Ridimensionamento) ---

// Ridimensionamento della finestra
window.addEventListener('resize', () => {
    // Aggiorna dimensioni
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Aggiorna Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Aggiorna Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// LOGICA DI SCROLL (UX 3D)
// Questo è fondamentale per una sensazione 3D immersiva con lo scroll
window.addEventListener('scroll', () => {
    // Calcola la posizione di scroll (0 a 1)
    const scrollPosition = window.scrollY / (document.body.offsetHeight - window.innerHeight);
    
    // Esempio: muovere la camera o ruotare l'oggetto in base allo scroll
    // Sposta la camera più in profondità mentre l'utente scorre
    camera.position.z = 5 + scrollPosition * 10; 

    // Ruota il modello 3D
    productModel.rotation.y = scrollPosition * Math.PI * 2; // Una rotazione completa
    
    // Potresti anche cambiare la sezione di contenuto (es. zoom sul prodotto)
});