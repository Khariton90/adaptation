import { Subscriber } from "@org/shared-types";


export class EmailSubscriberEntity implements Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public password: string;
  

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(emailSubscriber: Subscriber) {
    this.id = emailSubscriber.id;
    this.email = emailSubscriber.email;
    this.firstname = emailSubscriber.firstname;
    this.password = emailSubscriber.password;
  }
}