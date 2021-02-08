import type IError from '../interfaces/IError'

export default class ValidationError implements IError {
  public Code: string = '400'
  public Message: string = 'Not found'
  public ErrorDetails: string | null

  constructor(message, ErrorDetails = null) {
    this.Message = message
    this.ErrorDetails = ErrorDetails
  }
}