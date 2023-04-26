class StarsRating {
  constructor(refId, options) {
    this.refId = refId;
    this.options = options;
    this.stars = this.options?.stars || this.getStarsDefault();
    this.value = 0;

    this.init();
  }

  init = () => {
    this.setContainer();
    this.setStars();
    this.setEventsStars();
  }

  setContainer = () => {
    this.container = document.getElementById(this.refId);
  }

  getContainer = () => {
    return this.container;
  }

  setStars = () => {
    for (let i = 1; i <= this.stars; i++) {
      const stars = document.createElement('span');
      stars.className = 'star';

      if (this.options?.size) {
        const size = this.options?.size;

        stars.style.setProperty('--stars-rating--width', `${size}px`);
        stars.style.setProperty('--stars-rating--height', `${size}px`);
        stars.style.setProperty('--stars-rating--font-size', `${size}px`);
      }

      if (this.options?.colorEmpty) {
        stars.style.setProperty('--stars-rating--color-empty', this.options.colorEmpty);
      }

      if (this.options?.colorFilled) {
        stars.style.setProperty('--stars-rating--color-filled', this.options.colorFilled);
      }

      this.container.appendChild(stars);
      this.starsDom = this.container.querySelectorAll('.star');
    }
  }

  setEventsStars = () => {
    const fillStars = (targetIndex) => {
      this.starsDom.forEach((star, index) => {
        if (index <= targetIndex) {
          star.classList.add('filled');
        } else {
          star.classList.remove('filled');
        }
      });
    }

    // const resetStars = () => {
    //   this.starsDom.forEach(star => {
    //     star.classList.remove('filled');
    //   });
    // }
    
    const setRating = (event) => {
      const targetIndex = parseInt(event.target.getAttribute('data-index'));
      this.value = targetIndex + 1;

      // fillStars(targetIndex);
    }

    this.starsDom.forEach((star, index) => {
      star.addEventListener('mouseover', (e) => fillStars(parseInt(e.target.getAttribute('data-index'))));
      // star.addEventListener('mouseout', resetStars);
      star.addEventListener('click', setRating);
      star.setAttribute('data-index', index);
    });
  }

  getValue = () => {
    return this.value;
  }

  getStarsDefault = () => {
    return 5;
  }
}