'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'




const VehiclesNav = () => {

    const pathname = usePathname()

    return (
        <div className="pb-6">
        <ul className="nav nav-lt-tab" id="pills-tab" role="tablist">
            <li className="nav-item">
                <Link className={`nav-link ${pathname === '/vehicles' ? 'active' : ''}`} href="/vehicles">
                    <span className="text-nowrap">Due for Service</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${pathname === '/vehicles/under-service' ? 'active' : ''}`} href="/vehicles/under-service">
                    <span className="text-nowrap">Under Service</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${pathname === '/vehicles/service-completed' ? 'active' : ''}`} href="/vehicles/service-completed">
                    <span className="text-nowrap">Service Completed</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${pathname === '/vehicles/add-vehicle' ? 'active' : ''}`} href="/vehicles/add-vehicle">
                    <span className="text-nowrap">Add New Vehicle</span>
                </Link>
            </li>
        </ul>
    </div>
    )
}

export default VehiclesNav