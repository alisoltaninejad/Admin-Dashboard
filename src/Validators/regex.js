const testEmail = (value) => {
    const emailPattent = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattent.test(value)
}

const testPhoneNumber = (value) => {
    const phonePattent = /^(0|98|\+98)?9\d{9}$/
    return phonePattent.test(value)
}

export default {
    testEmail,
    testPhoneNumber
}