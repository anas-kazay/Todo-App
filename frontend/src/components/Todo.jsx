import { useNavigate, useParams } from "react-router-dom";
import { retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../security/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Todo() {
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const authContext = useContext(AuthContext);
  const username = authContext.username;

  const navigate = useNavigate();

  function retrieveTodos() {
    retrieveTodoApi(username, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => retrieveTodos(), [id]);

  function onSubmit(values) {
    //console.log(values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    //console.log(todo);
    updateTodoApi(username, id, todo)
      .then((response) => {
        navigate("/todos");
      })
      .catch((error) => console.log(error));
  }

  function validate(values) {
    let errors = {};
    if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characters";
    }
    if (values.targetDate == null) {
      errors.description = "Enter a target date";
    }
    console.log(values);
    return errors;
  }

  return (
    <div className="container col-6">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component={"div"}
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component={"div"}
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
