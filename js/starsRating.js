class StarsRating {
  constructor(refId, options) {
    this.refId = refId;
    this.options = options;
    this.stars = options?.stars || StarsRating.getStarsDefault();
    this.value = options?.value || StarsRating.getDefaultValue();
    this.isDisabled = options?.isDisabled || StarsRating.getDefaultIsDisabled();

    this.init();
  }

  init() {
    this.setContainer();
    this.setStars();

    if (!this.isDisabled) {
      this.setEventsStars();
    } else {
      this.fillStars(this.value);
    }
  }

  setContainer() {
    this.container = document.getElementById(this.refId);
  }

  getContainer() {
    return this.container;
  }

  setStars() {
    for (let i = 1; i <= this.stars; i++) {
      const star = document.createElement('span');
      star.className = 'star';

      if (this.options?.size) {
        const size = this.options.size;

        star.style.setProperty('--stars-rating--width', `${size}px`);
        star.style.setProperty('--stars-rating--height', `${size}px`);
        star.style.setProperty('--stars-rating--font-size', `${size}px`);
      }

      if (this.isDisabled) {
        star.style.setProperty('--stars-rating--cursor', 'default');
      }

      if (this.options?.colorEmpty) {
        star.style.setProperty('--stars-rating--color-empty', this.options.colorEmpty);
      }

      if (this.options?.colorFilled) {
        star.style.setProperty('--stars-rating--color-filled', this.options.colorFilled);
      }

      this.container.appendChild(star);
    }

    this.starsDom = this.container.querySelectorAll('.star');
  }

  fillStars(targetIndex) {
    this.starsDom.forEach((star, index) => {
      star.classList.toggle('filled', index < targetIndex);
    });
  }

  resetStars() {
    this.starsDom.forEach(star => {
      star.classList.remove('filled');
    });
  }

  setRating(event) {
    const targetIndex = parseInt(event.target.getAttribute('data-index'));
    let valueTemp = targetIndex + 1;

    if (valueTemp === this.value) {
      this.resetStars();
      valueTemp = StarsRating.getDefaultValue();
    } else {
      this.fillStars(valueTemp);
    }

    this.value = valueTemp;
  };

  setEventsStars() {
    this.starsDom.forEach((star, index) => {
      star.addEventListener('click', (event) => this.setRating(event));
      star.setAttribute('data-index', index);
    });
  }

  static getDefaultValue() {
    return 0;
  }

  static getStarsDefault() {
    return 5;
  }

  static getDefaultIsDisabled() {
    return false;
  }

  getValue() {
    return this.value;
  }
}
