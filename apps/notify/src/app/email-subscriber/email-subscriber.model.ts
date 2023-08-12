import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Subscriber } from "@org/shared-types";

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  versionKey: false
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public id: string;

  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public password: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);