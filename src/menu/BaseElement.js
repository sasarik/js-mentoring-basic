/**
 * BaseElement model
 */
class BaseElement {
    _element; // DOM Element

    constructor(elementId = null) {
        if (elementId)
            this.setElementById(elementId);
    }

    setElementById(elementId) {
        if (elementId) {
            const domElement = document.getElementById(elementId);
            if (!domElement)
                throw `${Utils.getClassName(this)}::"${elementId}" is not found.`;
            else {
                this._element = domElement;
            }
        }
    }

    get id() {
        return (this.element ? this.element.id : undefined);
    }

    get element() {
        return this._element;
    }

}


