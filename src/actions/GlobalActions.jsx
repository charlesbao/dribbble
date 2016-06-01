import AppDispatcher from'./Dispatcher';
import WebAPIActions from './WebAPIActions'
import {ActionEvents} from '../stores/GlobalStores'

var GlobalActions = {
    getDribbble: function(){
        WebAPIActions.getDribbble(function(result){
            AppDispatcher.dispatch({
                type: ActionEvents.GET_DRIBBBLE_EVENT,
                data: result,
            });
        })
    }
};

export default GlobalActions