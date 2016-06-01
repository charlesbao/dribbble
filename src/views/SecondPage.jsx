import React from 'react';
import GlobalActions from '../actions/GlobalActions'
import GlobalStores,{DataEvents} from '../stores/GlobalStores'

import {environment} from 'react-router-component'

import './SecondPage.less'

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content:GlobalStores.getStoreData(DataEvents.DETAIL)
        };
    }
    render(){
        console.log(this.state.content)
        return (
            <section id="SecondPage">
                <div>
                    <img src={this.state.content.bigImage} />
                </div>
            </section>
        )
    }
    backHandle(){
        environment.hashEnvironment.navigate('/',{transitionName:'pop-right'},function(err){})
    }
}

export default MainPage
