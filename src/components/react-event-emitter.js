import React, { Component } from 'react';
import noop from 'noop';

export default class extends Component {
  constructor(props) {
    super(props);
    nx.event.init.call(this);
    this.__transitionReady();
    this.__componentWillMount();
    (this.componentAttachEvents || noop).call(this);
  }

  componentWillUnmount() {
    nx.event.destroy.call(this);
    window.onpageshow = null;
    this.componentAttachEvents = noop;
  }

  componentWillReady() {
    //to be implement.
  }

  on(inName, inHandler, inContext) {
    nx.event.on(inName, inHandler, this);
  }

  off(inName, inHandler, inContext) {
    nx.event.off(inName, inHandler, this);
  }

  fire(inName, inArgs) {
    nx.event.fire.call(this, inName, inArgs);
  }

  __componentWillMount() {
    this.componentWillReady();
  }

  __transitionReady() {
    window.onpageshow = null;
    window.onpageshow = (inEvent) => {
      if (inEvent.persisted) {
        this.__componentWillMount.call(this);
      }
    }
  }

}
