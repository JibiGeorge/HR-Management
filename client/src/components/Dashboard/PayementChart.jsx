import React from 'react'
import Chart from 'react-apexcharts'

const PayementChart = ({ payementChartData }) => {
    const data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '14px',
                        colors: '#bbc4cc',
                        fontWeight: '700'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        colors: '#bbc4cc',
                        fontWeight: '700'
                    }
                }
            }
        },
        series: [
            {
                name: "series-1",
                data: [],
            },
        ]
    }
    // Sort the dynamicData array by month
    payementChartData.sort((a, b) => {
        const [aMonth, aYear] = a.month.split('-');
        const [bMonth, bYear] = b.month.split('-');
        const aDate = new Date(`${aYear}-${aMonth}-01`);
        const bDate = new Date(`${bYear}-${bMonth}-01`);
        return aDate - bDate;
    });
    // Populate x-axis categories and series data
    data.options.xaxis.categories = payementChartData.map(d => d.month);
    data.series[0].data = payementChartData.map(d => d.amount);
    return (
        <div className="col-lg-6 d-flex">
            <div className="card">
                <Chart
                    options={data.options}
                    series={data.series}
                    type="bar"
                    width="100%"
                />
            </div>
        </div>
    )
}

export default PayementChart