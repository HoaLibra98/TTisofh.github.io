import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './index.scss';
function InputText({ placeholder, value, onChange, title, disabled, cost }) {
    return (
        <>
            {
                cost ?
                    <div className="search-type" style={{ position: "relative" }}>
                        <input
                            value={value ? value : ''}
                            id={value} name={value}
                            placeholder={placeholder}
                            className="search-input-text"
                            onChange={onChange}
                            disabled={disabled}
                        />
                        <div style={{ position: "absolute", top: 10, right: 26 }}>VNĐ</div>
                    </div> :
                    <div className="search-type">
                        <input
                            value={value ? value : ''}
                            id={value} name={value}
                            placeholder={placeholder}
                            className="search-input-text"
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </div>
            }
        </>
    )
}
function TextField({ placeholder, value, onChange, disabled, title }) {
    return (
        <div className="search-text-field">
            <div className="title-search-input">{title}</div>
            <input
                value={value ? value : ''}
                id={value} name={value}
                placeholder={placeholder}
                className="search-input-custom"
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )

}
function InputField({ placeholder, value, onChange, title, disabled, width, col, cost }) {
    return (
        <div className={"row topics-input " + (disabled ? "disabled-input" : null)}>
            <div className={"col-md-" + col}>
                <span>{title}</span>
            </div>
            <div className={"col-md-" + (12 - col)}>
                <input
                    value={value ? value : ''}
                    id={value} name={value}
                    placeholder={placeholder}
                    className="search-input-topics"
                    onChange={onChange}
                    disabled={disabled}
                />
                {cost ? <div style={{ position: "absolute", top: 1, right: -4 }}>VNĐ</div> : null}
            </div>
        </div>
    )
}
function InputDisabled({ title, value, col }) {
    return (
        <div className="search-type search-type-disabled">
            <div className="row">
                <div className={"col-md-" + col}>
                    <span className="title-search-input">{title}</span>
                </div>
                <div className={"col-md-" + (12 - col)}>
                    <div className="title-input-disabled">{value}</div>
                </div>
            </div>
        </div>
    )
}
export { InputText, InputField, InputDisabled, TextField };
