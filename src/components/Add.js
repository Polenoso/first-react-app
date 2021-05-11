import React, {Component} from 'react';
import {addVideo} from '../api';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            showSending: false,
            title: '',
            url: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return (event) => {
            this.setState({
                [field]: event.target.value
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { onClose } = this.props;
        this.setState({showSending: true});
        addVideo({
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            embed: this.state.url,
            thumbnail: this.state.url
        })
        .then(onClose(true))
        .catch(() => {
            this.setState({ 
                hasError: true,
                showSending: false })
        });
    }

    render() {
        const {onClose} = this.props;
        const { showSending, hasError, title, url, description } = this.state;
        return(
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose(false)}>&times;</span>
                { showSending && (<div className="success">Enviando</div>) }
                { hasError && (<div className="error"> Something went wrong</div>) }
                <h2>Introduce los datos del vídeo aquí</h2>
                <form>
                    <label>Título</label>
                    <input type="text" value={title} onChange={this.handleChange("title")} minLength="3" maxLength="200" required></input>
                    <label>Url</label>
                    <input type="url" value={url} onChange={this.handleChange("url")} minLength="3" maxLength="200" required></input>
                    <label>Descripción</label>
                    <textarea value={description} onChange={this.handleChange("description")}></textarea>
                    <input type="submit" onClick={this.handleSubmit} value="Submit" disabled={showSending}></input>
                </form>
            </div>
        </div>
        )
    }
 }

export default Add;