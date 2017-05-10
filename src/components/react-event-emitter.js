import React,{PureComponent} from 'react';

import noop from 'noop';

export default class extends PureComponent{
  constructor(props) {
    super(props);
    this.__listeners__ = {};
    (this.componentAttachEvents.bind(this) || noop)();
  }

  componentWillUnmount(){
    this.__listeners__ = null;
    this.componentAttachEvents = noop;
  }

  on(inName, inHandler) {
    let map = this.__listeners__;
    let listeners = map[inName] = map[inName] || [];
    listeners.push({owner: this, handler: inHandler});
  }

  off(inName, inHandler) {
    let listeners = this.__listeners__[inName];
    if (inHandler) {
      listeners.forEach((listener,index)=>{
        if (listener.handler === inHandler) {
          listeners.splice(index, 1);
        }
      });
    } else {
      listeners.length = 0;
    }
  }

  fire(inName, inArgs) {
    const listeners = this.__listeners__[inName];
    if (listeners) {
      for(let i=0, length = listeners.length;i<length;i++){
        const listener = listeners[i];
        if (listener && listener.handler) {
          if (listener.handler.call(listener.owner, inArgs) === false) {
            break;
          }
        }
      }
    }
  }
}
