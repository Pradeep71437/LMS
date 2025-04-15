import React, { useState, useEffect } from 'react';
import Coorfooter from './Coorfooter';
import axios from 'axios';
import educatorIcon from '../../../Pictures/educator.jpg'; // Updated icon path
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EducatorList() {
  const [educators, setEducators] = useState([]);

  useEffect(() => {
    const role = { role: "educator" };
    axios({
      url: "http://localhost:4000/educatorlist",
      method: "POST",
      data: JSON.stringify(role),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data);
        setEducators(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="educator-list-containersss">
      <main className="educator-list-main">
        {educators.length > 0 ? (
          <Container>
            <Row>
              {educators.map((educator) => (
                <Col xs={12} md={6} lg={4} className="educator-card" key={educator.id}>
                  <div>
                    <img
                      src={educatorIcon}
                      alt="educator"
                      className="educator-image"
                    />
                  </div>
                  <div className="educator-info">
                    <p>
                      <span className="label">Name: </span>
                      {educator.name}
                    </p>
                    <p>
                      <span className="label">Email: </span>
                      {educator.email}
                    </p>
                    <p>
                      <span className="label">Role: </span>
                      {educator.role}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <p className="no-educators-message">No educators found</p>
        )}
      </main>
      <footer>
        <Coorfooter />
      </footer>
    // </div>
  );
}
