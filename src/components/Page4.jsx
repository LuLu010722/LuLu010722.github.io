import { Divider, Space, Typography } from "antd"
import React from "react"
import MainLayout from "./MainLayout"

export default function Page4() {
  return (
    <MainLayout title="注意">
      <Typography>
        <Typography.Title level={4}>
          读出下列数字，请您重复（每秒一个）
        </Typography.Title>
        <Typography.Title level={5}>
          正背：2 1 8 5 4<br />
          倒背：7 4 2
        </Typography.Title>
      </Typography>
      <Divider />
      <Typography>
        <Typography.Title level={4}>
          读出下列数字，每当数字1出现时，需用手拍打一下桌面，错误数大于或等于2次不得分<br />
          5 2 1 3 9 4 1 1 8 0 6 2 1 5 1 9 4 5 1 1 1 4 1 9 0 5 1 1 2
        </Typography.Title>
      </Typography>
      <Divider />
      <Typography>
        <Typography.Title level={4}>
          100连续减7
        </Typography.Title>
        <Space>
          <Typography.Text>93</Typography.Text>
          <Typography.Text>86</Typography.Text>
          <Typography.Text>79</Typography.Text>
          <Typography.Text>72</Typography.Text>
          <Typography.Text>65</Typography.Text>
        </Space>
      </Typography>
    </MainLayout>
  )
}
