import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import charity1 from "../Images/charity1.jpg";
import getImage from "../Images/getImage";

export default function MyRequest(props) {
  const [verifiedReq, setVerifiedReq] = useState([]);
  const [unverifiedReq, setUnverifiedReq] = useState([]);
  const [completedReq, setCompletedReq] = useState([]);
  const [verifiedLength, setVerifiedLength] = useState(0);
  const [unverifiedLength, setUnverifiedLength] = useState(0);
  const [completedLength, setCompletedLength] = useState(0);

  useEffect(() => {
    async function getData() {
      let verifiedLength = await props.contract.methods
        .verifiedRequestsLength()
        .call();
      let unverifiedLength = await props.contract.methods
        .unverifiedRequestsLength()
        .call();
      let tempVer = [],
        tempUnver = [];
      for (let i = 0; i < verifiedLength; ++i) {
        let data = await props.contract.methods.verifiedRequests(i).call();
        tempVer.push(data);
      }
      for (let i = 0; i < unverifiedLength; ++i) {
        let data = await props.contract.methods.unverifiedRequests(i).call();
        tempUnver.push(data);
      }
      let filteredVerified = tempVer.filter((req) => {
        return req.owner === props.account;
      });
      let filteredUnverified = tempUnver.filter((req) => {
        return req.owner === props.account;
      });
      let filteredCompleted = filteredVerified.filter((req) => {
        return req.status === "1";
      });
      filteredVerified = filteredVerified.filter((req) => {
        return req.status === "0";
      });

      setUnverifiedReq(filteredUnverified);
      setUnverifiedLength(filteredUnverified.length);
      setVerifiedReq(filteredVerified);
      setVerifiedLength(filteredVerified.length);
      setCompletedReq(filteredCompleted);
      setCompletedLength(filteredCompleted.length);
    }
    if (props.loaded) {
      getData();
    }
  }, [props.loaded]);
  return (
    <div>
      <div className="blur verify-bg"></div>
      <Container>
        {verifiedLength === 0 ? " " : <div
          style={{
            fontFamily: "Orbitron",
            fontWeight: "900",
            fontSize: "50px",
            marginTop: "5vh",
            color: "white",
          }}
        >
          Unverified Requests
        </div>}
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {unverifiedReq.map((_, idx) => (
            <Col key={idx}>
              <Card className="m-2 card-bg " style={{ borderRadius: "16px" }}>
                <Card.Img
                  variant="top"
                  src={getImage(_.img)}
                  style={{
                    height: "370px",
                    width: "400px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="text-light">
                  <Card.Title>{_.title}</Card.Title>
                  <Card.Text>{_.descriptionHash}</Card.Text>
                  <div style={{ marginLeft: "4.5vw" }}>
                    <button
                      variant="primary"
                      className="btn-grad mt-3"
                      style={{ margin: "5px", padding: "5px 30px" }}
                    >
                      {" "}
                      <a
                        target="_blank"
                        href={_.docHash}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        View Documents
                      </a>{" "}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {verifiedLength === 0 ? " " : <div
          style={{
            fontFamily: "Orbitron",
            fontWeight: "900",
            fontSize: "50px",
            marginTop: "5vh",
            color: "white",
          }}
        >
          Verified Requests
        </div>}
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {verifiedReq.map((_, idx) => (
            <Col key={idx}>
              <Card className="m-2 card-bg " style={{ borderRadius: "16px" }}>
                <Card.Img
                  variant="top"
                  src={getImage(_.img)}
                  style={{
                    height: "370px",
                    width: "400px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="text-light">
                  <Card.Title>{_.title}</Card.Title>
                  <Card.Text>{_.descriptionHash}</Card.Text>
                  <div style={{ marginLeft: "4.5vw" }}>
                    <button
                      variant="primary"
                      className="btn-grad mt-3"
                      style={{ margin: "5px", padding: "5px 30px" }}
                    >
                      {" "}
                      <a
                        target="_blank"
                        href={_.docHash}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        View Documents
                      </a>{" "}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div
          style={{
            fontFamily: "Orbitron",
            fontWeight: "900",
            fontSize: "50px",
            marginTop: "5vh",
            color: "white",
          }}
        >
          Completed Requests
        </div>
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {completedReq.map((_, idx) => (
            <Col key={idx}>
              <Card className="m-2 card-bg " style={{ borderRadius: "16px" }}>
                <Card.Img
                  variant="top"
                  src={getImage(_.img)}
                  style={{
                    height: "370px",
                    width: "400px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="text-light">
                  <Card.Title>{_.title}</Card.Title>
                  <Card.Text>{_.descriptionHash}</Card.Text>
                  <div style={{ marginLeft: "4.5vw" }}>
                    <button
                      variant="primary"
                      className="btn-grad mt-3"
                      style={{ margin: "5px", padding: "5px 30px" }}
                    >
                      {" "}
                      <a
                        target="_blank"
                        href={_.docHash}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        View Documents
                      </a>{" "}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
