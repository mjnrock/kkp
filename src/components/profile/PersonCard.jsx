import React, { useContext } from "react";
import { Card, Header, Image, Segment, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Context } from "./../../App";

function PersonCard(props) {
    const { config } = useContext(Context);
    const { entity } = props;

    const detail = Object.entries(entity.EntityDetail || {});

    return (
        <Card as={ Link } to={ `/profile/${ entity.EntityHandle }` } color="green">
            <Segment inverted style={{ marginBottom: 0 }}>
                <Image className="clipped" src={ config.api.Image(`${ entity.EntityHandle }.jpg`) } width={ 300 } height={ 200 } centered />
            </Segment>            
            
            <Card.Content style={{ padding: 2, paddingTop: 14 }}>
                <Card.Header textAlign="center">
                    <Header as="h2" color="green" textAlign="center">
                        <Header.Content>
                            { entity.EntityName }
                            <Header as="h4" color="grey" textAlign="center">
                                <Header.Content>@{ entity.EntityHandle }</Header.Content>
                            </Header>
                        </Header.Content>
                    </Header>
                </Card.Header>

                <Card.Description>
                    {/* {
                        detail.length ? (
                                <Table definition>
                                    <Table.Body>
                                        {
                                            detail.map(([ key, value ]) => (
                                                <Table.Row key={ key } textAlign="center">
                                                    <Table.Cell>{ key }</Table.Cell>
                                                    <Table.Cell>{ value }</Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                        ) : null
                    } */}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PersonCard;