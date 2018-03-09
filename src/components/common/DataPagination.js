import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class DataPagination extends React.Component {
  render() {
    var pages = this.props.pages.map(
      (item) => {
        return (
          <PaginationItem>
            <PaginationLink tag='button'>
            {item}
            </PaginationLink>
          </PaginationItem>
          );
      });
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink tag='button' previous onClick={this.props.reducePage}/>
        </PaginationItem>
        {pages}
        <PaginationItem>
          <PaginationLink tag='button' next onClick={this.props.increasePage}/>
        </PaginationItem>
      </Pagination>
    );
  }
}

export default DataPagination;