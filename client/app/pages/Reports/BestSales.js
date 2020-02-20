import React, { Component } from "react";
import { Line, ChartData } from "react-chartjs-2";
import { month } from "./utils/dateMonth";
// import middleWare from "../../actions/middleWare";
import moment from "moment";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";

import axios from "../../../services/http";

const options = {
    scales: {
        height: 5
    }
};
//maintainAspectRatio: true,
// spanGaps: false,
// elements: {
//   line: {
//     tension: 0.000001
//   }
// },
// ,
//   plugins: {
//     filler: {
//       propagate: true
//     },
//     "samples-filler-analyser": {
//       target: "chart-analyser"
//     }
//   }
class BestSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: month,
            to: new Date(),
            products: [],
            dates: []
        };
    }




    dateToHandler = e => {
        this.setState({ to: e });
    };
    dateFromHandler = e => {
        this.setState({ from: e });
    };

    searchResult = e => {
        if (e)
            e.preventDefault();
        const to = moment(this.state.to).format("YYYY-MM-DD HH:mm:ss");
        const from = moment(this.state.from).format("YYYY-MM-DD HH:mm:ss");
        axios.get(`/reports/best-sales?from=${from}&to=${to}`).then(res => {
            this.setState({
                ...res.data
            })
        }).catch(err => {
            console.log({ err })
        })
        // this.props.dispatch(
        //     middleWare("reports").getReports("yes", to, from, "best-sales")
        // );
    };

    componentDidMount() {
        this.searchResult();
    }

    // UNSAFE_componentWillMount() {
    //     const to = moment(this.state.to).format("YYYY-MM-DD HH:mm:ss");
    //     const from = moment(this.state.from).format("YYYY-MM-DD HH:mm:ss");
    //     this.props.dispatch(
    //         middleWare("reports").getReports("yes", to, from, "best-sales")
    //     );
    // }

    // UNSAFE_componentWillReceiveProps(props) {
    //     if (props.reports.items) {
    //         const { dates, products } = props.reports.items;
    //         console.log(dates);
    //         this.setState({
    //             dates,
    //             products
    //         });
    //     }
    // }

    render() {
        window.chartColors = {
            red: "rgb(255, 99, 132)",
            orange: "rgb(255, 159, 64)",
            yellow: "rgb(255, 205, 86)",
            green: "rgb(75, 192, 192)",
            blue: "rgb(54, 162, 235)",
            purple: "rgb(153, 102, 255)",
            grey: "rgb(201, 203, 207)"
        };

        const utils = {
            transparentize: function (color, opacity) {
                var alpha = opacity === undefined ? 0.5 : 1 - opacity;
                return Color(color)
                    .alpha(alpha)
                    .rgbString();
            }
        };
        const presets = window.chartColors;
        console.log(this.state.dates);
        const data = {
            labels: this.state.dates,
            datasets: this.state.products
        };
        return (
            <React.Fragment>
                <div className="d-flex">
                    <form onSubmit={this.searchResult} className="form-inline">
                        <DatePicker
                            selected={this.state.from}
                            onChange={this.dateFromHandler}
                            // dateFormat="YYYY-MM-DD"
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                        />

                        <DatePicker
                            selected={this.state.to}
                            onChange={this.dateToHandler}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm:ss aa"
                            timeCaption="time"
                        />
                        {/* <input type="date" className="date" name="from" onChange={this.dateHandler} />
                    <input type="date" className="date" name="to" onChange={this.dateHandler} /> */}
                        <button className="submit">Search</button>
                    </form>
                    {/* <button className="btn btn-primary">
                        <ReactToPrint
                            trigger={() => <a href="#">Print this out!</a>}
                            content={() => this.componentRef}
                        />
                    </button> */}
                </div>
                {this.state.products.length !== 0 ? (
                    <Line data={data} options={options} />
                ) : (
                        <div>LOADING</div>
                    )}
            </React.Fragment>
        );
    }
}

// export default BestSales;

// import React from "react";

