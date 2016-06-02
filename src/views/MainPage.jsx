import React from 'react';
import ReactDOM from 'react-dom'
import GlobalActions from '../actions/GlobalActions'
import GlobalStores,{ActionEvents,DataEvents} from '../stores/GlobalStores'

import {environment} from 'react-router-component'

import './MainPage.less'

class MainPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dribbbleContent:GlobalStores.getActionResult(ActionEvents.GET_DRIBBBLE_EVENT),
            height: this.calcWidth() * (3/4)
        }
        this.dribbbleContent = []
    }

    componentDidMount(){
        GlobalStores.addChangeListener(ActionEvents.GET_DRIBBBLE_EVENT,this.getDribbble.bind(this));
        window.onresize = this.resize.bind(this);
        if(!this.state.dribbbleContent)GlobalActions.getDribbble();
        if(GlobalStores.getStoreData(DataEvents.SCROLL)){
            ReactDOM.findDOMNode(this.refs.page).scrollTop = GlobalStores.getStoreData(DataEvents.SCROLL)
        }
    }

    componentWillUnmount(){
        GlobalStores.removeWholeListeners()
    }

    getDribbble(){
        this.dribbbleContent = GlobalStores.getActionResult(ActionEvents.GET_DRIBBBLE_EVENT);
        this.loadImage();
        // this.setState({
        //     dribbbleContent:GlobalStores.getActionResult(ActionEvents.GET_DRIBBBLE_EVENT)
        // })
    }

    calcWidth(){
        let width = document.body.clientWidth;
        if(width <= 400){
            width = width
        }else if(width >= 800){
            width = width / 3
        }else{
            width = width /2
        }
        return width
    }
    resize(){

        this.setState({
            height: this.calcWidth() * (3/4)
        })
    }

    render(){
        return (
            <section ref="page" id="MainPage">
                {this.renderDribbble()}
                <div onClick={this.clickHandle.bind(this)}>button</div>
            </section>
        )
    }

    loadImage(){
        let content = this.dribbbleContent;
        let arr = [];
        let length = content.length;
        loadNew.bind(this,0)();
        function loadNew(i){
            let theImage = new Image();
            theImage.src = content[i].image.normal;
            theImage.onload = loadComplete.bind(this,content[i]);
            theImage.onerror = loadError.bind(this);
        }
        function loadError(){
            length --
        }
        function loadComplete(data){
            arr.push(data);
            if(arr.length % 2 == 0 || arr.length == length){
                this.setState({
                    dribbbleContent:arr
                })
            }
            if(arr.length != length)loadNew.bind(this,arr.length)()
        }
    }

    renderDribbble(){
        let dribbbleContent = this.state.dribbbleContent;
        let arr = [];
        if(dribbbleContent){
            for(let i in dribbbleContent){
                let each = dribbbleContent[i];
                let image = each.image.normal;
                let url = each.url.target;
                let bigImage = each.image.big;
                let dom = (
                    <div className="img-row"
                         key={arr.length} href={url}
                         onClick={this.clickHandle.bind(this,{url,bigImage})}
                         style={{
                            height:this.state.height
                         }}>
                        <img src={image} onload={this.loadImage} />
                        <span className="mask">{image.lastIndexOf('.gif') != -1 ? 'GIF':'PNG'}</span>
                    </div>
                );
                arr.push(dom)
            }
        }
        return arr
    }

    clickHandle(data){
        GlobalStores.setStoreData(DataEvents.SCROLL,ReactDOM.findDOMNode(this.refs.page).scrollTop);
        GlobalStores.setStoreData(DataEvents.DETAIL,data);
        environment.hashEnvironment.navigate('/SecondPage',{transitionName:'push-right'},function(err){})
    }
}

export default MainPage
