import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            id: null
        };
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.note) return;
        const {note} = nextProps;
        this.setState({
            title: note.title || '',
            text: note.text || '',
            id: note._id
        });
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSave() {
        const {title, text, id} = this.state;
        const {editNote, createNote} = this.props;

        const data = {
            title: title,
            text: text
        };

        if (id) {
            editNote(data, id);
        } else {
            createNote(data);
        }
    };

    render() {
        const {showModal, onClose} = this.props;
        const { text, title } = this.state;

        return (
            <Modal open={showModal} onClose={onClose}>
                <Form style={{padding: 20}}>
                    <Form.Field>
                        <input placeholder='Title' name='title' value={title} onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Text' name='text' value={text} onChange={this.onChange}/>
                    </Form.Field>
                    <Button onClick={this.handleSave}>Save</Button>
                </Form>
            </Modal>
        );
    }
}
export default CardModal;