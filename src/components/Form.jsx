import { ConfigProvider, DatePicker, Form, Input, InputNumber, Select, TimePicker, TreeSelect } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// 组件类型
const FormItemComponentType = {
  input: (props) => <Input {...props} autoComplete="off" />,
  textarea: (props) => <Input.TextArea {...props} autoComplete="off" />,
  password: (props) => <Input.Password {...props} autoComplete="off" />,
  number: (props) => <InputNumber {...props} style={{ width: props?.width }} autoComplete="off" />,
  select: (props) => <Select {...props} autoComplete="off" />,
  treeSelect: (props) => <TreeSelect {...props} autoComplete="off" />,
  datePicker: (props) => (
    <ConfigProvider locale={locale}>
      <DatePicker {...props} style={{ width: props?.width }} />
    </ConfigProvider>
  ),
  timePicker: (props) => <TimePicker {...props} style={{ width: props?.width }} />
};

// 传入字段属性，返回 Form.Item 组件
const FormItem = (props) => {
  return (
    <Form.Item key={props?.name} name={props?.name} label={props?.label} rules={props?.rules}>
      {FormItemComponentType[props?.type](props)}
    </Form.Item>
  );
};

export default FormItem;
