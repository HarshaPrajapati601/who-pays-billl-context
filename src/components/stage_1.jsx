import React, { useContext, useRef, useState } from "react";
import { MyContext } from "../context";
import { Button, Form, Alert, FormGroup, FormControl } from "react-bootstrap";

const Stage1 = () => {
  const textInputRef = useRef();

  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);

  const validateInput = (val) => {
    if (val === "") {
      setError([true, "Sorry you need to add something"]);
      return false;
    }
    if (val.length <= 2) {
      setError([true, "Sorry you need more than 2 characters atleast"]);
      return false;
    }
    return true;
  };

  console.log("context", context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInputRef.current.value;
    const validate = validateInput(value);
    console.log(validate, error[1], value);
    if (validate) {
      setError([false, ""]);
      context.addPlayers(value);
      textInputRef.current.value = "";
    }
    console.log(value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <FormGroup>
          <FormControl
            type="text"
            placeholder="add player"
            name="player"
            ref={textInputRef}
          />
        </FormGroup>
        {error[0] ? <Alert>{error[1]}</Alert> : null}
        <Button variant="primary" className="miami" type="submit">
          Add Player
        </Button>

        {context.state.players && context.state.players.length > 0 ? (
          <>
            <hr />
            <div>
              <ul className="list-group">
                {context.state.players.map((obj, index) => {
                  return (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                    >
                      {obj}
                      <span
                        className="badge badge-success"
                        onClick={() =>{
                          context.removePlayer(index)
                        }
                        }
                      >
                        X
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="action_button"
              onClick={() => context.nextStage()}>
                Next


              </div>
            </div>
          </>
        ) : null}
      </Form>
    </>
  );
};
export default Stage1;
