import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../asset/css/components-css/Layout.css";
import { Sidebar } from "../sidebar/Sidebar";
import { TopNav } from "../topnav/TopNav";

/**
 * @author TuDang
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="slidebar">
              <Sidebar />
            </Col>

            <Col
              className="right-content"
              md={10}
              style={{
                marginLeft: "300px",
                position: "relative",
                paddingTop: "110px",
              }}
            >
              <TopNav dashboard={props.dashboard} />
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};