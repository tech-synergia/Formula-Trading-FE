import React, { useState } from "react";
import { Form, Input, Button, message, Alert } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");

  const onFinish = (values) => {
    setLoading(true);

    // Simulate API call for password reset
    setTimeout(() => {
      setLoading(false);
      message.success("Password reset successful");
      // Redirect to login or another page
    }, 2000);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.235.79.219/api/auth/reset-password",
        {
          email,
          token,
          password,
        }
      );
      alert(response.data);
      window.location.href = "/#login";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Reset Password</h2>
      <Form
        form={form}
        name="forgot-password-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter a new password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
