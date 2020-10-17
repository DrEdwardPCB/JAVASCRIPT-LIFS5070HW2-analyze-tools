import React,{useState, useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
export const DataItem=(props)=>{
    /**
     * CycleCount:datapt[0],
                X_force:datapt[1],
                Y_force:datapt[2],
                A_distY:datapt[3],
                B_distY:datapt[4],
     */
    return(
        <Row>
            <Col>
                <p>{props.CycleCount}</p>
            </Col>
            <Col>
                <p>{props.X_force}</p>
            </Col>
            <Col>
                <p>{props.Y_force}</p>
            </Col>
            <Col>
                <p>{props.A_distY}</p>
            </Col>
            <Col>
                <p>{props.B_distY}</p>
            </Col>
            <Col>
                <p>{(parseFloat(props.A_distY)+parseFloat(props.B_distY))/2+(parseFloat(props.Y_force)/0.21)}</p>
            </Col>
            <Col>
                <p>{0-parseFloat(props.Y_force)}</p>
            </Col>
            <Col>
                <p>{props.Processed_DNA_extension}</p>
            </Col>
        </Row>
    )
}