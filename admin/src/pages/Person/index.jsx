import React from "react";
import { Table, Button, Toast } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { fetchPersonAll, deletePerson } from "../../api/person";
const { Column } = Table;

function Person() {
  const handleDelete = (text, record) => {
    Toast.success("删除成功");
  };

  return (
    <div>
      sdf
      {/* <Table dataSource={data} pagination={true}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column
          title="所属部门ID"
          dataIndex="departmentid"
          key="did"
          render={(id) => `部门ID为 ${id}`}
        />
        <Column title="手机号码" dataIndex="number" key="number" />
        <Column title="邮箱" dataIndex="email" key="email" />
        <Column
          title=""
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <Button
              icon={<IconDelete />}
              onClick={() => handleDelete(text, record)}
            ></Button>
          )}
        />
      </Table> */}
    </div>
  );
}

export default Person;
