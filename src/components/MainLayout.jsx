import { Button, Layout, Typography } from "antd"
import { Content, Header } from "antd/lib/layout/layout"
import React from "react"
import styles from "../css/MainLayout.module.css"

export default function MainLayout({ title, children }) {
  return (
    <Layout className={styles["totol-layout"]}>
      <Header className={styles["header"]} />
      <Content className={styles["content"]}>
        <Typography.Title level={3}>当前题目：{title}</Typography.Title>
        <div style={{ padding: "12px 0" }}>{children}</div>
      </Content>
    </Layout>
  )
}
