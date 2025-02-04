import { ListUsersController } from "../app/controllers/ListUsersController";
import { makeListUsersUseCase } from "./makeListUsersUseCase";

export function makeListUsersController() {
  const listUsersUseCase = makeListUsersUseCase();
  return new ListUsersController(listUsersUseCase);
}
