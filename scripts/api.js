import { getDate } from "./utils/helpers"

export const getAllUsers = async () => {
    return fetch(`https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users`, {
        method: 'GET',
        redirect: 'follow',
      })
}

export const createUsers = async () => {
    let users = []
  
    await getAllUsers()
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error')
        }
  
        return res.json()
      })
      .then((data) => {
        users = data
  
        users.forEach((el) => {
          el.registration_date = getDate(el.registration_date)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  
    return users
  }