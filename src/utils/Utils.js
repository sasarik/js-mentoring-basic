class Utils {
  static _storage;

  static getStorage() {
    // lazy instantiation
    if (!Utils._storage) {
      Utils._storage = {
        isAvailable: function () {
          return (typeof Storage !== "undefined");
        },
        getValue: function (key) {
          return this.isAvailable ? localStorage.getItem(key) : undefined;
        },
        setValue: function (key, value) {
          if (this.isAvailable) {
            localStorage.setItem(key, value);
          }
        }
      }
    }
    return Utils._storage;
  }

  static isDefined(o) {
    return (o !== undefined);
  }

  static getClassName(obj) {
    return obj
      ? obj.constructor.name
      : "<null>";
  }
}