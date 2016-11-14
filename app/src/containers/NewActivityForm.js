import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DateService from '~/utils/DateService';

import * as activityActions from '~/actions/activities';

class NewActivityForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.addActivity = this.addActivity.bind(this);
  }

  componentDidMount() {
    this.activityInput.value = '';
    this.props.actions.getActivities();
  }

  addActivity(e) {
    e.preventDefault();
    const today = DateService.todayUnix();
    this.props.actions.addActivity({ timestamp: today, activity: this.activityInput.value.trim() });
    this.activityInput.value = '';
  }

  render() {
    return (
      <form
        autoComplete="off"
        className="grid grid--center"
        onSubmit={this.addActivity}
      >
        <div className="grid__item grid__item--3-4">
          <input
            type="text"
            ref={(ref) => { this.activityInput = ref; }}
            name="activity"
            placeholder="What did you do?"
            className="w--1-1 font--11-10 p-"
          />
        </div>
        <div className="grid__item grid__item--1-4">
          <button className="w--1-1 font--11-10 pv-">Save</button>
        </div>
      </form>
    );
  }
}

NewActivityForm.propTypes = {
  actions: PropTypes.object,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewActivityForm);
