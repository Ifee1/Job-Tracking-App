const attachCookie = ({res, token}) => {

    const twentyDays = 1000 * 60 * 60 * 24 * 20
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + twentyDays),
        secure: process.env.NODE_ENV === 'production'
    })
}

export default attachCookie