import { Button, Input, Typography } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import MainLayout from "./MainLayout"

export default function Page2() {
  const navigate = useNavigate()

  const handleDone = () => {
    swal({
      icon: "success",
      title: "恭喜你完成了这道题",
      timer: 3000
    }).then(() => {
      navigate("/3")
    })
  }

  return (
    <MainLayout title="命名">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}
      >
        <div>
          <img
            src="/imgs/square.webp"
            alt="picture not found"
            style={{ display: "block", marginBottom: "16px" }}
          />
          <Input placeholder="请输入命名" />
        </div>
        <div>
          <img
            src="/imgs/square.webp"
            alt="picture not found"
            style={{ display: "block", marginBottom: "16px" }}
          />
          <Input placeholder="请输入命名" />
        </div>
        <div>
          <img
            src="/imgs/square.webp"
            alt="picture not found"
            style={{ display: "block", marginBottom: "16px" }}
          />
          <Input placeholder="请输入命名" />
        </div>
      </div>
      <Button type="primary" style={{ float: "right" }} onClick={handleDone}>
        完成
      </Button>
    </MainLayout>
  )
}
