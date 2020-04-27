import constants from '../resources/strings'
import clientUtils from '../utils/client-utils';
const defaultState = {
    // userApp:
    // {
    //     currentUser: {

    //     },
    //     isLogin: false,
    //     loginToken: "",
    //     listPage: [],
    //     listSlideItem: [],
    //     listSlidePage: [],
    //     listTraining: [],
    //     listUserAdmin: [],
    // },
    number: 1
}
const reducer = (state = defaultState, action) => {
    let newState = {...state};
    switch (action.type) {
        // case constants.action.action_user_login:
        //     newState.userApp.currentUser = action.value;
        //     newState.userApp.isLogin = newState.userApp.currentUser && newState.userApp.currentUser.id;
        //     newState.userApp.loginToken = newState.userApp.currentUser ? newState.userApp.currentUser.loginToken : "";
        //     clientUtils.auth = newState.userApp.loginToken;
        //     newState.userApp.unReadNotificationCount = 0;
        //     return newState;
        // case constants.action.action_user:
        //     newState.userApp.currentUser = action.value;
        //     return newState;
        // case constants.action.action_user_logout:
        //     // userProvider.logout();
        //     newState.userApp.unReadNotificationCount = 0;
        //     newState.userApp.currentUser = {};
        //     newState.userApp.isLogin = false;
        //     newState.userApp.loginToken = "";
        //     clientUtils.auth = "";
        //     return newState;
        // case constants.action.list_user_admin:
        //     newState.userApp.listUserAdmin = action.listUserAdmin
        //     return newState;
        // case constants.action.list_training:
        //     newState.userApp.listTraining = action.listTraining
        //     return newState;
        // case constants.action.list_slide_item:
        //     newState.userApp.listSlideItem = action.listSlideItem
        //     return newState;
        // case constants.action.list_slide_page:
        //     newState.userApp.listSlidePage = action.listSlidePage
        //     return newState;
        // case constants.action.list_page:
        //     newState.userApp.listPage = action.listPage
        //     return newState;
        case 'GIAM_ACTION':
            newState.number = newState.number - 1;
            return newState;
        case 'TANG_ACTION':
            newState.number = newState.number + 1;
            return newState;
        default:
            return newState;
    }
}

export default reducer;