import React, {Component} from 'react';
import './App.css';
import YouTube from 'react-youtube';
import AddComponent from './AddComponent.js';
import DeleteComponent from './DeleteComponent.js';
import {Navbar} from "react-bootstrap"

class App extends Component {

    state = {
        videoId: '',
        videos: []
    };

    componentDidMount() {
        this.loadVideos()
    };

    loadVideos = () => {
        fetch("/api/videos")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    videos: data
                });
            })
    };

    componentDidUpdate() {
        console.log("update")
    };

    onClickHandler = (videoId) => {
        this.setState({
            videoId: videoId
        })
    };

    render() {

        const opts = {
            //height: '56.25%',
            width: '100%',
            playerVars: {
                autoplay: 1
            }
        };
        
        /* eslint-disable */

        return (
            <div className='container-fluid App'>
                <nav className="navbar navbar-dark bg-dark">
                    <a className = "navbar-brand">
                        AVR Lessons
                    </a>
                    <form className='form-inline'>
                        <AddComponent onVideoAdd={this.loadVideos}/>
                        <DeleteComponent onVideoDelete={this.loadVideos} videos={this.state.videos}/>
                    </form>
                </nav>
                <div className='row'>
                    <div className='col-md-2'>
                        {this.state.videos.map((videoObj, index) =>
                            <React.Fragment key={index}>
                                <button className='col myclass btn btn-primary btn-sm'
                                        onClick={() => this.onClickHandler(videoObj.videoId)}>
                                    Начать урок
                                </button>
                                <p className='description'>{videoObj.description}</p>
                            </React.Fragment>
                        )}
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-7'>
                        <YouTube
                            videoId={this.state.videoId}
                            opts={opts}
                            className='video'
                        />
                    </div>
                </div>
                <Navbar sticky="bottom" bg="dark" variant="dark">
                    <Navbar.Text className = 'footer'>
                        Copyright © 2019 <a href="https://github.com/alexandreev1">Андреев Александр</a>
                    </Navbar.Text>
                </Navbar>
            </div>
        );
    };
}

export default App;