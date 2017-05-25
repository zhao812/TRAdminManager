import React, { PropTypes } from 'react'
import './index.scss'
import './../../static/css/common.scss'
import { Table, Icon } from 'antd';
class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
       const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
            }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
            },{
            key: '3',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
            }, {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
            }];

            const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div className="s_table">
                 <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

UserList.PropTypes = {
}

export default UserList