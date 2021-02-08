import type IError from '../interfaces/IError'

export default class ServerError implements IError {
  private static InternalServerError = "Oops something went wrong on our end. Internal Server Error"

  public Code: string | null = '500'
  public Message: string
  public ErrorDetails: string | null

  constructor(error, message = ServerError.InternalServerError, code = null) {
    this.Code = code
    this.Message = message
    this.ErrorDetails = `${error.name} ${error.message}`
  }
}