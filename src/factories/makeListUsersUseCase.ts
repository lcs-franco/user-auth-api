import { ListUsersUseCase } from "../app/useCases/ListUsersUseCase";

export function makeListUsersUseCase() {
  return new ListUsersUseCase();
}
