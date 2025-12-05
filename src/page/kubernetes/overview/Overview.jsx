import React from 'react';
import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { Row, Col, Card } from 'antd';
import { ChartGauge } from '@/components/chart/Gauge';
import { ChartArea } from '@/components/chart/Area';
import { ChartRadar } from '@/components/chart/Radar';

// 页面配置
const config = {
  title: '集群概览'
};

const Overview = () => {
  return (
    <>
      <Helmet>
        <title>{config.title + TitleSuffix}</title>
      </Helmet>
      <div className="dk-page-main">
        <Row gutter={10} style={{ padding: '10px' }}>
          <Col className="gutter-row" span={4}>
            <Card title="Gauge" extra={<a href="#">More</a>}>
              <ChartGauge data={65} height='200px' />
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card title="Line Area" extra={<a href="#">More</a>}>
              <ChartArea height='200px' />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card title="Radar" extra={<a href="#">More</a>}>
              <ChartRadar height='200px' />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Overview;
