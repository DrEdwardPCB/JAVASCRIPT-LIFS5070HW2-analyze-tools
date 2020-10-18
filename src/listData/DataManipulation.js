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

    const [filterf, setFilterf] = useState(false)
    const [gaussianFilterf, setGaussianFilterf] = useState(false)
    const [filterHzf, setFilterHzf] = useState('10000')
    const [filterSigmaf, setFilterSigmaf] = useState('1')
    const [filterKernalf, setFilterKernalf] = useState('3')

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

        var currValf = dataForMan.map(e => 0-e.Y_force)
        if (filterf) {
            try {
                currValf = Lowpass(currValf, 0.05, parseFloat(filterHzf))
            } catch (err) {
                console.log(err)
            }
        }
        if (gaussianFilterf) {
            try {
                currValf = GaussianFilter(currValf, parseInt(filterKernalf), parseFloat(filterSigmaf))
            } catch (err) {
                console.log(err)
            }
        }
        if (decimate) {
            currVal = Decimate(currVal, parseInt(decimateVal))
            currValf = Decimate(currValf, parseInt(decimateVal))
        }
        setDataForMan(dataForMan.map((e, i) => {
            return {
                ...e,
                Processed_DNA_extension: currVal[i],
                Force: currValf[i]
            }
        }))

    }, [filter, decimate, gaussianFilter, filterHz, filterSigma, filterKernal, decimateVal, filterf, gaussianFilterf, filterHzf, filterSigmaf, filterKernalf])
    return (
        <div style={{ maxHeight: '100%', height: '100%' }}>
            <Row>
                <Col xs={2}></Col>
                <Col><h6>Step 1</h6></Col>
                <Col><h6>Step 2</h6></Col>
                <Col><h6>Step 3</h6></Col>
            </Row>
            <Row style={{ Height: '20%' }}>
                <Col>
                    <Form>
                        <Row style={{position:"relative"}}>
                            <Col xs={2}><h6>DNA_extension processing</h6></Col>
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
                                <Form.Label >Gaussian filter</Form.Label>
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
                            <Col className='mt-5'>
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
            <Row style={{ Height: '20%' }}>
                <Col>
                    <Form>
                        <Row>
                            <Col xs={2}><h6>force processing</h6></Col>
                            <Col>
                                <Form.Label >Low Pass filter(Hz)</Form.Label>
                                <Form.Check
                                    className='ml-3'
                                    inline type={'checkbox'}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setFilterf(e.target.checked)
                                    }}
                                ></Form.Check>
                                <Form.Control type="text" placeholder="10000"
                                    disabled={!filterf}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterHzf(e.target.value)
                                    }}
                                >
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label >Gaussian filter</Form.Label>
                                <Form.Check
                                    className='ml-3'
                                    inline type={'checkbox'}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setGaussianFilterf(e.target.checked)
                                    }}
                                ></Form.Check>
                                <Form.Control type="text" placeholder="kernal Size"
                                    disabled={!gaussianFilterf}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterKernalf(e.target.value)
                                    }}
                                >
                                </Form.Control>
                                <Form.Control type="text" placeholder="sigma"
                                    disabled={!gaussianFilterf}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setFilterSigmaf(e.target.value)
                                    }}
                                >
                                </Form.Control>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row style={{ maxHeight: '50%' }}>
                <Col style={{ overflowX: 'scroll' }} >
                    {/**
     * CycleCount:datapt[0],
                X_force:datapt[1],
                Y_force:datapt[2],
                A_distY:datapt[3],
                B_distY:datapt[4],
                */} <Row className='justify-content-around'>

                        <Col>CycleCount</Col>
                        <Col>X_force</Col>
                        <Col>Y_force</Col>
                        <Col>A_dist_Y</Col>
                        <Col>B_dist_Y</Col>
                        <Col>O_DNAextension</Col>
                        <Col>O_force</Col>
                        <Col>P_DNAextension</Col>
                        <Col>P_force</Col>
                    </Row>
                    <Row style={{ overflowY: 'scroll', maxHeight: '20vh' }}>
                        {dataForMan.map((e) => {
                            return (<DataItem CycleCount={e.CycleCount} X_force={e.X_force} Y_force={e.Y_force} A_distY={e.A_distY} B_distY={e.B_distY} Processed_DNA_extension={e.Processed_DNA_extension} Force={e.Force} />)
                        })}

                    </Row>
                </Col>
            </Row>
        </div>
    )
}