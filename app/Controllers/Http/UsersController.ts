import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract)  { //lista usuários
    const user = await User.all()
    return user
  }

  public async store({request}: HttpContextContract) { // armazena
    const body = request.only(['name', 'password', 'email'])
    const user = User.create({
      name : body.name,
      password : body.password,
      email : body.email
    })

    return user
  }

  public async show({}: HttpContextContract) { // mostra usuário
    return 'Show'
  }

  public async update({}: HttpContextContract) { // atualiza 
    return 'Update'
  }

  public async destroy({}: HttpContextContract) { // deleta
    return 'Destroy'
  }
}
