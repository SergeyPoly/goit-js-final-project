import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export function emitEvent(name, data) {
  eventEmitter.emit(name, data);
}

export function listenToEvent(
    name,
    listener,
  ) {
    eventEmitter.addListener(name, listener);

    return () => {
      eventEmitter.removeListener(name, listener);
    };
  }