import React from 'react';
import Aux from '../../constants/hoc/_Aux';
import { Card } from "react-bootstrap";

const CustomCard = (props) => {
    return (
        <Aux>
            <Card color={props.color}>
                {props.title &&
                    <Card.Header>
                        <Card.Title as="h5">{props.title}</Card.Title>
                    </Card.Header>
                }
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>

        </Aux>
    );
}

export default CustomCard;