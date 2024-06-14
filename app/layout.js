// import theme style scss file
import 'styles/theme.scss';
import {ToastConfig} from './toast-config'

export const metadata = {
    title: 'Vehicare - Admin Dashboard',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                {children}
                <ToastConfig />
            </body>
        </html>
    )
}
