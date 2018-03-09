import React, {Component} from 'react';
import { VictoryLine, VictoryLegend, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';


class Chart extends Component{
    render(){

        return (
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                width={600}
                height={400}>
                <VictoryLegend x={200} y={0}
                  title={this.props.title}
                  centerTitle
                  orientation="horizontal"
                  gutter={20}
                  style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                  data={[
                    { name: "x - время" }, { name: "y - цена" }
                  ]}
                />
                <VictoryLine
                    data={this.props.data}
                    animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                    }}/>
            </VictoryChart>
        );
    }
}

export default Chart;