import React from 'react';
import {Button, Modal, Form} from "react-bootstrap";

class DeleteComponent extends React.Component {
    state = {
        show: false,
        index: 'default'
    };

    onVideoDelete = () => {
        this.props.onVideoDelete()
    };


    handleShow = () => {
        let access = window.btoa(prompt('Пароль?', ''))
        if (access === 'eXRweWYuZ2Zoamt6') {
            this.setState({show: true});
        } else if (access === '') {
            alert('Вам нужно ввести пароль, чтобы получить доступ к этой функции')
        } else {
            alert('Пароль неверен. У Вас нет права удалять видео')
        }
    };

    handleClose = () => {
        this.setState({show: false});
    };

    handleDelete = () => {
        if (this.state.index !== 'defualt') {
            fetch("/api/videos", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({index: this.state.index})
            })
                .then(() => {
                    this.handleClose();
                    this.onVideoDelete();
                })
        } else {
            alert('Сперва выебрите видео')
        }
    };

    onChangeValue = (e) => {
        this.setState({index: e.target.value})
        console.log(this.state.index)
    };

    render() {
        return (
            <>
                <Button variant="outline-danger" size="sm" onClick={this.handleShow}>
                    Удалить видео
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление видео</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body modall">
                            <form>
                                <div className="form-group">
                                    <Form.Group controlId="videoChoise">
                                        <Form.Label>Выберите видео</Form.Label>
                                        <Form.Control as="select" onChange={this.onChangeValue}
                                                      value={this.state.index}>
                                            <option value='default'>***Выберите видео***</option>
                                            {this.props.videos.map((videoObj, index) =>
                                                <option key={index} value={index}>
                                                    {videoObj.description}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default DeleteComponent;