import React from "react";
import SearchBar from "./SearchBar";
import YouTube from "./apis/YouTube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
    state = {videos: [], selectedVideo: null};

    componentDidMount() {
        this.onTermSubmit('coding');
    };

    onTermSubmit = async (term) => {
        const response = await YouTube.get("/search", {
            params: {
                q: term,
            },
        });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };
//This is where the selected video will live
    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;
