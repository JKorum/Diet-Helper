import { CredFormData } from '../components/private/ChangeCredentials'

export interface Sanitized {
  newName?: string
  newEmail?: string
  newPassword?: string
}

export const updateSanitizer: (
  input: CredFormData
) => Sanitized | null = input => {
  const data: Sanitized = {}

  Object.keys(input).forEach(key => {
    if (input[key as keyof CredFormData].length > 0) {
      if (key === 'name') {
        data.newName = input[key]
      } else if (key === 'email') {
        data.newEmail = input[key]
      } else if (key === 'password') {
        data.newPassword = input[key]
      }
    }
  })

  return Object.keys(data).length > 0 ? data : null
}
