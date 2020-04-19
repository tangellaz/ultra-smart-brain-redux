import React from 'react';
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:'',
			fieldFlag: true
		}
	}
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}
	onSubmitSignIn = () => {
		// console.log(this.state.fieldFlag)
		if (this.state.signInEmail !== "" && this.state.signInPassword !== "") {
			fetch('https://boiling-sea-92403.herokuapp.com/signin', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				})
			})
			.then(response => response.json()
				.then(data=> {
		    		if(data.id) {
					    this.props.loadUser(data);
				    	this.props.onRouteChange('home');
			    	} else if (response.status === 400) {
			    		// console.log('Email and Password mismatch');
			    		this.setState({fieldFlag: false})
			    	}
				}))
		} else {
			// console.log("missing fields");
			this.setState({fieldFlag: false})
		}
	}

	onKeyPress = (e) => {
	    if(e.which === 13) {
	      this.onSubmitSignIn()
	    }
  	}

	render() {
		const {onRouteChange} = this.props;
		return (
		  <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure" >
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
			        	onChange={this.onEmailChange}
			        	type="email" name="email-address" id="email-address"
			        	onKeyDown={this.onKeyPress}
		        	/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
				        className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
				        onChange={this.onPasswordChange}
				        type="password" name="password" id="password"
				        onKeyDown={this.onKeyPress}
				    />
			      </div>
			    </fieldset>
			    {this.state.fieldFlag === false
		    	? 				
			    <div>
					<p className='f6 b dark-red'>
					{'Invalid Email and Password.'}
					</p>
				</div>
				: null
			    }
			    <div className="">
			      <input 
				      onClick={this.onSubmitSignIn}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in"
				  />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
			    </div>
			  </div>
			</main>
		  </article>
		);
	}
}
export default SignIn;