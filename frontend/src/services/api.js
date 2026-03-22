const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => {
  try {
    const stored = localStorage.getItem('gds_admin')
    return stored ? JSON.parse(stored).token : null
  } catch {
    return null
  }
}

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

const jsonHeaders = () => ({ 'Content-Type': 'application/json' })

async function request(url, options = {}) {
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

// ── Admin Auth ────────────────────────────────────────────────
export const adminLogin = (email, password) =>
  request(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  })

export const adminRegister = (username, email, password) =>
  request(`${BASE_URL}/admin/register`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ username, email, password }),
  })

export const getAdminStats = () =>
  request(`${BASE_URL}/admin/stats`, { headers: authHeaders() })

// ── Artists ───────────────────────────────────────────────────
export const getArtists = () =>
  request(`${BASE_URL}/artists`)

export const getArtistById = (id) =>
  request(`${BASE_URL}/artists/${id}`)

export const createArtist = (data) =>
  request(`${BASE_URL}/artists`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const updateArtist = (id, data) =>
  request(`${BASE_URL}/artists/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const deleteArtist = (id) =>
  request(`${BASE_URL}/artists/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── Releases ──────────────────────────────────────────────────
export const getReleases = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`${BASE_URL}/releases${qs ? `?${qs}` : ''}`)
}

export const getReleaseById = (id) =>
  request(`${BASE_URL}/releases/${id}`)

export const createRelease = (data) =>
  request(`${BASE_URL}/releases`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const updateRelease = (id, data) =>
  request(`${BASE_URL}/releases/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const deleteRelease = (id) =>
  request(`${BASE_URL}/releases/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── Bookings ──────────────────────────────────────────────────
export const submitBooking = (data) =>
  request(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  })

export const getBookings = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`${BASE_URL}/bookings${qs ? `?${qs}` : ''}`, { headers: authHeaders() })
}

export const updateBookingStatus = (id, status) =>
  request(`${BASE_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })

export const deleteBooking = (id) =>
  request(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── Subscribers ───────────────────────────────────────────────
export const subscribe = (email, name) =>
  request(`${BASE_URL}/subscribers`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, name }),
  })

export const getSubscribers = () =>
  request(`${BASE_URL}/subscribers`, { headers: authHeaders() })

export const deleteSubscriber = (id) =>
  request(`${BASE_URL}/subscribers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── Contact ───────────────────────────────────────────────────
export const submitContact = (data) =>
  request(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  })

export const getContactMessages = () =>
  request(`${BASE_URL}/contact`, { headers: authHeaders() })

export const markMessageRead = (id) =>
  request(`${BASE_URL}/contact/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(),
  })

export const deleteContactMessage = (id) =>
  request(`${BASE_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── Events ────────────────────────────────────────────────────
export const getEvents = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`${BASE_URL}/events${qs ? `?${qs}` : ''}`)
}

export const createEvent = (data) =>
  request(`${BASE_URL}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const updateEvent = (id, data) =>
  request(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

export const deleteEvent = (id) =>
  request(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
