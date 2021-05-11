import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getVideoDetail } from '../api'
import Video from './Video';
import Loading from './Loading';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        const { match } = this.props;
        this.setState( { isLoading: true });
        getVideoDetail({ idVideo: match.params.id })
        .then(data => this.setState({ video: data, isLoading: false }))
        .catch(err => this.setState({ error: err, isLoading: false }));
    }

    render() {
        const { match } = this.props;
        const { isLoading, video, error } = this.state;
        if (error) return <p className="error">{error.message}</p>;
        if (isLoading || !video) return <Loading message={`Cargando video (#${match.params.id}) ... `}/>;
        return<React.Fragment>
            <div className="detail-container">
                <Video title={video.title} embed={video.embed}/>
                <div className="detail-summary">
                    <h2 className="detail-title">{video.title}</h2>
                    <p>{video.description}</p>
                </div>
            </div>
            </React.Fragment>
    }
}

export default withRouter(Detail);