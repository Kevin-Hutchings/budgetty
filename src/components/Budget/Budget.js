import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import { requestUserData } from '../../dux/userReducer';
import { requestBudgetData, addPurchase, removePurchase } from '../../dux/budgetReducer';
import { connect } from 'react-redux';
import './Budget.css';

class Budget extends Component {
  componentDidMount() {
    const { requestUserData, requestBudgetData } = this.props;
    requestUserData();
    requestBudgetData();
  }

  render() {
    const { loading, purchases, budgetLimit } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    const { addPurchase, removePurchase } = this.props;

    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps({budget, user}) {
  return {
    budget,
    user,
  }
}

const mapDispatchToProps = {
  requestUserData,
  requestBudgetData,
  addPurchase,
  removePurchase,
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);