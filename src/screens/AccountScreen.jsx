import React from 'react';
import { Container, Tabs } from 'react-bootstrap';

const AccountScreen = () => {
  return (
    <div>
      <div>
        <Tabs defaultActiveKey='overview' justify fill className={`text-link`}>
          test1
        </Tabs>
      </div>
      <Container>
        test2
      </Container>
    </div>
  );
};

export default AccountScreen;