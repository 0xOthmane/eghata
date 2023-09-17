import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CarpoolingStatus, OfferStatus } from 'Contracts/status'

export default class CreateCarpoolingAdValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    type: schema.enum(Object.values(CarpoolingStatus)),
    departure_longitude: schema.number([rules.range(-180, 180)]),
    departureLatitude:schema.number([rules.range(-90, 90)]),
    departureAddress: schema.string({ trim: true }),
    departureDate: schema.date({
      format: 'sql',
    }),
    arrivalLongitude: schema.number([rules.range(-180, 180)]),
    arrivalLatitude: schema.number([rules.range(-90, 90)]),
    arrivalAddress: schema.string({ trim: true }),
    arrivalDate: schema.date({
      format: 'sql',
    }),
    description: schema.string({ trim: true }),
    capacity: schema.number(),
    storageSpace:schema.number(),
    status: schema.enum(Object.values(OfferStatus)),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
