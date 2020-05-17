import React from 'react';
import ApexChart from 'react-apexcharts';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [this.props.breed, this.props.height, this.props.weight, this.props.pop, this.props.personality, this.props.behavior],
          options: {
            chart: {
              width: 380,
              type: 'donut',
            },
            labels: ["Breed", "Height", "Weight", "Popularity", "Personality", "Behavior"],
            theme: {
                palette: 'palette4'
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  show: false
                }
              }
            }],
            legend: {
              position: 'right',
              offsetY: 0,
              height: 230,
            }
          },
        };
        this.updateSeries = this.updateSeries.bind(this);
      }

      updateSeries(newSeries) {
        this.setState({series: newSeries});
      }

    render() {
        return(
            <>
                <ApexChart options={this.state.options} series={this.state.series} type="donut" width={380} />
            </>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateSeries([this.props.breed, this.props.height, this.props.weight, this.props.pop, this.props.personality, this.props.behavior]));
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
}

export default App;