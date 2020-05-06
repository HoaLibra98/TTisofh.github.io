import React, { Component } from 'react';
// import userProvider from '../../../data-access/user-provider';
import { connect } from 'react-redux';
// import Footer from './../components/Footer';
// import Header from '../components/Header';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import datacacheProvider from '../../../data-access/datacache-provider';
function Loading() {
    return <div></div>;
}

const routes = [
    {
        path: "/",
        component: Loadable({
          loader: () => import('../containners/account/Login'),
          loading: Loading,
        })
    }
]

class LayoutTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        function scroll() {
            $(window).scroll(function () {
                $('.amination').each(function () {
                    var scrollTop_item = $(window).scrollTop(),
                        vh = $(window).height(),
                        $scroll = $(this),
                        $scrollInner = $scroll.find('*'),
                        scrollEasing = $scroll.data('easing'),
                        scrollOffsetTop = $scroll.offset().top,
                        scrollDuration = $scroll.data('duration'),
                        translate_count = $scroll.data('translate'),
                        translate_data = 'translate' + '(' + translate_count + 'em' + ',' + 0 + ')',
                        data_opacity = $scroll.data('opacity');
                    if ((scrollTop_item + vh) >= scrollOffsetTop && $scroll.find($scroll.data('css'))) {
                        $scroll.addClass('animated' + ' ' + $scroll.data('css'));
                    }
                });

            });
        }
        scroll()
        this.getUserAccess()
    }
    getUserAccess = () => {
        var nav = window.navigator;
        var screen = window.screen;
        var guid = nav.mimeTypes.length;
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || '';
        guid += screen.width || '';
        guid += screen.pixelDepth || '';
        let deviceId = localStorage.getItem("_ONLINE_COUNTER_KEY");
        if (deviceId === null) {
            datacacheProvider.save("", "ONLINE_COUNTER_KEY", guid)
            deviceId = localStorage.getItem("_ONLINE_COUNTER_KEY");
        }
        let data = {
            deviceId: deviceId
        }
        // if (!lastSend || new Date().getTime() - lastSend > 300000) {
        // userProvider.userAccess(data).then(s => {
        //     if (s && s.data && s.code === 0) {
        //         // storageMgr.write("LAST_SEND_COUNTER", new Date().getTime());
        //     }
        // }).catch(e => {

        // })
        // }
    }
    render() {
        return (
            <div className="container-fluid padd_lef padd_ri" >
                {/* <Header /> */}
                {
                    <Switch>
                        {
                            routes.map((route, key) => {
                                if (route.component)
                                    return <Route key={key}
                                        path={route.path}
                                        render={props => (
                                            <route.component {...props} />
                                        )} />
                                return null;
                            })
                        }
                    </Switch>
                }
                {/* <Footer /> */}
                <MessengerCustomerChat
                    pageId="126797687909329"
                    appId="313919028686873"
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(LayoutTemplate);