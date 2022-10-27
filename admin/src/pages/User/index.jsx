import React from "react";
import { Table, Button, Toast } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { fetchUserList } from "../../api/user";
const { Column } = Table;

function Person() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const list = await fetchUserList();
      console.log(list);
      setList(list);
    })();
  }, []);

  const handleDelete = (text, record) => {
    Toast.success("删除成功");
  };

  return (
    <div>
      <Table dataSource={list} pagination={true}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="账号名" dataIndex="account" key="account" />
        {/* <Column title="手机号码" dataIndex="number" key="number" />
        <Column title="邮箱" dataIndex="email" key="email" /> */}
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
      </Table>
    </div>
  );
}

export default Person;
