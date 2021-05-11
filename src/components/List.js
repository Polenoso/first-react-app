import React, { Component } from 'react';
import { getVideos } from '../api';
import Add from './Add';
import Header from './Header';
import Item from './Item';
import Loading from './Loading';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            videos: null,
            showAdd: false
        }
    }
    componentDidMount() {
        this.fetchVideos();
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    fetchVideos() {
        this.setState({isLoading:true});
        getVideos().then((videos) => {
            this.setState({
                isLoading: false,
                videos: videos 
            });
        });
    }
    
    handleCloseAdd(reload) {
        return () => {
            if(reload) {
                this.fetchVideos();
             }
           this.setState({showAdd: false})
        }
    }

    handleAdd(e) {
        e.preventDefault();
        this.setState({showAdd: true});
    }

    render() { 
        const { videos, isLoading } = this.state;
        if(isLoading) {
            return <Loading message="Loading ..."></Loading>;
        }
        
        return (<React.Fragment>
            <Header onClickAdd={this.handleAdd} />
            <div className="container">
                <div className="grid-container">
                    {
                        videos && videos.map((video, i) => {
                            return (<Item key={i} data={video}/>)
                        })
                    }
                </div>
            </div>
            {this.state.showAdd && <Add onClose={this.handleCloseAdd}/>}
        </React.Fragment>);
    }
}

export default List;