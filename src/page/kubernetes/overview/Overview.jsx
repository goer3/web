import React from 'react';
import { Helmet } from 'react-helmet';
import { TitleSuffix } from '@/components/Text';
import { Row, Col, Card } from 'antd';
import { ChartGauge } from '@/components/chart/Gauge';
import { ChartLineArea } from '@/components/chart/LineArea';
import { ChartRadar } from '@/components/chart/Radar';
import { ChartRadar2 } from '@/components/chart/Radar2';
import { ChartBar } from '@/components/chart/Bar';

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
      <div className="dk-page-main" style={{padding: "10px"}}>
        <Row gutter={10} style={{marginBottom: "10px"}}>
          <Col className="gutter-row" span={4}>
            <Card title="Gauge" extra={<a href="#">More</a>}>
              <ChartGauge data={65} height="200px" />
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card title="Line Area" extra={<a href="#">More</a>}>
              <ChartLineArea height="200px" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card title="Radar" extra={<a href="#">More</a>}>
              <ChartRadar height="200px" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card title="Radar 2" extra={<a href="#">More</a>}>
              <ChartRadar2 height="200px" />
            </Card>
          </Col>
        </Row>
        <Row gutter={10} style={{marginBottom: "10px"}}>
          <Col className="gutter-row" span={12}>
            <Card title="Bar" extra={<a href="#">More</a>}>
              <ChartBar height="200px" />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Overview;
