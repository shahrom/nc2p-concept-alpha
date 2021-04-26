/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MessageDispatcher.js
 * Created: Friday, 27th March 2020 11:50:13 am
 * Modified: Monday, 30th March 2020 8:47:38 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

let instance = null;
export default class MessageDispatcher {
  constructor() {
    if (!instance) {
      this.callbackMessageDispatcher = [];
      instance = this;
    }
    return instance;
  }

  /*  
  [Desc] 
  Add the function to the main dispatcher list
  [Param]
  id: the unique name of the function
  callback: the return function needed when a messaged needs to be return back
  */
  SubscribeDispatcher(id, callback) {
    if (callback !== undefined) {
      // [1] filter any existing function from being added to the dispatcher list
      var found = this.callbackMessageDispatcher.some((obj) =>
        obj.id === id ? true : false
      );
      // [2] add the new registered function to the main dispatcher list
      if (found === false) {
        this.callbackMessageDispatcher.push({ id: id, func: callback });
      }
    }
  }

  /* 
  [Desc]
  Broadcast the message to all the function in the main dispatcher list
  [Param]
  param : the parameter object that is sent to all the functions on the dipatcher list
  */
  TriggerMessageDispatcher(param) {
    // [1] llop through the dispatch list and send the param object via the callback function
    for (var i = 0, l = this.callbackMessageDispatcher.length; i < l; i++) {
      var obj = this.callbackMessageDispatcher[i];
      if (obj !== null) {
        obj.func(param);
      }
    }
  }
}
