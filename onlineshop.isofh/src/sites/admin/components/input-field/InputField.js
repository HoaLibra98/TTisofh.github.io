import React from 'react';
import { Input, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Button, Form } from 'reactstrap';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import monent from 'moment';

class TextBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { label, id, name, placeholder, required, type, validates, readOnly, maxLength, displayNone, validatesCustom, validatesCustomMessage } = this.props;
        return (
            <FormGroup autoComplete="off" className={displayNone ? "displayNone" : ""} >
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{" " + validates.message}</label>) : ''}
                    {required && ((this.props || {}).value || []).length > 0 ? (!validatesCustom && validatesCustomMessage ? <span className="isofh-error"> {validatesCustomMessage}</span> : "") : (((this.props || {}).value || []).length > 0 ? (!validatesCustom && validatesCustomMessage ? <span className="isofh-error"> {validatesCustomMessage}</span> : "") : "")}
                </Label>
                <Input
                    type={type}
                    id={id} name={name}
                    placeholder={placeholder}
                    value={(this.props.value || "").replaceSpaces()}
                    autoComplete="off"
                    onChange={this.props.onChangeValue}
                    readOnly={readOnly ? true : false}
                    maxLength={maxLength ? maxLength : 255}
                />
            </FormGroup>
        );
    }
}
class AreaBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { label, id, name, placeholder, required, validates, rows, maxLength, labelBold, disabled } = this.props;
        return (
            <FormGroup>
                <Label htmlFor="nf-name" className={"nf-name " + (labelBold ? "styleBold" : "")}>{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{" " + validates.message}</label>) : ''}
                </Label>
                <Input type="textarea"
                    id={id}
                    name={name}
                    placeholder={placeholder + " tối đa 500 ký tự"}
                    value={this.props.value ? this.props.value.replaceSpaces() : ""}
                    autoComplete="off"
                    onChange={this.props.onChangeValue}
                    rows={rows ? rows : 2}
                    maxLength={maxLength ? maxLength : 500}
                    disabled={disabled ? true : false}
                />
            </FormGroup>
        );
    }
}
class PriceBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { label, id, name, placeholder, required, type, validates, readOnly, value } = this.props;
        let match = /^\d+$/;
        return (
            <FormGroup>
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                </Label>
                <InputGroup>
                    <Input type={type} id={id} name={name} placeholder={placeholder}
                        value={value && match.test(value.replaceAllText(".", "")) ? parseInt(value.replaceAllText(".", "")).formatPrice() : value}
                        autoComplete="off" onChange={this.props.onChangeValue}
                        readOnly={readOnly ? true : false}
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>VNĐ</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        );
    }
}
class SelectBox extends React.Component {
    constructor(props) {
        super(props);
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
        const { label, listOption, isMulti, selected, placeholder, required, validates, isDisabled } = this.props;
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
            <FormGroup className="select-group" >
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                </Label>
                <Select
                    isDisabled={isDisabled ? true : false}
                    className={!isMulti ? "isofh-ui-select basic-single" : "basic-single"}
                    classNamePrefix="select"
                    isSearchable={true}
                    isMulti={isMulti ? true : false}
                    name="color"
                    value={list}
                    options={listOption}
                    getOptionValue={this.props.getIdObject}
                    getOptionLabel={this.props.getLabelObject}
                    onChange={this.handelOnChange.bind(this)}
                    isClearable={false}
                    placeholder={placeholder}
                    theme={theme => ({
                        ...theme,
                        borderRadius: '0.25rem',
                        colors: {
                            ...theme.colors,
                            primary: "#63c2de"
                        },
                    })}
                />
            </FormGroup>
        )
    }
}
class YearPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOption: []
        }
    }
    componentDidMount() {
        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        let lists = [];
        for (var i = startYear; i <= endYear; i++) {
            var data = {
                value: i,
                label: i
            }
            lists.push(data);
        }
        this.setState({
            listOption: this.props.isInput ? [{ value: "", label: "Chọn năm" }, ...lists] : [{ value: "", label: "Tất cả" }, ...lists]
        })
    }
    render() {
        const { label, selected, placeholder, required, validates, isInput } = this.props;
        var selectedYear = [];
        if (selected) {
            for (var i = 0; i < this.state.listOption.length; i++) {
                if (selected == this.state.listOption[i].value)
                    selectedYear.push(this.state.listOption[i]);
            }
        }
        return (
            <FormGroup style={!isInput ? { marginBottom: 0 } : {}}>
                {
                    isInput &&
                    <Label htmlFor="nf-name" className="nf-name">{label}
                        {required ? (<span className="isofh-error">*</span>) : ''}
                        {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                    </Label>
                }
                <Select
                    className={"isofh-ui-select basic-single"}
                    classNamePrefix="select"
                    isSearchable={true}
                    isMulti={false}
                    name="color"
                    value={selectedYear}
                    options={this.state.listOption}
                    onChange={this.props.onChangeYear}
                    isClearable={false}
                    placeholder={placeholder}
                    theme={theme => ({
                        ...theme,
                        borderRadius: '0.25rem',
                        colors: {
                            ...theme.colors,
                            primary: "#63c2de"
                        },
                    })}
                />
            </FormGroup >
        )
    }
}

