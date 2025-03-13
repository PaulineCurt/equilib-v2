import vine from '@vinejs/vine'

const password = vine.string().trim().escape().minLength(8).maxLength(30)

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().escape().minLength(3).maxLength(255),
    lastname: vine.string().trim().escape().minLength(3).maxLength(255),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    phone: vine.string().trim().escape().minLength(10).maxLength(10).optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
