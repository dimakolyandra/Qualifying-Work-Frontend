import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class DataPagination extends Component {
  render() {
    var pages = this.props.pages.map(
      (item) => {
        if ((item - 1) != this.props.active){
          return (
            <PaginationItem>
              <PaginationLink tag='button' onClick={() => this.props.setPage(item - 1)}>
              {item}
              </PaginationLink>
            </PaginationItem>
            );
        }
        else{
          return (
            <PaginationItem active>
              <PaginationLink tag='button' onClick={() => this.props.setPage(item - 1)}>
              {item}
              </PaginationLink>
            </PaginationItem>
            );
        }
      }
    );

    var previousItem = null;
    var nextItem = null;
    if (this.props.isPrevDisabl){
      previousItem = (
        <PaginationItem disabled>
          <PaginationLink tag='button' previous onClick={this.props.reducePage}/>
        </PaginationItem>);
    }
    else{
      previousItem = (
        <PaginationItem>
          <PaginationLink tag='button' previous onClick={this.props.reducePage}/>
        </PaginationItem>);
    }

    if (this.props.isNextDisabl){
      nextItem = (
        <PaginationItem disabled>
          <PaginationLink tag='button' next onClick={this.props.increasePage}/>
        </PaginationItem>);
    }
    else{
      nextItem = (
        <PaginationItem>
          <PaginationLink tag='button' next onClick={this.props.increasePage}/>
        </PaginationItem>);
    }


    return (
      <Pagination>
        {previousItem}
        {pages}
        {nextItem}
      </Pagination>
    );
  }
}

export default DataPagination;