class DateTimeBox2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateValue: ""
        }
    }
    render() {
        const { label, id, name, value, placeholder, required, validates, isInput, minDate, classCustom } = this.props;
        return <FormGroup className={"form-group-xx " + classCustom ? classCustom : ""} style={!isInput ? { marginBottom: 0 } : {}}>
            {isInput &&
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                </Label>
            }
            <DatePicker
                selected={value}
                onChange={this.props.onChangeValue}
                dateFormat={"dd/MM/yyyy"}
                minDate={minDate ? minDate : null}
            />
        </FormGroup>
    }
}

class DateTimeBoxSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateValue: ""
        }
    }
    render() {
        const { label, value, placeholder, required, validates, isInput, classCustom } = this.props;
        return <FormGroup className={"form-group-xx " + classCustom ? classCustom : ""} style={!isInput ? { marginBottom: 0 } : {}}>
            {isInput &&
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                </Label>
            }
            <DatePicker
                placeholderText={placeholder ? placeholder : "Tìm kiếm..."}
                className="form-control"
                selected={value}
                onChange={this.props.onChangeValue}
                onChangeRaw={this.props.onChangeRaw}
                dateFormat={"dd/MM/yyyy"}
                strictParsing
                onChangeRaw={(event) => {
                    if (event.currentTarget.value.length === 10) {
                        if (monent(event.currentTarget.value, 'dd/MM/yyyy', false).isValid() === false) {
                            // NotificationManager.error("Chưa đúng định dạng tìm kiếm " + "dd/mm/yyyy", 'Thông báo');
                            toast.error("Chưa đúng định dạng tìm kiếm " + "dd/mm/yyyy", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                    }
                }}
            />
        </FormGroup>
    }
}

class DateBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateValue: ""
        }
    }

    render() {
        let { label, value, placeholder, required, validates, isInput, classCustom } = this.props;
        return <FormGroup className={"form-group-xx " + classCustom ? classCustom : ""} style={!isInput ? { marginBottom: 0 } : {}}>
            {isInput &&
                <Label htmlFor="nf-name" className="nf-name">{label}
                    {required ? (<span className="isofh-error">*</span>) : ''}
                    {validates ? (validates.isInvalid && <label className="isofh-error">{validates.message}</label>) : ''}
                </Label>
            }

            <DatePicker
                placeholderText={placeholder ? placeholder : ""}
                className="form-control"
                selected={(value && monent(value, 'dd/MM/yyyy', false).isValid() && new Date(value) != "Invalid Date") ? new Date(value) : ""}
                onChange={this.props.onChangeValue}
                onChangeRaw={this.props.onChangeRaw}
                dateFormat={"dd/MM/yyyy"}
                strictParsing
                onChangeRaw={(event) => {
                    if (monent(event.currentTarget.value, 'dd/MM/yyyy', false).isValid() === false && event.currentTarget.value.length === 10) {
                        // NotificationManager.error("Ngày bạn nhập đúng định dạng" + "dd/mm/yyyy", 'Thông báo');
                        toast.error("Chưa đúng định dạng tìm kiếm " + "dd/mm/yyyy", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }}
            />
        </FormGroup>
    }
}

export { TextBox, SelectBox, YearPicker, DateTimeBox2, DateBox, PriceBox, AreaBox, DateTimeBoxSearch }
