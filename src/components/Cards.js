import React, { Component } from 'react';
import MyCard from './MyCard';
import { Card, Button } from 'semantic-ui-react';
import '../css/Cards.css';
import axios from 'axios';
import CardModal from './CardModal';

class Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            note: null,
            notes: null
        }
    }

    componentDidMount() {
        this.updateNotes();
    }

    updateNotes() {
        axios.get('http://localhost:8000/notes')
            .then(res => this.setState({notes: res.data}))
            .catch((err) => console.log(err))
    }

    handleAdd = () => {
        this.setState({showModal: true})
    };

    createNote = (data) => {
        this.setState({
            showModal: false,
            note: null
        });
        axios.post('http://localhost:8000/note', data)
            .then(() => this.updateNotes())
            .catch((err) => console.log(err))
    };


    handleEdit = (e) => {
        let note = e.target.dataset.note;
        note = JSON.parse(note);
        this.setState({showModal: true, note: note})
    };

    editNote = (data, id) => {
        this.setState({
            showModal: false,
            note: null
        });
        axios.put('http://localhost:8000/note/' + id, data)
            .then(() => this.updateNotes())
            .catch((err) => console.log(err))
    };

    handleDelete = (e) => {
        const id = e.target.dataset.noteid;
        axios.delete('http://localhost:8000/note/' + id)
            .then(() => this.updateNotes())
            .catch((err) => console.log(err))
    };

    onModalClose = () => {
        this.setState({showModal: false, note: null})
    };


    render() {
        const { note, showModal, notes } = this.state;
        if (!notes) return null;

        let mappedNotes = notes.map((note, i) => {
            note.title = note.title || '';
            return <MyCard onEdit={this.handleEdit} onDelete={this.handleDelete} data={note} key={i}/>;
        });

        return(
            <div>
                <Card.Group>
                    {mappedNotes}
                    <div className="cards-button-wrapper">
                        <Button className="cards-button" onClick={this.handleAdd}>Add note</Button>
                    </div>
                </Card.Group>
                <CardModal
                    showModal={showModal}
                    note={note}
                    onClose={this.onModalClose}
                    editNote={this.editNote}
                    createNote={this.createNote}/>
            </div>
        );
    }
}

export default Cards;