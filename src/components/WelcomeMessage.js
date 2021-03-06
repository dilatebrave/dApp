import React, { Component } from 'react';
import { Modal } from 'antd';

import metamaskLogo from '../img/metamask-image-tiny.png';

class WelcomeMessage extends Component {
  state = {
    visible: localStorage
      ? localStorage.getItem('showWelcomeMessage') === 'true'
      : true
  };

  setIsVisited = e => {
    this.setState({
      visible: false
    });

    if (localStorage) {
      localStorage.setItem('showWelcomeMessage', false);
    }
  };

  render() {
    return (
      <Modal
        title="Welcome To MarketProtocol.io"
        visible={this.state.visible}
        onOk={this.setIsVisited}
        onCancel={this.setIsVisited}
        okText="Proceed to dApp"
      >
        <ul>
          <p>
            <b>Instructions :</b>
          </p>
          <li>
            <span>
              Open MetaMask by clicking the fox{' '}
              <img src={metamaskLogo} alt="MetaMask" width="8%" /> at the
              top-right of your browser.
            </span>
          </li>
          <li>
            Select the Network on the top left as <b>"Rinkeby Test Network"</b>{' '}
            and restart the browser tab.
          </li>
          <li>
            You have got test ethers? No? No problem, you can get your test
            ethers{' '}
            <span>
              <a
                href="https://faucet.rinkeby.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
            </span>
          </li>
        </ul>
      </Modal>
    );
  }
}

export default WelcomeMessage;
