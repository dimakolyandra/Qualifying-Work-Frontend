import React, {Component} from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';


class Chart extends Component{
    render(){

        return (
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                width={600}
                height={400}>
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