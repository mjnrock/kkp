import React from "react";
import { Card, Table, Image, Segment, Icon } from "semantic-ui-react";
import { Emoji } from "emoji-mart";

function PetCard(props) {
    const { entity } = props;

    return (
        <Card>
            <Segment inverted style={{ marginBottom: 0 }}>
                <Image className="clipped" src={ `http://192.168.86.100:3001/img/${ entity.image }` } width={ 300 } height={ 200 } centered />
            </Segment>            
            
            <Card.Content style={{ padding: 2, paddingTop: 14 }}>
                <Card.Header textAlign="center">
                    { entity.name }
                </Card.Header>

                <Card.Description>
                    <pre>{ JSON.stringify(entity, null, 2) }</pre>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PetCard;