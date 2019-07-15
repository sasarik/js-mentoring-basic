/**
 * Section model
 */
class Section extends BaseElement {

    get visible() {
        return this.element
            ? this.element.style.display === "block"
            : false;
    }

    show() {
        if (this.element && !this.visible) {
            this.element.style.display = "block";
        }
    }

    hide() {
        if (this.element && this.visible) {
            this.element.style.display = "none";
        }
    }

}