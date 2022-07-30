import React from "react";
import { shallow, mount } from "enzyme";
import axios from "axios";
import { act } from "react-dom/test-utils";

import App from "./App";

jest.mock("axios");

const data = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
];

describe("<App />", () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();

    wrapper = shallow(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("app renders correctly", () => {
    shallow(<App />);
  });

  it("search string should be empty initially", () => {
    expect(wrapper.find('input[name="search"]').prop("value")).toBe("");
  });

  it("search string value should update on entering text", () => {
    wrapper.find('input[name="search"]').simulate("change", {
      target: {
        value: "test string",
      },
    });
    expect(wrapper.find('input[name="search"]').prop("value")).toBe(
      "test string"
    );
  });

  it("api call", async () => {
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(data));
      wrapper = mount(<App />);
    });

    await expect(axios.get).toHaveBeenCalledWith(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    await expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
