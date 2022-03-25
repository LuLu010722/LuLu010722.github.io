import { Button, List, message, Typography } from "antd"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import DrawableCanvas from "./DrawableCanvas"
import MainLayout from "./MainLayout"

const matchTable = ["1", "甲", "2", "乙", "3", "丙", "4", "丁", "5", "戊"]
const dataSource = [
  { text: "", index: 0 },
  { text: "戊", index: 9 },
  { text: "", index: 0 },
  { text: "5", index: 8 },
  { text: "甲", index: 1 },
  { text: "", index: 0 },
  { text: "乙", index: 3 },
  { text: "2", index: 2 },
  { text: "", index: 0 },
  { text: "1", index: 0 },
  { text: "", index: 0 },
  { text: "", index: 0 },
  { text: "", index: 0 },
  { text: "丁", index: 7 },
  { text: "", index: 0 },
  { text: "4", index: 6 },
  { text: "3", index: 4 },
  { text: "", index: 0 },
  { text: "丙", index: 5 }
]

export default function Page1() {
  const [selected, setSelected] = useState([""])
  const [selectNumber, setSelectNumber] = useState(0)
  const navigate = useNavigate()

  const handleButtonClick = (event) => {
    const text = event.target.innerText
    if (text == matchTable[selectNumber]) {
      if (selectNumber == matchTable.length - 1) {
        swal({
          icon: "success",
          title: "很棒，你全都做对啦！"
        }).then(() => {
          setSelectNumber(selectNumber + 1)
        })
        return
      }
      setSelectNumber(selectNumber + 1)
      setSelected([...selected, text])
      return
    }
    message.error("错误")
  }

  const handleDone = () => {
    swal({
      icon: "success",
      title: "恭喜你完成了这道题",
      timer: 3000
    }).then(() => {
      navigate("/2")
    })
  }

  return (
    <MainLayout title="视空间/执行功能">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography.Title level={5}>请按照顺序依次点击按钮</Typography.Title>
          <List
            grid={{
              column: 4
            }}
            style={{ width: "20vw" }}
            dataSource={dataSource}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Button
                    shape="circle"
                    size="large"
                    disabled={selectNumber > item.index}
                    onClick={handleButtonClick}
                  >
                    {item.text}
                  </Button>
                </List.Item>
              )
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography.Title level={5}>
            请将如图所示的正方体绘制在下方框格中
          </Typography.Title>
          <img
            src="/imgs/square.webp"
            alt="picture not found"
            width={200}
            style={{ userSelect: "none", marginBottom: "16px" }}
          />
          <DrawableCanvas />
        </div>
        <div>
          <Typography.Title level={5}>
            请在下方框格中画出一个钟表
          </Typography.Title>
          <DrawableCanvas />
          <Button
            type="primary"
            style={{ margin: "24px 0", float: "right" }}
            onClick={handleDone}
          >
            完成
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
