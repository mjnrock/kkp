import React from "react";
import { Card, Table, Image, Segment, Icon } from "semantic-ui-react";
import { Emoji } from "emoji-mart";

function PetCard(props) {
    const { info } = props;

    return (
        <Card>
            <Segment inverted style={{ marginBottom: 0 }}>
                <Image className="clipped" src={ `http://localhost:3001/img/${ info.image }` } width={ 300 } height={ 200 } centered />
            </Segment>            
            
            <Card.Content style={{ padding: 2, paddingTop: 14 }}>
                <Card.Header textAlign="center">
                    { info.name }
                </Card.Header>

                <Card.Description>
                    <Table definition style={{ borderRadius: 0 }}>
                        <Table.Body>
                            <Table.Row textAlign="center">
                                <Table.Cell width={2}>Type</Table.Cell>
                                <Table.Cell>
                                    <Emoji emoji={ info.detail.type === "cat" ? ":cat2:" : ":dog2:" } size={ 20 } native={ true } />
                                    <Icon name={ info.detail.sex === "male" ? "man" : "woman" } color={ info.detail.sex === "male" ? "blue" : "red" } size="large" />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Breed</Table.Cell>
                                <Table.Cell>{ info.detail.breed }</Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Weight</Table.Cell>
                                <Table.Cell>{ info.detail.weight }</Table.Cell>
                            </Table.Row>

                            <Table.Row textAlign="center">
                                <Table.Cell>Color</Table.Cell>
                                <Table.Cell>{ info.detail.color }</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PetCard;