import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { convertToObj } from './StringToJson/convertToObj'
import { Scatter } from 'react-chartjs-2';
import { DataManipulation } from './listData/DataManipulation';

function App() {
  const [data, setData] = useState([])
  const [dataManipulated,setDataManipulated] = useState([])
  const dragOver = (e) => {
    e.preventDefault();
  }
  const dragEnter = (e) => {
    e.preventDefault();
  }
  const dragLeave = (e) => {
    e.preventDefault();
  }
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result)
      var convertedObj = convertToObj(e.target.result)
      console.log(convertedObj)
      setData(convertedObj)
    }
    reader.readAsText(files[files.length - 1])

  }
  return (
    <div className="App bg-dark">
      {/**    
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}

      <Container>
        <Row className='bg-light'>{/**this is for input the data and general description */}
          <Col>
            <Row>
              <Col>
                <h1 style={{ textAlign: 'start' }} className='text-dark'>LIFS 5070 hw2 tools</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 style={{ textAlign: 'start' }} className='text-secondary'>Create by Dr_EdwardPCB</h4>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h6 style={{ textAlign: 'start' }} className='text-dark'>Description</h6>
                <p>The course LIFS 5070 in the Yr2020 fall semester require us to do homework provide by each instructor for every topics. The homework provide by Dr.ISHIBASHI toyotaka requires us to carryout data analysis on the prerunned optical tweezer and plot a DNA profile. and here is why this tools arise to help to finish the homwork</p>
              </Col>
              <Col>
                <h6 style={{ textAlign: 'start' }} className='text-dark'>Instruction</h6>
                <p>Simply drag the file into the drop zone and select the filter and decimate and the result will be plot at the lower part </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div style={{ borderStyle: "dashed", borderRadius: '10px', minWidth: '100%', borderColor: '#999999', height: '100%' }}
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                >
                  <h3 className='text-muted'>drag here</h3>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ height: '50vh' }} className='bg-white'>{/**this is for data filtering and disamate */}
          <Col style={{maxHeight:'100%', height:'100%'}}>
            <DataManipulation data={data} setDataManipulated={setDataManipulated}/>
          </Col>
        </Row>
        <Row style={{ height: '100vh', aspectRatio: 1 }} className='bg-light'>{/** this is for plotting the data whenever there are changes */}
          <Col>
            <Scatter
              data={{
                datasets: [{
                  label: 'Nucleosome pulling dataset',
                  borderColor:'#ff9911',
                  backgroundColor: '#ff9911',
                  data: dataManipulated.map(e=>{return{
                    x:e.x,
                    y:e.y
                  }})
                },]
              }}
              width={'100%'}
              height={'100%'}
              options={{
                responsive: true,
                    title: {
                      display: true,
                      text: 'nucleosome pulling data'
                    },
                    tooltips: {
                      mode: 'index',
                      intersect: false,
                    },
                    hover: {
                      mode: 'nearest',
                      intersect: true
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: true,
                        position: 'bottom',
                        scaleLabel: {
                          display: true,
                          labelString: 'DNA extension(nm)'
                        }
                      },
                      y: {
                        display: true,
                        position: 'right',
                        scaleLabel: {
                          display: true,
                          labelString: 'force(pN)'
                        }
                      }
                    }
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
