import React, { useContext } from "react";
import { Card, Header, Image, Segment, Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Context } from "./../../App";
import { Emoji } from "emoji-mart";

function typeSex(entity, sex) {
    let emoji;
    switch(entity.EntityType) {
        case "Cat":
            emoji = ":cat2:";
            break;
        case "Dog":
            emoji = ":dog2:";
            break;
        default:
            break;
    }

    let icon = "transgender alternate";
    let color = "yellow";
    switch(sex) {
        case "Female":
            icon = "woman";
            color = "red";
            break;
        case "Male":
            icon = "man";
            color = "blue";
            break;
        default:
            break;
    }

    return (
        <span>
            <Emoji emoji={ emoji } size={ 16 } native={ true } />
            <Icon name={ icon } color={ color } size="large" />
        </span>
    );
}

function PetCard(props) {
    const { config } = useContext(Context);
    const { entity } = props;

    const detail = Object.entries(entity.EntityDetail || {});

    return (
        <Card as={ Link } to={ `/profile/${ entity.EntityHandle }` } color="orange">
            <Segment inverted style={{ marginBottom: 0 }}>
                <Image className="clipped" src={ config.api.Image(`${ entity.EntityHandle }.jpg`) } width={ 300 } height={ 200 } centered />
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
                    {
                        detail.length ? (
                                <Table definition>
                                    <Table.Body>
                                        {
                                            detail.map(([ key, value ]) => {
                                                if(key === "sex") {
                                                    return (
                                                        <Table.Row key={ key } textAlign="center">
                                                            <Table.Cell>Type</Table.Cell>
                                                            <Table.Cell>{ typeSex(entity, value) }</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                }
                                                
                                                return (
                                                    <Table.Row key={ key } textAlign="center">
                                                        <Table.Cell>{ `${ key.charAt(0).toUpperCase() }${ key.slice(1) }` }</Table.Cell>
                                                        <Table.Cell>{ value }</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                        ) : null
                    }
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PetCard;