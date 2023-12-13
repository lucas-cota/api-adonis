import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({}: HttpContextContract) { //lista usuários
    const user = await User.all();
    return user;
  }

  public async store({ request, response }: HttpContextContract) { // cria usuário
    const userData = request.only(["name", "password", "email"]);
    try {
      // Criando o usuário no banco de dados
      const user = await User.create(userData);

      // Retornando o usuário criado
      return user;
    } catch (error) {
      // Tratamento de erro (por exemplo, email já existente)
      // Aqui você pode retornar uma resposta de erro personalizada
      return response
        .status(400)
        .send("Não foi possível criar o usuário");
    }
  }

  public async show({ params }: HttpContextContract) {
    const paramsId = params.id;
    const user = await User.find(paramsId);
    return user;
  }

  public async update({ request, params }: HttpContextContract) {
    const userData = request.only(["name", "password", "email"]);
    const userId = params.id;

    const user = await User.findOrFail(userId);
    user.merge(userData);

    await user.save();
    return user;
  }

  public async destroy({params, response}: HttpContextContract) {  // deleta
    const userId = params.id;

    try {
      const user = await User.findOrFail(userId);
      await user.delete();

      return response.status(200).send({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      return response.status(404).send({ error: 'Usuário não encontrado.' });
    }
  }
}
