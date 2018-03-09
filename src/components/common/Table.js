import React from 'react';
import { Table } from 'reactstrap';

class TableData extends React.Component {
  constructor(props){
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  getHeader(){
    if (this.props.data.length == 0) return;
    var headers = Object.keys(this.props.data[0]);
    headers = headers.map((item) => {return <th>{item}</th>});
    return (
        <thead>
          <tr>
          {headers}
          </tr>
        </thead>
      );
  }

  getContent(){
    var headers = Object.keys(this.props.data[0]);
    var content = new Array();

    for(let i = 0; i < this.props.data.length; i++){
      var raw = new Array();
      for (let j = 0; j < headers.length; j++){
        raw.push(<td>{this.props.data[i][headers[j]]}</td>);
      }
      content.push(<tr>{raw}</tr>);
    }
    return content;
  }

  render() {
    const headData = this.getHeader();
    const contentData = this.getContent();
    return (
      <Table hover bordered>
        {headData}
        <tbody>
          {contentData}
        </tbody>
      </Table>
    );
  }
}

export default TableData;