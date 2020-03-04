import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Row, Col, Label } from 'reactstrap';
import { getTotalPage } from '../../configs/common'
class IsofhPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangePage(page) {
        this.props.onClickPage(page)
    }
    render() {
        const { page, size, total } = this.props
        let totalPage = getTotalPage(size, total);
        let listPages = [];
        for (var i = Number(page) - 2; i <= Number(page) + 2; i++) {
            if (i > 0 && i <= totalPage)
                listPages.push(i);
        }

        let toRecord = page === totalPage ? total : (page * size);
        if (size > total) {
            toRecord = page === totalPage ? total : (page * total)
        }
        return (
            <Row>
                <Col md="5">
                    {listPages && listPages.length > 0 && toRecord <= total &&
                        <Label>{"Hiển thị " + ((page - 1) * size + 1) + " đến " + toRecord + " trong " + total + " bản ghi"}</Label>
                    }
                </Col>
                <Col md="7">
                    <Pagination className="isofh-page" size="sm">
                        <PaginationItem disabled={page == 1 ? true : false} onClick={this.handleChangePage.bind(this, 1)}>
                            <PaginationLink previous tag="button"></PaginationLink>
                        </PaginationItem>
                        {
                            (listPages && listPages.length > 0) ? (
                                listPages.map((itemPage, index) => {
                                    return (
                                        <PaginationItem active={itemPage == page ? true : false} key={index} onClick={this.handleChangePage.bind(this, itemPage)}>
                                            <PaginationLink tag="button">{itemPage}</PaginationLink>
                                        </PaginationItem>
                                    )
                                })
                            ) : ""
                        }
                        <PaginationItem disabled={page == totalPage ? true : false} onClick={this.handleChangePage.bind(this, totalPage)}>
                            <PaginationLink next tag="button"></PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        );
    }
}

export default IsofhPagination;
