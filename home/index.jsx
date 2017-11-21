import './static/css/index.css';
import React from 'react';


import {
    ZmitiPubApp
} from '../components/public/pub.jsx'

import $ from 'jquery';



class ZmitiHomeApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            currentAcc: "ilinten@linten.cn",
            currentUser: "iLinten",
            lastTime: "2016.12.31",
            curUsersCount: 5,
            mainHeight: 600,
            portrait: '',
            maxUsersCount: 10,
            isCompany: true //当前登录用户是否是企业账号
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }



    render() {


        return (
            <div></div>
        )
    }


}

export default ZmitiPubApp(ZmitiHomeApp);