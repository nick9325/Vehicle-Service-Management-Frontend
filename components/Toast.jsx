import React from 'react'
import { Toast } from 'react-bootstrap'

export default function toast() {
    return (
        <div>

            <Toast>
                <Toast.Header>
                    <Image src="https://fakeimg.pl/20x20/754FFE/754FFE/" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>

        </div>
    )
}
