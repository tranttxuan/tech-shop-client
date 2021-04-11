import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'
import LoadingToRedirect from './LoadingToRedirect'

const AdminRoute = ({ children, ...rest }) => {
    const user = useSelector(state => state.user)
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    setIsAdmin(true)
                })
                .catch(error => {
                    console.log(error)

                })
        }
    }, [user])

    return isAdmin
        ? <Route {...rest} render={() => children} />
        : <LoadingToRedirect />
}

export default AdminRoute
