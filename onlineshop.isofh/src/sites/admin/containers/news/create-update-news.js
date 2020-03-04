import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import newsProvider from '../../../../data-access/news-provider';
import menuProvider from '../../../../data-access/menu-provider';
import imageProvider from '../../../../data-access/image-provider';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import CKEditor from 'ckeditor4-react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Fade, Label } from 'reactstrap';
import { SelectBox } from '../../components/input-field/InputField';
import constants from '../../../../resources/strings';
import datacacheProvider from '../../../../data-access/datacache-provider';
class CreateUpdateAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hightlights: false,
            image: '',
            title: '',
            keyword: [],
            listMenuGroup: [],
            content: '',
            describe: '',
            menuId: -1,
            isCreate: false,
            confirmDialog: false,
            newId: this.props.match.params.id,
            buttonCheckRequest: false
        };
    }
    componentDidMount() {
        this.handlelogOut();
    }
    handlelogOut(item) {
        if (item) {
            this.props.history.push('/dang-nhap', { state: 'storage-clear' });
        }
        else {
            constants.dataCache.current_admin = datacacheProvider.read("", constants.key.storage.current_account);
            if (constants.dataCache.current_admin && constants.dataCache.current_admin.id == this.props.userApp.isLogin) {
                this.getDetail();
                this.getByMenu();
            }
            else {
                window.location.href = '/admin';
            }
        }
    };
    getDetail() {
        if (this.state.newId) {
            newsProvider.getDetail(this.state.newId).then(s => {
                if (s && s.data && s.code === 0) {
                    this.setState({
                        content: s.data.data[0].news.content,
                        title: s.data.data[0].news.title,
                        describe: s.data.data[0].news.describe,
                        image: s.data.data[0].news.image,
                        keyword: s.data.data[0].news.keyword ? s.data.data[0].news.keyword.split(",") : [],
                        hightlights: s.data.data[0].news.hightlights == 1 ? true : false,
                        menuId: s.data.data[0].menuId.id
                    })
                } else if (s && s.code == 97) {
                    this.handlelogOut(true);
                }
            }).catch(e => {

            })
        }
    }
    getByMenu() {
        menuProvider.getByGroup(1, 1).then(s => {
            if (s && s.data && s.code == 0) {
                let data = []
                s.data.map(item => {
                    data.push(item.menu)
                })
                this.setState({
                    listMenuGroup: data
                })
            }
        }).catch(e => {

        })
    }
    uploadImage(event) {
        let selector = event.target;
        let fileName = selector.value.replace("C:\\fakepath\\", "").toLocaleLowerCase();
        let sizeImage = (event.target.files[0] || {}).size / 1048576;
        if (sizeImage) {
            if (fileName.endsWith(".jpg") ||
                fileName.endsWith(".png") ||
                fileName.endsWith(".jpeg") ||
                fileName.endsWith(".Gif") ||
                fileName.endsWith(".gif")) {
                if (sizeImage > 5) {
                    toast.error("Ảnh không vượt quá dung lượng 5MB", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    imageProvider.upload(event.target.files[0]).then(s => {
                        if (s && s.data.code == 0 && s.data.data) {
                            this.setState({
                                image: s.data.data.images[0].image,
                            })
                        } else {
                            toast.error("Vui lòng thử lại !", {
                                position: toast.POSITION.TOP_LEFT
                            });
                        }
                    }).catch(e => {
                    })
                }
            } else {
                toast.error("Vui lòng chọn đúng định dạng file ảnh", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
    checkValidate = async () => {
        let { title, content, image, describe, keyword, menuId } = this.state;
        let matchs = content.match(/src="(?<base64>data:(.*?))"/g);
        let promises = [];
        if (matchs) {
            for (let i = 0; i < matchs.length; i++) {
                let item = matchs[i];
                let url = item.replace("src=\"", "").replace("\"", "");
                let blob = await fetch(url).then(r => r.blob());
                promises.push(imageProvider.upload(blob))
            }
        }
        if (promises.length) {
            let images = await Promise.all(promises);
            images.forEach((item, index) => {
                if (item.data.code == 0) {
                    let s = item.data.data.images[0].image.absoluteUrl();
                    while (content.indexOf(matchs[index]) != -1) {
                        content = content.replace(matchs[index], "src=\"" + s + "\"");
                    }
                }
            });
            this.setState({ content });
        }
        let checkContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, 'X').replace(/^\s*/g, '').replace(/\s*$/g, '').length
        if (menuId == -1 || !image || content == "" || content.trim().length == 0 || !title || title.trim().length == 0 || title.length > 255 || checkContent > 10000 || (keyword && keyword.length > 5)) {
            this.setState({
                isCreate: true,
            })
        }
        else if (menuId != 5 && menuId != 6) {
            if (!describe || describe.trim().length == 0 || describe.length > 500) {
                this.setState({
                    isCreate: true,
                })
            }
            else {
                this.create();
            }
        }
        else {
            this.create();
        }
    }
    create() {
        let { keyword, title, hightlights, content, image, describe, newId, menuId } = this.state;
        let param = {
            news: {
                title: title.trim(),
                keyword: keyword.toString(),
                hightlights: hightlights ? 1 : 0,
                content: content.trim(),
                image,
                describe
            },
            menuId: menuId
        }
        if (newId) {
            newsProvider.update(newId, param).then(s => {
                switch (s.code) {
                    case 0:
                        toast.success("Cập nhật tin tức thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        this.onClose();
                        break
                    case 2:
                        toast.error("Tiêu đề đã tồn tại, vui lòng kiểm tra lại!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        break
                    case 97:
                        this.handlelogOut(true);
                        break;
                    default:
                        toast.error("Cập nhật tin tức không thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                }
            }).catch(e => {
                toast.error(e.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        } else {
            if (!this.state.buttonCheckRequest) {
                this.setState({
                    buttonCheckRequest: true
                })
                newsProvider.create(param).then(s => {

                    switch (s.code) {
                        case 0:
                            toast.success("Thêm mới tin tức thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.onConfirm();
                            break
                        case 2:
                            toast.error("Tiêu đề đã tồn tại, vui lòng kiểm tra lại!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.setState({
                                buttonCheckRequest: false
                            })
                            break
                        case 97:
                            this.handlelogOut(true);
                            break;
                        default:
                            toast.error("Thêm mới tin tức không thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.setState({
                                buttonCheckRequest: false
                            })
                    }
                }).catch(e => {
                    toast.error(e.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
            }

        }
    }
    onConfirm() {
        this.setState({
            confirmDialog: true
        })
    }
    onReset() {
        this.setState({
            hightlights: 0,
            image: '',
            title: '',
            keyword: [],
            content: '',
            describe: '',
            menuId: -1,
            isCreate: false,
            confirmDialog: false,
            buttonCheckRequest: false
        })
    }
    onClose() {
        this.props.history.push("/admin/news?true");
    }
    handleDeleteImage() {
        this.inputElement.value = "";
        this.setState({
            image: ''
        })
    }
    render() {
        const { classes } = this.props;
        const { image, hightlights, title, keyword, content, describe, isCreate, listMenuGroup, menuId, newId } = this.state;
        return (
            <div className='main-index'>
                <Row>
                    <Col xs="12">
                        <Card>
                            <ValidatorForm onSubmit={this.checkValidate}>
                                <CardHeader>
                                    <strong>{newId ? 'CẬP NHẬT TIN TỨC' : 'THÊM MỚI TIN TỨC'} </strong>
                                </CardHeader>
                                <CardBody>
                                    <Row >
                                        <Col lg="5">
                                            <div>
                                                <Label htmlFor="text-input"><strong>Menu</strong> (<span className="isofh-error">*</span>): </Label>
                                                <div className="select-create">
                                                    <SelectBox
                                                        listOption={[...listMenuGroup]}
                                                        placeholder={'- Chọn menu -'}
                                                        isMulti={false}
                                                        selected={menuId}
                                                        getIdObject={(item) => {
                                                            return item.id;
                                                        }}
                                                        getLabelObject={(item) => {
                                                            return item.name;
                                                        }}
                                                        onChangeSelect={(lists, ids) => {
                                                            this.setState({
                                                                menuId: ids
                                                            })
                                                        }}
                                                    />
                                                    {
                                                        isCreate ?
                                                            menuId == -1 ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng chọn menu</span>
                                                                : "" : ""
                                                    }
                                                </div>

                                            </div>
                                            <div className="news-title">
                                                <Label htmlFor="text-input"><strong>Tiêu đề</strong> (<span className="isofh-error">*</span>): </Label>
                                                <TextValidator
                                                    value={title}
                                                    id="title" name="title"
                                                    placeholder="Nhập tiêu đề tin tức"
                                                    variant="outlined"
                                                    className={classes.textField}
                                                    onChange={(event) => { this.setState({ title: event.target.value }); }}
                                                    margin="normal"
                                                />
                                                {
                                                    isCreate ?
                                                        (title.trim().length == 0 || title == "")
                                                            ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập tiêu đề!</span>
                                                            : title.length > 255 ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập tiêu đề không quá 255 ký tự!</span>
                                                                : "" : ""
                                                }
                                            </div>
                                            <div>
                                                <Label htmlFor="text-input"><strong>Từ khóa</strong>: </Label>
                                                <TagsInput className="color-tags" inputProps={{ placeholder: '  Nhập từ khóa ngăn cách bởi nút enter' }} value={keyword}
                                                    onChange={(keyword) => { this.setState({ keyword }) }} />
                                                {
                                                    isCreate && keyword && keyword.length > 5 ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập không quá 5 từ khóa!</span> : ""
                                                }
                                            </div>
                                            {
                                                (menuId == 5 || menuId == 6) ? ''
                                                    :
                                                    <div>
                                                        <Label htmlFor="text-input"><strong>Mô tả ngắn</strong> (<span className="isofh-error">*</span>): </Label>
                                                        <textarea
                                                            rows="3"
                                                            value={describe}
                                                            placeholder="Nhập mô tả ngắn"
                                                            id="describe" name="describe"
                                                            className={classes.textField}
                                                            onChange={(event) => { this.setState({ describe: event.target.value }); }}
                                                            margin="normal"
                                                        />
                                                        {
                                                            isCreate ?
                                                                (describe.trim().length == 0 || describe == "")
                                                                    ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập mô tả ngắn</span>
                                                                    : describe.length > 500 ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập mô tả ngắn không quá 500 kí tự</span>
                                                                        : "" : ""
                                                        }
                                                    </div>

                                            }

                                            <div>
                                                <Label htmlFor="text-input" style={{ marginTop: 10 }}><strong>Nổi bật</strong>: </Label>
                                                <Checkbox
                                                    checked={hightlights}
                                                    onChange={(event) => { this.setState({ hightlights: event.target.checked }) }}
                                                    value="hightlights"
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <Label htmlFor="text-input" style={{ marginTop: 10 }}><strong>Ảnh</strong> (<span className="isofh-error">*</span>): </Label>
                                                <div>
                                                    <input
                                                        accept="file_extension"
                                                        className={classes.input}
                                                        style={{ display: 'none' }}
                                                        id="upload_logo_header"
                                                        onChange={(event) => { this.uploadImage(event) }}
                                                        ref={(input) => { this.inputElement = input }}
                                                        type="file"
                                                    />
                                                    <label htmlFor="upload_logo_header" className="upload_logo_header">
                                                        <img style={{ width: 30, margin: 'auto', border: "1px soild" }}
                                                            src="/image-icon.png" alt='isofh_bvE' />
                                                    </label>
                                                    <div style={{ marginBottom: 12 }}>
                                                        {
                                                            image ?
                                                                <div>
                                                                    <img style={{ maxHeight: 200, maxWidth: '98%' }}
                                                                        src={image.absoluteUrl()} alt='isofh_bvE' />
                                                                    <IconButton onClick={() => this.handleDeleteImage()} color="primary" style={{ position: 'absolute', cursor: 'pointer', marginLeft: '-5.5%', marginTop: '-1.5%' }} className={classes.button} aria-label="RemoveCircle">
                                                                        <RemoveCircle />
                                                                    </IconButton>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                isCreate ?
                                                    !image ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng chọn hình ảnh</span>
                                                        : "" : ""
                                            }
                                        </Col>
                                        <Col lg="7">
                                            <Label htmlFor="text-input"><strong>Nội dung</strong> (<span className="isofh-error">*</span>):
                                        {
                                                    isCreate ?
                                                        (content.trim().length == 0 || content == "")
                                                            ? <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập nội dung</span>
                                                            : content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&\w+;/g, 'X').replace(/^\s*/g, '').replace(/\s*$/g, '').length > 10000 ?
                                                                <span className="isofh-error" style={{ fontSize: 13 }}>Vui lòng nhập nội dung không quá 10000 kí tự</span>
                                                                : "" : ""
                                                }
                                            </Label>
                                            <CKEditor
                                                placeholder="Nhập nội dung tin tức"
                                                onChange={(event) => {
                                                    const data = event.editor.getData();
                                                    // this.data2.content = event.editor.getData();
                                                    this.setState({ content: data });
                                                }}
                                                data={this.state.content}
                                                config={{
                                                    toolbar: [
                                                        ['Bold', 'Italic', 'Underline', 'Strike'],
                                                        ['Subscript', 'Superscript'],
                                                        ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],	// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                                                        ['Undo', 'Redo'],
                                                        ['Cut', 'Copy', 'Paste'], ["base64image", "pdf", "word", "excel", "Embed", "autoembed", "autolink"],
                                                        ["NumberedList", "BulletedList", "Outdent", "Indent", "Blockquote"], ["Link", "Table", "HorizontalRule", "Smiley", "SpecialChar"],			// Defines toolbar group without name.
                                                        ["Font", "FontSize", "TextColor", "BGColor", "Maximize", 'Preview', 'Source']
                                                        // ['Bold', 'Italic', 'Underline', 'Strike'],
                                                        // ['Subscript', 'Superscript'],
                                                        // ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],	// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                                                        // ['Undo', 'Redo'],
                                                        // ['Cut', 'Copy', 'Paste'], ["base64image", "Embed", "autoembed", "autolink"],
                                                        // ["NumberedList", "BulletedList", "Outdent", "Indent", "Blockquote"], 
                                                        // ["Link", "Table", "HorizontalRule", "Smiley", "SpecialChar"],
                                                        // // Defines toolbar group without name.
                                                        // ["Font", "FontSize", "TextColor", "BGColor", "Maximize", 'Preview', 'Source']		                                                
                                                    ],
                                                    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter style={{ textAlign: '-webkit-right' }}>
                                    <Link className="controls read-more"
                                        to={'/admin/news'} >
                                        <Button variant="contained" color="danger" style={{ marginRight: 5 }}>Trở về</Button>
                                    </Link>
                                    <Button variant="contained" color="primary" type="submit">{newId ? 'Cập nhật' : 'Thêm mới'}</Button>
                                </CardFooter>
                            </ValidatorForm>
                        </Card>
                    </Col>
                </Row>
                {
                    this.state.confirmDialog &&
                    <Modal backdrop="static" isOpen={true} className={'modal-md-location'}>
                        <ModalHeader className="modal-confirm-header">{'Xác nhận'}</ModalHeader>
                        <ModalBody className="modal-confirm-body">
                            <Fade tag="h5" className="mt-3">
                                Bạn có muốn thêm tiếp tin tức?
                            </Fade>
                        </ModalBody>
                        <ModalFooter className="modal-confirm-footer">
                            <Button color="primary" onClick={this.onReset.bind(this)}>Đồng ý</Button>{' '}
                            <Link className="controls read-more"
                                to={'/admin/news?true'} >
                                <Button color="secondary">Hủy bỏ</Button>
                            </Link>
                        </ModalFooter>
                    </Modal>
                }

            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
    }, textField: {
        width: '100%'
    }, avatar: {
        margin: 10,
    }, bigAvatar: {
        width: 60,
        height: 60,
    }, helpBlock: {
        color: 'red',
    }
});

export default withStyles(styles)(connect(mapStateToProps)(CreateUpdateAdmin));