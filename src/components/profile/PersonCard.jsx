import React from "react";
import { Card, Header, Image, Segment } from "semantic-ui-react";

function PersonCard(props) {
    const { entity } = props;

    return (
        <Card>
            <Segment inverted style={{ marginBottom: 0 }}>
                <Image className="clipped" src={ `http://192.168.86.100:3001/img/${ entity.image }` } width={ 300 } height={ 200 } centered />
            </Segment>            
            
            <Card.Content style={{ padding: 2, paddingTop: 14 }}>
                <Card.Header textAlign="center">
                    <Header as="h2" color="orange" textAlign="center">
                        <Header.Content>
                            { entity.EntityName }
                            <Header as="h4" color="grey" textAlign="center">
                                <Header.Content>@{ entity.EntityHandle }</Header.Content>
                            </Header>
                        </Header.Content>
                    </Header>
                </Card.Header>

                <Card.Description>
                    { entity.EntityDetail }
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PersonCard;