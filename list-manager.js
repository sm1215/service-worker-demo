const listManager = {
  data = [],
  selectors: ['#list'],
  els: {},
  init: function() {
    this.setupEls();
    this.setListeners();
    this.writeList();
  },

  setupEls: function() {
    this.selectors.forEach(function(selector) {
      //remove class / id denotion along with whitespace
      var pattern = new RegExp(/[.#\s]/g);
      var key = selector.replace(pattern, '');
      game.els[key] = document.querySelector(selector);
    });
  },

  setListeners: function() {

  },

  writeList: function() {
    const toWrite = [];
    this.data.forEach((entry) => {
      const newItem = new listItem({
        id: 1,
        name: 'First',
        message: 'Test'
      });

      const newEl = newItem.createElement();
      console.log("newEl", newEl);
      
    });
  }
}

const listItem = {
  init: function(opts) {
    this.id = opts.id || 0;
    this.name = opts.name || 'No name';
    this.message = opts.message || 'No message';
    this.time = Date.now();
  },
  createElement: function() {
    const container = document.createElement('div');
    const name = document.createElement('h2');
    const message = document.createElement('p');
    const time = document.createElement('span');

    container.setAttribute('id', 'item-' + this.id);
    container.classList.add('item-container');
    
    name.setAttribute('id', 'item-name-' + this.id);
    name.classList.add('item-name');

    message.setAttribute('id', 'item-message-' + this.id);
    message.classList.add('item-message');

    time.setAttribute('id', 'item-time-' + this.id);
    time.classList.add('item-time');

    name.textContent = this.name;
    message.textContent = this.message;
    time.textContent = this.time;

    container.appendChild(name);
    container.appendChild(time);
    container.appendChild(message);
  }
};
