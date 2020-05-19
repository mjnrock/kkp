import React, { useState, useEffect } from "react";
import { Container, Header, Grid, Divider, Image } from "semantic-ui-react";

function Album(props) {
    const [ fileNames, setFileNames ] = useState([]);

    useEffect(() => {
        fetch(`http://192.168.86.100:3001/album/${ props.albumId }`)
        .then(response => response.json())
        .then(setFileNames);
    // eslint-disable-next-line
    }, []);

    return (
        <Container style={{ marginTop: 30 }}>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>
                    Kiszka at the Beach
                    <Header as="h4" color="grey" textAlign="center">
                        <Header.Content>A Journey to Kiszka and Back</Header.Content>
                    </Header>
                </Header.Content>
            </Header>

            <Divider horizontal>Images</Divider>
            
            <Grid relaxed columns={ 4 }>
                {
                    fileNames.map(filename => (
                        <Grid.Column key={ filename }>
                            <Image src={ filename } />
                        </Grid.Column>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default Album;