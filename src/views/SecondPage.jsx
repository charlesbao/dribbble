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
                <div className="img-box" style={{
                    height:document.body.clientHeight - 50
                }}>
                    <img src={this.state.content.bigImage} />
                </div>
                <div className="action-bar" onClick={this.backHandle}>返回</div>
            </section>
        )
    }
    backHandle(){
        environment.hashEnvironment.navigate('/',{transitionName:'pop-right'},function(err){})
    }
}

export default MainPage
