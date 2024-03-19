import { getPath, capitalize } from '../utils.js';
import GenerateFile from '../generateFile.js';
class TableNoPage extends GenerateFile {
  constructor(config) {
    super(config);
  }
  generateTemplate() {
    const exportName = capitalize(this.config.filename);
    const buttonKey = this.config.buttonKey;
    return `
import { PagingTable, PbuttonList } from '@/components';
import { queryCodeTable } from '@/services/common';
import { arrayToValueEnum, fileDownLoad, jsonToUrlencoded } from '@/utils';
import api from '@/utils/api';
import { ProFormInstance } from '@ant-design/pro-form';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { createSearchParams, history, request, useRequest, useSearchParams } from 'umi';

const ${exportName}: React.FC<Record<string, any>> = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [fields, setFields] = useState({});
  const [selectedRow, setSelectedRow] = useState([]);
  const [searchParams] = useSearchParams();
  const TODO6 = searchParams.get('');

  // 状态
  const { data: statusList = [] } = useRequest(() =>
    queryCodeTable({ key: 'idp.maindata.status' }),
  );

  const deleteData = (idList: string[]) => {
    if (!idList || idList.length < 1) {
      message.warning('请选择需要操作的数据！');
      return;
    }
    request(api.masterDataDelete, {
      method: 'DELETE',
      data: { ids: idList },
    }).then((res) => {
      if (res.success) {
        actionRef.current?.reload();
      }
    });
  };
  const publishData = (data: { id: string | number; businessType: string }) => {
    request(api.masterDataOperate, {
      method: 'post',
      data: data,
    }).then((res) => {
      if (res.success) {
        actionRef.current?.reload();
      }
    });
  };
  const shelveData = (data: { id: string | number; businessType: string }) => {
    request(api.masterDataOperate, {
      method: 'post',
      data: data,
    }).then((res) => {
      if (res.success) {
        actionRef.current?.reload();
      }
    });
  };

  const uploadProps = {
    name: 'file',
    action: api.masterDataImport,
    accept: '.xlsx,.xls',
    showUploadList: false,
    onChange() {
      actionRef.current?.reload();
    },
  };

  const columns: ProColumns[] = [
    {
      title: '字符串',
      dataIndex: 'TODO1',
      key: 'TODO1',
      formItemProps: {
        rules: [
          {
            message: '最多输入64个字符！',
            max: 64,
            whitespace: true,
          },
        ],
      },
    },
    {
      title: '下拉框',
      dataIndex: 'TODO2',
      key: 'TODO2',
      valueType: 'select',
      valueEnum: arrayToValueEnum({ list: statusList }),
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      search: false,
      render: (text: React.ReactNode, record) => {
        return (
          <PbuttonList
            prefix={record.id}
            butList={[
              // 查看
              {
                code: 'TODO3',
                disabled: false,
                onClick: () => {
                  history.push({
                      pathname: '',
                      search: \`?\${createSearchParams({})}\`,
                    });
                },
              },
              // 编辑
              {
                code: 'TODO4',
                onConfirm: () => {

                },
              },
            ]}
            code='${buttonKey}'
          />
        );
      },
    },
  ];

  const tableProp = {
    request: (params = {}) => {
      return request(':url', {
        params,
      }).then((res) => {
        return {
          success: res?.success ?? false,
          data: res?.data ?? [],
          total: res?.data?.length ?? 0,
        };
      });
    },
    columns,
    rowKey: 'id',
    method: 'get',
    formRef,
    serialNumber: true,
    form: { ignoreRules: false },
    rowSelection: {
      selectedRowKeys: selectedRow.map((item) => item.id),
      onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
        setSelectedRow(selectedRows);
      },
    },
    params: {},
    toolbar: {
      actions: (
        <PbuttonList
          toolbar
          code='${buttonKey}'
          butList={[
            // 新增
            {
              code: 'add',
              type: 'primary',
              onClick: () => {
                history.push('/masterData/manage/add');
              },
            },
            // 导入模板下载
            {
              code: 'download',
              onClick: () => {
                fileDownLoad(api.masterDataTemplate);
              },
            },
            // 导入
            {
              code: 'import',
              butType: 'upload',
              uploadProps,
            },
            // 导出
            {
              code: 'export',
              butType: 'popconfirm',
              title: '平台将依据查询条件导出查询出的所有数据',
              onConfirm: () => {
                const params = jsonToUrlencoded(fields);
                fileDownLoad(\`\${api.masterDataExport}?\${params}\`);
              },
            },
          ]}
        />
      ),
    },
    scroll: {},
  };
  return (
    <PagingTable {...tableProp} actionRef={actionRef} />
  )
};

export default ${exportName};
`
  }
}
export default TableNoPage;