import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async store({ request, auth, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      // Tenta autenticar o usuário com as credenciais fornecidas
      const token = await auth.use('api').attempt(email, password);
      // Retorna o token para o cliente
      return token
    } catch {
      // Se a autenticação falhar, retorna um erro
      return response.badRequest('Invalid credentials');
    }
  }

  

}
