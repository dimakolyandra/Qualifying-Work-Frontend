import React, {Component} from 'react';
import { VictoryLine, VictoryLegend, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import {eur, usd, gbr, cny} from '../../mockedData/currencyData';


class Chart extends Component{

      constructor(props){
        console.log("!!!!!!!!");
        super(props);
        this.getData = this.getData.bind(this);
        // this.data = [{x: 0, y: 0}];
        this.state = {
          intervalId: 0,
          data: this.props.getData()
        };
        console.log(this.state.data);
      }

    //   getChartsData(currId){
    //     console.log(this.state.data);
    //     switch(currId){
    //       case 'eur':
    //         // var xhr = new XMLHttpRequest();
    //         // var date =  new Date().getTime();
    //         // console.log("DATE:" + date);
    //         // var req = 'https://quotes.fxclub.org/quotes.json?_=' + date;
    //         // xhr.open('GET', 'https://ru.investing.com/currencies/eur-rub-advanced-chart', false);
    //         // xhr.setRequestHeader("Content-type", "application/json");
    //         // xhr.send(null);
    //         // console.log(xhr.responseText);
    //         // var resp = JSON.parse(xhr.responseText);
    //         // if(resp.status != 'ok'){
    //         //     alert(resp.status)
    //         //     return;
    //         // }

    //         var xhr = new XMLHttpRequest();
    //         xhr.open('POST', '/currency/quotations', false);
    //         xhr.setRequestHeader("Content-type", "application/json");
    //         xhr.send(JSON.stringify({
    //           currId: currId}));
    //         var resp = JSON.parse(xhr.responseText);
    //         if(resp.status != 'ok'){
    //             alert(resp.status)
    //             return;
    //         }
    //         var y = resp.y;
    //         var timeInMs = new Date();
    //         var date = timeInMs.getHours()+":"+timeInMs.getMinutes()+":"+timeInMs.getSeconds();
    //         if (this.state.data){
    //           this.state.data.push({x: date, y: y});
    //         }
    //         else{
    //           this.state.data = [];
    //         }
    //         this.setState({data: this.state.data});
    //         if (this.state.data.length > 10){
    //           this.state.data.splice(0, 1);
    //         }
    //         break;
    //       case 'usd':
    //         // data = usd;
    //         break;
    //       case 'gbr':
    //         // data = gbr;
    //         break;
    //       case 'cny':
    //         // data = cny;
    //         break;
    //   }
    //       // return this.data;
    // }

    getData(){
      console.log("CHARTS:" + this.state.data);
      this.setState({data:this.props.getData()});
    }

    componentDidMount(){
      // this.getChartsData(this.props.currId);
      // this.getChartsData(this.props.currId);
      var intervalId = setInterval(this.getData, 3000);
      // var intervalId = setInterval(() => {this.props.getChartsData(this.props.currId)}, 3000);
      this.setState({intervalId: this.state.intervalId++});
    }

    componentWillUmount(){
      this.props.setQuotes(this.state.data)
      clearInterval(this.state.intervalId);
    }

    render(){
      // var data = this.getChartsData(this.props.currId);
      // setInterval(this.getChartsData(this.props.currId), 2000);
        // if (this.state.data.length == 0){
        //   return;
        // }
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
                    data={this.state.data}
                    animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                    }}/>
            </VictoryChart>
        );
    }
}

export default Chart;