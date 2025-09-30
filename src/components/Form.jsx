import { Input, Select, InputNumber, DatePicker, TimePicker, TreeSelect, Form, ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// 组件类型
const FormItemComponentType = {
    input: (props) => <Input {...props} />,
    textarea: (props) => <Input.TextArea {...props} />,
    password: (props) => <Input.Password {...props} />,
    number: (props) => <InputNumber {...props} />,
    select: (props) => <Select {...props} />,
    treeSelect: (props) => <TreeSelect {...props} />,
    datePicker: (props) => (
        <ConfigProvider locale={locale}>
            <DatePicker {...props} style={{ width: props?.width }} />
        </ConfigProvider>
    ),
    timePicker: (props) => <TimePicker {...props} style={{ width: props?.width }} />,
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
