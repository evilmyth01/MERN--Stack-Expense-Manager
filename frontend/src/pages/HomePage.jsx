import React,{useState, useEffect} from 'react'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import {UnderlineOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import moment from 'moment'
import Analytics from '../components/layout/Analytics'

const { RangePicker } = DatePicker;

function HomePage() {

  const [showModal, setShowModal] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])
  const [frequency, setFrequency] = useState("7")
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)


  // table data

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      render: (text,record) => (
        <div>
          <EditOutlined onClick={()=>{
            setEditable(record)
            setShowModal(true)
            }}
            className='mx-2' 
          />
          <DeleteOutlined onClick={()=>{handleDelete(record)}} />
        </div>
      )
    },

  ]


  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"))
        const response = await axios.post("http://localhost:8000/api/v1/transactions/get-all-transactions",{userId:user._id,frequency,selectedDate,type})
        setAllTransactions(response.data.data.transactions)
        console.log("response",response)
      } catch (error) {
        console.log("something went wrong while fetching",error)
        message.error("failed to fetch transactions")
      }
    }
    getAllTransactions()
  }, [frequency,selectedDate,type])

  const handleDelete = async (record) => {
    try {
      await axios.post("http://localhost:8000/api/v1/transactions/delete-transaction",{transactionId:record._id})
      message.success("Transaction deleted successfully")
    } catch (error) {
      console.log("something went wrong",error)
      message.error("failed to delete transaction")
    }
  }

  {/*

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      console.log("user",user._id)
      console.log(values)
      const response = await axios.post("http://localhost:8000/api/v1/transactions/add-transaction",{...values,userId:user._id})
      //console.log("response",response)
      
      message.success("Transaction added successfully")
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      console.log("something went wrong",error)
      message.error("failed to add transaction")
    }
  }
*/}

const handleSubmit = async (values) => {
  try {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(editable){
      await axios.post("http://localhost:8000/api/v1/transactions/edit-transaction",{payload:{...values,userId:user._id,},
      transactionId:editable._id})
      message.success("Transaction updated successfully")
    }
    else{
      const response = await axios.post("http://localhost:8000/api/v1/transactions/add-transaction",{...values,userId:user._id})
    //console.log("response",response)
    
    message.success("Transaction added successfully")
    }
    setShowModal(false)
    setEditable(null)
  } catch (error) {
    console.log("something went wrong",error)
    message.error("failed to add transaction")
  }
}


  return (
        <Layout>
            <div className="filters">
              <div>
                <h6>Select frequency</h6>
                <Select value={frequency} onChange={(values)=>setFrequency(values)}>
                  <Select.Option value="7">Last 1 week</Select.Option>
                  <Select.Option value="30">Last 1 month</Select.Option>
                  <Select.Option value="365">Last 1 year</Select.Option>
                  <Select.Option value="custom">custom</Select.Option>
                </Select>
                {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)} />}
              </div>

              <div>
                <h6>Select type</h6>
                <Select value={type} onChange={(values)=>setType(values)}>
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </div>

              <div className='mx-2 switch-icons'>
                <UnderlineOutlined className={`mx-2 ${viewData==='table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData("table")} />
                <AreaChartOutlined className={`mx-2 ${viewData==='analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData("analytics")}/>
              </div>

              <div>
                <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
              </div>

            </div>
            <div className="content">
              {viewData === "table" ? <Table columns={columns} dataSource={allTransactions} /> : <Analytics allTransactions={allTransactions}/>}
            </div>

            <Modal title={editable ? 'Edit Transaction':'Add Transaction'} open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
              <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
                <Form.Item label="Amount" name="amount">
                  <Input type="text" />
                </Form.Item>
                <Form.Item label="Type" name="type">
                  <Select>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                <Select>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="tip">Tip</Select.Option>
                    <Select.Option value="project">Project</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="movie">Movie</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="medical">Medical</Select.Option>
                    <Select.Option value="fee">Fee</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                  <Input type="date" />
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                  <Input type="text" />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input type="text" />
                </Form.Item>
                <div className="d-flex justify-content-end">
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
              </Form>

            </Modal>
        </Layout>
  )
}

export default HomePage