import React, { useContext, useEffect, useRef, useState } from 'react';
import EnSysBanner from '../components/EnSysBanner';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import styles from '../styles/StudentSchedulePage.module.css';

function StudentShedulePage() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  //

  // const EditableContext = React.createContext(null);
  // const EditableRow = ({ index, ...props }) => {
  //   const [form] = Form.useForm();
  //   return (
  //     <Form form={form} component={false}>
  //       <EditableContext.Provider value={form}>
  //         <tr {...props} />
  //       </EditableContext.Provider>
  //     </Form>
  //   );
  // };

  // const EditableCell = ({
  //   title,
  //   editable,
  //   children,
  //   dataIndex,
  //   record,
  //   handleSave,
  //   ...restProps
  // }) => {
  //   const [editing, setEditing] = useState(false);
  //   const inputRef = useRef(null);
  //   const form = useContext(EditableContext);
  //   useEffect(() => {
  //     if (editing) {
  //       inputRef.current.focus();
  //     }
  //   }, [editing]);
  //   const toggleEdit = () => {
  //     setEditing(!editing);
  //     form.setFieldsValue({
  //       [dataIndex]: record[dataIndex],
  //     });
  //   };
  //   const save = async () => {
  //     try {
  //       const values = await form.validateFields();
  //       toggleEdit();
  //       handleSave({
  //         ...record,
  //         ...values,
  //       });
  //     } catch (errInfo) {
  //       console.log('Save failed:', errInfo);
  //     }
  //   };
  //   let childNode = children;
  //   if (editable) {
  //     childNode = editing ? (
  //       <Form.Item
  //         style={{
  //           margin: 0,
  //         }}
  //         name={dataIndex}
  //         rules={[
  //           {
  //             required: true,
  //             message: `${title} is required.`,
  //           },
  //         ]}
  //       >
  //         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
  //       </Form.Item>
  //     ) : (
  //       <div
  //         className="editable-cell-value-wrap"
  //         style={{
  //           paddingRight: 24,
  //         }}
  //         onClick={toggleEdit}
  //       >
  //         {children}
  //       </div>
  //     );
  //   }
  //   return <td {...restProps}>{childNode}</td>;
  // };

  const sharedOnCell = (_, index) => {
    if (index === 1) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };

  const data = [
    {
      key: '0',
      name: '7:00-8:00',
    },
    {
      key: '1',
      name: '8:00-9:00',
      friday: 'hi',
    },
    {
      key: '2',
      name: '9:00-10:00',
      wednesday: 'Hey',
    },
    {
      key: '3',
      name: '10:00-11:00',
    },
    {
      key: '4',
      name: '11:00-12:00',
    },
    {
      key: '5',
      name: '12:00-1:00',
    },
    {
      key: '6',
      name: '1:00-2:00',
      wednesday: 'hoy',
    },
    {
      key: '7',
      name: '2:00-3:00',
    },
    {
      key: '8',
      name: '3:00-4:00',
    },
    {
      key: '9',
      name: '4:00-5:00',
    },
    {
      key: '10',
      name: '5:00-6:00',
    },
    {
      key: '11',
      name: '6:00-7:00',
    },
  ];

  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.key !== key);
  //   setDataSource(newData);
  // };

  const columns = [
    {
      title: 'Time',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: 'Monday',
      dataIndex: 'monday',
      width: 100,
    },
    {
      title: 'Tuesday',
      dataIndex: 'tuesday',
      width: 100,
    },
    {
      title: 'Wednesday',
      dataIndex: 'wednesday',
      width: 100,
      onCell: (_, index) => {
        if (index === 2) {
          return {
            rowSpan: 3,
          };
        }

        if (index === 3) {
          return {
            rowSpan: 0,
          };
        }

        if (index === 4) {
          return {
            rowSpan: 0,
          };
        }

        {
          if (index === 6) {
            return {
              rowSpan: 3,
            };
          }

          if (index === 7) {
            return {
              rowSpan: 0,
            };
          }

          if (index === 8) {
            return {
              rowSpan: 0,
            };
          }
        }

        return {};
      },
    },
    {
      title: 'Thursday',
      dataIndex: 'thursday',
      width: 100,
    },
    {
      title: 'Friday',
      dataIndex: 'friday',
      width: 100,
      onCell: (_, index) => {
        if (index === 1) {
          return {
            rowSpan: 2,
          };
        }

        if (index === 2) {
          return {
            rowSpan: 0,
          };
        }

        // if (index === 3) {
        //   return {
        //     rowSpan: 0,
        //   };
        // }

        return {};
      },
    },
    {
      title: 'Saturday',
      dataIndex: 'saturday',
      width: 100,
      // render: (_, record) => (
      //   <Popconfirm
      //     title="Sure to delete?"
      //     onConfirm={() => handleDelete(record.key)}
      //   >
      //     <a>Delete</a>
      //   </Popconfirm>
      // ),
    },
  ];

  // const columns = defaultColumns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });

  return (
    <>
      <EnSysBanner />

      <div>
        <h2>
          Schedule for 1st Semester A.Y. {currentYear} - {nextYear}{' '}
        </h2>
        <div>
          <Table
            className={styles.container}
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </div>
        <div></div>
      </div>
    </>
  );
}

export default StudentShedulePage;
