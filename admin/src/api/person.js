import Api from '../utils/request'

export function fetchPersonAll() {
  return Api({
    url: '/person',
    method: 'GET'
  })
}

export function deletePerson(id) {
  return Api({
    url: `/person?id=${id}`,
    method: "DELETE",
  });
}