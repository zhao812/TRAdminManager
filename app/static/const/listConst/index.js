export const tableList = {
    branch: {
        title: "分公司列表",
        subTitle: {
            add: "新增分公司",
            edit: "修改分公司信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key'
            },
            {
                title: '公司名称',
                dataIndex: 'name'
            },
            {
                title: '描述',
                dataIndex: 'description'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '创建者',
                dataIndex: 'createBy'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            }
            
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/branch/find",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/branch/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/branch",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/branch/up",
                type: "PUT"
            }
        },
        add: [
            {
                id: "name",
                title: '公司名称',
                type: "text",
                placeholder: "",
                isRequired: true,
                value: ""
            },
            {
                id: "description",
                title: '描述',
                type: "textarea",
                maxLength: 10,
                placeholder: "",
                isRequired: true,
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: '公司名称',
                type: "text",
                placeholder: "",
                isRequired: true,
                value: ""
            },
            {
                id: "description",
                title: '描述',
                type: "textarea",
                maxLength: 10,
                placeholder: "",
                isRequired: true,
                value: ""
            }
        ]
    }
}