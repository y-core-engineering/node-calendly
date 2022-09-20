/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/
export type UserType = {
  uri: string;
  name: string;
  slug: string;
  email: string;
  scheduling_url: string;
  timezone: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
  current_organization: string;
};

export class User implements UserType {
  uri: string;
  name: string;
  slug: string;
  email: string;
  /* tslint:disable-next-line */
  scheduling_url: string;
  timezone: string;
  /* tslint:disable-next-line */
  avatar_url: string | null;
  /* tslint:disable-next-line */
  created_at: Date;
  /* tslint:disable-next-line */
  updated_at: Date;
  /* tslint:disable-next-line */
  current_organization: string;

  uuid: string | undefined;

  private constructor(data: UserType) {
    this.uri = data.uri;
    this.name = data.name;
    this.slug = data.slug;
    this.email = data.email;
    this.scheduling_url = data.scheduling_url;
    this.timezone = data.timezone;
    this.avatar_url = data.avatar_url;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.current_organization = data.current_organization;
    this.uuid = this.getUUID(data.uri);
  }

  static fromJson(data: UserType): User {
    return new User(data);
  }

  public getUUID(uri: string): string | undefined {
    return uri.split("/").pop() || undefined;
  }
}
