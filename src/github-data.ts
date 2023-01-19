export interface User {
  login: string;
  avatar_url: string;
}

export interface Repository extends Record<string, any> {
  id: number;
  owner: User;
  name: string;
  html_url: string;
  description: string;
}

export type AvailableField = 'owner' | 'name' | 'description';

export const searchRepositories = (
  repositories: Array<Repository>,
  value: string,
  field: AvailableField = 'name'
) => {
  return repositories.filter(repo => {
    let fieldValue;
    switch (field) {
      case 'name':
        fieldValue = repo.name;
        break;
      case 'description':
        fieldValue = repo.description;
        break;
      case 'owner':
        fieldValue = repo.owner.login;
        break;
      default:
        fieldValue = null;
    }

    if (fieldValue) {
      return fieldValue.toLowerCase().includes(value.toLowerCase());
    }
    return false;
  });
};