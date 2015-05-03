AccountsTemplates.configure({
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,

  // behavior
  confirmPassword: true,
  enablePasswordChange: true,
  sendVerificationEmail: true,

  // Redirects: when the user logs in, this is the first page they end up at
  // In future, they will go to a dashboard page which show the wealth of the information
  homeRoutePath: '/tabs/inbox',

  // appearance
  // showForgotPasswordLink: true,

  // Texts
	texts: {
	  button: {
	      signUp: "Join Now!"
	  },
	  socialSignUp: "Join",
	  socialIcons: {
	      "meteor-developer": "fa fa-rocket"
	  },
	  title: {
	      forgotPwd: "Recover Your Password"
	  },
	},
});

/** AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
]); **/
AccountsTemplates.removeField('email');
//AccountsTemplates.removeField('password');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      displayName: "Login",
  },
  {
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
  },
]);

AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
  {
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
  }
]);
