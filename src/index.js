// config
const btnToContentMap = {
  "btnNews": "sectionNews",
  "btnOffer": "sectionOffer",
  "btnGallery": "sectionGallery",
  "btnContacts": "sectionContacts"
};

// @todo ask Monica: it looks perfect IMHO - (chained etc.) but it should't work:
// Menu object is created in local scope of "function" and there is no any reference to it;
// I would expect that it have to be destroyed by GarbageCollector, but it works (sic!)
window.onload = function () {
  new Menu("navigationBar")
    // for appropriate menu-tab DOM elements..get.
    .forMenuElements("tabButton")
    // init sectionModel by appropriate section in DOM
    .initialize((menuItem, sectionItem) => { sectionItem.setElementById(btnToContentMap[menuItem.id]) })
    .selectDefault(); // expect to select first one or last selected
}
