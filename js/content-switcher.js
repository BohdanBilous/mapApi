/*
    <div class="btn-switch" data-switch="state">

    <span data-switch-content="state">content</span>
*/

export class ContentSwitcher {
  constructor(switchName) {
    this.switchName = switchName;
    this.buttons = document.querySelectorAll(".btn-switch");
    this.radioboxes = document.querySelectorAll(`input[${this.switchName}]`);
    this.contentBoxes = document.querySelectorAll(
      `[${this.switchName}-content]`
    );
    this.state = this.getState();
    this.switchContent(this.state);
    this.onChangeHandler();
  }

  onChangeHandler() {
    this.radioboxes.forEach(radiobox => {
      radiobox.addEventListener("change", () => {
        if (radiobox.checked) {
          this.state = radiobox.dataset.switch;
          this.switchContent(this.state);
        }
      });
    });
  }

  switchContent(state) {
    let contentBoxState = "";

    this.contentBoxes.forEach(contentBox => {
      contentBoxState = contentBox.getAttribute(`${this.switchName}-content`);

      contentBoxState != state
        ? contentBox.classList.add("content-hide")
        : contentBox.classList.remove("content-hide");
    });
  }

  getState() {
    const checked = document.querySelector(`[${this.switchName}]:checked`);
    return checked.dataset.switch;
  }
}
