import React, { Component } from 'react';
import {Label } from 'reactstrap';
import Select from 'react-select';
import Constans from '../../configs/data-contants'
class IsofhSize extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', paddingBottom:10}}>
                <Label style={{marginRight: 10}}>Hiện</Label>
                <Select
                    className="size-of-page basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    name="color"
                    defaultValue={Constans.sizeOfPage[0]}
                    options={Constans.sizeOfPage}
                    getOptionValue={(size) => size.id}
                    getOptionLabel={(size) => size.name}
                    onChange={(size) => { this.props.onClickSizeOfPage(size.id) }}
                />
                <Label style={{marginLeft: 10}}>bản ghi</Label>
            </div>
        );
    }
}

export default IsofhSize;
