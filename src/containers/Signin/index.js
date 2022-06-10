import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import "antd/dist/antd.css";
import rightImg from "../../asset/img/report.png";
import "./signin.css";
import AuthAction from "../../actions/auth.actions";
/**
 * @author
 * @function Signin
 **/

export const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    dispatch(AuthAction.login(user));
  };

  if (auth.authenticate) {
    return <Navigate to={`/`} />;
  }

  return (
    <div className="sigin-wrapper">
      <div className="row">
        {/* SIGN IN  */}
        <div className="col signin-left">
          <div className="signin__header">
            <div className="logo-name">
              <i class="fas fa-user-shield"></i>
              <span>QUẢN LÝ</span>
            </div>
            <div className="signin">Đăng Nhập</div>
            {/* <div className="signup">Sign up</div> */}
          </div>

          <div className="signin__body">
            <form onSubmit={userLogin}>
              <div className="signin-title">Đăng Nhập</div>
              <div className="signin-desc">
                Đăng nhập để vào ứng dụng quản lý của bạn
              </div>
              <div className="input">
                <i class="far fa-envelope"></i>
                <input
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>

        {/* SIGN UP  */}
        <div className="col signup-left">
          <div className="signin__header">
            <div className="logo-name">
              <i class="fas fa-user-shield"></i>
              <span>ADMIN</span>
            </div>
            <div className="signin">Log In</div>
            <div className="signup">Sign up</div>
          </div>

          <div className="signin__body">
            <form onSubmit={userLogin}>
              <div className="signin-title">Sign In</div>
              <div className="signin-desc">
                Sign in to your admin application
              </div>
              <div className="input">
                <i class="far fa-envelope"></i>
                <input
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Sign in</button>
            </form>
          </div>
        </div>

        {/* IMAGE RIGHT */}
        <div className="col-6">
          <div className="image-right">
            <img src={rightImg} alt="" />
          </div>
        </div>
      </div>
    </div>

    //   <Layout>
    //     <Container>
    //       <Row style={{ marginTop: "50px" }}>
    //         <Col md={{ span: 6, offset: 3 }}>
    //           <form onSubmit={userLogin}>
    //             <div class="mb-3">
    //               <label for="exampleInputEmail1" class="form-label">
    //                 Email address
    //               </label>
    //               <input
    //                 type="email"
    //                 class="form-control"
    //                 id="exampleInputEmail1"
    //                 aria-describedby="emailHelp"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //               <div id="emailHelp" class="form-text">
    //                 We'll never share your email with anyone else.
    //               </div>
    //             </div>
    //             <div class="mb-3">
    //               <label for="exampleInputPassword1" class="form-label">
    //                 Password
    //               </label>
    //               <input
    //                 type="password"
    //                 class="form-control"
    //                 id="exampleInputPassword1"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //             </div>
    //             <button type="submit" class="btn btn-primary">
    //               Submit
    //             </button>
    //           </form>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </Layout>
  );
};
