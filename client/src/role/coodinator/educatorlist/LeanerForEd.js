import React, { useState, useEffect } from 'react';
import Coorfooter from './Coorfooter';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import learnerIcon from '../../../Pictures/leaner.png'; // Updated icon path for learners

export default function LearnerList() {
    // Updated state name for learners
    const [learnerList, setLearnerList] = useState([]);

    useEffect(() => {
        const role = { role: "educator" };
        axios({
            url: "http://localhost:4000/educatorlist",
            method: "POST",
            data: JSON.stringify(role),
            headers: { "Content-Type": "application/json" },

        }).then((res) => {
            console.log(res.data)
            setLearnerList(res.data)

        }).catch((e) => {
            console.log(e)
        })

    }, [])
    return (
        <div>
            <main className="learner-list-main">
                {learnerList.length > 0 ? (
                    <Container>
                        <Row>
                            {learnerList.map((learner) => (
                                <Col xs={12} md={6} lg={4} key={learner._id} className="learner-card">
                                    <div>
                                        <img
                                            className="learner-card-img"
                                            src={learnerIcon}
                                            alt="Learner"
                                            height="100px"
                                            width="100px"
                                        />
                                    </div>
                                    <div className="learner-card-details">
                                        <p>
                                            <span className="detail-label">Name:</span> {learner.name}
                                        </p>
                                        <p>
                                            <span className="detail-label">Email:</span> {learner.email}
                                        </p>
                                        <p>
                                            <span className="detail-label">Role:</span> {learner.role}
                                        </p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                ) : (
                    <p className="no-learners-message">No learners found</p>
                )}
            </main>
            <footer>
                <Coorfooter />
            </footer>
        </div>
    );
}
