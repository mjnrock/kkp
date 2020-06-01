import React from "react";
import { Input, Table, Icon, Button } from "semantic-ui-react";
import { useState } from "react";

const Module = "text";

function TextToolbar(props) {
    const [ size, setSize ] = useState(3);
    const [ color, setColor ] = useState(5);

    return (
        <>
            <Button
                color="orange"
                inverted
                onClick={ e => props.onAction(Module, "insert") }
            >Insert</Button>

            <Table definition color="orange">
                <Table.Body>
                    <Table.Row textAlign="center">
                        <Table.Cell width={ 3 }>Align</Table.Cell>
                        <Table.Cell width={ 13 }>
                            <Button.Group widths={ 4 }>
                                <Button icon color="orange" onClick={ e => props.onAction(Module, "align", "left") }>
                                    <Icon name="align left" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "align", "center") }>
                                    <Icon name="align center" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "align", "right") }>
                                    <Icon name="align right" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "align", "justify") }>
                                    <Icon name="align justify" />
                                </Button>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row textAlign="center">
                        <Table.Cell width={ 3 }>Style</Table.Cell>
                        <Table.Cell width={ 13 }>
                            <Button.Group widths={ 4 }>
                                <Button icon color="orange" onClick={ e => props.onAction(Module, "style", "bold") }>
                                    <Icon name="bold" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "style", "italic") }>
                                    <Icon name="italic" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "style", "underline") }>
                                    <Icon name="underline" />
                                </Button>
                                <Button icon basic color="orange" onClick={ e => props.onAction(Module, "style", "strikethrough") }>
                                    <Icon name="strikethrough" />
                                </Button>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row textAlign="center">
                        <Table.Cell width={ 3 }>Size</Table.Cell>
                        <Table.Cell width={ 10 }>
                            <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ size } onChange={ e => {
                                props.onAction(Module, "size", e.target.value);
                                setSize(e.target.value);
                            }} />
                        </Table.Cell>
                        <Table.Cell width={ 3 }>{ size }</Table.Cell>
                    </Table.Row>

                    <Table.Row textAlign="center">
                        <Table.Cell width={ 3 }>Color</Table.Cell>
                        <Table.Cell width={ 10 }>
                            <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ color } onChange={ e => {
                                props.onAction(Module, "color", e.target.value);
                                setColor(e.target.value);
                            }} />
                        </Table.Cell>
                        <Table.Cell width={ 3 }>{ color }</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
}

export default TextToolbar;