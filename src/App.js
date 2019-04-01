import React, {Component} from 'react';
import './App.css';
import YouTube from 'react-youtube';
import AddComponent from './AddComponent.js';
import DeleteComponent from './DeleteComponent.js';

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

        return (
            <div className='container-fluid App'>
                <div className='navbar navbar-dark bg-dark'>
                    <a className='navbar-brend'>
                        AVR Lessons
                    </a>
                    <form className='form-inline'>
                        <AddComponent onVideoAdd={this.loadVideos}/>
                        <DeleteComponent onVideoDelete={this.loadVideos} videos={this.state.videos}/>
                    </form>
                </div>
                <div className='row'>
                    <div className='col-md-2'>
                        {this.state.videos.map((videoObj, index) =>
                            <React.Fragment key={index}>
                                <button className='col myclass btn btn-primary'
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
            </div>
        );
    };
}

export default App;