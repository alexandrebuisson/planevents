import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';
import { setUser } from './actions/Auth';

class CheckToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    const { user, setUser } = this.props;
    const { checked } = this.state;
    const token = Cookies.get('token');
    if (!checked && token && !user) {
      fetch(`http://localhost:4000/api/isconnected/${token}`)
        .then(results => results.json())
        .then((data) => {
          setUser(data, token);
          this.setState({
            checked: true,
          });
        });
    } else {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { checked } = this.state;
    if (checked) {
      return children;
    }
    return ''
  }
}

const mstp = state => ({
  user: state.authReducer.user.name,
});

const mdtp = dispatch => bindActionCreators({ setUser }, dispatch);


export default connect(mstp, mdtp)(CheckToken);