// let Chart = require("chart.js");
// import { Bar, Line } from "react-chartjs-2";
// class BestSales extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     const node = this.node;
//     window.chartColors = {
//       red: "rgb(255, 99, 132)",
//       orange: "rgb(255, 159, 64)",
//       yellow: "rgb(255, 205, 86)",
//       green: "rgb(75, 192, 192)",
//       blue: "rgb(54, 162, 235)",
//       purple: "rgb(153, 102, 255)",
//       grey: "rgb(201, 203, 207)"
//     };

//     const utils = {
//       transparentize: function(color, opacity) {
//         var alpha = opacity === undefined ? 0.5 : 1 - opacity;
//         return Color(color)
//           .alpha(alpha)
//           .rgbString();
//       }
//     };

//     const presets = window.chartColors;
//     var myChart = new Chart(node, {
//       type: "line",
//       data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [
//           {
//             backgroundColor: utils.transparentize(presets.red),
//             borderColor: "black",
//             data: [53, 87, 35, 89, 24],
//             label: "Red",
//             fill: 1
//           },
//           {
//             backgroundColor: utils.transparentize(presets.blue),
//             borderColor: "Blue",
//             data: [53, 87, 35, 89, 24],
//             label: "Blue",
//             fill: "-1"
//           },
//           {
//             backgroundColor: utils.transparentize(presets.yellow),
//             borderColor: "Yellow",
//             data: [53, 87, 35, 89, 24],
//             label: "Yellow",
//             fill: "-1"
//           },
//           {
//             backgroundColor: utils.transparentize(presets.green),
//             borderColor: "Green",
//             data: [53, 87, 35, 89, 24],
//             label: "Green",
//             fill: 1
//           },
//           {
//             backgroundColor: utils.transparentize(presets.purple),
//             borderColor: "Purple",
//             data: [53, 87, 35, 89, 24],
//             label: "Purple",
//             fill: "-1"
//           },
//           {
//             backgroundColor: utils.transparentize(presets.orange),
//             borderColor: "Orange",
//             data: [53, 87, 35, 89, 24],
//             label: "Orange",
//             fill: 1
//           }
//         ]
//       },
//       options: {
//         maintainAspectRatio: false,
//         spanGaps: false,
//         elements: {
//           line: {
//             tension: 0.000001
//           }
//         },
//         scales: {
//           yAxes: [
//             {
//               stacked: true
//             }
//           ]
//         },
//         plugins: {
//           filler: {
//             propagate: false
//           },
//           "samples-filler-analyser": {
//             target: "chart-analyser"
//           }
//         }
//       }
//     });
//   }

//   render() {
//     return (
//       <div>
//         <canvas
//           style={{ width: 800, height: 300 }}
//           ref={node => (this.node = node)}
//         />
//       </div>
//     );
//   }
// }

const mapStateToProps = state => {
    return {
        reports: state.reports
    };
};

export default connect(mapStateToProps)(BestSales);

// {
//   backgroundColor: utils.transparentize(presets.red),
//   borderColor: "black",
//   data: [53, 87, 35, 89, 24],
//   label: "Red",
//   fill: 1
// },
// {
//   backgroundColor: utils.transparentize(presets.blue),
//   borderColor: "Blue",
//   data: [53, 87, 35, 89, 24],
//   label: "Blue",
//   fill: "-1"
// },
// {
//   backgroundColor: utils.transparentize(presets.yellow),
//   borderColor: "Yellow",
//   data: [53, 87, 35, 89, 24],
//   label: "Yellow",
//   fill: "-1"
// },
// {
//   backgroundColor: utils.transparentize(presets.green),
//   borderColor: "Green",
//   data: [53, 87, 35, 89, 24],
//   label: "Green",
//   fill: 1
// },
// {
//   backgroundColor: utils.transparentize(presets.purple),
//   borderColor: "Purple",
//   data: [53, 87, 35, 89, 24],
//   label: "Purple",
//   fill: "-1"
// },
// {
//   backgroundColor: utils.transparentize(presets.orange),
//   borderColor: "Orange",
//   data: [53, 87, 35, 89, 24],
//   label: "Orange",
//   fill: 1
// }
