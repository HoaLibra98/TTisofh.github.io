import React, { Component } from 'react';
import Select from 'react-select';

class IsofhUiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handelOnChange(elements) {
        if (!this.props.isMulti) {
            this.props.onChangeSelect(elements, this.props.getIdObject(elements));
        } else {
            if (elements.length) {
                var lists = elements;
                var ids = [];
                elements.forEach(element => {
                    ids.push(this.props.getIdObject(element));
                });
                this.props.onChangeSelect(lists, ids);
            }
            else {
                this.props.onChangeSelect([], []); 
            }
        }
    }
    render() {
        const { listOption, isMulti, selected, placeholder } = this.props;
        var list = [];
        if (!isMulti) {
            if (selected) {
                for (var i = 0; i < listOption.length; i++) {
                    if (selected == this.props.getIdObject(listOption[i]))
                        list.push(listOption[i]);
                }
            }
        } else {
            if (selected) {
                for (var i = 0; i < listOption.length; i++) {
                    if (selected.indexOf(this.props.getIdObject(listOption[i])) != -1)
                        list.push(listOption[i]);
                }
            }
        }
        return (
            <Select
                className={!isMulti ? "isofh-ui-select basic-single" : "basic-single"}
                classNamePrefix="select"
                isSearchable={true}
                placeholder={placeholder}
                value={list}
                options={listOption}
                getOptionValue={this.props.getIdObject}
                getOptionLabel={this.props.getLabelObject}
                onChange={this.handelOnChange.bind(this)}
                isClearable={false}
                theme={theme => ({
                    ...theme,
                    borderRadius: '0.25rem',
                    colors: {
                        ...theme.colors,
                        primary: "#63c2de"
                    },
                })}
                style={{ zIndex: 99999999 }}
            />
        )
    }
}
export default IsofhUiSelect;