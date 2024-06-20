export const getDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const ratingSort = (arr) => {
  arr.sort((a, b) => {
    return b.rating - a.rating
  })
}

export const ratingSortDecrease = (arr) => {
    arr.sort((a, b) => {
      return a.rating - b.rating
    })
  }

export const regDataSort = (arr) => {
  arr.sort((a, b) => {
    const dateA = new Date(a.registration_date.split('.').reverse().join('-'))
    const dateB = new Date(b.registration_date.split('.').reverse().join('-'))

    return dateB - dateA
  })
}

export const regDataSortDecrease = (arr) => {
    arr.sort((a, b) => {
      const dateA = new Date(a.registration_date.split('.').reverse().join('-'))
      const dateB = new Date(b.registration_date.split('.').reverse().join('-'))
  
      return dateA - dateB
    })
  }

export const openPopup = (popup, target, deleteBtn) => {
  popup.classList.add('popup--open')
  document.body.classList.add('no-scroll')

  deleteBtn.dataset['id'] = target
}

export const closePopup = (popup) => {
  popup.classList.remove('popup--open')
  document.body.classList.remove('no-scroll')
}

export const render = (users) =>
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