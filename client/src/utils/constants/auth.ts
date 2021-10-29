const RegisterSpecificVariables = {
  welcome: 'welcome to',
  description: 'Choose from more that 50 programming challenges,\nand complete them in Your favorite programming language.',
  link: {
    value: '/login',
    caption: 'Already have an account?',
  },
  checkboxCaption: 'I agree to the terms of service',
  submitCaption: 'Sign Up',
  columnHeight: '60%',
};

const LoginSpecificVariables = {
  welcome: 'welcome back to',
  description: 'Keep progressing and climb the ranking ladder',
  link: {
    value: '/register',
    caption: 'First time?',
  },
  checkboxCaption: 'Remember me',
  submitCaption: 'Sign In',
  columnHeight: '40%',
};

const NotFoundSpecificVariables = {
  header: 'Something went wrong :(',
  description: 'We regret to inform you that evil error occured and you ended up on this subpage.',
  link: {
    value: '.',
    caption: 'Click here to get back on starting page',
  },
  columnHeight: '45%',
};

export { RegisterSpecificVariables, LoginSpecificVariables, NotFoundSpecificVariables };
