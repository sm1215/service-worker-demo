const app = {
  // data: ['Apples', 'Potatoes', 'Bread', 'Eggs'],
  data: ['SW failed to load', 'Try refreshing page if this is the first time you\'ve loaded it'],
  selectors: ['#list'],
  els: {},
  init: function() {
    this.synced = new Event('synced');
    this.setupEls();
    this.setListeners();
    this.syncData();
    this.writeList();
  },
  
  syncData: function() {
    fetch('service-worker/data.js')
      .then((response) => {
        return response.json();
      })
      .then((stringifiedJson) => {
        const json = JSON.parse(stringifiedJson);
        let result = [];

        result = json.map((cur) => {
          return cur['value'];
        });

        app.data = result;

        document.dispatchEvent(this.synced);
      });
  },
  
  setupEls: function() {
    this.selectors.forEach((selector) => {
      var pattern = new RegExp(/[.#\s]/g);
      var key = selector.replace(pattern, '');
      this.els[key] = document.querySelector(selector);
    });
  },
  
  setListeners: function() {
    document.addEventListener('synced', this.handleSync);
  },

  handleSync: function(e) {
    app.clearList();
    app.writeList();
  },

  clearList: function() {
    const list = app.els.list.querySelector('ul');
    if(list) {
      list.parentNode.removeChild(list);
    }
  },

  writeList: function() {
    
    const container = document.createElement('ul');
    const toWrite = [];
    
    this.data.forEach((entry) => {
      const newEl = document.createElement('li');
      newEl.textContent = entry;
      toWrite.push(newEl);
    });

    toWrite.forEach((el) => {
      container.appendChild(el);
    });

    this.els.list.appendChild(container);
  }
};
