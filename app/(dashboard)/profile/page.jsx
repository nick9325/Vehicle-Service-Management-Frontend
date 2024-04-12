'use client'

import { Col, Row, Container } from 'react-bootstrap';



import {
  AboutMe,
  ProfileHeader,
  ProjectsContributions,

} from 'sub-components'

const Profile = () => {
  return (
    <Container fluid className="p-6">

      <ProfileHeader />


      <div className="py-6">
        <Row>


          <AboutMe />

          <ProjectsContributions />


        </Row>
      </div>

    </Container>
  )
}

export default Profile