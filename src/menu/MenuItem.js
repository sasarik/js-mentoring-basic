/**
 * MenuItem model
 */
class MenuItem extends BaseElement {

    constructor(elementId, selectionChangeCallback = null) {
        super(elementId);
        this._isSelected = false;
        this._selectionChangeCallback = selectionChangeCallback;
        this.element.addEventListener("click", () => { this.select() });
    }

    get isSelected() {
        return this._isSelected;
    }

    select() {
        // onClickCallback should have been called
        // should activate tab
        if (!this._isSelected) {
            this._isSelected = true;
            if (Utils.isDefined(this._selectionChangeCallback) && this.element)
                this._selectionChangeCallback(this);
        }
    }

    unselect() {
        // onDeactivateCallback should have been called
        // should deactivate tab
        if (this._isSelected) {
            this._isSelected = false;
            if (Utils.isDefined(this._selectionChangeCallback) && this.element)
                this._selectionChangeCallback(this);
        }
    }

}