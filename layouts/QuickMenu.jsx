"use client"

import Link from 'next/link';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';


import 'simplebar/dist/simplebar.min.css';


import useMounted from 'hooks/useMounted';
import { useRouter } from 'next/navigation';

const QuickMenu = () => {

    const hasMounted = useMounted();

    const router = useRouter();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const handleSignOut=(e)=>{
        e.preventDefault();
        router.push('/authentication/sign-in')
        localStorage.removeItem('token');

    }




    const QuickMenuDesktop = () => {



        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">

                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md">
                            <Image alt="avatar" src='/images/avatar/profile.png' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                        show
                    >

                        <Dropdown.Item eventKey="3">
                            <Link className='text-inherit' href={'/profile'}>
                                <i className="fe fe-eye me-2"></i> View My Profile </Link>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="2">
                            <Link className='text-inherit' href={'/profile/edit'}>
                                <i className="fe fe-user me-2"></i> Edit Profile </Link>
                        </Dropdown.Item>



                        <Dropdown.Item>
                            <Link href={'#'} onClick={handleSignOut} className='text-inherit' >
                                <i className="fe fe-power me-2"></i> Sign Out </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    const QuickMenuMobile = () => {
        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">

                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md">
                            <Image alt="avatar" src='/images/avatar/profile.png' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                    >
                       
                       <Dropdown.Item eventKey="3">
                            <Link className='text-inherit' href={'/profile'}>
                                <i className="fe fe-eye me-2"></i> View My Profile </Link>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="2">
                            <Link className='text-inherit' href={'/profile/edit'}>
                                <i className="fe fe-user me-2"></i> Edit Profile </Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                            <Link href={'#'} onClick={handleSignOut} className='text-inherit' >
                                <i className="fe fe-power me-2"></i> Sign Out </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    return (
        <Fragment>
            {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    )
}

export default QuickMenu;