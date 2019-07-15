class Menu extends BaseElement {

    static LAST_SELECTED_TAB = "lastSelectedTab";

    constructor(elementId) {
        super();
        this._menuElementsClassName = undefined;
        this._menuIdToItemMap = new Map();
        this._menuToSectionMap = new Map();
        this.setElementById(elementId);
    }

    forMenuElements(menuElementsClassName) {
        this._menuElementsClassName = menuElementsClassName;
        return this;
    }

    initialize(menuToSectionInitCallback) {
        this._menuIdToItemMap.clear();
        this._menuToSectionMap.clear();
        // 1. get child nodes of menu element (buttons) - @tip querySelectorAll
        // 2. iterate over each button
        // 3. foreach button create Section object and MenuItem object
        // 4. tip: MenuItem onClickCallback, onDeactivateCallback
        if (this.element) {
            const nodes = document.querySelectorAll(`#${this.id} .${this._menuElementsClassName}`);
            nodes.forEach(menuElement => {
                if (menuElement) {
                    const menuItem = new MenuItem(menuElement.id, this._onMenuItemSelectionChangeHandler.bind(this));
                    const sectionItem = new Section();
                    this._menuIdToItemMap.set(menuElement.id, menuItem);
                    this._menuToSectionMap.set(menuItem, sectionItem);
                    if (Utils.isDefined(menuToSectionInitCallback)) {
                        menuToSectionInitCallback(menuItem, sectionItem);
                    }
                }
            });
        }
        return this;
    }

    selectDefault() {
        // should select default menu item (first one or last selected from Local storage)
        let lasSelectedTabId = Utils.getStorage().isAvailable
            ? Utils.getStorage().getValue(Menu.LAST_SELECTED_TAB)
            : undefined;
        let firstTabId = this._menuIdToItemMap.size > 0
            ? this._menuIdToItemMap.keys().next().value
            : undefined;
        let tabIdToSelect = lasSelectedTabId || firstTabId;
        this.setSelected(tabIdToSelect);
        return this;
    }

    hasMenuItem(menuItemId) {
        return menuItemId ? this._menuIdToItemMap.has(menuItemId) : false;
    }

    getMenuItem(menuItemId) {
        return this._menuIdToItemMap.get(menuItemId);
    }

    getSectionItem(menuItemId) {
        return this.hasMenuItem(menuItemId)
            ? this._menuToSectionMap.get(this.getMenuItem(menuItemId))
            : undefined;
    }

    setSelected(menuItemId) {
        // should call menuItem.activate() for given menu item
        if (this.hasMenuItem(menuItemId) && !this.getMenuItem(menuItemId).isActive) {
            this.getMenuItem(menuItemId).select();
        }
    }

    _applyItemSelectionChange(changedMenuItem) {
        if (changedMenuItem.isSelected) {
            this._highlightMenuItem(changedMenuItem, true);
            this._setMenuSectionVisible(changedMenuItem, true);
            this._deactivatePreviouslySelected(changedMenuItem);
            Utils.getStorage().setValue(Menu.LAST_SELECTED_TAB, changedMenuItem.id);
        } else {
            this._highlightMenuItem(changedMenuItem, false);
            this._setMenuSectionVisible(changedMenuItem, false);
        }
    }

    _highlightMenuItem(menuItem, highlight) {
        if (menuItem) {
            if (highlight && (menuItem.element.className.indexOf(" active") === -1))
                menuItem.element.className += " active";
            else if (!highlight && (menuItem.element.className.indexOf(" active") >= 0))
                menuItem.element.className = menuItem.element.className.replace(" active", "");
        }
    }

    _setMenuSectionVisible(menuItem, visible) {
        if (menuItem) {
            const sectionItem = this.getSectionItem(menuItem.id);
            if (sectionItem) {
                if (visible)
                    sectionItem.show();
                else
                    sectionItem.hide();
            }
        }
    }

    _deactivatePreviouslySelected(activeMenuItem) {
        // should call menuItem.deactivate() for active menu item
        this._menuIdToItemMap.forEach(menuItem => {
            if (menuItem !== activeMenuItem)
                menuItem.unselect();
        });
    }

    _onMenuItemSelectionChangeHandler(menuItem) {
        //console.log(`${menuItem.id}.selectedChange:${menuItem.isSelected}`);
        this._applyItemSelectionChange(menuItem);
    }
}

