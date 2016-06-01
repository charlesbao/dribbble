import {EventEmitter} from 'events';
import assign from 'object-assign';

import Dispatcher from '../actions/Dispatcher';

var _ActionStores = {};
var _DataStores = {};

var _ActionEvents = {
    GET_DRIBBBLE_EVENT:'GET_DRIBBBLE_EVENT'
};

var _DataEvents = {
    DETAIL:'DETAIL',
    SCROLL:'SCROLL'
};

var GlobalStores = assign({}, EventEmitter.prototype, {

    emitChange: function(event) {
        this.emit(event);
    },

    addChangeListener: function(event, callback) {
        this.on(event, callback);
    },

    removeChangeListener: function(event, callback) {
        this.removeListener(event, callback);
    },

    removeWholeListeners: function(){
        this.removeAllListeners()
    },

    setActionResult: function(actionName,result){
        _ActionStores[actionName] = result;
        this.emitChange(actionName);
    },

    getActionResult: function(actionName){
        return _ActionStores[actionName]
    },

    setStoreData: function(storeName,result){
        _DataStores[storeName] = result;
    },

    getStoreData: function(storeName){
        return _DataStores[storeName]
    }

});

GlobalStores.dispatchToken = Dispatcher.register(function(action) {
    GlobalStores.setActionResult(action.type,action.data);
});

export default GlobalStores;
export var ActionEvents = _ActionEvents;
export var DataEvents = _DataEvents;