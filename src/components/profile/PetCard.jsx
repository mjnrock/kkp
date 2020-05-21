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
                    <Table definition style={{ borderRadius: 0 }}>
                        <Table.Body>
                            <Table.Row textAlign="center">
                                <Table.Cell width={2}>Type</Table.Cell>
                                <Table.Cell>
                                    <Emoji emoji={ entity.detail.type === "cat" ? ":cat2:" : ":dog2:" } size={ 20 } native={ true } />
                                    <Icon name={ entity.detail.sex === "male" ? "man" : "woman" } color={ entity.detail.sex === "male" ? "blue" : "red" } size="large" />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Breed</Table.Cell>
                                <Table.Cell>{ entity.detail.breed }</Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Weight</Table.Cell>
                                <Table.Cell>{ entity.detail.weight }</Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Color</Table.Cell>
                                <Table.Cell>{ entity.detail.color }</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PetCard;