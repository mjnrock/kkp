import React, { Fragment, useContext } from "react";
import { Header, Divider, Icon, Card, Segment, Item, Accordion } from "semantic-ui-react";

import { Context } from "./../App";
import ImageBanner from "./../components/image/ImageBanner";
import PetCard from "../components/profile/PetCard";

const petInfo = [
    {
        image: "kiszka-1.jpg",
        name: "Kiszka",
        detail: {
            type: "cat",
            breed: "Domestic Medium Hair (DMH)",
            weight: "12 lbs.",
            color: "Calico",
        }
    },
    {
        image: "buddha-1.jpg",
        name: "Buddha",
        detail: {
            type: "cat",
            breed: "Domestic Short Hair (DSH)",
            weight: "9 lbs.",
            color: "Black",
        }
    },
    {
        image: "king-cavalier.jpg",
        name: "Margery Stuart Baxter",
        detail: {
            type: "dog",
            breed: "Cavalier King Charles Spaniel",
            weight: "16 lbs.",
            color: "Brown",
        }
    },
];

function Profile() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <Fragment>            
            <Segment basic>
                <Header as="h2" color="orange" textAlign="center">
                    <Header.Content>
                        { state.auth.first } { state.auth.last }
                        <Header as="h4" color="grey" textAlign="center">
                            <Header.Content>@{ state.auth.user }</Header.Content>
                        </Header>
                    </Header.Content>
                </Header>

                <ImageBanner name="profile-1.jpg" />

                <Accordion>
                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="lab" />
                                Bio
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <Item>
                            <Item.Content>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur laudantium officia nisi fugiat. Veniam, minus incidunt eum debitis soluta fugiat. Tempore nisi odit tenetur natus architecto, ducimus nam saepe quasi!
                                Deserunt fugit dolorem odit dolor architecto, sed illum libero animi incidunt quos reiciendis ducimus tenetur minus? Dolore magnam asperiores quibusdam maxime quisquam nemo et atque? Minima impedit rem sit ad.
                                Recusandae similique tempora quo repellat commodi quidem iure quos reiciendis dignissimos sunt ipsam, pariatur in iste vitae quia quisquam corrupti? Aspernatur fuga molestiae ut veniam aliquam ad natus inventore laboriosam.
                            </Item.Content>
                        </Item>
                    </Accordion.Content>

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="paw" />
                                Family Members
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <Card.Group itemsPerRow={ 3 } >
                            {
                                petInfo.map(info => (
                                    <PetCard
                                        key={ info.name }
                                        info={ info }
                                    />
                                ))
                            }
                        </Card.Group>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        </Fragment>
    );
}

export default Profile;