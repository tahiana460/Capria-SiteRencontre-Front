import React, {  Component } from 'react';
import './Registration.css';
import Registration_step1 from './Registration_step1';
import Registration_step2 from './Registration_step2';
import Registration_step3 from './Registration_step3';

export class Registration extends Component {

  state = {
      step: 1,
      pseudo: '',
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      firstname: '',
      gender: '',
      date_of_birth: '',
      city: '',
      nationality: '',
      sexual_orientation: '',
      profile_picture: '/photo/default.jpg',
      profile_picture_file: ''
  };

  nextStep = () => {
      const { step } = this.state;
      this.setState({ step: step + 1 });
  };

  prevStep = () => {
      const { step } = this.state;
      this.setState({ step: step - 1 });
  };

  inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
  };

  changeProfilePicture = (file, imagePreviewUrl) => {
    this.setState({
        profile_picture_file: file,
        profile_picture: imagePreviewUrl
    });
  }

  render () {
    const { step } = this.state;
    const {pseudo, email, password, confirm_password, name, firstname, gender, date_of_birth, city, nationality, sexual_orientation, profile_picture, profile_picture_file} = this.state;
    const values = { pseudo, email, password, confirm_password, name, firstname, gender, date_of_birth, city, nationality, sexual_orientation, profile_picture, profile_picture_file };

    switch (step) {
        case 1:
            return (
                <Registration_step1
                    nextStep={this.nextStep}
                    inputChange={this.inputChange}
                    values={values}
                />
            );
        case 2:
            return (
                <Registration_step2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    inputChange={this.inputChange}
                    values={values}
                />
            );
        case 3:
            return (
                <Registration_step3
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    inputChange={this.inputChange}
                    values={values}
                    changeProfilePicture={this.changeProfilePicture}
                />
            );
    }
  }
}

export default Registration