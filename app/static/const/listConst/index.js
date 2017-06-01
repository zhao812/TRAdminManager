import React from 'react'

export const tableList = {
    branch: {
        title: "子公司列表",
        subTitle: {
            add: "新增子公司",
            edit: "修改子公司信息"
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
                api: "/api/sys/db/branch/findByPage",
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
                api: "/api/sys/v1/department/findByPage",
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
                title: '用户组',
                className: "user-usergroup",
                render: (text, record) => (
                    <span>{record.userGroups.map(obj=>obj.name).join("/")}</span>
                )
            },
            {
                title: '子公司',
                render: (text, record) => (
                    <span>{record.branchId.map(obj=>obj.name).join("/")}</span>
                )
            },
            {
                title: '部门',
                render: (text, record) => (
                    <span>{record.departments.map(obj=>obj.name).join("/")}</span>
                )
            },
            {
                title: '办公地点',
                dataIndex: 'officeName'
            }
        ],
        urlApi: {
            list: {
                api: "/api/sys/db/user/findByPage",
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
            form: {
                userGroups: {
                    api: "/api/sys/db/usergroup/find",
                    type: "GET"
                },
                departments: {
                    api: "/api/sys/v1/department/getSelectData",
                    type: "GET"
                }
            }
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
                id: "userGroups",
                title: "用户组",
                type: "select-multiple",
                placeholder: "请选择",
                key: "userGroups",
                value: "",
            },
            {
                id: "departments",
                title: "公司部门",
                type: 'tree-select-multiple',
                placeholder: "请选择",
                isRequired: true,
                key: ["branchId._id", "departments._id"],
                value: "",
            },
            // {
            //     id: "roleName",
            //     title: "角色  ",
            //     type: "text",
            //     placeholder: "",
            //     isRequired: true,
            //     key: "roleName",
            //     value: ""
            // },
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
                key: "",
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
                id: "userGroups",
                title: "用户组",
                type: "select-multiple",
                placeholder: "请选择",
                key: "userGroups._id",
                value: "",
            },
            {
                id: "departments",
                title: "公司部门",
                type: 'tree-select-multiple',
                placeholder: "请选择",
                isRequired: true,
                key: ["branchId._id", "departments._id"],
                value: "",
            },
            // {
            //     id: "roleName",
            //     title: "角色",
            //     type: "text",
            //     placeholder: "",
            //     isRequired: true,
            //     key: "roleName",
            //     value: ""
            // },
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
                title: "角色",
                render: (text, record) => (
                    <span>{record.roles.map(obj=>obj.name).join("/")}</span>
                )
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
                api: "/api/sys/v1/usergroup/findByPage",
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
            form: {
                roles: {
                    api: "/api/sys/db/role/find",
                    type: "GET"
                }
            }
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
            },
            {
                id: "roles",
                title: "角色",
                type: "select-multiple",
                placeholder: "请选择",
                key: "roles._id",
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
            },
            {
                id: "roles",
                title: "角色",
                type: "select-multiple",
                placeholder: "",
                key: "roles._id",
                value: ""
            }
        ]
    },

    role: {
        title: "角色列表",
        subTitle: {
            add: "新增角色",
            edit: "修改角色"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '角色',
                dataIndex: 'name',
            },
            {
                title: '权限',
                render: (text, record)=>(
                    <span>{record.permissions.map(obj=>obj.name).join("/")}</span>
                )
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
                api: "/api/sys/v1/role/findByPage",
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
            form: {
                permissions: {
                    api: "/api/sys/db/permissions/find",
                    type: "GET"
                }
            }
        },
        add: [
            {
                id: "name",
                title: "角色",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "permissions",
                title: "权限",
                type: "select-multiple",
                placeholder: "请选择",
                key: "permissions._id",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: "角色",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                value: ""
            },
            {
                id: "permissions",
                title: "权限",
                type: "select-multiple",
                placeholder: "请选择",
                key: "permissions._id",
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
                dataIndex: 'type.name'
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
                api: "/api/sys/v1/permissions/findByPage",
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
                key: "type._id",
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
                key: "type._id",
                value: ""
            }
        ]
    },

    dictionary: {
        title: "权限类型列表",
        subTitle: {
            add: "新增类型",
            edit: "修改权限类型信息"
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '权限类型',
                dataIndex: 'name',
            },
            {
                title: '关键字',
                dataIndex: "primarykey"
            },
            {
                title: "值",
                dataIndex: "value",
            },
            {
                title: "排序",
                dataIndex: "sort"
                
            },
            {
                title: "显示名称",
                dataIndex: "showName"
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
                api: "/api/sys/db/dictionary/findByPage",
                type: "GET"
            },
            add: {
                api: "/api/sys/db/dictionary/add",
                type: "POST"
            },
            delete: {
                api: "/api/sys/db/dictionary",
                type: "DELETE"
            },
            edit: {
                api: "/api/sys/db/dictionary/up",
                type: "PUT"
            },
            form: null
        },
        add: [
            {
                id: "name",
                title: "权限类型",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                minLength: 1,
                maxLength: 30,
                value: ""
            },
            {
                id: "primarykey",
                title: "关键字",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "primarykey",
                value: ""
            },
            {
                id: "value",
                title: "值",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "value",
                value: ""
            },
            {
                id: "sort",
                title: "排序",
                type: "number",
                placeholder: "",
                isRequired: true,
                key: "sort",
                value: ""
            },
            {
                id: "showName",
                title: "显示名称",
                type: "text",
                aceholder: "",
                isRequired: true,
                key: "showName",
                value: ""
            }
        ],
        edit: [
            {
                id: "name",
                title: "权限类型",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "name",
                minLength: 1,
                maxLength: 30,
                value: ""
            },
            {
                id: "primarykey",
                title: "关键字",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "primarykey",
                value: ""
            },
            {
                id: "value",
                title: "值",
                type: "text",
                placeholder: "",
                isRequired: true,
                key: "value",
                value: ""
            },
            {
                id: "sort",
                title: "排序",
                type: "number",
                placeholder: "",
                isRequired: true,
                key: "sort",
                value: ""
            },
            {
                id: "showName",
                title: "显示名称",
                type: "text",
                aceholder: "",
                isRequired: true,
                key: "showName",
                value: ""
            }
        ]
    }
}