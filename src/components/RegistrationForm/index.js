import {Component, validate} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    mobileInput: '',
    emailInput: '',
    showNameError: false,
    showMobileError: false,
    showEmailError: false,
    isFormSubmitted: false,
  }

  onBlurMobileNumber = () => {
    const isValidMobileNumber = this.validateMobileNumber()

    this.setState({showMobileError: !isValidMobileNumber})
  }

  onChangeMobileNumber = event => {
    this.setState({
      mobileInput: event.target.value,
    })
  }

  renderMobileNumberField = () => {
    const {mobileInput, showMobileError} = this.state
    const className = showMobileError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="mobileNumber">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumbers"
          className={className}
          value={mobileInput}
          placeholder="Mobile Number"
          onChange={this.onChangeMobileNumber}
          onBlur={this.onBlurMobileNumber}
        />
      </div>
    )
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onChangeEmail = event => {
    this.setState({
      emailInput: event.target.value,
    })
  }

  renderEmailField = () => {
    const {emailInput, showEmailError} = this.state
    const className = showEmailError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={className}
          value={emailInput}
          placeholder="Email"
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    this.setState({
      firstNameInput: event.target.value,
    })
  }

  renderFirstNameField = () => {
    const {firstNameInput, showNameError} = this.state
    const className = showNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          NAME
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateMobileNumber = () => {
    const {mobileInput} = this.state

    return mobileInput !== ''
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  validateEmail = () => {
    const {emailInput} = this.state

    return emailInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidMobileNumber = this.validateMobileNumber()
    const isValidEmail = this.validateEmail()

    if (isValidFirstName && isValidMobileNumber && isValidEmail) {
      this.setState({isFormSubmitted: true})
      validate('/')
    } else {
      this.setState({
        showNameError: !isValidFirstName,
        showMobileError: !isValidMobileNumber,
        showEmailError: !isValidEmail,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showNameError, showMobileError, showEmailError} = this.state

    return (
      <form
        className="form-container"
        action="connect.php"
        method="post"
        onSubmit={this.onSubmitForm}
      >
        {this.renderFirstNameField()}
        {showNameError && <p className="error-message">Required</p>}
        {this.renderMobileNumberField()}
        {showMobileError && <p className="error-message">Required</p>}
        {this.renderEmailField()}
        {showEmailError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      mobileInput: '',
      emailInput: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
