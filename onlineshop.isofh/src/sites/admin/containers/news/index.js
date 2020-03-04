import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import IconButton from '@material-ui/core/IconButton';
import newsProvider from '../../../../data-access/user-provider';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ConfirmDialog from '../../components/confirm/';
import Check from '@material-ui/icons/Check';
import Visibility from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import Pages from '../../components/pagination/pages'
import { getQueryStringHref } from '../../configs/common'
import DataContants from '../../configs/data-contants'
import UiSelect from '../../components/ui-select/ui-select';
import { DateTimeBoxSearch } from '../../components/input-field/InputField'
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Input, Alert } from 'reactstrap';
import IsofhSize from '../../components/size/size';
import constants from '../../../../resources/strings';
import datacacheProvider from '../../../../data-access/datacache-provider';
class wordTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: getQueryStringHref('page') ? getQueryStringHref('page') : 1,
            size: 10,
            hightlights: -1,
            title: '',
            data: [],
            listMenu: [],
            modalAdd: false,
            confirmDialog: false,
            tempDelete: [],
            createdDate: '',
            createdUser: '',
            total: "",
            menuId: -1,
            messageLoading: 'Đang tải dữ liệu...'
        }
    }
    componentWillMount() {
        this.handlelogOut();
    }
    handlelogOut(item) {
        if (item) {
            this.props.history.push('/dang-nhap', { state: 'storage-clear' });
        }
        else {
            constants.dataCache.current_admin = datacacheProvider.read("", constants.key.storage.current_account);
            if (constants.dataCache.current_admin && constants.dataCache.current_admin.id == this.props.userApp.isLogin) {
                this.loadPage();
                // this.getMenu()
            }
            else {
                window.location.href = '/admin';
            }
        }
    };
    loadPage() {
        let params = {
            page: this.state.page,
            size: this.state.size,
            createdDate: this.state.createdDate ? moment(this.state.createdDate).format("YYYY-MM-DD") : "",
            createdUser: this.state.createdUser,
            hightlights: this.state.hightlights,
            title: this.state.title,
            menuId: this.state.menuId
        }
        newsProvider.search(params).then(s => {
            if (s && s.code == 0 && s.data) {
                this.setState({
                    data: s.data.data,
                    total: s.data.total,
                    stt: (Number(this.state.page) - 1) * this.state.size + 1
                }, () => {
                    if (s.data && s.data.data && s.data.data.length === 0) {
                        this.setState({
                            messageLoading: "Thông báo! Không tìm thấy bài viết nào."
                        })
                    }
                })
                window.history.replaceState({}, "", "/admin/news");
            } else if (s && s.code == 97) {
                this.handlelogOut(true);
            }
        }).catch(e => {
        })
    }
    // getMenu() {
    //     menuProvider.getByGroup(1, 1).then(s => {
    //         if (s && s.code == 0 && s.data) {
    //             let data = []
    //             s.data.map(item => {
    //                 return data.push(item.menu)
    //             })
    //             this.setState({
    //                 listMenu: data
    //             })
    //         }
    //     }).catch(e => {
    //     })
    // }
    closeModal() {
        this.setState({
            modalAdd: false
        })
    }
    handleChangePage(page) {
        this.setState({ page }, this.loadPage.bind(this));
    };
    handleChangeSize(size) {
        this.setState({ size, page: 1 }, this.loadPage.bind(this));
    }
    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            tempDelete: item
        })
    }
    delete(type) {
        this.setState({ confirmDialog: false })
        if (type == 1) {
            newsProvider.delete(this.state.tempDelete.news.id).then(s => {
                if (s && s.code == 0 && s.data) {
                    toast.success(" Xóa tin tức thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.loadPage();
                } else if (s && s.code == 97) {
                    this.handlelogOut(true);
                } else {
                    toast.error(" Xóa tin tức không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
        }
    }
    handleChangeFilter(event) {
        this.setState({
            page: 1,
            [event.target.name]: event.target.value
        }, () => {
            this.loadPage()
        })
    }
    modalCreateUpdate(item) {
        if (item) {
            // this.props.history.push("/admin/news/update/" + item.news.id)
            window.location.href = "/admin/news/update/" + item.news.id;
        }
    }
    render() {
        const { classes } = this.props;
        const { data, page, total, size, createdDate, hightlights, listMenu, menuId, stt, messageLoading } = this.state;
        return (
            <div className='main-index'>
                 News
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 2048,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

export default withStyles(styles)(connect(mapStateToProps)(wordTime));