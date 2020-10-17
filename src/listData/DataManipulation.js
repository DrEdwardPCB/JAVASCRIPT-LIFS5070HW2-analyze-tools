import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { DataItem } from './DataItem'
import { GaussianFilter } from '../filterMethod/Gaussian'
import { Lowpass } from '../filterMethod/lowpass'
import { Decimate } from '../filterMethod/Decimate'
export const DataManipulation = (props) => {
    const [dataForMan, setDataForMan] = useState([])
    useEffect(() => {
        var processedData = props.data.map(e => {
            return {
                ...e,
                DNA_extension: (parseFloat(e.A_distY) + parseFloat(e.B_distY)) / 2 + (parseFloat(e.Y_force) / 0.21),
                Force: 0 - parseFloat(e.Y_force),
                Processed_DNA_extension: (parseFloat(e.A_distY) + parseFloat(e.B_distY)) / 2 + (parseFloat(e.Y_force) / 0.21)
            }
        })
        setDataForMan(processedData)
    }, [props.data])
    useEffect(() => {
        props.setDataManipulated(dataForMan.filter(e => !isNaN(e.Processed_DNA_extension)).map(e => {
            return {
                x: e.Processed_DNA_extension, y: e.Force
            }
        }))
    }, [dataForMan])

    const [filter, setFilter] = useState(false)
    const [decimate, setDecimate] = useState(false)
    const [gaussianFilter, setGaussianFilter] = useState(false)
    const [filterHz, setFilterHz] = useState('10000')
    const [filterSigma, setFilterSigma] = useState('1')
    const [filterKernal, setFilterKernal] = useState('3')
    const [decimateVal, setDecimateVal] = useState('10')

    useEffect(() => {
        var currVal = dataForMan.map(e => e.DNA_extension)
        if (filter) {
            try {
                currVal = Lowpass(currVal, 0.05, parseFloat(filterHz))
            } catch (err) {
                console.log(err)
            }
        }
        if (gaussianFilter) {
            try {
                currVal = GaussianFilter(currVal, parseInt(filterKernal), parseFloat(filterSigma))
            } catch (err) {
                console.log(err)
            }
        }
        if (decimate) {
            currVal = Decimate(currVal, parseInt(decimateVal))
        }
        setDataForMan(dataForMan.map((e, i) => {
            return {
                ...e,
                Processed_DNA_extension: currVal[i]
            }
        }))

    }, [filter, decimate, gaussianFilter, filterHz, filterSigma, filterKernal, decimateVal])
    return (
        <div style={{ maxHeight: '100%', height: '100%' }}>
            <Row style={{ Height: '20%' }}>
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label >Low Pass filter(Hz)</Form.Label>
                                <Form.Check
                                    className='ml-3'
                                    inline type={'checkbox'}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setFilter(e.target.checked)
                                    }}
                                ></Form.Check>
                                <Form.Control type="text" placeholder="10000"
                                    disabled={!filter}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterHz(e.target.value)
                                    }}
                                >
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label >Gaussian filter(Hz)</Form.Label>
                                <Form.Check
                                    className='ml-3'
                                    inline type={'checkbox'}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setGaussianFilter(e.target.checked)
                                    }}
                                ></Form.Check>
                                <Form.Control type="text" placeholder="kernal Size"
                                    disabled={!gaussianFilter}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterKernal(e.target.value)
                                    }}
                                >
                                </Form.Control>
                                <Form.Control type="text" placeholder="sigma"
                                    disabled={!gaussianFilter}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterSigma(e.target.value)
                                    }}
                                >
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label >decimate</Form.Label>
                                <Form.Check className='ml-3'
                                    inline type={'checkbox'}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setDecimate(e.target.checked)
                                    }}
                                ></Form.Check>
                                <Form.Control type="text" placeholder="10"
                                    disabled={!decimate}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setDecimateVal(e.target.value)
                                    }}>

                                </Form.Control>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row style={{ overflowY: 'scroll', maxHeight: '80%' }}>
                <Col >
                    {/**
     * CycleCount:datapt[0],
                X_force:datapt[1],
                Y_force:datapt[2],
                A_distY:datapt[3],
                B_distY:datapt[4],
                */}
                    {dataForMan.map((e) => {
                        return (<DataItem CycleCount={e.CycleCount} X_force={e.X_force} Y_force={e.Y_force} A_distY={e.A_distY} B_distY={e.B_distY} Processed_DNA_extension={e.Processed_DNA_extension} />)
                    })}
                </Col>
            </Row>
        </div>
    )
}