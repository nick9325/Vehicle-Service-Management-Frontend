'use client'

import { Row, Container } from 'react-bootstrap';
import ProfileHeader from '../../../components/ProfileHeader';
import Spinner from 'react-bootstrap/Spinner';


import { useGlobalContext } from '../context/globalContext';
import AboutUser from '../../../components/AboutUser';

const Profile = () => {


  const { user } = useGlobalContext();


  return (
    <Container fluid className="p-6">

      {user?<div>

      <ProfileHeader firstName={user.firstName} lastName={user.lastName} />


      <div className="py-6">
        <Row>


          <AboutUser firstName={user.firstName} lastName={user.lastName} email={user.email} phone={user.phone} address={user.address} />

  


        </Row>
      </div>


      </div>:<div className='text-center'>
            <Spinner animation="border" />
          </div>}

    </Container>
  )
}

export default Profile