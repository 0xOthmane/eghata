import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OfferStatus } from 'Contracts/status'

export default class CreateOfferValidator {
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

  // Regex
  // longitude:^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$
  // latitude: ^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$

  public schema = schema.create({
    longitude: schema.number([rules.range(-180, 180)]),
    latitude: schema.number([rules.range(-90, 90)]),
    address: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    status: schema.enum(Object.values(OfferStatus)),
    name: schema.string({ trim: true }, [rules.minLength(3), rules.nullable]),
    phone: schema.string({ trim: true }, [rules.mobile(), rules.nullable]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.nullable,
      // rules.unique,
      rules.normalizeEmail({
        allLowercase: true,
      }),
    ]),
    isOnSite: schema.boolean(),
    types: schema.array().members(schema.number()),
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
