/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';

const initialState = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
        {
            label: 'Input Voltage',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1,
            pointBackgroundColor: '#36A2EB',
            pointHoverRadius: 3,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 5,
            data: [65, 59, 80, 81, 56, 55, 40, 67, 70],
        },
    ],
};

const options = {
    scales: {
        xAxes: [
            {
                gridLines: {},
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {},
                ticks: {
                    fontColor: 'rgb(204, 204, 204)',
                },
            },
        ],
    },
};

class LiveUsageGraph extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            data: initialState,
            intervalId: null,
        };
    }

    componentDidMount() {
        const _this = this;

        const intervalId = setInterval(() => {
            const oldDataSet = _this.state.data.datasets[0];
            const newData = [];

            for (let x = 0; x < _this.state.data.labels.length; x += 1) {
                newData.push(Math.floor(Math.random() * 100));
            }

            const newDataSet = {
                ...oldDataSet,
            };

            newDataSet.data = newData;

            const oldDataSet2 = _this.state.data.datasets[1];
            const newData2 = [];

            for (let x = 0; x < _this.state.data.labels.length; x += 1) {
                newData2.push(Math.floor(Math.random() * 100));
            }

            const newDataSet2 = {
                ...oldDataSet2,
            };

            newDataSet2.data = newData2;

            const newState = {
                ...initialState,
                data: {
                    datasets: [newDataSet],
                    labels: _this.state.data.labels,
                },
            };

            _this.setState(newState);
        }, 4000);

        this.setState({intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const {t} = this.props;

        return (
            <Col md={12} lg={12} xl={6}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">{t('Input Live Usage')}</h5>
                        </div>
                        <Line data={this.state.data} options={options}/>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default (LiveUsageGraph);
