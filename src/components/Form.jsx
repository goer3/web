import { Input, Select, InputNumber, DatePicker, Checkbox, Switch, TimePicker, Radio, TreeSelect, Form } from 'antd';

// 组件类型
const FormItemComponentType = {
    input: (props) => <Input {...props} />,
    textarea: (props) => <Input.TextArea {...props} />,
    password: (props) => <Input.Password {...props} />,
    number: (props) => <InputNumber {...props} />,
    checkbox: (props) => <Checkbox {...props} />,
    switch: (props) => <Switch {...props} />,
    radio: (props) => <Radio {...props} />,
    select: (props) => <Select {...props} />,
    treeSelect: (props) => <TreeSelect {...props} />,
    datePicker: (props) => <DatePicker {...props} />,
    timePicker: (props) => <TimePicker {...props} />,
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
