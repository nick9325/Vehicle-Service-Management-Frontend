'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from 'react-bootstrap'



const VehiclesNav = () => {

    const pathname = usePathname()

    return (
        <div className="pb-6">
            <ul className="nav nav-lt-tab " id="pills-tab" role="tablist">
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/vehicles'?'active':''}`} href="/vehicles">Due for Service</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/vehicles/under-service'?'active':''}`} href="/vehicles/under-service">Under Service</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/vehicles/service-completed'?'active':''}`} href="/vehicles/service-completed">Service Completed</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/vehicles/add-vehicle'?'active':''}`} href="/vehicles/add-vehicle">Add New Vehicle </Link>
                </li>
        
            </ul>
     

        </div>
    )
}

export default VehiclesNav