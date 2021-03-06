import React, {Component} from 'react';
import  DataPagination from '../common/DataPagination';


class PaginationDisplaying extends Component{

    render(){
      var countData = this.props.countData;
      var pagesItems = this.props.getPagesItems(
        this.props.currentPage,
        countData,
        this.props.leftBorder,
        this.props.rightBorder
      );

      console.log("COUNT: " + countData);
      var isPrevDisabl = true ? this.props.currentPage == 0 : false;
      var isNextDisabl = true ? (this.props.currentPage * this.props.sizeOfPage + this.props.sizeOfPage >= countData): false;
      console.log("CURR: " + this.props.currentPage);
      console.log(isNextDisabl)

      return (<DataPagination
                pages={pagesItems}
                isPrevDisabl={isPrevDisabl}
                isNextDisabl={isNextDisabl}
                reducePage={this.props.reducePage}
                increasePage={this.props.increasePage}
                setPage={this.props.setPage}
                active={this.props.currentPage}
              />);

    }
}

export default PaginationDisplaying;