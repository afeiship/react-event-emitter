import React,{Component} from 'react';

import noop from 'noop';

export default class extends Component{
  constructor(props) {
    super(props);
    this.__initialized__ = false;
    this.__listeners__ = {};
    this.__memoeryReady();
    this.__componentWillMount();
    (this.componentAttachEvents.bind(this) || noop)();
  }

  componentWillUnmount(){
    this.__listeners__ = null;
    this.__initialized__ = false;
    window.onpageshow = null;
    this.componentAttachEvents = noop;
  }

  componentWillReady(){
    //to be implement.
  }

  on(inName, inHandler) {
    let map = this.__listeners__;
    let listeners = map[inName] = map[inName] || [];
    listeners.push({owner: this, handler: inHandler});
    return {
      destroy: this.off(inName,inHandler)
    };
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

  __componentWillMount(){
    if(!this.__initialized__){
      this.__initialized__ = true;
      this.componentWillReady();
    }
  }

  __memoeryReady(){
    window.onpageshow = null;
    window.onpageshow = (inEvent) => {
      if (inEvent.persisted) {
        this.__componentWillMount();
      }
    }
  }

}
