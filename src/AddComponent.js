import React from 'react';
import {Button, Modal} from "react-bootstrap";


class AddComponent extends React.Component {

    state = {
        show: false,
        videoId: '',
        description: '',
        //buttonName: ''
    };

    onVideoAdd = () => {
        this.props.onVideoAdd();
    };

    handleClose = () => {
        this.setState({show: false, videoId: '', description: ''/*, buttonName: ''*/});
    };

    handleShow = () => {
        let access = window.btoa(prompt('Пароль?', ''))
        if (access === 'eXRweWYuZ2Zoamt6') {
            this.setState({show: true});
        } else if (access === '') {
            alert('Вам нужно ввести пароль, чтобы получить доступ к этой функции')
        } else {
            alert('Пароль неверен. У Вас нет права добавлять видео')
        }
    };

    handlePost = () => {
        if (this.state.videoId.length && this.state.description.length /*&& this.state.buttonName.length*/) {
            fetch("/api/videos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    videoId: this.state.videoId,
                    description: this.state.description,
                    //name: this.state.buttonName
                })
            })
                .then(() => {
                    this.handleClose();
                    this.onVideoAdd();
                })
        } else {
            alert('Не заполнены необходимые поля')
        }
    };

    onIdChange = (e) => {
        this.setState({videoId: e.target.value})
    };

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    };

    /*onBtnNameChange = (e) => {
        this.setState({buttonName: e.target.value})
    };*/

    render() {
        return (
            <>
                <Button className='button' size="sm" variant="outline-primary" onClick={this.handleShow}>
                    Добавить видео
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Новое видео</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body modall">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="videoID" className="col-form-label">Введите ID:</label>
                                    <input type="text" className="form-control" id="videoID"
                                           placeholder='Video ID' value={this.state.videoId}
                                           onChange={this.onIdChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="col-form-label">Введите описание
                                        видео:</label>
                                    <input type="text" className="form-control" id="description"
                                           placeholder='Описание' value={this.state.description}
                                           onChange={this.onDescriptionChange}/>
                                </div>
                                {/*
                                <div className="form-group">
                                    <label htmlFor="button-name" className="col-form-label">"Имя" кнопки:</label>
                                    <input type="text" className="form-control" id="button-name"
                                           placeholder='"Имя" кнопки' value={this.state.buttonName}
                                           onChange={this.onBtnNameChange}/>
                                </div>*/}
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.handlePost}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AddComponent;