import React from "react";
import { Card, Table, Image } from "semantic-ui-react";
import { Emoji } from "emoji-mart";

function PetCard(props) {
    const { info } = props;

    return (
        <Card>
            <Image className="clipped" src={ `http://localhost:3001/img/${ info.image }` } width={ 300 } height={ 200 } centered />
            
            <Card.Content>
                <Card.Header textAlign="center">
                    { info.name }
                </Card.Header>

                <Card.Description>
                    <Table definition>
                        <Table.Body>
                            <Table.Row textAlign="center">
                                <Table.Cell width={2}>Type</Table.Cell>
                                <Table.Cell>
                                    <Emoji emoji={ info.detail.type === "cat" ? ":cat2:" : ":dog2:" } size={ 20 } native={ true } />
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