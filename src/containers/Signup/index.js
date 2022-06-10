import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "../../actions/user.actions";

/**
 * @author
 * @function Signup
 **/

export const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
      username,
    };

    dispatch(UserAction.signup(user));
  };

  if (auth.authenticate) {
    return <Navigate to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <form onSubmit={userSignup}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputlastName1" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputlastName1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputFirstName1" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputFirstName1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleUserName1" class="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleUserName1"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

//   return (
//     <Layout>
//       <Container>
//         <Row style={{ marginTop: "50px" }}>
//           <Col md={{ span: 6, offset: 3 }}>
//             <form onSubmit={userSignup}>
//               <Input
//                 class="form-control"
//                 label="First Name"
//                 placeholder="First Name"
//                 value={firstName}
//                 type="text"
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <Input
//                 class="form-control"
//                 label="Last Name"
//                 placeholder="Last Name"
//                 value={lastName}
//                 type="text"
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               <Input
//                 class="form-control"
//                 label="Email"
//                 placeholder="Email"
//                 value={email}
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Input
//                 class="form-control"
//                 label="Password"
//                 placeholder="Password"
//                 value={password}
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </form>
//           </Col>
//         </Row>
//       </Container>
//     </Layout>
//   );
// };
