import React from 'react';
import {Button, Modal} from "react-bootstrap";

class PassCheck extends React.Component {

    state = {
        pass: ''
    };

    onPassChange = (e) => {
        this.setState({pass: e.target.value})
    };

    handleConfirm = () => {
        let access = window.btoa(this.state.pass)
        if (access === 'eXRweWYuZ2Zoamt6') {
            this.handleClose()
            this.props.handleConfirm()
            this.setState({pass: ''})
        } else if (access === '') {
            alert('Вам нужно ввести пароль, чтобы получить доступ к этой функции')
        } else {
            alert('Пароль неверен. У Вас нет права добавлять видео')
            this.setState({pass: ''})
        }
    };

    handleClose = () => {
        this.props.closePassCheck();
    };

    onEnterKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleConfirm()
        }
    };


    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение прав</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body modall">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="pass" className="col-form-label">Введите пароль:</label>
                                    <input type="password" className="form-control" id="pass"
                                           placeholder='Пароль?' value={this.state.pass}
                                           onChange={this.onPassChange} onKeyPress={this.onEnterKeyPress}/>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.handleConfirm}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default PassCheck;