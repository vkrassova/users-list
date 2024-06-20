import { createUsers } from './api'
import {
  ratingSort,
  regDataSort,
  closePopup,
  openPopup,
  ratingSortDecrease,
  regDataSortDecrease,
} from './utils/helpers'

const tableContent = document.querySelector('.table__content')
const buttonRatingSort = document.querySelector('.filter__rating')
const buttonRegSort = document.querySelector('.filter__reg')
const paginationList = document.querySelector('.table__pagination')
const searchInput = document.querySelector('.search__input')
const popup = document.querySelector('.popup')
const popupCloseBtn = document.querySelector('.js-close')
const usersDeleteBtn = document.querySelector('.js-delete')
const clearFilterBtn = document.querySelector('.js-clear')

const main = async () => {
  let users = await createUsers()

  let itemsPerPage = 5
  let currentPage = 0
  let sliceUsers = null
  let isFiltered = false
  let sortUsers = []

  const render = (users) =>
    users
      .map(
        (user) =>
          `
    <tr class="table__tr" data-id=${user.id}>
        <td class="table__cell table__cell--name">
            <span>${user.username}<span/>
        </td>
        <td class="table__cell">
            ${user.email}
        </td>
        <td class="table__cell">
            ${user.registration_date}
        </td>
        <td class="table__cell">
            ${user.rating}
        </td>
        <td class="table__cell">
          <button class="button table__cell-close" data-id=${user.id}></button>
        </td>
  </tr>
    `
      )
      .join('')

  const clearSearch = () => {
    searchInput.value = ''
  }

  const showPage = async (arr, page) => {
    const startIndex = page * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    sliceUsers = arr.slice(startIndex, endIndex)

    tableContent.innerHTML = `${render(sliceUsers)}`

    return sliceUsers
  }

  const createPagination = (items) => {
    const pageCount = Math.ceil(items.length / itemsPerPage)

    for (let i = 0; i < pageCount; i++) {
      const liElement = document.createElement('li')
      liElement.classList.add('table__pagination-item')
      liElement.textContent = i + 1
      paginationList.appendChild(liElement)

      const paginations = document.querySelectorAll('.table__pagination-item')
      paginations[0].classList.add('active')

      liElement.addEventListener('click', () => {
        currentPage = i
        clearSearch()

        if (isFiltered) {
          showPage(sortUsers, currentPage)
          console.log(sortUsers)
        } else {
          showPage(users, currentPage)
        }
      })
    }
  }

  paginationList?.addEventListener('click', (evt) => {
    const target = evt.target

    if (target) {
      if (!target.classList.contains('active')) {
        const active = document.querySelector('.table__pagination-item.active')

        active.classList.remove('active')

        target.classList.add('active')
      }
    }
  })

  const deleteUser = (target) => {
    console.log('delete user')
    const index = users.findIndex((user) => user.id === target)
    if (index > -1) users.splice(index, 1)

    paginationList.innerHTML = ''
    searchInput.value = ''

    createPagination(users)
    showPage(users, currentPage)
  }

  const search = (target) => {
    currentPage = 0
    let filteredUsers = []
    let value = target.value.trim().toLowerCase()

    buttonRatingSort.classList.remove('active')
    buttonRegSort.classList.remove('active')

    users.forEach((el) => {
      if (el.username.toLowerCase().includes(value) || el.email.toLowerCase().includes(value)) {
        if (value !== '') {
          filteredUsers.push(el)
          paginationList.innerHTML = ''

          showPage(filteredUsers, currentPage)
          isFiltered = true

          const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

          for (let i = 0; i < pageCount; i++) {
            const liElement = document.createElement('li')

            liElement.textContent = i + 1
            paginationList.appendChild(liElement)
            liElement.classList.add('table__pagination-item')

            const paginations = document.querySelectorAll('.table__pagination-item')
            paginations[0].classList.add('active')

            liElement.addEventListener('click', () => {
              currentPage = i
              showPage(filteredUsers, currentPage)
            })
          }

          return filteredUsers && isFiltered
        }

        if (value == '') {
          paginationList.innerHTML = ''
          createPagination(users)
          showPage(users, currentPage)
        }
      }
    })
  }

  createPagination(users)
  showPage(users, currentPage)

  searchInput.addEventListener('input', (evt) => {
    const target = evt.target
    search(target)

    console.log(target.value.trim().toLowerCase())
  })

  let isRatingSort = 0
  let isRegDataSort = 0

  /* 
    Сортировка
*/

  buttonRatingSort.addEventListener('click', () => {
    isRatingSort++
    buttonRatingSort.classList.add('active')
    buttonRegSort.classList.remove('active')

    sortUsers = [...users]

    if (isRatingSort == 1) {
      ratingSort(sortUsers)
    }

    if (isRatingSort == 2) {
      ratingSortDecrease(sortUsers)
      isRatingSort = 0
    }

    clearSearch()
    showPage(sortUsers, currentPage)

    isFiltered = true

    return isFiltered
  })

  buttonRegSort.addEventListener('click', () => {
    isRegDataSort++
    buttonRatingSort.classList.remove('active')
    buttonRegSort.classList.add('active')

    sortUsers = [...users]

    if (isRegDataSort == 1) {
      regDataSort(sortUsers)
    }

    if (isRegDataSort == 2) {
      regDataSortDecrease(sortUsers)
      isRegDataSort = 0
    }

    clearSearch()
    showPage(sortUsers, currentPage)

    isFiltered = true

    return isFiltered
  })

  /* 
    открытие попапа/удаление пользователя
*/

  tableContent.addEventListener('click', (evt) => {
    const target = evt.target.dataset['id']

    if (target) {
      openPopup(popup, target, usersDeleteBtn)
    }
  })

  popupCloseBtn?.addEventListener('click', () => {
    closePopup(popup)
  })
  usersDeleteBtn?.addEventListener('click', (evt) => {
    const target = evt.target.dataset['id']

    deleteUser(target)
    closePopup(popup)
  })

  /*  
    очистка фильтрации
*/

  clearFilterBtn?.addEventListener('click', () => {
    if (isFiltered) {
      searchInput.value = ''

      buttonRatingSort.classList.remove('active')
      buttonRegSort.classList.remove('active')

      paginationList.innerHTML = ''
      tableContent.innerHTML = ''

      createPagination(users)

      showPage(users, currentPage)

      isFiltered = false

      isRatingSort = 0
      isRegDataSort = 0

      return isFiltered
    }
  })
}

document.addEventListener('DOMContentLoaded', main)
