import { Button, Divider, Input, List, Space, Typography } from "antd"
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import MainLayout from "./MainLayout"

const dataSource = ["红色", "天鹅绒", "菊花", "面部", "教堂"]
const rememberTime = 5 * 60

const WordsList = () => {
  return (
    <List
      grid={{
        column: 5
      }}
      split
      dataSource={dataSource}
      renderItem={(item) => {
        return (
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            {item}
          </Typography.Title>
        )
      }}
    />
  )
}

const TimerText = ({ remaingSecs }) => {
  return (
    <Typography.Title level={3} style={{ textAlign: "center" }}>
      请记忆，剩余{remaingSecs}秒，请您先继续做下一题
    </Typography.Title>
  )
}

const InputList = forwardRef((props, ref) => {
  const inputRef = useRef()
  const [answers, setAnswers] = useState([])

  const handleChange = (e, index) => {
    // console.log(e.target.value, index)
    answers[index] = e.target.value
    setAnswers(answers)
  }

  const checkAnswer = () => {
    const answerSet = new Set(answers)
    const rightAnswerSet = new Set(dataSource)

    if (answerSet.size !== rightAnswerSet.size) return false
    answerSet.forEach((answer) => {
      if (!rightAnswerSet.has(answer)) return false
    })
    return true
  }

  useImperativeHandle(ref, () => ({
    checkAnswer: checkAnswer
  }))

  return (
    <List
      grid={{
        gutter: 16,
        column: 5
      }}
      split
      dataSource={dataSource}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <Input
              placeholder="请输入词语"
              onChange={(e) => handleChange(e, index)}
            />
          </List.Item>
        )
      }}
    />
  )
})

export default function Page3() {
  const [isCounting, setIsCounting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [remaingSecs, setRemaingSecs] = useState(0)

  const stopRef = useRef(true)
  const inputsRef = useRef()
  const navigate = useNavigate()

  let timer1 = 0
  let timer2 = 0

  const handleRemember = () => {
    if (!isTesting && !isCounting) {
      setIsCounting(true)
      stopRef.current = false
    }
  }

  const handleConfirm = () => {
    if (!inputsRef.current.checkAnswer()) {
      swal({
        icon: "error",
        title: "对不起，您的答案是错误的。",
        timer: 3000
      })
    } else {
      swal({
        icon: "success",
        title: "恭喜你，答案正确！",
        timer: 3000
      })
    }
  }

  const handleRestart = () => {
    setIsCounting(false)
    setIsTesting(false)
    setRemaingSecs(0)
    clearInterval(timer1)
    clearTimeout(timer2)
    stopRef.current = true
  }

  useEffect(() => {
    if (isCounting) {
      setRemaingSecs(rememberTime)
      timer2 = setTimeout(() => {
        if (!stopRef.current) {
          setIsCounting(false)
          setIsTesting(true)
        } else {
          clearTimeout(timer2)
          return
        }
      }, rememberTime * 1000)
    }
  }, [isCounting])

  useEffect(() => {
    if (isCounting) {
      timer1 = setInterval(() => {
        if (!stopRef.current) {
          setRemaingSecs(remaingSecs - 1)
        } else {
          clearInterval(timer1)
          return
        }
      }, 1000)
      return () => {
        clearInterval(timer1)
      }
    }
  }, [remaingSecs])

  return (
    <MainLayout title={"记忆"}>
      <Typography>
        <Typography.Title level={5}>
          读出下列词语，重复两次，然后5分钟后重复。
        </Typography.Title>
      </Typography>
      <Divider />
      {!isCounting && !isTesting ? (
        <WordsList />
      ) : isTesting ? (
        <InputList ref={inputsRef} />
      ) : (
        <TimerText remaingSecs={remaingSecs} />
      )}
      <Divider />
      <Space>
        <Button
          disabled={isCounting || isTesting}
          type="primary"
          onClick={handleRemember}
        >
          我记住了
        </Button>
        <Button onClick={handleRestart}>重新开始</Button>
        <Button disabled={!isTesting} onClick={handleConfirm}>
          确认答案
        </Button>
        <Link to="/4" target="_blank">
          <Button>下一题</Button>
        </Link>
      </Space>
    </MainLayout>
  )
}
