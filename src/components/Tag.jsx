import { Tag } from 'antd';
import { ManOutlined, QuestionOutlined, WomanOutlined } from '@ant-design/icons';

// 生成状态标签
const GenerateStatusTag = (status) => {
  const vcmap = {
    1: 'green',
    2: 'red'
  };
  const color = vcmap[status] || '';
  return (
    <Tag size="small" bordered={false} color={color}>
      {status === 1 ? '启用' : '禁用'}
    </Tag>
  );
};

// 生成请求方式标签
const GenerateMethodTag = (method) => {
  const vcmap = {
    GET: 'green',
    POST: 'blue',
    PUT: 'purple',
    DELETE: 'magenta',
    PATCH: 'cyan'
  };
  const color = vcmap[method] || '';
  return (
    <Tag bordered={false} color={color}>
      {method}
    </Tag>
  );
};

// 生成性别徽章
const GenerateGenderBadge = (gender) => {
  const icons = {
    1: <ManOutlined style={{ backgroundColor: '#165dff' }} />,
    2: <WomanOutlined style={{ backgroundColor: '#ff4d4f' }} />,
    default: <QuestionOutlined style={{ backgroundColor: '#999999' }} />
  };
  return icons[gender] || icons.default;
};

// 生成性别图标
const GenerateGenderIcon = (gender) => {
  const icons = {
    1: <ManOutlined style={{ color: '#165dff' }} />,
    2: <WomanOutlined style={{ color: '#ff4d4f' }} />,
    default: <QuestionOutlined style={{ color: '#999999' }} />
  };
  return icons[gender] || icons.default;
};

export { GenerateStatusTag, GenerateMethodTag, GenerateGenderIcon, GenerateGenderBadge };
