import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { Table } from "antd";

const UsersTable = () => {
  const { data, error } = useSWR("/api/user", fetcher);
  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Username", dataIndex: "username", key: "username" },
  ];
  console.log("RENDER");
  if (error) {
    return <div>An error occured</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  return <Table dataSource={data.data} columns={columns} rowKey="id"></Table>;
};

export default UsersTable;
