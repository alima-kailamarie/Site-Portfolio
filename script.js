document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });  

  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-images img');
  const totalImages = images.length;
  const carouselImages = document.querySelector('.carousel-images');
  
  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  });
  
  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  });
  
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}vw)`;
  }  