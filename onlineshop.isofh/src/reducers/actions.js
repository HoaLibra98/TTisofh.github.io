import constants from '../resources/strings'

export const listUserAdmin = (listUserAdmin) => ({
    type: constants.action.list_user_admin,
    listUserAdmin
})
export const listSlideItem = (listSlideItem) => ({
    type: constants.action.list_slide_item,
    listSlideItem
})
export const listSlidePage = (listSlidePage) => ({
    type: constants.action.list_slide_page,
    listSlidePage
})
export const listTraining = (listTraining) => ({
    type: constants.action.list_training,
    listTraining
})
export const listPage = (listPage) => ({
    type: constants.action.list_page,
    listPage
}) 