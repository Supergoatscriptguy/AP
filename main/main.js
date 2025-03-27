

document.addEventListener('DOMContentLoaded', function() {
  
  let lightbox, closeBtn, img, spinner;
  let hasBeenInitialized = false;
  
  
  const galleryImages = document.querySelectorAll('.gallery-item img, .phase img, .planet-diagram, .planet-main-image, .planet-side-image, .full-width-image');
  
  galleryImages.forEach(function(image) {
    
    image.style.cursor = 'pointer';
    
    
    image.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s';
      this.style.transform = 'scale(1.03)';
      this.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    });
    
    image.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
    
    
    image.addEventListener('click', function() {
      const imageSrc = this.src;
      
      
      if (!hasBeenInitialized) {
        createLightbox();
      }
      
      
      openLightbox(imageSrc);
    });
  });
  
  
  function createLightbox() {
    
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.9);
      display: none;
      justify-content: center;
      align-items: center;
    `;
    
    closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 30px;
      color: #f1f1f1;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1001;
      transition: color 0.2s;
    `;
    
    img = document.createElement('img');
    img.className = 'lightbox-content';
    img.style.cssText = `
      max-width: 95%;
      max-height: 95%;
      margin: auto;
      display: none;
      object-fit: contain;
      border: 2px solid white;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    `;
    
    
    spinner = document.createElement('div');
    spinner.className = 'lightbox-spinner';
    spinner.style.cssText = `
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -20px;
    `;
    
    
    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes zoomIn {
        from {transform: scale(0.1)}
        to {transform: scale(1)}
      }
    `;
    document.head.appendChild(animationStyle);
    
    
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(spinner);
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
    
    hasBeenInitialized = true;
  }
  
  
  function closeLightbox() {
    lightbox.style.display = 'none';
    img.style.display = 'none';
    img.src = '';
  }
  
  
  function openLightbox(imageSrc) {
    
    lightbox.style.display = 'flex';
    spinner.style.display = 'block';
    img.style.display = 'none';
    
    
    const tempImg = new Image();
    
    
    tempImg.onload = function() {
      
      if (lightbox.style.display === 'flex') {
        
        spinner.style.display = 'none';
        
        
        img.src = imageSrc;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const naturalWidth = this.width;
        const naturalHeight = this.height;
        
        if (naturalWidth < viewportWidth * 0.9 && naturalHeight < viewportHeight * 0.9) {
          img.style.width = `${naturalWidth}px`;
          img.style.height = `${naturalHeight}px`;
          img.style.maxWidth = 'none';
          img.style.maxHeight = 'none';
        } else {
          img.style.width = 'auto';
          img.style.height = 'auto';
          img.style.maxWidth = '95%';
          img.style.maxHeight = '95%';
        }
        
        
        img.style.display = 'block';
        img.style.animation = 'zoomIn 0.5s';
      }
    };
    
    
    tempImg.onerror = function() {
      closeLightbox();
      console.error('Failed to load image:', imageSrc);
    };
    
    
    tempImg.src = imageSrc;
  }
});