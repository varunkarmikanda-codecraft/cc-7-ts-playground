class EventHandler {
  count = 0;
  countLabel: HTMLLabelElement | null = null;
  constructor() {
    const buttonRef = document.querySelector('button');
    console.assert(buttonRef !== null);
    buttonRef?.addEventListener('click', this.handleClick);

    this.countLabel = document.querySelector('label');
    if (this.countLabel) {
      this.countLabel.textContent = `Count Value: ${this.count}`;
    }
  }

  handleClick(event: Event) {
    this.count++;
    console.log('button clicked', event);
    console.log('Count Value: ', this.count);
    if (this.countLabel) {
      this.countLabel.textContent = `Count Value: ${this.count}`;
    }
  }
}

const eventHandler = new EventHandler();
