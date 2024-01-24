import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import ModalAlert from "./ModalAlert";
function SegmentModalPart({ show, close }) {
  const [value, setValue] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [error, SetError] = useState({
    dropError: false,
    inputError: false,
    containError: false,
  });

  const [state, setState] = useState({
    segmentName: "",
    content: [],
    boxStyle: { height: "100px", border: "4px solid #61dafb" },
  });

  const userTraits = [
    "first_name",
    "last_name",
    "gender",
    "age",
    "account_name",
  ];
  const groupTraits = ["city", "state"];
  const handleUpdateContent = (e) => {
    SetError((prev) => ({
      ...prev,
      containError: false,
      dropError: false,
    }));
    setValue(e.target.value);
  };
  const handleSegmentName = (e) => {
    setState((prev) => ({
      ...prev,
      segmentName: e.target.value,
    }));

    SetError((prev) => ({
      ...prev,
      inputError: false,
    }));
  };
  const handleSaveSegment = () => {
    let err = 0;
    if (state.content.length === 0) {
      SetError((prev) => ({
        ...prev,
        containError: true,
      }));
      err = 1;
    }
    if (state.segmentName === "") {
      SetError((prev) => ({
        ...prev,
        inputError: true,
      }));
      err = 2;
    }

    if (err > 0) {
      return;
    }
    const schema = state.content.map((fieldName) => ({
      [fieldName]:
        fieldName === "first_name"
          ? "First Name"
          : fieldName === "last_name"
          ? "Last Name"
          : fieldName === "age"
          ? "Age"
          : fieldName === "gender"
          ? "Gender"
          : fieldName === "account_name"
          ? "Account Name"
          : fieldName === "city"
          ? "City"
          : "State",
    }));

    const article = {
      segment_name: state.segmentName,
      schema: schema,
    };
    const getData = JSON.stringify(article);

    axios("https://webhook.site/b25f2141-889c-4b05-99e4-824e87eef27e", {
      method: "POST",
      data: getData,
    })
      .then((res) => {
        console.log(res.data);
        setState({
          segmentName: "",
          content: [],
          boxStyle: { height: "100px", border: "4px solid #61dafb" },
        });
        setAlertShow(true);

        console.log("added succeedly");
      })
      .catch((err) => {
        console.log("Err:" + err.message);
      });
    console.log("saved");
  };

  const handleClose = () => {
    close();
  };

  const hanldeRemove = (index) => {
    console.log(index, "indexxx");
    setState((prev) => {
      const newContent = prev.content.filter((_, i) => i !== index);
      const newHeight = `${parseFloat(prev.boxStyle.height) - 50}px`;
      return {
        ...prev,
        content: newContent,
        boxStyle: {
          ...prev.boxStyle,
          height: newHeight,
        },
      };
    });
  };

  const handleChangeValue = (e, index) => {
    setState((prev) => {
      const newContent = [...prev.content];
      newContent[index] = e.target.value;
      return {
        ...prev,
        content: newContent,
      };
    });
  };

  const handleAddNewSchema = () => {
    console.log("log");

    if (value === "") {
      SetError((prev) => ({
        ...prev,
        dropError: true,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      content: [...prev.content, value],
      boxStyle: {
        ...prev.boxStyle,
        height: `${parseFloat(prev.boxStyle.height) + 50}px`,
      },
    }));
    setTimeout(() => {
      setValue("");
    }, 1000);
  };

  const options = [
    { value: "first_name", label: "First Name" },
    { value: "last_name", label: "Last Name" },
    { value: "gender", label: "Gender" },
    { value: "age", label: "Age" },
    { value: "account_name", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ];

  const hanldeRemove1 = () => {
    setValue("");
    SetError((prev) => ({
      ...prev,
      dropError: false,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setAlertShow(false);
    }, 1000);
  }, [alertShow]);

  return (
    <div style={{ position: "absolute" }}>
      <Modal show={show} size="lg" dialogClassName="custom-modal">
        <Modal.Header closeButton className="padding-30">
          <Modal.Title id="contained-modal-title-vcenter d-flex align-items-center">
            <i className="bi bi-arrow-left-short" onClick={handleClose} />
            Saving Segment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="padding-30">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of the Segment"
                value={state.segmentName}
                onChange={handleSegmentName}
              />

              {error.inputError && (
                <Form.Text className="error_text m-l-0">
                  Please enter the name of the Segment
                </Form.Text>
              )}
            </Form.Group>

            <Form.Text className="font-size-16">
              To save your segments, you need to add the schemas to build the
              query.
            </Form.Text>
            <div className="d-flex justify-content-end">
              <p className="circle"></p>
              <p className="padding-2"> - </p>
              <Form.Text>User Traits</Form.Text>
              <p className="circle1"></p>
              <p className="padding-2"> - </p>
              <Form.Text>Group Traits</Form.Text>
            </div>

            <Container style={state.boxStyle}>
              {state.content.map((val, index) => (
                <ul>
                  <li
                    key={index}
                    className="margin-5 d-flex"
                    style={{ marginLeft: "-40px" }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "100%" }}
                    >
                      <p
                        className={`m-r-20 ${
                          userTraits.includes(val) ? "circle" : "circle1 m-l-0"
                        }`}
                      ></p>
                      <Form.Select
                        size="lg"
                        style={{ height: "40px", width: "70%" }}
                        defaultValue={val}
                        value={state.content[index] || val}
                        onChange={(e) => handleChangeValue(e, index)}
                      >
                        {options.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={state.content.includes(option.value)}
                          >
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        className="m-l-20 remove_btn m-t-6"
                        onClick={() => hanldeRemove(index)}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </Button>
                    </div>
                  </li>
                </ul>
              ))}
            </Container>
            {error.containError && (
              <Form.Text className="error_text m-l-0">
                Please add any of Schema
              </Form.Text>
            )}
            <div
              className="d-flex align-items-center m-t-20 m-l-15"
              style={{ width: "92%" }}
            >
              <p className="circle circle2 m-t-0 m-b-0"></p>
              <Form.Select
                size="lg"
                className=" m-l-20 m-t-0"
                style={{ height: "40px", width: "70%" }}
                value={value}
                onChange={handleUpdateContent}
              >
                <option value="">Select</option>
                {options.map(
                  (option) =>
                    !state.content.includes(option.value) && (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                )}
              </Form.Select>

              <Button
                className="m-l-20 remove_btn"
                onClick={() => hanldeRemove1()}
              >
                <i className="bi bi-dash-lg"></i>
              </Button>
            </div>

            {error.dropError && state.content.length < 7 && (
              <Form.Text className="error_text">
                Please Select the Schema you want to add
              </Form.Text>
            )}
            <NavLink
              className="add_navlink"
              onClick={handleAddNewSchema}
              type="button"
            >
              + Add New Schema
            </NavLink>
          </Form>
        </Modal.Body>
        <Modal.Footer className="padding-30">
          <Button className="save_btn" onClick={handleSaveSegment}>
            Save the Segment
          </Button>
          <Button className="cancel_btn" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div>{alertShow && <ModalAlert alertShow={alertShow} />}</div>
    </div>
  );
}

export default SegmentModalPart;
