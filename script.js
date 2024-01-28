const superSwiper = () => {
  const swiper = new Swiper('.swiper', {
    init: false,
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    effect: 'fade',
    on: {
      slideChange() {
        if (swiper.isEnd) {
          window.addEventListener('wheel', event => {
            if (event.deltaY > 50) {
              setTimeout(() => {
                swiper.mousewheel.disable();
                document.querySelector('.swiper').classList.remove('fixed');
              }, 500)
            }
          })
        }
      }
    }
  })

  swiper.on('init', () => {
    document.querySelector('.swiper').classList.add('fixed');
    if (swiper.isBeginning) {
      window.addEventListener('wheel', event => {
        if (event.deltaY < -50) {
          setTimeout(() => {
            swiper.mousewheel.disable();
            document.querySelector('.swiper').classList.remove('fixed');
          }, 200)
        }
      })
    };
  })

  swiper.init();
}

const swiperObserver = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        superSwiper();
        observer.unobserve(entry.target);
      }
    })
  }, {
    root: null,
    threshold: 0.9
  }
  )
  const swiper = document.querySelector('.swiper');
  observer.observe(swiper);
}

document.addEventListener('DOMContentLoaded', () => {
  swiperObserver();

});