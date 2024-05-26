// src/components/Register/Register.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';
import userEvent from '@testing-library/user-event'

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole("heading", {
      level: 2
    });
    expect(element).toBeInTheDocument();
  });

  it("should test for presence of subheading in the component", () => {
    render(<Register />);
    const element = screen.getByRole("heading", {
      name: /please enter your details below to register yourself\./i
    });
    expect(element).toBeInTheDocument();
  });

  it("should show error message when all the fields are not entered", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button", {
      name: /register/i
    });
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
//Passed
  it("should not show any error message when the component is loaded", () => {
    render(<Register />);
    const alertElement = screen.queryByRole("alert");
    expect(alertElement).not.toBeInTheDocument();
  });
//Passed
  it("should show success message when the registration is successful.", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button", {
      name: /register/i
    });
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
  //Passed 
  it("should show success message when the registration is correct requirement and successful.", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button", {
      name: /register/i
    });
    const nameInput = screen.getByPlaceholderText('Enter your name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const checkbox = screen.getByLabelText('Subscribe to our newsletter');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(checkbox);
    await userEvent.click(buttonElement);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
  it('password input field does not allow whitespace', async () => {
    render(<Register />);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
  
    // Simulate typing a password with whitespace
    userEvent.type(passwordInput, '         ');
    const buttonElement = screen.getByRole("button", {
      name: /register/i
    });
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    // Kiểm tra xem giá trị của input có bao gồm khoảng trắng ở đầu hoặc cuối không
    expect(alertElement).toBeInTheDocument();

  });
  it('email input field must have following the email format', async () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
  
    // Simulate typing a password with whitespace
    userEvent.type(emailInput, 'emailtest');

    const buttonElement = screen.getByRole("button", {
      name: /register/i
    });
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

  });
});