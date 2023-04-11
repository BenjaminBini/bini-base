import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Space } from "antd";

const Sample = () => {
  const onChange = () => {};
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
        <SearchOutlined style={{ fontSize: 60, color: "green" }} />
        <Card>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  );
};

export default Sample;
