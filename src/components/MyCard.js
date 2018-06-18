import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class MyCard extends Component {
    render() {
        const { data, onEdit, onDelete } = this.props;
        const jsonData = JSON.stringify(data);

        return(
            <Card>
                <Card.Content>
                    <Card.Header>
                        {data.title || 'No title'}
                    </Card.Header>
                    <Card.Description>
                        {data.text}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={onEdit} data-note={jsonData}>Edit</Button>
                    <Button onClick={onDelete} data-noteid={data._id}>Delete</Button>
                </Card.Content>
            </Card>
        );
    }
}

export default MyCard;