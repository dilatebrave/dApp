import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import GasPriceField from '../../src/components/GasPriceField';

describe('GasPriceField', () => {
  let gasPriceField;
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = sinon.spy();
    gasPriceField = shallow(<GasPriceField
      onChange={onChangeSpy}
    />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GasPriceField />, div);
  });

  it('should display two input felds to accept gas limit and gas price', () => {
    expect(gasPriceField.find(Input)).to.have.length(2);
  });

  it('should update gasprice with changes in gas price input', () => {
    const price = 3;
    gasPriceField.find(Input).last().simulate('change', { target: { value: price } });
    expect(gasPriceField.state('gasprice')).to.equal(price);
    expect(onChangeSpy).to.have.property('callCount', 1);
  });

  it('should not update gasprice with invalid gas price input', () => {
    const price = 'notnumber';
    const currentprice = gasPriceField.state('gasprice');
    gasPriceField.find(Input).last().simulate('change', { target: { value: price } });
    expect(gasPriceField.state('gasprice')).to.equal(currentprice);
    expect(onChangeSpy).to.have.property('callCount', 0);
  });

  it('should update gaslimit depend on location', () => {
    const testGasPriceField = shallow(<GasPriceField
      location={{ pathname: '/test' }}
    />);
    expect(testGasPriceField.state('gaslimit')).to.equal(200000);
    const deployGasPriceField = shallow(<GasPriceField
      location={{ pathname: '/contract/deploy' }}
    />);
    expect(deployGasPriceField.state('gaslimit')).to.equal(5700000);
  });

  it('should return estimate time depend on price', () => {
    const condition = {"safeLow": 10.0, "safelow_calc": 10.0, "average_txpool": 20.0, "blockNum": 5496235, "speed": 0.9979251253887605, "fast": 50.0, "avgWait": 3.4, "average_calc": 20.0, "safeLowWait": 7.7, "fastest": 200.0, "safelow_txpool": 10.0, "block_time": 15.831632653061224, "fastWait": 0.5, "average": 20.0, "fastestWait": 0.5};
    expect(gasPriceField.instance().getTime(condition, condition.fastest / 10)).to.equal(condition.fastestWait);
    expect(gasPriceField.instance().getTime(condition, condition.fast / 10)).to.equal(condition.fastWait);
    expect(gasPriceField.instance().getTime(condition, condition.average / 10)).to.equal(condition.avgWait);
    expect(gasPriceField.instance().getTime(condition, condition.safeLow / 10)).to.equal(condition.safeLowWait);
    expect(gasPriceField.instance().getTime(condition, 0)).to.equal(-1);
    expect(gasPriceField.instance().getTime(null, condition.fastest)).to.equal(-1);
  });
});
