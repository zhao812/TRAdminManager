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
            },
            form: null
        },
        add: [
            {
                id: "name",
                title: '公司名称',
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "description",
                title: '描述',
                type: "textarea",
                maxLength: 10,
                placeholder: "",
                isRequired: true,
                key: "description",
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
                key: "name",
                value: ""
            },
            {
                id: "description",
                title: '描述',
                type: "textarea",
                maxLength: 10,
                placeholder: "",
                isRequired: true,
                key: "description",
                value: ""
            }
        ]
    },
    department: {
        title: "部门列表",
        subTitle: {
            add: "新增部门",
            edit: "修改部门信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key'
            },
            {
                title: '部门名称',
                dataIndex: 'name'
            },
            {
                title: '所属公司',
                dataIndex: 'branchId.name'
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
                api: "/api/sys/v1/department/list",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/department/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/department",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/department/up",
                type: "PUT"
            },
            form: {
                branchId: {
                    api: "/api/sys/db/branch/find",
                    type: "GET"
                },
            }
        },
        add: [
            {
                id: "name",
                title: '部门名称',
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "branchId",
                title: "所属公司",
                type: "select",
                placeholder: "请选择",
                isRequired: true,
                key: "branchId._id",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: '部门名称',
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "branchId",
                title: "所属公司",
                type: "select",
                placeholder: "请选择",
                isRequired: true,
                key: "branchId._id",
                value: ""
            }
        ]
    },

    user: {
        title: "用户列表",
        subTitle: {
            add: "新增用户",
            edit: "修改用户信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '账号',
                dataIndex: 'username',
            },
            {
                title: '姓名',
                dataIndex: 'realName',
            },
            {
                title: '分公司',
                dataIndex: 'branchName'
            },
            {
                title: '部门',
                dataIndex: 'departmentName'
            },
            {
                title: '职位',
                dataIndex: 'roleName'
            },
            {
                title: '办公地点',
                dataIndex: 'officeName'
            }
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/user/find",
                type: "GET"
            },
            add: {
                api: "/api/sys/v1/user/registered",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/user",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/user/up",
                type: "PUT"
            },
            form: null
        },
        add: [
            {
                id: "username",
                title: "账号",
                type: "text",
                placeholder: "",
                maxLength: 30,
                minLength: 6,
                isRequired: true,
                key: "username",
                value: ""
            },
            {
                id: "password",
                title: "密码",
                type: "password",
                placeholder: "",
                isRequired: true,
                key: "password",
                value: ""
            },
            {
                id: "realName",
                title: "姓名",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "realName",
                value: ""
            },
            {
                id: "branchName",
                title: "分公司",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "branchName",
                value: ""
            },
            {
                id: "departmentName",
                title: "部门",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "departmentName",
                value: ""
            },
            {
                id: "roleName",
                title: "职位",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "roleName",
                value: ""
            },
            {
                id: "officeName",
                title: "办公地点",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "officeName",
                value: ""
            }
        ],
        edit: [
            {
                id: "username",
                title: "账号",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "username",
                value: ""
            },
            {
                id: "password",
                title: "密码",
                type: "password",
                placeholder: "",
                isRequired: true,
                key: "password",
                value: ""
            },
            {
                id: "realName",
                title: "姓名",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "realName",
                value: ""
            },
            {
                id: "branchName",
                title: "分公司",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "branchName",
                value: ""
            },
            {
                id: "departmentName",
                title: "部门",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "departmentName",
                value: ""
            },
            {
                id: "roleName",
                title: "职位",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "roleName",
                value: ""
            },
            {
                id: "officeName",
                title: "办公地点",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "officeName",
                value: ""
            }
        ]
    },

    usergroup: {
        title: "用户组列表",
        subTitle: {
            add: "新增用户组",
            edit: "修改用户组信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '用户组名称',
                dataIndex: 'name',
            },
            {
                title: '创建者',
                dataIndex: 'createBy',
            },
            {
                title: '创建日期',
                dataIndex: 'createTime',
            }
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/usergroup/find",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/usergroup/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/usergroup",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/usergroup/up",
                type: "PUT"
            },
            form: null
        },
        add: [
            {
                id: "name",
                title: "用户组名称",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: "用户组名称",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            }
        ]
    },

    role: {
        title: "职位列表",
        subTitle: {
            add: "新增职位",
            edit: "修改职位信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '职位',
                dataIndex: 'name',
            },
            {
                title: '创建者',
                dataIndex: 'createBy',
            },
            {
                title: '创建日期',
                dataIndex: 'createTime',
            }
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/role/find",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/role/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/role",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/role/up",
                type: "PUT"
            },
            form: null
        },
        add: [
            {
                id: "name",
                title: "职位",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: "职位",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            }
        ]
    },

    permissions: {
        title: "权限列表",
        subTitle: {
            add: "新增权限",
            edit: "修改权限信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '权限',
                dataIndex: 'name',
            },
            {
                title: '类型',
                dataIndex: 'type'
            },
            {
                title: '创建者',
                dataIndex: 'createBy',
            },
            {
                title: '创建日期',
                dataIndex: 'createTime',
            }
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/permissions/find",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/permissions/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/permissions",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/permissions/up",
                type: "PUT"
            },
            form: {
                type: {
                    api: "/api/sys/v1/dictionary/PermissionsTypes",
                    type: "GET"
                }
            }
        },
        add: [
            {
                id: "name",
                title: "权限",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "type",
                title: "类型",
                type: "select",
                placeholder: "",
                isRequired: true,
                key: "type",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: "权限",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "type",
                title: "类型",
                type: "select",
                placeholder: "",
                isRequired: true,
                key: "type",
                value: ""
            }
        ]
    }
}