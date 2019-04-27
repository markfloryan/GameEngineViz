class EventEmitter {

	constructor() {
		this.events = {};
	}

	_getEventListByName(eventName) {
		if (typeof this.events[eventName] === 'undefined') {
			this.events[eventName] = new Set();
		}
		return this.events[eventName]
	}

	addEventListener(eventName, listener) {
		this._getEventListByName(eventName).add(listener);
	}

	

	emit(eventName, ...args) {

		this._getEventListByName(eventName).forEach(function (listener) {

			listener.handleEvent.apply(listener, args);

		}.bind(this));

	}

	removeListener(eventName, listener) {
		this._getEventListByName(eventName).delete(listener);
	}


}
