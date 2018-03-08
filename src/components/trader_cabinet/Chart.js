import React, {Component} from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';


const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 10000},
  {quarter: 5, earnings: 13000},
  {quarter: 6, earnings: 16500},
  {quarter: 7, earnings: 14250},
  {quarter: 8, earnings: 11000},
  {quarter: 9, earnings: 13000},
  {quarter: 10, earnings: 16500},
  {quarter: 11, earnings: 14250},
  {quarter: 12, earnings: 11000},
  {quarter: 13, earnings: 13000},
  {quarter: 14, earnings: 16500},
  {quarter: 15, earnings: 14250},
  {quarter: 16, earnings: 12000},
  {quarter: 17, earnings: 13000},
  {quarter: 18, earnings: 16500},
  {quarter: 19, earnings: 14250},
  {quarter: 20, earnings: 12000},
  {quarter: 21, earnings: 13000},
  {quarter: 22, earnings: 16500},
  {quarter: 23, earnings: 14250},
  {quarter: 24, earnings: 1000},

];


class Chart extends Component{
    render(){
        return (
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                width={600}
                height={400}>
                <VictoryLine
                    data={data}
                    x="quarter"
                    y="earnings"
                    animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                    }}/>
            </VictoryChart>
        );
    }
}

export default Chart;