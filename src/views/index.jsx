import React from 'react';
import AnimatedLocations from 'react-router-component-transition'
import {Location} from 'react-router-component'
import MainPage from './MainPage'
import SecondPage from './SecondPage'

import '../utils/animation.css'

class Index extends React.Component{
    render(){
        return (
            <AnimatedLocations hash
                    className="router"
                    transitionName="push-right"
                    popStateTransitionName="pop-right"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}>

                <Location path="/" handler={MainPage} />
                <Location path="/MainPage" handler={MainPage} />
                <Location path="/SecondPage" handler={SecondPage} />


            </AnimatedLocations>
    )
    }
}

export default Index